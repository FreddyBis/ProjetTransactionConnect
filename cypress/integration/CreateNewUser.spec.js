const faker=require ("faker")



describe('CreerNewUser', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();   

        cy.visit('https://tcmall-test.transactionconnect.com/ ')
      });

    it('inscription',()=> {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const phone = faker.phone.phoneNumber() 
        const email = faker.internet.email()
        const userName = faker.internet.userName()
        const password = `${faker.internet.password()}1$aA` 

        cy.get('[data-cy="landing_page_subscribe_btn"]').click()

        //**** STEP 1: Create your identifier ****//
        cy.url().should('include', '/creation-identifiant')
        cy.get('[data-cy="registration_first_name_input"]').type(firstName).should("have.value",firstName)
        cy.get('[data-cy="registration_last_name_input"]').type(lastName).should("have.value",lastName)
        cy.get('[data-cy="registration_phone_input"]').type(phone)
        cy.get('[data-cy="registration_email_input"]').type(email).should("have.value",email)
        cy.get('[data-cy="registration_validate_btn"]').click()

        //**** STEP 2: How do you wish to tell us about your purchases? ****//
        cy.url().should('include', '/choix-methode-identification')
        cy.get("button").eq(1).click() 

        //**** STEP 3: Link your bank account to unlock offers ****//
        cy.url().should('include', '/selection-banque')
        cy.get('.ant-select-selection__placeholder').click()
        cy.get('[data-cy="select_bank_option_Connecteur de test"]').click()

        //**** STEP 4: Your bank is compatible ****//
        cy.url().should('include', '/connexion-banque')
        cy.get('.ant-select-selection__placeholder').eq(0).click()
        cy.get('[data-cy="bank_credentials_option_openapiwebsite_Particuliers"]').click()
        cy.get('.ant-select-selection__placeholder').eq(1).click()
        cy.get('[data-cy="bank_credentials_option_directaccesswebsite_Particuliers"]').click()
        cy.get('[data-cy="bank_credentials_login_input"]').type(userName)
        cy.get('[data-cy="bank_credentials_password_input"]').type("1234")
        cy.get('[data-cy="optins_shareOptinGeneral_checkbox"]').check().should("be.checked")
        cy.get('[data-cy="optins_globalOptIn_checkbox"]').check().should("be.checked")
        cy.get('[data-cy="optins_shareOptIn_checkbox"]').check().should("be.checked")
        cy.get('[data-cy="optins_outsideOptinGeneral_checkbox"]').check().should("be.checked")
        cy.get('[data-cy="optins_outsideOptIn_checkbox"]').check().should("be.checked")
        cy.get('[data-cy="bank_credentials_validate_btn"]').click()

        //**** STEP 5: Créer mon espace client ****//
        
        cy.get('[data-cy="create_password_input"]').type(password)
        cy.get('[data-cy="confirm_password_input"]').type(password)

    })


})