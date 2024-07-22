"use strict";

/**
 * 
 * Convierte un listado de errores en un texto html
 * 
 * @param {*} message 
 * @returns 
 */
const parseErrorMessage = message => {
  const messageParts = message.split(';'); // Split the message into parts

  let formattedMessage = '<ul>';
  messageParts.forEach(part => {
    formattedMessage += "<li>".concat(part, ".</li>");
  });
  formattedMessage += '</ul>';
  return formattedMessage;
};
module.exports = {
  parseErrorMessage
};