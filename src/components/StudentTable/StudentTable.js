import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { deleteStudents } from "../../global/studentSlice";
import UpdateStudentButton from "../UpdateStudentButton/UpdateStudentButton";
import { Link } from "react-router-dom";


function StudentTable(){
    const { entities } = useSelector((state) => state.students);
    const dispatch = useDispatch()

    function convert(rank) {
        switch (rank) {
            case "GIOI":
                return "Giỏi";
            case "KHA":
                return "Khá";
            case "TRUNGBINH":
                return "Trung bình";
            case "YEU":
                return "Yếu";
            default:
                return rank;
        }
    }


    function handleDelete(id) {
        if (window.confirm("Bạn có muốn xóa không?")) {
            dispatch(deleteStudents(id));
        }
    }

    function convertToDDMMYYYY(date) {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    }

    function handleDelete(id) {
        if (window.confirm("Bạn có muốn xóa không?")) {
            dispatch(deleteStudents(id));
        }
    }


    return (
        <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Thành phố</th>
                        <th>Ngày sinh</th>
                        <th>Xếp loại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entities.map((student, index) => (
                            <tr key={student.id}>
                                <th scope="row">{student.id}</th>
                                <td>{student.name}</td>
                                <td>{student.city}</td>
                                <td>{convertToDDMMYYYY(student.dob)}</td>
                                <td>{convert(student.studentRank)}</td>
                                <td>
                                    <Button color="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                                    <UpdateStudentButton student={student} />
                                    <Link to={`/image/${student.id}`} >
                                        <Button>Image</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
    )
}

export default StudentTable