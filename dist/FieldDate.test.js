"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _FieldDate = _interopRequireDefault(require("./FieldDate"));
require("@testing-library/jest-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('FieldDate', () => {
  it('renders a DatePicker component', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_FieldDate.default, {
      label: "Fecha",
      name: "myDate"
    }));
    const datePicker = _react2.screen.getByLabelText('Fecha');
    expect(datePicker).toBeInTheDocument();
  });
  it('handles onChange event', async () => {
    const handleChange = jest.fn();
    const {
      getByLabelText
    } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_FieldDate.default, {
      label: "Fecha",
      name: "myDate",
      onChange: handleChange
    }));
    const datePicker = getByLabelText('Fecha');
    await _userEvent.default.click(datePicker); // Simula un click en el DatePicker

    const button = _react2.screen.getByRole('button');
    await _userEvent.default.click(button);
    const today = new Date();
    const selectADateButton = _react2.screen.getByRole('gridcell', {
      name: "".concat(today.getDate())
    });
    await _userEvent.default.click(selectADateButton);
    const inputDate = _react2.screen.getByRole('textbox', {
      name: 'Fecha'
    });
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateMatch = "".concat(month, "/").concat(day, "/").concat(today.getFullYear());
    expect(dateMatch).toEqual(inputDate.value);
  });

  // Agrega más casos de prueba según sea necesario
});