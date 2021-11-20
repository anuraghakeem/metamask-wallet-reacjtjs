import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react'
import { Container,Row,Col,Alert } from 'react-bootstrap'
import Nav from './components/navbar'
import Notification from './components/notification'

function App() {

  const [currentAccount, setCurrentAccount] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [currentChainID, setCurrentChainID] = useState(-1)

  const SignIn = async () => {
    //Detect Provider
    const provider = await detectEthereumProvider()
    const web3 = new Web3(provider)
    if(!provider) {
      setMessage(messages => [...messages, {head : "Wallet not found", body: `Please install MetaMask!`, variant: 'warning'}])
    } else {
      const address = await ConnectWallet()
      if (address)
        setMessage(messages =>[...messages, {head : "User Login", body: `addres: ${address}`, variant: 'success'}])
    }
  }

  const ConnectWallet = async () => {
    console.log("Try Connect");
    try {
      const id = await window.ethereum.request({ method: 'eth_chainId' })
      setCurrentChainID(() => parseInt(id, 16))
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setIsLogged(true)
      setCurrentAccount(accounts[0])
      return accounts[0]
    } catch(err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.')
          setMessage(messages =>[...messages, {head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info'}])

        } else if(err.code === -32002) {
          console.log('Please unlock MetaMask.')
          setMessage(messages =>[...messages, {head : "User Request Pending", body: 'Please unlock MetaMask and try agin.', variant: 'info'}])
        } else {
          console.error(err);
          setMessage(messages =>[...messages, {head : "Error", body: err.message, variant: 'info'}])
        }
    }
  }

  const handleAccountsChanged = (accounts) => {

    console.log('handleAccountsChanged');

    //if(!isLogged) return

    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setMessage(messages => [...messages, {head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info'}])
    } else if (accounts[0] !== currentAccount) {
      console.log(accounts[0])
      console.log(messages);
      setCurrentAccount(() => accounts[0])
      setMessage(messages => [...messages, {head : "Account Changed", body: `addres: ${accounts[0]}`, variant: 'warning'}])
    }
  }

  useEffect(() => {
    window.onbeforeunload = function() { return "Prevent reload" }
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    window.ethereum.on('chainChanged', (_chainId) => {
      console.log(_chainId);
      setCurrentChainID(() => parseInt(_chainId, 16))
      //window.location.reload()
    });
  }, []);

  const SignOut = async () => {
    setIsLogged(false)
    setCurrentAccount('')
  }
  
  const [messages, setMessage] = useState([])
  
  return (
  <>
    <Nav currentChainID={currentChainID} isLogged = {isLogged} SignIn ={SignIn} SignOut={SignOut} currentAccount={currentAccount} />
    <Notification messages={messages} setMessage={setMessage} />
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