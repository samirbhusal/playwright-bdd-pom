@web
Feature: User Login
    As a user, I want to log in to the web application.
    Background:
        Given Web platform is launched

    @TES-101 @smoke
    Scenario: Verify existing user can log in successfully
        Given user navigates to the login page
# When user enters valid credentials
# And clicks on the login button
# Then user should be redirected to the dashboard page