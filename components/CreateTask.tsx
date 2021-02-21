import React from 'react';
import { useForm } from 'react-hook-form';
import { encodeName } from '../util/regex';
import { useFirestore } from 'reactfire';

interface CreateTaskInput {
  name: string;
  price: number;
}

interface Props {
  id: string;
}

const CreateTask: React.FC<Props> = ({ id }) => {
  const { register, handleSubmit, errors } = useForm();
  const taskCollection = useFirestore()
    .collection('tasklists')
    .doc(id)
    .collection('tasks')
    .doc();

  const createTask = async (data: CreateTaskInput) => {
    const { name, price } = data;

    try {
      await taskCollection.set({
        name,
        price,
        complete: false,
        id: taskCollection.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createTask)}>
      <div>
        <input
          type='text'
          name='name'
          placeholder='Task'
          ref={register({ required: true })}
        />
        {errors.name && <p>Required</p>}
      </div>
      <div>
        <input
          type='text'
          name='price'
          placeholder='Price'
          ref={register({ pattern: /^([0-9]+[0-9 \.]?[0-9]*)$/g })}
        />
        {errors.price && <p>Price can only be a number</p>}
      </div>

      <button type='submit'>Create Task!</button>
    </form>
  );
};

export default CreateTask;
