export const initialState = {
  countdowns: [],
  activeCountdown: null
}

export const countdownReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_COUNTDOWNS':
      return {
        ...state,
        countdowns: action.payload,
        activeCountdown: action.payload[0]?.id || null
      }

    case 'ADD_COUNTDOWN':
      const newCountdowns = [...state.countdowns, action.payload]
      return {
        ...state,
        countdowns: newCountdowns,
        activeCountdown: state.activeCountdown || action.payload.id
      }

    case 'UPDATE_COUNTDOWN':
      return {
        ...state,
        countdowns: state.countdowns.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      }

    case 'DELETE_COUNTDOWN':
      const filteredCountdowns = state.countdowns.filter(c => c.id !== action.payload)
      const newActiveCountdown = state.activeCountdown === action.payload 
        ? (filteredCountdowns[0]?.id || null)
        : state.activeCountdown
      
      return {
        ...state,
        countdowns: filteredCountdowns,
        activeCountdown: newActiveCountdown
      }

    case 'SET_ACTIVE_COUNTDOWN':
      return {
        ...state,
        activeCountdown: action.payload
      }

    default:
      return state
  }
}