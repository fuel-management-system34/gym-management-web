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
    icon: 'home' // Correct Material icon name
  },
  {
    id: 'Members',
    title: 'Members',
    type: 'item',
    icon: 'group', // Correct Material icon name for members
    url: '/members',
    classes: 'nav-item'
  },
  {
    id: 'Trainers',
    title: 'Trainers & Staff',
    type: 'item',
    icon: 'people', // Correct Material icon name for trainers & staff
    url: '/trainers',
    classes: 'nav-item'
  },
  {
    title: 'Appointments',
    id: 'Appointments',
    type: 'item',
    icon: 'event', // Correct Material icon name for appointments
    classes: 'nav-item',
    url: '/appointments'
  },
  {
    title: 'Memberships',
    id: 'Memberships',
    type: 'item',
    icon: 'card_membership', // Correct Material icon name for memberships
    classes: 'nav-item',
    url: '/memberships'
  },
  {
    title: 'Finance & Billing',
    id: 'Finance & Billing',
    type: 'group',
    icon: 'account_balance_wallet', // Correct Material icon name for finance & billing
    classes: 'nav-item',
    url: '/finance',
    children: [
      {
        id: 'sales',
        title: 'Finance & Billing',
        type: 'collapse',
        icon: 'attach_money', // Correct Material icon name for sales/finance
        breadcrumbs: true,
        children: [
          {
            id: 'Invoices',
            title: 'Invoices',
            type: 'item',
            classes: 'nav-item',
            url: '/finance/invoices',
            icon: 'description', // Correct Material icon name for invoices
            breadcrumbs: true
          },
          {
            id: 'Payments',
            title: 'Payments',
            type: 'item',
            classes: 'nav-item',
            url: '/finance/payments',
            icon: 'payment', // Correct Material icon name for payments
            breadcrumbs: true
          },
          {
            id: 'Sales',
            title: 'Sales',
            type: 'item',
            classes: 'nav-item',
            url: '/finance/sales',
            icon: 'local_atm', // Correct Material icon name for sales
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
    icon: 'insert_chart', // Correct Material icon name for reports
    classes: 'nav-item',
    url: '/reports'
  },
  {
    title: 'Plans (Workout & Diet)',
    id: 'Plans',
    type: 'item',
    icon: 'fitness_center', // Correct Material icon name for plans
    classes: 'nav-item',
    url: '/plans'
  },
  {
    title: 'Store',
    id: 'Store',
    type: 'item',
    icon: 'storefront', // Correct Material icon name for store
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
        icon: 'business', // Correct Material icon name for resources & facilities
        breadcrumbs: true,
        children: [
          {
            id: 'Facilities',
            title: 'Sites',
            type: 'item',
            classes: 'nav-item',
            url: '/facilities',
            icon: 'location_city', // Correct Material icon name for sites
            breadcrumbs: true
          },
          {
            id: 'Usage Logs',
            title: 'Usage Logs',
            type: 'item',
            classes: 'nav-item',
            url: '/usageLogs',
            icon: 'history', // Correct Material icon name for usage logs
            breadcrumbs: true
          },
          {
            id: 'Maintenance Requests',
            title: 'Maintenance Requests',
            type: 'item',
            classes: 'nav-item',
            url: '/maintenance',
            icon: 'build', // Correct Material icon name for maintenance
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
    icon: 'chat', // Correct Material icon name for communications
    url: '/communications',
    classes: 'nav-item'
  },
  {
    title: 'Site Settings',
    id: 'site-settings',
    type: 'group',
    children: [
      {
        id: 'sites',
        title: 'Site settings',
        type: 'collapse',
        icon: 'settings', // Correct Material icon name for settings
        breadcrumbs: true,
        children: [
          {
            id: 'Sites',
            title: 'Sites',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/sites',
            icon: 'domain', // Correct Material icon name for sites
            breadcrumbs: true
          },
          {
            id: 'Holidays',
            title: 'Holidays',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/holidays',
            icon: 'event_note', // Correct Material icon name for holidays
            breadcrumbs: true
          },
          {
            id: 'user',
            title: 'Users',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/users',
            icon: 'group_add', // Correct Material icon name for users
            breadcrumbs: true
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            classes: 'nav-item',
            url: '/site-settings/roles',
            icon: 'security', // Correct Material icon name for roles
            breadcrumbs: true
          }
        ]
      }
    ]
  }
];
