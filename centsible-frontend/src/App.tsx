import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ScraperComponent from './ScraperComponent.tsx';
import { useState } from "react";
import ChatBot from './ChatBot.tsx';
function App() {
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [keywords, setKeyWords] = useState<string | null>(null);

  return (
    <Tabs>
      <TabList>
        <Tab>Summary</Tab>
        <Tab>ChatBot</Tab>
      </TabList>

      <TabPanel>
        <h1 className="font-bold text-3xl">Summary</h1>
        {/* Pass the state handler functions as props to ScraperComponent */}
        <ScraperComponent
          onScrapedData={(data) => setScrapedData(data)}
          onSummaryData={(summary) => {
            console.log("New Summary:", summary); // Log the summary when it's updated
            setSummary(summary);
          }}
          onKeywordsData={(keywords) => {
            console.log("New Keywords:", keywords); // Log the summary when it's updated
            setKeyWords(keywords);
          }}
        />

        {/* Display the scraped data */}
        <div id="output" className="text-wrap">
          <h3 className="font-bold">Scraped Data:</h3>
          {scrapedData ? <p className="pb-4">{scrapedData}</p> : <p className="pb-4">No data scraped yet.</p>}
        </div>

        {/* Display the summarized data */}
        <div id="summary" className="text-wrap">
          <h3 className="font-bold">Summarized Data:</h3>
          {summary ? <p>{summary}</p> : <p>No summary available yet. </p>}
        </div>

          {/* Display the summarized data */}
          <div id="summary" className="text-wrap">
          <h3 className="font-bold">Keywords Data:</h3>
          {keywords ? <p>{keywords}</p> : <p>No keywords available yet. </p>}
        </div>
      </TabPanel>

      <TabPanel>
        <h2>ChatBot</h2>
        <ChatBot />
      </TabPanel>
    </Tabs>
  );
}

export default App;
