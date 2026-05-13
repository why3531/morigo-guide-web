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
        tags: ['薅羊毛', '野鸡平台'],
        ribbon: { text: '不稳定', color: '#686D76' },
      },
      {
        title: 'Timicc',
        description: '价格优惠，0.6折',
        url: 'https://timicc.com/register?ref=WPD6NEPD',
        icon: 'simple-icons:openai',
        tags: ['claude', 'gpt'],
        ribbon: { text: '已验证', color: '#831C91' },
      },
      {
        title: 'PackyApi',
        description: '价格优惠，0.6折',
        url: 'https://www.packyapi.com/register?aff=JtX1',
        icon: 'simple-icons:openai',
        tags: ['claude', 'gpt', 'gemini', 'deepseek-v4'],
        ribbon: { text: '已验证', color: '#831C91' },
      },
      {
        title: 'Cubence',
        description: '价格优惠，0.6折',
        url: 'https://cubence.com/signup?code=SCDQB076',
        icon: 'simple-icons:openai',
        tags: ['claude', 'gpt', 'gemini'],
        ribbon: { text: '已验证', color: '#831C91' },
      },
    ],
  },
]
