module.exports = class NotificationController {
    constructor(notification_service) {
        this.notification_service = notification_service

        this.mark_seen = this.mark_seen.bind(this)
        this.mark_seen_all = this.mark_seen_all.bind(this)
        this.find_by_page = this.find_by_page.bind(this)
        this.get_unseen_number = this.get_unseen_number.bind(this)
        this.save_refresh_token = this.save_refresh_token.bind(this)
        this.remove_refresh_token = this.remove_refresh_token.bind(this)
    }

    save_refresh_token(req, res, next) {
        // console.log('Cookies: ', req.cookies)
        let { refresh_token, wtt_token } = req.cookies
        if (wtt_token) {
            this.notification_service.save_refresh_token(wtt_token, refresh_token, (err, success) => {
                if (err) next(err)
                else {
                    res.success = success
                    next()
                }
            })
        } else {
            next()
        }


    }

    remove_refresh_token(req, res, next) {
        // console.log('Cookies: ', req.cookies)
        let { refresh_token, wtt_token } = req.cookies

        this.notification_service.remove_refresh_token(wtt_token, refresh_token, (err, deleted) => {

            if (err) next(err)
            else {
                res.deleted = deleted
                next()
            }
        })
    }

    get_unseen_number(req, res, next) {
        let authorization = res.token

        this.notification_service.get_unseen_number(authorization,
            (err, count) => {
                if (err) next(err)
                else {
                    res.noti_count = count
                    next()
                }
            })
    }

    mark_seen(req, res, next) {
        let { notifications } = req
        let authorization = res.token

        this.notification_service.mark_seen(authorization, notifications,
            (err, success) => {
                if (err) next(err)
                else {
                    res.success = success
                    next()
                }
            })
    }

    mark_seen_all(req, res, next) {
        let authorization = res.token

        this.notification_service.mark_seen_all(authorization,
            (err, success) => {
                if (err) next(err)
                else {
                    res.success = success
                    next()
                }
            })
    }

    find_by_page(req, res, next) {
        let page = Number(req.page) || 0;
        let size = Number(req.size) || 10;
        let authorization = res.token

        this.notification_service.find_by_page(authorization, page, size,
            (err, notifications) => {
                if (err) next(err)
                else {
                    notifications = notifications.map(notification => {
                        let { content, type } = notification;
                        let noti = {};
                        switch (type) {
                            case "POST_CREATED":
                                noti.title = `${content.full_name} đã đăng bài viết mới `
                                noti.post_id = content.post_id
                                noti.info = content.title
                                break
                            case "REVIEW_CREATED":
                                if (content.review) {
                                    noti.title = `${content.review.full_name} đã review một bài viết của bạn`
                                    noti.post_id = content.review.post_id
                                    noti.info = content.review.content
                                }
                                break
                            case "SUB_REVIEW_CREATED":
                                if (content.sub_review) {
                                    noti.title = `${content.sub_review.full_name} đã trả lời một review của bạn`
                                    noti.post_id = content.review.post_id
                                }
                                break
                        }
                        return noti;
                    })
                    res.notifications = notifications
                    next()
                }
            })
    }
}