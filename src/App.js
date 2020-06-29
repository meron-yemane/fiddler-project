import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlotGenerationPage from './app/components/plotGenerationPage/PlotGenerationPage';
import Dashboard from './app/components/dashboard/Dashboard';
import Navigationbar from './app/components/navigationbar/Navigationbar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import loanData from './loanData';
import { Scatter } from 'react-chartjs-2';

class App extends React.Component {
  exampleLoan = loanData[0];

  constructor(props) {
    super(props);
    this.state = {
      tableColumnHeaders: [],
      tableRowData: [],
      savedScatterPlots: [],
    };
    this.configureTableData = this.configureTableData.bind(this);
    this.addScatterPlotToGrid = this.addScatterPlotToGrid.bind(this);
  }

  componentDidMount() {
    this.configureTableData();
  }

  configureTableData() {
    const headerData = [];
    const rowData = [];
    for (const header of Object.keys(this.exampleLoan)) {
      headerData.push(<th key={header}>{header}</th>);
    };

    for (const row of loanData) {
      rowData.push(
        <tr>
          {
            this.addDataToRow(row)
          }
        </tr>
      )
    };
    this.setState({
      tableColumnHeaders: [...headerData],
      tableRowData: [...rowData],
    });
  }

  addDataToRow(row) {
    const data = Object.entries(row);
    return data.map(pair => {
      return <td key={pair[0]}>{pair[1]}</td>
    });
  }

  addScatterPlotToGrid(scatterPlotData) {
    const scatterPlotsCopy = [...this.state.savedScatterPlots];
    scatterPlotsCopy.push(<li><Scatter data={scatterPlotData.chartData} options={scatterPlotData.chartOptions} /></li>);
    this.setState({
      savedScatterPlots: scatterPlotsCopy,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigationbar />
          <Route exact path="/" render={(props) => (
            <Dashboard {...props} savedScatterPlots={this.state.savedScatterPlots} tableRowData={this.state.tableRowData} tableColumnHeaders={this.state.tableColumnHeaders} />
          )} />
          <Route path="/dashboard" render={(props) => (
            <Dashboard {...props} savedScatterPlots={this.state.savedScatterPlots} tableRowData={this.state.tableRowData} tableColumnHeaders={this.state.tableColumnHeaders} />
          )} />
          <Route path="/generateplot" render={() => (
            <PlotGenerationPage onScatterPlotSave={this.addScatterPlotToGrid} />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
