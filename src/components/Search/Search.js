import { useState } from "react";
import { InputGroup, Input,Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchStudents } from "../../global/studentSlice";
import { useNavigate } from "react-router-dom";


function Search() {
    const [name,setName] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleSearch(){
        dispatch(searchStudents({
            name: name,
            orderBy: null
        }))
        navigate("/search/" + name)
    }
    const { entities, loading, totalPages } = useSelector((state) => state.students);
    

    return <InputGroup style={{minWidth: "20vw", maxWidth: "500px"}} >
        <Input value={name} onChange={(e)=>{setName(e.target.value)}} onKeyDown={(e)=>{
            if (e.key == "Enter"){
                handleSearch()
            }}}/>
        <Button onClick={handleSearch}>
            Search
        </Button>
    </InputGroup>
}

export default Search;