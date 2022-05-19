class ValidationException extends Error {
  constructor(data) {
    super("Validation Error");
    this.status = 422;
    this.message = "Validation Error";
    this.data = data;
  }
}

module.exports = { ValidationException };
