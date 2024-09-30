import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./Form"

const UpdateTask = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id;
    
    const [formData, setFormData] = useState({
        "task_title" : "",
        "description" : "",
        "assigned_user" : "",
        "due_date" : "",
        "task_status" : "",
        "priority" : ""
    })

    useEffect(() => {
        async function getTaskById() {
            const response = await axios.get(`http://localhost:3000/tasks/${id}`)
            console.log("RESPONSE FROM THE GET A PARTICULAR TASK => ", response.data)
            setFormData(response.data);
        }
        getTaskById();
    }, [id]); 

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    async function updateTask() {
        try {
            const response = await axios.put(`http://localhost:3000/tasks/${id}`, formData)
            console.log("Added DATA => ", response.data)
        } catch (err) {
            console.error("ERROR => ", err.message)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log("FORM DATA => ", formData);
        await updateTask();
        navigate("/tasks/all")
    }

  return (
    <>
        <Form formData={formData} handleFormSubmit={handleFormSubmit} handleChange={handleChange}/>
    </>
  )
}

export default UpdateTask