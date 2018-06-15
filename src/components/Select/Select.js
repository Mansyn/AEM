import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './select.scss';


/**
 *  Select
 *
 *  This is a base level component that renders a custom styled `<select>`
 *
 *  @param {object} props
 *    @property {bool} disabled   -  Disable the element's functionality
 *    @property {bool} isBlock    -  Theme option to make the element display full width
 *    @property {str} name        -  The name identifier for the HTML element (should be unique)
 *    @property {func} onChange   -  A function to call when the data changes (like capture state)
 *    @property {array} options   -  Array of options objects, the JSON should look like this:
 *                                   [
 *                                     {
 *                                      label: 'Option Group Label',
 *                                      options: [
 *                                        {
 *                                          label: 'Option 1',
 *                                          labelShort: 'Opt 1',
 *                                          value: 'option1'
 *                                        },
 *                                        ...
 *                                      ]
 *                                    },
 *                                    {
 *                                      label: 'Option 2',
 *                                      labelShort: 'Opt 2',
 *                                      value: 'option2'
 *                                    },
 *                                    {
 *                                      label: 'Option 3',
 *                                      value: 'option3'
 *                                    },
 *                                    ...
 *                                  ]
 *    @property {str} placeholder -  Text to display if value is not set
 *    @property {str} value       -  Indicates the select element's value (its case sensitive)
 *
 *  @example
 *    <Select
 *      disabled={bool} PropTypes.bool
 *      isBlock={bool}
 *      name={str}
 *      onChange={func}
 *      options={array}
 *      placeholder={str}
 *      value={str}
 *    />
 *
 */
class Select extends Component {
  constructor(props) {
    super(props);

    // This is the fallback option object to be used if `props.value` is not set...
    this.fallbackOption = {
      label: props.placeholder || '',
      labelShort: props.placeholder || '',
      value: ''
    };

    // Initiate the select element's state
    this.state = {
      isOpen: false,
      // Set the selected option (the "selection") based off of the set `value` and the `options`
      // set the selection based off of the set value and the options...
      selection: props.value
        // search `props.options` for object with `props.value === props.value`
        ? (this.getOptionData(props.options, props.value) || this.fallbackOption)
        // if one does not exist scrape the data off of the other properties
        : this.fallbackOption
    };

    // Alter `this` pointer to reference the react class
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onChange = this._onChange.bind(this);
  }


  /*
   *  onSelectOption
   *
   *  This function is used to
   *
   *  @param {obj} selectedOption - this should be an option object to replace the one in state.
   *
   */
  onSelectOption(selectedOption) {
    // update the state with the newly selected option
    this.setState({
      selection: selectedOption
    });
  }


  /*
   *  getOptionData
   *
   *  This function will search the passed options array (`data`) for a key that has a `value`
   *  equal to the passed `val`. If it finds a nested `options` array it will recurse over that
   *
   *  @param {array}  data - an array of option objects
   *  @param {str}    val  - the option.value to search for
   *
   *  @return {obj} this function returns the full option object or a default object
   *
   */
  getOptionData(data, val) {
    let returnData = null;

    data.forEach((option) => {
      // if its an `optiongroup` and the return value is not already set, recurse over the children
      if (!returnData && option.options) {
        returnData = this.getOptionData(option.options, val);
      }
      // otherwise if the option's value is equal to the set value, update data
      else if (option.value === val) returnData = option;
    });
    // return the data
    return returnData;
  }


  /*
   *  _onChange
   *
   *  This function is meant to be fired when ever the select element's value
   *  changes. The expectation is that this method is passed to an event handler
   *  as such it expects to be passed an event object.
   *
   *  @param {obj} e - and event object
   *
   */
  _onChange(e) {
    // get the value prop
    const val = e.target.value;
    // map the value prop to an option object
    const selection = this.getOptionData(this.props.options, val);

    // Fire off the passed change event (allows extensibility)
    if (this.props.onChange) this.props.onChange(e);

    // Update the state by calling `onSelectOption`
    this.onSelectOption(selection);

    // Blur the focus - this will close the dropdown
    e.target.blur();
  }


  /*
   *  _onBlur
   *
   *  This function is intended to be applied to the component as a whole to
   *  close the dropdown when "clicking off"
   *
   */
  _onBlur() {
    // Update the sate flagging the dropdown as closed
    this.setState({
      isOpen: false
    });
  }


