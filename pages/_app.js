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
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
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
