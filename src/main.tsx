import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Content } from './content/content';
import { ContentContextProvider } from './content/content-context';
import { Header } from './header/header';
import { KeyContextProvider } from './key/key-context';
import { theme } from './theme';

/**
 * App
 * 
 */
export const App = () => {
  const queryClient = new QueryClient();

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <KeyContextProvider>
          <ContentContextProvider>
            <ModalsProvider>
              <Header />
              <Content />
            </ModalsProvider>
          </ContentContextProvider>
        </KeyContextProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);