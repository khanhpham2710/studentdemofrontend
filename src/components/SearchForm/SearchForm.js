import { Button, FormGroup, Label, Input, Alert, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { searchThanThanh, resetStatusAndMessage } from "../../global/studentSlice";
import { useEffect, useMemo, useState } from "react";


function SearchForm({ page }) {
    const { message, status } = useSelector((state) => state.students)

    const dispatch = useDispatch()


    const [param, setParam] = useState({
        name: null,
        studentRank: null,
        startYear: 1990,
        endYear: 2024,
        page: page - 1
    })


    useEffect(() => {
        if (param.endYear < param.startYear) {
            window.alert("End year must be higher than start year")
        } else {
            dispatch(searchThanThanh({ ...param, page: page - 1 }))
        }
        dispatch(searchThanThanh({ ...param, page: page - 1 }))
    }, [page])


    function handleClick() {
        if (param.endYear < param.startYear) {
            window.alert("End year must be higher than start year")
        } else {
            dispatch(searchThanThanh(param))
        }
    }


    const years = useMemo(() => {
        const array = []
        for (var i = 1990; i <= 2024; i++) {
            array.push(i)
        }
        return array
    }, [])





    useEffect(() => {
        if (status && message) {
            const timer = setTimeout(() => dispatch(resetStatusAndMessage()), 5000)
            return () => clearTimeout(timer)
        }
    }, [status, message])

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "dob") {
            setParam((prev) => (
                { ...prev, [name]: value }
            ))
        } else if (name === "studentRank") {
            switch (value) {
                case "Giỏi":
                    setParam((prev) => (
                        { ...prev, [name]: "GIOI" }
                    ))
                    break;
                case "Khá":
                    setParam((prev) => (
                        { ...prev, [name]: "KHA" }
                    ))
                    break;
                case "Trung bình":
                    setParam((prev) => (
                        { ...prev, [name]: "TRUNGBINH" }
                    ))
                    break;
                case "Yếu":
                    setParam((prev) => (
                        { ...prev, [name]: "YEU" }
                    ))
                    break;
                case "--":
                    setParam((prev) => (
                        { ...prev, [name]: null }
                    ))
                    break;
            }
        } else {
            setParam((prev) => (
                { ...prev, [name]: value }
            ))
        }
    }

    
    return (
        <Form style={{ maxWidth: "800px", margin: "30px auto" }}>
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
                    required
                />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <FormGroup style={{ width :"40%" }}>
                    <Label for="startYear">
                        StartYear
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="startYear"
                        type="select"
                        onChange={e => handleChange(e)}
                        value={param.startYear}
                    >
                        {years && years.map(year => (
                            <option key={year}>
                                {year}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup style={{ width :"40%" }}>
                    <Label for="endYear">
                        End Year
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="endYear"
                        type="select"
                        onChange={e => handleChange(e)}
                        value={param.endYear}
                    >
                        {years && years.map(year => (
                            <option key={year}>
                                {year}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            </div>
            <FormGroup>
                <Label for="exampleSelect">
                    Select
                </Label>
                <Input
                    id="exampleSelect"
                    name="studentRank"
                    type="select"
                    onChange={e => handleChange(e)}
                >
                    <option>
                        --
                    </option>
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
                Search
            </Button>
        </Form>
    )
}

export default SearchForm