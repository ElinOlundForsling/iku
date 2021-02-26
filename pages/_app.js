import '../styles/root.css';
import '../styles/globals.css';
import '../styles/tasklist.css';
import '../styles/form.css';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import Wrapper from '../components/Wrapper';

const firebaseConfig = {
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
      <Wrapper>
        <Component {...pageProps} />;
      </Wrapper>
    </FirebaseAppProvider>
  );
}

export default MyApp;
