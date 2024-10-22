export class CookieUtil {
  public static setValue(key: string, value: any) {
    const valueToStore =
      typeof value === 'object' ? JSON.stringify(value) : value?.toString();
    sessionStorage.setItem(key, valueToStore);
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
