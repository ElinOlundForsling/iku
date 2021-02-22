import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import * as CSS from 'csstype';

type Regex = (name: string) => string;

type CreateTaskList = (codeName: string, name: string) => Promise<Return>;

type GetTaskStream = (id: string) => Promise<Task[]>;

type Reorder = (list: Task[], startIndex: number, endIndex: number) => Task[];

type IsShown = (show: string, completed: boolean) => string;

type GetTaskListStyle = (
  isDragging: boolean,
  draggableStyle: DraggableProvided,
  show?: string,
  completed?: boolean,
) => DraggingStyle;

type GetTaskStyle = (isDraggingover: boolean) => CSS.Properties;

type GetTasks = (tasks: Task[]) => Task[];
