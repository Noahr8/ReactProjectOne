import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Calendar from 'react-calendar';
import DatePicker from 'react-date-picker';
import { useEffect, useState } from 'react';
import AllTasks from './components/AllTasks';
import { db } from './config/firebase-config'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [date, setDate] = useState(new Date())
  //const [dateTimeStamp, setDateTimeStamp] = useState()
  const [tasks, setTasks] = useState([])
  // const [idFire, setIdFire] = useState(0)
  // const [nameFire, setNameFire] = useState("")
  // const [dateFire, setDateFire] = useState(new Date())
  // const [reminderFire, setReminderFire] = useState(false)


  const [taskList, setTaskList] = useState([]);

  const tasksCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTaskList = async () => {
      try {
        const data = await getDocs(tasksCollectionRef);
        const filteredData = data.docs.map((doc) => {
          const firestoreData = doc.data()
          return {
            id: doc.id,
            text: firestoreData.name,
            date: firestoreData.date.toDate(),
            reminder: firestoreData.reminder || false,
          };
        });
        console.log(filteredData)
        setTasks(filteredData)
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
const addTask = async (task) => {
  setTasks([...tasks, task])
  console.log(task);
}


//Delete Task
const deleteTask = async (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
  try {
    await deleteDoc(doc(db, 'tasks', id))
  } catch (err) {
    console.error(err)
  }
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
