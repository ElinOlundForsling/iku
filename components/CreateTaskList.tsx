import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { encodeName } from '../util/regex';
import { useFirestore } from 'reactfire';

interface CreateTaskListInput {
  name: string;
}

const CreateTaskList: FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, errors } = useForm();
  const tasklistCollection = useFirestore().collection('tasklists');
  const router = useRouter();

  const createTaskList = async (data: CreateTaskListInput) => {
    const { name } = data;
    const codeName = encodeName(name);

    try {
      setMessage('Creating tasklist...');
      await tasklistCollection.doc(codeName).set({ name });
      router.push(`/tasklists/${codeName}`);
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error}. Please try again`);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(createTaskList)}>
      {message && <p className='message'>{message}</p>}
      <input
        type='text'
        id='name'
        name='name'
        placeholder='Enter tasklist name...'
        autoComplete='off'
        ref={register({ required: true, pattern: /^[A-Z][\w \s ]+/i })}
      />
      {errors.name && (
        <p>
          Name must start with a letter and only contain letters, numbers,
          underscores and whitespaces
        </p>
      )}

      <button className='btn btn1' type='submit'>
        Create
      </button>
    </form>
  );
};

export default CreateTaskList;
