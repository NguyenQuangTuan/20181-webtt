const posts = [
    {
        "post_id": "jexMkc9Ve",
        "title": "Đinh Thị Thu Huyền",
        "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
        "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
        "user_id": "UybIQHGfS",
        "total_like": 0,
        "tags": [
            "default"
        ],
        "created_at": "2018-12-13T17:50:24.743+00:00",
        "updated_at": "2018-12-13T17:50:24.744+00:00"
    },
    {
        "post_id": "y8FZKltNd",
        "title": "Đinh Thị Thu Huyền",
        "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
        "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
        "user_id": "UybIQHGfS",
        "total_like": 0,
        "tags": [
            "default"
        ],
        "created_at": "2018-12-13T17:50:32.248+00:00",
        "updated_at": "2018-12-13T17:50:32.248+00:00"
    },
    {
        "post_id": "NSIt2sLRZ",
        "title": "Đinh Thị Thu Huyền",
        "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
        "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
        "user_id": "UybIQHGfS",
        "total_like": 0,
        "tags": [
            "default"
        ],
        "created_at": "2018-12-13T17:50:37.143+00:00",
        "updated_at": "2018-12-13T17:50:37.144+00:00"
    },
    {
        "post_id": "EvFklhiJA",
        "title": "Đinh Thị Thu Huyền",
        "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
        "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
        "user_id": "UybIQHGfS",
        "total_like": 0,
        "tags": [
            "default"
        ],
        "created_at": "2018-12-13T17:50:40.033+00:00",
        "updated_at": "2018-12-13T17:50:40.033+00:00"
    },
    {
        "post_id": "EvFklhiJA",
        "title": "Đinh Thị Thu Huyền",
        "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
        "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
        "user_id": "UybIQHGfS",
        "total_like": 0,
        "tags": [
            "default"
        ],
        "created_at": "2018-12-13T17:50:40.033+00:00",
        "updated_at": "2018-12-13T17:50:40.033+00:00"
    }
]
module.exports = (app) => {
    app.get('/search',
        (req, res, next) => {
            res.render('search-page', {
                title: 'Search',
                posts
            })
        }
    )
}