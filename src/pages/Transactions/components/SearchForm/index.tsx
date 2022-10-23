import { useContextSelector } from "use-context-selector";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { memo } from "react";

/*
1 - Por que um componente renderiza?
    - hook change (mudança de estado, contexto, reducer...)
    - props change (mudança de propriedades)
    - parent rerendered (componente pai rerenderizou)


2 - Qual o fluxo?
    - O react recria o HTML da interface do componente em questão
    - Compara a versão do HTML recriado com o anterior
    - Se houve mudança, ele reescreve o HTML

Caso esse HTML seja muito extenso e ele esteja sendo rerenderizado sem motivos,
daí sim usamos o "memo". Caso contrário, não há necessidade

3 - Memo:
    - mudou algum hook do componente? Mudou alguma prop (deep comparison)?
      # Compara a versão anterior dos hooks e props
      # Se mudou algo, ele vai permitir o fluxo de renderização citado no item 2


Por que não utilizar o MEMO a todo momento então??
  - Muita das vezes o processo de comparação do memo pode ser mais lenta do que a propria rerenderização. 
    Então, só em casos que realmente há a necessidade de não rerenderizar algo que vamos utilizar desse recurso
*/

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

const SearchFormComponent = () => {
  const loadData = useContextSelector(TransactionsContext, (context) => {
    return context.loadData;
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSeactTransaction = async (data: SearchFormInputs) => {
    await loadData(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSeactTransaction)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};

export const SearchForm = memo(SearchFormComponent);
