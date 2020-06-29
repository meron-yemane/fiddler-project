import React from 'react';
import './SavedScatterPlots.scss';

function SavedScatterPlots(props) {
  return (
    <section>
      <h2 className="scatter-plots__header">Saved Scatter Plots</h2>
      {props.savedScatterPlots?.length === 0 ? <h5 className="scatter-plots__no-plots-message">No saved scatter plots to display</h5> : null}
      <ul className="scatter-plots">
        {props.savedScatterPlots}
      </ul>
    </section>
  )
}

export default SavedScatterPlots;