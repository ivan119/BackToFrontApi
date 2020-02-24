'use strict'
const User = use('App/Models/User')

class UserController {

    async register({request, response}){
        const { username, email, password } = request.post()

        const user = await User.create({ username, email, password })

        response.ok({
          message: 'Username created successfully.',
          data:user.email,
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

    async show ({request,response}){
        const user = await request.ctx
        response.ok(user)
        console.log(user)
    }


}


module.exports = UserController
