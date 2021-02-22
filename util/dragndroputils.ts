import { GetTaskListStyle, GetTaskStyle, IsShown, Reorder } from '../types';

export const reorder: Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const resultIndex = result.map((t, i) => {
    t.index = i;
    return t;
  });

  return resultIndex;
};

const grid = 6;
let display = 'block';

const isShown: IsShown = (show, completed) => {
  if (show === 'done' && !completed) {
    console.log('none 1');
    return 'none';
  } else if (show === 'wip' && completed) {
    console.log('none 2');
    return 'none';
  } else {
    return 'block';
  }
};

export const getTaskListStyle: GetTaskListStyle = (
  isDragging,
  draggableStyle,
  show,
  completed,
) => {
  if (show) {
    display = isShown(show, completed || false);
  }
  return {
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: 'right',

    background: isDragging ? 'lightgreen' : 'grey',
    display: display,

    ...draggableStyle.style,
  };
};

export const getParentTaskStyle: GetTaskStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: '8px',
  width: '350px',
});

export const getSubTaskStyle: GetTaskStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: '4px',
  width: '250px',
});
