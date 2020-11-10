import React from 'react';
import Main from './pages/Main';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from '../node_modules/react-redux';
import { ConfigureStore } from './redux/configureStore';


const store = ConfigureStore();


function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
}

export default App;
