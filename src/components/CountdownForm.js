import { useState, useEffect } from 'react'
import './CountdownForm.css'

const CountdownForm = ({ onSubmit, editingCountdown, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    targetDate: '',
    background: ''
  })

  useEffect(() => {
    if (editingCountdown) {
      setFormData({
        title: editingCountdown.title,
        targetDate: editingCountdown.targetDate,
        background: editingCountdown.background
      })
    }
  }, [editingCountdown])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          background: event.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.targetDate) {
      onSubmit(formData)
      setFormData({
        title: '',
        targetDate: '',
        background: ''
      })
    }
  }

  const handleReset = () => {
    setFormData({
      title: '',
      targetDate: '',
      background: ''
    })
    if (onCancel) onCancel()
  }

  return (
    <div className="countdown-form">
      <h3>{editingCountdown ? 'Редактировать отсчет' : 'Создать новый отсчет'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название события:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: Мой день рождения"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetDate">Дата события:</label>
          <input
            type="datetime-local"
            id="targetDate"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="background">Фоновое изображение:</label>
          <input
            type="file"
            id="background"
            accept="image/*"
            onChange={handleFileUpload}
          />
          {formData.background && (
            <div className="image-preview">
              <img src={formData.background} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingCountdown ? 'Обновить' : 'Создать'}
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary">
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default CountdownForm