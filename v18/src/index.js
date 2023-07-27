import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components';

const AppContainer = () => {
  const [Table, setTable] = React.useState(null);
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    import(`./components/${urlParams.get('scenario') ?? 'react'}/Table`).then(x => {
      setTable(() => x.default);
    });
  }, []);
  return Table ? <App table={Table} /> : null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContainer />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
