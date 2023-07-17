const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

let addedTodos = 0;

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET added todos statistics. */
router.get('/statistics', async (_, res) => {
  const count = await redis.getAsync("added_todos")
  res.send({
    "added_todos": count
  });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  addedTodos++
  redis.setAsync("added_todos", addedTodos);

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  try {
    const todo = req.todo;
    return res.send(todo);
  } catch (e) {
    console.log(e);
    res.sendStatus(405);
  }
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    const todo = req.todo;
    req.todo = await Todo.findByIdAndUpdate(
      todo._id,
      { text: req.body.text, done: req.body.done },
      { new: true }
    );

    res.send(req.todo);
  } catch (e) {
    console.log(e);
    res.sendStatus(405);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
