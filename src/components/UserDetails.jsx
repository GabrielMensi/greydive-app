import styled from "styled-components";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../firebase";
import loadIcon from "../assets/load-icon.png";

const UserDetails = () => {

  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUser(userId)
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => {
        console.log(err);
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
      <div className="datos">
        <h3>Perfil</h3>
        { userDetails ? (
          <span>
            <p className="detalles">Nombre: {userDetails.full_name}</p>
            <p className="detalles">Email: {userDetails.email}</p>
            <p className="detalles">Nacimiento: {userDetails.birth_date}</p>
            <p className="detalles">Pais: {userDetails.country_of_origin}</p>
          </span>
          ) : 
          <Modal>
            <img src={loadIcon} className='load-icon' />
            <p className="texto">No cierre la pagina, tarda unos segundos...</p>
          </Modal>}
          {/* <Modal>
            <p className="texto">No cierre la pagina, tarda unos segundos...</p>
            <img src={loadIcon} className='load-icon' />
          </Modal> */}
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
    }
    h2 {
      font-size: 24px;
      letter-spacing: 2px;
      font-weight: 600;
      color: #f2f2f2;
    }
  }
  .datos {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 320px;
    height: auto;
    padding: 20px 0 20px 30px;
    border-radius: 20px;
    background-color: #f2f2f2;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    h3 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 10px 0;
      text-align: left;
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
    font-size: 18px;
    font-weight: 400;
    color: #f2f2f2;
    margin: 10px 0;
    text-align: center;
  }
  .load-icon {
    margin-top: 50px;
    width: 50px;
    height: 50px;
    animation: spin 2s infinite linear;
  }
  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
`
