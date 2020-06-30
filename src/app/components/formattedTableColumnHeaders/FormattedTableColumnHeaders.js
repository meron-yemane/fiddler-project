import React from 'react';
import './FormattedTableColumnHeaders.scss';

const FormattedTableColumnHeaders = (props) => {
  return props.tableColumnHeaders.map(header => <th key={header}>{header}</th>);
}

export default FormattedTableColumnHeaders;