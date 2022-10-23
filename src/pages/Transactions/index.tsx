import { Pencil, Trash } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import * as Dialog from "@radix-ui/react-dialog";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormat, priceFormat } from "../../utils/format";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionTable,
} from "./styles";
import { EditTransactionModal } from "../../components/EditTransactionModal";
import { useState } from "react";

export const Transactions = () => {
  const [edit, setEdit] = useState({});

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const getItem = (data: any) => {
    setEdit(data);
  };

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
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <tr key={item.id} onClick={() => getItem(item)}>
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
                  </Dialog.Trigger>
                  <EditTransactionModal data={edit} />
                </Dialog.Root>
              );
            })}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
};
