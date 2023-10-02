import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/store';
import '@/index.css';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import CruisesTable from '@/components/CruisesTable';
import CruisesContent from './components/CruisesContent';

const MainContext = React.createContext({});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainContext.Provider value={{}}>
          <ChakraProvider>
            <CruisesContent />
          </ChakraProvider>
        </MainContext.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
