var moment = require('moment')

module.exports = function (locals) {
    locals.isAuthenUser = function (user) {
        return (user && user.shopId)    // user can be null
    }

    locals.moment = moment

    locals.templateString = function (string, variables) {
        if (!string) return ''
        if (!variables) return string

        return string.replace(/\$\{([^}]+)}/g, function (all, name) {
            if (Object.hasOwnProperty.call(variables, name)) {
                if (Array.isArray(variables[name])) {
                    return variables[name][Math.floor(Math.random() * variables[name].length)]
                } else if (typeof variables[name] === 'string') {
                    return variables[name]
                }
            }

            return all;
        })
    }
}