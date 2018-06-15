import React from 'react';
import PropTypes from 'prop-types';

import createUid from '../utils/create-uid';
import { IconHamburgerMenu, IconMenuClose } from '../Icon';

import logo from './../resources/img/USAF_Logo.png';

import './app-header.scss';

/**
 * AppHeader - A USAF Application Header
 *
 * This component contains the common USAF header
 * as well as a side panel that is controlled by a toggle
 *
 * @TODO: Need data quality icon from UX
 * @TODO: Add enterprise capabilities when approach is finalized
 *
 * @extends {React.Component}
 * @property {object} children Child elements of the AppHeader to be displayed
 * @property {boolean} panelOpen Determines if the side panel is open by default
 * @property {string} applicationTitle Application Title
 *
 *  @example:
 *    <AppHeader
 *      applicationTitle={str}
 *    >
 *      <div><a href="...">Metrics</a></div>
 *      <div><a href="...">Wuc</a></div>
 *    </AppHeader>
 */

const AppHeader = ({ children, applicationTitle, panelOpen }) => {
  const headerMenuButtonId = createUid(10);

  // Creates a unique id for each child.
  const keyedChildren = children.map(
    (item) => {
      const keyedItem = {
        id: createUid(10),
        view: item
      };

      return keyedItem;
    }
  );

  return (
    <div className="usaf-app-header">
      <img className="usaf-app-header__logo" src={logo} alt="USAF logo" />
      <div className="usaf-app-header__title">{applicationTitle}</div>

      <div className="usaf-app-header__menu">
        <input
          className="usaf-app-header__menu-toggle"
          defaultChecked={panelOpen}
          id={headerMenuButtonId}
          type="checkbox"
        />
        <label
          htmlFor={headerMenuButtonId}
          className="usaf-app-header__menu-toggle-label"
        >
          <IconMenuClose className="usaf-app-header__icon-menu-close" />
          <IconHamburgerMenu className="usaf-app-header__icon-hamburger-menu" />
        </label>

        <div className="usaf-app-header__panel">
          <ul className="usaf-app-header__panel-list">
            {
              keyedChildren.map(
                item => (
                  <li key={item.id}>{item.view}</li>
                )
              )
            }
          </ul>
        </div>
      </div>

      <ul className="usaf-app-header__navigation">
        {
          keyedChildren.map(
            item => (
              <li key={item.id} className="usaf-app-header__navigation-item">{item.view}</li>
            )
          )
        }
      </ul>
    </div>
  );
};

// AppHeader properties and types
// @TODO: Add enterprise capabilities when approach is finalized
AppHeader.propTypes = {
  children: PropTypes.node,
  panelOpen: PropTypes.bool,
  applicationTitle: PropTypes.string
};

/**
 *  App Header Link Class Names
 *
 *  Exposing these as properties of the AppHeader so that the styles can be applied as
 *  needed during implementation.  This is a workaroud to use React Router components
 *  without including the package in the component.
 *
 *  If additional functionality is needed around the links this may be refactored
 *  to include the NavLink from React Router or utilize an HOC wrapper.
 */
AppHeader.activeLinkClassName = 'usaf-app-header__navigation-link--selected';
AppHeader.linkClassName = 'usaf-app-header__navigation-link';

export default AppHeader;
