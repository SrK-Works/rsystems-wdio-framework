@web @quality
Feature: Quality Engineering service page

  Background:
    Given I open the R Systems website

  @smoke @regression
  Scenario: Quality Engineering page has the expected title and call to action
    When I open the "/quality-engineering/" page
    Then the page title should contain "Quality Engineering"
    And the main heading should contain "Quality"
    And the element "screen.service.service_form.links.get_in_touch" should be present

  @regression
  Scenario: Get in Touch from the Quality Engineering page
    When I open the "/quality-engineering/" page
    And I click the element "menu.topnav.nav_form.links.get_in_touch"
    Then the URL should contain "/get-in-touch/"
