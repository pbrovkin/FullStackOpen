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
      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
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
        cy.createBlog({ title: 'First blog', author: 'First Author', url: 'http://first.com' })
        cy.createBlog({ title: 'Second blog', author: 'Second Author', url: 'http://second.com' })
        cy.createBlog({ title: 'Third blog', author: 'Third Author', url: 'http://third.com' })
      })

      it('user can like a blog', function () {
        cy.contains('Second blog').contains('view').click()
        cy.contains('like').click()
        cy.contains('1 like')
      })
    })
  })
})