  /*
   *  _onFocus
   *
   *  This function is intended to be applied to the component as a whole to
   *  _open_ the dropdown when the user interacts with the component.
   *
   */
  _onFocus() {
    // if the select is disabled get out!
    if (this.props.disabled) return;

    // update the sate flagging the dropdown as open
    this.setState({
      isOpen: true
    });
  }


  /*
   *  renderSelect
   *
   *  This function will loop over `this.props.options` and build the
   *  `<optgroup>` and `<option>` tags for the `select` that the data represents.
   *
   *  @return {JSX} This function returns the JSX needed to create the `<select>`
   *
   */
  renderSelect() {
    // Iterate over the options array to build the
    return this.props.options.map(
      data => (
        // Option Group: Nested `options` indicates that this is a `<optgroup>`
        (data.options)
          // Iterate over nested `options`
          ? (
            <optgroup
              label={data.label}
              key={`${data.label.toLowerCase().replace(' ', '-')}`}
            >
              {
                // Print out each of the  `<option>` elements
                data.options.map(
                  opt => (
                    <option
                      value={opt.value}
                      key={opt.value.toLowerCase().replace(' ', '-')}
                    >
                      {opt.label || opt.value}
                    </option>
                  )
                )
              }
            </optgroup>
          )
          : (
            <option
              value={data.value}
              key={data.value}
            >
              {data.label || data.value}
            </option>
          )
      )// closes `this.props.options.map`callback
    );
  }


  /*
   *  renderFauxSelect
   *
   *  This function will loop over `this.props.options` and build the select's
   *  visual (faux) UI.
   *
   *  @return {JSX} This function returns the JSX needed to create the create a dropdown
   *                that represents a select element.
   */
  renderFauxSelect() {
    // Iterate over the options array to build the
    return this.props.options.map(
      data => (
        <li
          className={classNames(
            'select__option',
            {
              'select__option--selected': this.state.selection.value === data.value && !data.options
            }
          )}
          // if `data` has a value that means it does not have any "children", so use the `label`
          key={data.value || data.label}
        >{
          // Option Group: Nested `options` indicates that this is a `<optgroup>`
          (data.options)
            // Iterate over nested `options`
            ? (
              <ul
                label={data.label}
                key={`${data.label.toLowerCase().replace(/ +/g, '-')}`}
                className="select__optgroup"
              >
                <li className="select__optgroup-label">{data.label}</li>
                {
                  // Print out each of the  `<option>` elements
                  data.options.map(
                    opt => (
                      <li
                        className={classNames(
                          'select__option',
                          {
                            'select__option--selected': this.state.selection.value === opt.value
                          }
                        )}
                        key={opt.value.toLowerCase().replace(/ +/g, '-')}
                      >
                        <button onClick={this._onChange} value={opt.value}>
                          {opt.label || opt.value}
                        </button>
                      </li>
                    )
                  )
                }
              </ul>
            )
            : (
              <button onClick={this._onChange} value={data.value}>
                {data.label || data.value}
              </button>
            )
        }</li>
      )// closes `this.props.options.map`callback
    );
  }


  // Return/render the HTML for the Select
  render() {
    return (
      <div
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        className={classNames({
          'usaf-select': true,
          'usaf-select--open': this.state.isOpen,
          'usaf-select--block': this.props.isBlock,
          'usaf-select--disabled': this.props.disabled
        })}
        tabIndex="-1"
      >
        <select
          onChange={this._onChange}
          name={this.props.name}
          id={`usaf-select-${this.props.name}`}
          className="usaf-select__element"
          disabled={this.props.disabled}
          value={this.state.selection.value || false}
        >
          {this.renderSelect()}
        </select>


        <button className={`select__text${!this.state.selection.value && this.props.placeholder ? ' select__text--placeholder' : ''}`}>
          {
            // the "labelShort" is used to render an abbreviated text display when set
            this.state.selection.labelShort || this.state.selection.label
          }
        </button>


        <ul className="select__options">
          {this.renderFauxSelect()}
        </ul>
      </div>
    );
  }
}


// Select element's property list and types
Select.propTypes = {
  disabled: PropTypes.bool,
  isBlock: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};


export default Select;
