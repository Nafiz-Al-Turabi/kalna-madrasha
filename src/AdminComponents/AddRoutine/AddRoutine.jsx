import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const AddRoutine = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            console.error('Please select an image before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Assuming you have an Axios instance (e.g., configured with baseURL and headers)
            const response = await axiosInstance.post('/postroutine', formData);

            if (response.status === 200) {
                console.log('Image uploaded successfully');
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error('Failed to upload image');
                // Handle failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await axiosInstance.get('/routines');
                setRoutines(response.data);
            } catch (error) {
                console.error('Error fetching routines:', error);
                // Handle error, e.g., show an error message to the user
            }
        };

        fetchRoutines();
    }, []);

    return (
        <div>
            <form encType="multipart/form-data" onSubmit={handleUpload}>
                <input type="file" name='image' onChange={handleFileChange} />
                <input type="text" name='name' />
                <button type='submit'>Upload Image</button>
            </form>

            <div>
                <h2>Routine List</h2>
                <ul>
                    {routines.map((routine) => (
                        <li key={routine._id}>
                            <img src={`http://localhost:5000/getimage?path=${routine.path}`} alt={routine.filename} style={{ maxWidth: '500px' }} />
                            <a href={`http://localhost:5000/getimage?path=${routine.path}`} download={routine.filename} >Download</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddRoutine;
