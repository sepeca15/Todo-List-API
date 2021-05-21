
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import { TodosToID } from './actions';
import { createTodoListToID } from './actions';
import { updateTodoListToID } from './actions';
import { deleteTodoListAndID } from './actions';



const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));
router.get('/todos/:userid', safe(TodosToID));
router.post('/todos/:userid', safe(createTodoListToID));
router.put('/todos/:todoid', safe(updateTodoListToID));
router.delete('/todos/:todoid', safe(deleteTodoListAndID));

export default router;
