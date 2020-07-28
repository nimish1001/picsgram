import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import axios from 'axios';
import {UserContext} from '../App'
const Single=()=>{
    const [item,setItem]=useState([])
    const {state,dispatch} = useContext(UserContext)
    const {id}=useParams()
    const history=useHistory()
    useEffect(()=>{
        axios.get('http://localhost:5000/single/'+id,
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            console.log('hey1111')
            console.log(result)
            console.log(result.data)
            console.log(result.data.posts)
            setItem(result.data.posts)
        })
    },[])
    const likePost = (id)=>{
        axios.put('http://localhost:5000/like',  
            {
                postId:id
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
          }).then(res=>res)
        .then(result=>{
                   console.log(result)
          const newData = result.data
          setItem(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const unlikePost = (id)=>{
    axios.put('http://localhost:5000/unlike',  
        {
            postId:id
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res)
    .then(result=>{
               console.log(result)
      const newData =result.data
      setItem(newData)
    }).catch(err=>{
        console.log(err)
    })
}

const makeComment = (text,postId)=>{
  axios.put('http://localhost:5000/comment',
    {
      postId,
      text
  },{
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  } 
  ).then(res=>res)
  .then(result=>{
      console.log(result.data)
      const newData = result.data
    setItem(newData)
  }).catch(err=>{
      console.log(err)
  })
}

const deletePost = (postId)=>{
  axios.delete('http://localhost:5000/post/'+postId,
  {
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  } ).then(res=>res)
        .then(result=>{
            console.log(result)
            // const newData = item.filter(it=>{
            //     return it._id !== result.data._id
            // })
            // setItem(newData)
            history.push('/profile/my')
        })
}
return (
<div className="home">
    <div className="card home-card">
     <div className="card-image">
       <div >
         <img style={{ padding:"7px", width:"50px",height:"50px",borderRadius:"30px",float:"left"}}
               src={item.postedBy?item.postedBy.pic:"loading"}
                /></div><h5 style={{paddingLeft:"3px",paddingTop:"12px",fontSize:"20px"}}>{item.postedBy?item.postedBy.name:"loading"}
                 
         {item.postedBy?item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right",cursor: "pointer",paddingTop:"9px",paddingRight:"5px"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>:"loading"}           </h5></div>

         <div className="card-image">
             <img src={item.pic}/>
         </div>
         <div className="card-content input-field">
         
         {item.likes?(item.likes.includes(state._id)
                            ? 
                            <i className="material-icons li" style={{color:"red"}}  onClick={()=>{unlikePost(item._id)}}>favorite</i>
                            : 
                            <i className="material-icons li" style={{color:"black"}}  onClick={()=>{likePost(item._id)}}>favorite</i>)
                           :console.log('nope') }
         <br/>{item.likes?item.likes.length:"loading"} likes<br/>
            <h6 >{item.caption}</h6>   

            <h6 style={{fontWeight:"500",color:"#81858a"}}> {item.comments?item.comments.length:"loading"} Comments</h6>   
            { item.comments?
                                    item.comments.map(record=>{
                                        return(
                                          <div>
                                        <h6 key={record._id}><span style={{fontWeight:"500",color:"blue"}}>{record.postedBy.name}: </span>{record.text}</h6>
                    
                                        </div>
                                        )
                                    }):"loading"
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
             
         </div>
     </div> 
     
       
        
)
</div>
  )}



export default Single