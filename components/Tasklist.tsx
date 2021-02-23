import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../util/dragndroputils';
import Subtasks from './Subtasks';
import { FaGripVertical } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import Show from './Show';
import TaskForm from './TaskForm';

interface Props {
  id: string;
  tasklist: Task[];
  setTasklist: Dispatch<SetStateAction<Task[]>>;
}

const TaskList: FC<Props> = ({ id, tasklist, setTasklist }) => {
  const [show, setShow] = useState('all');

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTasks = tasklist.map(task => {
      if (task.id === e.target.id) {
        task.completed = !task.completed;
        if (task.subtasks) {
          task.subtasks.map(subtask => {
            subtask.completed = task.completed;
          });
        }
      }
      return task;
    });

    setTasklist(newTasks);
  };

  const onSubChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    parent: string,
  ) => {
    const newTasks = tasklist.map((task: Task) => {
      if (task.id === parent) {
        if (task.subtasks) {
          task.subtasks.map((subtask: Task) => {
            if (subtask.id === e.target.id) {
              subtask.completed = !subtask.completed;
            }
            if (!subtask.completed && task.completed) {
              task.completed = false;
            }
            return subtask;
          });
          if (task.subtasks.every(subtask => subtask.completed)) {
            task.completed = true;
          }
        }
      }
      return task;
    });
    setTasklist(newTasks);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.type === 'TASKS') {
      let reorderedTasks = reorder(
        tasklist,
        result.source.index,
        result.destination.index,
      );

      setTasklist(reorderedTasks);
    } else {
      const subtasks = reorder(
        tasklist[parseInt(result.type, 10)].subtasks!,
        result.source.index,
        result.destination.index,
      );

      const newtasks = JSON.parse(JSON.stringify(tasklist));

      newtasks[result.type].subtasks = subtasks;

      setTasklist(newtasks);
    }
  };

  const isShown = (completed: boolean) => {
    if (show === 'done' && !completed) {
      return false;
    } else if (show === 'wip' && completed) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className='tasklist-container'>
      <Show show={show} setShow={setShow} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' type='TASKS'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`tasklist ${
                snapshot.isDraggingOver && 'tasklist-dragging'
              }`}>
              {tasklist.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`task ${
                        snapshot.isDragging ? 'task-dragging' : ''
                      } ${isShown(task.completed) ? '' : 'no-display'}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}>
                      <span {...provided.dragHandleProps}>
                        <FaGripVertical />
                      </span>

                      <input
                        id={task.id}
                        data-testid='task-checkbox'
                        type='checkbox'
                        checked={task.completed}
                        onChange={onChecked}
                      />
                      <label htmlFor={task.id}>{task.name}</label>
                      <AiFillEdit />
                      <span className='right'>
                        <p>
                          Base Price: <strong>{Number(task.price)}</strong>
                        </p>

                        {task.subtasks && task.subtasks.length > 0 && (
                          <p>
                            Total Price:{' '}
                            <strong>
                              {Number(task.price) +
                                task.subtasks
                                  .map(t => Number(t.price))
                                  .reduce(
                                    (accumulator, currentValue) =>
                                      accumulator + currentValue,
                                    0,
                                  )}
                            </strong>
                          </p>
                        )}
                      </span>
                      {task.subtasks && task.subtasks.length > 0 && (
                        <Subtasks
                          taskNum={index}
                          task={task}
                          onSubChecked={onSubChecked}
                        />
                      )}
                      <TaskForm
                        id={id}
                        parent={task.id}
                        index={task.subtasks?.length || 0}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
