export default class ApiError extends Error {
  constructor(message, {httpStatus, errorCode, path, method, details}) {
    super(message);
    this.name = "API error";
    this.timestamp = new Date().toISOString();
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.details = details;
    this.path = path;
    this.method = method;
  }
}