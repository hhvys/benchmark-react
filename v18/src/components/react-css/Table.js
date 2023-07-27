import React from 'react';
import './Table.css';

const Cell = ({ toPercent, i, j, x }) => {
  return <div
    key={`${i}${j}`}
    className="cell"
    style={{ background: `rgba(74, 174, 53, ${x})` }}
  >
    {toPercent(x)}
  </div>;
};

const Table = ({ table, toPercent }) => (
  <div className="table">
    {table.map((row, i) => (
      <div key={i} className="row">
        {row.map((x, j) => (
          <Cell key={`${i}-${j}`} toPercent={toPercent} i={i} j={j} x={x} />
        ))}
      </div>
    ))}
  </div>
);

export default Table;
