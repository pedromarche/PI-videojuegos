import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { createGame, getAllGames, getAllGenres } from "../../redux/actions";
import './Creat.css'


function validate(input){
  const errors = {};
  if(!input.name){
    errors.name = 'El nombre es obligatorio'
  }
  if(!/^((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})$/.test(input.img)){
    errors.img = 'Debe ingresar un Link'
  }
  if(!input.description || input.description.length < 15){
    errors.description = 'La descripcion debe tener un minimo de 15 caracteres'
  }
  if(!input.rating){
    errors.rating = 'Debe ingresar un valor'
  }else if(input.rating < 0 || input.rating > 5){
    errors.rating = 'Debe tener un valor entre 1 y 5'
  }
  if(!input.realased){
    errors.realased = 'Por favor ingrese la fecha de lanzamiento'
  }else if(!/(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/.test(input.realased)){
    errors.released = "Format error (dd//mm/yyyy)"
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
    }else{
      setInput({
        ...input, 
        genres: input.genres.filter((g => g !== e.target.value))
      })
      setErrors(validate({
        ...input,
        genres: [...input.genres, e.target.value]
      }))

    }
    }


  const handleSubmit = (e) => {
  if(input.name && input.img && input.description && input.rating && input.realased && input.platforms && input.genres &&
     !errors.name && !errors.img && !errors.descriptions && !errors.rating && !errors.realased && !errors.platforms && !errors.genres){  
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
          <p>{errors.img}</p>
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
          <ul>{input.genres &&
                  input.genres.map((e) => (
                    <div key={e + 1}>
                      <li name={e} value={e}>
                        {e}{" "}
                      </li>
                      <button type="button" onClick={handlerGenre} value={e} className="del">x</button>
                    </div>
                    ))}</ul> 
        </div>
        <button type='submit' >Crear juego</button>
      </form>      
    </div>
    )
  }

  // {select &&
  //   select.map((e) => (
      // <div key={e + 1} className="Form-genres">
      //   <li name={e} value={e} className="Form-">
      //     {e}{" "}
      //   </li>
      //   <button
      //     type="button"
      //     onClick={handleOnPlatforms}
      //     value={e}
      //     className="Form-"
      //   >
      //     X
      //   </button>
      // </div>
  //   ))}