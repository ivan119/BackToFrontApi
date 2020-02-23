'use strict'
const User = use('App/Models/User')

class UserController {

    async register({request, response,auth}){
        const { username, email, password } = request.post()

        const user = await User.create({ username, email, password })

        const token = await auth.attempt(email,password)

        response.ok({
          message: 'Username created successfully.',
          data:user.id,
          token
        })
    }

    async login({request,response,auth}){
        const {email, password} = request.post()

        const token = await auth.attempt(email,password)
        
        response.ok({
          token
        })
    }

    async show ({params:{id},response}){

         const user =  await User.find(id)

         const res = { username: user.username, email: user.email }

          response.ok({
            res
          })
    }


}


module.exports = UserController
