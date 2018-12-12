const unirest = require('unirest')
// const { api_url } = require('../config/index')
const api_url = 'http://localhost:8081'

module.exports = class UserService {
  constructor() {
    this.find_all = this.find_all.bind(this)
    this.find_one = this.find_one.bind(this)
    this.get_me = this.get_me.bind(this)
  }

  find_all(condition = {}, select = null, offset = 0, limit = null, sort = {}, callback) {
    let { user_ids, full_name } = condition
    let query = {}
    let list = Object.assign({}, { user_ids, full_name })
    let list_key = Object.keys(list)
    list_key.map(key => {
      if (list[key]) Object.assign(query, { [key]: list[key] })
    })

    // Handle sort
    let new_sort = []
    Object.keys(sort).map(key => {
      if (sort[key] == 1) new_sort.push(`${(key)}`)
      if (sort[key] == -1) new_sort.push(`-${(key)}`)
    })
    sort = new_sort.join(',')
    let url = `${api_url}/users`

    let req = unirest.get(url)
      .query(Object.assign({}, query, { fields: select, offset, limit, sort }))

    req.end(res => {
      return callback(res.error, res.body.users)
    })
  }

  find_one(user_id, callback) {
    let url = `${api_url}/users/${user_id}`
    let req = unirest.get(url)

    req.end(res => {
      return callback(res.error, res.body.user)
    })
  }

  get_me(authorization, callback) {
    let url = `${api_url}/users/${user_id}`
    let req = unirest.get(url)
      .headers({ authorization })

    req.end(res => {
      return callback(res.error, res.body.user)
    })
  }
}
