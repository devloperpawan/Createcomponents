import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [Data,setData] = useState(
    {
      uname: "",
      upassword: "",
      uphone: "",
      umessage: "",
      Index: "",
    }
  )

  const [userData,setUserData] = useState([])

  let getData = (event) =>{
    let oldData = {...Data}
    let inputname = event.target.name;
    let inputValue = event.target.value;
    oldData[inputname] = inputValue
    setData(oldData)
  }

  let handleData=(event)=>{
    event.preventDefault()
    let currentuserFormData = {
      uname: Data.uname,
      upassword: Data.upassword,
      uphone: Data.uphone,
      umessage: Data.umessage,  
    }

    if(Data.Index===""){
    let checkfilter=userData.filter((v)=>v.uphone==Data.uphone || v.uname==Data.uname)

    if(checkfilter.length==1){
      toast.error("Your phone number and name is same.")
    }

    else{
    let oldUserData = [...userData,currentuserFormData]
    setUserData(oldUserData) 
    setData(
      {
        uname: "",
        upassword: "",
        uphone: "",
        umessage: "",
        Index: "",
      }
    )
  }
}
else{
  let IndexNum = Data.Index
  let checkfilter=userData.filter((v,i)=>(v.uphone==Data.uphone || v.uname==Data.uname) && (i!=IndexNum))

  if(checkfilter.length==0){
  let oldData = userData
  oldData[IndexNum]['uname'] = Data.uname
  oldData[IndexNum]['upassword'] = Data.upassword
  oldData[IndexNum]['uphone'] = Data.uphone
  oldData[IndexNum]['umessage'] = Data.umessage

  setUserData(oldData)

  setData(
    {
      uname: "",
      upassword: "",
      uphone: "",
      umessage: "",
      Index: "",
    }  
  )
}
else{
  toast.error("Your phone number and name is same.")
}
}
  }

  function deleteRow(indexNumber){
    toast.success("Data delete")
    let AfterDeleteValue = userData.filter((v,i)=>i!=indexNumber)
    setUserData(AfterDeleteValue)
  }

  function editData(indexNumber){
    let updatenewData = userData.filter((v,i)=>i==indexNumber)[0]
    // console.log(updatenewData)
    updatenewData['Index'] = indexNumber;
    // console.log(updatenewData)
    setData(updatenewData)
  }
  return (
    <>
      <div className="container">
      <ToastContainer/>
      {userData.length}
        <form onSubmit={handleData}>
        <div className='col-lg-13'>
          <div className="text-start col-lg-6 my-3">
            <label>UserName</label>
            <input type="text" onChange={getData} className='form-control' value={Data.uname} name="uname"/>
          </div>
          <div className="text-start col-lg-6 my-3">
            <label>Password</label>
            <input type="password" onChange={getData} className='form-control' value={Data.upassword} name = "upassword"/>
          </div>
          <div className="text-start col-lg-6 my-3">
            <label>Phone</label>
            <input type="text" onChange={getData} className='form-control' value={Data.uphone} name = "uphone"/>
          </div>
          <div className="text-start col-lg-6 my-3">
            <label>Message</label>
            <textarea name="umessage" onChange={getData} value={Data.umessage} id="" rows="3 " className='form-control'></textarea>
          </div> 
          <div className='text-start my-3'>
          <button className='bg-primary text-white rounded border-0'>{
              Data.Index!==''?'Update':'Save'
              }</button>
          </div>
          </div>
        </form>
        <div className='col-lg-6'>
          <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {userData.length>=1 ? 
    userData.map((value,index)=>{
      return(
      <tr key={index}>
        <th scope="row">{index+1}</th>
      <td>{value.uname}</td>
      <td>{value.uphone}</td>
      <td>{value.umessage}</td>
      <td>
        <button onClick={()=>deleteRow(index)}>Delete</button>
        <button onClick={()=>editData(index)}>Update</button>
      </td>
      </tr>
      )
    }):
    <tr>Data is not Found</tr>
    }
    
  </tbody>
</table>       
          </div>

      </div>
    </>
  )
}

export default App
