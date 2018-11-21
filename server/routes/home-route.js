module.exports = (app, home_controller) => {
  app.get('/home',
    home_controller.get_list_products,
    (req, res, next) => {
      let { products } = res
      res.render('home', {
        title: 'Sales Page',
        header_title: [
          { 'Products': '#' }
        ],
        products
      })
    }
  )
}
