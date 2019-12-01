import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import HomeScreen from "./screens/HomeScreen";
import getStore from "./store";
import { reducer } from "./reducer";

const { store, persistor } = getStore(reducer);

class App extends React.Component {
  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
