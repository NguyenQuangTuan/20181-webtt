module.exports = (app) => {
    app.get('/posts/new',
      (req, res, next) => {
        res.render('post/new-post', {
          title: 'New Post',
        })
      }
    )
  }