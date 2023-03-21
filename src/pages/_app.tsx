import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Header } from '../features/common/components/Header';
import { Container } from '@mantine/core';
import { PageProvider } from '../features/common/contexts/PageContext';
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ブログ記事自動生成おたすけくん</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        <meta name="description" content="ブログ記事自動生成先生" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          defaultRadius: 'xs',
          fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
          components: {
            TextInput: {
              styles: (theme) => ({
                label: {
                  fontWeight: 'bold',
                },
                root: {
                  marginBottom: theme.spacing.xs,
                }
              })
            },
            RadioGroup: {
              styles: (theme) => ({
                label: {
                  fontWeight: 'bold'
                },
                root: {
                  marginBottom: theme.spacing.xs
                }
              })
            },
            Checkbox: {
              styles: (theme) => ({
                root: {
                  marginBottom: theme.spacing.sm
                }
              })
            },
            DatePicker: {
              styles: (theme) => ({
                label: {
                  fontWeight: 'bold'
                },
                day: {
                  height: 30
                },
              })
            }
          }
        }}
      >
        <Notifications />
        <PageProvider>
          <Container
            sx={(theme) => ({
              paddingBottom: theme.spacing.xl,
            })}
          >
            <Header></Header>
            <Component {...pageProps} />
          </Container>
        </PageProvider>
      </MantineProvider>
    </>
  );
}
