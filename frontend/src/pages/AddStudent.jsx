import React, { useState,useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import CollapsibleDiv from '../components/Collapseblediv'

export default function () {

    const [studentDetails,setStudentDetails] = useState({});

    const setStudent = async(studentDetails)=>{
        const response = await fetch('http://localhost:3000/student/createStudent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentDetails)
            }
        )
        const data = await response.json();
        console.log(data);
        toast.info(data);
    }

    const validateFrom = (e)=>{
        if(e.target.sid.value === '' || e.target.sfn.value === '' || e.target.sln.value === '' || e.target.scn.value === '' || e.target.saddress.value === '' || e.target.sgender.value === '' || e.target.sdob.value === '' || e.target.endate.value === '' || e.target.fedu.value === '' || e.target.egrade.value === '')
            {
                toast.warn('Please fill all the fields');
                return false;
            }else if(e.target.sdob.value > e.target.endate.value){
                toast.warn('Enrollment date should be greater than Date of Birth');
                return false;
            }else if(e.target.fedu.value === 'Primary' && e.target.egrade.value < 1){
                toast.warn('Primary students should be enrolled from grade 1');
                return false;
            }
        return true;
    }

    const handelSubmit=(e)=>{
        e.preventDefault();
        if(validateFrom(e))
            {
                setStudentDetails({
                    student_id: e.target.sid.value,
                    student_firstName: e.target.sfn.value,
                    student_lastName: e.target.sln.value,
                    student_credetialName: e.target.scn.value,
                    student_address: e.target.saddress.value,
                    student_gender: e.target.sgender.value,
                    student_dob: e.target.sdob.value,
                    enrolldate: e.target.endate.value,
                    formerEducation: e.target.fedu.value,
                    enrolled_grade: e.target.egrade.value,
                    schol_eligibility:( e.target.scholarship.value === 'on' ? 'Eligible' : 'Not Eligible'),
                    created_at: new Date().toISOString()
            });
        }
    }

    // Use useEffect to submit when studentDetails updates
    useEffect(() => {
        if (Object.keys(studentDetails).length > 0) {
            console.log("Submitting Student:", studentDetails);
        setStudent(studentDetails);
        }
    }, [studentDetails]); // Runs whenever studentDetails is updated    

  return (
    <div>
        <div className='m-5'>
            <ToastContainer />
            <form className='flex flex-col p-5 space-y-4 w-full items-start justify-center' method='POST' onSubmit={handelSubmit} autoComplete='off'>
            <div>
                <h1 className='text-3xl font-bold'>Add Student details</h1>
                <p>Add newly enrolled  student details.</p>
            </div>
            <div className='w-full'>
                <h4 className='text-sm'>General</h4><hr className='border border-lg border-black w-full'></hr>
                </div>
                <CollapsibleDiv content={<>
                    <div className='w-full'>
                        <label className='text-semibold'>Student Id
                        <input type='text' id='sid' name='sid' placeholder='Student Id:"S01"' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full' autoFocus />
                        </label>
                    </div>
                    <div className='w-full'>
                            <label className='text-semibold m-2'>First Name</label>
                            <input type='text' id='sfn' name='sfn' placeholder='First Name' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full' />
                        </div>
                    <div className='w-full'>
                            <label className='text-semibold m-2'>Last Name</label>
                            <input type='text' id='sln' name='sln' placeholder='Last Name' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full'></input>
                        </div>
                    <div className='w-full'>
                            <label className='text-semibold m-2'>Name with Credentials</label>
                            <input type='text' id='scn' name='scn' placeholder='Ex:D.B.Cooper' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full'></input>
                        </div>
                    <div className='w-full'>
                            <label className='text-semibold m-2'>Student Address</label>
                            <input type='text' id='saddress' name='saddress' placeholder='Enter your address' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full'></input>
                    </div>
                    <div className='w-full'>
                            <label className='text-semibold m-2'>Gender</label>
                            <select id='sgender' placeholder='Gender' className='rounded-lg border border-black p-2 focus:drop-shadow w-full'>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                    </div>
                    <div className='w-full'>
                            <label className='text-semibold m-2'>Date of birth</label>
                            <input type='date' id='sdob' name='sdob' className='rounded-lg border border-black p-2 focus:drop-shadow w-full'></input>
                    </div>
                </>}>
                    
                </CollapsibleDiv>
                <div className='w-full'>
                    <h4 className='text-sm'>Acedemic</h4>
                    <hr className='border border-lg border-black w-full'></hr>
                </div>
                <CollapsibleDiv content={<>
                    <div className='w-full'>
                        <lable className='text-semibold'>Enrollment Date</lable>
                        <input type='Date' id='endate' name='endate' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full' />
                    </div>
                    <div className='w-full'>
                            <lable className='text-semibold m-2'>Former eduction</lable>
                            <select id='fedu' placeholder='fedu' className='rounded-lg border border-black p-2 focus:drop-shadow w-full' multiple={true}>
                                <option value='Primary'>Primary</option>
                                <option value='Ol'>Ordinary Level</option>
                                <option value='Al'>Advanced Level</option>
                            </select>
                    </div>
                    <div className='w-full'>
                        <lable className='text-semibold'>Enrolling Grade</lable>
                        <input type='number' id='egrade' name='egrade' className='rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105 w-full' min='1' />
                    </div>
                    <div className='w-full flex flex-row justify-between'>
                        <lable className='text-semibold'>Applicable for Scholarships</lable>
                        <input type='checkbox' id='scholarship' name='scholarship' className='rounded-lg border border-black p-2 focus:drop-shadow' />
                    </div>
                </>}>
                    
                </CollapsibleDiv>
                <div className='w-full flex flex-row justify-between'>
                    <button className='rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black' type='submit'>Add Student</button>
                    <button className='rounded-lg hover:bg-primary hover:text-white p-2 px-5 border border-black bg-white text-black' type='reset'>Reset</button>
                </div>
            </form>
        </div>
    </div>
  )
}
