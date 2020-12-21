import React from 'react';
import './Confirm.css'

const Confirm = (props) => {
  return (
    <center className="modal">
        {props.children}
    </center>
  )
}

export default Confirm;
