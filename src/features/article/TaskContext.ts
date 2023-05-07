import { createFormContext } from '@mantine/form';

export type TaskProps =  {
  title: string;
  subheading: string;
  // articleType: string;
  loading: boolean;
  output: string;
  numberOfHeadings: number;
}

export const [TaskFormProvider, useTaskFormContext, useTaskForm] = createFormContext<TaskProps>();
