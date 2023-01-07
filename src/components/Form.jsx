import React, { useState } from 'react';
import styled from 'styled-components';
import { items as itemsForm } from '../assets/db.json';
import { useFormik } from 'formik';
import loadIcon from '../assets/load-icon.png';
import { addUser } from '../firebase';
import { NavLink } from 'react-router-dom';


const Form = () => {
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [userId, setUserId] = useState(null);

//DATA    
  const items = itemsForm;
//VALIDATIONS
  const validate = values => {
    const errors = {};
    //Name
    if (!values.full_name) {
      errors.full_name = "Required";
    } else if (values.full_name.length > 30) {
      errors.full_name = "Must be 30 characters or less";
    } else if (values.full_name.length < 3) {
      errors.full_name = "Must be 3 characters or more";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.full_name)) {
      errors.full_name = "Invalid name";
    }
    //Email
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    //Birth date
    if (!values.birth_date) {
      errors.birth_date = "Required";
    }
    //Country of origin
    if (!values.country_of_origin) {
      errors.country_of_origin = "Required";
    }
    //Terms and conditions
    if (!values.terms_and_conditions) {
      errors.terms_and_conditions = "Required";
    }
    return errors;
  };
//FORM
    const formik = useFormik({
      initialValues: {
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin:'',
        terms_and_conditions: false
      },
      validate,
      onSubmit: (values) => {
        addUser(values, setLoading, setSucess, setUserId);
        console.log(values);
        formik.resetForm();
      },
    });
    
    return (
      <Container>
      <FormContainer>
        <h1>REGISTER FORM</h1>
        <h2>GREYDIVE</h2>
        <form className="form" onSubmit={formik.handleSubmit} >
            {items.map((item, index) => {
              return item.type !== 'submit' && item.type !== 'select'?
                <div key={index} className={item.type}>
                  <span>
                    <label htmlFor={item.id}>{item.label}</label>
                    <input 
                      id={item.id} 
                      name={item.name} 
                      type={item.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[item.name]}
                      required={item.required}
                      />
                    </span>
                  {formik.touched[item.name] && formik.errors[item.name] ? (
                    <div className='error'>{formik.errors[item.name]}</div>
                  ) : null}
                </div>
              : item.type === 'select' ?
                <div key={index} className={item.type}>
                  <span>
                    <label htmlFor={item.id}>{item.label}</label>
                    <select
                      id={item.id}
                      name={item.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[item.name]}
                      required={item.required}
                    >
                      <option value="">Selecciona</option>
                      {item.options.map((option, index) => {
                        return <option key={index} value={option.value}>{option.label}</option>
                      })}
                    </select>
                  </span>
                  {formik.touched[item.name] && formik.errors[item.name] ? (
                    <div className='error'>{formik.errors[item.name]}</div>
                  ) : null}
                </div>
              : <button
                  className={`submit ${formik.isValid && formik.dirty ? 'active' : null}`}
                  key={index} 
                  type={item.type} 
                  id={item.id} 
                  name={item.name}>{item.label}</button>
            })}
        </form>
        {loading && <Modal><img src={loadIcon}  className='load-icon'/></Modal>}
      </FormContainer>
        {sucess && 
          <Modal>
            <div>
              <h1>Usuario registrado con exito!</h1>
              <NavLink to={`/${userId}`}><button>Aceptar</button></NavLink>
            </div>
          </Modal>
          }
      </Container>
    )
}

export default Form;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  padding: 20px 0;
  background: rgb(105,42,144);
  background: linear-gradient(315deg, rgba(105,42,144,1) 30%, rgba(210,3,80,1) 100%);
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: max-content;
  padding: 20px 0;
  width: 90%;
  max-width: 700px;
  background-color: #f2f2f2;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  h1 {
    font-size: 24px;
    letter-spacing: 1px;
    font-weight: 800;
    color: #333;
  }
  h2 {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #333;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    padding: 20px;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 80%;
      margin-bottom: 20px;
      span{
        width: 100%;
        label {
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          font-size: 14px;
          color: #333;
          &:focus {
            border: 1px solid #333;
          }
      }
      }
      .error {
        margin: 0 0 0 0;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.5px;
        color: #f00;
      }
    }
    .checkbox{
      flex-direction: column;
      span{
        display: flex;
        flex-direction: row;
        width: 100%;
        label {
          width: 90%;
        }
        input {
          width: 10%;
          cursor: pointer;
        }
      }
      .error{
        margin: 0 0 0 0;
        width: max-content;
      }
    }
    .select{
      span{
        width: 100%;
        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          font-size: 14px;
          color: #333;
          &:focus {
            border: 1px solid #333;
          }
        }
        label {
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
      }
    }
    button {
      width: 100%;
      max-width: 360px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #580066;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      cursor: not-allowed;
      
    }
    .active {
      cursor: pointer;
      &:hover {
        background: linear-gradient(315deg, rgba(105,42,144,1) 30%, rgba(210,3,80,1) 100%);
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
  .load-icon {
    width: 50px;
    height: 50px;
    animation: spin 2s infinite linear;
  }
  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 320px;
    background-color: #f2f2f2;
    padding: 20px;
    h1{
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }
    button{
      width: 100px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #580066;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        background: linear-gradient(315deg, rgba(105,42,144,1) 30%, rgba(210,3,80,1) 100%);
      }
    }
  }
`