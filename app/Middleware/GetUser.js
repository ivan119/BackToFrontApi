'use strict'
const User = use('App/Models/User')

class GetUser {
  async handle (ctx, next) {

    ctx.user = await ctx.auth.getUser()
    
    await next()
  }
}

module.exports = GetUser



