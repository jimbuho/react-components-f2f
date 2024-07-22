"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _DatePicker = require("@mui/x-date-pickers/DatePicker");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FieldDate = _ref => {
  let {
    label,
    name,
    value = new Date(),
    onChange,
    error,
    ...props
  } = _ref;
  const dayjsValue = (0, _dayjs.default)(value);
  return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDayjs.AdapterDayjs
  }, /*#__PURE__*/_react.default.createElement(_DatePicker.DatePicker, _extends({
    label: label,
    name: name,
    value: dayjsValue,
    onChange: event => onChange(event, name),
    slotProps: {
      textField: {
        error: error === null || error === void 0 ? void 0 : error.isError,
        helperText: error === null || error === void 0 ? void 0 : error.message
      }
    }
  }, props)));
};
var _default = exports.default = FieldDate;