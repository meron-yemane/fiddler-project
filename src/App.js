import React from 'react';
import './App.scss';
import loanData from './loanData';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  tableColumnHeaders = [];
  tableRowData = [];
  chartSelectOptions = [];
  exampleLoan = loanData[0];

  constructor(props) {
    super(props);
    this.configureData();
  }

  configureData() {
    for (const header of Object.keys(this.exampleLoan)) {
      this.tableColumnHeaders.push(<th key={header}>{header}</th>);
    };

    for (const row of loanData) {
      this.tableRowData.push(
        <tr>
          {
            this.addDataToRow(row)
          }
        </tr>
      )
    }
  }

  addDataToRow(row) {
    const data = [];
    for (const [key, value] of Object.entries(row)) {
      data.push(<td key={key}>{value}</td>);
    }
    return data;
  }

  render() {
    return (
      <div id="landing-page">
        <table id="grid">
          <tr>
            {this.tableColumnHeaders}
          </tr>
          {this.tableRowData}
        </table>
      </div>
    );
  }
}

export default App;
