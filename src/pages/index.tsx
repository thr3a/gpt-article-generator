import type { NextPage } from 'next';
import { TaskForm } from '@/features/task/Form';

const IndexPage: NextPage = () => {
  return (
    <>
      <TaskForm></TaskForm>
    </>
  );
};

export default IndexPage;
