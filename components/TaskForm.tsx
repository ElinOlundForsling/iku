import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';

interface TaskFormProps {
  id: string;
  parent: string | null;
  index: number;
}

interface CreateTaskProps {
  name: string;
  price: number;
}

const TaskForm: FC<TaskFormProps> = ({ id, parent = null, index }) => {
  const { register, handleSubmit, errors } = useForm<CreateTaskProps>({
    defaultValues: {
      price: 0,
    },
  });
  const taskCollection = useFirestore()
    .collection('tasklists')
    .doc(id)
    .collection('tasks')
    .doc();

  const createTaskList = async (data: CreateTaskProps) => {
    const { name, price } = data;
    try {
      await taskCollection.set({
        name,
        price,
        complete: false,
        id: taskCollection.id,
        index,
        parent: parent,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createTaskList)}>
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

      <button type='submit'>Create Tasklist!</button>
    </form>
  );
};

export default TaskForm;
