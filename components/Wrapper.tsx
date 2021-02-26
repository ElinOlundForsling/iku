import React, { FC, ReactNode } from 'react';
import { preloadFirestore, useFirebaseApp } from 'reactfire';

const preloadSDKs = (firebaseApp: any) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      },
    }),
  ]);
};

type Props = {
  children: React.ReactNode;
};

const Wrapper: FC<Props> = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  preloadSDKs(firebaseApp);
  return <>{children}</>;
};

export default Wrapper;
