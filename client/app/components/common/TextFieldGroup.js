import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  FormGroup,
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

const TextFieldGroup = ({ field, value, label, error, type, onChange, icon }) => {
  return (
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={`${icon}`} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          value={value}
          onChange={onChange}
          type={type}
          name={field}
          placeholder={label}
          className={classnames("form-control", { 'is-invalid': error })}
        />
        {/* <label className="control-label">{label}{isRequired(field)}</label> */}
        {/* <input
          value={value}
          onChange={onChange}
          type={type}
          name={field}
          className={classnames("form-control", { 'is-invalid': error })}
        /> */}
        {error && <FormFeedback>{error}</FormFeedback>}
      </InputGroup>
    </FormGroup>
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