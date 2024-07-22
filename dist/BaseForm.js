"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _validator = require("./utils/validator");
var _FieldEdit = _interopRequireDefault(require("./FieldEdit"));
var _FieldSelect = _interopRequireDefault(require("./FieldSelect"));
var _FieldDate = _interopRequireDefault(require("./FieldDate"));
var _NavigateBefore = _interopRequireDefault(require("@mui/icons-material/NavigateBefore"));
var _NavigateNext = _interopRequireDefault(require("@mui/icons-material/NavigateNext"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BaseForm = _ref => {
  let {
    title,
    fields,
    onSubmit,
    onCancel,
    openAlert = false,
    // Default prop for alert visibility
    setOpenAlert,
    alertMessage = '',
    setAlertMessage,
    formState,
    setFormState,
    cancelText = 'Cancelar',
    nextText = 'Siguiente'
  } = _ref;
  const [errors, setErrors] = (0, _react.useState)({});
  const handleInputChange = function (event) {
    var _event$target$name, _event$target, _event$target$value, _event$target2;
    let fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    const name = (_event$target$name = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.name) !== null && _event$target$name !== void 0 ? _event$target$name : fieldName;
    const value = (_event$target$value = (_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.value) !== null && _event$target$value !== void 0 ? _event$target$value : new Date(event.$d).toISOString().split('T')[0];
    setFormState({
      ...formState,
      [name]: value
    });
    if (value) errors[name] = '';
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formState);
    } else {
      setAlertMessage('Resuelva los problemas');
      setOpenAlert(true);
    }
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      const {
        name,
        validationrules
      } = field;
      const value = formState[name] || '';
      const responseValidation = (0, _validator.validateFromRules)(value, validationrules);
      if (!responseValidation.isValid) {
        newErrors[name] = {
          message: responseValidation.message,
          isError: true
        };
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "form-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_material.Snackbar, {
    open: openAlert,
    autoHideDuration: 6000,
    onClose: handleCloseAlert
  }, alertMessage), /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    sx: {
      '& .MuiTextField-root': {
        m: 1,
        width: '25ch'
      }
    },
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_material.Toolbar, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: {
      flex: '1 1 100%'
    },
    variant: "h6",
    id: "tableTitle",
    component: "div"
  }, /*#__PURE__*/_react.default.createElement("h2", null, title)), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    onClick: onCancel
  }, cancelText))), fields.map(field => {
    const {
      name,
      label,
      value,
      type,
      options,
      error,
      ...fieldProps
    } = field;
    const fieldValue = formState[name] || value;
    const fieldError = errors[name] || null;
    if (type === 'select') {
      return /*#__PURE__*/_react.default.createElement(_FieldSelect.default, {
        key: field.id,
        options: options,
        label: label,
        name: name,
        value: fieldValue,
        onChange: handleInputChange,
        error: fieldError
      });
    } else if (type === 'date') {
      return /*#__PURE__*/_react.default.createElement(_FieldDate.default, {
        key: field.id,
        label: label,
        name: name,
        value: fieldValue,
        onChange: handleInputChange,
        error: fieldError
      });
    } else {
      return /*#__PURE__*/_react.default.createElement(_FieldEdit.default, _extends({
        key: field.id,
        label: label,
        name: name,
        value: fieldValue,
        onChange: handleInputChange,
        error: fieldError
      }, fieldProps));
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    spacing: 2,
    justifyContent: "flex-end"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    onClick: onCancel
  }, " ", /*#__PURE__*/_react.default.createElement(_NavigateBefore.default, null), " ", cancelText), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    type: "submit"
  }, " ", nextText, " ", /*#__PURE__*/_react.default.createElement(_NavigateNext.default, null), " "))));
};
var _default = exports.default = BaseForm;