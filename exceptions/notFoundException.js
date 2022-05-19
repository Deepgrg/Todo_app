class NotFoundException extends Error {
  constructor(message) {
    super("Resource not found");
    this.message = message || "Resource not found";
    this.status = 404;
  }
}

module.exports = { NotFoundException };
