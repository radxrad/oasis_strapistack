
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
    var username = apiUsername
    if (req.query['user']  !== undefined ){
        //res.status(400).json({error: "no id passed"})
        var username = req.query['user']
    }
//https://discourse.earth2.ucsd.edu/user_actions.json?offset=0&username=valentinedwv&filter=4,5&no_results_help_key=user_activity.no_default
    let queryString = `?offset=0&username=${username}&filter=4,5`
    fetch(`${baseUrl}/user_actions.json${queryString}`, {
        method: 'GET',
        headers: {

            'Api-Key': userApiKey,
            'Api-Username': apiUsername
        }
    })
        .then(response => response.json())
        .then(data => {
          //  data.latest_posts.forEach (post => setLatestposts(latestposts => [...latestposts, post]))
            res.status(200).json(data )
        }).catch(
            err => {
                console.log(err)
                res.status(400).json(err)
            }
    )
}

