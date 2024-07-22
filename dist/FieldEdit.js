"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FieldEdit = _ref => {
  let {
    label,
    name,
    value,
    onChange,
    error,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({
    label: label,
    variant: "outlined",
    id: name,
    name: name,
    value: value,
    onChange: onChange,
    error: error === null || error === void 0 ? void 0 : error.isError,
    helperText: error === null || error === void 0 ? void 0 : error.message
  }, props));
};
var _default = exports.default = FieldEdit;