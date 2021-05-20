import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Todos } from './entities/Todo'
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const TodosToID = async (req: Request, res: Response): Promise<Response> =>{
		const todos = await getRepository(Todos).findOne({where: {user: req.params.userid} });
		return res.json(todos);
}

export const createTodoListToID = async (req: Request, res: Response): Promise<Response> =>{
        if(!req.body.user_name) throw new Exception("Ingrese un user_name en body porfavor")
        if(!req.body.first_name) throw new Exception("Ingrese un first_name en body porfavor")
	    if(!req.body.last_name) throw new Exception("Ingrese un last_name en body porfavor")
	    if(!req.body.email) throw new Exception("Ingrese un email en body porfavor")
	    if(!req.body.password) throw new Exception("Ingrese un password en body porfavor")

        const userRepo = getRepository(Users)
	    // fetch for any user with this email
	    const user = await userRepo.findOne({ where: {email: req.body.email, user_name: req.body.user_name}})
	    if(user) throw new Exception("El usuario y correo electronico ya ha sido utilizado")

	    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	    return res.json(results);
}

export const updateTodoListToID = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const deleteTodoListAndID = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}