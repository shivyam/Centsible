import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ChatBot from './components/ChatBot.tsx';
import Summary from './components/Summary.tsx';

function App() {
  return (
    <>
    <p className="text-3xl font-bold pb-3">Centsible</p>
    <Tabs>
      <TabList>
        <Tab>Summary</Tab>
        <Tab>ChatBot</Tab>
      </TabList>

      <TabPanel>
        <Summary />
      </TabPanel>

      <TabPanel>
        <ChatBot />
      </TabPanel>
    </Tabs>

    </>


  );
}

export default App;
