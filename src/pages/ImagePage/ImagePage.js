import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { uploadImage, getImages } from "../../global/studentSlice";
import { Table, Link, Button } from "reactstrap";
import axios from "axios";


function ImagePage() {
    const { images, status, entities } = useSelector((state) => state.students)
    const { id } = useParams();
    const dispatch = useDispatch();

    const [imagesList, setImagesList] = useState()
    // const [newImage, setNewImage] = useState([])

    const [files, setFiles] = useState([]);

    function handleChange(e) {
        setFiles(e.target.files)
    }

    function handleSave(e) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }
        try {
            dispatch(uploadImage({ id, formData }));
        } catch (error) {
            console.error("Error uploading files", error)
        }

    }

    useEffect(() => {
        dispatch(getImages(id))
    }, [id,status])

    // useEffect(() => {
    //     if (status == 201) {
    //         setNewImage([])
    //         for (let i = 0; i < files.length; i++) {
    //             const imgageObjectUrl = URL.createObjectURL(files[i]);
    //             setNewImage(prev => ([...prev, imgageObjectUrl]));
    //         }
    //     }
    // }, [files,status]);


    const fetchImage = async (imageUrl) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/student/images/${imageUrl}`, {
                responseType: 'blob'
            });
            const imgageObjectUrl = URL.createObjectURL(response.data)
            setImagesList(prev => ({ ...prev, [imageUrl]: imgageObjectUrl }))
        } catch (error) {
            console.error("Error fetching files", error)
        }
    }


    useEffect(() => {
        if (images) {
            images.forEach(image => fetchImage(image.imageUrl))
        }
    }, [images])


    return <div>
        <h1>Id: {id}</h1>
        <form onSubmit={e => {
            e.preventDefault()
            handleSave(e)
        }}>
            <input type="file" multiple name="files" onChange={(e) => handleChange(e)} />
            <input type="submit" value="Save" />
        </form>

        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    images && imagesList && images.map((image, index) => (
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>
                                <img src={imagesList[image.imageUrl]} />
                            </td>
                        </tr>
                    ))
                }
                {/* {
                    newImage.map((image, index) => (
                        <tr key={index}>
                            <th scope="row">{images.length + index + 1}</th>
                            <td>
                                <img src={image} />
                            </td>
                        </tr>
                    ))
                } */}
            </tbody>
        </Table>
    </div>
}

export default ImagePage