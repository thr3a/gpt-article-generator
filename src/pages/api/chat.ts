import type { NextApiRequest, NextApiResponse } from 'next';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models';
import { SystemChatMessage, HumanChatMessage } from 'langchain/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream'
      , 'Transfer-Encoding': 'chunked' });

    const chat = new ChatOpenAI({
      openAIApiKey: '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',
      modelName: 'gpt-3.5-turbo',
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token: string) {
          res.write(`${token}`);
        },
      }),
    });

    await chat.call([
      new SystemChatMessage(req.body.system_message),
      new HumanChatMessage(req.body.human_message)
    ]);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
