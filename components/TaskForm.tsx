import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';

interface TaskFormProps {
  id: string;
  index: number;
  parent?: string | null;
}

interface CreateTaskProps {
  name: string;
  price: number;
}

const TaskForm: FC<TaskFormProps> = ({ id, index, parent = null }) => {
  const { register, handleSubmit, errors } = useForm<CreateTaskProps>({});
  const taskCollection = useFirestore()
    .collection('tasklists')
    .doc(id)
    .collection('tasks')
    .doc();
  const tasklistCollection = useFirestore()
    .collection('tasklists')
    .doc(id)
    .collection('tasks');

  const createTaskList = async (data: CreateTaskProps) => {
    const { name, price } = data;
    await taskCollection
      .set({
        name,
        price: price || 0,
        completed: false,
        id: taskCollection.id,
        index,
        parent: parent,
      })
      .catch(error => {
        console.error(error);
      });
    if (parent) {
      await tasklistCollection
        .doc(parent)
        .set({ completed: false }, { merge: true })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <form
      className={parent ? 'tasklist-form' : 'form'}
      onSubmit={handleSubmit(createTaskList)}>
      <input
        type='text'
        name='name'
        placeholder={parent ? 'Subtask name' : 'Task name'}
        ref={register({ required: true })}
      />
      {errors.name && <p>Required</p>}
      <input
        type='number'
        name='price'
        placeholder='Price'
        step='.01'
        ref={register()}
      />
      {errors.price && <p>Price can only be a number</p>}

      <button type='submit'>{parent ? 'Add Subtask!' : 'Add Task!'}</button>
    </form>
  );
};

export default TaskForm;
