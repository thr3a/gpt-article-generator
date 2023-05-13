import { TaskProps } from '@/features/task/FormContext';

// Convert the following bullet points into sentences:
export const assistantPrompt = (value: TaskProps): string => {
  return `
Format your response using markdown.
${ value.articleType === 'sentences' && 'Rewrite the following bullet points as sentences in Japanese without omitting the original information.' }
${ value.articleType === 'articles'  && 'Convert the bullet point script into a article written in fluent Japanese without omitting the original information.' }
# Bullet points
${value.scripts.replace(/^\s+|\s+$/g, '')}

# Result
`;
};
