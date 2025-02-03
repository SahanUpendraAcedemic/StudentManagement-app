import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function StudentDetails() {
    const [studentDetails, setStudentDetails] = useState(null);
    const [updateStudentDetails, setUpdateStudentDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const { id } = useParams();

    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/student/getStudentbyId/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setStudentDetails(data);
            setUpdateStudentDetails(data); // Set editable state
        } catch (error) {
            toast.error("Error fetching student details");
        }
        setLoading(false);
    };

    const handleUpdate = async () => {
        if (!updateStudentDetails.student_firstName || !updateStudentDetails.student_lastName ||
            !updateStudentDetails.student_credetialName || !updateStudentDetails.student_address ||
            !updateStudentDetails.formerEducation || !updateStudentDetails.enrolled_grade ||
            !updateStudentDetails.schol_eligibility) {
            toast.warn('Please fill all fields');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/student/updateStudent`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateStudentDetails)
            });
            const data = await response.json();
            toast.success("Student updated successfully!");
            setStudentDetails(updateStudentDetails); // Sync updated details
            setIsUpdated(false);
        } catch (error) {
            toast.error("Update failed. Please try again.");
        }
    };

    useEffect(() => {
        fetchStudentDetails();
    }, [id]);

    if (loading) return <h1>Loading...</h1>;
    if (!studentDetails) return <h1>Student not found.</h1>;

    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold">Student Details</h1>
            <ToastContainer />
            <div className="flex flex-row space-x-4 rounded-lg border border-black p-5 drop-shadow">
                <table className="w-full m-2 p-5">
                    <tbody>
                        <tr>
                            <td className="font-semibold">Student ID</td>
                            <td><input className="w-full p-2" type="text" value={updateStudentDetails.student_id} readOnly /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">First Name</td>
                            <td><input className="w-full p-2" type="text" value={updateStudentDetails.student_firstName || ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, student_firstName: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Last Name</td>
                            <td><input className="w-full p-2" type="text" value={updateStudentDetails.student_lastName || ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, student_lastName: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Name With Credentials</td>
                            <td><input className="w-full p-2" type="text" value={updateStudentDetails.student_credetialName || ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, student_credetialName: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Address</td>
                            <td><input className="w-full p-2" type="text" value={updateStudentDetails.student_address || ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, student_address: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Gender</td>
                            <td>
                                <select className="w-full p-2" value={updateStudentDetails.student_gender || ''} onChange={(e) => {
                                    setUpdateStudentDetails(prev => ({ ...prev, student_gender: e.target.value }));
                                    setIsUpdated(true);
                                }}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Date Of Birth</td>
                            <td><input className="w-full p-2" type="date" value={updateStudentDetails.student_dob ? new Date(updateStudentDetails.student_dob).toISOString().split('T')[0] : ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, student_dob: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Date Of Enrollment</td>
                            <td><input className="w-full p-2" type="date" value={updateStudentDetails.student_enrolldate ? new Date(updateStudentDetails.student_enrolldate).toISOString().split('T')[0] : ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, student_enrolldate: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Former Education</td>
                            <td>
                                <select className="w-full p-2" value={updateStudentDetails.formerEducation || ''} onChange={(e) => {
                                    setUpdateStudentDetails(prev => ({ ...prev, formerEducation: e.target.value }));
                                    setIsUpdated(true);
                                }}>
                                    <option value="Ol">Ordinary Level</option>
                                    <option value="Al">Advanced Level</option>
                                    <option value="Primary">Primary Level</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Scholarship Status</td>
                            <td><input className="w-full p-2" type="text" value={updateStudentDetails.schol_eligibility || ''} onChange={(e) => {
                                setUpdateStudentDetails(prev => ({ ...prev, schol_eligibility: e.target.value }));
                                setIsUpdated(true);
                            }} /></td>
                        </tr>
                        <tr className="text-sm italic">
                            {"Created at " + new Date(updateStudentDetails.created_at).toLocaleDateString()}
                            {(updateStudentDetails.created_at !== updateStudentDetails.updated_at) ? ' Updated at ' + new Date(updateStudentDetails.updated_at).toLocaleDateString() : ''}
                        </tr>
                        <button className={`rounded-lg p-2 px-5 border border-black ${isUpdated ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={handleUpdate} disabled={!isUpdated}>Update</button>
                    </tbody>
                </table>
            </div>
        </div>
    );
}