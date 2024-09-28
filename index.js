document.getElementById('scrapeBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapePage
    }, (results) => {
      const data = results[0].result;
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    });
  });
  
  function scrapePage() {
    // Example: Scrape all text content from paragraph tags
    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map(p => p.innerText);
  }