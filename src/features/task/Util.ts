import { TaskProps } from '@/features/task/FormContext';

export const assistantPrompt = (value: TaskProps): string => {
  return `
[Order]
Convert the bullet point script into a article written in fluent Japanese without omitting the original information.

[Rule]
- 話し言葉
- 書き手は男性。一人称は私。
- markdown format

[bullet point script]
${value.scripts.replace(/^\s+|\s+$/g, '')}
`;
};
