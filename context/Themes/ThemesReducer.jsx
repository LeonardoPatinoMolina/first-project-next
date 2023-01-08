export const ThemesReducer = (state, {type, payload}) => {

  switch (type) {

      case 'SET_THEME':
      return {
        ...state,
        theme: payload
      }
      case 'INIT_THEME':
      return {
        ...state,
        theme: payload
      }
    default:
      break;
  }
}
