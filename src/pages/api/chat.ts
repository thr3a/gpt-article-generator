import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

const openAiConfig = new Configuration({
  apiKey: process.env.OPENAI_APIKEY
});
const openai = new OpenAIApi(openAiConfig);

export type SuccessResponseProps = {
  status: 'ok';
  result: string;
};

export type ErrorResponseProps = {
  status: 'ng';
  errorMessage: string;
};

export type ResponseProps = SuccessResponseProps | ErrorResponseProps;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps>) {
  if (!openAiConfig.apiKey) {
    res.status(500).json({
      status: 'ng',
      errorMessage: 'OpenAI API key not configured'
    });
    return;
  }

  if (!req.body.messages) {
    res.status(500).json({
      status: 'ng',
      errorMessage: 'Required messages'
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: req.body.messages as ChatCompletionRequestMessage[],
    });
    res.status(200).json(
      {
        status: 'ok',
        result: completion.data.choices[0].message?.content as string
      }
    );
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        status: 'ng',
        errorMessage: 'An error occurred during your request.'
      });
    }
  }
}
