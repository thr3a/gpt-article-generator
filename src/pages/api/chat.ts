import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

const openAiConfig = new Configuration({
  apiKey: process.env.OPENAI_APIKEY
});
const openai = new OpenAIApi(openAiConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!openAiConfig.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured',
      },
    });
    return;
  }

  const message = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: message,
    });
    res.status(200).json({ text: completion.data.choices[0].message?.content as string });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}
