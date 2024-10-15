import { createI18n } from 'vue-i18n'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
import idID from 'vant/es/locale/lang/id-ID'
import jaJP from 'vant/es/locale/lang/ja-JP'
import thTH from 'vant/es/locale/lang/th-TH'
import viVN from 'vant/es/locale/lang/vi-VN'

/**
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'
import { Locale, type PickerColumn } from 'vant'

/** 默认语言包名称 */
const FALLBACK_LOCALE = 'en-US'

/** 多语言 picker columns */
export const languageColumns: PickerColumn = [
  { text: '简体中文', value: 'zh-CN' },
  { text: 'English', value: 'en-US' },
  { text: 'Indonesia', value: 'id-ID' },
  { text: '日本語', value: 'ja-JP' },
  { text: 'ภาษาไทย', value: 'th-TH' },
  { text: 'Tiếng Việt', value: 'vi-VN' },
]

/** 获取当前语言对应的语言包名称 */
function getI18nLocale() {
  const storedLocale = localStorage.getItem('language') || navigator.language
  console.log('storedLocale==>',storedLocale)
  const langs = languageColumns.map(v => v.value as string)
  const foundLocale = langs.find(v => v === storedLocale || v.indexOf(storedLocale) === 0) // 存在当前语言的语言包 或 存在当前语言的任意地区的语言包
  const locale = foundLocale || FALLBACK_LOCALE // 若未找到，则使用 默认语言包

  document.querySelector('html').setAttribute('lang', locale)
  return locale
}

export const i18n = createI18n({
  locale: getI18nLocale(),
  legacy: false,
  messages,
})

/** 当前语言 */
export const locale = computed({
  get() {
    return i18n.global.locale.value
  },
  set(language: string) {
    document.querySelector('html').setAttribute('lang', language)
    localStorage.setItem('language', language)
    i18n.global.locale.value = language
    Locale.use(language)
  },
})

// 载入 vant 语言包
Locale.use('zh-CN', zhCN)
Locale.use('en-US', enUS)
Locale.use('id-ID', idID)
Locale.use('ja-JP', jaJP)
Locale.use('th-TH', thTH)
Locale.use('vi-VN', viVN)

// 根据当前语言切换 vant 语言包
Locale.use(locale.value)
