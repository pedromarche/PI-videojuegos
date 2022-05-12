import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../redux/actions'
import './search.css'


export default function SearchBar({setActualPage}) {
  const dispatch = useDispatch();
  const [names, setName] = useState('')
  
  function handleinputChange(e){
    e.preventDefault()
    setName(e.target.value)
    }
  

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getName(names))
    setActualPage(1)
    setName('')
    }
  

    return (
    <div>
       <input onChange={(e) => handleinputChange(e)} value ={names} type='text'  placeholder='Buscar...' className='input'/>
       <button onClick={(e) => handleSubmit(e)} type='submit' className='button' >buscar</button>
    </div>
    
    );
  }


