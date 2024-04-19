import PaymentsContext from './context/PaymentsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import OpenDialogContext from './context/OpenDialogContext';
import NewPaymentAddedContext from './context/NewPaymentAdded';

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PaymentsContext>
        <OpenDialogContext>
          <NewPaymentAddedContext>
            <>
              <Header />
              <Dashboard />
            </>
          </NewPaymentAddedContext>
        </OpenDialogContext>
      </PaymentsContext>
    </QueryClientProvider>
  );
}

export default App;
