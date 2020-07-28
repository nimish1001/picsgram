import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import {UserContext} from '../App'
import { useParams, Link ,useHistory} from 'react-router-dom';


const Profile=()=>{
    const {state,dispatch} = useContext(UserContext)
    const history=useHistory()
    const [data,setData]=useState([])
    const[userDetail,setUserDetail]=useState([])
    const user=JSON.parse(localStorage.getItem("user"));
    const {userid}=useParams()
    useEffect(()=>{
        if(userid!=='my') {
            axios.get('http://localhost:5000/profile/'+userid,
      
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            if(result.data.posts.length)
            {
              setData(result.data.posts)
              setUserDetail(result.data.user[0])
            }
            else{
                setData([])
                setUserDetail(result.data.user[0])

            }
        })
    }
    else{
        axios.get('http://localhost:5000/profile/'+user._id,
       
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            // setData(result.data.posts)
            // console.log(result.data.user[0].pic)
            if(result.data.posts.length)
            {
              setData(result.data.posts)
              setUserDetail(result.data.user[0])
            }
            else{
                setData([])
                setUserDetail(result.data.user[0])

            }
            
        })
    }
    },[userid,userDetail])

    const followUser = ()=>{
        axios.put('http://localhost:5000/follow',
        // body:JSON.stringify(
          {
            followId:userid
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(data=>{
                console.log(data)
                userDetail.followers.length+=1
        })
    }
    const unfollowUser = ()=>{
        axios.put('http://localhost:5000/unfollow',
        // body:JSON.stringify(
          {
            unfollowId:userid
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(data=>{
                console.log(data)
                userDetail.followers.length-=1
        })
    }

    const updatePic = ()=>{
        history.push('/updatePic')
  }

    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
           margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            
      
        <div style={{
            display:"flex",
            justifyContent:"space-around",
           
        }}>
            <div>
                <img style={{width:"120px",height:"120px",borderRadius:"60px"}}
                src={userDetail.pic}
                />
            </div>
            <div>
    <h4>{userDetail.name}</h4>
                {/* <h5>{userDetail.email}</h5> */}
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{(data).length} posts</h6>
                    <h6>{userDetail.followers?userDetail.followers.length:"loading"} followers</h6>
                    <h6>{userDetail.followers?userDetail.following.length:"loading"} following</h6>
                </div>
                {userid !=='my' && userid!==user._id?(userDetail.followers?(userDetail.followers.includes(state._id)?   
                <button style={{
                            margin:"10px",
                            color:"black",
                            width:"300px",
                            backgroundColor:"#e6e9ed",
                            }} className="btn "
                             onClick={()=>unfollowUser()}
                             >
                                 Unfollow
                             </button>:  <button style={{
                                margin:"10px",
                                color:"black",
                                width:"300px",
                                backgroundColor:"#e6e9ed",
                            }} className="btn "
                             onClick={()=>followUser()}
                             >
                                 Follow
                             </button>):"loading"): 
                             <button style={{
                                margin:"10px",
                                color:"black",
                                width:"300px",
                                backgroundColor:"#e6e9ed",
                            }} className="btn "
                             onClick={()=>updatePic()}
                             >
                                 Update Profile Picture
                             </button>}
                                   
                          
            </div>
        </div>
    
         </div>      
        <div className="gallery">{
        data.map(item =>{return(
                    <Link to={"/single/"+item._id } className="item"><img key={item._id} className="itemx" src={item.pic} alt={item.title}/></Link>
            
        )})
}
        </div>
    </div>
    )
}


export default Profile