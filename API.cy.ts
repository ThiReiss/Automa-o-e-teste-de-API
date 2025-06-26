describe('Serverest API Tests', () => {
  let bookID: number;
    it('should return a list of books', () => {
    cy.request({
        method: 'GET',
        url: 'https://fakerestapi.azurewebsites.net/api/v1/Books'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
//Testes de criação
it('Criar Novo Livro', () => {
  cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
      body: {
        "id":  578,
        "title": "Livro de Teste de API para a FADESP",
        "description": "Livro de Teste de API para a FADESP",
        "pageCount": 98,
        "excerpt": "Trecho do Livro de Teste: Lorem Ipsum",
        "publishDate": "2023-10-01T00:00:00"
      }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.title).to.eq('Livro de Teste de API para a FADESP');
  });
});

it('Erro ID Cadastro', () => {
  cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
      body: {
        "id": 'ASDP$',
        "title": "Livro de Teste de API para a FADESP",
        "description": "Livro de Teste de API para a FADESP",
        "pageCount": 98,
        "excerpt": "Trecho do Livro de Teste: Lorem Ipsum",
        "publishDate": "2023-10-01T00:00:00"
      }
      ,failOnStatusCode: false 
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('title', 'One or more validation errors occurred.');
  });
});

it('Erro ID Cadastro Sem data', () => {
  cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
      body: {
        "id": 578,
        "title": "Livro de Teste de API para a FADESP",
        "description": "Livro de Teste de API para a FADESP",
        "pageCount": 'AA14',
        "excerpt": "Trecho do Livro de Teste: Lorem Ipsum",
        "publishDate": "AA00AA00"
      }
   ,failOnStatusCode: false 
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('title', 'One or more validation errors occurred.');
  });
});
// Testes de consulta
it('Consulta de Livro', () => {
  cy.wait(500);
  cy.request({
    method: 'GET',
    url: `https://fakerestapi.azurewebsites.net/api/v1/Books/2`,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id', 2);
    expect(response.body.title).to.eq('Book 2');
  });
});

  it('Consulta com ID inexistente', () => { 
    cy.request({
      method: 'GET',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books/9999',
      failOnStatusCode: false // permite continuar mesmo com erro
    }).then((response) => {
      expect(response.status).to.eq(404); // espera erro 404
      expect(response.body).to.have.property('title', 'Not Found');
    });
  });

  it('Consulta com ID inválido', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books/ASD#@!',
      failOnStatusCode: false // permite continuar mesmo com erro
    }).then((response) => {
      expect(response.status).to.eq(400); // espera erro 400
      expect(response.body).to.have.property('title', 'One or more validation errors occurred.');
    });
  });
// Testes de atualização
  it('Atualizar Livro', () => {
  cy.request({
    method: 'PUT',
    url: `https://fakerestapi.azurewebsites.net/api/v1/Books/2`,
    body: {
      "id": 2,
      "title": "Livro Atualizado",
      "description": "Descrição do Livro Atualizado",
      "pageCount": 150,
      "excerpt": "Trecho do Livro Atualizado",
      "publishDate": "2023-10-01T00:00:00"
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.title).to.eq('Livro Atualizado');
  });
});

  it('Atualizar Livro Inexistente', () => {
  cy.request({
    method: 'PUT',
    url: `https://fakerestapi.azurewebsites.net/api/v1/Books/AHASDK`,
    body: {
      "id": 'AHASDK',
      "title": "Livro Atualizado",
      "description": "Descrição do Livro Atualizado",
      "pageCount": 150,
      "excerpt": "Trecho do Livro Atualizado",
      "publishDate": "2023-10-01T00:00:00"
    }
    ,failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('title', 'One or more validation errors occurred.');

  });
});
// Testes de exclusão
it('Deletar Livro', () => {
  cy.request({
    method: 'DELETE',
    url: `https://fakerestapi.azurewebsites.net/api/v1/Books/2`
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.empty;
  });
});

it('Deletar Livro Inexistente', () => {
  cy.request({
    method: 'DELETE',
    url: `https://fakerestapi.azurewebsites.net/api/v1/Books/AHSAHJDAK`
   ,failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('title', 'One or more validation errors occurred.');
  });
});

  /*     it('Criar e consultar livro usando ID dinâmico', () => {
    let bookID: number;
    cy.request({
      method: 'POST',
      url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
      body: {
        id: 0,
        title: 'Livro Aleatório',
        description: 'Gerado pela API',
        pageCount: 123,
        excerpt: 'Exemplo',
        publishDate: '2025-01-01T00:00:00'
      }
    }).then((response) => {
    console.table(response.body);
      expect(response.status).to.eq(200);
      bookID = response.body.id;
      cy.log(`Livro dinâmico ID: ${bookID}`);
      cy.request({
        method: 'GET',
        url: `https://fakerestapi.azurewebsites.net/api/v1/Books/${bookID}`
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.title).to.eq('Livro Dinâmico');
      });
    });
  }); */