import type { NextPage } from 'next';
import Head from 'next/head';
import { IconDownload } from '@tabler/icons-react';
import styles from '../styles/Home.module.scss';
import { FormComponent } from '../features/form/components/FromComponents';
import { Viewer } from '../features/form/components/Viewer';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';

const Page2: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page 2</title>
      </Head>
      <h1 className={styles.title}>Page 2</h1>
      <IconDownload></IconDownload>
      <FormComponent></FormComponent>
      <FormComponent></FormComponent>
      <Viewer></Viewer>
      <Button
        variant="outline"
        onClick={() =>
          showNotification({
            title: 'Default notification',
            message: 'nyaa',
          })
        }
      >
        Show notification
      </Button>
      <Button component={Link} href="https://www.google.com/">Page2</Button>
    </>
  );
};

export default Page2;
