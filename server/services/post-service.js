const unirest = require('unirest')
// const { api_url } = require('../config/index')
const api_url = 'http://localhost:8080'

module.exports = class PostService {
  constructor() {
    this.find_all = this.find_all.bind(this)
    this.find_one = this.find_one.bind(this)
    this.create = this.create.bind(this)
  }

  find_all(condition = {}, select = null, offset = 0, limit = 10, sort = {}, callback) {
    let { post_ids, title, content, user_id, tags } = condition
    if (post_ids) post_ids = post_ids.join(',')
    if (tags) tags = tags.join(',')
    
    let query = {}
    let list = Object.assign({}, { post_ids, title, content, user_id, tags })
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
    let url = `${api_url}/posts`

    let req = unirest.get(url)
      .query(Object.assign({}, query, { fields: select, offset, limit, sort }))

    req.end(res => {
      return callback(res.error, res.body.posts)
    })
  }

  find_one(post_id, callback) {
    let url = `${api_url}/posts/${post_id}`
    let req = unirest.get(url)

    req.end(res => {
      return callback(res.error, res.body.post)
    })
  }

  create(authorization, post, callback) {
    let url = `${api_url}/posts/`
    let req = unirest.post(url)
      .headers({ authorization })
      .type('json')
      .send({ post })

    req.end(res => {
      return callback(res.error, res.body.created)
    })
  }
}
