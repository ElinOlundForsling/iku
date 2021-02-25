type Regex = (name: string) => string;

type Reorder = (list: Task[], startIndex: number, endIndex: number) => Task[];

type GetTasks = (tasks: Task[]) => Task[];
