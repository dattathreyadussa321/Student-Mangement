import React, { useState, useEffect } from 'react';

function StudentForm({ onAddStudent, onUpdateStudent, editingStudent, isEditing }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [phone,setPhone] = useState('');

  useEffect(() => {
    if (isEditing && editingStudent) {
      setName(editingStudent.name);
      setGrade(editingStudent.grade);
      setPhone(editingStudent.phone);
    } else {
      setName('');
      setGrade('');
      setPhone('');
    }
  }, [editingStudent, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !grade || !phone) return;

    const student = { name, grade ,phone};

    if (isEditing) {
      // Pass the full student object with _id for updating
      onUpdateStudent({ ...student, _id: editingStudent._id });
    } else {
      onAddStudent(student);
    }

    setName('');
    setGrade('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
        <input
        type="number"
        placeholder="Grade"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Student</button>
    </form>
  );
}

export default StudentForm;
