const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class NotificationService {
    constructor() {
        this.mark_seen = this.mark_seen.bind(this)
        this.mark_seen_all = this.mark_seen_all.bind(this)
        this.find_by_page = this.find_by_page.bind(this)
        this.get_unseen_number = this.get_unseen_number.bind(this)
        this.save_refresh_token = this.save_refresh_token.bind(this)
        this.remove_refresh_token = this.remove_refresh_token.bind(this)
    }

    save_refresh_token(authorization, refresh_token, callback) {
        let url = `${api_url}/notifcations-users/users-refresh-token`
        if(!refresh_token){
            return callback(null, false)
        }
        let req = unirest.put(url)
            .headers({ authorization })
            .type('json')
            .send({ refresh_token })

        req.end(res => {
            if(res.error){
                return callback(res.error)
            }

            return callback(res.error, res.body.result.success)
        })
    }

    remove_refresh_token(authorization, refresh_token, callback) {
        let url = `${api_url}/notifcations-users/users-refresh-token`
        let req = unirest.delete(url)
            .headers({ authorization })
            .type('json')
            .send({ refresh_token })

        req.end(res => {
            console.log("remove", res.body.deleted)

            return callback(res.error, res.body.deleted)
        })
    }

    get_unseen_number(authorization, callback) {
        let url = `${api_url}/notifications/getUnseenNumber`
        let req = unirest.get(url)
            .headers({ authorization })
        req.end(res => {
            if(res.error){
                return callback(res.error)
            }
            return callback(res.error, res.body.count)
        })
    }

    mark_seen(authorization, notifications, callback) {
        let url = `${api_url}/notifications/markSeen`
        let req = unirest.post(url)
            .headers({ authorization })
            .type('json')
            .send({ notifications })

        req.end(res => {
            if(res.error){
                return callback(res.error)
            }
            return callback(res.error, res.body.success)
        })
    }

    mark_seen_all(authorization, callback) {
        let url = `${api_url}/notifications/markSeenAll`
        let req = unirest.post(url)
            .headers({ authorization })
            .type('json')

        req.end(res => {
            if(res.error){
                return callback(res.error)
            }
            return callback(res.error, res.body.success)
        })
    }

    find_by_page(authorization, page, size, callback) {
        let url = `${api_url}/notifications/findByUser`
        let req = unirest.get(url)
            .headers({ authorization })
            .query({ page, size })

        req.end(res => {
            if(res.error){
                return callback(res.error)
            }
            return callback(res.error, res.body.notifications)
        })
    }
}
