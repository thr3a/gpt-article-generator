import { TaskProps } from '@/features/task/FormContext';

// Convert the following bullet points into sentences:
export const assistantPrompt = (value: TaskProps): string => {
  return `
Format your response using markdown.
Rewrite the following bullet points as complete sentences in Japanese without omitting the original information:

# Bullet points
${value.scripts.replace(/^\s+|\s+$/g, '')}
`;
};
