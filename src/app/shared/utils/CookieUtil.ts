export class CookieUtil {
  public static setValue(key: string, value: any) {
    sessionStorage.setItem(key, value?.toString());
  }

  public static getValue(key: string) {
    return sessionStorage.getItem(key);
  }

  public static removeValue(key: string) {
    sessionStorage.removeItem(key);
  }

  public static clear() {
    sessionStorage.clear();
  }
}
