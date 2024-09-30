import { useState } from "react";
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom";

import Form from "./Form";

const NewTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state.username;
    console.log("USERNAME WHEN NEW TASK BUTTON IS CLICKED => ", userName);
    const [formData, setFormData] = useState({
        "task_title" : "",
        "description" : "",
        "assigned_user" : "",
        "due_date" : "",
        "task_status" : "",
        "priority" : ""
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log("FORM DATA => ", formData);
        await addTask();
        navigate("/tasks/all", {state: {username : userName}})
    }

    async function addTask() {
        // Add task
        try {
            const response = await axios.post("http://localhost:3000/tasks/add", formData)
            console.log("Added DATA => ", response.data)
        } catch (err) {
            console.error("ERROR => ", err.message)
        }
    }

  return (
    <>
        <Form formData={formData} handleFormSubmit={handleFormSubmit} handleChange={handleChange}/>
    </>
  )
}

export default NewTask