import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  CLEAR_CURRENT,
  SET_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from '../actions/types';

const initialState = {
  logs: null,
  curent: null,
  loading: false,
  error: null,
};

//eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs:
          action.payload !== ''
            ? state.logs.filter((log) => {
                const regex = new RegExp(`${action.payload}`, 'gi');
                return log.message.match(regex) || log.tech.match(regex);
              })
            : state.logs,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log._id !== action.payload),
        loading: false,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log._id === action.payload._id ? action.payload : log
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGS_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
