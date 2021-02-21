import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { encodeName } from '../util/regex';
import { useFirestore } from 'reactfire';

interface CreateTaskListInput {
  name: string;
}

const CreateTaskList = () => {
  const { register, handleSubmit, errors } = useForm();
  const tasklistCollection = useFirestore().collection('tasklists');
  const router = useRouter();

  const createTaskList = async (data: CreateTaskListInput) => {
    const { name } = data;
    const codeName = encodeName(name);

    try {
      await tasklistCollection.doc(codeName).set({ name });
      router.push(`/tasklists/${codeName}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createTaskList)}>
      <div>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Tasklist name...'
          ref={register({ required: true, pattern: /^[A-Z][\w \s ]+/i })}
        />
        {errors.name && (
          <p>
            Name must start with a letter and only contain letters, numbers,
            underscores and whitespaces
          </p>
        )}
      </div>

      <button type='submit'>Create Tasklist!</button>
    </form>
  );
};

export default CreateTaskList;
