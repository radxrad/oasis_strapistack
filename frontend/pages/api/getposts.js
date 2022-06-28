
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import Discourser from "discourser";
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

const config = {
    'host': baseUrl,
    'key': userApiKey,
    'username':apiUsername
}
const client =new Discourser(config)

export default async function handler(req, res) {
   // res.status(200).json({ name: 'John Doe' })
    //client.getPosts()
    await client.getPostItemsOfCategory(1)
        .then(
            response => response.json()
        )
        .then(data => {
          //  data.latest_posts.forEach (post => setLatestposts(latestposts => [...latestposts, post]))
           return res.status(200).json(data.latest_posts )
        }).catch(
            err => {
                console.log("getposts error:" + err)
                return  res.status(400).json(err )
            }
    )
}

