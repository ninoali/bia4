interface Config {
  app: {
    title: string;
    apiUrl: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}

export const config: Config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'DIX Platform',
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  },
  firebase: {
    apiKey: "AIzaSyAT1phhXz-BgtP35j_0_gjUZz7WVorGDzQ",
    authDomain: "biaa-e6bea.firebaseapp.com",
    projectId: "biaa-e6bea",
    storageBucket: "biaa-e6bea.firebasestorage.app",
    messagingSenderId: "928267449519",
    appId: "1:928267449519:web:bd59b66644b0d8954a105a",
    measurementId: "G-PYWLR3C6KC"
  },
};