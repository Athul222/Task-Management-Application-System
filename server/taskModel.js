import mongoose from "mongoose";

// Schema
/*
 Title
 Description
 Due Date
 Status (To Do, In Progress, Completed)
 Assigned User
 Priority (Low, Medium, High)
*/ 

const TaskSchema = mongoose.Schema(
    {
        task_title: {
            type: String,
            required : [true, "Please enter the Task title: "],
        },

        description: {
            type: String,
            required : [true, "Please enter the Task description: "],
        },

        due_date: {
            type : String, 
            required : [true, "Enter the task due date in the following format (yyyy-mm-dd): "],
        },

        task_status: {
            type: String, 
            required : [true, "Enter the task status from (To Do, In Progress, Completed) : "],
        },

        assigned_user: {
            type: String,
            required : [true, "Enter the assigned user name: "],
        },

        priority: {
            type: String,
            required : [true, "Enter the task priority from (Low, Medium, High): "],
        },
    },
    {
        Timestamp: true
    }
);

const Tasks = mongoose.model("Tasks", TaskSchema);

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required : [true, "Please enter the username"]
        },
        password: {
            type: String,
            required : [true, "Please enter your password"]
        },
    },
    {
        Timestamp: true
    }
);

const Users = mongoose.model("Users", UserSchema);

export {Tasks, Users};