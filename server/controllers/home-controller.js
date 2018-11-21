module.exports = class HomeController {
  constructor(product_service) {
    this.product_service = product_service

    this.get_list_products = this.get_list_products.bind(this)
  }

  get_list_products(req, res, next) {
    this.product_service.retrieve_all(null, 0, 10, (err, products) => {
      if (err) {
        res.products = []
        next()
      }
      else {
        res.products = products
        next()
      }
    })
  }

}
