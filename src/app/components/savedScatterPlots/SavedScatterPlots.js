import React from 'react';
import './SavedScatterPlots.scss';

function SavedScatterPlots(props) {
  return (
    <section>
      <h2 className="scatter-plots__header">Saved Scatter Plots</h2>
      <ul className="scatter-plots">
        {props.savedScatterPlots}
      </ul>
    </section>
  )
}

export default SavedScatterPlots;