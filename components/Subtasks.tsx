import React, { FC, Dispatch, SetStateAction } from 'react';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import TaskForm from './TaskForm';

interface Props {
  id: string;
  task: Task;
  taskNum: number;
  onSubChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    parent: string,
  ) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  edit: string | null;
  setEdit: Dispatch<SetStateAction<string | null>>;
}

const Subtasks: FC<Props> = ({
  id,
  task,
  taskNum,
  onSubChecked,
  onDelete,
  edit,
  setEdit,
}) => {
  return (
    <Droppable droppableId={`droppable${task.id}`} type={`${taskNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`subtasklist ${
            snapshot.isDraggingOver && 'subtasklist-dragging'
          }`}>
          {task &&
            task.subtasks &&
            task.subtasks.map((subtask: Task) => {
              return (
                <Draggable
                  key={`${taskNum}${subtask.index}`}
                  draggableId={`${taskNum}${subtask.index}`}
                  index={Number(subtask.index)}>
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot,
                  ) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`subtask ${
                        snapshot.isDragging && 'subtask-dragging'
                      }`}>
                      <table>
                        <tbody>
                          <tr>
                            <th>
                              <span
                                {...provided.dragHandleProps}
                                className='subtask-grip'>
                                <FaGripVertical />
                              </span>
                            </th>

                            {edit === subtask.id ? (
                              <td>
                                <TaskForm
                                  id={id}
                                  index={subtask.index}
                                  parent={subtask.parent}
                                  task={subtask}
                                  setEdit={setEdit}
                                />
                              </td>
                            ) : (
                              <>
                                <td>
                                  <input
                                    type='checkbox'
                                    id={subtask.id}
                                    name='completed'
                                    checked={subtask.completed}
                                    onChange={e =>
                                      onSubChecked(e, subtask.parent!)
                                    }
                                  />
                                  <label htmlFor={subtask.id}>
                                    {subtask.name}
                                  </label>
                                  <button
                                    id={subtask.id}
                                    className='tasklist-btn'
                                    onClick={() => setEdit(subtask.id)}>
                                    <AiFillEdit />
                                  </button>
                                </td>
                                <td>
                                  <span className='right'>
                                    <p>
                                      Price: <strong>{subtask.price}</strong>
                                      &nbsp;&nbsp;
                                      <button
                                        id={subtask.id}
                                        className='tasklist-btn'
                                        onClick={onDelete}>
                                        <FaTrashAlt />
                                      </button>
                                    </p>
                                  </span>
                                </td>
                              </>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </Draggable>
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Subtasks;
