import { useState, useEffect } from 'react'
import './Countdown.css'

const Countdown = ({ countdown }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(countdown.targetDate) - new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown.targetDate])

  const containerStyle = {
    backgroundImage: countdown.background ? `url(${countdown.background})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }

  const isExpired = new Date(countdown.targetDate) <= new Date()

  return (
    <div className="countdown-container" style={containerStyle}>
      <div className="countdown-overlay">
        <div className="countdown-content">
          <h2 className="countdown-title">{countdown.title}</h2>
          
          {isExpired ? (
            <div className="expired-message">
              <div className="fireworks">🎉</div>
              <h3>Событие наступило!</h3>
              <p>Поздравляем с этим прекрасным моментом! 🎊</p>
            </div>
          ) : (
            <>
              <div className="countdown-grid">
                <div className="countdown-item">
                  <div className="countdown-number animate-fade-in">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Дней</div>
                </div>
                
                <div className="countdown-item">
                  <div className="countdown-number animate-fade-in">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Часов</div>
                </div>
                
                <div className="countdown-item">
                  <div className="countdown-number animate-fade-in">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Минут</div>
                </div>
                
                <div className="countdown-item">
                  <div className="countdown-number animate-fade-in">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Секунд</div>
                </div>
              </div>

              <div className="target-date">
                <p>До: {new Date(countdown.targetDate).toLocaleString('ru-RU')}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Countdown