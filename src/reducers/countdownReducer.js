export const initialState = {
  countdowns: [],
  activeCountdown: null
}

export const countdownReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_COUNTDOWNS':
      let loadedCountdowns = action.payload.countdowns || []
      
      if (!Array.isArray(loadedCountdowns)) {
        console.warn('Countdowns data is not an array, converting:', loadedCountdowns)
        
        if (loadedCountdowns && typeof loadedCountdowns === 'object') {
          loadedCountdowns = Object.values(loadedCountdowns)
        } else {
          loadedCountdowns = []
        }
      }

      const validatedCountdowns = loadedCountdowns.filter(item => 
        item && 
        typeof item === 'object' && 
        item.id && 
        item.title && 
        item.targetDate &&
        (item.isGlobalEvent === undefined || typeof item.isGlobalEvent === 'boolean'))
        .map(item => ({
          ...item,
          isGlobalEvent: item.isGlobalEvent || false
        })
      )
      
      return {
        countdowns: validatedCountdowns,
        activeCountdown: action.payload.activeCountdown || (validatedCountdowns[0]?.id || null)
      }

    case 'ADD_COUNTDOWN':
      const currentCountdowns = Array.isArray(state.countdowns) ? state.countdowns : []
      const newCountdowns = [...currentCountdowns, action.payload]
      
      return {
        ...state,
        countdowns: newCountdowns,
        activeCountdown: state.activeCountdown || action.payload.id
      }

    case 'UPDATE_COUNTDOWN':
      const existingCountdowns = Array.isArray(state.countdowns) ? state.countdowns : []
      
      return {
        ...state,
        countdowns: existingCountdowns.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      }

    case 'DELETE_COUNTDOWN':
      const allCountdowns = Array.isArray(state.countdowns) ? state.countdowns : []
      const filteredCountdowns = allCountdowns.filter(c => c.id !== action.payload)

      let newActiveCountdown = state.activeCountdown
      if (state.activeCountdown === action.payload) {
        newActiveCountdown = filteredCountdowns[0]?.id || null
      }
      
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