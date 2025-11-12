import React from 'react';
import './App.scss';
import { Computer, MainFrame } from './components';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Computer>
                    <MainFrame />
                </Computer>
            </div>
        </Provider>
    );
}

export default App;
