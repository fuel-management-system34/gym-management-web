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
    id: 'home',
    title: 'Home',
    type: 'item',
    url: '/home',
    classes: 'nav-item',
    icon: 'home'
  },
  {
    id: 'Members',
    title: 'Members',
    type: 'item',
    icon: 'member',
    url: '/members',
    classes: 'nav-item'
  },
  {
    id: 'Trainers',
    title: 'Trainers & Staff',
    type: 'item',
    icon: 'icon-navigation',
    url: '/trainers',
    classes: 'nav-item'
  },
  {
    title: 'Appoinments',
    id: 'Appoinments',
    type: 'group',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/appointments'
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
        url: '/site-settings',
        icon: 'settings',
        breadcrumbs: true,
        children: [
          {
            id: 'user',
            title: 'Users',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/users',
            icon: 'dot',
            breadcrumbs: true
          },
          {
            id: 'Sites',
            title: 'Sites',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/sites',
            icon: 'dot',
            breadcrumbs: true
          }
        ]
      }
    ]
  }
];
