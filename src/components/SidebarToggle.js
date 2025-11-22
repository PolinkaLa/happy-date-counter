
import './SidebarToggle.css'

const SidebarToggle = ({ isOpen, onToggle }) => {
  return (
    <button 
      className={`sidebar-toggle ${isOpen ? 'open' : 'closed'}`}
      onClick={onToggle}
      aria-label={isOpen ? 'Скрыть меню' : 'Показать меню'}
    >
      <div className="toggle-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  )
}

export default SidebarToggle