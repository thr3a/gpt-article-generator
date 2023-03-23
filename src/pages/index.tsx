import type { NextPage } from 'next';
import { TaskForm } from '@/features/task/Form';
import { Text } from '@mantine/core';

const IndexPage: NextPage = () => {
  return (
    <>
      <Text fz="sm" mb="md">タイトルと箇条書きから文章を生成します。</Text>
      <TaskForm></TaskForm>
    </>
  );
};

export default IndexPage;
