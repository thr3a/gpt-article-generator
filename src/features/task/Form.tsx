import { Group, Button, Textarea, Title, CopyButton, Radio } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/task/FormContext';
import { isNotEmpty } from '@mantine/form';
import { assistantPrompt } from '@/features/task/Util';
import { useEventListener } from '@mantine/hooks';
import { useState } from 'react';
import { requestSchema } from '@/pages/api/chat';
import { z } from 'zod';

export const TaskForm = (props: { csrfToken: string}) => {
  const [output, setOutput] = useState('');
  const form = useTaskForm({
    initialValues: {
      title: '',
      articleType: 'sentences',
      loading: false,
      scripts: '',
    },
    validate: {
      scripts: isNotEmpty('箇条書きは必須項目です')
    },
  });

  const resetFromValue = () => {
    form.reset();
  };
  const ref = useEventListener('click', resetFromValue);

  const handleSubmit = async () => {
    setOutput('');
    form.setValues({ loading: true });

    const systemPrompt = 'I want you to act as a professional writer.';
    const params: z.infer<typeof requestSchema> = {
      system_message: systemPrompt,
      human_message: assistantPrompt(form.values),
      csrf_token: props.csrfToken,
      temperature: 0.7
    };
    const response = await fetch('/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const stream = response.body;
    const reader = stream?.getReader();
    const decoder = new TextDecoder('utf-8');
    try {
      while (true) {
        const { done, value }:any = await reader?.read();
        if (done) {
          break;
        }
        const decodedValue = decoder.decode(value, { stream: true });
        setOutput(prevOutput => prevOutput + decodedValue);
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.setValues({loading: false });
      reader?.releaseLock();
    }
  };

  return (
    <TaskFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <Radio.Group
          label="記事タイプ"
          withAsterisk
          {...form.getInputProps('articleType')}
        >
          <Group mt="xs">
            <Radio value="sentences" label="文章" />
            <Radio value="articles" label="記事" />
          </Group>
        </Radio.Group>

        <Textarea
          label='文章にしたい箇条書き'
          withAsterisk
          {...form.getInputProps('scripts')}
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
          <CopyButton value={output}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'gray'} onClick={copy} size="xs">
                {copied ? 'コピーしました！' : 'クリップボードにコピー'}
              </Button>
            )}
          </CopyButton>
        </Group>

        <Textarea
          value={output}
          minRows={10}
          autosize
        ></Textarea>

      </form>
    </TaskFormProvider>
  );
};
// tech article
