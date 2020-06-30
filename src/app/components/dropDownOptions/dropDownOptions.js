import React from 'react';

const DropDownOptions = (props) => {
  return props.list.map(label => <option value={label} key={label}>{label}</option>);
}

export default DropDownOptions;