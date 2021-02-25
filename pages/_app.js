import '../styles/root.css';
import '../styles/globals.css';
import '../styles/tasklist.css';
import '../styles/form.css';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// export const firebaseConfig = {
//   apiKey: process.env.FIREBASE_KEY,
//   authDomain: 'iku-iku.firebaseapp.com',
//   projectId: 'iku-iku',
//   storageBucket: 'iku-iku.appspot.com',
//   messagingSenderId: process.env.FIREBASE_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBRNba2Vs3JjodNIrPN7NX2iWKkbdVWb_A',
  authDomain: 'iku-temp.firebaseapp.com',
  projectId: 'iku-temp',
  storageBucket: 'iku-temp.appspot.com',
  messagingSenderId: '443313388027',
  appId: '1:443313388027:web:73addf7e4e672df669f35e',
};

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Component {...pageProps} />;
    </FirebaseAppProvider>
  );
}

export default MyApp;
