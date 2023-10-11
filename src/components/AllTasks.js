import Button from "./Button"

const AllTasks = ({ onAdd, showAdd }) => {
  return (
    <div className="header">
    <Button color={showAdd ? 'gray' : 'blue'} onClick={onAdd} text="Show All Tasks"/>
    </div>
  )
}

export default AllTasks