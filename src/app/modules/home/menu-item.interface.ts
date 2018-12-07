/**
 * Interface from menu item.
 */
export interface MenuItem {

  // icon classes
  icon: string;

  // menu label
  label: string;

  // url route
  href: string;

  // is active tab
  isActive: boolean;

}
