import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'
// console.log("loaded new.js")

// console.log("load here?");
const New = (props) => {
    // console.log("load here?");

    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [url, setUrl] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [nameError, setNameError] = useState("");

    // console.log("load here?");
    const addProject = (e) => {
        e.preventDefault();
        axios
            .post("/api/Projects/", {
                name: name,
              
                dueDate: dueDate, 
            })
            .then((res) => {
                console.log(res.data);
                if(res.data.error){
                    setErrors(res.data.error.errors);
                } else {
                    navigate(`/`);
                }
            })
            .catch((err) => console.log(err));
    }

    const goHome = (e) => {
        navigate(`/`);
    }

//FRONT END VALIDATION OF FIELD
    const validateName = (e) => {
        // set is asynchronous
        if (e.target.value.length < 3) {
            setNameError("Name must be at least 3 characters long");
        } else {
            setNameError("");
        }
        setName(e.target.value);  
    }
  
    return (
        <div >
            <div >
                <h2>Project Manager</h2>
                <button 
                type="submit" 
                onClick = {(e) => goHome(e)} 
                className="blueButton" 
                className="linkButton" 
                style={{margin:"0px 5px 0px 400px"}}>
                    Back to Dashboard
                </button>
            </div>

            <div>
                <h3>Plan a New Project</h3>

                <form onSubmit={addProject}>
                    <div className="projectCard"> 
                        <div style={{margin: "5px"}}>
                            <div>
                                <label style= {{display: "inline-block"}, {margin: "0px 12px 5px 5px"}}>Project Name</label>
                            
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={ validateName }
                                    style={{width: "200px"}}
                                />
                            </div>
                              {errors.name ? (
                                <span className="errorFont" style={{display: "block"}}>{errors.name.message}</span>
                            ) : null
                            }
                             {nameError !== "" ? (
                                    <p className="errorFont" style={{display: "block"}}>{nameError}</p>
                                ) : null
                                } 
                        </div>

                        <label style= {{display: "inline-block"},{margin: "0px 40px 5px 5px"}}>
                            Due Date</label>
                        <input
                                type="date"
                                name="dueDate"
                                onChange={(e) => setDueDate(e.target.value)}
                                style={{display: "inline-block"}, {margin: "0% 10%"}, {width: "200px"}}
                        
                        />
                        {errors.dueDate ? (
                                <span className="errorFont" style={{display: "block"}}>{errors.dueDate.message}</span>
                            ) : null
                            }

                        <button type="submit" onClick = {(e) => addProject(e)} className="blueButton" style={{margin:"40px 0px"}, {width: "300px"}}>
                            Plan Project
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
    
}

export default New;