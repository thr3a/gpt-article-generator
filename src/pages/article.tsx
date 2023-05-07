import type { NextPage, GetServerSideProps } from 'next';
import { TaskForm } from '@/features/article/Task';
import { Text } from '@mantine/core';

type Props = {
  csrfToken: string;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader('X-CSRF-Token') || 'missing';
  return { props: { csrfToken } };
};

const IndexPage: NextPage<Props> = ({ csrfToken }) => {
  return (
    <>
      <Text fz="sm" mb="md">タイトルから少見出しを生成して記事本文を作成します</Text>
      <TaskForm csrfToken={csrfToken}></TaskForm>
    </>
  );
};

export default IndexPage;
