// import { useState, useEffect } from 'react'
// import './AlternativeTimezone.css'

// const AlternativeTimezone = ({ countdown, timezone, onTimezoneChange }) => {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
//   const [isOpen, setIsOpen] = useState(false)
//   const [timezones, setTimezones] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     const allTimezones = Intl.supportedValuesOf('timeZone')
//     setTimezones(allTimezones.sort())
//   }, [])

//   function calculateTimeLeft() {
//     if (!countdown || !countdown.targetDate || !timezone) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 }
//     }

//     try {
//       const targetDate = new Date(countdown.targetDate)
//       const nowInTimezone = getCurrentTimeInTimezone(timezone)
//       const targetInTimezone = convertDateToTimezone(targetDate, timezone)
//       const difference = targetInTimezone - nowInTimezone
      
//       if (difference > 0) {
//         return {
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / (1000 * 60)) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         }
//       }
      
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 }
//     } catch (error) {
//       console.error('Error calculating alternative time:', error)
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 }
//     }
//   }

//   function getCurrentTimeInTimezone(tz) {
//     try {
//       const now = new Date()
//       const formatter = new Intl.DateTimeFormat('en-US', {
//         timeZone: tz,
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false
//       })
      
//       const parts = formatter.formatToParts(now)
//       const getPart = (type) => parts.find(p => p.type === type)?.value
      
//       return new Date(
//         `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}`
//       )
//     } catch (error) {
//       return new Date()
//     }
//   }

//   function convertDateToTimezone(date, tz) {
//     try {
//       const dateObj = new Date(date)
//       const formatter = new Intl.DateTimeFormat('en-US', {
//         timeZone: tz,
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false
//       })
      
//       const parts = formatter.formatToParts(dateObj)
//       const getPart = (type) => parts.find(p => p.type === type)?.value
      
//       return new Date(
//         `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}`
//       )
//     } catch (error) {
//       return date
//     }
//   }

//   function getUTCOffset(tz) {
//     try {
//       const now = new Date()
//       const formatter = new Intl.DateTimeFormat('en-US', {
//         timeZone: tz,
//         timeZoneName: 'shortOffset'
//       })
      
//       const parts = formatter.formatToParts(now)
//       const offset = parts.find(p => p.type === 'timeZoneName')?.value
//       return offset || 'GMT'
//     } catch {
//       return 'GMT'
//     }
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft())
//     }, 1000)

//     return () => clearInterval(timer)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [countdown, timezone])

//   const popularTimezones = [
//     'Europe/Moscow',
//     'Europe/Saratov',
//     'Europe/London',
//     'America/New_York',
//     'Asia/Tokyo',
//     'Australia/Sydney',
//     'Europe/Paris',
//     'Asia/Dubai',
//     'America/Los_Angeles'
//   ]

//   const filteredTimezones = timezones.filter(tz => 
//     tz.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tz.split('/').pop().toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const getFlag = (tz) => {
//     const tzLower = tz.toLowerCase()
//     if (tzLower.includes('moscow')) return '🇷🇺'
//     if (tzLower.includes('sarato')) return '🇷🇺'
//     if (tzLower.includes('london')) return '🇬🇧'
//     if (tzLower.includes('new_york') || tzLower.includes('los_angeles')) return '🇺🇸'
//     if (tzLower.includes('tokyo')) return '🇯🇵'
//     if (tzLower.includes('sydney')) return '🇦🇺'
//     if (tzLower.includes('paris')) return '🇫🇷'
//     if (tzLower.includes('dubai')) return '🇦🇪'
//     return '🌍'
//   }

//   const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && 
//                    timeLeft.minutes === 0 && timeLeft.seconds === 0
//     const containerStyle = {
//     backgroundImage: countdown.background ? `url(${countdown.background})` :'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
//   }

//   return (
//     <div className="alternative-timezone" style={containerStyle}>
//     <div className="alternative-overlay">
//       <div className="alternative-header">
//         <h3>
//           <span className="timezone-icon">🌍</span>
//           Альтернативный часовой пояс
//         </h3>
//         <button 
//           className="toggle-selector"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? 'Скрыть выбор' : 'Выбрать пояс'}
//         </button>
//       </div>
      
//       {isOpen && (
//         <div className="timezone-selector">
//           <div className="search-container">
//             <input 
//               type="text"
//               placeholder="🔍 Поиск часового пояса..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//             {searchQuery && (
//               <button 
//                 className="clear-search"
//                 onClick={() => setSearchQuery('')}
//               >
//                 ✕
//               </button>
//             )}
//           </div>
          
