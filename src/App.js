import * as React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import { db,auth  } from './Components/Firebase';
import { Button,Input} from '@mui/material';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import ImageUpload from './Components/ImageUpload';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const [post,setPost]=useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')

  const[user,setUser]=useState(null)
  const[openSignIn,setOpenSignIn]=useState(false)


  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
          console.log(authUser)
          setUser(authUser)

          if(authUser.displayName){

          }else{
            return authUser.updateProfile({
              displayName:username
            })
          }
      }else{
        setUser(null)
      }
    })

    return()=>{
      unsubscribe()
    }
  },[user,username])


  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPost(snapshot.docs.map(doc=>doc.data()))
    })
  },[])

  const signUp=(event)=>{
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message))
    setOpen(false)
  }

  const signIn=(event)=>{
    event.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignIn(false)
  }


  return (
    <div className='app'>

            {user?.displayName ? (
              <ImageUpload username={user?.displayName}/>
            ) : (<h3>Sorry you need to login</h3>)}
            
        

            {user ? (<Button onClick={()=>auth.signOut()}>Logout</Button>):

            ( <div className="app__loginContainer">
            <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={()=>setOpen(true)}>Sign Up</Button>
            </div> )}
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='app__signup'>
          <center>
          <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
          </center>
          <Input placeholder="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <Input placeholder="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='app__signup'>
          <center>
          <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
          </center>
       
          <Input placeholder="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>


      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
      </div>

     


      {
          post.map(pos=>
            <Post username={pos.username} caption={pos.caption} imgUrl={pos.imgUrl}/>
        )
      }
      
   
  
    </div>
  );
}

export default App;
