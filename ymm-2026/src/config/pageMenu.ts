export type PageMenuItem = {
  roman: string
  label: string
  path: string
  enabled: boolean
}

export const PAGE_MENU_ITEMS: PageMenuItem[] = [
  {
    roman: 'I',
    label: 'I. ８周年おめでとう！',
    path: '/page/1',
    enabled: true,
  },
  {
    roman: 'II',
    label: 'II. ユメミちゃんの好きな所・配信',
    path: '/page/2',
    enabled: true,
  },
  {
    roman: 'III',
    label: 'III. ユメミちゃんにしてほしいこと',
    path: '/page/3',
    enabled: true,
  },
  {
    roman: 'IV',
    label: 'IV. ユメミちゃんに告白',
    path: '/page/4',
    enabled: true,
  },
  {
    roman: 'V',
    label: 'V. 感謝',
    path: '/page/5',
    enabled: true,
  },
]
