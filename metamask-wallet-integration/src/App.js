import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react'
import { Navbar ,Container,Row,Col,Button,Alert } from 'react-bootstrap'

function App() {

  const [isLogged, setIsLogged] = useState(false)

  const SignIn = async () => {
    setIsLogged(true)
  }

  const SignOut = async () => {
    setIsLogged(false)
  }


  
  const [messages, setMessage] = useState([
    {head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info'},
    {head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info'}
  ])


  const Message = (props) => {

    const [show, setShow] = useState(true);

    const close = () => {
      setShow(false)
      setMessage(messages.filter((item, index) => index !== props.id))
    }

    if(show) {
      return (
        <Alert variant={props.variant ? props.variant : 'dark'} onClose={close} dismissible>
          <Alert.Heading>{props.head}</Alert.Heading>
          <p>
            {props.body}
          </p>
        </Alert>
      )
    } else {
      return(<></>)
    }

    
  }
  
  return (
  <>
  <Navbar bg="dark" className="justify-content-between" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top App-logo"
      />{' '}
      0x React Bootstrap Tutorial
      
    </Navbar.Brand>
    <div>
      <Button onClick={SignIn} variant="primary">Connect</Button>{' '}
      <Button onClick={SignOut} style={{visibility: isLogged ? "visible" : "hidden"}} variant="danger">X</Button>
    </div>
  </Navbar>

    <div className="message-list" >
        {
          messages.map((item,i) => (
            <Message head={item.head} body={item.body} variant={item.variant} id={i} key={i} />
          ))
        }
    </div>

    <Container>
      <Row>
        <Col className="App-logo-container">
        
        <img src={logo} className="App-logo" alt="logo" />

        
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default App;