
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

export default function handler(req, res) {
   // res.status(200).json({ name: 'John Doe' })
    fetch('https://discourse.earth2.ucsd.edu/categories.json', {
        method: 'GET',
        headers: {

            'Api-Key': "60342475270b8e2aab81243a287dd85cf9dc5ed0387a94b0d585f5a44ecbe1e8",
            'Api-Username': 'system'
        }
    })
        .then(response => response.json())
        .then(data => {
          //  data.latest_posts.forEach (post => setLatestposts(latestposts => [...latestposts, post]))
            res.status(200).json(data.latest_posts )
        }).catch(err => console.log(err))
}

