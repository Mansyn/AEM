import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconChecklistbox, IconCheckbox } from '../Icon';
import createUid from '../utils/create-uid';
import './checkbox.scss';

/**
 *  Checkbox
 *
 *  This is a base level component that renders a basic `<input type="checkbox" />`
 *
 *  @param {object} props
 *    @property {bool|str}    checked      -  Indicates the visual state and HTML `checked` value.
 *                                            Please note that checked === true & partial == true
 *                                            the partial flag is just to render an alternate UI
 *                                            when listbox == true. Valid values are:
 *                                            (true|false|'partial'|'checked')
 *    @property {node}        children     -  JSX/DOM node that represents the label text
 *    @property {bool}        disabled     -  Should this checkbox be disabled?
 *    @property {bool}        displayBlock -  If `true` the element inputs will not render inline
 *    @property {str}         id           -  A unique ID
 *    @property {bool}        listbox      -  Should the checkbox render as a "List Checkbox"
 *    @property {str}         name         -  [Required] input's "name"
 *    @property {func}        onChange     -  [Required] function to call when box is toggled
 *    @property {str|number}  value        -  [Required] The value that checkbox holds
 *
 *
 *  @example:
 *    <Checkbox
 *      checked={bool|str}
 *      children={node}
 *      disabled={bool}
 *      displayBlock={bool}
 *      id={str}
 *      listbox={bool}
 *      name={str}
 *      onChange={func}
 *      value={str|number}
 *    >
 *      Label Text
 *    </Checkbox>
 */
const Checkbox = ({
  id,
  name,
  checked,
  disabled,
  displayBlock,
  listbox,
  value,
  onChange,
  children
}) => {
  // If an id is not set, create one to join the label and the input together.
  const uid = id || `${name}-${createUid(10)}`;

  // Determine which type of Icon to use
  const ComponentIcon = listbox ? IconChecklistbox : IconCheckbox;

  // Set the checkbox's classs
  const checkBoxClassNames = classNames({
    'usaf-checkbox': true,
    'usaf-checkbox--block': displayBlock,
    'usaf-checkbox--partial': checked && checked === 'partial',
    'usaf-checkbox--checklist': listbox
  });

  /*
   *  handleChange
   *
   *  This is intended as the input's onChange event handler. If the component
   *  has a `onChange` prop set, it will call that function passing it the
   *  computed value of the check box and the checked state.
   *
   *  @param {event object} e - an `input[type="checkbox"]` onChange event
   *  @calls `onChange` passing it the checkboxes value (null if not checked) & checked state
   */
  const handleChange = (e) => {
    // Is the checkbox checked?
    const isChecked = e.target.checked;
    // Value of checkbox (null if not checked)
    const val = isChecked ? e.target.value : null;

    // If an onChange function is set, call it and pass it the checkboxes value and checked state
    onChange(val, isChecked, e);
  };

  // Return/render the HTML
  return (
    <label className={checkBoxClassNames} htmlFor={uid}>
      <input
        type="checkbox"
        name={name}
        id={uid}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        defaultChecked={!!checked}
        onChange={handleChange}
        className="usaf-checkbox__input"
      />

      <ComponentIcon className="usaf-checkbox__icon" />

      {(children && <span className="usaf-checkbox__text">{children}</span>) || false}
    </label>
  );
};


// Checkbox button's default properties
Checkbox.defaultProps = {};


// Checkbox buttons property list and types
Checkbox.propTypes = {
  checked: PropTypes.oneOf([true, false, 'partial', 'checked']),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  displayBlock: PropTypes.bool,
  id: PropTypes.string,
  listbox: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};


// Export the Checkbox object (this is what is available to other files that `import` this one)
export default Checkbox;

