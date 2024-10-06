export class LocalStorageUtility {
  public static setValue(key: string, value: any) {
    localStorage.setItem(key, value?.toString());
  }

  public static getValue(key: string) {
    return localStorage.getItem(key);
  }

  public static removeValue(key: string) {
    localStorage.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
  }
}