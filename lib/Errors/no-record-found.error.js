const NO_RECORD_FOUND_ERROR = {
  code: 400,
  name: 'NO_RECORD_FOUND_ERROR',
  message: 'Record not found'
}

class NoRecordFoundError extends Error {
  constructor(message = NO_RECORD_FOUND_ERROR.message, params) {
    super(message);
    this.name = NO_RECORD_FOUND_ERROR.name;
    this.code = NO_RECORD_FOUND_ERROR.code;
  }
}
module.exports = NoRecordFoundError;