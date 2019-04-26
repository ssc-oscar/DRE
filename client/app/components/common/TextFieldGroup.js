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

const TextFieldGroup = ({ field, value, label, error, type, onChange, icon, focus, autocomplete }) => {
  return (
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3" style={styles.inputGroup}>
        { icon &&
        <InputGroupAddon className="shadow-lg" addonType="prepend">
          <InputGroupText className="border border-right-0">
            <i className={`${icon}`} />
          </InputGroupText>
        </InputGroupAddon>
        }
        <Input
          autoFocus={focus}
          value={value}
          onChange={onChange}
          type={type}
          name={field}
          placeholder={label}
          autoComplete={autocomplete}
          className={classnames("form-control border text-default",
                    { 'is-invalid': error },
                    { 'border-left-0': icon},
                    { 'px-3': !icon})}
        />
        {error && <FormFeedback style={styles.feedback}>{error}</FormFeedback>}
      </InputGroup>
    </FormGroup>
  );
}

const styles = {
  feedback: {
    paddingLeft: 5
  },
  inputGroup: {
    boxShadow: 'none'
  }
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