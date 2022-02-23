import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import '../../styles/react-tags.css';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const MultiValueGroup = ({
  tags, placeholder, error, handleDelete, handleAddition
  }) => {
  return (
    <FormGroup>
      <ReactTags
        inputFieldPosition="top"
        tags={tags}
        allowDragDrop={false}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        placeholder={placeholder}
        autofocus={false}
      />
      {/* {error && <div className="invalid-feedback d-block">{error}</div>} */}
    </FormGroup>
  );
}

MultiValueGroup.propTypes = {
  tags: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  handleAddition: PropTypes.func.isRequired,

}

export default MultiValueGroup;