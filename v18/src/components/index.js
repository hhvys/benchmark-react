import React from 'react';
import { Profiler } from 'react';

const updates = [];
const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
) => {
  // console.log(id, phase, actualDuration);
  if (phase === 'update') {
    updates.push(actualDuration);
  }
};

function getTable(max = 30) {
  let table = [];
  for (let i = 0; i < max; i++) {
    table[i] = [1];
    for (let j = 1; j < max; j++) {
      const next = table[i][j - 1] - Math.random() * table[i][j - 1] / 10;
      table[i].push(next.toFixed(4));
    }
  }
  return table;
}

function getUniqueSize(table) {
  let set = new Set();
  table.forEach(row => row.forEach(x => set.add(x)));
  return set.size;
}

function toPercent(x) {
  return (x * 100).toFixed(2).toString() + '%';
}

async function runTestRerender() {
  const input = document.querySelector('input');
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => {
      performance.mark('startRerender' + i);
      input.click();

      setTimeout(() => {
        setTimeout(() => {
          performance.mark('endRerender' + i);
          performance.measure(
            'measureRerender' + i,
            'startRerender' + i,
            'endRerender' + i,
          );
          resolve();
        }, 0);
      }, 0);
    });
  }
}

function didMount() {
  if (!document.location.search.includes('test=true')) {
    return;
  }

  if (document.location.search.includes('butch=true')) {
    return runTestRerender();
  }

  const input = document.querySelector('input');
  input.click();
}

async function wait(ms) {
  return new Promise(res => setTimeout(() => res(), ms));
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      table: getTable(),
    };
  }

  componentDidMount() {
    didMount();
  }

  onChange = (e) => {
    this.setState({ input: e.target.value, table: getTable() });
    if (e.target.value === 'a') {
      React.startTransition(() => {
        this.setState({ table: getTable(100) });
      });
    }
  };

  handleClick = async () => {
    for (let i = 0; i < 10; i++) {
      this.setState({ table: getTable() });
      await wait(10);
    }
  };

  printAverage = () => {
    const sum = updates.reduce((tot, a) => tot + a, 0);
    console.log('Average Update time', sum / updates.length);
  };

  render() {
    const { table: Table } = this.props;
    return (
      <div>
        <div>
          <input type="submit" value="Rerender" onClick={this.handleClick} />
          <input type="submit" value="Log average" onClick={this.printAverage} />
          {/*<input value={this.state.input} onChange={this.onChange} />*/}
          {' '}
          <span>{getUniqueSize(this.state.table)} unique cells</span>
        </div>
        <Profiler id="Table" onRender={onRenderCallback}>
          <Table table={this.state.table} toPercent={toPercent} />
        </Profiler>
      </div>
    );
  }
}
