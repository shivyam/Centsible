import React from 'react';

interface ScraperComponentProps {
  onScrapedData: (data: string) => void;
  onSummaryData: (summary: string) => void;
  onKeywordsData: (keywords: string) => void;
}

const ScraperComponent: React.FC<ScraperComponentProps> = ({ onScrapedData, onSummaryData, onKeywordsData }) => {
  const handleScrape = async () => {
    try {
      const queryOptions = { active: true, currentWindow: true };
      const [tab] = await chrome.tabs.query(queryOptions);

      if (tab && tab.id !== undefined) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },  // Using tabId safely
            func: scrapePage, // Use func instead of function
          },
          async (results) => {
            const data = results[0]?.result as string[];

            if (!data || data.length === 0) {
              onScrapedData("No data found on the page.");
              return;
            }

            const scrapedData = JSON.stringify(data, null, 2);
            onScrapedData(scrapedData);

            // Send the scraped data to the Hugging Face API for summarization
            const summarizedData = await summarizeData(data.join(' '));
            onSummaryData(summarizedData);

            const keywordsData = await getKeyWords(data.join(' '));
            onKeywordsData(keywordsData);
          }
        );
      } else {
        onScrapedData("Error: No active tab found.");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error during scraping:", errorMessage);
      onScrapedData(`Error: ${errorMessage}`);
    }
  };

  function scrapePage() {
    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map((p) => p.innerText);
  }

  const summarizeData = async (data: string): Promise<string> => {
    const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`, // Replace with your actual Hugging Face API token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: data,
          parameters: {
            min_length: 100,
            max_length: 200,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${errorText}`);
      }

      const result = await response.json();
      return result[0]?.summary_text || "Failed to summarize data";
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error during API call:", errorMessage);
      return `Error: ${errorMessage}`;
    }
  };

  const getKeyWords = async (data: string): Promise<string> => {
    const API_URL = "https://api-inference.huggingface.co/models/mayapapaya/Keyword-Extractor"; 
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: data,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${errorText}`);
      }

      const result = await response.json();
      return result[0]?.keywords || "Failed to extract keywords";
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error during API call for keywords:", errorMessage);
      return `Error: ${errorMessage}`;
    }
  };


  return (
    <div>
      <button className="border rounded-lg bg-blue-200 p-2 m-2" onClick={handleScrape}>Scrape Page</button>
    </div>
  );
};

export default ScraperComponent;
