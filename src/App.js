import { useState, useEffect, useReducer } from 'react'
import Countdown from './components/Countdown'
import CountdownForm from './components/CountdownForm'
import CountdownList from './components/CountdownList'
import SidebarToggle from './components/SidebarToggle'
import { countdownReducer, initialState } from './reducers/countdownReducer'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(countdownReducer, initialState)
  const [editingCountdown, setEditingCountdown] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const savedCountdowns = localStorage.getItem('countdowns')
    if (savedCountdowns) {
      dispatch({
        type: 'LOAD_COUNTDOWNS',
        payload: JSON.parse(savedCountdowns)
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('countdowns', JSON.stringify(state.countdowns))
  }, [state.countdowns])

  const handleCreateCountdown = (countdownData) => {
    if (editingCountdown) {
      dispatch({
        type: 'UPDATE_COUNTDOWN',
        payload: { id: editingCountdown, ...countdownData }
      })
      setEditingCountdown(null)
    } else {
      dispatch({
        type: 'ADD_COUNTDOWN',
        payload: {
          id: Date.now().toString(),
          ...countdownData,
          createdAt: new Date().toISOString()
        }
      })
    }
  }

  const handleEditCountdown = (id) => {
    const countdown = state.countdowns.find(c => c.id === id)
    if (countdown) {
      setEditingCountdown(id)
    }
  }

  const handleDeleteCountdown = (id) => {
    dispatch({
      type: 'DELETE_COUNTDOWN',
      payload: id
    })
  }

  const handleSetActiveCountdown = (id) => {
    dispatch({
      type: 'SET_ACTIVE_COUNTDOWN',
      payload: id
    })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <SidebarToggle 
            isOpen={isSidebarOpen} 
            onToggle={toggleSidebar} 
          />
          <div className="header-title">
            <h1>✨ Таймер Обратного Отсчета ✨</h1>
            <p>Создавайте красивые отсчеты до важных событий</p>
          </div>
        </div>
      </header>

      <div className="app-container">
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="sidebar-content">
            <CountdownForm 
              onSubmit={handleCreateCountdown}
              editingCountdown={editingCountdown ? state.countdowns.find(c => c.id === editingCountdown) : null}
              onCancel={() => setEditingCountdown(null)}
            />
            
            <CountdownList
              countdowns={state.countdowns}
              activeCountdown={state.activeCountdown}
              onEdit={handleEditCountdown}
              onDelete={handleDeleteCountdown}
              onSetActive={handleSetActiveCountdown}
            />
          </div>
        </div>

        <div className={`main-content ${isSidebarOpen ? '' : 'main-content-expanded'}`}>
          {state.activeCountdown ? (
            <Countdown 
              countdown={state.countdowns.find(c => c.id === state.activeCountdown)}
            />
          ) : (
            <div className="welcome-message">
              <h2>Добро пожаловать! 🎉</h2>
              <p>Создайте свой первый обратный отсчет, используя форму в боковом меню.</p>
              {!isSidebarOpen && (
                <button 
                  className="btn-show-sidebar"
                  onClick={toggleSidebar}
                >
                  📋 Показать меню
                </button>
              )}
              <div className="features">
                <div className="feature">
                  <span>🎯</span>
                  <p>Указывайте любые даты</p>
                </div>
                <div className="feature">
                  <span>🖼️</span>
                  <p>Загружайте свои фоны</p>
                </div>
                <div className="feature">
                  <span>💾</span>
                  <p>Данные сохраняются автоматически</p>
                </div>
                <div className="feature">
                  <span>⚡</span>
                  <p>Красивые анимации</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App