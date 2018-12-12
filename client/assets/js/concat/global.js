function _artButtonLoadingStart ($element) {
    $element.attr('data-text', $element.html());
    $element.html('<i class="fa fa-spinner fa-spin"></i> ' +  ($element.attr('data-loading-text') || $element.html()));
}

function _artButtonLoadingStop ($element) {
    $element.html($element.attr('data-text') || $element.html());
}

function _currencyFormat (n) {
    return typeof n === 'string' && n.replace(/./g, function(c, i, a) {
        return i && c !== "," && ((a.length - i) % 3 === 0) ? '.' + c : c;
    }) || ''
}

function _sweetAlertError (title, message) {
    swal(
        title || 'Error!',
        message || 'Sorry, something is wrong.<br>Please reaload this page and try again.',
        'error'
    )
}

function _sweetAlertWarning (title, message) {
    swal(
        title || 'Warning!',
        message,
        'warning'
    )
}

function _templateString (string, variables) {
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