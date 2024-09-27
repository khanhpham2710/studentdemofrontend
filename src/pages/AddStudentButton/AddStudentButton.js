import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddStudentForm from "../AddStudentForm/AddStudentForm"
import { useSelector } from 'react-redux';

function AddStudentButton() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { message, status } = useSelector((state) => state.students)

  useEffect(()=>{
    if(status===201 && message){
      window.alert(message)
    }
  },[message,status])

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <AddStudentForm toggle={toggle}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddStudentButton;