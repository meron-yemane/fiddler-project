import React from 'react';
import './TableDisplay.scss';
import FormattedTableColumnHeaders from '../formattedTableColumnHeaders/FormattedTableColumnHeaders';
import FormattedTableRowData from '../formattedTableRowData/FormattedTableRowData';

function TableDisplay(props) {
  return (
    <section>
      <h3 id="table__header">Loan Data Table</h3>
      <table id="table__data">
        <tbody>
          <tr>
            <FormattedTableColumnHeaders tableColumnHeaders={props.tableColumnHeaders} />
          </tr>
          <FormattedTableRowData tableRowData={props.tableRowData} />
        </tbody>
      </table>
    </section>
  )
}

export default TableDisplay;