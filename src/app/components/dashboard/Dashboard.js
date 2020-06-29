import React from 'react';
import './Dashboard.scss';
import SavedScatterPlots from '../savedScatterPlots/SavedScatterPlots';

function Dashboard(props) {
  return (
    <section id="landing-page">
      <SavedScatterPlots savedScatterPlots={props.savedScatterPlots} />
      <table id="data-table">
        <tr>
          {props.tableColumnHeaders}
        </tr>
        {props.tableRowData}
      </table>
    </section>
  )
}

export default Dashboard;