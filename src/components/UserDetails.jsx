import styled from "styled-components";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../firebase";
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

  {userDetails ? console.log(userDetails) : console.log('cargando...')}

  return (
    <Container>
      <span>
        <h1>GREYDIVE</h1>
        <h2>Challenge</h2>
      </span>
      <div className="datos" style={{display: perfil === '' ? 'none' : 'flex'}}>

        <h3>{perfil}</h3>
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
      text-align: left;
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
