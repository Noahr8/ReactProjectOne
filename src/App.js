import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Calendar from 'react-calendar';
import DatePicker from 'react-date-picker';
import { useEffect, useState } from 'react';
import AllTasks from './components/AllTasks';
import { db } from './config/firebase-config'
import { addDoc, getDocs, collection, Timestamp } from 'firebase/firestore'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [date, setDate] = useState(new Date())
  //const [dateTimeStamp, setDateTimeStamp] = useState()
  const [tasks, setTasks] = useState([])


  const [taskList, setTaskList] = useState([]);

  const tasksCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTaskList = async () => {
      try {
        const data = await getDocs(tasksCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(filteredData);
        setTaskList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getTaskList();
  }, [])

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
  const taskDateTimeStamp = task.date.getTime();
  onAddTask(task);
}

const onAddTask = async (task) => {
  try {
    await addDoc(tasksCollectionRef, {
      //id: task.id,
      // name: task.name,
      // date: taskDateTimeStamp,
      // reminder: task.reminder,
    })
  } catch (err) {
    console.error(err);
  }
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
