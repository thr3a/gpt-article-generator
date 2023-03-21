import { NumberInput, Group, Button, TextInput } from '@mantine/core';
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
      title: '',
      tableOfContents: '',
      output: ''
    },

    validate: {
      order1: isNotEmpty('条件1は必須項目です')
      // name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      // age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <TaskFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <TextInput label="条件1" {...form.getInputProps('order1')} />
        <Group position="center" mt="md">
          <Button type="submit">送信</Button>
        </Group>
      </form>
    </TaskFormProvider>
  );
};
