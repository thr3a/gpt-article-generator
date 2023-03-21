import { TaskProps } from '@/features/task/FormContext';

export const systemPrompt = [
  'I explain tasks to you.',
  'Do task if you understand these tasks.'
].join('\n');

export const assistantPrompt = (value: TaskProps): string => {
  return `
[Keyword-1]:${value.keyword1}
[Keyword-2]:${value.keyword2}
[Keyword-3]:${value.keyword3}
[Keyword-4]:${value.keyword4}
[Concerns of the reader]:${value.readerConcerns}
[Intended readers]:${value.targetReader}
[order-1]:${value.order1}
[order-2]:${value.order2}
[order-3]:${value.order3}
[order-4]:${value.order4}
[order-5]:${value.order5}
[Title]:${value.title}
[table of contents]:
${value.tableOfContents.replace(/^\s+|\s+$/g, '')}

[Task]:
you say "=============== Output starts ==============" when this task is starts
you write contents of Headings and subheadings in detail.
These contents should be based on [order-1] and [order-2] and ... and [order-N].
These contents should be output in Markdown format.
you say "=============== Output ends ==============" when this task is complete
  `.replace(/^\s+|\s+$/g, '');
};
