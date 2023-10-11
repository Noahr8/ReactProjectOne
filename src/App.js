import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
//import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar';
import { useState } from 'react';
import AllTasks from './components/AllTasks';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [date, setDate] = useState(new Date())
  const [tasks, setTasks] = useState([])

  const tasksOnSelectedDate = tasks.filter(
    (task) =>
      task.date.getFullYear() === date.getFullYear() &&
      task.date.getMonth() === date.getMonth() &&
      task.date.getDate() === date.getDate()
  );

//Add Task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task => task.id == id ? { ...task, reminder: !task.reminder } : task)))
}

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <div className="calender-container">
        <Calendar onChange={setDate} value={date}/>
      </div>
      {showAddTask && <AddTask onAdd={addTask} />}
      <div className="selected-date">
        Selected date: {date.toDateString()}
      </div>
      {tasksOnSelectedDate.length > 0 ? (<Tasks tasks={tasksOnSelectedDate} onDelete={deleteTask} onToggle={toggleReminder}/>) : (' No Tasks on this date')}
      <div className="all-tasks">
        <AllTasks onAdd={() => setShowAllTasks(!showAllTasks)} showAdd={showAllTasks}/>
      </div>
      
      {showAllTasks && tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('')}

    </div>
  );
}

export default App;
