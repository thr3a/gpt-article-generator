import { TaskProps } from '@/features/task/FormContext';

export const assistantPrompt = (value: TaskProps): string => {
  return value.scripts.replace(/^\s+|\s+$/g, '');
};
