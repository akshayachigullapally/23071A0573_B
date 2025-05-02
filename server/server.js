// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')

// const app = express()
// app.use(cors())
// app.use(express.json())

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/attendance', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err))

// // Mongoose Schema and Model
// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   attendance: {
//     type: String,
//     enum: ['Present', 'Absent', 'Given'],
//     default: 'Given'
//   }
// })

// const Student = mongoose.model('Student', studentSchema)

// // Add a student
// app.post('/students', async (req, res) => {
//   try {
//     const student = new Student({ name: req.body.name })
//     await student.save()
//     res.status(201).json(student)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })

// // Get all students
// app.get('/students', async (req, res) => {
//   const students = await Student.find()
//   res.json(students)
// })

// // Update attendance
// app.put('/students/:id/attendance', async (req, res) => {
//   try {
//     const { attendance } = req.body
//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       { attendance },
//       { new: true }
//     )
//     res.json(student)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })

// // Start the server
// const PORT = 5000
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`)
// })












const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/mouseTrackDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const PointSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  timestamp: { type: Date, default: Date.now }
});
const Point = mongoose.model('Point', PointSchema);

// API routes
app.post('/api/points', async (req, res) => {
  const point = new Point(req.body);
  await point.save();
  res.status(201).send('Point saved');
});

app.get('/api/points', async (req, res) => {
  const points = await Point.find();
  res.json(points);
});

// Server start
app.listen(5000, () => console.log('Server running on port 5000'));
