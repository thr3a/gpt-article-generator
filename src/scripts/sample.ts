import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { GithubRepoLoader } from 'langchain/document_loaders';

// const loader = new GithubRepoLoader(
//   'https://github.com/mantinedev/mantine',
//   { branch: 'master', recursive: false, unknown: 'warn' }
// );
// const docs = await loader.load();
// console.log({ docs });

const run = async () => {
  const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_APIKEY,
    modelName: 'gpt-3.5-turbo',
  });
  const response = await chat.call([
    new SystemChatMessage('翻訳家として単語を翻訳して'),
    new HumanChatMessage('公園'),
  ]);
  console.log(response);
};
run();

// export const run = async () => {
//   const chat = new ChatOpenAI({
//     streaming: true,
//     openAIApiKey: process.env.OPENAI_APIKEY,
//     callbackManager: CallbackManager.fromHandlers({
//       async handleLLMNewToken(token: string) {
//         console.log({ token });
//       },
//     }),
//   });

//   const response = await chat.call([
//     new HumanChatMessage('日本国憲法の一部を紹介してください'),
//   ]);
//   console.log(response);
// };
// run();
