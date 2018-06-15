/**
 *  createScopedAction
 *
 *  A helper to append an instanceId parameter to an action
 */
function createScopedAction(action, instanceId) {
  return (...args) => action(...args, instanceId);
}

export default createScopedAction;
