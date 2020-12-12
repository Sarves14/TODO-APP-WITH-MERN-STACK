const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
mongoose.connect('mongodb://localhost/TODO', { useNewUrlParser: true, useUnifiedTopology: true });

//get instance of database
const db = mongoose.connection;

//check for connection and error
db.on('error', function (error) {
 throw error;
});

db.once('open', function () {
 console.log('connected to database');
});

//creating Schema and Model for Todo
const todoSchema = new mongoose.Schema({
 id: { type: Number, index: true, unique: true, required: true },
 title: { type: String, required: true },
 completed: { type: Boolean, required: true }
});

const todoModel = mongoose.model('todo', todoSchema);


//listening to req for all todo
app.get('/', (req, res) => {
 todoModel.find({}, function (err, data) {
  if (err) throw err;
  console.log(data);
  res.json(data);
 });
});

//listening to req for adding new todo
app.post('/', (req, res) => {
 const todo = new todoModel({
  id: req.body.id,
  title: req.body.title,
  completed: req.body.completed
 });

 todo.save(function (err, data) {
  if (err) throw err;
  res.send({ msg: 'hi' });
 });
});

//listening to req for updating the completed
app.put('/:id', (req, res) => {
 console.log('patch req made ' + req.body.completed);
 todoModel.update(
  { id: parseInt(req.params.id) },
  {
   $set: {
    completed: req.body.completed
   }
  },
  function (err, data) {
   if (err) throw err;
   console.log(data);
  }
 );
});

//listening to delete request
app.delete('/:id', (req, res) => {
 todoModel.remove({ id: parseInt(req.params.id) }, { justOne: true }, function (err, data) {
  console.log(data);
  res.json({ msg: 'deleted' });
 });
});

//creating port variable
const PORT = process.env.PORT || 5000;

//listening to the port
app.listen(PORT, () => { console.log(`Server running on PORT: ${PORT}`) });