import { createRoot } from "react-dom/client";
import AppRouter from "@routes/AppRouter";

// redux toolkit
import { Provider } from "react-redux";
import { store, persistor } from "@store/index";
import { PersistGate } from "redux-persist/integration/react";
import "./services/axios-global.js";

// style
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
