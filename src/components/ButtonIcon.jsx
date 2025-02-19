import React from 'react'

const ButtonIcon = ({handleNewDepartment, children}) => {
  return (
    <>
        <button onClick={handleNewDepartment} className='capitalize btn-primary flex gap-1'> {children} </button>
    </>
  )
}

export default ButtonIcon