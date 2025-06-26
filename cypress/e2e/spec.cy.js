const getIframeBody = () => {
  return cy
    .get('#frame1') // id do iframe
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap); // transforma o body do iframe em objeto Cypress
};

describe('Fluxo Completo', () => {
  it('passes', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  })
});


it('User Realizando Cadastro correto e Seleção de opções', () => {
 cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  cy.get('#formNome')
    .type('Thiago Gibson') //max 30 caracteres
    .should('have.value', 'Thiago Gibson') 
 cy.get('#formSobrenome') //max 30 caracteres
    .type('Santos dos Reis')
    .should('have.value', 'Santos dos Reis')
  //cy.get('[data-cy="dataSobrenome"]').should('not.exist'); validar inexistência
  cy.get('#formSexoMasc').check().should('be.checked');
  //Botão tipo Radio função uncheck não funciona
  cy.get('#formComidaPizza').check().should('be.checked');
  cy.get('#formComidaCarne').check().should('be.checked').click();
  cy.get('#formComidaFrango').check().should('be.checked').click();
  cy.get('#formComidaVegetariana').check().should('be.checked').click();
  cy.get('#formEscolaridade').select('Mestrado')
  cy.get('#formEsportes').scrollIntoView().select(['Natacao', 'Corrida', 'Futebol', 'Karate']);
  cy.get('textarea[id="elementosForm:sugestoes"]')
  .scrollIntoView()
  .type('Atletismo, Badminton, Basquete, Basquete 3X3, Boxe, Breaking, Canoagem de velocidades, Canoagem Slalom, Ciclismo, Escalada, Esgrima, Futebol, Ginástica artística, Ginástica de Trampolim, Ginástica Rítmica, Golfe, Handebol, Hipismo, Hóquei sobre grama, Judô, Levantamento de peso, Luta (Greco Romana e Luta Livre), Maratona Aquática, Nado artístico, Natação, Pentatlo moderno, Polo Aquático, Remo, Rugby sevens, Saltos ornamentais, Skate, Surfe, Taekwondo, Tênis, Tênis de Mesa, Tiro com arco, Tiro esportivo, Triatlo, Vela, Vôlei, Vôlei de praia.');
  cy.get('#formCadastrar').click();
  cy.get('#resultado').should('contain', 'Cadastrado!')
})


it('User Realizando Cadastro incorreto e corrigindo no meio do processo junto com as interações divergentes', () => {
  cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  cy.get('#formNome')
    .type('Thiago Gibson Santos dos Reis') //max 30 caracteres
   cy.get('#formCadastrar').click();
   cy.get('#resultado').should('contain', 'Nao cadastrado');
  cy.get('#formNome').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')//apaga o sobrenome na aba do nome
  cy.get('#formSobrenome').type('Santos dos Reis')
  cy.get('#formSexoFem').check().should('be.checked').wait(1000);
  cy.get('#formSexoMasc').check().should('be.checked').wait(1000);
  cy.get('#formComidaVegetariana').check().should('be.checked')
  cy.get('#formComidaCarne').check().should('be.checked')
  cy.get('#formComidaFrango').check().should('be.checked')
   cy.get('#formComidaVegetariana').click().should('be.not.checked') //desmarca comida vegetariana
  cy.get('#formEscolaridade').select('Mestrado')
  cy.get('#formEsportes').scrollIntoView().select(['Karate', 'O que eh esporte?'], { force: true });
  cy.get('#formCadastrar').click();
  cy.get('#resultado').should('contain', 'Cadastrado!');
} )


it('Interações de tela com mudanças apenas nos botões', () => {
  cy.visit('https://www.wcaquino.me/cypress/componentes.html')  
  cy.get('#buttonSimple')
    .click()
    .should('have.value', 'Obrigado!') //validação de texto do botão  
  cy.get('#buttonLazy')
    .click()
    .should('have.value', 'zZz ZzZ!') //validação de texto do botão
  cy.get('#buttonCount')
  .click()
  .should('have.value', '11') //validação de texto do botão  
  cy.get('#buttonCount').then(($btn) => {
    for (let i = 0; i < 5; i++) {
      cy.wrap($btn).click();
    }
    cy.wrap($btn).should('have.value', '111111'); //validação de texto do botão
  });
  cy.get('input[type="radio"][value="1"][data-wc="achou"]').click();
})


