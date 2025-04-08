export interface NavigationItem {
  id: string;
  title?: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard'
      }
    ]
  },
  {
    id: 'Fuel',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Fuel Inventory',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'format_color_fill'
      }
    ]
  },
  {
    title: 'sales',
    id: 'dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sales',
        title: 'Sales',
        type: 'item',
        classes: 'nav-item',
        url: '/global-settings',
        icon: 'multiline_chart',
        breadcrumbs: true
      }
    ]
  },
  {
    title: 'customer',
    id: 'dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sales',
        title: 'Customer',
        type: 'item',
        classes: 'nav-item',
        url: '/global-settings',
        icon: 'supervisor_account',
        breadcrumbs: true
      }
    ]
  },
  {
    title: 'site-setings',
    id: 'dashboard',
    type: 'group',
    children: [
      {
        id: 'sales',
        title: 'Site settings',
        type: 'collapse',
        classes: 'nav-item',
        url: '/global-settings',
        icon: 'settings',
        breadcrumbs: true,
        children: [
          {
            id: 'user',
            title: 'Users',
            type: 'item',
            classes: 'nav-item',
            url: '/users',
            icon: 'people_outline',
            breadcrumbs: true
          }
        ]
      }
    ]
  }
];
