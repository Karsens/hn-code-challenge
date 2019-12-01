import { AsyncStorage } from "react-native";
import { createStore, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";

const getStore = reducer => {
  const config = {
    key: "v3",
    storage: AsyncStorage,
    whitelist: ["data"] // NB: All reducers are in data, since it's just one reducer file, for now.
  };

  const reducers = {
    data: reducer
  };

  const rootReducer = persistCombineReducers(config, reducers);
  const store = createStore(rootReducer, compose());
  const persistor = persistStore(store);

  return { store, persistor };
};

export default getStore;
