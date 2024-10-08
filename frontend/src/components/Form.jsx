import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Form = ({func1}) => {
  const  {instructorId} = useParams()
  let {  setOpen,handleGetAssignments } = func1;
  // let {setSuccesMsg} = states;
  const [AssignmentData , setAssignmentData] = useState({
    title:"",description:"",dueDate:""
  })
  const [courseId,setCourseId] = useState("")
  const [errMsg,setErrMsg] = useState(false)

  useEffect(()=>{
handlefetchCourseId()
  },[])
 
  const handlefetchCourseId = async ()=>{
    const response = await axios.get(`http://localhost:5000/api/auth/instructor/${instructorId}`)
    setCourseId(response.data.course);
    
  }
  
  const handleSubmit= async()=>{
    if(!AssignmentData.title||!AssignmentData.description|| !AssignmentData.dueDate){
      console.log("Err");
      setErrMsg(true)
    }else{
      setErrMsg(false)
      try {
        const response = await  axios.post('http://localhost:5000/api/assignments',{
          "title": AssignmentData.title,
          "description": AssignmentData.description,
          "instructor": instructorId,
          "course": courseId,
          "dueDate": AssignmentData.dueDate 
          
      })
        console.log(response);
        if(response){
// setSuccesMsg(true)
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Assignment created suceesfully!",
  showConfirmButton: false,
  timer: 1500
});

setOpen(false)
handleGetAssignments()
        }
        
      } catch (error) {
        console.error(error);
      }
      
    }
      console.log(AssignmentData);

    }
  return (
    <>
    <div>
      {
        errMsg&&(
          <div class="max-w-screen-lg bg-red-500 text-sm text-white rounded-md shadow-lg  mb-3" role="alert">
          <div class="flex p-4">
            All Feild is required
      
            <div class="ml-auto">
              <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-red-500 transition-all text-sm dark:focus:ring-offset-red-500 dark:focus:ring-red-700">
                <span class="sr-only">Close</span>
                <svg class="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
          </div>
      
        )
      }
       
       
<div className="">
  <div className="  px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
    <h1 className="text-2xl font-bold mb-8">Create New Assignment</h1>
    <form id="form" novalidate>
      <div className="relative z-0 w-full mb-5">
        <input
          type="text"
          name="name"
          onChange={(event) => {
            setAssignmentData((prev) => ({ ...prev, title: event.target.value }))
          }}
          value={AssignmentData.title}
          placeholder=" "
          required
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          />
        <label for="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter Assignment Name</label>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="relative z-0 w-full mb-5">
            <textarea 
            onChange={(event) => {
              setAssignmentData((prev) => ({ ...prev, description: event.target.value }))
            }}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" name="" id="">


            </textarea>
            <label for="date" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Description</label>
         
        </div>
</div>
      
     

      {/* <div className="relative z-0 w-full mb-5">
        <select
          name="select"
          //   value=""
          onChange={(event) => {
            setAssignmentData((prev) => ({ ...prev, course: event.target.value }))
          }}
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          >
          <option value="" selected disabled hidden></option>
          <option value="1">Course 1</option>
          <option value="2">Course 2</option>
          <option value="3">Course 3</option>
        </select>
        <label for="select" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an Course</label>
      </div> */}

      <div className="flex flex-row space-x-4">
        <div className="relative z-0 w-full mb-5">
          <input
          onChange={(event) => {
            setAssignmentData((prev) => ({ ...prev, dueDate: event.target.value }))
          }}
          type="date"
          name="date"
          placeholder=" "
          onclick="this.setAttribute('type', 'date');"
          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          />
          <label for="date" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Due Date</label>
        </div>
</div>
<div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                Cancel
              </button>
            </div>
    </form>
  </div>
</div>
        </div>
                </>
      )
    }
    
    export default Form
