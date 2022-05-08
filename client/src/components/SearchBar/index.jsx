import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getName } from '../../redux/actions'
import './search.css'


export default function SearchBar() {
  const dispatch = useDispatch();
  const [names, setName] = useState('')
  // const history = useHistory()
  
  function handleinputChange(e){
    e.preventDefault()
    setName(e.target.value)
    }
  

  function handleSubmit(e){
      e.preventDefault()
      dispatch(getName(names))
      setName('')
      // history.push('/home')
    }
  

    return (
    <div>
       <input onChange={(e) => handleinputChange(e)} value ={names} type='text'  placeholder='Buscar...' className='input'/>
       <button onClick={(e) => handleSubmit(e)} type='submit' className='button' >buscar</button>
    </div>
    
    );
  }


