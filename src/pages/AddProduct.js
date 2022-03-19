import React, { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";

const AddProduct = props => {
    const [image,setImage] = useState()

    const handleChangeImage = e => {
        const image = e.target.files[0]
        console.log(e.target.files);
        const filename = new Date().getTime() + image.name
        const storage = getStorage(app)
        const storageRef = ref(storage, filename)

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', 
        (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImage(downloadURL)
            });
        }
        );

    }

    return(
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">New Product</div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Display Image</div>
                <input type="file" onChange={(e) => handleChangeImage(e)} />
                {image && <img src={image} className=""/>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Preview Image</div>
                <input type="file" onChange={(e) => handleChangeImage(e)} />
                {image && <img src={image} className=""/>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Other Images</div>
                <input type="file" onChange={(e) => handleChangeImage(e)} />
                {image && <img src={image} className=""/>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Name</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="text" />
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Description</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="text" />
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Price</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="number" />
            </div>
            
            <div className="mt-4">
                <select className="text-gray-700 font-semibold p-2">
                    <option className="border px-2 py-1 rounded-sm w-96" value="bed" selected disabled>Category</option>
                    <option className="border px-2 py-1 rounded-sm w-96" value="bed">Bed</option>
                </select>
            </div>
            
            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Stock</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="number" defaultValue={1} min={1}/>
            </div>

            <div className="mt-8">
                <button className="px-4 py-1 bg-cyan-700 text-white rounded-md hover:bg-cyan-900 duration-100">
                    Create
                </button>
            </div>
        </div>
    )

}

export default AddProduct