'use strict';

const errorResponse = (status, message, err) => {
  let errorResponse;
  switch (status) {
    case 400:
      errorResponse = Object.assign({}, { success: false, status, message: message || 'paramMissing', error: err });
      break;
    case 401:
      errorResponse = Object.assign({}, { success: false, status, message: message || 'unauthorizedRequest', error: err });
      break;
    case 403:
      errorResponse = Object.assign({}, { success: false, status, message: message || 'forbidden', error: err });
      break;
    case 404:
      errorResponse = Object.assign({}, { success: false, status, message: message || 'notFound', error: err });
      break;
    default:
      errorResponse = Object.assign({}, { success: false, status: status || 520, message: message || 'errorFound', error: err });
      break;
  }
  return errorResponse;
};

const successResponse = (status, data, meta, message) => {
  let successResponse;
  switch (status) {
    case 201:
      successResponse = Object.assign({}, { success: true, status, message: message || 'created', data, meta});
      break;
    case 202:
      successResponse = Object.assign({}, { success: true, status, message: message || 'accepted', data, meta });
      break;
    case 204:
      successResponse = Object.assign({}, { success: true, status, message: message || 'updated', data, meta });
      break;
    default:
      successResponse = Object.assign({}, { success: true, status: status || 200, message: message || 'success', data, meta });
      break;
  }
  return successResponse;
};

module.exports = {
  successResponse,
  errorResponse
}
