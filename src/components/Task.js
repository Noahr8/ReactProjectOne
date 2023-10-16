import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id, task)}>
        <h3>
            {task.text} <FaTimes style={{color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)}/>
        </h3>
        <div className="text-center">
        {task.date.toDateString()}
        </div>
    </div>
  )
}

export default Task