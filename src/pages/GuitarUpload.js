import "./GuitarUpload.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";


function GuitarUpload() {

    const [resultRequest, setResultRequest] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [deleted, setDeleted] = useState(false);

    const {register, formState: {errors}, handleSubmit} = useForm();

    const token = localStorage.getItem("token");

    async function addGuitar(data) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("brand", data.brand);
        formData.append("model", data.model);
        try {
            await axios({
                method: "post",
                url: "http://localhost:8080/guitars/create",
                data: formData,
                headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`},
            });
            setSuccessMessage("guitar geupload");
        } catch (e) {
            console.error(e.response.data);
            setErrorMessage("Deze gitaar is al toegevoegd!");
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        },2000)
    }

    useEffect(() => {

        async function fetchRequests() {
            try {
                const response = await axios.get(`http://localhost:8080/requests/get`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setResultRequest(response.data);
                setDeleted(false);
            } catch (e) {
                console.error(e.response.data)
                fetchRequests();
            }
        }

        fetchRequests();
    }, [deleted])


    async function deleteRequest(id) {
        try {
            await axios.delete(`http://localhost:8080/requests/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setDeleted(true);
        } catch (e) {
            console.log("hier gaat het foet");
            console.error(e);
            deleteRequest(id);
        }
    }


    function onFormSubmit(data) {
        addGuitar(data)
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    function handleClick(id) {
        deleteRequest(id);
    }

    return (
        <>
            <div className="form-container">
                <form id="form" onSubmit={handleSubmit(onFormSubmit)}>
                    <h2>Gitaar toevoegen</h2>
                    <label htmlFor="details-brand">
                        Merk:
                        <input
                            type="text"
                            id="details-brand"
                            {...register("brand", {
                                required: "Het veld is leeg!",
                            })}
                        />
                        {errors.brand && (
                            <p className="error-message">{errors.brand.message}</p>
                        )}
                    </label>
                    <label htmlFor="details-model">
                        Model:
                        <input
                            type="text"
                            id="details-model"
                            {...register("model", {
                                required: "Het veld is leeg!",
                            })}
                        />
                        {errors.model && (
                            <p className="error-message">{errors.model.message}</p>
                        )}
                    </label>
                    <label htmlFor="details-image">
                        Foto:
                        <input
                            type="file"
                            accept="image/*"
                            id="details-image"
                            {...register("image",{
                                required: "Geen foto geselecteerd!",
                            })}
                            onChange={handleFileSelect}
                        />
                        {errors.image && (
                            <p className="error-message">{errors.image.message}</p>
                        )}
                    </label>
                    <button className="button" type="submit">Toevoegen</button>
                    {errorMessage && (<p className="error-message">{errorMessage}</p>)}
                    {successMessage && (<p>{successMessage}</p>)}
                </form>
            </div>
            <div>
                <section>
                    <article className="tile-content">
                        <h2>Requests</h2>
                    </article>
                    <article className="tile-container">
                        {resultRequest ? resultRequest.map((request) => {
                            return <div key={request.timeStamp} className="mydivouter">
                                <div className="review-container">
                                    <h2>{request.brand}</h2>
                                    <p>{request.model}</p>
                                    <button className="mybuttonoverlap" type="button"
                                            onClick={(() => handleClick(request.id))}>delete
                                    </button>
                                </div>
                            </div>
                        }) : <p>Loading ...</p>}
                    </article>
                </section>
            </div>
        </>
    );
}

export default GuitarUpload;