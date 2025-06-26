<h1 align="center"> Desafio Técnico QA </h1>

Documentação sobre automação e testes em página de treino solicitada e validações em API fake para vaga de QA

# Índice 📖
* [Descrição do Projeto](#descrição-do-projeto)
* [Status do Projeto](#status-do-Projeto)
* [Automação e testes no Cypress](#automacao)
* [Teste de API](#api)
* [Desafios Encontrados](#desafios)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras)
* [Licença](#licença)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Conclusão](#conclusão)

<h4 align="center"> 
	✔️ Projeto Finalizado  ✔️
</h4>

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

## ▶️ Como Executar

1. **Instale as dependências:**

npm install cypress -D

2. **Rodar o Cypress**

npx cypress open

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



