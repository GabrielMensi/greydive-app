//REACT
import styled from "styled-components";
import React, {useState, useEffect} from "react";
//REACT ROUTER
import { NavLink, useParams } from "react-router-dom";
//FIREBASE
import { getUser } from "../firebase";
//ASSETS
import loadIcon from "../assets/load-icon.png";

const UserDetails = () => {

  const { userId } = useParams();

  const [perfil, setPerfil] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    getUser(userId)
      .then((res) => {
        setUserDetails(res);
        setPerfil('Perfil')
      })
      .catch((err) => {
        console.log(err);
        setPerfil('El usuario no existe')
      }
    );
  }, [ userId ]);


  return (
    <Container>
      <span>
        <h1>GREYDIVE</h1>
        <h2>Challenge</h2>
      </span>
      <div 
        className="datos" 
        style={{backgroundColor: perfil === '' ? 'transparent' : '#f2f2f2', boxShadow: perfil === '' ? 'none' : '0 0 10px rgba(0,0,0,0.2)' }}>
        <h3 style={{display: perfil === '' ? 'none' : 'block'}}>{perfil}</h3>
        { userDetails ? (
          <span>
            <p className="detalles"><strong>Nombre:</strong> {capitalizarPrimeraLetra(userDetails.full_name)}</p>
            <p className="detalles"><strong>Email:</strong> {userDetails.email}</p>
            <p className="detalles"><strong>Nacimiento:</strong> {userDetails.birth_date}</p>
            <p className="detalles"><strong>Pais:</strong> {capitalizarPrimeraLetra(userDetails.country_of_origin)}</p>
          </span>
          ) 
          : perfil === 'El usuario no existe' ? null 
          : <Modal>
              <img src={loadIcon} className='load-icon' />
            </Modal> }
        </div>
        <NavLink to='/' className='home-button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="home-icon" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg>
</NavLink>
    </Container>
  );
};

export default UserDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: rgb(105,42,144);
  background: linear-gradient(315deg, rgba(105,42,144,1) 30%, rgba(210,3,80,1) 100%);
  span{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    padding: 20px;
    margin-top: 20px;
    h1 {
      font-size: 48px;
      letter-spacing: 1px;
      font-weight: 800;
      color: #f2f2f2;
      text-shadow: 4px 4px 10px #454545;
    }
    h2 {
      font-size: 24px;
      letter-spacing: 2px;
      font-weight: 600;
      color: #f2f2f2;
      text-shadow: 4px 4px 10px #454545;
    }
  }
  .datos {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 450px;
    height: auto;
    padding: 30px;
    border-radius: 20px;
    background-color: #f2f2f2;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    @media (max-width: 768px) {
      width: 90%;
    }
    h3 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 10px 0;
      text-align: center;
      width: 100%;
    }
    span{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: auto;
      padding: 0;
      .detalles {
      font-size: 18px;
      font-weight: 400;
      color: #333;
      margin: 10px 0;
      text-align: left;
      }
    }
  }
  .home-button {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #f2f2f2;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    &:hover {
      background-color: #580066;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      .home-icon {
        fill: #f2f2f2;
      }
    }
    .home-icon {
      width: 30px;
      height: 30px;
      transition: all 0.3s ease;
      fill: #CB0654;
    }
  }
`

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 100;
  .texto {
    font-size: 22px;
    font-weight: 400;
    color: #f2f2f2;
    margin: 20px 0;
    text-align: center;
    letter-spacing: 1px;
  }
  .load-icon {
    margin-top: 20px;
    width: 50px;
    height: 50px;
    filter: invert(1);
    animation: spin 2s infinite linear;
  }
  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
`
