import React, { useEffect } from 'react';

import { Provider as StyletronProvider, useStyletron } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

// 1. Create a client engine instance
const engine = new Styletron();

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
  const [css] = useStyletron();
  // console.log(i, j, x);
  return <div
    key={String(i) + String(j)}
    className={css({
      display: 'table-cell',
      padding: '10px',
      backgroundColor: 'rgba(74, 174, 53, ' + x + ')',
    })}
    style={{ backgroundColor: 'rgba(74, 174, 53, ' + x + ')' }}
  >
    {toPercent(x)}
  </div>;
};

const Table = ({ table, toPercent }) => {
  const [css] = useStyletron();
  // console.log('Table rendering', table.length);
  // useEffect(() => {
  //   console.log('Table rendered', table.length);
  // });
  return (
    <div className={css(styles.table)}>
      {table.map((row, i) => (
        <div key={i} className={css(styles.row)}>
          {row.map((x, j) => (
            <Cell key={`${i}-${j}`} toPercent={toPercent} i={i} j={j} x={x} />
          ))}
        </div>
      ))}
    </div>
  );
};

const TableContainer = (props) => {
  return <StyletronProvider value={engine}>
    <Table {...props} />
  </StyletronProvider>;
};

export default TableContainer;
