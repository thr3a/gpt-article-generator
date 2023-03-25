import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { TaskForm } from '@/features/task/Form';
import { Text } from '@mantine/core';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader('X-CSRF-Token') as string || 'missing';
  return { props: { csrfToken } };
};

const IndexPage: NextPage<Props> = ({ csrfToken }) => {
  return (
    <>
      <Text fz="sm" mb="md">タイトルと箇条書きから文章を生成します。</Text>
      <TaskForm csrfToken={csrfToken}></TaskForm>
    </>
  );
};

export default IndexPage;
