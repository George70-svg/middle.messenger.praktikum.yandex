export type PageType = 'loginPage' | 'registrationPage' | 'messengerPage' | 'profileViewPage' | 'profileEditPage' | 'profileEditPasswordPage' | 'page404' | 'page500'

export function isPageType(value: string | undefined): value is PageType {
  if (value) {
    return [
      'loginPage',
      'registrationPage',
      'messengerPage',
      'profileViewPage',
      'profileEditPage',
      'profileEditPasswordPage',
      'page404',
      'page500'].includes(value)
  } else {
    return false
  }
}
