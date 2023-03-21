import {Configuration, OpenAIApi, ChatCompletionRequestMessage} from 'openai';

const openAiConfig = new Configuration({
  apiKey: process.env.OPENAI_APIKEY ?? 'xxx'
});
const openai = new OpenAIApi(openAiConfig);

const fetchChatGPT = async (messages: ChatCompletionRequestMessage[]): Promise<string> => {
  // 先頭に追加
  // messages.unshift({
  //   role: 'system',
  //   content: BASE_PROMPT
  // });
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  const text = completion.data.choices[0].message?.content as string;
  return text;
};
