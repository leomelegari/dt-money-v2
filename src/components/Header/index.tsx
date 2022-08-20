import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoHeader from "../../assets/logo-header.svg";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoHeader} />
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
