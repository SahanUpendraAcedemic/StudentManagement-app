export const baseUrl = "http://localhost:3000";

export const URL = {
  //user API
  USER_LOGIN: `${baseUrl}/auth/login`,
  USER_SIGNUP: `${baseUrl}/auth/signup`,

  // Student API
  GET_STUDENT_ID: (id) => `${baseUrl}/student/getStudentbyId/${id}`,
  GET_ALL_STUDENTS: (currentPage, recordsPerPage, search = "") =>
    `${baseUrl}/student/getAllStudents?page=${currentPage}&limit=${recordsPerPage}&search=${search}`,
  CREATE_STUDENT: `${baseUrl}/student/createStudent`,
  UPDATE_STUDENT: `${baseUrl}/student/updateStudent`,
  DELETE_STUDENT: (id, student_id) =>
    `${baseUrl}/student/deleteStudent/${id}/${student_id}`,
};