//           <div className="popular-timezones-section">
//             <h4>Популярные</h4>
//             <div className="popular-grid">
//               {popularTimezones.map(tz => (
//                 <button
//                   key={tz}
//                   className={`timezone-btn ${timezone === tz ? 'selected' : ''}`}
//                   onClick={() => {
//                     onTimezoneChange(tz)
//                     setIsOpen(false)
//                     setSearchQuery('')
//                   }}
//                 >
//                   <span className="btn-flag">{getFlag(tz)}</span>
//                   <span className="btn-name">{tz.split('/').pop().replace('_', ' ')}</span>
//                   <span className="btn-offset">{getUTCOffset(tz)}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {searchQuery && (
//             <div className="search-results">
//               <h4>Результаты поиска</h4>
//               <div className="results-list">
//                 {filteredTimezones.slice(0, 10).map(tz => (
//                   <button
//                     key={tz}
//                     className={`timezone-btn ${timezone === tz ? 'selected' : ''}`}
//                     onClick={() => {
//                       onTimezoneChange(tz)
//                       setIsOpen(false)
//                       setSearchQuery('')
//                     }}
//                   >
//                     <span className="btn-flag">{getFlag(tz)}</span>
//                     <span className="btn-name">{tz.split('/').pop().replace('_', ' ')}</span>
//                     <span className="btn-offset">{getUTCOffset(tz)}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className="alternative-countdown">
//         <div className="timezone-info">
//           <div className="timezone-display">
//             <span className="timezone-flag">{getFlag(timezone)}</span>
//             <div className="timezone-details">
//               <div className="timezone-name">
//                 {timezone.split('/').pop().replace('_', ' ')}
//               </div>
//               <div className="timezone-offset">
//                 {getUTCOffset(timezone)}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {isExpired ? (
//           <div className="expired-alternative">
//             <div className="expired-icon">✅</div>
//             <div className="expired-text">
//               <h4>Событие уже наступило</h4>
//               <p>В этом часовом поясе</p>
//             </div>
//           </div>
//         ) : (
//           <div className="countdown-display">
//             <div className="time-units">
//               <div className="countdown-item">
//                 <div className="unit-value">{String(timeLeft.days).padStart(2, '0')}</div>
//                 <div className="unit-label">Дней</div>
//               </div>
              
//               <div className="countdown-item">
//                 <div className="unit-value">{String(timeLeft.hours).padStart(2, '0')}</div>
//                 <div className="unit-label">Часов</div>
//               </div>
              
//               <div className="countdown-item">
//                 <div className="unit-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
//                 <div className="unit-label">Минут</div>
//               </div>
              
//               <div className="countdown-item">
//                 <div className="unit-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
//                 <div className="unit-label">Секунд</div>
//               </div>
//             </div>
            
//             <div className="alternative-note">
//               <span className="note-icon">🕐</span>
//               <span className="note-text">
//                 Разница с вашим часовым поясом: {calculateTimezoneDifference()}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//       </div>
//       </div>
//   )

//   function calculateTimezoneDifference() {
//     try {
//       const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
//       const userOffset = getTimezoneOffset(userTimezone)
//       const altOffset = getTimezoneOffset(timezone)
      
//       const diffHours = Math.abs(altOffset - userOffset)
      
//       if (diffHours === 0) return 'нет разницы'
      
//       const direction = altOffset > userOffset ? 'впереди' : 'позади'
//       return `${diffHours} час ${direction}`
//     } catch {
//       return 'неизвестно'
//     }
//   }

//   function getTimezoneOffset(tz) {
//     try {
//       const now = new Date()
//       const formatter = new Intl.DateTimeFormat('en-US', {
//         timeZone: tz,
//         timeZoneName: 'shortOffset'
//       })
      
//       const parts = formatter.formatToParts(now)
//       const offsetStr = parts.find(p => p.type === 'timeZoneName')?.value
      
//       if (!offsetStr || offsetStr === 'GMT') return 0
      
//       const match = offsetStr.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)
//       if (match) {
//         const sign = match[1] === '+' ? 1 : -1
//         const hours = parseInt(match[2])
//         const minutes = match[3] ? parseInt(match[3]) : 0
//         return sign * (hours + minutes / 60)
//       }
//       return 0
//     } catch {
//       return 0
//     }
//   }
// }

