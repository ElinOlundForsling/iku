interface TaskList {
  name: string;
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
  price: number;
  index: number;
  parent?: string | null;
  subtasks?: Task[];
}
