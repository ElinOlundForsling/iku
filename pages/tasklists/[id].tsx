import Head from 'next/head';
import { decodeName } from '../../util/regex';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import TaskForm from '../../components/TaskForm';
import { useState, useEffect, useRef, FC } from 'react';
import getTasks from '../../util/getTasks';
import TaskList from '../../components/Tasklist';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';

interface Props {
  id: string;
}

const Home: FC<Props> = ({ id }) => {
  const [tasklist, setTasklist] = useState([] as Task[]);
  const [copied, setCopied] = useState(false);

  const taskCollection = useFirestore()
    .collection('tasklists')
    .doc(id)
    .collection('tasks')
    .orderBy('index');
  const { data } = useFirestoreCollectionData(taskCollection, {
    idField: id,
  });
  const batch = useFirestore().batch();

  useEffect(() => {
    if (data) {
      const tasks = data.map(task => ({
        id: (task.id as string) || 'error',
        name: (task.name as string) || 'error',
        completed: (task.completed as boolean) || false,
        price: (task.price as number) || 0,
        index: (task.index as number) || 0,
        parent: (task.parent as string) || null,
      }));
      setTasklist(getTasks(tasks));
    }
  }, [data]);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    taskCollection
      .get()
      .then(resp => {
        resp.docs.forEach(docRef => {
          tasklist.forEach(task => {
            if (docRef.ref.id === task.id) {
              batch.update(docRef.ref, {
                completed: task.completed,
                index: task.index,
              });
            } else if (task.subtasks && task.subtasks.length > 0) {
              task.subtasks.forEach(subtask => {
                if (docRef.ref.id === subtask.id) {
                  batch.update(docRef.ref, {
                    completed: subtask.completed,
                    index: subtask.index,
                  });
                }
              });
            }
          });
        });
        batch.commit().catch(err => console.error(err));
      })
      .catch(error => console.error(error));
  }, [tasklist]);

  const name = decodeName(id);
  return (
    <div>
      <Head>
        <title>iku - {name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <h1 className='title'>{name}</h1>
        <article className='container'>
          {copied && <p>Copied!</p>}
          <TaskForm id={id} index={tasklist.length || 0} />
          <hr />
          {tasklist.length > 0 ? (
            <TaskList id={id} tasklist={tasklist} setTasklist={setTasklist} />
          ) : (
            <p>No tasks yet, add some above!</p>
          )}
          <hr />
          <form className='copy-form'>
            <p>Copy the url to this list:</p>
            <input
              type='text'
              value={`https://iku.vercel.app/tasklists/${id}`}
              readOnly
            />
            <CopyToClipboard
              text={`https://iku.vercel.app/tasklists/${id}`}
              onCopy={() => setCopied(true)}>
              <button>
                <BiCopy />
              </button>
            </CopyToClipboard>
          </form>
        </article>
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
    let url: string = '';
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
