import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models';
import { HumanChatMessage } from 'langchain/schema';

export const run = async () => {
  const chat = new ChatOpenAI({
    streaming: true,
    openAIApiKey: process.env.OPENAI_APIKEY,
    callbackManager: CallbackManager.fromHandlers({
      async handleLLMNewToken(token: string) {
        console.log({ token });
      },
    }),
  });

  const response = await chat.call([
    new HumanChatMessage('日本国憲法の一部を紹介してください'),
  ]);
  console.log(response);
};

run();
