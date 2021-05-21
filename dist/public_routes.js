"use strict";
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var actions_2 = require("./actions");
var actions_3 = require("./actions");
var actions_4 = require("./actions");
var actions_5 = require("./actions");
var router = express_1.Router();
// signup route, creates a new user in the DB
router.post('/user', utils_1.safe(actions_1.createUser));
router.get('/todos/:userid', utils_1.safe(actions_2.TodosToID));
router.post('/todos/:userid', utils_1.safe(actions_3.createTodoListToID));
router.put('/todos/:todoid', utils_1.safe(actions_4.updateTodoListToID));
router["delete"]('/todos/:todoid', utils_1.safe(actions_5.deleteTodoListAndID));
exports["default"] = router;
