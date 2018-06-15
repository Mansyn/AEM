/**
 *  createScopedReducer
 *
 *  A helper to manage scoped actions.  This utility acts as a gatekeeper.
 *  The reducer will only be invoked if the scope matches or when the reducer
 *  is initialized with an undefined state.  The second case allows the
 *  initialState to be applied.
 *
 */
function createScopedReducer(reducer, instanceId) {
  return (state, action) => {
    if (state === undefined || action.scope === instanceId) {
      return reducer(state, action);
    }
    return state;
  };
}

export default createScopedReducer;
