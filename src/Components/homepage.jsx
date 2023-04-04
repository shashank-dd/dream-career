import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css'
import axios from "axios";
function HomePage() {

    const [dta, setdta] = useState([])
    const [ta, setta] = useState([])
    const [name, setname] = useState("")
    const [fl, setfl] = useState(1)
    const [form, setform] = useState({label:"",url:"",name:""})
    const [fo, setfo] = useState({passward:"",userid:"",label:""})
    const [flag, setflag] = useState(false)
    const [noti, setnoti] = useState(false)

    let navigate = useNavigate()
    useEffect(() => {
        axios.post("http://localhost:8080/data/data", { token: window.localStorage.getItem("token") }).then(response => {
            console.log(response.data.dat)
            setdta(response.data.dat)
            console.log("dta", dta)
            setname(response.data.user)
            setform({...form,name:response.data.user})
           setfo({...fo,userid:response.data.userid})
            setta(response.data.dat)
        }).catch(error => { console.log(error) })
    }, [fl])
    const onchangehandler = (e) => {
        if (e.target.value === "") {
            setta(dta)

            return
        }
        const search = dta.filter(item => item.label.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
        setta(search)
    }
    let logoutHandler = () => {
        console.log(1)
        window.localStorage.removeItem('token')

        navigate("/")
    }
   async function subhandle(){
    try {
        console.log("uu",form)
        const data = await axios.post("http://localhost:8080/data/post", form)
        console.log(data)
        if (data.data.ok === "ok") {
            setfl((e)=>e+1)
            setflag((h)=>!h)

          
        }
    } catch (err) {
        console.log("err",err)
    }
       
    }
    async function hand(){
        try {
            console.log("uu",fo)
            const data = await axios.post("http://localhost:8080/data/delete", fo)
            console.log(data)
            if (data.data.Status === "ok") {
                setfl((e)=>e+1)
              setnoti(false)
              
            }
        } catch (err) {
            console.log("err",err)
        }
           
        }
    return (
        <div className='homepage'>
            <div className='header'> <div className='user'>{name}</div> <div><input onChange={onchangehandler} className='search' type='text' placeholder='search by label name'></input></div><div className='add' onClick={()=>{
                setflag((h)=>!h)
            }}>ADD PHOTO</div><div className='log' onClick={logoutHandler}>Logout</div></div>
          <div className='container'>  {ta && ta.map((ele) => {
                return <div className='card'><img src={ele.url} className='image'></img><div className='onhover' ><label>{ele.label}</label><button onClick={()=>{
                    console.log(123,fo)
                    setnoti(true)
                    setfo({...fo,label:ele.label})
                }}>Delete</button></div> </div>
            })}</div> 
            {
                flag&&<div className='back'><div className='pop'> <h2>Add new photo</h2>
                <div><label>Label</label><div><input className='in' type='text' placeholder='label' onChange={(e)=>{setform({...form,label:e.target.value}) }}></input></div></div>
                <div><label>Photo URL</label><div><input className='in' type='text' onChange={(e)=>{setform({...form,url:e.target.value}) }} placeholder='https://feeds.abplive.com/onecms/images/uploaded-images'></input></div></div>
                <div className='fl'> <button onClick={()=>{
                     setflag((h)=>!h)
                    
                }}>cancel</button> <button onClick={subhandle}>submit</button></div>
                </div></div> 
            }
            {
                noti&& <div className="back"><div className='del'> <p>Are you sure?</p>
                <label>Enter passward</label>
                <input type='text' placeholder='passward' onChange={(e)=>{
                    setfo({...fo,passward:e.target.value})
                }}></input>
                <button onClick={()=>{setnoti(false)}}>cancel</button><button onClick={hand}>delete</button>
                </div></div>
            }

        </div>
    )
}
export default HomePage;