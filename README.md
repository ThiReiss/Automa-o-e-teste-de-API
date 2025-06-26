<h1 align="center"> Desafio Técnico QA </h1>

Documentação sobre automação e testes em página de treino solicitada e validações em API fake para vaga de QA

# Índice 📖
* [Descrição do Projeto](#descrição-do-projeto)
* [Status do Projeto](#status-do-Projeto)
* [Objetivo](#automacao1)
* [Tecnologias utilizadas(Automação)](#tecnologias-utilizadas)
* [Cenários](#automacao)
* [Forma de execução da aplicação](#exec)
* [Desafios Encontrados (Automação)](#desafios)
* [Etapas do fluxo](#fluxx)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Teste de API](#api)
* [Tecnologias utilizadas(API)](#tecnologias-utilizadas)
* [Teste Executados](#texect)
* [Validação do JSON](#jjson)
* [Teste Extra](#textrarr)
* [Licença](#licença)
* [Pessoa Desenvolvedora dos Projetos](#pessoas-desenvolvedoras)
* [Conclusão](#conclusão)

<h2 align="center"> 
	✔️ Projeto Finalizado  ✔️
</h2>

## 🎯 Objetivo do projeto: Automação

Validar e automatizar fluxos de:
- Preenchimento de formulários
- Manipulação de elementos DOM (checkboxes, radios, selects, buttons)
- Controle de popups (alert, confirm, prompt)
- Interações com iframes e novas abas
- Listagens dinâmicas, inputs e validações visuais

---

## 🚀 Tecnologias e Ferramentas

- **Cypress** `12+`
- **TypeScript** `4.x`
- **Node.js** `16+`
- **Sinon (stub e spies nativos do Cypress)**

## 🧪 Cenários Automatizados

### ✅ Cadastro Válido
### ❌ Cadastro Inválido Corrigido
### 🧭 Navegação e Interações Diversas
### 🌐 Iframes e Novas Abas
### 🧩 Componentes Dinâmicos
---

## 📸 Evidências e Relatórios

- A suíte pode ser integrada com **Allure**, **Mochawesome** ou **Cypress Dashboard**
- Prints automáticos e vídeos de execução podem ser habilitados no `cypress.config.ts`

---

## 👨🏾‍💻 Desafios encontrados

1. Trabalhar com iframe de forma automatica sendo necessaria a transformação do iframe em objeto via comando cy.wrap
2. Função RADIO na lista não permite desmarcar sendo necessário a atualização da página (f5) perdendo o progresso do preenchimento
3. Automação na lista, sendo necessario o uso de comandos como cy.stub, const nome =, $row, index e etc

## 🔄 Etapas do Fluxo de Testes Automatizado

### ✅ 1. Acesso à Página
Todos os testes começam com o carregamento da URL principal, onde os elementos da interface são testados.

---

### 📝 2. Cadastro de Usuário (válido e inválido)
- Preenchimento completo de campos: nome, sobrenome, sexo, escolaridade e esportes.
- Marcação de múltiplas opções de comida usando checkboxes.
- Inclusão de sugestões em `textarea`.
- Validação de sucesso com a mensagem **"Cadastrado!"**.
- Simulação de erro ao exceder o limite de caracteres e correção dinâmica via `{backspace}`.
- Teste com combinações inválidas de seleção (ex: carne + vegetariano).

---

### ⏺️ 3. Interações com Botões
- Verificação de botões com mudanças de estado (`Obrigado!`, `zZz ZzZ!`, contagem).
- Simulação de múltiplos cliques e validação do valor final do contador (`#buttonCount`).
- Seleção de botão radio com atributo personalizado (`data-wc="achou"`).

---

### 📋 4. Validação de Resultados Dinâmicos
- Ações que alteram dinamicamente a aba de resultados.
- Verificação de itens gerados em listas DOM (`<li>`).
- Inclusão e interação com elementos criados de forma assíncrona (ex: `#novoCampo` após delay).

---

### 🧭 5. Popups e Nova Aba
- Interceptação da nova aba com `cy.stub(win, 'open')` e verificação da URL de destino.
- Remoção de `target="_blank"` para forçar a navegação na mesma aba.
- Manipulação e validação de `alert`, `confirm` e `prompt`, incluindo retorno automático de valor.

---

### 🧠 6. Interações com Tabela
- Iteração linha a linha na `#tabelaUsuarios`.
- Preenchimento dinâmico dos inputs de cada linha com base no índice.
- Marcação de checkboxes e radios quando presentes.
- Clique nos botões por linha, validando o `alert` com o nome correto.


## ▶️ Como Executar

1. **Instale as dependências:**

       npm install cypress -D

2. **Rode o Cypress**

       npx cypress open

3. Escolha um navegador compátivel

       🌐 Chrome
       🌐 Edge

4. Escolha o arquivo de teste

       (Automação.cy.ts) e inicie a execução.

<h1 align="center"> 
	👨🏾‍🔬 Teste de API 👨🏾‍🔬
</h1>

## 🔧 Tecnologias Utilizadas

- ✅ Cypress
- ✅ TypeScript
- ✅ Html
- ✅Comando: console.table(response.body); Para monitoramente de JSON no Console.
---

## 📚 Casos de Teste Executados

### 🔍 GET - Consultas

| Caso de Teste                       | Endpoint                         | Resultado Esperado             | Status Esperado |
|------------------------------------|----------------------------------|--------------------------------|-----------------|
| ✅ Listar todos os livros           | `/Books`                         | Lista completa de livros       | `200 OK`        |
| ✅ Consultar livro existente        | `/Books/2`                       | Livro com `id: 2`              | `200 OK`        |
| ❌ Consultar livro inexistente      | `/Books/9999`                    | Mensagem: `Not Found`          | `404 Not Found` |
| ❌ Consultar com ID inválido       | `/Books/ASD#@!`                  | Erro de validação              | `400 Bad Request`|

---

### ➕ POST - Criação

| Caso de Teste                       | Endpoint                         | Resultado Esperado                          | Status Esperado |
|------------------------------------|----------------------------------|---------------------------------------------|-----------------|
| ✅ Criar novo livro válido          | `/Books`                         | Livro criado com título correto             | `200 OK`        |
| ❌ Criar livro com ID inválido      | `/Books`                         | Erro: validação de ID                       | `400 Bad Request`|
| ❌ Criar livro com campos inválidos | `/Books`                         | Erro: formatação incorreta (pageCount/data) | `400 Bad Request`|

---

### 🔄 PUT - Atualização

| Caso de Teste                       | Endpoint                         | Resultado Esperado                          | Status Esperado |
|------------------------------------|----------------------------------|---------------------------------------------|-----------------|
| ✅ Atualizar livro existente        | `/Books/2`                       | Título atualizado com sucesso               | `200 OK`        |
| ❌ Atualizar livro com ID inválido  | `/Books/AHASDK`                  | Erro de validação                           | `400 Bad Request`|

---

### ❌ DELETE - Exclusão

| Caso de Teste                       | Endpoint                         | Resultado Esperado               | Status Esperado |
|------------------------------------|----------------------------------|----------------------------------|-----------------|
| ✅ Deletar livro existente          | `/Books/2`                       | Resposta sem conteúdo            | `200 OK`        |
| ❌ Deletar livro com ID inválido    | `/Books/AHSAHJDAK`               | Erro de validação                | `400 Bad Request`|

---

## 📊 Resumo dos Testes

| Total de Testes | Sucesso (`2xx`) | Falha Esperada (`4xx`) |
|-----------------|------------------|-------------------------|
| 11              | 5                | 6                       |

---

## 🖥️ Exemplo de Validações com Comando de Console
![958e63c3-baa9-44c3-afeb-a64e563c2029](https://github.com/user-attachments/assets/2328f770-c89c-4858-b9e8-92da0ac784fa)   

---

## 🆕 Teste extra
 Caso a API salvasse a criação dos livros, Poderíamos seguir testando a criação dinâmica com o código abaixo e seguir com o teste de resposta para validar o registro. Tendo em vista que é uma API Fake o resultado esperado para essa linha é o erro 404, caso necessário podemos seguir com o código: 

![AAA](https://github.com/user-attachments/assets/ee093de6-ee46-4b53-81fe-5c69044ec4a9)

## 📜 Licença

Este projeto está licenciado sob a Licença Apache 2.0

## 🧑‍💻 Desenvolvedor

Este projeto foi desenvolvido por:

**Nome**: Thiago Santos  
**Função**: QA (Quality Assurance)  
- **LinkedIn**: [https://www.linkedin.com/in/thiagosantos](https://www.linkedin.com/in/thiago-santos-6a01012b6/)




