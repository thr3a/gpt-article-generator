// export const getTime = (): number => {
//   return new Date().getTime();
// };

// console.log(getTime());
import { OpenAI } from 'langchain';

const model = new OpenAI({ openAIApiKey: process.env.OPENAI_APIKEY });

const res = await model.call(
  'What would be a good company name a company that makes colorful socks?'
);
console.log(res);


