/* eslint-disable react/prop-types */

const Form = (props) => {
  return (
    <>
        <div className="loginContainer">
            <h2>Add a new task</h2>
            <form onSubmit={props.handleFormSubmit}>
                <div className='formContainer'> 
                    <div>
                        <label className="form-label">Enter task title </label>
                        <input className="form-control" type="text" name="task_title" value={props.formData.task_title} onChange={props.handleChange} />
                    </div>
                    
                    <div> 
                        <label className="form-label" >Enter the description for the task </label>
                        <input className="form-control" type="text" name="description" value={props.formData.description} onChange={props.handleChange} />
                    </div>

                    <div> 
                        <label className="form-label" >Enter the Name of assigned user for the task </label>
                        <input className="form-control" type="text" name="assigned_user" value={props.formData.assigned_user} onChange={props.handleChange} />
                    </div>

                    <div> 
                        <label className="form-label" >Enter the due date for the task </label>
                        <input className="form-control" type="text" name="due_date" value={props.formData.due_date} onChange={props.handleChange} />
                    </div>

                    <div> 
                        <label className="form-label" >Enter the status of the task </label>
                        <input className="form-control" type="text" name="task_status" value={props.formData.task_status} onChange={props.handleChange} />
                    </div>

                    <div> 
                        <label className="form-label" >Enter the priority of the task </label>
                        <input className="form-control" type="text" name="priority" value={props.formData.priority} onChange={props.handleChange} />
                    </div>

                    <input className="btn btn-primary login-submit-btn" type="submit" value="Add"/>

                </div>
            </form>
        </div>
    </>
  )
}

export default Form