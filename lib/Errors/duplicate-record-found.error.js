const DUPLICATE_RECORD_FOUND_ERROR = {
  code: 400,
  name: 'DUPLICATE_RECORD_FOUND_ERROR',
  message: 'Duplicate record found'
}

class DuplicateRecordFoundError extends Error {
  constructor(message = DUPLICATE_RECORD_FOUND_ERROR.message, params) {
    super(message);
    this.name = DUPLICATE_RECORD_FOUND_ERROR.name;
    this.code = DUPLICATE_RECORD_FOUND_ERROR.code;
  }
}

module.exports = DuplicateRecordFoundError;