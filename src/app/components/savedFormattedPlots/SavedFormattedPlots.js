import React from 'react';
import { Scatter } from 'react-chartjs-2';

const SavedFormattedPlots = (props) => {
  return props.scatterPlots.map((scatterPlot, index) => <li key={index}><Scatter data={scatterPlot.chartData} options={scatterPlot.chartOptions} /></li>);
}

export default SavedFormattedPlots;