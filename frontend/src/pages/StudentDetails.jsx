import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import studentService from "../services/studentService";
import PopupWindow from "../components/PopupWindow";

export default function StudentDetails() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [updateStudentDetails, setUpdateStudentDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  //fetch the student details by id from redirect
  const fetchStudentDetails = async (id) => {
    setLoading(true);
    try {
      const response = await studentService.reqFetchStudentById(id);
      console.table(response.data);

      setStudentDetails(response.data);
      setUpdateStudentDetails({ ...response.data }); // Set editable state
    } catch (error) {
      toast.error("Error fetching student details");
    }
    setLoading(false);
  };

  //assign the values to the updateStudentDetails object upon Onchange event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateStudentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsUpdated(true);
  };

  //commit updateStudentDetails to the database
  const handleUpdate = async () => {
    try {
      const response =
        await studentService.reqUpdateStudents(updateStudentDetails);
      console.log(response);
      setIsUpdated(true);
      toast.success("Student updated successfully!");
      setIsModalOpen(false);
      navigate("/Account");
    } catch (error) {
      console.log(error);
      toast.error("Update failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchStudentDetails(id);
  }, []);

  return (
    <div className="m-5 p-5">
      <h1 className="text-3xl font-bold mb-2">Update Student Details</h1>
      <div className="flex flex-row space-x-4 rounded-lg border border-black p-5 drop-shadow">
        {studentDetails ? (
          <table className="w-full m-2 p-5">
            <tbody>
              <tr>
                <td className="font-semibold">Student ID</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="text"
                    value={studentDetails.student_id}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">First Name</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="text"
                    name="student_firstName"
                    defaultValue={studentDetails.student_firstName}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Last Name</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="text"
                    name="student_lastName"
                    defaultValue={studentDetails.student_lastName}
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        student_lastName: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Name With Credentials</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="text"
                    name="student_credetialName"
                    defaultValue={studentDetails.student_credetialName}
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        student_credetialName: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Address</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="text"
                    name="student_address"
                    defaultValue={studentDetails.student_address}
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        student_address: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Gender</td>
                <td>
                  <select
                    className="w-full p-2"
                    name="student_gender"
                    defaultValue={studentDetails.student_gender}
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        student_gender: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Date Of Birth</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="date"
                    name="student_dob"
                    defaultValue={
                      studentDetails.student_dob
                        ? new Date(updateStudentDetails.student_dob)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        student_dob: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Date Of Enrollment</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="date"
                    name="enrolldate"
                    defaultValue={
                      studentDetails.enrolldate
                        ? new Date(updateStudentDetails.enrolldate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        enrolldate: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Former Education</td>
                <td>
                  <select
                    className="w-full p-2"
                    name="formerEducation"
                    defaultValue={studentDetails.formerEducation}
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        formerEducation: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  >
                    <option value="Ol">Ordinary Level</option>
                    <option value="Al">Advanced Level</option>
                    <option value="Primary">Primary Level</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Scholarship Status</td>
                <td>
                  <input
                    className="w-full p-2"
                    type="text"
                    name="schol_eligibility"
                    defaultValue={studentDetails.schol_eligibility}
                    onChange={(e) => {
                      setUpdateStudentDetails((prev) => ({
                        ...prev,
                        schol_eligibility: e.target.value,
                      }));
                      setIsUpdated(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-sm italic">
                  {"Created at " +
                    new Date(studentDetails.created_at).toLocaleDateString()}
                  {updateStudentDetails.created_at !==
                  updateStudentDetails.updated_at
                    ? " Updated at " +
                      new Date(
                        updateStudentDetails.updated_at
                      ).toLocaleDateString()
                    : ""}
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center">
                  <button
                    className={`rounded-lg p-2 mt-2 px-5 border border-black ${isUpdated ? "bg-primary text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    onClick={() => setIsModalOpen(true)}
                    disabled={!isUpdated}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : loading ? (
          "Loading..."
        ) : (
          "No student details found!"
        )}
      </div>
      <PopupWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleUpdate}
        title="Confirm Update"
        message=""
        confirmText="Update"
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
