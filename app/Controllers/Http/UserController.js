'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {

  async edit({}){


  }

    async index({response}){
      //todo: search, orderanje,
      const user = await User.query().with('movies').fetch()
    }

    async register({request, response}){

      //validacija podataka email-a i sanitzirati, required

        const rules = {
          username: 'required|min:4|max:15|unique:users:username',
          email: 'required|email|max:50|unique:users:email',
          password: 'required|min:4'
        }

         const messages = {
          'username.required' : 'Username is required to continue',
          'username.unique'   : 'Username already exist',
          'email.required'    : 'Email is required for further communication',
          'email.unique'      : 'Email already exist',
          'password.required' : 'Password is required'
      }

        const validation = await validate(request.all(), rules)

        if(validation.fails()){
            return validation.messages()
        }else{
          const { username, email, password } = request.post()
          
          const user = await User.create({ username, email, password })
          
          response.ok({
            message: 'Username created successfully.',
            data:user.username,
          })
        }

   
    }

    async login({request,response,auth}){


          const {email, password} = request.post()
          const token = await auth.attempt(email,password)
  
          response.ok({
            token
          })
          
    }

    async show ({auth,params,response}){
      
        try{
          return await auth.getUser()
        }catch(error){
          response.send('you are not logged in')
        }

      //  const user = await request.ctx
      //  response.ok(user)
      //  console.log(user)
    }

    async getFavourite({requestm,response}) {
      
      const favourite = await User.query().whereHas()

    }

}


module.exports = UserController
