import { Group, Button, TextInput, Textarea, Title, CopyButton } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/task/FormContext';
import { isNotEmpty } from '@mantine/form';
import { assistantPrompt, systemPrompt } from '@/features/task/Util';
import type { ChatCompletionRequestMessage } from 'openai';
import type { ResponseProps, SuccessResponseProps, ErrorResponseProps } from '@/pages/api/chat';
import { useEventListener } from '@mantine/hooks';

export const TaskForm = () => {
  const form = useTaskForm({
    initialValues: {
      keyword1: '',
      keyword2: '',
      keyword3: '',
      keyword4: '',
      targetReader: 'プログラマー',
      readerConcerns: '',
      order1: 'Provide numerous sample codes and their corresponding execution results.',
      order2: 'Write the article in Japanese, with a minimum of 3000 characters.',
      order3: '',
      order4: '',
      order5: '',
      title: '',
      loading: false,
      tableOfContents: `
# 今回やりたいこと

# やり方 手順

# 注意点・補足

`,
      output: ''
    },
    validate: {
      order1: isNotEmpty('条件1は必須項目です'),
      title: isNotEmpty('タイトルは必須項目です'),
      tableOfContents: isNotEmpty('目次は必須項目です')
    },
  });

  const resetFromValue = () => {
    form.reset();
  };
  const ref = useEventListener('click', resetFromValue);

  const handleSubmit = async () => {
    form.setValues({ loading: true });
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'assistant',
        content: assistantPrompt(form.values)
      }
    ];
    const reqResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: messages }),
    });
    const json = await reqResponse.json() as ResponseProps;
    if (json.status === 'ok') {
      const response = json as SuccessResponseProps;
      form.setValues({output: response.result, loading: false });
    } else {
      const response = json as ErrorResponseProps;
      form.setValues({output: 'エラーが発生しました', loading: false });
    }
  };

  return (
    <TaskFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <TextInput label='記事タイトル' withAsterisk {...form.getInputProps('title')} />

        <TextInput label='対象読者' {...form.getInputProps('targetReader')} />

        <TextInput label='読者の悩み' {...form.getInputProps('readerConcerns')} />

        {[1,2,3,4].map((index) => (
          <TextInput
            key={index}
            label={`キーワード${index}`}
            {...form.getInputProps(`keyword${index}`)}
          />
        ))}

        {[1,2,3,4,5].map((index) => (
          <TextInput
            key={index}
            label={`条件${index}`}
            {...form.getInputProps(`order${index}`)}
            {...(index === 1 && { withAsterisk: true })}
          />
        ))}

        <Textarea
          label='目次'
          withAsterisk
          {...form.getInputProps('tableOfContents')}
          minRows={12}
          autosize
        ></Textarea>

        <Group position='right' mt="sm">
          <Button color="red" ref={ref}>リセット</Button>
        </Group>

        <Group position="center">
          <Button type="submit" loaderPosition="center" loading={form.values.loading}>作成!</Button>
        </Group>
        <Group mt="sm" mb="sm">
          <Title order={2}>生成記事</Title>
          <CopyButton value={form.values.output}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'gray'} onClick={copy} size="xs">
                {copied ? 'コピーしました！' : 'クリップボードにコピー'}
              </Button>
            )}
          </CopyButton>
        </Group>

        <Textarea
          {...form.getInputProps('output')}
          minRows={10}
          autosize
        ></Textarea>

      </form>
    </TaskFormProvider>
  );
};
