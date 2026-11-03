@web @navigation
Feature: Site navigation

  Background:
    Given I open the R Systems website

  @smoke @regression
  Scenario: Join Us opens the careers page
    When I click the element "menu.topnav.nav_form.links.join_us"
    Then the URL should contain "/join-us/"
    And the element "screen.join_us.careers_form.text.heading" should be displayed

  @regression
  Scenario: Get in Touch opens the contact page
    When I click the element "menu.topnav.nav_form.links.get_in_touch"
    Then the URL should contain "/get-in-touch/"

  @regression
  Scenario Outline: Service pages open and show a main heading
    When I open the "<path>" page
    Then the URL should contain "<path>"
    And the element "screen.service.service_form.text.main_heading" should be displayed
    And the main heading should not be empty

    Examples:
      | path                         |
      | /digital-product-engineering/ |
      | /cloud-and-devops/           |
      | /data-and-ai/                |
      | /quality-engineering/        |
