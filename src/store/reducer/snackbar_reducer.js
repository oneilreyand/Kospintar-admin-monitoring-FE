const initialState = {
  items: [],
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SNACKBAR_SHOW':
      return {
        ...state,
        items: [...state.items, action.payload].slice(-4),
      };
    case 'SNACKBAR_DISMISS':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default snackbarReducer;
