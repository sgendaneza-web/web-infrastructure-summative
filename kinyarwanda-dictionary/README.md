# Kinyarwanda-English Dictionary

A simple web app that translates between Kinyarwanda and English, showing real example usage alongside each translation — built to help bridge the language gap between public and private school students in Rwanda by making bilingual learning resources more accessible.

## Features

- Translate words and phrases between Kinyarwanda and English (both directions)
- See real example translations for the same word/phrase, pulled from a live translation memory
- Handles cases where no translation is found
- Simple, responsive interface

## How it works

This app uses the [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php), a free translation memory service with no API key required. Every search queries MyMemory's `/get` endpoint, which returns both a best-guess translation and a list of real, human-verified translation matches — the app then re-ranks these matches by relevance and usage to surface the most reliable one first.

**Credit:** Translations powered by [MyMemory](https://mymemory.translated.net/) by Translated Labs.

## Running locally

1. Clone this repository:
```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/kinyarwanda-dictionary.git
   cd kinyarwanda-dictionary
```
2. Open `index.html` directly in your browser, or use a tool like VS Code's Live Server extension for auto-reload during development.
3. No build steps, no API key, no dependencies — it's a static HTML/CSS/JS app that calls the MyMemory API directly from the browser.

## Challenges encountered

- The originally planned API (Glosbe) turned out to have a broken/deprecated public endpoint, so the project pivoted to MyMemory instead.
- MyMemory's top-level suggested translation isn't always the most accurate (it can surface rarely-used or low-quality community submissions). The app addresses this by re-sorting all returned matches by relevance score and usage count rather than trusting the API's default pick.
- MyMemory sometimes returns the original input echoed back instead of a real "not found" response; the app detects this and shows a clear error message instead.

## Deployment

*(To be added once deployed to web-01/web-02 behind the load balancer.)*
