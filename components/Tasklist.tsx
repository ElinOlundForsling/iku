import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  reorder,
  getTaskListStyle,
  getParentTaskStyle,
} from '../util/dragndroputils';
import Subtasks from './Subtasks';
import { FaGripVertical } from 'react-icons/fa';
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

  return (
    <>
      <Show show={show} setShow={setShow} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' type='TASKS'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getParentTaskStyle(snapshot.isDraggingOver)}>
              {tasklist.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getTaskListStyle(
                        snapshot.isDragging,
                        provided.draggableProps,
                        show,
                        task.completed,
                      )}>
                      {task.name}{' '}
                      {task.subtasks
                        ? task.price +
                          task.subtasks
                            .map(t => Number(t.price))
                            .reduce(
                              (accumulator, currentValue) =>
                                accumulator + currentValue,
                              0,
                            )
                        : task.price}{' '}
                      <input
                        type='checkbox'
                        id={task.id}
                        name='completed'
                        checked={task.completed}
                        onChange={onChecked}></input>
                      <span {...provided.dragHandleProps}>
                        <FaGripVertical />
                      </span>
                      {task.subtasks && (
                        <Subtasks taskNum={index} task={task} />
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
    </>
  );
};

export default TaskList;
