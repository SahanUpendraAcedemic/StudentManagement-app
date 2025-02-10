import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import studentService from '../services/studentService';

export default function Account() {
  const [fetchedStudents, setFetchedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const recordsPerPage = 10;

  // Fetch students through useCallback to prevent unnessarty data fetches
  const fetchAllStudents = useCallback(async () => {
    try {
      const response = await studentService.reqFetchAllStudents(currentPage, recordsPerPage);
      console.log(response.data);
      
      if (response) {
        setFetchedStudents(response.data.studentsDetails);
        setTotalPages(Math.ceil(response.data.total / recordsPerPage));
        console.table(fetchedStudents);
      } else {
        setFetchedStudents([]);
        setTotalPages(1);
        console.log("else "+fetchedStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setFetchedStudents([]);
    }
  }, [currentPage]);

  // Delete a student and refresh the list
  const handleDelete = async (id,student_id) => {
    try {
      console.log(id,student_id);
      const response = await studentService.reqDeleteStudent(id,student_id);
      console.log(response);
      
      fetchAllStudents(); // Refresh student list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Search for a student by name
  const handleSearch = async () => {

    const response = await studentService.reqFetchAllStudents(currentPage, recordsPerPage, searchQuery);
    setFetchedStudents(response.data.studentsDetails);
    setTotalPages(Math.ceil(response.data.total / recordsPerPage));    
  };

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  return (
    <>
    {
      fetchedStudents ? (
        <div>
      <div className='flex flex-col'>
        <div className='flex justify-end p-10'>
          <Link className='rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border-black hover:text-black' to={'/addStudent'}>
            + New
          </Link>
        </div>
        <div className='drop-shadow rounded-lg border border-black min-h-screen p-5 m-5'>
          <div className='flex justify-between p-5'>
            <div>
              <h1 className='text-3xl font-bold'>Existing Students</h1>
              <p>All the student details shown here</p>
            </div>
            <div className='flex space-x-4 m-2'>
              <div className='relative'>
                <input
                  className='border border-black p-2 rounded-lg'
                  type='text'
                  placeholder='Search'
                  id='search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')||fetchAllStudents()} 
                className="absolute right-2 translate-y-1/2 text-gray-500 hover:text-black">
                  ❌
                  </button>
                )}</div>
              <button className='bg-primary text-white p-2 px-5 border border-black rounded-lg' onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div>
            <table className='w-full p-5'>
              <thead>
                <tr>
                  <th className='border border-black p-2 text-center'>SID</th>
                  <th className='border border-black p-2 text-center'>Name</th>
                  <th className='border border-black p-2 text-center'>Address</th>
                  <th className='border border-black p-2 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchedStudents.total !== 0 ? (
                  fetchedStudents.map((student) => (
                    <tr key={student.student_id}>
                      <td className='border border-black p-2 text-center'>{student.student_id}</td>
                      <td className='border border-black p-2 text-center'>
                        {student.student_firstName} {student.student_lastName}
                      </td>
                      <td className='border border-black p-2 text-center'>{student.student_address}</td>
                      <td className='border border-black p-2 text-center'>
                        <Link className='text-primary m-2' to={`/studentDetails/${student.id}`}>
                          Edit
                        </Link>
                        <button className='text-red-500 m-2' onClick={() => handleDelete(student.id,student.student_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='4' className='text-center p-5'>
                      No records available!
                      <h5>Add new records by pressing '+New'</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className='flex justify-center py-5'>
            {!(fetchedStudents.length<10 && fetchedStudents.total<10) ? Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                >
                  {index + 1}
                </button>
              )) : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>):
    (<div>Loading...</div>)
  }</>
  );
}
