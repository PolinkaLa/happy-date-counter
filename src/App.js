// App.js - возвращаемся к первой версии с добавлением альтернативного пояса
import React, { useState, useEffect, useReducer } from 'react'
import Countdown from './components/Countdown'
import CountdownForm from './components/CountdownForm'
import CountdownList from './components/CountdownList'
import SidebarToggle from './components/SidebarToggle'
import AlternativeTimezone from './components/AlternativeTimezone'
import { countdownReducer, initialState } from './reducers/countdownReducer'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(countdownReducer, initialState)
  const [editingCountdown, setEditingCountdown] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [alternativeTimezone, setAlternativeTimezone] = useState('Europe/London')

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedCountdowns = localStorage.getItem('countdowns')
    const savedActiveCountdown = localStorage.getItem('activeCountdown')
    const savedAlternativeTZ = localStorage.getItem('alternativeTimezone')
    
    let parsedCountdowns = []
    try {
      if (savedCountdowns) {
        parsedCountdowns = JSON.parse(savedCountdowns)
        if (!Array.isArray(parsedCountdowns)) {
          console.warn('Invalid countdowns data, resetting')
          parsedCountdowns = []
          localStorage.removeItem('countdowns')
        }
      }
    } catch (error) {
      console.error('Error parsing countdowns:', error)
      parsedCountdowns = []
    }
    
    dispatch({
      type: 'LOAD_COUNTDOWNS',
      payload: {
        countdowns: parsedCountdowns,
        activeCountdown: savedActiveCountdown || (parsedCountdowns[0]?.id || null)
      }
    })
    
    if (savedAlternativeTZ) {
      setAlternativeTimezone(savedAlternativeTZ)
    }
    
    setIsLoading(false)
  }, [])

  // Сохранение в localStorage при изменении
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('countdowns', JSON.stringify(state.countdowns))
      if (state.activeCountdown) {
        localStorage.setItem('activeCountdown', state.activeCountdown)
      }
      localStorage.setItem('alternativeTimezone', alternativeTimezone)
    }
  }, [state.countdowns, state.activeCountdown, alternativeTimezone, isLoading])

  const handleCreateCountdown = (countdownData) => {
    if (editingCountdown) {
      dispatch({
        type: 'UPDATE_COUNTDOWN',
        payload: { id: editingCountdown, ...countdownData }
      })
      setEditingCountdown(null)
    } else {
      const newCountdown = {
        id: Date.now().toString(),
        ...countdownData,
        createdAt: new Date().toISOString()
      }
      
      dispatch({
        type: 'ADD_COUNTDOWN',
        payload: newCountdown
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

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Загрузка ваших отсчетов...</p>
      </div>
    )
  }

  const activeCountdown = state.countdowns.find(c => c.id === state.activeCountdown)

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
          {activeCountdown ? (
            <>
              <Countdown 
                countdown={activeCountdown}
              />
              
              <AlternativeTimezone 
                countdown={activeCountdown}
                timezone={alternativeTimezone}
                onTimezoneChange={setAlternativeTimezone}
              />
            </>
          ) : state.countdowns.length > 0 ? (
            <div className="welcome-message">
              <h2>Выберите отсчет 🎯</h2>
              <p>У вас есть {state.countdowns.length} отсчетов. Выберите один для отображения.</p>
              <button 
                className="btn-show-sidebar"
                onClick={toggleSidebar}
              >
                📋 Показать список отсчетов
              </button>
            </div>
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
                  <span>🌍</span>
                  <p>Сравнение часовых поясов</p>
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