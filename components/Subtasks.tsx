import React, { FC } from 'react';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { getTaskListStyle, getSubTaskStyle } from '../util/dragndroputils';
import { FaGripVertical } from 'react-icons/fa';

interface Props {
  task: Task;
  taskNum: number;
}

const Subtasks: FC<Props> = ({ task, taskNum }) => {
  return (
    <Droppable droppableId={`droppable${task.id}`} type={`${taskNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getSubTaskStyle(snapshot.isDraggingOver)}>
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
                      style={getTaskListStyle(
                        snapshot.isDragging,
                        provided.draggableProps,
                      )}>
                      <span {...provided.dragHandleProps}>
                        <FaGripVertical />
                      </span>
                      {subtask.name}
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
