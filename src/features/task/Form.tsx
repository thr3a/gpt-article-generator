import { NumberInput, Group, Button, TextInput, Textarea, Title } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/task/FormContext';
import { isInRange, hasLength, isNotEmpty } from '@mantine/form';

export const TaskForm = () => {
  const form = useTaskForm({
    initialValues: {
      keyword1: '',
      keyword2: '',
      keyword3: '',
      keyword4: '',
      targetReader: '',
      readerConcerns: '',
      order1: '',
      order2: '',
      order3: '',
      order4: '',
      order5: '',
      title: '',
      tableOfContents: '',
      output: ''
    },

    validate: {
      order1: isNotEmpty('条件1は必須項目です')
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <TaskFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <TextInput label='記事タイトル' withAsterisk {...form.getInputProps('title')} />

        <TextInput label='対象読者' {...form.getInputProps('targetReader')} />

        <TextInput label='読者の悩み' {...form.getInputProps('`readerConcerns`')} />

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
          <Button type="submit">送信</Button>
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
