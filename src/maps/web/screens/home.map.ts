// screens/ = selectors for ONE page only
export const containers = {
  hero_form: {
    text: { hero_heading: { self: 'h1' } }
  },
  industry_form: {
    links: {
      banking_and_financial_services: { self: '//a[normalize-space()="Banking and Financial Services"]' },
      healthcare: { self: '(//a[normalize-space()="Healthcare"])[1]' }
    }
  }
};
