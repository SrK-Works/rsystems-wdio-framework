import * as cookie from './web/components/cookie_banner.map';
import * as topnav from './web/menus/topnav.map';
import * as home from './web/screens/home.map';
import * as joinUs from './web/screens/join_us.map';
import * as service from './web/screens/service.map';

/**
 * The "stitcher" combines every map into ONE object so steps never hold
 * hard-coded selectors. Full access path:
 *   ui.menu.topnav.containers.nav_form.links.join_us.self
 * In feature files we use the short dotted form (no "containers"/"self"):
 *   "menu.topnav.nav_form.links.join_us"
 */
export const ui: Record<string, any> = {
  menu: { topnav },
  component: { cookie_banner: cookie },
  screen: { home, join_us: joinUs, service }
};

export function getSelector(shortPath: string): string {
  const [group, page, container, type, item] = shortPath.split('.');
  const selector = ui[group]?.[page]?.containers?.[container]?.[type]?.[item]?.self;
  if (typeof selector !== 'string') {
    throw new Error(`No selector in the maps for "${shortPath}" (expected group.page.container.type.item)`);
  }
  return selector;
}
