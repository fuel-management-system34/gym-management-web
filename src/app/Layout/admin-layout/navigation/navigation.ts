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
    type: 'item',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/appointments'
  },
  {
    title: 'Memberships',
    id: 'Memberships',
    type: 'item',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/memberships'
  },
  {
    title: 'Finance & Billing',
    id: 'Finance & Billing',
    type: 'group',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/finance',
    children: [
      {
        id: 'sales',
        title: 'Finance & Billing',
        type: 'collapse',
        icon: 'finance',
        breadcrumbs: true,
        children: [
          {
            id: 'Invoices',
            title: 'Invoices',
            type: 'item',
            classes: 'nav-item',
            url: '/finance/invoices',
            icon: 'dot',
            breadcrumbs: true
          },
          {
            id: 'Payments',
            title: 'Payments',
            type: 'item',
            classes: 'nav-item',
            url: '/finance/payments',
            icon: 'dot',
            breadcrumbs: true
          },
          {
            id: 'Sales',
            title: 'Sales',
            type: 'item',
            classes: 'nav-item',
            url: '/finance/sales',
            icon: 'dot',
            breadcrumbs: true
          }
        ]
      }
    ]
  },
  {
    title: 'Reports',
    id: 'Reports',
    type: 'item',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/reports'
  },
  {
    title: 'Plans (Workout & Diet)',
    id: 'Plans',
    type: 'item',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/plans'
  },
  {
    title: 'Store',
    id: 'Store',
    type: 'item',
    icon: 'icon-navigation',
    classes: 'nav-item',
    url: '/store'
  },
  {
    title: 'Resources & Facilities',
    id: 'Store',
    type: 'group',
    url: '/facilities',
    children: [
      {
        id: 'facilities',
        title: 'Resources & Facilities',
        type: 'collapse',
        icon: 'facilities',
        breadcrumbs: true,
        children: [
          {
            id: 'Facilities',
            title: 'Sites',
            type: 'item',
            classes: 'nav-item',
            url: '/facilities',
            icon: 'dot',
            breadcrumbs: true
          },
          {
            id: 'Usage Logs',
            title: 'Usage Logs',
            type: 'item',
            classes: 'nav-item',
            url: '/usageLogs',
            icon: 'dot',
            breadcrumbs: true
          },
          {
            id: 'Maintenance Requests',
            title: 'Maintenance Requests',
            type: 'item',
            classes: 'nav-item',
            url: '/maintenance',
            icon: 'dot',
            breadcrumbs: true
          }
        ]
      }
    ]
  },
  {
    id: 'Communications',
    title: 'Communications',
    type: 'item',
    icon: 'communications',
    url: '/communications',
    classes: 'nav-item'
  },
  {
    title: 'site-setings',
    id: 'site-setings',
    type: 'group',
    children: [
      {
        id: 'sites',
        title: 'Site settings',
        type: 'collapse',
        icon: 'settings',
        breadcrumbs: true,
        children: [
          {
            id: 'Sites',
            title: 'Sites',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/sites',
            icon: 'dot',
            breadcrumbs: true
          },
          {
            id: 'Holidays',
            title: 'Holidays',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/holidays',
            icon: 'dot',
            breadcrumbs: true
          },
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
            id: 'roles',
            title: 'Roles',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/roles',
            icon: 'dot',
            breadcrumbs: true
          }
        ]
      }
    ]
  }
];
