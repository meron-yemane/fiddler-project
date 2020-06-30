import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import PlotGenerationPage from './app/components/plotGenerationPage/PlotGenerationPage';
import Dashboard from './app/components/dashboard/Dashboard';
import Navigationbar from './app/components/navigationbar/Navigationbar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import loanData from './loanData';
import loanDataAxisLabels from './loanDataAxisLabels';
import { NotificationContainer } from 'react-notifications';

class App extends React.Component {
  exampleLoan = loanData[0];

  constructor(props) {
    super(props);
    this.state = {
      tableColumnHeaders: [],
      tableRowData: [],
      savedScatterPlots: [],
      // simulating responses from api
      axisLabels: [...loanDataAxisLabels],
      loanData: [...loanData],
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
      headerData.push(header);
    };

    for (const row of this.state.loanData) {
      rowData.push(this.addDataToRow(row));
    };
    this.setState({
      tableColumnHeaders: [...headerData],
      tableRowData: [...rowData],
    });
  }

  addDataToRow(row) {
    const data = Object.entries(row);
    return data.map((pair, index) => {
      return {
        key: index,
        value: pair[1],
      }
    });
  }

  addScatterPlotToGrid(scatterPlotData) {
    const newChartData = {
      chartData: scatterPlotData.chartData,
      chartOptions: scatterPlotData.chartOptions,
    };
    this.setState((prevState) => ({
      savedScatterPlots: prevState.savedScatterPlots.concat(newChartData)
    }));
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
            <PlotGenerationPage loanData={this.state.loanData} axisLabels={this.state.axisLabels} onScatterPlotSave={this.addScatterPlotToGrid} />
          )} />
        </div>
        <NotificationContainer />
      </Router>
    );
  }
}

export default App;
