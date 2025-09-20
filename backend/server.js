const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/StudentSchema');  //  Mongoose Model
const { clear } = require('console');

// Connect to MongoDB
mongoose.connect('mongodb+srv://22eg105e12:Dattu%401234@cluster0.eexvy6j.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


const app = express();


app.use(cors());


const PORT = 1000;


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// let students = []; removed


app.get('/', (req, res) => {
  res.render('index', { title: 'Express Backend Home' });
});



app.post('/api/students', async (req, res) => {
  const { name, grade } = req.body;
  const student = new Student({ name, grade });

  try {
    const savedStudent = await student.save();
    console.log('POST /api/students:', savedStudent);
    res.json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Update student by MongoDB _id(index)
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// /api/students/:id — (index)
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted', student: deletedStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
