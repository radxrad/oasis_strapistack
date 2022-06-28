import Discourse from 'discourse-js';
import formidable from 'formidable'
//set bodyparser
export const config = {
    api: {
        bodyParser: false
    }
}

const userApiKey = process.env.DIS_API_KEY;
const apiUsername = process.env.DIS_API_USERNAME;
const baseUrl = process.env.DIS_URL || 'http://localhost:3000';

const discourse = new Discourse();
discourse.config({userApiKey, apiUsername, baseUrl})

export default async function handler(req, res) {
    const data = await new Promise((resolve, reject) => {
        const form = new formidable()

        // let body = req.body
        // let topic_id = body.topic_id
        // let raw = body.raw
        // let imageUri = body.uri

        form.parse(req, (err, fields, files) => {


            if (err) {

                console.log(err)
                reject({err})
            }
            console.log(fields)
            discourse.posts
                .create({
                    //topic_id: fields.topic_id, // optional (required for creating a new post on a topic.)
                    raw: fields.raw,
                    //  imageUri: imageUri, // optional to create a post/topic with an image.
                })
                .then(res => {
                        console.log(res)
                        resolve({err, fields, files})
                    }
                )
                .catch(err => {
                        console.log(err)
                        reject({err})
                    }
                );

        })

    })

    res.status(200).json({
        status: 'ok',
        data
    })

}

