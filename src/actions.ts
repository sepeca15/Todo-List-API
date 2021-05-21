import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Todos } from './entities/Todo'
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if(!req.body.user_name) throw new Exception("Please provide a user_name")
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
    const userEmail = await userRepo.findOne({ where: {email: req.body.email}})
    const userName = await userRepo.findOne({ where: {user_name: req.body.user_name}})
    if(userEmail) throw new Exception("Users already exists with this email")
    if(userName) throw new Exception("Users already exists with this user_name")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const TodosToID = async (req: Request, res: Response): Promise<Response> =>{
		const todos = await getRepository(Todos).find({where: {user: req.params.userid} });
		return res.json(todos);
}

export const createTodoListToID = async (req: Request, res: Response): Promise<Response> =>{
       	if(!req.body.label) throw new Exception("Ingrese un label en body porfavor")
        if(!req.body.done) throw new Exception("Ingrese un done en body porfavor de tipo boolean")
        if(!req.params.userid) throw new Exception("Ingrese un parametro id")
        
        

        const userRepo = getRepository(Users)
	    // fetch for any user with this email
        const user = await userRepo.findOne(req.params.userid)
        if(!user) throw new Exception("el usuario no existe")
        let todo = new Todos()
        todo.label=req.body.label
        todo.done=req.body.done
        todo.user=user
	    const results = await getRepository(Todos).save(todo); //Grabo el nuevo usuario 
	    return res.json(results);
}

export const updateTodoListToID = async (req: Request, res: Response): Promise<Response> =>{

		if(!req.body.label) throw new Exception("Ingrese un label en body porfavor")
        if(!req.body.done) throw new Exception("Ingrese un done en body porfavor de tipo boolean")
        if(!req.params.todoid) throw new Exception("Ingrese un todoid en body porfavor")

        const todosRepo = getRepository(Todos)
	    // Se fija si ya no hay una tarea creada con el mismo label
	    const todos = await todosRepo.findOne({ where: {id: req.params.todoid}})
        if(!todos) throw new Exception("No tienes esa tarea")
        todos.label=req.body.label
        todos.done=req.body.done
	    const results = await getRepository(Todos).save(todos); 
	    return res.json(results);
}

export const deleteTodoListAndID = async (req: Request, res: Response): Promise<Response> =>{

        if(!getRepository(Todos).find({where: {user: req.params.userid} })){
            const deleteUser = getRepository(Users).delete(req.params.id);
            return res.json(deleteUser);
        } else {
            const todosRepo = getRepository(Todos)
            const todos = await todosRepo.findOne({ where: {id: req.params.todoid}})
             if(!todos) throw new Exception("No tienes esa tarea")
            const results = await getRepository(Todos).delete(req.params.todoid)
            return res.json(results);
        }
}