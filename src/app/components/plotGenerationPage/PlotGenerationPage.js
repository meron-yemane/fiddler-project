import React from 'react';
import './PlotGenerationPage.scss';
import { Scatter } from 'react-chartjs-2';
import { NotificationManager } from 'react-notifications';
import DropDownOptions from '../dropDownOptions/dropDownOptions';

class PlotGenerationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.configureChartData(),
      chartOptions: this.configureChartOptions(),
      chartXCoordinateValue: '',
      chartYCoordinateValue: '',
    };
    this.handleXCoordinateSelect = this.handleXCoordinateSelect.bind(this);
    this.handleYCoordinateSelect = this.handleYCoordinateSelect.bind(this);
    this.generateDataForScatterPlot = this.generateDataForScatterPlot.bind(this);
    this.handleScatterPlotSave = this.handleScatterPlotSave.bind(this);
  }

  configureChartData() {
    return {
      datasets: [
        {
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
  }

  configureChartOptions() {
    return {
      showLines: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "",
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "",
          }
        }]
      },
    };
  }

  generateDataForScatterPlot() {
    const newChartOptions = (chartOptions, xAxis, yAxis) => {
      chartOptions.scales.xAxes[0].scaleLabel.labelString = xAxis;
      chartOptions.scales.yAxes[0].scaleLabel.labelString = yAxis;
      return chartOptions;
    }

    const newChartData = (chartData, xAxis, yAxis) => {
      chartData.datasets[0].data = this.props.loanData.reduce((accumulator, currentValue) => {
        accumulator.push({
          x: currentValue[xAxis],
          y: currentValue[yAxis],
        });
        return accumulator;
      }, []);
      return chartData;
    }

    this.setState((prevState) => ({
      chartOptions: newChartOptions(prevState.chartOptions, prevState.chartXCoordinateValue, prevState.chartYCoordinateValue),
      chartData: newChartData(prevState.chartData, prevState.chartXCoordinateValue, prevState.chartYCoordinateValue),
    }));
  }

  handleXCoordinateSelect(event) {
    this.setState({ chartXCoordinateValue: event.target.value });
    this.generateDataForScatterPlot();
  }

  handleYCoordinateSelect(event) {
    this.setState({ chartYCoordinateValue: event.target.value });
    this.generateDataForScatterPlot();
  }

  handleScatterPlotSave() {
    this.props.onScatterPlotSave({
      chartData: this.state.chartData,
      chartOptions: this.state.chartOptions,
    });
    this.displayToastr('success');
  }

  displayToastr(type) {
    switch (type) {
      case 'success':
        NotificationManager.success('Scatter plot successfully saved to dashboard', '', 2500);
        break;
      case 'error':
        NotificationManager.error('There was an error while saving, please try again.');
        break;
      default:
        return;
    };
  };

  render() {
    return (
      <div id="chart__scatter">
        <div id="chart__scatter-form">
          <div id="chart__scatter-select-forms">
            <div className="form-group chart__scatter-form-select">
              <label htmlFor="ScatterXAxis">X-axis</label>
              <select value={this.state.chartXCoordinateValue} onChange={this.handleXCoordinateSelect} className="form-control" id="ScatterXAxis">
                <DropDownOptions list={this.props.axisLabels} />
              </select>
            </div>
            <div className="form-group chart__scatter-form-select chart__scatter-forms--y-axis">
              <label htmlFor="ScatterYAxis">Y-axis</label>
              <select value={this.state.chartYCoordinateValue} onChange={this.handleYCoordinateSelect} className="form-control" id="ScatterYAxis">
                <DropDownOptions list={this.props.axisLabels} />
              </select>
            </div>
          </div>
          <button onClick={this.handleScatterPlotSave} disabled={!(this.state.chartXCoordinateValue?.length > 0 && this.state.chartYCoordinateValue?.length > 0)} type="button" className="btn btn-success chart__scatter-button--save">Save</button>
        </div>
        <h2 id="chart__scatter-header">Loan Data Scatter Plot</h2>
        <Scatter data={this.state.chartData}
          options={this.state.chartOptions} />
      </div>
    );
  }
}
export default PlotGenerationPage