"""Script to extract English -> Japanese translations from wikiextractor's output HTML"""
import sys
import re
from bs4 import BeautifulSoup
import simplejson as json


def format_subsection(subsection):
    """Convert a subsection (list of lines) to a clean string."""
    subsection_html = '\n'.join(subsection)
    subsection_html = subsection_html.replace('&lt;', '<').replace('&gt;', '>')
    soup = BeautifulSoup(subsection_html, 'html.parser')

    subsection_text = soup.text
    subsection_text = subsection_text.strip()

    return subsection_text


def is_valid_subsection_title(subsection_title):
    """Returns whether the given subsection title is a valid one"""
    if not subsection_title:
        return False
    if subsection_title in {'発音', '異綴', '関連語', '派生語', '別表記', '翻訳', '参照', '訳語'}:
        return False
    if subsection_title.startswith('語源'):
        return False

    return True


def extract_subsections(english_section):
    """Given a english section (list of lines), extract subsections as a dict"""
    subsection_title = ''
    subsection = []
    subsections = {}
    for line in english_section:
        if line.startswith('<h3>'):
            if subsection and is_valid_subsection_title(subsection_title):
                subsections[subsection_title] = format_subsection(subsection)
                subsection = []
            m = re.match(r'<h3>(.*)</h3>', line)
            if m:
                subsection_title = m.group(1)
        else:
            subsection.append(line)

    if subsection and is_valid_subsection_title(subsection_title):
        subsections[subsection_title] = format_subsection(subsection)

    return subsections

def extract_translation(buffer):
    """Given a buffer (list of lines), extract English translation as a dict."""
    translation = {}
    in_english_section = False
    english_section = []
    for line in buffer:
        if line.startswith('<h1>'):
            m = re.match(r'<h1>(.*)</h1>', line)
            if m:
                translation['title'] = m.group(1)
        elif line.startswith('<h2>英語</h2>'):
            in_english_section = True
        elif line.startswith('<h2>'):
            in_english_section = False
        elif in_english_section:
            english_section.append(line)

    if english_section:
        translation['english'] = extract_subsections(english_section)
    return translation


def main():
    buffer = []
    for line in sys.stdin:
        if line.startswith('<doc '):
            # start of a document
            continue
        elif line.startswith('</doc>'):
            # enf of a document - extract translation and clear buffer
            translation = extract_translation(buffer)
            if translation.get('english'):
                print(json.dumps(translation, ensure_ascii=False))
            buffer = []
        else:
            buffer.append(line.strip())


if __name__ == '__main__':
    main()
