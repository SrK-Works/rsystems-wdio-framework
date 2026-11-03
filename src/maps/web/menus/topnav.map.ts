// menus/ = navigation present on ALL pages
export const containers = {
  nav_form: {
    links: {
      what_we_do: { self: '//header//a[normalize-space()="What We Do"]' },
      who_we_serve: { self: '//header//a[normalize-space()="Who We Serve"]' },
      join_us: { self: '(//header//a[normalize-space()="Join Us"])[1]' },
      get_in_touch: { self: '(//header//a[normalize-space()="Get in Touch"])[1]' },
      investors: { self: '//header//a[normalize-space()="Investors"]' }
    }
  }
};
