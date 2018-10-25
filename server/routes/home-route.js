module.exports = (app) => {
  app.get('/home',
    home_controller.get_all_products,
    (req, res, next) => {
      return res.render('home/home', {
        title: 'Home',
        header_title: [
          { 'Home': '#' }
        ],
        // Có thể gửi thêm các dữ liệu khác ở đây
      })
    }
  )
}
