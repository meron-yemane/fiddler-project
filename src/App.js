import React from 'react';
import './App.scss';
import loanData from './loanData';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Scatter } from 'react-chartjs-2';

class App extends React.Component {
  tableColumnHeaders = [];
  tableRowData = [];
  chartSelectOptions = [];
  exampleLoan = loanData[0];
  chartXCoordinateValue = '';
  chartYCoordinateValue = '';
  chartOptions = {};

  constructor(props) {
    super(props);
    this.state = { chartData: {} };
    this.configureData();

    this.handleXCoordinateSelect = this.handleXCoordinateSelect.bind(this);
    this.handleYCoordinateSelect = this.handleYCoordinateSelect.bind(this);
    this.generateDataForScatterPlot = this.generateDataForScatterPlot.bind(this);
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

    for (const [key, value] of Object.entries(this.exampleLoan)) {
      if (typeof value === 'number') {
        this.chartSelectOptions.push(<option>{key}</option>);
      }
    };
    this.state.chartData = {
      // labels: ['Scatter'],
      datasets: [
        {
          label: 'idk',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: '#0e64d2',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#0e64d2',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointHitRadius: 10,
          data: [],
        }
      ]
    };
    this.chartOptions = {
      showLines: false,
      maintainAspectRatio: false,
    };
  }

  addDataToRow(row) {
    const data = [];
    for (const [key, value] of Object.entries(row)) {
      data.push(<td key={key}>{value}</td>);
    }
    return data;
  }

  generateDataForScatterPlot() {
    let datasetsCopy = this.state.chartData.datasets.slice(0);
    let dataCopy = datasetsCopy[0].data.slice(0);
    dataCopy = loanData.reduce((accumulator, currentValue) => {
      accumulator.push({
        x: currentValue[this.chartXCoordinateValue],
        y: currentValue[this.chartYCoordinateValue],
      });
      return accumulator;
    }, []);
    datasetsCopy[0].data = dataCopy;
    this.setState({
      chartData: Object.assign({}, this.state.chartData, {
        dataSets: datasetsCopy,
      })
    });
  }

  handleXCoordinateSelect(event) {
    this.chartXCoordinateValue = event.target.value;
    this.generateDataForScatterPlot();
  }

  handleYCoordinateSelect(event) {
    this.chartYCoordinateValue = event.target.value;
    this.generateDataForScatterPlot();
  }

  render() {
    return (
      <div id="landing-page">
        <Navbar collapseOnSelect bg="light" id="navbar" expand="lg">
          <Navbar.Brand href="#dashboard">
            <img className="navbar__brand-img" src="https://uploads-ssl.webflow.com/5e067beb4c88a64e31622d4b/5e20ace96e02156e0600fa1f_favicon-webclip.png"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="navbar__link" href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link className="navbar__link" href="#link">Saved Plots</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <table id="grid">
          <tr>
            {this.tableColumnHeaders}
          </tr>
          {this.tableRowData}
        </table>

        <div id="chart__scatter">
          <div id="chart__scatter-forms">
            <div className="form-group chart__scatter-form-select">
              <label for="ScatterXAxis">X-axis</label>
              <select onChange={this.handleXCoordinateSelect} className="form-control" id="ScatterXAxis">
                {this.chartSelectOptions}
              </select>
            </div>
            <div className="form-group chart__scatter-form-select chart__scatter-forms--y-axis">
              <label for="ScatterYAxis">Y-axis</label>
              <select onChange={this.handleYCoordinateSelect} className="form-control" id="ScatterYAxis">
                {this.chartSelectOptions}
              </select>
            </div>
          </div>
          <h2>Scatter </h2>
          <Scatter data={this.state.chartData} width={50}
            height={350}
            options={this.chartOptions} />
        </div>
      </div>
    );
  }
}

export default App;
