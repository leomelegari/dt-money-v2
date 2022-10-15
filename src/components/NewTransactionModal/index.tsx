import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowCircleDown, ArrowCircleUp, Files, X } from "phosphor-react";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./style";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register("description")}
            type="text"
            placeholder="Descrição"
            required
          />
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Preço"
            required
          />
          <input
            {...register("category")}
            type="text"
            placeholder="Categoria"
            required
          />

          {/* Aqui foi usado um componente do próprio hook-form para inserir dados 
            que não são vindos de inputs necessariamente (Controller)
          */}
          <Controller
            control={control} //chamo o control importado no useForm
            name="type" //passo qual é o campo setado no schema
            render={({ field }) => {
              // essa propriedade faz a renderização do html onde queremos acessar um valor que não seja de input
              // desestruturamos as props dessa propriedade e chamamos o onChange dela no TransactionType que é um RadioGroup
              // nesse RadioGroup, temos acesso a propriedade onValueChange. Basta setar o valor dela como field.onChange
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
