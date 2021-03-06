import React, { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import useForm from "../hooks/useForm";
import { useToken } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { addProduct, editProduct } from "../apiCalls/product.apiCall";
import {RotatingLines} from 'react-loader-spinner'

const AddProduct = ({
    _id, 
    displayImg,
    previewImg,
    otherImgs,
    title,
    desc,
    stock,
    price,
    cost,
    category
}) => {

    const navigate = useNavigate()
    const token = useToken()
    const [isLoading, setIsLoading] = useState({
        displayImg: false,
        previewImg: false,
        otherImgs: []
    })

    const [product, setProduct, clearProduct] = useForm(_id? 
        {
            displayImg: displayImg,
            previewImg: previewImg,
            otherImgs: otherImgs,
            title: title,
            desc: desc,
            price: price,
            cost: cost,
            category: category,
            stock: stock
        }:
        
        {
            displayImg: '',
            previewImg: '',
            otherImgs: [],
            title: '',
            desc: '',
            price: 0,
            cost: 0,
            category: 'beds',
            stock: 1
        })

    const handleChangeImage = e => {
        console.log(e.target);
        let imagesToUpload = Array.from(e.target.files)
        setIsLoading((isLoading) => ({...isLoading, [e.target.name]: true}))     
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
                    setIsLoading((isLoading) => ({...isLoading, [e.target.name]: false}))                     
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

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        
        if(_id){
            await editProduct(token, _id, product)
            console.log("edit Product");
        }
        else{
            await addProduct(token, product)
        }
        setIsLoading(false)
        navigate('/products')
    }

    return(
        <div className="p-6 shadow-xl bg-white rounded-lg">
            <div className="text-2xl font-bold">{_id? 'Edit Product' :'New Product'}</div>

            <form>
                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Display Image</div>
                    <label className="inline-block cursor-pointer">
                        <input type="file" name="displayImg" className="hidden" onChange={(e) => handleChangeImage(e)} />
                        <div className="py-2 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg w-fit duration-100 flex">
                            {isLoading.displayImg && <RotatingLines width="20" strokeColor="white"/>}
                            {!isLoading.displayImg && <svg className="w-6 h-6 inline-block" fill="none" stroke="white" viewBox="0 0 24 24" xmns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>}
                            <span className="text-white duration-100 ml-2">Upload Image</span>
                        </div>
                    </label>
                    {product.displayImg && <div className="relative max-w-sm  mt-4">
                        <img src={product.displayImg} />
                        <svg 
                            onClick={() => setProduct({target: {name: 'displayImg', value: ''}})}
                            className="w-6 h-6 top-2 right-2 absolute cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>}
                </div>

                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Preview Image</div>
                    <label className="inline-block cursor-pointer">
                        <input type="file" name="previewImg" className="hidden" onChange={(e) => handleChangeImage(e)} />
                        <div className="py-2 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg w-fit flex">
                            {isLoading.previewImg && <RotatingLines width="20" strokeColor="white"/>}
                            {!isLoading.previewImg && <svg className="w-6 h-6 inline-block" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>}
                            <span className="text-white ml-2">Upload Image</span>
                        </div>
                    </label>
                    
                    {product.previewImg && <div className="relative max-w-sm mt-4">
                        <img src={product.previewImg} />
                        <svg 
                            onClick={() => setProduct({target: {name: 'previewImg', value: ''}})}
                            className="w-6 h-6 top-2 right-2 absolute cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>}
                </div>

                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Other Images</div>
                    <label className="cursor-pointer inline-block">
                        <input type="file" className="hidden" name="otherImgs" onChange={(e) => handleChangeImage(e)} multiple/>
                        <div className="py-2 px-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
                            <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            <span className="text-white">Upload Images</span>
                        </div>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            product.otherImgs.map((img, i) => (
                            <div className="relative max-w-sm mt-4">
                                <img src={img} key={i}/>
                                <svg 
                                    onClick={() => removeImage(img)}
                                    className="w-6 h-6 top-2 right-2 absolute cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>))
                        }
                    </div>
                </div>

                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Name</div>
                    <input className="border px-2 py-1 rounded-sm w-96" name="title" onChange={(e) => setProduct(e)} value={product.title} type="text" />
                </div>

                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Description</div>
                    <textarea rows="10" className="border px-2 py-1 rounded-sm w-96" name="desc" onChange={(e) => setProduct(e)} value={product.desc} type="text" />
                </div>

                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Price</div>
                    <input className="border px-2 py-1 rounded-sm w-96" name="price" onChange={(e) => setProduct(e)} value={product.price} type="number" />
                </div>

                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Cost</div>
                    <input className="border px-2 py-1 rounded-sm w-96" name="cost" onChange={(e) => setProduct(e)} value={product.cost} type="number" />
                    <pre className="text-gray-500 font-semibold">This field will not be shown to the users.</pre>
                </div>
                
                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Category</div>
                    <select className="text-gray-700 font-semibold p-2" name="category" value={product.category} onChange={(e) => setProduct(e)}>
                        <option className="border px-2 py-1 rounded-sm w-96" value="beds">Bed</option>
                        <option className="border px-2 py-1 rounded-sm w-96" value="chairs">Chair</option>
                        <option className="border px-2 py-1 rounded-sm w-96" value="sofas">Sofa</option>
                        <option className="border px-2 py-1 rounded-sm w-96" value="pillows">Pillow</option>
                        <option className="border px-2 py-1 rounded-sm w-96" value="tables">Table</option>
                    </select>
                </div>
                
                <div className="mt-4">
                    <div className="text-gray-700 font-semibold mb-2">Stock</div>
                    <input className="border px-2 py-1 rounded-sm w-96" type="number" name="stock" onChange={(e) => setProduct(e)} value={product.stock} min={1}/>
                </div>

                <div className="mt-8">
                    <button 
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 duration-100">
                        {_id? 'Edit':'Create'}
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AddProduct