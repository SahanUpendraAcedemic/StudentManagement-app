import { baseUrl } from '../api/api';

//fetch student by id
const reqFetchStudentById = async (id) => {
    try{
        const response = await fetch(`${baseUrl}/student/getStudentbyId/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
    }
    catch (error) {
        console.error('Error fetching student:', error);
    }
};


//fetch all the student detiails and if the serch query was made addressing that as well.
const reqFetchAllStudents = async (currentPage, recordsPerPage,search = "") => {
    try {
        const response = await fetch(`${baseUrl}/student/getAllStudents?page=${currentPage}&limit=${recordsPerPage}&search=${search}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
};

const reqCreateStudent = async (studentDetails) => {
    const response = await fetch('http://localhost:3000/student/createStudent', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(studentDetails)
        }
    )
    const data = await response.json();
    return data;
};

const reqUpdateStudents = async (updateStudentDetails) => {
    try{
        const response = await fetch(`${baseUrl}/student/updateStudent`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateStudentDetails)
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating student:', error);
    }
};

const reqDeleteStudent = async (id,student_id) => {
    try{
        const response = await fetch(`${baseUrl}/student/deleteStudent?id=${id}&student_id=${student_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error deleting student:', error);
    }
};

export { reqFetchAllStudents, reqDeleteStudent, reqCreateStudent , reqFetchStudentById, reqUpdateStudents };