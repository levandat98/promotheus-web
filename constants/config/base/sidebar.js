import { ALL } from './auth'

export const sidebar = {
  config: {},
  items: [
    {
      module: 'dashboard', // Module name for localization
      icon: ['fas', 'tachometer-alt'], // Fontawesome or Element UI icon
      color: 'var(--color-yellow)',
      route: { name: '/' },
      permission: ALL, // ALL or match ./auth.js
    },
    // {
    //   module: 'request', // Module name for localization
    //   icon: ['fas', 'receipt'], // Fontawesome or Element UI icon
    //   color: 'var(--color-yellow)', // Must be CSS variables
    //   route: { name: 'request' }, // path or route object ({ name: 'route-name',... })
    //   permission: ALL, // ALL or match ./auth.js
    // },
    {
      module: 'member', // Module name for localization
      icon: ['fas', 'users'], // Fontawesome or Element UI icon
      color: 'var(--color-yellow)',
      route: { name: 'members' },
      permission: ALL, // ALL or match ./auth.js
    },
    // {
    //   module: 'analysis', // Module name for localization
    //   icon: ['fas', 'chart-line'], // Fontawesome or Element UI icon
    //   color: 'var(--color-yellow)', // Must be CSS variables
    //   route: { name: 'analysis' }, // path or route object ({ name: 'route-name',... })
    //   permission: ALL, // ALL or match ./auth.js
    // },
    // {
    //   module: 'notification', // Module name for localization
    //   icon: ['fas', 'bullhorn'], // Fontawesome or Element UI icon
    //   color: 'var(--color-yellow)', // Must be CSS variables
    //   route: { name: 'notification' }, // path or route object ({ name: 'route-name',... })
    //   permission: ALL, // ALL or match ./auth.js
    // },
  ],
}
