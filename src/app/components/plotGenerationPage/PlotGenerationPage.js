import React from 'react';
import './PlotGenerationPage.scss';
import { Scatter } from 'react-chartjs-2';
import loanData from '../../../loanData';

class PlotGenerationPage extends React.Component {
  chartXCoordinateValue = '';
  chartYCoordinateValue = '';
  chartOptions = {};
  chartSelectOptions = [];
  exampleLoan = loanData[0];

  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      chartOptions: {},
    };
    this.handleXCoordinateSelect = this.handleXCoordinateSelect.bind(this);
    this.handleYCoordinateSelect = this.handleYCoordinateSelect.bind(this);
    this.generateDataForScatterPlot = this.generateDataForScatterPlot.bind(this);
    this.configurePlotGenerationData();
  }

  configurePlotGenerationData() {
    this.chartSelectOptions.push(<option></option>);
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
    this.state.chartOptions = {
      showLines: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.chartYCoordinateValue,
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.chartXCoordinateValue,
          }
        }]
      },
    };
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
    let chartScalesOptionsCopy = { ...this.state.chartOptions.scales };
    let chartOptionsYaxisCopy = chartScalesOptionsCopy.yAxes.slice(0);
    let chartOptionsXaxisCopy = chartScalesOptionsCopy.xAxes.slice(0);
    chartOptionsYaxisCopy[0].scaleLabel.labelString = this.chartYCoordinateValue;
    chartOptionsXaxisCopy[0].scaleLabel.labelString = this.chartXCoordinateValue;
    chartScalesOptionsCopy.yAxes = chartOptionsYaxisCopy;
    chartScalesOptionsCopy.xAxes = chartOptionsXaxisCopy;

    this.setState({
      chartOptions: Object.assign({}, this.state.chartOptions, {
        scales: chartScalesOptionsCopy,
      }),
      chartData: Object.assign({}, this.state.chartData, {
        dataSets: datasetsCopy,
      }),
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
      <div id="chart__scatter">
        <div id="chart__scatter-form">
          <div id="chart__scatter-select-forms">
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
          <button disabled={!(this.chartXCoordinateValue?.length > 0 && this.chartYCoordinateValue?.length > 0)} type="button" className="btn btn-success chart__scatter-button--save">Save</button>
        </div>
        <h2>Loan Data Scatter Plot </h2>
        <Scatter data={this.state.chartData}
          options={this.state.chartOptions} />
      </div>
    );
  }
}
export default PlotGenerationPage