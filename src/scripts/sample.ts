import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { GithubRepoLoader } from 'langchain/document_loaders';
import { log } from 'console';

// const loader = new GithubRepoLoader(
//   'https://github.com/mantinedev/mantine',
//   { branch: 'master', recursive: false, unknown: 'warn' }
// );
// const docs = await loader.load();
// console.log({ docs });

// const run = async () => {
//   const chat = new ChatOpenAI({
//     openAIApiKey: process.env.OPENAI_APIKEY,
//     modelName: 'gpt-3.5-turbo',
//   });
//   const response = await chat.call([
//     new SystemChatMessage('翻訳家として単語を翻訳して'),
//     new HumanChatMessage('公園'),
//   ]);
//   console.log(response);
// };
// run();

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

const text = `
1. 「ヘントの祭壇画」の制作経緯と歴史的背景

2. 祭壇画に描かれた聖母マリアと神の子イエスの姿と意味

3. 多彩な聖人たちの描写と象徴的な意味

4. ヤン・ファン・エイクの画家技術と革新的な表現手法

5. 「ヘントの祭壇画」の保存状況と修復の歴史

6. 祭壇画が持つ芸術史的価値と現代美術に与えた影響
`;

const regex = /\d+\. .+/g;
const array = text.match(regex);
console.log(array);

