document.getElementById('scrapeBtn').addEventListener('click', async () => {

    let queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapePage
    }, (results) => {
      const scrapedData = results[0].result;
      document.getElementById('output').textContent = JSON.stringify(scrapedData, null, 2);
    });
  });
  
  function scrapePage() {
    // Example: Scrape all text content from paragraph tags
    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map(p => p.innerText);
  }