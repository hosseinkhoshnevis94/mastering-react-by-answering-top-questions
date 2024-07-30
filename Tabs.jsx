import React, { createContext, useContext, useState } from 'react';
// compound component pattern

// Create the Tab context
const TabContext = createContext();

// Main Tabs component
export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(1);
  const value = { activeTab, setActiveTab };

  return (
    <TabContext.Provider value={value}>
      <div>{children}</div>
    </TabContext.Provider>
  );
}

// Tab component
export function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isOpen = activeTab === index;

  return (
    <button
      disabled={isOpen}
      style={{ background: isOpen ? 'red' : 'transparent' }}
      onClick={() => setActiveTab(index)}
      aria-selected={isOpen}
      role="tab"
    >
      {children}
    </button>
  );
}

// TabList component
export function TabList({ children }) {
  return <div role="tablist">{children}</div>;
}

// TabPanel component
export function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabContext);
  const isOpen = activeTab === index;

  return isOpen ? <div role="tabpanel">{children}</div> : null;
}



//Second way of defining sub-components:

// Tab component
 Tabs.Tab =  function({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isOpen = activeTab === index;

  return (
    <button
      disabled={isOpen}
      style={{ background: isOpen ? 'red' : 'transparent' }}
      onClick={() => setActiveTab(index)}
      aria-selected={isOpen}
      role="tab"
    >
      {children}
    </button>
  );
}

// TabList component
Tab.TabList =  function ({ children }) {
  return <div role="tablist">{children}</div>;
}

// TabPanel component
Tab.TabPanel =  function ({ children, index }) {
  const { activeTab } = useContext(TabContext);
  const isOpen = activeTab === index;

  return isOpen ? <div role="tabpanel">{children}</div> : null;
}
