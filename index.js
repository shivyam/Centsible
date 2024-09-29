document.getElementById('scrapeBtn').addEventListener('click', async () => {
  let queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapePage
  }, async (results) => {
      const data = results[0]?.result;
      
      if (!data || data.length === 0) {
          document.getElementById('output').textContent = "No data found on the page.";
          return;
      }

      document.getElementById('output').textContent = "Scraped Data: " + JSON.stringify(data, null, 2);

      // Send the scraped data to the Hugging Face API for summarization
      const summarizedData = await summarizeData(data.join(' '));  // Join array of paragraphs into a single string
      document.getElementById('summary').textContent = "Summarized Data: " + summarizedData;
  });
});

function scrapePage() {
  // Scrape all text content from paragraph tags
  const paragraphs = Array.from(document.querySelectorAll('p'));
  return paragraphs.map(p => p.innerText);
}

async function summarizeData(data) {
  const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer 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`,  // Replace with your actual Hugging Face API token
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              inputs: data,  // Use the scraped data instead of a predefined article
              parameters: {
                  min_length: 100,  // Adjust this based on how detailed you want the summary
                  max_length: 200  // Set max summary length
              }
          })
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error(`API error: ${errorText}`);
          throw new Error(`API error: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log("API Result:", result);  // Log the full response for inspection
      
      return result[0]?.summary_text || "Failed to summarize data";
  } catch (error) {
      console.error("Error during API call:", error);
      return `Error: ${error.message}`;
  }
}


var cors = require('cors')

app.use(cors())