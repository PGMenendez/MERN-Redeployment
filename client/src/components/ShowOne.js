import React, {useState, useEffect} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';

const ShowOne = (props) => {
    const [Project, setProject]= useState({});
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");   
    const [url, setUrl] = useState("");  
    const [errors, setErrors] = useState("");

    const [late, setLate]= useState("");
    const [dueDate, setDueDate]= useState("");

   const today =()=> {Date().toLocaleDateString();} 
    
    // const []= useState("");

    useEffect(() =>{
        axios
            .get(`/api/Projects/${props.id}`)
            .then((res) => {
                console.log(res.data);
                setProject(res.data);
                // setHasPegLeg(res.data.hasPegLeg);
                // setHasHookHand(res.data.hasHookHand);
                // setHasEyePatch(res.data.hasEyePatch);
                setName(res.data.name);
                setPosition(res.data.position);
                setUrl(res.data.url);

                setDueDate(res.data.dueDate);
                setLate(res.data.late);
                // setCatchPhrase(res.data.catchPhrase);
                // setTreasure(res.data.treasure);   
            })
    },[])

    const myFunction = (e) => {
        e.preventDefault();
        console.log(`Peg Leg is ${Project.late}`)
        console.log("my function")
        
        //This is where I am trying to verify and or validate today has passed.

        if (Project.hasPegLeg==true){
            Project.hasPegLeg = false;
        }
        else if (Project.hasPegLeg == false){
            Project.hasPegLeg = true;
        }
        // setHasPegLeg(Project.hasPegLeg);
        console.log(`Peg Leg is ${Project.hasPegLeg}`)
        axios
        .put(`/api/Projects/${props.id}`, {

            name: name,
            position: position,
            
            url: url,
            dueDate: dueDate,
            late: late,
        })
        .then((res) => {
            if(res.data.errors){
                setErrors(res.data.errors);
            } else {
                navigate(`/Projects/${res.data._id}`)
            }
        })
        .catch((err)=>console.log(err));
    }
    
    // const myFunctionV2 = (e) => {
    //     e.preventDefault();
    //     console.log(`Peg Leg is ${Project.hasEyePatch}`)
    //     console.log("my function")
    //     if (Project.hasEyePatch==true){
    //         Project.hasEyePatch = false;
    //     }
    //     else if (Project.hasEyePatch == false){
    //         Project.hasEyePatch = true;
    //     }
    //     console.log(`Peg Leg is ${Project.hasEyePatch}`)

    //     axios
    //     .put(`http://localhost:8000/api/Projects/${props.id}`, {

    //         name: name,
    //         position: position,
    //         hasPegLeg: hasPegLeg,
    //         hasEyePatch: hasEyePatch,
    //         hasHookHand: hasHookHand,
    //         url: url,
    //         catchPhrase: catchPhrase,
    //         treasure: treasure
    //     })
    //     .then((res) => {
    //         if(res.data.errors){
    //             setErrors(res.data.errors);
    //         } else {
    //             navigate(`/Projects/${res.data._id}`)
    //         }
    //     })
    //     .catch((err)=>console.log(err));
    // }

    // const myFunctionV3 = (e) => {
    //     e.preventDefault();
    //     console.log(`Peg Leg is ${Project.hasHookHand}`)
    //     console.log("my function")
    //     if (Project.hasHookHand==true){
    //         Project.hasHookHand = false;
    //     }
    //     else if (Project.hasHookHand == false){
    //         Project.hasHookHand = true;
    //     }
    //     console.log(`Peg Leg is ${Project.hasHookHand}`)

    //     axios
    //     .put(`http://localhost:8000/api/Projects/${props.id}`, {

    //         name: name,
    //         position: position,
    //         hasPegLeg: hasPegLeg,
    //         hasEyePatch: hasEyePatch,
    //         hasHookHand: hasHookHand,
    //         url: url,
    //         catchPhrase: catchPhrase,
    //         treasure: treasure
    //     })
    //     .then((res) => {
    //         if(res.data.errors){
    //             setErrors(res.data.errors);
    //         } else {
    //             navigate(`/Projects/${res.data._id}`)
    //         }
    //     })
    //     .catch((err)=>console.log(err));
    // }

    return (
        <div className="wrapper" style={{padding: "0px"}}>
            <h2 className="App-navbar">{Project.name}</h2>
            <div>
                <div className="fiftyFiftySplit">
                    <img src={Project.url} alt="Project Image" width="200" height="100" style={{margin:"10px"}}/>
                    <h2>"{Project.position}"</h2>
                </div>
                
                <div className="fiftyFiftySplit" style={{backgroundColor: "white"}}>
                    <h3>About</h3>
                    <p>Position: {Project.position}</p>
                    
                    <div>
                        <div style={{display: "inline-block"}}>
                            <p>Late: {Project.late ? "yes" : "no"}</p>
                            
                        </div>
                        <div style = {{display: "inline-block"}}>
                            <button onClick={(e) =>myFunction(e)}style={{display: "block", margin: "16px 20px"}} onChange={(e) =>setUrl(e.target.value)}>{Project.url ? "yes" : "no"}</button>
                                                      
                        </div>
                    </div> 
                    <Link to="/">
                        <button className="blueButton">Crew Board</button>
                    </Link>
                </div>
            </div>
            
        </div>
        
    )
}

export default ShowOne;