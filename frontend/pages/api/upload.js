import Discourse from 'discourse-js';
import formidable from 'formidable'
import FormData from "form-data";
import multiparty from 'multiparty'
import axios from "axios";
var fs = require('fs')
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

/*

fordata:
type: composer
name: files[]

name=\"files[]\"; filename=\"IMG_0035.JPG\"\r\nContent-Type: image/jpeg\r\n\r\n\r\n
fetch("https://discourse.earth2.ucsd.edu/uploads.json?client_id=347572fb1cd14f599664633f2203c684", {
  "headers": {
    "accept": "application/json, text/javascript,
"referrer": "https://discourse.earth2.ucsd.edu/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "------WebKitFormBoundary2Anfkcv4SOCX9YpE\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\ncomposer\r\n------WebKitFormBoundary2Anfkcv4SOCX9YpE\r\nContent-Disposition: form-data; name=\"files[]\"; filename=\"IMG_0035.JPG\"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundary2Anfkcv4SOCX9YpE--\r\n",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});


response:
{
    "id": 29,
    "url": "https://discourse.earth2.ucsd.edu/uploads/default/original/1X/436a8bc0a66fba7bc3fcb81f8a9355c7882048b0.jpeg",
    "original_filename": "IMG_0035.JPG",
    "filesize": 325274,
    "width": 1200,
    "height": 1600,
    "thumbnail_width": 375,
    "thumbnail_height": 500,
    "extension": "jpeg",
    "short_url": "upload://9Cogn6H4jSzCLf6DCbj4xCcCHJe.jpeg",
    "short_path": "/uploads/short-url/9Cogn6H4jSzCLf6DCbj4xCcCHJe.jpeg",
    "retain_hours": null,
    "human_filesize": "318 KB"
}

 */

/*
json from postman example
{
 "id": 33699548,
 "url": "aliquip",
 "original_filename": "velit dolor ",
 "filesize": 70981930,
 "width": 91662510,
 "height": 83165635,
 "thumbnail_width": -24178107,
 "thumbnail_height": 43603236,
 "extension": "do dolor",
 "short_url": "irure consequat ut pariatur",
 "short_path": "aliqua ad id",
 "retain_hours": null,
 "human_filesize": "deserunt irure voluptate"
}

type: (Required)  (This can only be one of avatar,profile_background,card_background,custom_emoji,composer)
synchronous: Use this flag to return an id and url

formdata from postman
type: composer

synchronous: false
file

 */
export default async function handler(req, res) {
    return new Promise((resolve, reject) => { var form = new multiparty.Form();
    form.parse(req,  function(err, fields, files) {
        if(err){
            res.status(400).json(err)
            reject()
        } else
        {

            //files iare images
            //fields are fields, you can access now to them
            // it save image in temporary file
           // let body = req["files[]"]
            let file = files["files[]"][0]
            var formData = new FormData()
           // formData.append("upload_type", "composer");
            formData.append("type", "composer");
            formData.append('file', fs.createReadStream(file.path), file.originalFilename)
            //  fs.readFile(file.path,  (error, filedata) => {
            //     if(error) {
            //         throw error;
            //     }
            //      formData.append("file", await filedata, file.originalFilename);
            // });


            // https://discourse.earth2.ucsd.edu/uploads.json?client_id=347572fb1cd14f599664633f2203c684"
            // let requesturl = `${baseUrl}/uploads.json?client_id=${clientid}`
            let requesturl = `${baseUrl}/uploads.json`
            let headers = Object.assign({
                "Api-Key": userApiKey,
                "Api-Username": apiUsername,
            }, formData.getHeaders());

            let config = {
                url: requesturl,
                method: 'POST',
                data:  formData,
                headers: headers,

            }
            return  axios.request(config).then(
                response=>{
                    console.log(response)
                    var data = response.data
                    data['link'] = data.url
                    res.status(200).json(data)
                    resolve();
                }
            ).catch(
                err =>{
                    console.log(err)
                    res.status(400).json(err)
                    reject()
                }


            )
        }
    })
    })
}

