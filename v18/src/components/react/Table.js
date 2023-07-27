import React from 'react';

const Cell = ({ toPercent, i, j, x }) => {
  return <div key={`${i}${j}`}>
    {toPercent(x)}
  </div>;
};
const Table = ({ table, toPercent }) => (
  <div>
    {table.map((row, i) => (
      <div key={i}>
        {row.map((x, j) => (
          <Cell key={`${i}-${j}`} toPercent={toPercent} i={i} j={j} x={x} />
        ))}
      </div>
    ))}
  </div>
);

export default Table;
