import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const required = ['email', 'password', 'confirmPassword']

function isRequired(field) {
  if (required.indexOf(field) != -1) {
    return " *"
  }
}

const TextFieldGroup = ({ field, value, label, error, type, onChange }) => {
  return (
    <div className="form-group">
      <label className="control-label">{label}{isRequired(field)}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={field}
        className={classnames("form-control", { 'is-invalid': error })}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

}

TextFieldGroup.defaultProps = {
  type: 'text'
}
export default TextFieldGroup;