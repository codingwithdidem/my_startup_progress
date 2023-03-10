export type Task = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export type Phase = {
  id: string;
  name: string;
  order: number;
  tasks: Task[];
};
