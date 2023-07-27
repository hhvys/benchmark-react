import React from 'react';

const styles = {
  table: {
    display: 'table',
    marginTop: '10px',
  },
  row: {
    display: 'table-row',
  },
};

const Cell = ({ toPercent, i, j, x }) => {
  return <div
    key={String(i) + String(j)}
    style={{
      display: 'table-cell',
      padding: '10px',
      backgroundColor: 'rgba(74, 174, 53, ' + x + ')',
    }}
  >
    {toPercent(x)}
  </div>;
};

const Table = ({ table, toPercent }) => (
  <div style={styles.table}>
    {table.map((row, i) => (
      <div key={i} style={styles.row}>
        {row.map((x, j) => (
          <Cell key={`${i}-${j}`} toPercent={toPercent} i={i} j={j} x={x} />
        ))}
      </div>
    ))}
  </div>
);

export default Table;
