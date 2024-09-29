import React, {useEffect} from 'react';
import axios from 'axios';

interface ScraperComponentProps {
  onScrapedData: (data: string) => void;
  onSummaryData: (summary: string) => void;
  onKeywordsData: (keywords: string) => void;
}

const ScraperComponent: React.FC<ScraperComponentProps> = ({ onScrapedData, onSummaryData, onKeywordsData }) => {
  useEffect(() => {
    //triggers scraping when the component mounts
    handleScrape();
  }, []); //empty dependency array allow this effect to run once the component mounts

  
  
  
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

  interface ClassifyResponse {
    phrases: string; // Adjust this type if `phrases` is actually an array of strings, e.g., `string[]`.
  }

  const getKeyWords = async (data: string): Promise<string> => {
    try {

      const response = await axios.post<ClassifyResponse>('http://localhost:8000/classify', {
        text: data,
          
      
    });
    let phrases = response.data.phrases;

      // phrases = formatPhrases(phrases);
      
      return phrases;
    } catch (error) {
      console.error("Error classifying financial terms:", error);
      return `Error: ${error}`;
    }
  };

  // const formatPhrases = (text: string): string => {
  //   return text
  //     .replace(/\*\*/g, '')
  //     .replace(/\*/g, '')
  //     .replace(/(\w+):\s/g, '\n\n$1: ')
  //     .replace(/\n\s*\*\*Definition:\*\*/g, '\n  Definition:')
  //     .replace(/\n\s*\*\*Example:\*\*/g, '\n  Example:')
  //     .replace(/(\*\s)/g, '\n')
  //     .replace(/\n{2,}/g, '\n\n')
  //     .trim();
  // };

  return (
    <></>

  );
};

export default ScraperComponent;
