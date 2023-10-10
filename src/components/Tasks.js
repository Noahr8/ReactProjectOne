import Task from "./Task"
//For testing purposes
// const tasks = [
//     {
//         id: 1,
//         text: 'Doctors Appointment',
//         day: 'Feb 5th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id: 2,
//         text: 'Whatever',
//         day: 'No Optimal for days',
//         reminder: true,
//     },
//     {
//         id: 3,
//         text: 'Last',
//         day: 'Feb 5th',
//         reminder: false,
//     }
// ]

const Tasks = ({ tasks, onDelete, onToggle }) => {

  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        ))
      }   
    </>
  )
}

export default Tasks