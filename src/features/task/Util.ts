import { TaskProps } from '@/features/task/FormContext';

export const assistantMessage = (value: TaskProps): string => {
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
  `.replace(/^\s+|\s+$/g, '');
};
