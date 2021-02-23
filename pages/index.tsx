import Head from 'next/head';
import CreateTaskList from '../components/CreateTaskList';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.home}>
          <h1 className={styles.title}>IKU いく</h1>
          <CreateTaskList />
        </div>
      </main>
    </div>
  );
}
