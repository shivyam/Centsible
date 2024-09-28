import './App.css'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


function App() {

  return(
  <Tabs>
    <TabList>
      <Tab>Summary</Tab>
      <Tab>ChatBot</Tab>
      <Tab>Resources</Tab>
    </TabList>

    <TabPanel>
      <h2>Summary: </h2>
    </TabPanel>
    <TabPanel>
      <h2>ChatBot: </h2>
    </TabPanel>
    <TabPanel>
      <h2>Additional Resources: </h2>
    </TabPanel>
  </Tabs>
  )
}

export default App;