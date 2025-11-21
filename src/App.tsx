import "./App.scss";

import { Provider } from "react-redux";

import { store } from "store";
import { Computer, MainFrame } from "components";
import {InformationPanel} from "components/informationPanel";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Computer>
          <MainFrame />
        </Computer>
      </div>
      <InformationPanel />
    </Provider>
  );
}

export default App
