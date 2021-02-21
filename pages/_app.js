import '../styles/globals.css';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'iku-iku.firebaseapp.com',
  projectId: 'iku-iku',
  storageBucket: 'iku-iku.appspot.com',
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Component {...pageProps} />;
    </FirebaseAppProvider>
  );
}

export default MyApp;
