import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

// db
import connectDb from "./database.js";
import {Users, Tasks} from "./taskModel.js"

connectDb();

const port = 3000;
const app = Express();
app.use(Express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));

const saltRounds = 10;

async function findTaskByUsername(username) {
    
}

// register route
app.post("/register", async (req, res) => {
    var {username, password} = req.body;
    username = username.toLowerCase()

    const data = {"username" : username}
    console.log("NORMAL PASSWORD => ", password);
    try {
        const dataExists = await Users.find(data)
        console.log("DATA EXISTS => ", dataExists)
        if (!dataExists[0]) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password: ", err);
                    return res.status(500).json({message : "Error hashing password."})
                } else {
                    const newData = {"username" : username, "password" : hash}
                    console.log("PASSWORD AFTER HASHING => ", hash);
                    try {
                        await Users.create(newData);
                        res.status(201).json({message : "Registered successfully!"}) 
                     } catch (err) {
                         res.status(500).json({message : err.message})
                     }
                }
            });
        } else {
            res.status(500).json({message : "Please try another username or try to login."})
        }
    } catch (err) {
        res.status(500).json({message : err.message});
    }
});

// login route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const data = {"username" : username.toLowerCase()};
    try {
        const dataExist = await Users.find(data);
        console.log("DATA EXISTS => ", dataExist)
        if (dataExist[0]) {
            const hashedPassword = dataExist[0].password;
            bcrypt.compare(password, hashedPassword, (err, valid) => {
                if (err) {
                    return res.status(500).json({message : "Error comparing password!"})
                } else {
                    if (valid) {
                        res.status(201).json({message: 'logged in successfully!'});
                    } else {
                        return res.status(500).json({message : "Incorrect password!"});
                    }
                }
            })
        } else {
            res.status(500).json({message : 'Incorrect Username, try to login'});
        }  
    } catch (err) {
        res.status(500).json({message : err.message});
    }    
})

// route for only displaying the task assigned to them
app.get("/tasks/user/:username", async (req, res) => {
    const username = req.params.username.toLowerCase();
    console.log("USERNAME => ", username);

    try {
        // Find the user by username
        const userExist = await Users.findOne({ username });
        if (userExist) {
            try {
                // Find tasks assigned to the user
                const response = await Tasks.find({ "assigned_user": new RegExp(username, 'i') });
                console.log("RESPONSE DATA => ", response); 
                res.status(200).json(response);
            } catch (error) {
                console.error("Error fetching tasks: ", error);
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error checking user existence: ", err);
        res.status(500).json({ message: err.message });
    }

});

// route for summary report
app.get("/tasks/report", async (req, res) => {
    if (req.query.date) {
        try {
            const response = await Tasks.find({"due_date": req.query.date});
            res.status(200).json(response); 
        } catch (err) {
            res.status(500).json({message : err.message});
        }
    } else if (req.query.user) {
        const username = req.query.user.toLowerCase()
        try {
        // Find the user by username
        const userExist = await Users.findOne({ username });
        if (userExist) {
            try {
                // Find tasks assigned to the user
                const response = await Tasks.find({ "assigned_user": new RegExp(username, 'i') });
                console.log("RESPONSE DATA => ", response); 
                res.status(200).json(response);
            } catch (error) {
                console.error("Error fetching tasks: ", error);
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
        } catch (err) {
            console.error("Error checking user existence: ", err);
            res.status(500).json({ message: err.message });
        }

    } else if(req.query.status) {
        const status = req.query.status;
        try {
            const response = await Tasks.find({"task_status" : status});
            res.status(200).json(response); 
        } catch (err) {
            res.status(500).json({message : err.message});
        }
    }
});

// get all tasks
app.get("/tasks/all", async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
});

// get a particular tasks using Id
app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    console.log("ID => ", id);
    try {
        const task = await Tasks.findById(id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
});

// Post a task
app.post("/tasks/add", async (req, res) => {
    console.log(req.body);
    try {
        await Tasks.create(req.body);
        res.send(req.body);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findByIdAndUpdate(id, req.body);

        if (!task) {
            return res.status(404).json({"message" : "task not found"});
        }
        const updateTask = await Tasks.findById(id);
        res.status(200).json(updateTask);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Tasks.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message : "task not found"});
        }
        res.status(200).json({message : "task deleted successfully"});
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

// Delete all tasks

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
})