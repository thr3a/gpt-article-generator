import { TaskProps } from '@/features/task/FormContext';

export const assistantPrompt = (value: TaskProps): string => {
  return `
[Title]:${value.title}
[Order-1]:${value.order1}
[Order-2]:${value.order2}
[Order-3]:${value.order3}
[Order-4]:${value.order4}
[Order-5]:${value.order5}
[Bule Point Script]:
${value.scripts.replace(/^\s+|\s+$/g, '')}
  `.replace(/^\s+|\s+$/g, '');
};
