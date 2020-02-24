'use strict'
const User = use('App/Models/User')

class GetUser {
  async handle ({ request,response}, next) {
    //console.log('tu sam')
     const user = await User.first()

     request.ctx = user

     await next()
  }
}

module.exports = GetUser



