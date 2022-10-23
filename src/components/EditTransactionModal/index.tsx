import * as Dialog from "@radix-ui/react-dialog";
import { useContextSelector } from "use-context-selector";
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
import { TransactionsContext } from "../../contexts/TransactionsContext";

const editTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type EditTransactionFormInputs = z.infer<typeof editTransactionFormSchema>;

export const EditTransactionModal = (data: any) => {
  console.log(data.description);

  const editTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.editTransaction;
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<EditTransactionFormInputs>({
    resolver: zodResolver(editTransactionFormSchema),
  });

  const handleCreateNewTransaction = async (
    data: EditTransactionFormInputs,
  ) => {
    const { category, description, price, type } = data;
    await editTransaction({
      description,
      price,
      category,
      type,
    });
    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Editar Transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register("description")}
            type="text"
            placeholder={data.description}
            // value={data.description}
            required
          />
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder={data.price}
            // value={data.price}
            required
          />
          <input
            {...register("category")}
            type="text"
            placeholder={data.category}
            // value={data.category}
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
