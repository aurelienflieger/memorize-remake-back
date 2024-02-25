export default class ApiError extends Error {
  constructor(message, info) {
    super(message);
    this.name = "apiError";
    Object.entries(info).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}