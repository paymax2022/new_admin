import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    mainLayout: 'app',
    sidebar: true,
    menu: '',
    layout: '',
    rtlClass: '',
    animation: ''
  }),

  actions: {
    setMainLayout(payload) {
      this.mainLayout = payload
    },
    toggleSidebar(value) {
      this.sidebar = value
    }
  }
}) 