import React from 'react'

function Homee() {
  return (
    <div>
      <button onClick={()=>(window.location.href='/additem')}>AddItem</button>
      <button onClick={()=>(window.location.href='/allitems')}>All Item</button>
      <button onClick={()=>(window.location.href='/register')}>Register</button>
      <button onClick={()=>(window.location.href='/login')}>Login</button>
    </div>
  )
}

export default Homee

