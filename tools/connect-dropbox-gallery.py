"""Interactive setup: credentials stay in memory and go directly to GitHub secrets."""
import getpass
import json
import subprocess
import sys
import webbrowser
from urllib.parse import urlencode
from urllib.error import HTTPError, URLError

REPO = 'JGwedding/John-Georgina'


def post_json(url, body, headers):
    # Feed secrets through stdin, never command-line arguments or files.
    config = ['url = ' + json.dumps(url), 'request = "POST"',
              'data = ' + json.dumps(body)]
    config.extend('header = ' + json.dumps(k + ': ' + v) for k, v in headers.items())
    result = subprocess.run(
        ['/usr/bin/curl', '-q', '--config', '-', '--silent', '--show-error',
         '--max-time', '60', '--write-out', '\n%{http_code}'],
        input='\n'.join(config), text=True, capture_output=True)
    if result.returncode:
        raise RuntimeError(f'HTTPS connection failed (curl code {result.returncode}). Check your connection and retry.')
    payload, status = result.stdout.rsplit('\n', 1)
    if status != '200':
        if status == '400' and 'oauth2/token' in url:
            raise RuntimeError('Dropbox rejected the code or app credentials. Restart setup and use a fresh authorization code.')
        if status == '429':
            raise RuntimeError('Dropbox is rate-limiting requests. Wait a few minutes, then restart setup.')
        raise RuntimeError(f'Dropbox returned HTTP {status}. Check permissions and the exact folder path, then retry.')
    return json.loads(payload)


def required_input(prompt, hidden=False):
    while True:
        value = (getpass.getpass(prompt) if hidden else input(prompt)).strip()
        if value:
            return value
        print('Nothing was entered. Paste the value, then press Enter. Hidden input will not show characters.')


def choose_folder(access_token):
    headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + access_token}
    current = ''
    while True:
        page = post_json('https://api.dropboxapi.com/2/files/list_folder',
                         json.dumps({'path': current}), headers)
        entries = list(page['entries'])
        while page['has_more']:
            page = post_json('https://api.dropboxapi.com/2/files/list_folder/continue',
                             json.dumps({'cursor': page['cursor']}), headers)
            entries.extend(page['entries'])
        folders = sorted((e for e in entries if e['.tag'] == 'folder'), key=lambda e: e['name'])
        print('\nCurrent folder:', current or '/ (Dropbox root)')
        if current:
            print('  0. Use THIS folder for the public wedding gallery')
            print('  B. Go back to parent folder')
        for index, entry in enumerate(folders, 1):
            print(f"  {index}. Open {entry['name']}")
        choice = input('Choose a number (open the wedding upload folder first): ').strip()
        if choice == '0' and current:
            return current
        if choice.lower() == 'b' and current:
            current = current.rsplit('/', 1)[0]
        elif choice.isdigit() and 1 <= int(choice) <= len(folders):
            current = folders[int(choice) - 1]['path_display']
        else:
            print('Choose one of the listed options. The Dropbox root cannot be published.')


def main():
    if not sys.stdin.isatty():
        raise RuntimeError('Run this script directly in your Terminal.')
    subprocess.run(['gh', 'repo', 'view', REPO, '--json', 'name', '--jq', '.name'], check=True,
                   stdout=subprocess.DEVNULL)
    print('Find the App key and App secret on your Dropbox app Settings tab.')
    key = required_input('Dropbox App key: ')
    secret = required_input('Dropbox App secret (hidden while pasting): ', hidden=True)
    url = 'https://www.dropbox.com/oauth2/authorize?' + urlencode({
        'client_id': key, 'response_type': 'code', 'token_access_type': 'offline'})
    print('Opening Dropbox authorization. Click Allow, then copy the code Dropbox displays.')
    print('If the browser does not open, use this URL:', url)
    webbrowser.open(url)
    code = required_input('Dropbox authorization code (hidden while pasting): ', hidden=True)
    body = urlencode({'grant_type': 'authorization_code', 'code': code,
                      'client_id': key, 'client_secret': secret}).encode()
    token = post_json('https://api.dropboxapi.com/oauth2/token', body.decode(),
                      {'Content-Type': 'application/x-www-form-urlencoded'})
    print('Select the destination folder used by your wedding file request.')
    folder = choose_folder(token['access_token'])
    values = {'DROPBOX_APP_KEY': key, 'DROPBOX_APP_SECRET': secret,
              'DROPBOX_REFRESH_TOKEN': token['refresh_token'], 'DROPBOX_FOLDER_PATH': folder}
    for name, value in values.items():
        subprocess.run(['gh', 'secret', 'set', name, '--repo', REPO], input=value,
                       text=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print('Connected! All four GitHub secrets are saved. Tell Codex: connection finished.')


if __name__ == '__main__':
    try:
        main()
    except HTTPError as error:
        print(f'Connection failed (HTTP {error.code}). Check app permissions, credentials, and folder path; then retry.', file=sys.stderr)
        sys.exit(1)
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
    except (URLError, subprocess.CalledProcessError, KeyError, FileNotFoundError) as error:
        print('Setup did not finish. Check GitHub CLI login, Dropbox settings, and the wedding folder path.', file=sys.stderr)
        sys.exit(1)
    except (KeyboardInterrupt, EOFError):
        print('\nSetup cancelled.', file=sys.stderr)
        sys.exit(1)
