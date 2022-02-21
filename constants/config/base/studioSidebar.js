import { ALL } from './auth'

export const studioSidebar = {
  config: {},
  items: [
    {
      module: 'Episodes', // Module name for localization
      icon: ['fas', 'home'], // Fontawesome or Element UI icon
      color: 'var(--color-yellow)',
      route: { name: '/studio/episode' },
      permission: ALL, // ALL or match ./auth.js
    },
    {
      module: 'Series', // Module name for localization
      icon: ['fas', 'compass'], // Fontawesome or Element UI icon
      color: 'var(--color-yellow)',
      route: { name: '/studio/series' },
      permission: ALL, // ALL or match ./auth.js
    },
  ],
}
