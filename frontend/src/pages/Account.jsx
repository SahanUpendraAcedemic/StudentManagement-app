import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Account() {

  const [fetchedStudents,setfetchedStudents] = useState([]);
  //all the variables for pagination of the record table
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = fetchedStudents.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(fetchedStudents.length / recordsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fethchAllStudents = async()=>{
    const response = await fetch('http://localhost:3000/student/getAllStudents',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    setfetchedStudents(data);
    console.log(fetchedStudents);
  }

  const handelDelete = (student_id) => async()=>{
    const response = await fetch(`http://localhost:3000/student/deleteStudent/${student_id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    fethchAllStudents();
  }

  useEffect(()=>{
    fethchAllStudents();
  },[])

  return (
    <div>
      <div className='flex flex-col h-screen'>
        <div className='flex flex-row justify-end p-10'>
          <Link className='rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black' to={'/addStudent'}>+ New</Link>
        </div>
        <div className='drop-shadow m-5'>
          <h1 className='text-3xl font-bold'>Existing Students</h1>
          <div>
            <table className='w-full m-2 p-5 rounded-lg'>
              <thead>
                <tr>
                  <th className='border border-black p-2 text-center'>SID</th>
                  <th className='border border-black p-2 text-center'>Name</th>
                  <th className='border border-black p-2 text-center'>Email</th>
                  <th className='border border-black p-2 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  //mapping through the current records to display them in the table and also adding the edit and delete links
                  currentRecords.map((student) => {
                    return (
                      <tr key={student._id}>
                        <td className='border border-black p-2 text-center'>{student.student_id}</td>
                        <td className='border border-black p-2 text-center'>{student.student_firstName + " " + student.student_lastName}</td>
                        <td className='border border-black p-2 text-center'>{student.student_address}</td>
                        <td className='border border-black p-2 text-center justify-center'>
                          <Link className='text-primary m-2' to={`/studentDetails/${student.id}`}>Edit</Link>
                          <button className='text-primary m-2' onClick={handelDelete(student.student_id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className='flex justify-center mt-4'>
              {
              //mapping through the total pages to display the pagination buttons
              Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
