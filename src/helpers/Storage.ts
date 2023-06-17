class AppStorage {
  static async get(options: { key: string }) {
    return { value: localStorage.getItem(options.key) };
  }

  static async set(options: { key: string; value: string }) {
    localStorage.setItem(options.key, options.value);
    return {};
  }
}

export { AppStorage };
