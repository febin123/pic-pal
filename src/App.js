
import { useState } from 'react';
import './App.css';
import Post from './Components/Post';

function App() {
  const [post,setPost]=useState([
    {username:"febin1",
     caption:"Learning React1" ,
     imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
    },
    {
      username:"febin2",
      caption:"Learning React2",
       imgUrl:"https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/w/o/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88"

    },
    {
      username:"febin3",
       caption:"Learning React3" ,
       imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hawaii_Creek.jpg/220px-Hawaii_Creek.jpg"

    },
    {
      username:"febin4",
       caption:"Learning React4" ,
       imgUrl:"https://e2k9ube.cloudimg.io/v7/https://edienetlive.s3.eu-west-2.amazonaws.com/wp-content/uploads/sites/2/full_42489.jpg?width=856&height=482&func=crop"

    }
  ])

  return (
    <div className='app'>
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
