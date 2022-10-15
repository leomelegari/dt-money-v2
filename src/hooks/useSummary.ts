import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export const useSummary = () => {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
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

  return summary;
};
