"""Build a public gallery manifest; credentials are supplied only by CI secrets."""
import json
import os
from pathlib import Path
from urllib.parse import urlencode, urlsplit, urlunsplit, parse_qsl
from urllib.request import Request, urlopen


def request(url, data, headers):
    with urlopen(Request(url, data=data, headers=headers), timeout=60) as response:
        return json.load(response)


def raw_link(url):
    parts = urlsplit(url)
    query = dict(parse_qsl(parts.query))
    query.pop('dl', None)
    query['raw'] = '1'
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query), ''))


def main():
    folder = os.environ['DROPBOX_FOLDER_PATH'].strip()
    if not folder or folder == '/' or not folder.startswith('/'):
        raise ValueError('Set a specific wedding folder path, never the account root.')
    token = request('https://api.dropboxapi.com/oauth2/token', urlencode({
        'grant_type': 'refresh_token',
        'refresh_token': os.environ['DROPBOX_REFRESH_TOKEN'],
        'client_id': os.environ['DROPBOX_APP_KEY'],
        'client_secret': os.environ['DROPBOX_APP_SECRET'],
    }).encode(), {'Content-Type': 'application/x-www-form-urlencoded'})['access_token']

    def api(route, body):
        return request('https://api.dropboxapi.com/2/' + route,
                       json.dumps(body).encode(), {'Authorization': 'Bearer ' + token,
                       'Content-Type': 'application/json'})

    page = api('files/list_folder', {'path': folder, 'recursive': True})
    entries = page['entries']
    while page['has_more']:
        page = api('files/list_folder/continue', {'cursor': page['cursor']})
        entries.extend(page['entries'])
    items = []
    for entry in sorted(entries, key=lambda e: (e.get('server_modified', ''), e['name'])):
        if entry['.tag'] != 'file':
            continue
        extension = Path(entry['name']).suffix.lower()
        if extension not in {'.jpg', '.jpeg', '.jfif', '.png', '.gif', '.webp', '.avif', '.mp4', '.webm', '.mov'}:
            print('Skipping unsupported file format:', extension)
            continue
        path = entry['path_lower']
        links = api('sharing/list_shared_links', {'path': path, 'direct_only': True})['links']
        if links:
            link = links[0]
        else:
            link = api('sharing/create_shared_link_with_settings', {
                'path': path, 'settings': {'requested_visibility': 'public'}})
        visibility = link.get('link_permissions', {}).get('resolved_visibility', {}).get('.tag')
        if visibility != 'public':
            raise ValueError('Gallery files require public shared links; check Dropbox sharing settings.')
        items.append({'id': entry['id'], 'type': 'video' if extension in {'.mp4', '.webm', '.mov'} else 'image',
                      'src': raw_link(link['url'])})
    Path('data/guest-gallery.json').write_text(json.dumps({'items': items}, indent=2) + '\n')
    print('Published gallery entries:', len(items))


if __name__ == '__main__':
    main()
