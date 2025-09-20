import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

const API_BASE = 'http://localhost:1000';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);  // Changed from editingIndex to editingStudent object
  const navigate = useNavigate();

  // Load students from backend when app loads
  useEffect(() => {
    fetch(`${API_BASE}/api/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))  // Remove data.students, as backend returns array directly
      .catch((err) => console.error('Failed to fetch students:', err));
  }, []);

  const addStudent = (student) => {
    fetch(`${API_BASE}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API POST response:', data);
        setStudents([...students, data]);  // Append the saved student (with _id)
        navigate('/students');
      })
      .catch((err) => console.error(err));
  };

  const updateStudent = (updatedStudent) => {
    fetch(`${API_BASE}/api/students/${updatedStudent._id}`, {  //  Use _id instead of index
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API PUT response:', data);
        setStudents(
          students.map((s) => (s._id === data._id ? data : s))  // Match by _id
        );
        setEditingStudent(null);
        navigate('/students');
      })
      .catch((err) => console.error(err));
  };

  const deleteStudent = (id) => {  // Rename parameter from indexToDelete to id
    fetch(`${API_BASE}/api/students/${id}`, {  // Use _id in URL
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API DELETE response:', data);
        setStudents(students.filter((s) => s._id !== id));  //  Filter by _id
        if (editingStudent && editingStudent._id === id) {
          setEditingStudent(null);
        }
      })
      .catch((err) => console.error(err));
  };

  const startEdit = (student) => {  //  Pass full student object instead of index
    setEditingStudent(student);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>
      <nav>
        <Link to="/">Add Student</Link> |{' '}
        <Link to="/students">View Students</Link>
      </nav> --

      <Routes>
        <Route
          path="/"
          element={
            <StudentForm
              key={editingStudent ? editingStudent._id : 'new'}  //  Use _id for key
              onAddStudent={addStudent}
              onUpdateStudent={updateStudent}
              editingStudent={editingStudent}
              isEditing={!!editingStudent}
            />
          }
        />
        <Route
          path="/students"
          element={
            students.length > 0 ? (
              <StudentList
                students={students}
                onDelete={deleteStudent}
                onEdit={startEdit}
              />
            ) : (
              <p className="info-text">No students added yet.</p>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
