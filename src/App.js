import React from 'react';
// TODO import when data table is polished
// import DataTable from './components/DataTable';
import TrendsVisualization from './components/TrendsVisualization';

function App() {
  return (
    <div className="App">
      <main className="container">
        {/* TODO improve data table probably to filter */}
        {/* <DataTable /> */}
        <TrendsVisualization />
      </main>
    </div>
  );
}

export default App;
