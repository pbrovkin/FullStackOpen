describe('Blogs app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mlu')
      cy.get('#password').type('sal')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[id="title"]').type('a blog created by cypress')
      cy.get('input[id="author"]').type('Testing Author')
      cy.get('input[id="url"]').type('http://localhost:3000')
      cy.contains('save').click()
      cy.contains('a blog created by cypress / Testing Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'First Author', url: 'http://first.com' })
        cy.createBlog({ title: 'second blog', author: 'Second Author', url: 'http://second.com' })
        cy.createBlog({ title: 'third blog', author: 'Third Author', url: 'http://third.com' })
      })

      it('user can like a blog', function () {
        cy.contains('second blog').click()
        cy.contains('like').click()
        cy.contains('liked \'second blog\' by Second Author')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.contains('1 like')
      })

      it('user can delete a blog', function () {
        cy.contains('first').click()
        cy.contains('remove').click()
        cy.contains('removed \'first blog\' by First Author')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.contains('first blog').should('not.exist')
        cy.get('html').should('not.contain', 'first blog / First Author')
      })
    })
  })
})