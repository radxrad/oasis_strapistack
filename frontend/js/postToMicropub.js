
/*
"micropub": {
        "img": "https://dummyimage.com/520x200/000/F5F5F5.png",
        "title": "Which vaccine, according to research is the safest?",
        "abstract": "Cheese and biscuits cauliflower cheese cream cheese. Monterey jack fromage frais stilton everyone loves edam jarlsberg monterey jack st. agur blue cheese. Cheesy grin swiss cheesecake say cheese cheese triangles paneer smelly cheese stinking bishop. Blue castello halloumi emmental...",
        "uid": 1,
        "body": "Cheese and biscuits cauliflower cheese cream cheese. Monterey jack fromage frais stilton everyone loves edam jarlsberg monterey jack st. agur blue cheese. Cheesy grin swiss cheesecake say cheese cheese triangles paneer smelly cheese stinking bishop. Blue castello halloumi emmental...",
        "authorIds":null,
        "publishTime": 1609430400,
        "dataIds": null,
        "reviewNum": 0,
        "visibility":"public",
        "keywords":null
    },
 */
import { parse } from 'node-html-parser';

export default function postsToMicropub(posts){
    var pubs = []
    pubs = posts.map(post =>
    {
        var rawHtml = parse( post.raw )
        var abstract = rawHtml.querySelector('.abstract')
            abstract = abstract ? abstract.innerHTML : rawHtml.innerHTML
        var body = rawHtml.querySelector('.body')
         body =body ? body.innerHTML : "None"
        if (body === undefined) body = "<p></p>"
        var keywords = ""
      //  var keywords = post.get ("tags[]")
        var figure = ""
        var authorIds = []


    var pub = {
            uid: post.id,
       title: post.topic_title,
        abstract : abstract,
        body: body,
        keywords: keywords,
        figure: figure,
        authorIds: authorIds,

    }
    return pub
    }
    )

    return pubs
}
