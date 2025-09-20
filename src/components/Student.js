import React, { Component } from 'react';

class Student extends Component {
  render() {
    const { name, grade,phone, onDelete, onEdit } = this.props;

    return (
      <div className="student-card">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Grade:</strong> {grade}</p>
        <p><strong>Phone:</strong>{phone}</p>
        <button onClick={onEdit} className="edit-btn">Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    );
  }
}

export default Student;
