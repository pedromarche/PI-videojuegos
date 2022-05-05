import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { createGame, getAllGames, getAllGenres } from "../../redux/actions";


function validate(input){
  const errors = {};
  if(!input.name){
    errors.name = 'El nombre es obligatorio'
  }
  if(!input.description || input.description.length < 15){
    errors.description = 'La descripcion debe tener un minimo de 15 caracteres'
  }
  if(!input.rating){
    errors.rating = 'Debe ingresar un valor'
  }else if((!/^[1-5]$/.test(input.rating))){
    errors.rating = 'Debe tener un valor entre 1 y 5'
  }
  if(!input.realased){
    errors.realased = 'Por favor ingrese la fecha de lanzamiento'
  }else if(!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.realased)){
    errors.released = "Format error (dd//mm/yy)"
  }
  if(input.platforms.length < 1){
    errors.platforms = 'Por favor ingrese las platformas compatibles'
  }
  if(input.genres.length === 0){
    errors.genres = 'Por favor selecciones los generos corresponidentes'
  }
  return errors;
}

export default function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [errors, setErrors] =  useState({})
  const genres = useSelector(state => state.genres)
  const [input, setInput] = useState({
    name: '',
    img: '',
    description: '',
    rating:'',
    realased:'',
    platforms:[],
    genres:[],
  })
  
      useEffect(() => {
    dispatch(getAllGenres())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(getAllGames())
  }, [dispatch])
  
  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleCheck(e) {
    const repeat = input.platforms.includes(e.target.value)
    if(!repeat){
      setInput({
          ...input,
          platforms:[...input.platforms, e.target.value]
      })
      setErrors(validate({
        ...input,
        platforms:[...input.platforms, e.target.value]
      }))
      }else if(e.target.value){
        setInput({
        ...input,
        platforms: input.platforms.filter((p) => p !== e.target.value)
        })

      }
      
    }
 
  function handlerGenre(e){
    const rep = input.genres.includes(e.target.value)
    if(!rep){
      setInput({
        ...input,
        genres: [...input.genres, e.target.value]
      })
      setErrors(validate({
        ...input,
        genres: [...input.genres, e.target.value]
      }))
    }
    }

  function handleGenreDelete(e) {
    setInput({
        ...input,
        genres: input.genres.filter(g => g !== e)
    })
}
  
  const handleSubmit = (e) => {
  if(input.name && input.img && input.description && input.rating && input.realased && input.platforms && input.genres){  
    e.preventDefault();
    dispatch(createGame(input))
    alert('Juego creado')
    setInput({
    name: '',
    img: '',
    description: '',
    rating:'',
    realased:'',
    platforms:[],
    genres:[],
  })
    history.push('/home') 
  }else{
    alert('No se pudo crear el videojuego')
  }
  }
  return (
    <div>
      <Link to='/home'>
        <button>Home</button>
      </Link>
      <h1>Crea tu juego.</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input type='text' value={input.name} name='name' placeholder='Titulo' onChange={(e) => handleOnChange(e)}/>
          <p>{errors.name}</p>
        </div>
        <div>
          <label>Imagen:</label>
          <input type='text' value={input.img} name='img' placeholder="URL" onChange={(e) => handleOnChange(e)}/>
        </div>
        <div>
          <label>Descripcion:</label>
          <input type='text' value={input.description} name='description' onChange={(e) => handleOnChange(e)}/>
          <p>{errors.description}</p>
        </div>
        <div>
          <label>Rating:</label>
          <input type='number' value={input.rating} name='rating' placeholder="1-5" onChange={(e) => handleOnChange(e)}/>
         <p>{errors.rating}</p>
        </div>
        <div>
          <label>Realased:</label>
          <input type='date' value={input.realased} name='realased' placeholder="Debe ser una fecha" onChange={(e) => handleOnChange(e)}/>
          <p>{errors.realased}</p>
        </div>
        <div>
          <label>Plataformas:</label>         
              <label><input type='checkbox' name='platforms' value='PC' onChange={(e) => handleCheck(e)}/>PC</label>
              <label><input type='checkbox' name='platforms' value='playstation' onChange={(e) => handleCheck(e)}/>PlayStation</label>
              <label><input type='checkbox' name='platforms' value='xbox' onChange={(e) => handleCheck(e)}/>Xbox</label>
              <label><input type='checkbox' name='platforms' value='nint' onChange={(e) => handleCheck(e)}/>Nintendo</label>   
             <p>{errors.platforms}</p>        
        </div>
        <div>
          <label>Genre:</label>
          <select onChange={(e) => handlerGenre(e)}>
            {genres.map((g) => (
              <option key = {g.id} value={g.name}>{g.name}</option>
            ))}
          </select>
          <p>{errors.genres}</p>
          <ul><li>{input.genres.map((e) => (e + ' - '))}<button type='button' onClose={(e) => handleGenreDelete(e)}>x</button></li></ul> 
        </div>
        <button type='submit' >Crear juego</button>
      </form>      
    </div>
    )
  }
