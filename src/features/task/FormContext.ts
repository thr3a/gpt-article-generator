import { createFormContext } from '@mantine/form';

type TaskProps =  {
  keyword1: string;
  keyword2: string;
  keyword3: string;
  keyword4: string;
  targetReader: string;
  readerConcerns: string;
  order1: string;
  order2: string;
  order3: string;
  order4: string;
  order5: string;
  title: string;
  tableOfContents: string;
  output: string;
}

export const [TaskFormProvider, useTaskFormContext, useTaskForm] = createFormContext<TaskProps>();
