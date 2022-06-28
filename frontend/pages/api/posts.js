
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

export default function handler(req, res) {
   // res.status(200).json({ name: 'John Doe' })
    fetch(`${baseUrl}/posts.json`, {
        method: 'GET',
        headers: {

            'Api-Key': userApiKey,
            'Api-Username': apiUsername
        }
    })
        .then(response => response.json())
        .then(data => {
          //  data.latest_posts.forEach (post => setLatestposts(latestposts => [...latestposts, post]))
            res.status(200).json(data.latest_posts )
        }).catch(
            err => {
                console.log(err)
                res.status(400).json(err)
            }
    )
}

