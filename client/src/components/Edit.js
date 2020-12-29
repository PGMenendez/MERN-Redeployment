import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';

const Edit = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [isKing, setIsKing] = useState("");
    const [errors, setErrors] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        axios
            .get(`/api/Projects/${props.id}`)
            .then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setIsKing(res.data.isKing);
                setId(res.data._id);
            })
    },[])

    const addProject = (e) => {
        e.preventDefault();
        axios
            .put(`/api/Projects/${props.id}`, {
                name: name,
                type: type,
                description: description,
                isKing: isKing
            })
            .then((res) => {
                if(res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate(`/Projects/${res.data._id}`);
                }
            })
            .catch((err) => console.log(err));
    }

    return(
        <div>
            <h2>Edit Project Listing</h2>
            <form onSubmit={addProject}>
                <div>
                    <label>Name</label>
                    {errors.name ? (
                        <span>{errors.name.message}</span>
                    ) : null
                    }
                    <input
                        type="text"
                        name="name"
                        value= {name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type</label>
                    {errors.type ? (
                        <span>{errors.type.message}</span>
                    ) : null
                    }
                    <input
                        type="text"
                        name="type"
                        value= {type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    {errors.description ? (
                        <span>{errors.description.message}</span>
                    ) : null
                    }
                    <input
                        type="text"
                        name="description"
                        value= {description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Are they King?</label>
                    {errors.name ? (
                        <span>{errors.name.message}</span>
                    ) : null
                    }
                    <input
                        type="checkbox"
                        name="Are they King?"
                        checked= {isKing}
                        value= {isKing}
                        onChange={(e) => setIsKing(e.target.checked)}
                    />
                </div>
                <button type="submit">Update Project Listing</button>
                <Link to={`/Projects/${id}`} >
                    <button className="blueButton">Cancel Update</button>
                  </Link>
            </form>
        </div>
    )
}

export default Edit;