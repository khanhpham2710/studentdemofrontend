import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import UpdateStudentForm from '../UpdateStudentForm/UpdateStudentForm';
import { resetStatusAndMessage } from '../../global/studentSlice';
import { useSelector, useDispatch } from 'react-redux';

function UpdateStudentButton({student}) {
  const [modal, setModal] = useState(false);
  const { message, status } = useSelector((state) => state.students)
  const dispatch = useDispatch()

  const toggle = () => setModal(!modal);


  useEffect(() => {
    if (status && message) {
      const timer = setTimeout(() => dispatch(resetStatusAndMessage()), 5000)
      return () => clearTimeout(timer)
    }
  }, [status, message])

  return (
    <div>
      {status === 500 && message && <Alert color="danger">
        {message}
      </Alert>}
      <Button color="info" onClick={toggle}>
        Update
      </Button>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Update form</ModalHeader>
        <ModalBody>
          <UpdateStudentForm toggle={toggle} student={student}/>
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

export default UpdateStudentButton;