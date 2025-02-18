import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const uploadImage = () => {

      const { aToken, backendUrl } = useContext(AdminContext)
      const [image, setImage] = useState(false)
    

    const handleImageUpload = async (e) => {
       
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/upload-image', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (data.success) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <div>
            <h1>Upload Image</h1>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
            <button onClick={handleImageUpload}>Upload</button>
        </div>
    )
}

export default uploadImage