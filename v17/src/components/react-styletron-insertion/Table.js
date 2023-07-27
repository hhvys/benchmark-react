import React, { useEffect } from 'react';

import { Provider as StyletronProvider, useStyletron } from "styletron-react";

import { Client } from 'styletron-engine-atomic';

const useInsertionEffect = React.useInsertionEffect || ((cb) => cb());

class SpacewebStyletronAtomic extends Client {
  originalOnNewStyle = undefined;
  stylesToInject = [];

  constructor(opts) {
    super(opts);
    this.originalOnNewStyle = this.styleCache.onNewValue.bind(this);
    const onNewStyle = (cache, id, value) => {
      // console.log('id, value', id, value);
      this.stylesToInject.push([id, value]);
      // console.log('id, value', id, value);
      // this.originalOnNewStyle({}, id, value)
    };
    this.styleCache.onNewValue = onNewStyle;
    Object.values(this.styleCache.caches).forEach(cache => {
      cache.onNewValue = onNewStyle;
    });
  }
}

const engine = new Client();

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
  return <div
    key={String(i) + String(j)}
    className={css({
      display: 'table-cell',
      padding: '10px',
      backgroundColor: 'rgba(74, 174, 53, ' + x + ')',
    })}
    // style={{
    //   backgroundColor: 'rgba(74, 174, 53, ' + x + ')',
    // }}
  >
    {toPercent(x)}
  </div>;
};

const Table = ({ table, toPercent }) => {
  const [css] = useStyletron();
  // useInsertionEffect(() => {
  //   // console.log('Table insertion', table.length);
  //   if (!engine.stylesToInject.length) {
  //     return;
  //   }
  //   console.log(engine.stylesToInject.length);
  //   engine.stylesToInject.forEach(([id, value]) => {
  //     engine.originalOnNewStyle({ key: '' }, id, value);
  //   });
  //   // console.log('new styles inserted', engine.stylesToInject.length);
  //   engine.stylesToInject = [];
  // });
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
