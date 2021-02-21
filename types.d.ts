type Regex = (name: string) => string;

type CreateTaskList = (codeName: string, name: string) => Promise<Return>;

type GetTaskStream = (id: string) => Promise<Task[]>;
