import logo from '../logo.svg'
import { Navbar,Button } from "react-bootstrap"
import Chain from './chain'

const Nav = (props) => {
    const shortAddr = () => {
        return `${props.currentAccount.substr(0,4)}...${props.currentAccount.substring(props.currentAccount.length - 4, props.currentAccount.length)}`
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
          />{" "}
          AN
        </Navbar.Brand>
        <div>
          <Chain chainId={props.currentChainID} />{" "}
          <Button
            className="connect-button"
            disabled={props.isLogged}
            onClick={props.SignIn}
            variant="primary"
          >
            {props.isLogged ? shortAddr() : "Connect"}
          </Button>{" "}
          <Button
            onClick={props.SignOut}
            style={{ visibility: props.isLogged ? "visible" : "hidden" }}
            variant="danger"
          >
            X
          </Button>
        </div>
      </Navbar>
    </>
  );
};

export default Nav;