// export default AlternativeTimezone
// components/AlternativeTimezone.js - исправленная версия
import { useState, useEffect, useCallback } from 'react'
import './AlternativeTimezone.css'

const AlternativeTimezone = ({ countdown, timezone, onTimezoneChange }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [timezones, setTimezones] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const allTimezones = Intl.supportedValuesOf('timeZone')
    setTimezones(allTimezones.sort())
  }, [])

  // Используем useCallback чтобы функция не пересоздавалась на каждом рендере
  const calculateTimeLeft = useCallback(() => {
    if (!countdown || !countdown.targetDate || !timezone) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    try {
      // Целевая дата в UTC (JavaScript Date всегда хранит в UTC)
      const targetDate = new Date(countdown.targetDate)
      
      // Получаем ТЕКУЩЕЕ время в указанном часовом поясе
      const nowInTimezone = getCurrentTimeInTimezone(timezone)
      
      // Разница между целевой датой (в UTC) и текущим временем в указанном поясе
      const difference = targetDate - nowInTimezone
      
      console.log('DEBUG Alternative Timezone Calculation:')
      console.log('Target date (UTC):', targetDate.toISOString())
      console.log('Now in timezone:', nowInTimezone.toISOString())
      console.log('Timezone:', timezone)
      console.log('Difference (ms):', difference)
      
      if (difference > 0) {
        const result = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
        console.log('Time left:', result)
        return result
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    } catch (error) {
      console.error('Error calculating alternative time:', error)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  }, [countdown, timezone])

  // Функция для получения текущего времени в указанном часовом поясе
  function getCurrentTimeInTimezone(tz) {
    try {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      
      const parts = formatter.formatToParts(now)
      const getPart = (type) => parts.find(p => p.type === type)?.value
      
      // Создаем дату в указанном часовом поясе
      const dateInTimezone = new Date(
        `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}`
      )
      
      // Важно: возвращаем дату как есть, без конвертации в UTC
      return dateInTimezone
    } catch (error) {
      console.error('Error getting time in timezone:', error)
      return new Date()
    }
  }

  // Упрощенная функция для получения смещения часового пояса
  function getUTCOffset(tz) {
    try {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'shortOffset'
      })
      
      const parts = formatter.formatToParts(now)
      const offset = parts.find(p => p.type === 'timeZoneName')?.value
      return offset || 'GMT'
    } catch {
      return 'GMT'
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const popularTimezones = [
    'Europe/Moscow',
    'Europe/Saratov',
    'Europe/London',
    'America/New_York',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Europe/Paris',
    'Asia/Dubai',
    'America/Los_Angeles'
  ]

  const filteredTimezones = timezones.filter(tz => 
    tz.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.split('/').pop().toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFlag = (tz) => {
    const tzLower = tz.toLowerCase()
    if (tzLower.includes('moscow')) return '🇷🇺'
    if (tzLower.includes('sarato')) return '🇷🇺'
    if (tzLower.includes('london')) return '🇬🇧'
    if (tzLower.includes('new_york') || tzLower.includes('los_angeles')) return '🇺🇸'
    if (tzLower.includes('tokyo')) return '🇯🇵'
    if (tzLower.includes('sydney')) return '🇦🇺'
    if (tzLower.includes('paris')) return '🇫🇷'
    if (tzLower.includes('dubai')) return '🇦🇪'
    return '🌍'
  }

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && 
                   timeLeft.minutes === 0 && timeLeft.seconds === 0
    const containerStyle = {
    backgroundImage: countdown.background ? `url(${countdown.background})` :'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  }

  return (
    <div className="alternative-timezone" style={containerStyle}>
    <div className="alternative-overlay">
      <div className="alternative-header">
        <h3>
          <span className="timezone-icon">🌍</span>
          Альтернативный часовой пояс
        </h3>
        <button 
          className="toggle-selector"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Скрыть выбор' : 'Выбрать пояс'}
        </button>
      </div>
      
      {isOpen && (
        <div className="timezone-selector">
          <div className="search-container">
            <input 
              type="text"
              placeholder="🔍 Поиск часового пояса..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="popular-timezones-section">
            <h4>Популярные</h4>
            <div className="popular-grid">
              {popularTimezones.map(tz => (
                <button
                  key={tz}
                  className={`timezone-btn ${timezone === tz ? 'selected' : ''}`}
                  onClick={() => {
                    onTimezoneChange(tz)
                    setIsOpen(false)
                    setSearchQuery('')
                  }}
                >
                  <span className="btn-flag">{getFlag(tz)}</span>
                  <span className="btn-name">{tz.split('/').pop().replace('_', ' ')}</span>
                  <span className="btn-offset">{getUTCOffset(tz)}</span>
                </button>
              ))}
            </div>
          </div>
          
          {searchQuery && (
            <div className="search-results">
              <h4>Результаты поиска</h4>
              <div className="results-list">
                {filteredTimezones.slice(0, 10).map(tz => (
                  <button
                    key={tz}
                    className={`timezone-btn ${timezone === tz ? 'selected' : ''}`}
                    onClick={() => {
                      onTimezoneChange(tz)
                      setIsOpen(false)
                      setSearchQuery('')
                    }}
                  >
                    <span className="btn-flag">{getFlag(tz)}</span>
                    <span className="btn-name">{tz.split('/').pop().replace('_', ' ')}</span>
                    <span className="btn-offset">{getUTCOffset(tz)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="alternative-countdown">
        <div className="timezone-info">
          <div className="timezone-display">
            <span className="timezone-flag">{getFlag(timezone)}</span>
            <div className="timezone-details">
              <div className="timezone-name">
                {timezone.split('/').pop().replace('_', ' ')}
              </div>
              <div className="timezone-offset">
                {getUTCOffset(timezone)}
              </div>
            </div>
          </div>
        </div>
        
        {isExpired ? (
          <div className="expired-alternative">
            <div className="expired-icon">✅</div>
            <div className="expired-text">
              <h4>Событие уже наступило</h4>
              <p>В этом часовом поясе</p>
            </div>
          </div>
        ) : (
          <div className="countdown-display">
            <div className="time-units">
              <div className="countdown-item">
                <div className="unit-value">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="unit-label">Дней</div>
              </div>
              
              <div className="countdown-item">
                <div className="unit-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="unit-label">Часов</div>
              </div>
              
              <div className="countdown-item">
                <div className="unit-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="unit-label">Минут</div>
              </div>
              
              <div className="countdown-item">
                <div className="unit-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="unit-label">Секунд</div>
              </div>
            </div>
            
            <div className="alternative-note">
              <span className="note-icon">🕐</span>
              <span className="note-text">
                {getDifferenceText()}
              </span>
            </div>
          </div>
        )}
      </div>
      </div>
      </div>
  )

  function getDifferenceText() {
    try {
      // Считаем время в основном поясе пользователя
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const mainTimeLeft = calculateTimeForTimezone(userTimezone)
      const altTimeLeft = timeLeft
      
      // Разница в часах
      const mainTotalHours = mainTimeLeft.days * 24 + mainTimeLeft.hours
      const altTotalHours = altTimeLeft.days * 24 + altTimeLeft.hours
      
      const hourDiff = Math.abs(mainTotalHours - altTotalHours)
      
      if (hourDiff === 0) return 'Нет разницы с вашим поясом'
      
      const userOffset = getTimezoneOffsetInHours(userTimezone)
      const altOffset = getTimezoneOffsetInHours(timezone)
      
      if (altOffset > userOffset) {
        return `На ${hourDiff} час(а) меньше (пояс впереди)`
      } else {
        return `На ${hourDiff} час(а) больше (пояс позади)`
      }
    } catch {
      return 'Разница с вашим поясом: неизвестно'
    }
  }

  // Функция для расчета времени в любом часовом поясе
  function calculateTimeForTimezone(tz) {
    if (!countdown || !countdown.targetDate || !tz) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    try {
      const targetDate = new Date(countdown.targetDate)
      const nowInTimezone = getCurrentTimeInTimezone(tz)
      const difference = targetDate - nowInTimezone
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    } catch (error) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  }

  // Упрощенная функция для получения смещения в часах
  function getTimezoneOffsetInHours(tz) {
    try {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'shortOffset'
      })
      
      const parts = formatter.formatToParts(now)
      const offsetStr = parts.find(p => p.type === 'timeZoneName')?.value
      
      if (!offsetStr || offsetStr === 'GMT') return 0
      
      const match = offsetStr.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)
      if (match) {
        const sign = match[1] === '+' ? 1 : -1
        const hours = parseInt(match[2])
        const minutes = match[3] ? parseInt(match[3]) : 0
        return sign * (hours + minutes / 60)
      }
      return 0
    } catch {
      return 0
    }
  }
}

export default AlternativeTimezone