import type { NavCategory } from '../types'

export const mockNavigation: NavCategory[] = [
  {
    name: 'AI 中转站',
    icon: 'mdi:send',
    items: [
      {
        title: 'FreeModel',
        description: '号称注册送300刀，羊毛中转',
        url: 'https://freemodel.dev/invite/FRE-87d82ff6',
        icon: 'simple-icons:openai',
        tags: ['AI中转', '薅羊毛', '野鸡平台'],
        // ribbon: { text: '野鸡', color: '#FAE251' },
      },
    ],
  },
]
