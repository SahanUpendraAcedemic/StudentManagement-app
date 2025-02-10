import httpService from './httpService';
import {URL} from '../config/const';

class StudentService extends httpService {

    async reqFetchStudentById(id) {
        const config = {
            method: 'GET',
            url: URL.GET_STUDENT_ID(id)
        };
        return this.sendRequest(config);
    }

    async reqFetchAllStudents(currentPage, recordsPerPage, search) {
        const config = {
            method: 'GET',
            url: URL.GET_ALL_STUDENTS(currentPage, recordsPerPage, search)
        };
        return this.sendRequest(config);
    }

    async reqCreateStudent(data) {
        const config = {
            method: 'POST',
            url: URL.CREATE_STUDENT,
            data: data
        };
        return this.sendRequest(config);
    }   

    async reqUpdateStudents(data) {
        const config = {
            method: 'PUT',
            url: URL.UPDATE_STUDENT,
            data: data
        };
        return this.sendRequest(config);
    }

    async reqDeleteStudent(id,student_id) {
        const config = {
            method: 'DELETE',
            url: URL.DELETE_STUDENT(id,student_id)
        };
        return this.sendRequest(config);
    }

}

const studentService = new StudentService();
export default studentService;