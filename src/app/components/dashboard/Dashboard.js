import React from 'react';
import './Dashboard.scss';
import SavedScatterPlots from '../savedScatterPlots/SavedScatterPlots';
import TableDisplay from '../tableDisplay/TableDisplay';

function Dashboard(props) {
  return (
    <section id="landing-page">
      <SavedScatterPlots savedScatterPlots={props.savedScatterPlots} />
      <TableDisplay tableColumnHeaders={props.tableColumnHeaders} tableRowData={props.tableRowData} />
    </section>
  )
}

export default Dashboard;