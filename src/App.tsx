import "./App.scss";

import { Provider } from "react-redux";

import { store } from "store";
import { Computer, MainFrame } from "components";

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

export default App
