import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, FormGroup, Label, Alert } from "reactstrap";
import { updateStudents, resetStatusAndMessage } from "../../global/studentSlice";

function UpdateStudentForm({ student,toggle }) {
  const [newStudent, setNewStudent] = useState({
    "name": student.name,
    "city": student.city,
    "dob": student.dob,
    "rank": student.studentRank
  })

  const { message, status } = useSelector((state) => state.students)

  const dispatch = useDispatch()


  function handleClick() {
    dispatch(updateStudents({ id: student.id, student: newStudent }))
    toggle()
  }


  useEffect(() => {
    if (status && message) {
      const timer = setTimeout(() => dispatch(resetStatusAndMessage()), 5000)
      return () => clearTimeout(timer)
    }
  }, [status, message])


  

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "dob") {
      setNewStudent((prev) => (
        { ...prev, [name]: value }
      ))
    } else if (name === "rank") {
      switch (value) {
        case "Giỏi":
          setNewStudent((prev) => (
            { ...prev, [name]: "GIOI" }
          ))
          break;
        case "Khá":
          setNewStudent((prev) => (
            { ...prev, [name]: "KHA" }
          ))
          break;
        case "Trung bình":
          setNewStudent((prev) => (
            { ...prev, [name]: "TRUNGBINH" }
          ))
          break;
        case "Yếu":
          setNewStudent((prev) => (
            { ...prev, [name]: "YEU" }
          ))
          break;
      }
    } else {
      setNewStudent((prev) => (
        { ...prev, [name]: value }
      ))
    }
  }

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
          value={newStudent.name}
          required
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
          value={newStudent.city}
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          id="dob"
          name="dob"
          bsSize="sm"
          type="date"
          onChange={e => handleChange(e)}
          value={newStudent.dob}
          required
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
          value={newStudent.rank}
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
        Save
      </Button>
    </Form>
  )
}

export default UpdateStudentForm;