@auth
Feature: User Authentication

    @TES-001
    Scenario: Verify new user can be registered and generate access token
        Given user generates access token with "newCommonUserRegister" body
        And the response code should be 201




