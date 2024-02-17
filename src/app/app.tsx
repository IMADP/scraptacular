import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../theme';
import classes from './app.module.css';
import { Header } from './header';

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <main className={classes.main}>
        <textarea className={classes.textarea} placeholder="Start scrappin..."></textarea>
      </main>
    </MantineProvider>
  );
}
