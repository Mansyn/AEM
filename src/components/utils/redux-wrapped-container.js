import React from 'react';
import PropTypes from 'prop-types';

function createContextWrappedContainer(Container) {
  const ContextWrapper = (props, context) => (
    <Container
      {...props}
      instanceId={context.instanceId}
    />
  );

  ContextWrapper.contextTypes = {
    instanceId: PropTypes.string
  };

  return ContextWrapper;
}

export default createContextWrappedContainer;
