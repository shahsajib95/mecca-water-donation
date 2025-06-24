import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { LanguageProvider } from "./hooks/LanguageContext.tsx";

const AppWrapper = () => {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LanguageProvider>
  );
};

const rootElement = document.getElementById("root")!;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
}
