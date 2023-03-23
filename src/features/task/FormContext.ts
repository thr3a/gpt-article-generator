import { createFormContext } from '@mantine/form';

export type TaskProps =  {
  title: string;
  scripts: string;
  articleType: string;
  order1: string;
  order2: string;
  order3: string;
  order4: string;
  order5: string;
  // keyword1: string;
  // keyword2: string;
  // keyword3: string;
  // keyword4: string;
  // targetReader: string;
  // readerConcerns: string;
  output: string;
  loading: boolean;
}

export const [TaskFormProvider, useTaskFormContext, useTaskForm] = createFormContext<TaskProps>();
