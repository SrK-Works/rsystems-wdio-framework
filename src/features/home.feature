@web @home
Feature: R Systems home page

  Background:
    Given I open the R Systems website

  @smoke @regression
  Scenario: Home page loads with the correct title and hero heading
    Then the page title should contain "R Systems"
    And the element "screen.home.hero_form.text.hero_heading" should be present

  @smoke
  Scenario: Top navigation shows the main menu items
    Then the element "menu.topnav.nav_form.links.what_we_do" should be displayed
    And the element "menu.topnav.nav_form.links.who_we_serve" should be displayed
    And the element "menu.topnav.nav_form.links.join_us" should be displayed
    And the element "menu.topnav.nav_form.links.get_in_touch" should be displayed

  @regression
  Scenario: Home page lists the industry verticals
    Then the element "screen.home.industry_form.links.banking_and_financial_services" should be present
    And the element "screen.home.industry_form.links.healthcare" should be present
