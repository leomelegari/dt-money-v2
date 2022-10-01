import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoHeader from "../../assets/logo-header.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoHeader} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
