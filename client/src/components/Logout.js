import Auth from '../Auth/Auth';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
  
  function logout(props) {
  
    const handleUpdate=async (e)=>{
        Auth.setID("");
        Auth.setspeaker("");
        Auth.setuser("");
        Auth.setcounselor("");
        localStorage.setItem("speaker", "");
        localStorage.setItem("counselor", "");
        localStorage.setItem("user", "");
        localStorage.setItem("id", "");
        props.history.push('/');
        }
        const handleClose=(e)=>{
          e.preventDefault();
      let path=`/`;
      console.log(path)
      props.history.push(path);
      }
    return (
      <>
      <Modal
      show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Are you share you want to logout??
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleUpdate}>Logout</Button>
        <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default logout
