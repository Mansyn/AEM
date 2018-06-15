import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IconMinus, IconPlus } from '../Icon';
import List from '../List/List';

import './collapsible-list.scss';

/*
 *  CollapsibleList
 *
 *  This component displays a list of elements within a collapsible container
 *
 *  @param {object} props
 *
 *    @param {String}    props.headerLabel   - Text to display above the list
 *    @param {String}    props.maxListHeight - Measurement at which the list should show a scrollbar
 *    @param {Function}  props.expandIcon    - Icon to display when the list is collapsed
 *    @param {Function}  props.collapseIcon  - Icon to display when the list is expanded
 *    @param {Boolean}   props.open          - Start the component in an expanded state (true)
 *    @param {Boolean}   props.keepOpen      - Force the list to not be collapsible
 *    @param {Node}      props.children      - The items to render within the list items
 *
 */

class CollapsibleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: this.props.open };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    if (!this.props.keepOpen) {
      this.setState({ open: !this.state.open });
    }
  }

  render() {
    const {
      children,
      collapseIcon,
      expandIcon,
      headerLabel,
      maxListHeight
    } = this.props;

    const { open } = this.state;

    const ExpandCollapseIcon = open ? collapseIcon : expandIcon;

    return (
      <div className="usaf-collapsible-list">
        <button
          className="usaf-collapsible-list__header"
          onClick={this.toggleOpen}
        >
          <span className="usaf-collapsible-list__header-icon">
            <ExpandCollapseIcon />
          </span>
          <span className="usaf-collapsible-list__header-label">{headerLabel}</span>
        </button>
        <div
          style={{ height: maxListHeight }}
          className={classNames({
            'usaf-collapsible-list__list-container': true,
            'usaf-collapsible-list__list-container--open': this.state.open,
            'usaf-collapsible-list__list-container--closed': !this.state.open
          })}
        >
          <List className="usaf-collapsible-list__list">
            {children}
          </List>
        </div>
      </div>
    );
  }
}

CollapsibleList.propTypes = {
  headerLabel: PropTypes.string,
  maxListHeight: PropTypes.string,
  expandIcon: PropTypes.func,
  collapseIcon: PropTypes.func,
  open: PropTypes.bool,
  keepOpen: PropTypes.bool,
  children: PropTypes.node
};

CollapsibleList.defaultProps = {
  expandIcon: IconPlus,
  collapseIcon: IconMinus,
  open: true,
  keepOpen: false
};

export default CollapsibleList;
