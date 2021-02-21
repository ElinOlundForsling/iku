interface TaskList {
  name: string;
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
  price: number;
}

interface Return {
  msg?: string;
  error?: string;
}
