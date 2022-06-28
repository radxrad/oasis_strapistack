Some things about the discourse information model

Topics
  have posts (with a topic_id if fetched indivually)

So oasis model:
Questions are topics,
  this 'micropub' is an indivudal post
    reviews are additional posts


------
get lastest_posts /posts.json
  includes topic_titles

get a single post /posts/{{id}}.json
  only topic id

get a topic  /t/{{id}}.json

get a topic with posts: /t/:id/posts.json


-----
File Upload
SignUp missing
Make SignIn

Hook buttons up.

Top questions

References on read page

--- 
auth
in a site need to setup admin>security>cors
even if is it configrued in the default app.yaml





