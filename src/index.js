import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
//rtk
import { Provider } from 'react-redux'
import { store } from './Redux/store';
//i18
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';


i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({ 
    supportedLngs: ['uz','en', 'ru'],
    fallbackLng: "uz", 
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      cashes: "Cookie",
    },
    backend: {
      loadPath: '/assets/locals/{{lng}}/translation.json',
    },
    react: {useSuspense: false}
  });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
 
