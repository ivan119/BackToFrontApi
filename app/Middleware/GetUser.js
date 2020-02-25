'use strict'
const User = use('App/Models/User')

class GetUser {
  async handle (ctx, next) {

    ctx.user = await ctx.auth.getUser()
    // const user = await User.first()
    
  //   console.log(ctx.user)
     await next()
  }
}

module.exports = GetUser



