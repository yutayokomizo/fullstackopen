describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'test',
      name: 'Test User',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('input#username');
    cy.get('input#password');
    cy.get('button#register');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#username').type('test');
      cy.get('input#password').type('password');
      cy.get('button#register').click();
      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('input#username').type('test');
      cy.get('input#password').type('fake');
      cy.get('button#register').click();
      cy.contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'password' });
    });

    it('a new blog can be created', function () {
      cy.get('button#new-note').click();
      cy.get('#title').type('A title');
      cy.get('#author').type('An author');
      cy.get('#url').type('test.com');
      cy.get('#create-button').click();
      cy.contains('A title');
    });

    describe('after blog created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A title',
          author: 'An author',
          url: 'test.com',
        });
      });

      it('can like the blog', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.get('#like-count').contains('1');
      });

      it('can delete the blog', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.get('html').should('not.contain', 'A title');
      });

      describe('other user logged in', function () {
        beforeEach(function () {
          const user = {
            username: 'test2',
            name: 'Test User 2',
            password: 'password',
          };
          cy.request('POST', 'http://localhost:3003/api/users/', user);

          cy.login({ username: 'test2', password: 'password' });
        });

        it('cannot delete a blog that the initial user posted', function () {
          cy.contains('view').click();
          cy.get('body').should('not.contain', 'remove');
        });
      });
    });

    describe('when multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A title',
          author: 'An author',
          url: 'test.com',
          likes: 1,
        });
        cy.createBlog({
          title: 'A title 2',
          author: 'An author',
          url: 'test.com',
          likes: 10,
        });
      });

      it('orders by the number of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'A title 2');
        cy.get('.blog').eq(1).should('contain', 'A title');
      });
    });
  });
});
