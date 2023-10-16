import { useState } from 'react'
import DatePicker from 'react-date-picker'
import { db } from '../config/firebase-config'
import { addDoc, getDocs, collection, Timestamp } from 'firebase/firestore'
import firebase from 'firebase/app';
import 'firebase/firestore';
//import "react-date-picker/dist/react-datepicker.css"

const AddTask = ({ onAdd }) => {

  const tasksCollectionRef = collection(db, "tasks");

  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  //const [time, setTime] = useState('')
  const [reminder, setReminder] = useState(false)
  //const [id, setId] = useState(0)

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    if(!text) {
        alert('Please add a task')
        return
    }
    const id = Math.floor(Math.random() * 10000) + 1


    onAdd({ id, text, date, reminder })
    const timestamp = Timestamp.fromDate(date);
    try {
      await addDoc(tasksCollectionRef, {
        id: id,
        name: text,
        date: timestamp,
        reminder: reminder,
      })
    } catch (err) {
      console.error(err)
    }

    setText('')
    setDate('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Date</label>
            <DatePicker format="MMddyyyy" selected={Date.now} value={date} onChange={(date) => setDate(date)} />
            {/*<input type='date' placeholder='Set Date (MM/DD/YYYY)' value={dateInput} onChange={handleDateChange}/>*/}
        </div>
        <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input 
            type='checkbox' 
            checked={reminder} 
            value={reminder} 
            onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type='submit' value='Save Task' className='btn btn-block'/>
    </form>
  )
}

export default AddTask