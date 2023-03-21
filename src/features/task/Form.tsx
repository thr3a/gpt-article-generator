import { Group, Button, TextInput, Textarea, Title } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/task/FormContext';
import { isNotEmpty } from '@mantine/form';
import { assistantPrompt, systemPrompt } from '@/features/task/Util';
import type { ChatCompletionRequestMessage } from 'openai';
import type { ResponseProps, SuccessResponseProps, ErrorResponseProps } from '@/pages/api/chat';

export const TaskForm = () => {
  const form = useTaskForm({
    initialValues: {
      keyword1: '完全解説',
      keyword2: 'for文',
      keyword3: 'python',
      keyword4: 'リスト',
      targetReader: 'サンプルコードがなかなか見つからない',
      readerConcerns: 'プログラマー',
      order1: 'Write lots of sample code.',
      order2: 'Write the results of running the sample code.',
      order3: 'Write URLs for reference.',
      order4: 'Explain it clearly as if you were explaining it to an elementary school student.',
      order5: 'Write the article in Japanese at least 3000 characters.',
      title: '【初心者向け】Pythonのリスト操作をマスターするためのfor文入門',
      loading: false,
      tableOfContents: `
# Pythonのリスト操作をfor文で完全解説！

## はじめに

## リストとは

### リストの定義

### 空のリストを作る方法

## for文とは

### for文の基本形

### range関数を使ったfor文

### リストを使ったfor文

## リストの操作方法

### 要素の追加

### 要素の削除

### 要素の変更

## まとめ`,
      output: ''
    },
    validate: {
      order1: isNotEmpty('条件1は必須項目です'),
      title: isNotEmpty('タイトルは必須項目です'),
      tableOfContents: isNotEmpty('目次は必須項目です')
    },
  });

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

        <Group position="center" mt="md">
          <Button type="submit" loaderPosition="center" loading={form.values.loading}>作成!</Button>
        </Group>

        <Title order={2}>生成記事</Title>
        <Textarea
          {...form.getInputProps('output')}
          minRows={10}
          autosize
        ></Textarea>

      </form>
    </TaskFormProvider>
  );
};
