import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionTable,
} from "./styles";

export const Transactions = () => {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>20/08/2022</td>
            </tr>

            <tr>
              <td width="50%">Alimentação</td>
              <td>
                <PriceHighlight variant="outcome"> - R$ 121,00</PriceHighlight>
              </td>
              <td>Despesa</td>
              <td>20/08/2022</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
};
