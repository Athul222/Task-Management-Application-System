/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Task = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    console.log("USERNAME => ", username)

    const [taskData, setTaskData] = useState([]);
    
    function handleUpdateBtnClick(id) {
        navigate("/update-task", {state: {id: id}});
    }

    async function handleDeleteBtnClick(id) {
        console.log("ID FROM CLICKING THE HANDLE DELETE BTN => ", id);
        try {
            const response = await axios.delete(`http://localhost:3000/tasks/${id}`)
            console.log("RESPONSE FROM DELETE TASK API => ", response.data);
            if (username === "Admin" || username == "admin") {
                fetchAllUserData()
            } else {
                fetchParticularUserData()
            }
        } catch (err) {
            console.error("ERROR => ", err.message)
        }
    }

    async function fetchParticularUserData() {
        try {
            const response = await axios.get(`http://localhost:3000/tasks/user/${username}`);
            if (response.data) {
                setTaskData(response.data);
                console.log("RESPONSE DATA => ", response.data);
            }
        } catch (err) {
            console.error("ERROR => ", err.message);
        }
    }

    async function fetchAllUserData() {
        try {
            const response = await axios.get(`http://localhost:3000/tasks/all`);
            if (response.data) {
                setTaskData(response.data);
                console.log("RESPONSE DATA => ", response.data);
            }
        } catch (err) {
            console.error("ERROR => ", err.message);
        }
    }

    useEffect(() => {
        if (username === "Admin" || username == "admin") {
            fetchAllUserData()
        } else {
            fetchParticularUserData()
        }
    }, []);

    useEffect(() => {
        console.log("TASK DATA USING USE STATE => ", taskData);  
    }, [taskData]);

  return (
    <>  
        <Link to='/add-task' state={{username:username}}>
            <div className="add-task-container" onClick={() => console.log("Clicked add btn")}>
                <button className="add-task-btn">
                    <p className="add-task-text">Add a new task
                    </p>
                    <span className="material-symbols-outlined">add_circle</span>
                </button>
            </div>
        </Link>

        {
            taskData.length > 0 ?
                taskData.map((task) => (
                    <div className="task-container" key={task._id}>
                        {console.log("TASK ID => ", task._id)}
                        <div className="task-card">
                            <h2>Task Content</h2>
                            <div className="add-update-holder">
                                <button className="update-btn" onClick={() => handleUpdateBtnClick(task._id)}>
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteBtnClick(task._id)}>
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                            <p>Tasks title : {task.task_title}</p>
                            <p>Description : {task.description}</p>
                            <p>Assigned user: {task.assigned_user}</p>
                            <p>Due Date : {task.due_date}</p>
                            <p>Status : {task.task_status}</p>
                            <p>Priority : {task.priority}</p>
                        </div>
                    </div>
                ))

            :
                <div className="heroContainer">
                    <div className="hero-sub-container">
                        <p>No tasks available. Please try creating a new task by clicking the below.</p>
                    </div>
                </div>
        }
    </>
  )
}

export default Task;
