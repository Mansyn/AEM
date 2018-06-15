import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

/**
 * A basic ListItem component.
 *
 * @example
 * <ListItem>Label for the ListItem</ListItem>
 *
 * @type {function} ListItem component as pure function
 * @param {Object} props
 * @property {Node} props.children content of the list item
 * @return {ReactElement} markup
 */
const ListItem = ({ children }) => <li className="usaf-list-item">{children}</li>;

/**
 * property types
 * @type {object}
 * @property {ReactElement} child elements of the ListItem (label, etc.)
 */
ListItem.propTypes = {
  children: PropTypes.node.isRequired
};

export default ListItem;
