export type PropType = {
  current?: number
  total: number
  onchange: (currentPage: number) => void
  theme?: 'blue' | 'purple'
}
