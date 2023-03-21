import type { NextPage } from 'next';
import { Anchor } from '@mantine/core';
import { TaskForm } from '@/features/task/Form';

const IndexPage: NextPage = () => {
  return (
    <>
      <TaskForm></TaskForm>
    </>
  );
};

export default IndexPage;
