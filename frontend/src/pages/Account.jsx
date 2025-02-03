import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function Account() {
  const [fetchedStudents, setFetchedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const recordsPerPage = 10;

  // Fetch students with pagination
  const fetchAllStudents = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/student/getAllStudents?page=${currentPage}&limit=${recordsPerPage}`);
      const data = await response.json();
      console.log(data);
      
      if (data) {
        setFetchedStudents(data.studentsDetails);
        setTotalPages(Math.ceil(data.total / recordsPerPage));
        console.log(fetchedStudents);
      } else {
        setFetchedStudents([]);
        setTotalPages(1);
        console.log("else"+fetchedStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setFetchedStudents([]);
    }
  }, [currentPage]);

  // Delete a student and refresh the list
  const handleDelete = async (student_id) => {
    try {
      await fetch(`http://localhost:3000/student/deleteStudent/${student_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      fetchAllStudents(); // Refresh student list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Search for a student by name
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchAllStudents();
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/student/getAllStudents?page=${currentPage}&limit=${recordsPerPage}&search=${searchQuery}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_firstName: searchQuery }),
      });
      const data = await response.json();
      setFetchedStudents(data.students || []);
    } catch (error) {
      console.error('Error searching student:', error);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  return (
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
              <input
                className='border border-black p-2 rounded-lg'
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                        <Link className='text-primary m-2' to={`/studentDetails/${student.student_id}`}>
                          Edit
                        </Link>
                        <button className='text-red-500 m-2' onClick={() => handleDelete(student.student_id)}>
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
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
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
  );
}
