"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseForm", {
  enumerable: true,
  get: function () {
    return _BaseForm.default;
  }
});
Object.defineProperty(exports, "FieldDate", {
  enumerable: true,
  get: function () {
    return _FieldDate.default;
  }
});
Object.defineProperty(exports, "FieldEdit", {
  enumerable: true,
  get: function () {
    return _FieldEdit.default;
  }
});
Object.defineProperty(exports, "FieldSelect", {
  enumerable: true,
  get: function () {
    return _FieldSelect.default;
  }
});
exports.default = void 0;
var _BaseForm = _interopRequireDefault(require("./BaseForm"));
var _FieldDate = _interopRequireDefault(require("./FieldDate"));
var _FieldEdit = _interopRequireDefault(require("./FieldEdit"));
var _FieldSelect = _interopRequireDefault(require("./FieldSelect"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Importación de componentes
// Exportación de componentes
// Exportación de la librería completa (opcional)
var _default = exports.default = {
  BaseForm: _BaseForm.default,
  FieldDate: _FieldDate.default,
  FieldEdit: _FieldEdit.default,
  FieldSelect: _FieldSelect.default
};