it('Botões que modificam a aba de Resultado', () => {
  cy.visit('https://www.wcaquino.me/cypress/componentes.html')  
  cy.get('#buttonList')
    .click()
  cy.get('#resultado')
    .should('be.visible')
    cy.get('#lista li').should('have.length', 2);
    cy.get('#lista li').eq(0).should('contain.text', 'Item 1');
    cy.get('#lista li').eq(1).should('contain.text', 'Item 2');
 
  cy.get('#buttonTimePassed')
    .click()
   cy.get('#resultado')
   .should('be.visible')
 
    cy.get('#buttonDelay')
    .click()
  cy.get('#novoCampo').type('Campo Adicionado com Delay').wait(3000);
    cy.get('#buttonListDOM')
    .click()
    cy.get('#resultado')
    .should('be.visible')
    cy.get('#lista li').should('have.length', 1);
    cy.get('#lista li').eq(0).should('contain.text', 'Item 1');
    cy.get('#lista li').eq(1).should('contain.text', 'Item 2');
    
    cy.get('#buttonNow')
    .click()
  cy.get('#resultado')
   .should('be.visible')  

   cy.contains('Voltar').click();
  cy.get('#resultado')  
});
  
it('Interação com Botão Nova Aba.', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    cy.contains('Popup2')
    .invoke('removeAttr', 'target')
    .click()
    cy.url().should('include', 'frame.html')
    cy.get('#tfield').type('Teste externo de popup')
    cy.get('#otherButton')
    .click()
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Click OK!')

    })

    })
  
it('Interação Nova Guia', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('popup');
      });
      cy.get('#buttonPopUp')
        .click()
        .then(() => {
          cy.get('@popup').should('be.called');
          cy.get('@popup').should('be.calledWithMatch', /frame\.html/);
    });
  })

it('Interação com botões de PopUps e Ok automatico', () => { //Cypress não possui suporte nativo para alertas e confirmações, mas podemos usar o comando on para interceptar o evento de alerta e o proprio programa da o Ok
  cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  cy.get('#alert')
  .click()
  cy.get('#confirm')
  .click()

cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('6987454');
    });

    // Clica no botão que chama prompt
    cy.get('#prompt').click();
});
 

  it('Preenche inputs, marca checkbox/radio e lida com alerts', () => {
     cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    // Stub do alert apenas uma vez
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alerta')
    })

    // Itera pelas linhas da tabela
    cy.get('#tabelaUsuarios tbody tr').each(($row, index) => {
      const nome = $row.find('td').eq(0).text().trim()

      // Reset do stub antes de cada clique
      cy.get('@alerta').then((alertStub) => {
        alertStub.resetHistory()
      })

      // Preenche input de texto se existir
      const inputText = $row.find('input[type="text"]')
      if (inputText.length) {
        cy.wrap(inputText).type(`Texto ${index + 1}`)
      }

      // Marca checkbox se existir
      const checkbox = $row.find('input[type="checkbox"]')
      if (checkbox.length) {
        cy.wrap(checkbox).check({ force: true })
      }

      // Marca radio se existir
      const radio = $row.find('input[type="radio"]')
      if (radio.length) {
        cy.wrap(radio).check({ force: true })
      }

      // Clica no botão se existir e valida alert
      const botao = $row.find('input[type="button"]')
      if (botao.length) {
        cy.wrap(botao).click()
        cy.get('@alerta').should('have.been.calledWith', nome)
      }
    })
  });

it('Digita no campo de iframe e OK no alert', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');

    //DECLARAR O ALERT ANTES DO CLIQUE
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Click OK!');
    });

    getIframeBody().within(() => {
      cy.get('#tfield').type('Texto no iframe');
      cy.get('#otherButton').click(); // dispara alert
    });
  });

