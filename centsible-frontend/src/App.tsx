import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ChatBot from './ChatBot.tsx';
import Summary from './components/Summary.tsx';

function App() {
  return (
 
    <>

    <Tabs>
      <TabList>
        <Tab>Summary</Tab>
        <Tab>ChatBot</Tab>
      </TabList>

      <TabPanel>
        <h1 className="font-bold text-3xl pb-2">Summary</h1>
        <Summary />
      </TabPanel>

      <TabPanel>
        <p className="font-bold text-3xl pb-2">ChatBot</p>
        <ChatBot />
      </TabPanel>
    </Tabs>

    </>


  );
}

export default App;
