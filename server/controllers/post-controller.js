module.exports = class PostController {
  constructor(post_service) {
    this.post_service = post_service

    this.find_by_user = this.find_by_user.bind(this)
  }

  find_by_user(req, res, next) {
    let user_id
    if (res.target_user) {
      user_id = res.target_user.user_id
    } else if (res.user) {
      user_id = res.user.user_id
    }
    this.post_service.find_all({ user_id }, null, 0, 10, {}, (err, posts) => {
      if (err) next(err)
      else {
        res.posts = posts
        next()
      }
    })
  }

}