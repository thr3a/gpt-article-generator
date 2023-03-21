import { TaskProps } from '@/features/task/FormContext';

export const systemPrompt = 'As a blogger, I want you to write a blog post focusing on the following details:';

export const assistantPrompt = (value: TaskProps): string => {
  return `
Create detailed headings and subheadings based on the provided orders [Order-1],[Order-2]..[Order-N].
Output the content in markdown format.

[Title]:${value.title}
[Keywords]:
- ${value.keyword1}
- ${value.keyword2}
- ${value.keyword3}
- ${value.keyword4}
[Reader Concerns]:${value.readerConcerns}
[Intended Audience]:${value.targetReader}
[Order-1]:${value.order1}
[Order-2]:${value.order2}
[Order-3]:${value.order3}
[Order-4]:${value.order4}
[Order-5]:${value.order5}
[Table of Contents]:
${value.tableOfContents.replace(/^\s+|\s+$/g, '')}
  `.replace(/^\s+|\s+$/g, '');
};
