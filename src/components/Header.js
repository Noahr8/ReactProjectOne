import PropTypes from 'prop-types'
import Button from './Button'
//Input is props, for instance title here is a prop
const Header = ({ title, onAdd, showAdd }) => {


  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Trask Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


//You can style using in line script={headingStyle} for this case
// const headingStyle {
//     //Put in CSS
// }

export default Header