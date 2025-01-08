export type PageType = 'loginPage' | 'registrationPage' | 'profileViewPage' | 'profileEditPage' | 'profileEditPasswordPage' | 'messengerPage' | 'page404' | 'page500'

export function isPageType(value: string | undefined): value is PageType {
  if (value) {
    return [
      'loginPage',
      'registrationPage',
      'profileViewPage',
      'profileEditPage',
      'profileEditPasswordPage',
      'messengerPage',
      'page404',
      'page500'].includes(value)
  }
  return false
}
