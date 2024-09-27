import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, FormGroup, Label, Alert } from "reactstrap";
import { addNewStudents, resetStatusAndMessage } from "../../global/studentSlice";


function AddStudentForm({ toggle }) {
  const [student, setStudent] = useState({
    "name": null,
    "city": null,
    "dob": null,
    "rank": "GIOI"
  })

  const { message, status } = useSelector((state) => state.students)

  const dispatch = useDispatch()


  function handleClick() {
    dispatch(addNewStudents(student))
  }




  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "dob") {
      setStudent((prev) => (
        { ...prev, [name]: value }
      ))
    } else if (name === "rank") {
      switch (value) {
        case "Giỏi":
          setStudent((prev) => (
            { ...prev, [name]: "GIOI" }
          ))
          break;
        case "Khá":
          setStudent((prev) => (
            { ...prev, [name]: "KHA" }
          ))
          break;
        case "Trung bình":
          setStudent((prev) => (
            { ...prev, [name]: "TRUNGBINH" }
          ))
          break;
        case "Yếu":
          setStudent((prev) => (
            { ...prev, [name]: "YEU" }
          ))
          break;
      }
    } else {
      setStudent((prev) => (
        { ...prev, [name]: value }
      ))
    }
  }

  useEffect(()=>{
    if (status && message){
      const timer = setTimeout(() => dispatch(resetStatusAndMessage()), 5000)
      return () => clearTimeout(timer)
    }
  },[status,message])

  

  return (
    <Form>
      {status === 400 && message && <Alert color="danger">
        <ul>
          {message.map((item, index) => (
            <li key={index}>
              {item.split(": ")[1]}
            </li>
          ))}
        </ul>
      </Alert>}
      <FormGroup>
        <Label for="name">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter student's name"
          type="text"
          onChange={e => handleChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">
          City
        </Label>
        <Input
          id="city"
          name="city"
          placeholder="Enter city's name"
          type="text"
          onChange={e => handleChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          id="dob"
          name="dob"
          bsSize="sm"
          type="date"
          onChange={e => handleChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">
          Select
        </Label>
        <Input
          id="exampleSelect"
          name="rank"
          type="select"
          onChange={e => handleChange(e)}
        >
          <option>
            Giỏi
          </option>
          <option>
            Khá
          </option>
          <option>
            Trung bình
          </option>
          <option>
            Yếu
          </option>
        </Input>
      </FormGroup>
      <Button onClick={handleClick}>
        Submit
      </Button>
    </Form>
  )
}

export default AddStudentForm;