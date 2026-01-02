# DHE MIS Offline Scraper

This project downloads JS-rendered pages from [demo3.synthesys.in](https://demo3.synthesys.in/) for offline use using Puppeteer.

## Usage

1. Install dependencies:
   ```bash
   npm install 
   ```
2. Run the scraper:
   ```bash
   npm run scrape
   ```
3. Serve the offline copy:
   ```bash
   cd demo3_offline
   python3 -m http.server 8000
   ```
   Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Notes
- Adjust `maxDepth` in `scrape.js` for more/less crawling.
- Some dynamic/API content may not be captured.
- For authenticated areas, see Puppeteer docs for cookie/session handling.
