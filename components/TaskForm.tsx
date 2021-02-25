import React, { FC, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { IoClose } from 'react-icons/io5';

interface TaskFormProps {
  id: string;
  index: number;
  parent?: string | null;
  task?: Task;
  setEdit?: Dispatch<SetStateAction<string | null>>;
}

interface CreateTaskProps {
  name: string;
  price: number;
}

const TaskForm: FC<TaskFormProps> = ({
  id,
  index,
  parent = null,
  task,
  setEdit,
}) => {
  const { register, handleSubmit, errors, setValue } = useForm<CreateTaskProps>(
    {
      defaultValues: {
        name: task ? task.name : undefined,
        price: task ? task.price : undefined,
      },
    },
  );
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
    if (task && setEdit) {
      await tasklistCollection
        .doc(task.id)
        .set(
          {
            name,
            price: price || 0,
          },
          { merge: true },
        )
        .catch(error => {
          console.error(error);
        });
      setEdit(null);
    } else {
      await taskCollection
        .set(
          {
            name,
            price: price || 0,
            completed: false,
            id: taskCollection.id,
            index,
            parent: parent,
          },
          { merge: true },
        )
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
    }
    setValue('name', '');
    setValue('price', '');
  };

  return (
    <>
      {errors.name && <p className='message'>Name is Required</p>}
      {errors.price && <p>Price can only be a number</p>}
      <form
        className={task ? 'tasklist-form' : parent ? 'tasklist-form' : 'form'}
        onSubmit={handleSubmit(createTaskList)}>
        <input
          type='text'
          name='name'
          placeholder={parent ? 'Subtask name' : 'Task name'}
          ref={register({ required: true })}
        />

        <input
          type='number'
          name='price'
          placeholder='Price'
          step='.01'
          ref={register()}
        />

        <button type='submit'>
          {task ? 'Edit' : parent ? 'Add Subtask!' : 'Add Task!'}
        </button>
        {setEdit && (
          <button className='btn-close' onClick={() => setEdit(null)}>
            <IoClose />
          </button>
        )}
      </form>
    </>
  );
};

export default TaskForm;
