export const MenuItems: any = [
  { title: 'Home', icon: 'home', route: '/home' },
  { title: 'Members', icon: 'group', route: '/members' },
  { title: 'Trainers', icon: 'accessibility', route: '/trainers' },
  {
    title: 'Finance & Billing',
    icon: 'account_balance_wallet',
    children: [
      { title: 'Invoices', icon: 'description', route: '/finance/invoices' },
      { title: 'Payments', icon: 'payment', route: '/finance/payments' },
      { title: 'Sales', icon: 'local_atm', route: '/finance/sales' }
    ]
  },
  {
    title: 'Resources',
    icon: 'business',
    children: [
      { title: 'Facilities', icon: 'location_city', route: '/facilities' },
      { title: 'Usage Logs', icon: 'history', route: '/usageLogs' },
      { title: 'Maintenance Requests', icon: 'security', route: '/maintenance' }
    ]
  },
  { title: 'Plans (Workout & Diet)', icon: 'fitness_center', route: '/workout-plans' },
  { title: 'Store', icon: 'storefront', route: '/store' },
  { title: 'Communications', icon: 'chat', route: '/communications' },
  {
    title: 'Site Settings',
    icon: 'settings',
    children: [
      { title: 'Sites', icon: 'domain', route: '/site-settings/sites' },
      { title: 'Holidays', icon: 'event_note', route: '/site-settings/holidays' },
      { title: 'Users', icon: 'group_add', route: '/site-settings/users' },
      { title: 'Roles', icon: 'security', route: '/site-settings/roles' }
    ]
  }
];
