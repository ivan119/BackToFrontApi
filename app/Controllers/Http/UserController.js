'use strict'
const User = use('App/Models/User')
const Movie = use('App/Models/Movie')
const { validate } = use('Validator')

class UserController {

    async edit({}){}

    async index({response}){
      //todo: search, orderanje,
      const user = await User.query().fetch()
      response.ok(
        user
      )
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

          const rules ={
            email: 'required|email|max:50',
            password: 'required|min:4'
          }
          const validation = await validate(request.all(), rules)

          if(validation.fails()) {
            return validation.messages()
          }else{
            response.ok({
              token
            })
          }  
          
    }

    async show ({auth,params,response}){
      
        try{
          return await auth.getUser()
        }catch(error){
          response.send('you are not logged in')
        }
    }

    async getFavourite({params:{id},response}) {

      const favourite = await Movie.query().whereHas('users', subQuery =>{
        subQuery.where('id', id)
      }).fetch()

      response.ok({
        message:'Your favourite movies',
        data: favourite
      })

    }

}


module.exports = UserController
