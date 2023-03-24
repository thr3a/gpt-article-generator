import { Group, Button, Textarea, Title, CopyButton, Radio } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/task/FormContext';
import { isNotEmpty } from '@mantine/form';
import { assistantPrompt } from '@/features/task/Util';
import { useEventListener } from '@mantine/hooks';
import { useState } from 'react';

export const TaskForm = () => {
  const [output, setOutput] = useState('');
  const form = useTaskForm({
    initialValues: {
      title: '',
      articleType: 'diary',
      loading: false,
      scripts: '',
    },
    validate: {
      // title: isNotEmpty('タイトルは必須項目です'),
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

    const systemPrompt = `
As a blogger, Convert the bullet point script into a ${form.values.articleType} written in fluent Japanese without omitting the original information.
出力は話し言葉,一人称は「俺」,マークダウン形式
    `;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ system_message: systemPrompt, human_message: assistantPrompt(form.values) }),
    });
    const stream = response.body;
    const reader = stream?.getReader();
    try {
      while (true) {
        const { done, value }:any = await reader?.read();
        if (done) {
          break;
        }
        const decodedValue = new TextDecoder().decode(value);
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
            <Radio value="diary" label="日記" />
            <Radio value="tech article" label="技術ブログ" />
            <Radio value="blog article" label="解説記事" />
          </Group>
        </Radio.Group>


        {/* <TextInput label='記事タイトル' withAsterisk {...form.getInputProps('title')} /> */}

        {/* <TextInput label='対象読者' {...form.getInputProps('targetReader')} /> */}

        {/* <TextInput label='読者の悩み' {...form.getInputProps('readerConcerns')} /> */}

        {/* {[1,2,3,4].map((index) => (
          <TextInput
            key={index}
            label={`キーワード${index}`}
            {...form.getInputProps(`keyword${index}`)}
          />
        ))} */}

        {/* {[1,2,3,4,5].map((index) => (
          <TextInput
            key={index}
            label={`条件${index}`}
            {...form.getInputProps(`order${index}`)}
            {...(index === 1 && { withAsterisk: true })}
          />
        ))} */}

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
