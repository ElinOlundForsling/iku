import Head from 'next/head';
import { decodeName } from '../../util/regex';
import styles from '../../styles/Home.module.css';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import CreateTask from '../../components/CreateTask';

interface Props {
  id: string;
}

const Home: React.FC<Props> = ({ id }) => {
  const taskCollection = useFirestore()
    .collection('tasklists')
    .doc(id)
    .collection('tasks');
  const { data: tasks } = useFirestoreCollectionData(taskCollection);

  const name = decodeName(id);
  return (
    <div>
      <Head>
        <title>iku - {name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <div>
          <CreateTask id={id} />
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    let id: string = '';
    if (context.params) {
      id = context.params.id as string;
    }
    return {
      props: {
        id,
      },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
};
