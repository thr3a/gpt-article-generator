import type { NextApiRequest, NextApiResponse } from 'next';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models';
import { SystemChatMessage, HumanChatMessage } from 'langchain/schema';
import { z } from 'zod';

export const requestSchema = z.object({
  temperature: z.number().min(0).max(1).step(0.1),
  system_message: z.string(),
  human_message: z.string(),
  csrf_token: z.string().optional()
});

export type RequestProps = NextApiRequest & {
  body: z.infer<typeof requestSchema>;
}

export default async function handler(req: RequestProps, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    res.end();
    return;
  }

  const reqData = requestSchema.safeParse(req.body);
  if (!reqData.success) {
    console.log(reqData.error);
    res.status(400).send({status: 'ng', error: reqData.error});
    res.end();
    return;
  }

  try {
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Transfer-Encoding': 'chunked'
    });

    const chat = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_APIKEY,
      modelName: 'gpt-3.5-turbo',
      streaming: true,
      maxTokens: 3500,
      temperature: reqData.data.temperature,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token: string) {
          res.write(`${token}`);
        },
      }),
    });

    await chat.call([
      new SystemChatMessage(reqData.data.system_message),
      new HumanChatMessage(reqData.data.human_message)
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  res.end();
}
