
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'


// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

const userApiKey = process.env.DIS_API_KEY;
const apiUsername = process.env.DIS_API_USERNAME;
const baseUrl = process.env.DIS_URL || 'http://localhost:3000';
/*
This does more than get the post, it adds the topic title. topic title is included in the latest posts feed, but not in the single posts json.
If we get the post, we do not get the topic title.
so if we get a post, we need to re
 */
export default async function  handler(req, res) {
   // res.status(200).json({ name: 'John Doe' })
    if (req.query['id']  === undefined ){
        res.status(400).json({error: "no id passed"})
    }
    var id = req.query['id']
    await fetch(`${baseUrl}/posts/${id}.json`, {
        method: 'GET',
        headers: {

            'Api-Key': userApiKey,
            'Api-Username': apiUsername
        }
    })
        .then(response => response.json())
        .then(async data => {
          //  data.latest_posts.forEach (post => setLatestposts(latestposts => [...latestposts, post]))
            if (data.errors ){
                console.log(data)
                res.status(400).json(data.errors)
            }
            const topicId = data.topic_id
            const title =  getTitle(topicId)
            var post = data
            post["topic_title"] = await title
             res.status(200).json(post )
        }).catch(
            err => {
                console.log(err)
                res.status(400).json(err)
            }
    )
}
// this retreives a topic
async function getTitle(id) {
    return fetch(`${baseUrl}/t/${id}.json`, {
        method: 'GET',
        headers: {

            'Api-Key': userApiKey,
            'Api-Username': apiUsername
        }
    })
        .then(
            response => response.json()
        ).then(
            data =>  data.title

        )


}



