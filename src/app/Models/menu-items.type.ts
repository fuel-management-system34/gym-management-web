export const MenuItems: any[] = [
  { title: 'Home', icon: 'home', route: '/home', isGroup: false },
  {
    title: 'Members',
    icon: 'group',
    route: '/members',
    isGroup: false,
    children: [
      { title: 'Add Member', route: '/members/new' },
      {
        title: 'Edit Member',
        route: '/members/edit/:id',
        children: [
          {
            title: 'Profile Info',
            route: '/members/edit/:id/profile',
            children: [
              { title: 'Demographics', route: '/members/edit/:id/profile/demographics' },
              { title: 'Contact Info', route: '/members/edit/:id/profile/contact-info' },
              { title: 'Emergency Contact', route: '/members/edit/:id/profile/emergency-contact' },
              { title: 'Health Goals', route: '/members/edit/:id/profile/health-goals' }
            ]
          },
          { title: 'Membership', route: '/members/edit/:id/membership' },
          { title: 'Attendance', route: '/members/edit/:id/attendance' },
          { title: 'Billing', route: '/members/edit/:id/billing' }
        ]
      }
    ]
  },
  {
    title: 'Trainers',
    icon: 'accessibility',
    route: '/trainers',
    isGroup: false,
    children: [
      { title: 'Add Trainer', route: '/trainers/new' },
      {
        title: 'Edit Trainer',
        route: '/trainers/edit/:id',
        children: [
          { title: 'Profile Info', route: '/trainers/edit/:id/profile' },
          { title: 'Attendance', route: '/trainers/edit/:id/attendance' },
          { title: 'Financial', route: '/trainers/edit/:id/financial' }
        ]
      }
    ]
  },
  {
    title: 'Appointments',
    icon: 'event',
    route: '/appointments'
  },
  {
    title: 'Reports',
    icon: 'insert_chart',
    route: '/reports',
    isGroup: false,
    children: [
      { title: 'Attendance Report', route: '/reports/attendance' },
      { title: 'Payment Summary', route: '/reports/payments' },
      { title: 'Sales Report', route: '/reports/sales' },
      { title: 'Trainer Performance', route: '/reports/trainerPerformance' },
      { title: 'Class Enrollment', route: '/reports/classEnrollment' }
    ]
  },
  {
    title: 'Finance & Billing',
    icon: 'account_balance_wallet',
    isGroup: true,
    children: [
      { title: 'Invoices', icon: 'description', route: '/finance/invoices' },
      { title: 'Payments', icon: 'payment', route: '/finance/payments' },
      { title: 'Sales', icon: 'local_atm', route: '/finance/sales' }
    ]
  },
  {
    title: 'Resources',
    icon: 'business',
    isGroup: true,
    children: [
      { title: 'Facilities', icon: 'location_city', route: '/facilities' },
      { title: 'Usage Logs', icon: 'history', route: '/usageLogs' },
      { title: 'Maintenance Requests', icon: 'security', route: '/maintenance' }
    ]
  },
  { title: 'Plans (Workout & Diet)', icon: 'fitness_center', route: '/workout-plans', isGroup: false },
  { title: 'Store', icon: 'storefront', route: '/store', isGroup: false },
  { title: 'Communications', icon: 'chat', route: '/communications', isGroup: false },
  {
    title: 'Site Settings',
    icon: 'settings',
    route: '/site-settings',
    isGroup: true,
    children: [
      { title: 'Holidays', icon: 'event_note', route: '/site-settings/holidays' },
      { title: 'Users', icon: 'account_circle', route: '/site-settings/users' },
      { title: 'Roles', icon: 'security', route: '/site-settings/roles' },
      { title: 'Sites', icon: 'domain', route: '/site-settings/sites' }
    ]
  }
];
