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
        console.log(e.target);
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
                    value: e.target.name === 'otherImgs'? [...product.otherImgs, ...images] : images[0]
                }
            }
            setProduct(newImage)
        })
    }

    const removeImage = (image) => {
        const images = product.otherImgs

        const i = images.indexOf(image)
        if(i !== -1){
            images.splice(i, 1)
        }

        const otherImgs = {
            target:{
                name: 'otherImgs',
                value: images
            }
        }

        setProduct(otherImgs)
    }

    return(
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">New Product</div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Display Image</div>
                <label className="inline-block cursor-pointer">
                    <input type="file" name="displayImg" className="hidden" onChange={(e) => handleChangeImage(e)} />
                    <div className="py-2 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg w-fit duration-100 ">
                        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <span className="text-white duration-100">Upload Image</span>
                    </div>
                </label>
                {product.displayImg && <div className="relative inline-block mt-4">
                    <img src={product.displayImg} />
                    <svg 
                        onClick={() => setProduct({target: {name: 'displayImg', value: ''}})}
                        className="w-6 h-6 top-0 right-0 absolute cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Preview Image</div>
                <label className="inline-block cursor-pointer">
                    <input type="file" name="previewImg" className="hidden" onChange={(e) => handleChangeImage(e)} />
                    <div className="py-2 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg w-fit ">
                        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <span className="text-white">Upload Image</span>
                    </div>
                </label>
                
                {product.previewImg && <div className="relative inline-block mt-4">
                    <img src={product.previewImg} />
                    <svg 
                        onClick={() => setProduct({target: {name: 'previewImg', value: ''}})}
                        className="w-6 h-6 top-0 right-0 absolute cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>}
            </div>

            <div className="mt-4">
                <div className="text-gray-700 font-semibold mb-2">Other Images</div>
                <label className="cursor-pointer inline-block">
                    <input type="file" className="hidden" name="otherImgs" onChange={(e) => handleChangeImage(e)} multiple/>
                    <div className="py-2 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
                        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <span className="text-white">Upload Images</span>
                    </div>
                </label>
                <div>
                    {
                        product.otherImgs.map((img, i) => (
                            <div className="relative inline-block mt-4">
                            <img src={img} key={i}/>
                            <svg 
                                onClick={() => removeImage(img)}
                                className="w-6 h-6 top-0 right-0 absolute cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>))
                    }
                </div>
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
                <div className="text-gray-700 font-semibold mb-2">Cost</div>
                <input className="border px-2 py-1 rounded-sm w-96" type="number" />
                <pre className="text-gray-500 font-semibold">This field will not be shown to the users.</pre>
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
                <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 duration-100">
                    Create
                </button>
            </div>
        </div>
    )

}

export default AddProduct