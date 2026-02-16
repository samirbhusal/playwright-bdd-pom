@web
Feature: User Login
    As a user, I want to log in to the web application.
    Background:
        Given Web platform is launched

    @TES-101 @smoke
    Scenario: Verify existing user can log in successfully
        Given user navigates to the login page
        When user enters valid username as "test.engineer@gmail.com"
        And user enters valid password as "test123"
        And user clicks submit button
        Then user should successfully log in and see the dashboard

    @TES-102 @smoke
    Scenario: Verify existing user can log in successfully
        Given user navigates to the login page
        When user enters valid username as "test.engineer@gmail.com"
        And user enters valid password as "test123"
        And user clicks submit button

    @TES-103
    Scenario: Verify existing user can log in successfully
        Given user navigates to the login page
        When user enters valid username as "test.engineer@gmail.com"
        And user enters valid password as "test123"
        And user clicks submit button
