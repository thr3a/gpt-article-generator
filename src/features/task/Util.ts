import { TaskProps } from '@/features/task/FormContext';

export const assistantPrompt = (value: TaskProps): string => {
  return `
[Order]
Convert the bullet point script into a article written in fluent Japanese without omitting the original information.

[Rule]
- ぶっきらぼうな口調
- 書き手は男性 一人称は俺
- markdown format

[bullet point script]
${value.scripts.replace(/^\s+|\s+$/g, '')}
`;
};
