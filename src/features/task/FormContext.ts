import { createFormContext } from '@mantine/form';

export type TaskProps =  {
  title: string;
  scripts: string;
  articleType: string;
  loading: boolean;
}

export const [TaskFormProvider, useTaskFormContext, useTaskForm] = createFormContext<TaskProps>();
