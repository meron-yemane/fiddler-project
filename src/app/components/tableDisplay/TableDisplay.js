import React from 'react';
import './TableDisplay.scss';

function TableDisplay(props) {
  return (
    <section>
      <h3 id="table__header">Loan Data Table</h3>
      <table id="table__data">
        <tr>
          {props.tableColumnHeaders}
        </tr>
        {props.tableRowData}
      </table>
    </section>
  )
}

export default TableDisplay;