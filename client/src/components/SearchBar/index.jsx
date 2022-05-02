import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../redux/actions'


export default function SearchBar() {
  const dispatch = useDispatch();
  const [names, setName] = useState('')

  function handleinputChange(e){
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getName(names))
    setName('')
  }

    return (
    <div>
       <input onChange={(e) => handleinputChange(e)} value ={names} type='text'  placeholder='la barra buscadora'/>
       <button onClick={(e) => handleSubmit(e)} type='submit' >buscar</button>
    </div>
    
    );
  }


