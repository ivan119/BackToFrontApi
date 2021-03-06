'use strict'
const User = use('App/Models/User')
const Movie = use('App/Models/Movie')
const { validate } = use('Validator')

class UserController {

    // User can update profile, change his username,email,or password
    async update ({request,params:{id},response}){

      const user = await User.findOrFail(id)

      const rules = {
        username: 'required|min:4|max:15',
        email: 'required|email|max:50',
        password:'required'
      }

      const {username,email,password} = request.post()

      user.username = username
      user.email = email
      user.password = password

      const validation = await validate(request.all(), rules)
      try {    
        if(validation.fails()) {
          return validation.messages()
        }else{
          await user.save()
          response.ok({
            message:'Successfully updated profile',
          })
        }
      } catch (error) {
        response.badRequest({
          message:'Username or email already exist, Please chose another one'
        })
      }
    }


    //Fetch all users from database id and username only
    async index({response}){
      const user = await User.query().select('id','username').fetch()
      response.ok(
        user
      )
    }

    //Register user method
    async register({request, response}){

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

    //Login user base on auth
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

    //Get user
    async show ({auth,params,response}){
      
        try{
          return await auth.getUser()
        }catch(error){
          response.send('you are not logged in')
        }
    }

    //User favourite movies base on his id
    async getFavourite({params:{id},response}) {

      const favourite = await Movie.query().whereHas('users', subQuery =>{
        subQuery.where('id', id)
      }).fetch()

      response.ok({
        message:'Your favourite movies',
        data: favourite
      })

    }

    //User can delete his profile

    async delete({params:{id},response}) {
      
     const user = await User.findOrFail(id)

     await user.delete()

     response.ok()
    }

}


module.exports = UserController
