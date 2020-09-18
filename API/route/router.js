const express = require('express');
const { userController } = require('../controller')
const router = express.Router();

router.get('/getAllUsers', userController.getUsers);
router.post('/registerUser',userController.registerUser);
router.post('/loginUser',userController.loginUser);
router.get('/getAllToDo/:id',userController.getAllTodo)
router.post('/addTodo/:id',userController.addTodo);
router.patch('/edit/:id',userController.editTodo);
router.get('/usersTodo/:id',userController.getUsersTodoById);
router.delete('/deleteTodo/:id',userController.deleteTodo);

module.exports = router