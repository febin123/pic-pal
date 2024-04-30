import React, { useEffect, useState } from 'react'
import { Button} from '@mui/material';
import { db, storage } from './Firebase';
import firebase from 'firebase/compat/app';

const ImageUpload = ({username}) => {



    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0)
    // const[img,setImg]=useState('')
    // const[imgUrl,setImgUrl] = useState([])
    
    const handleChange =(e)=>{
        if  (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload=()=>{
        console.log(image)
        const uploadTask=storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) *  100
                 );
                setProgress(progress);
    
               },
               (error) => {
                console.log(error);
                alert(error.message);
                },
                () => {
                    storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            // timestamp: firebase.FieldValue.serverTimestamp(),
                            timestamo:firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imgUrl: url,
                            userName: username
                        })
                                setProgress(0);
                                setCaption("");
                                setImage(null);
                    })
                }
    
            )
        // const imgRef=ref(imageDb,`files/${v4()}`)
        // uploadBytes(imgRef,img)


    }
    // useEffect(()=>{
    //     listAll(ref(imageDb,"files")).then(imgs=>{
    //         console.log(imgs)
    //         imgs.items.forEach(val=>{
    //                 getDownloadURL(val).then(url=>{
    //                 setImgUrl(data=>[...data,url])
    //             })
    //         })
            
    //     })
    // },[])
    // console.log(imgUrl,"imgUrl")



  return (
    <div>
        <progress value={progress} max="100"/>
        <input type="text" placeholder='Enter a caption...' value={caption} onChange={e=>setCaption(e.target.value)}/>
        <input type="file" onChange={handleChange}/>
        <Button onClick={handleUpload}>Upload</Button>

        <br />
    </div>
  )
}

export default ImageUpload
