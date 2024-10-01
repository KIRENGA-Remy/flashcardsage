// import express from 'express';
// import Todo from '../models/Todo';

// const router = express.Router();

// // Create a todo
// router.post('/', async (req, res) => {
//   const { title, completed } = req.body;
//   const newTodo = new Todo({
//     title
//   });
//   const savedTodo = await newTodo.save();
//   res.json(savedTodo);
// });

// // Get all todos
// router.get('/', async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// // Update a todo
// router.put('/:id', async (req, res) => {
//   const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedTodo);
// });

// // Delete a todo
// router.delete('/:id', async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Todo deleted' });
// });

// export default router;
