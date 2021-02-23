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

let display = 'block';

const isShown: IsShown = (show, completed) => {
  if (show === 'done' && !completed) {
    return 'none';
  } else if (show === 'wip' && completed) {
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
    display: display,

    ...draggableStyle.style,
  };
};
