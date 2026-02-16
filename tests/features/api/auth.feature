@auth @api
Feature: User Authentication
    Background:
        Given API environment is set up

    @TES-001 @smoke
    Scenario: Verify new user can be registered and generate access token
        Given user generates access token with "newCommonUserRegister" body
        And the response code should be 201

    @TES-002 @smoke
    Scenario: Verify existing user can be logged in and generate access token
        Given registered user generates access token with "existingCommonUser" body
        And the response code should be 200

    @TES-003
    Scenario: Verify existing user can be logged in and generate access token
        Given registered user generates access token with "existingCommonUser" body
        And the response code should be 200

    @TES-004
    Scenario: Verify existing user can be logged in and generate access token
        Given registered user generates access token with "existingCommonUser" body
        And the response code should be 200

    @TES-005
    Scenario: Verify existing user can be logged in and generate access token
        Given registered user generates access token with "existingCommonUser" body
        And the response code should be 200



