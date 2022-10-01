import { TransactionsProvider } from "./contexts/TransactionsContext";
import { Transactions } from "./pages/Transactions";

export const App = () => {
  return (
    <div className="App">
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </div>
  );
};
