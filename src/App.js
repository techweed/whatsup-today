import React from "react";
import { Provider } from "react-redux";
import Store from "./store";
import AppRoutes from "./router";

function App() {
  return (
    <Provider store={Store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
