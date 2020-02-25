'use strict'
const User = use('App/Models/User')

class UserController {

    async register({request, response}){
        const { username, email, password } = request.post()

        const user = await User.create({ username, email, password })

        response.ok({
          message: 'Username created successfully.',
          data:user.username,
        })
    }

    async login({request,response,auth}){
        const {email, password} = request.post()
        const token = await auth.attempt(email,password)
       // const user = await User.findBy('email',email)
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
    

    async logout({}){

    }


}


module.exports = UserController
