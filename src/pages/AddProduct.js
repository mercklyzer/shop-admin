import React, { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import useForm from "../hooks/useForm";

const AddProduct = props => {
    const [product, setProduct, clearProduct] = useForm({
        displayImg: '',
        previewImg: '',
        otherImgs: [],
        title: '',
        desc: '',
        price: 0,
        category: '',
        stock: 0
    })


    const handleChangeImage = e => {

        let imagesToUpload = Array.from(e.target.files)
        const storage = getStorage(app)
        const promises = []

        imagesToUpload.forEach(img => {
            const filename = new Date().getTime() + img.name
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, img);
    
            const prom = new Promise((fulfill, reject) => {
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
                    reject(error)
                }, 
                async () => {
                    // Handle successful uploads on complete
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    console.log('File available at', downloadURL);
                        
                    fulfill(downloadURL)
                });
            })

            promises.push(prom)
        })

        Promise.all(promises)
        .then(images => {
            let newImage = {
                target: {
                    name:e.target.name,
                    value: e.target.name === 'otherImgs'? images : images[0]
                }
            }
            setProduct(newImage)
        })
    }

    return(
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">New Product</div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Display Image</div>
                <input 
                    type="file" 
                    name="displayImg"
                    onChange={(e) => handleChangeImage(e)} 
                />
                {product.displayImg && <img src={product.displayImg} className=""/>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Preview Image</div>
                <input type="file" name="previewImg" onChange={(e) => handleChangeImage(e)} />
                {product.previewImg && <img src={product.previewImg} className=""/>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Other Images</div>
                <input type="file" name="otherImgs" onChange={(e) => handleChangeImage(e)} multiple/>
                {
                    product.otherImgs.map((img, i) => <img src={img} key={i}/>)
                }
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
            1
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