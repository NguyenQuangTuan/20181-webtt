module.exports = function (locals) {
  locals.isAuthenUser = function (user) {
    return (user && user.shopId)    
  }
}