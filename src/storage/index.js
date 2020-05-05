/**
 * storage封装
 */
const STORAGE_KEY = 'mall'
export default {
  // eslint-disable-next-line camelcase
  setItem (key, value, module_name) {
    // eslint-disable-next-line camelcase
    if (module_name) {
      const val = this.getItem(module_name)
      val[key] = value
      this.setItem(module_name, val)
    } else {
      const val = this.getStorage()
      val[key] = value
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
  },
  // 获取某一个模块下面的属性user下面的username
  // eslint-disable-next-line camelcase
  getItem (key, module_name) {
    // eslint-disable-next-line camelcase
    if (module_name) {
      const val = this.getItem(module_name)
      if (val) return val[key]
    }
    return this.getStorage()[key]
  },
  getStorage () {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY || '{}'))
  },
  // eslint-disable-next-line camelcase
  clear (key, module_name) {
    const val = this.getStorage()
    // eslint-disable-next-line camelcase
    if (module_name) {
      if (!val[module_name]) return
      delete val[module_name][key]
    } else {
      delete val[key]
    }
    this.setItem(STORAGE_KEY, val)
  }
}
