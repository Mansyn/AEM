import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

/**
 * A basic List component that uses the ListItem component.
 *
 * @type {function} ListItem component as pure function
 * @param {Object} props
 * @property {Boolean} props.orderedList - use <ol> instead of <ul> as list tag
 * @property {ListItem} props.children - children of the List should be ListItem components
 * @return {ReactElement} markup
 */
const List = ({ orderedList, children }) => {
  const El = orderedList ? 'ol' : 'ul';
  return (
    <El className="usaf-list">{children}</El>
  );
};

/**
 * default properties
 * @type {object}
 * @property {boolean} default to an unordered list
 */
List.defaultProps = {
  orderedList: false
};

/**
 * property types
 * @type {object}
 * @property {ListItem} child elements which should be ListItem
 */
List.propTypes = {
  orderedList: PropTypes.bool,
  children: PropTypes.node
};

export default List;
