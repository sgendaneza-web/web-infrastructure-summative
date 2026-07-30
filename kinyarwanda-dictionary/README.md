# Kinyarwanda-English Dictionary

A simple web app that translates between Kinyarwanda and English, showing real example usage alongside each translation — built to help reduce the language barrier issues that occur between Rwandans and foreigners by making bilingual learning resources more accessible.

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
   git clone https://github.com/sgendaneza-web/web-infrastructure-summative.git
   cd web-infrastructure-summative/kinyarwanda-dictionary
```
2. Open `index.html` directly in your browser, or use a tool like VS Code's Live Server extension for auto-reload during development.
3. No build steps, no API key, no dependencies — it's a static HTML/CSS/JS app that calls the MyMemory API directly from the browser.

## Challenges encountered

- The originally planned API (Glosbe) turned out to have a broken/deprecated public endpoint, so the project pivoted to MyMemory instead.
- MyMemory's top-level suggested translation isn't always the most accurate (it can surface rarely-used or low-quality community submissions). The app addresses this by re-sorting all returned matches by relevance score and usage count rather than trusting the API's default pick.
- MyMemory sometimes returns the original input echoed back instead of a real "not found" response; the app detects this and shows a clear error message instead.

## Deployment

The application is deployed as a static site across two web servers (`web-01` and `web-02`), sitting behind an HAProxy load balancer (`lb-01`) that distributes incoming requests between them.

### Steps taken

1. Copied `index.html`, `style.css`, and `script.js` to both `web-01` and `web-02` using `scp`.
2. Moved each file into nginx's web root (`/var/www/html/`) on both servers, replacing the previous default content.
3. Verified each server independently served the app correctly via `curl localhost` and a direct browser visit to each server's IP.
4. Confirmed HAProxy (already configured on `lb-01` from earlier coursework) correctly load-balances between `web-01` and `web-02` using a roundrobin algorithm, and terminates SSL via a Let's Encrypt certificate.
5. Verified traffic distribution using repeated `curl` requests and checking the `X-Served-By` response header, which alternated between both servers as expected.

### Live URL

The application is publicly accessible at:
**https://www.soniadev.tech**

Traffic to this domain is automatically load-balanced between `web-01` and `web-02`, with HTTP requests automatically redirected to HTTPS.

### Video URL
https://drive.google.com/file/d/1Ggmf79WAet2PmynIl_kRKb6V7KPGJJrq/view?usp=sharing
