import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ScraperComponent from './ScraperComponent.tsx';
import { useState } from "react";
import ChatBot from './ChatBot.tsx';
function App() {
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <Tabs>
      <TabList>
        <Tab>Summary</Tab>
        <Tab>ChatBot</Tab>
      </TabList>

      <TabPanel>
        <h2>Summary</h2>
        {/* Pass the state handler functions as props to ScraperComponent */}
        <ScraperComponent
          onScrapedData={(data) => setScrapedData(data)}
          onSummaryData={(summary) => setSummary(summary)}
        />

        {/* Display the scraped data */}
        <div id="output" className="text-wrap">
          <h3>Scraped Data:</h3>
          {scrapedData ? <pre>{scrapedData}</pre> : "No data scraped yet."}
        </div>

        {/* Display the summarized data */}
        <div id="summary" className="text-wrap">
          <h3>Summarized Data:</h3>
          {summary ? <pre>{summary}</pre> : "No summary available yet."}
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
