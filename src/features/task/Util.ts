import { TaskProps } from '@/features/task/FormContext';

export const systemPrompt = 'As a blogger, I want you to write a blog post focusing on the following details:';

export const assistantPrompt = (value: TaskProps): string => {
  return `
[Task]:
Complete the unfinished blog article in accordance with the instructions provided, such as [Order-1], [Order-2] .. [Order-N].
Write blog articles in Japanese and in markdown format.

[Title]:${value.title}
[Order-1]:${value.order1}
[Order-2]:${value.order2}
[Order-3]:${value.order3}
[Order-4]:${value.order4}
[Order-5]:${value.order5}
[Unfinished Content]:
${value.tableOfContents.replace(/^\s+|\s+$/g, '')}
  `.replace(/^\s+|\s+$/g, '');
};
