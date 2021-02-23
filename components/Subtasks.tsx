import React, { FC } from 'react';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { FaGripVertical } from 'react-icons/fa';

interface Props {
  task: Task;
  taskNum: number;
  onSubChecked: (
    e: React.ChangeEvent<HTMLInputElement>,
    parent: string,
  ) => void;
}

const Subtasks: FC<Props> = ({ task, taskNum, onSubChecked }) => {
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
                            <td>
                              <input
                                type='checkbox'
                                id={subtask.id}
                                name='completed'
                                checked={subtask.completed}
                                onChange={e => onSubChecked(e, subtask.parent!)}
                              />
                              <label htmlFor={subtask.id}>{subtask.name}</label>
                            </td>
                            <td>
                              <span className='right'>
                                <p>
                                  Price: <strong>{subtask.price}</strong>
                                </p>
                              </span>
                            </td>
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
