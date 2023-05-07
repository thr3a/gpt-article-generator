import { TaskProps } from '@/features/article/TaskContext';

// Convert the following bullet points into sentences:
export const subheadingPrompt = (value: TaskProps): string => {
  return `
${value.title}の解説記事の少見出しを5つ考えてください。
少見出し
1. `;
};

export const sentencePrompt = (value: TaskProps, subtitle: string): string => {
  return `
${value.title}初心者にも理解できるように文章を作成してください。
タイトル: ${value.title}徹底解説
サブタイトル: ${subtitle}
文章:`;
};

export const formatSubheading = (subheading: string): string[] => {
  const regex = /\d+\. .+/g;
  return subheading.match(regex)!;
};

export const systemPrompt = 'I want you to act as a professional writer. Format your response using markdown.';
