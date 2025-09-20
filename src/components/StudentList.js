import React from 'react';
import Student from './Student';

function StudentList({ students, onDelete, onEdit }) {
  return (
    <div className="student-list">
      <h2>Student List</h2>
      {students.map((student) => (
        <Student
          key={student._id}  // Use MongoDB _id as key
          name={student.name}
          grade={student.grade}
          phone={student.phone}
          onDelete={() => onDelete(student._id)}  // Pass _id to delete handler
          onEdit={() => onEdit(student)}         // Pass full student object for editing
        />
      ))}
    </div>
  );
}

export default StudentList;
