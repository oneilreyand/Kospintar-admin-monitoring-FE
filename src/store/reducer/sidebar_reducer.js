const initialState = {
  isOpen: false,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIDEBAR_TOGGLE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'SIDEBAR_CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
