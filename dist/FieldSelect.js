"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FieldSelect = _ref => {
  let {
    options,
    label,
    name,
    value,
    onChange,
    error,
    ...props
  } = _ref;
  const labelId = name + '-label';
  return /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    sx: {
      m: 1,
      minWidth: 140
    }
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    id: labelId
  }, label), /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
    labelId: labelId,
    name: name,
    value: value || '',
    onChange: onChange,
    error: error === null || error === void 0 ? void 0 : error.isError
  }, props), options.map(option => /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    key: option.id,
    value: option.key
  }, option.title))));
};
var _default = exports.default = FieldSelect;