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
    title: 'dashboard',
    id: 'dashboard',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'collapse',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false,
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            classes: 'nav-item',
            url: '/login',
            icon: 'login',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            classes: 'nav-item',
            url: '/login',
            icon: 'login',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            classes: 'nav-item',
            url: '/login',
            icon: 'login',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  },
  {
    title: 'authentication',
    id: 'authentication',
    type: 'group',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'utilities',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'font-size'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'bg-colors'
      },
      {
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://ant.design/components/icon',
        icon: 'ant-design',
        target: true,
        external: true
      }
    ]
  },

  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  },
  {
    title: 'dashboard',
    id: 'dashboard',
    type: 'group',
    children: [
      {
        id: 'gloabal settings',
        title: 'Gloabal Settings',
        type: 'collapse',
        classes: 'nav-item',
        url: '/global-settings',
        icon: 'setting',
        breadcrumbs: false,
        children: [
          {
            id: 'users',
            title: 'Users',
            type: 'item',
            classes: 'nav-item',
            url: 'global-settings/users',
            icon: 'user',
            target: false,
            breadcrumbs: false
          }
        ]
      }
    ]
  }
];
