describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    // create user to backend
    const user = {
      username: "user",
      name: "user",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);

    cy.visit("/"); //localhost:3000
  });
  it("Login form is shown, 5.17 STEP 1", function () {
    cy.visit("/");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials, STEP2", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("password");
      cy.get("#login-btn").click();

      cy.contains("user logged in");
    });
    it("fails with wrong credentials, STEP2", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("wrongPassword");
      cy.get("#login-btn").click();

      cy.get(".errorMsg").should("contain", "Wrong username or password");
      cy.get("html").should("not.contain", "user logged in");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      // log user in
      cy.login({ username: "user", password: "password" });
    });
    it("A blog can be created, STEP 3", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Blog Title Test");
      cy.get("#author").type("Blog Author Test");
      cy.get("#url").type("blog.test");
      cy.get("#create-blog-btn").click();

      cy.contains("Blog Title Test");
      cy.contains("Blog Author Test"); // added to the list of blogs
    });
    describe("When blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test Title",
          author: "Test Author",
          url: "blog.test",
        });
      });
      it("users can like a blog, STEP 4", function () {
        cy.contains("Show").click();
        cy.get("#blog-likes").should("contain", "likes 0");
        cy.get("#like-btn").click();
        cy.get(".succesfulEvent").should(
          "contain",
          "Blog: Test Title has been liked"
        );
        cy.get("#blog-likes").should("contain", "likes 1");
      });
    });
  });
});
