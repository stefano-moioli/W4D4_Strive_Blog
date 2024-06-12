import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// c.rossi@example.com // pass: ciaocri

export default function LoginForm(){

    const [author, setAuthor] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const formHandler = (e) => {
        setAuthor({
            ...author,
            [e.target.name] : e.target.value
        })
    }

    const formSubmitHandler = (e) =>{
        axios.post("http://localhost:3001/auth/login", author)
        .then(response => {
            setError(null);
            localStorage.setItem("authorLogin", response.data)
            navigate("/me")
        })
        .catch(error => setError(error.response.data))
    }

    

return(
<Container>
        <Form>
       
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control type="email" name="email" placeholder="email" onChange={formHandler}/>
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" name="password" placeholder="Password" onChange={formHandler}/>
          </Col>
        </Form.Group>


        <Button type="button" className="bg-dark w-50" onClick={formSubmitHandler}> Login </Button>
      </Form>
      <Button type="button" className="bg-dark w-50 mt-2" href="http://localhost:3001/auth/googleLogin"> Login with Google</Button>

      { error ? <Alert variant={"danger"} className="mt-3"> {error.message} </Alert> : ""}

      </Container>

)}