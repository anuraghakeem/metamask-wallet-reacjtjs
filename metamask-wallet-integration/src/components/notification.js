import { useState } from 'react'
import {Alert} from 'react-bootstrap'


const Notification = (props) =>{
    const Message = (props) => {

        const [show, setShow] = useState(true);
    
        const close = () => {
          setShow(false)
          props.setMessage(props.messages.filter((item, index) => index !== props.id))
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
    return(
        <>
            <div className="message-list" >
            {
                props.messages.map((item,i) => (
                    <Message head={item.head} body={item.body} variant={item.variant} id={i} key={i} />
                ))
            }
            </div>
        </>
    )
}

export default Notification;