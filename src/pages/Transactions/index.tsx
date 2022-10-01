import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormat, priceFormat } from "../../utils/format";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionTable,
} from "./styles";

export const Transactions = () => {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map((item) => {
              return (
                <tr key={item.id}>
                  <td width="50%">{item.description}</td>
                  <td>
                    <PriceHighlight variant={item.type}>
                      {item.type === "outcome" && "- "}
                      {priceFormat.format(item.price)}
                    </PriceHighlight>
                  </td>
                  <td>{item.category}</td>
                  <td>{dateFormat.format(new Date(item.createdAt))}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
};
