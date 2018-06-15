import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItem from '../List/ListItem';

import './collapsible-list.scss';

/**
 * A CollapsibleListItem component.
 *
 * @example
 * <CollapsibleListItem>Label for the ListItem</CollapsibleListItem>
 *
 * @type {function} CollapsibleListItem component as pure function
 * @param {Object} props
 * @property {Node} props.children content of the list item
 * @property {Boolean} props.selected is this item selected
 * @property {Function} props.onClick function to call when item is clicked
 * @return {ReactElement} markup
 */
// need selected indicator.
const CollapsibleListItem = ({ children, selected, onClick }) => (
  <ListItem>
    <button
      onClick={onClick}
      className={classNames({
        'usaf-collapsible-list-item': true,
        'usaf-collapsible-list-item--selected': selected
      })}
    >
      {children}
    </button>
  </ListItem>
);

/**
 * property types
 */
CollapsibleListItem.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

CollapsibleListItem.defaultProps = {
  onClick: () => {}
};

export default CollapsibleListItem;
