module.exports = (app) => {
    app.get('/post/new',
      (req, res, next) => {
        res.render('post/new-post', {
          title: 'New Post',
        })
      }
    )
  }