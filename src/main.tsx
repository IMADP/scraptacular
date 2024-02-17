import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import ReactDOM from 'react-dom/client';
import { Content } from './content/content';
import { Header } from './header/header';
import { KeyContextProvider } from './key/key-context';
import { theme } from './theme';

/**
 * App
 * 
 */
export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <KeyContextProvider>
        <ModalsProvider>
          <Header />
          <Content />
        </ModalsProvider>
      </KeyContextProvider>
    </MantineProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);