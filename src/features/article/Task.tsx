import { Group, Button, Textarea, Title, CopyButton, TextInput } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/article/TaskContext';
import { isNotEmpty } from '@mantine/form';
import { subheadingPrompt, systemPrompt, sentencePrompt, formatSubheading } from '@/features/article/Util';
import { useEventListener } from '@mantine/hooks';
import { requestSchema } from '@/pages/api/chat';
import { z } from 'zod';

export const TaskForm = (props: { csrfToken: string}) => {
  const form = useTaskForm({
    initialValues: {
      title: 'ヤン・ファン・エイクの「ヘントの祭壇画」について',
      loading: false,
      // subheading: dummy,
      subheading: '1. ',
      output: '',
      numberOfHeadings: 5
    },
    validate: {
      title: isNotEmpty('タイトルは必須項目です'),
    },
  });

  const resetFromValue = () => {
    form.reset();
  };
  const ref = useEventListener('click', resetFromValue);

  const generateSubheading = async () => {
    const params: z.infer<typeof requestSchema> = {
      system_message: systemPrompt,
      human_message: subheadingPrompt(form.values),
      csrf_token: props.csrfToken,
      temperature: 0.1
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
        const newValues = form.values;
        newValues.subheading += decodedValue;
        form.setValues((prev) => ({ ...prev, ...newValues }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      reader?.releaseLock();
    }
  };

  const generateSentence = async(subtitle: string) => {
    const response = await fetch('/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_message: systemPrompt,
        human_message: sentencePrompt(form.values, subtitle),
        csrf_token: props.csrfToken,
        temperature: 0.1
      }),
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
        const newValues = form.values;
        newValues.output += decodedValue;
        form.setValues((prev) => ({ ...prev, ...newValues }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      reader?.releaseLock();
    }
  };

  const handleSubmit = async () => {
    form.setValues({ output: '', loading: true });
    if (form.values.subheading === '1. ') {
      await generateSubheading();
    }
    const array = formatSubheading(form.values.subheading);
    for (let i: number = 0; i < array.length; i++) {
      const subtitle = array[i];
      const newValues = form.values;
      newValues.output += `\n${subtitle}\n`;
      form.setValues((prev) => ({ ...prev, ...newValues }));
      await generateSentence(subtitle);
    }
    form.setValues({loading: false });
  };

  return (
    <TaskFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <TextInput
          label="タイトル(末尾「について」必須)"
          {...form.getInputProps('title')}
          withAsterisk
        />
        <Textarea
          label='少見出し'
          {...form.getInputProps('subheading')}
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
// tech article
