import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useMemo } from "react";

export const useSummary = () => {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // aqui, basicamente, o useMemo está sendo utilizado para evitar o recalculo de uma variável
  // então, resumidamente, esse hook/variável vai ser recriada apenas quando houver mudanças na variável "transaction"
  const summary = useMemo(() => {
    return transactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === "income") {
          accumulator.income += transaction.price;
          accumulator.total += transaction.price;
        } else {
          accumulator.outcome += transaction.price;
          accumulator.total -= transaction.price;
        }

        return accumulator;
      },
      {
        income: 0, // accumulator
        outcome: 0, // accumulator
        total: 0, // accumulator
      },
    );
  }, [transactions]);

  return summary;
};
