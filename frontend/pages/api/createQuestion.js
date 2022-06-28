import Discourse from 'discourse-js';
import bodyParser from 'body-parser'
import axios from 'axios'
import FormData from 'form-data';


/* formdata:
 raw: Example to get what the is supposed to be posted
title: Example2 fifteen characters long
unlist_topic: false
category: 1
is_warning: false
archetype: regular
typing_duration_msecs: 13800
composer_open_duration_msecs: 36852
tags[]: covid
shared_draft: false
draft_key: new_topic
ratings: []
nested_post: true

==
 response:
 {
    "action": "create_post",
    "post": {
        "id": 31,
        "name": null,
        "username": "valentinedwv",
        "avatar_template": "/letter_avatar_proxy/v4/letter/v/67e7ee/{size}.png",
        "created_at": "2021-10-13T23:17:51.036Z",
        "cooked": "\u003cp\u003eExample to get what the is supposed to be posted\u003c/p\u003e",
        "post_number": 1,
        "post_type": 1,
        "updated_at": "2021-10-13T23:17:51.036Z",
        "reply_count": 0,
        "reply_to_post_number": null,
        "quote_count": 0,
        "incoming_link_count": 0,
        "reads": 0,
        "readers_count": 0,
        "score": 0,
        "yours": true,
        "topic_id": 26,
        "topic_slug": "example2-fifteen-characters-long",
        "display_username": null,
        "primary_group_name": null,
        "flair_name": null,
        "flair_url": null,
        "flair_bg_color": null,
        "flair_color": null,
        "version": 1,
        "can_edit": true,
        "can_delete": false,
        "can_recover": false,
        "can_wiki": true,
        "user_title": null,
        "bookmarked": false,
        "raw": "Example to get what the is supposed to be posted",
        "actions_summary": [
            {
                "id": 3,
                "can_act": true
            },
            {
                "id": 4,
                "can_act": true
            },
            {
                "id": 8,
                "can_act": true
            },
            {
                "id": 7,
                "can_act": true
            }
        ],
        "moderator": false,
        "admin": true,
        "staff": true,
        "user_id": 1,
        "draft_sequence": 0,
        "hidden": false,
        "trust_level": 1,
        "deleted_at": null,
        "user_deleted": false,
        "edit_reason": null,
        "can_view_edit_history": true,
        "wiki": false,
        "reviewable_id": null,
        "reviewable_score_count": 0,
        "reviewable_score_pending_count": 0,
        "category_expert_approved_group": null,
        "needs_category_expert_approval": null,
        "can_manage_category_expert_posts": true,
        "qa_vote_count": 0,
        "qa_voted": [],
        "qa_enabled": false,
        "ratings": [],
        "can_accept_answer": false,
        "can_unaccept_answer": false,
        "accepted_answer": false
    },
    "success": true
}

 */

const userApiKey = process.env.DIS_API_KEY;
const apiUsername = process.env.DIS_API_USERNAME;
const baseUrl = process.env.DIS_URL || 'http://localhost:3000';

const discourse = new Discourse();
discourse.config({ userApiKey, apiUsername, baseUrl })

export default function handler(req, res) {
    let random = Math.random();
    let body = req.body
    // add check to see
    let topic_id = body.topic_id
    let raw = body.raw.toString()
    let title = body.title.toString()
    let imageUri = body.uri
    var formData = new FormData()
    //formData.append("topic_id", 15);
    formData.append("raw", raw);
    //formData.append("raw", "<p>Example  ${random} to get what the is supposed to be posted</p>" );
    formData.append("title", title);
   //  var formData = {
   //      "raw" : "Example  ${random} to get what the is supposed to be posted",
   //      "title": `Example ${random} to get what the is supposed to be  ${random} posted`
   //  }
    let requesturl = `${baseUrl}/posts`

    let headers = Object.assign({
        "Api-Key": userApiKey,
        "Api-Username": apiUsername,
    }, formData.getHeaders());

    let config = {
        url: requesturl,
        method: 'post',
        data: formData,
        headers: headers,

    }
   return axios.request(config).then(
       response=>{
           console.log(response)

        res.status(200).json(response.data)
         }
    ).catch(
        err =>{
            console.log(err)
            res.status(400).json(err.message)
        }
    )
    // discourse.posts
    //     .create(formData)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));

}

