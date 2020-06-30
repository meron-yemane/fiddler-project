import React from 'react';
import './FormattedTableRowData.scss';

const FormattedTableData = (props) => {
  return props.row.map(dataPoint => <td key={dataPoint.key}>{dataPoint.value}</td>)
}

const FormattedTableRowData = (props) => {
  return props.tableRowData.map((row, index) => {
    return <tr key={index}>
      <FormattedTableData row={row} />
    </tr>
  });
}

export default FormattedTableRowData;