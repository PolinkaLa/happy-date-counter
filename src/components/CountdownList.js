import './CountdownList.css'

const CountdownList = ({ countdowns, activeCountdown, onEdit, onDelete, onSetActive }) => {
  if (countdowns.length === 0) {
    return (
      <div className="countdown-list">
        <h3>Мои отсчеты</h3>
        <div className="empty-list">
          <p>Пока нет созданных отсчетов</p>
          <span>📅</span>
        </div>
      </div>
    )
  }

  return (
    <div className="countdown-list">
      <h3>Мои отсчеты ({countdowns.length})</h3>
      <div className="countdown-items">
        {countdowns.map(countdown => (
          <div
            key={countdown.id}
            className={`countdown-item ${activeCountdown === countdown.id ? 'active' : ''}`}
            onClick={() => onSetActive(countdown.id)}
          >
            <div className="countdown-item-info">
              <h4>{countdown.title}</h4>
              <p>{new Date(countdown.targetDate).toLocaleDateString('ru-RU')}</p>
            </div>
            
            <div className="countdown-item-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(countdown.id)
                }}
                className="btn-edit"
                title="Редактировать"
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(countdown.id)
                }}
                className="btn-delete"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountdownList