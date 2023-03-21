import {Configuration, OpenAIApi, ChatCompletionRequestMessage} from 'openai';

export const fetchChatGPT = async (messages: ChatCompletionRequestMessage[]): Promise<string> => {
  const openAiConfig = new Configuration({
    apiKey: process.env.OPENAI_APIKEY ?? 'xxx'
  });
  const openai = new OpenAIApi(openAiConfig);
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  const text = completion.data.choices[0].message?.content as string;
  return text;
};
