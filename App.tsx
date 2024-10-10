import React from 'react';
import Routes from './src/routes/Routes';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
