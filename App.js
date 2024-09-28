import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');

  const scrapeData = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: scrapePage,
      },
      (results) => {
        const scrapedData = results[0]?.result;
        setData(JSON.stringify(scrapedData, null, 2));
      }
    );
  };

  // Function that scrapes data from the page
  function scrapePage() {
    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map((p) => p.innerText);
  }

  return (
    <div style={{ width: '200px', padding: '10px' }}>
      <h3>Web Scraper</h3>
      <button onClick={scrapeData} style={{ marginTop: '10px' }}>
        Scrape Data
      </button>
      <pre>{data}</pre>
    </div>
  );
}

export default App;
