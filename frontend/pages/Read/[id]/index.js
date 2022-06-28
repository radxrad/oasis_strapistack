import React, {useEffect, useState} from "react";
import { Container, Button, Modal, Form  } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import {BsCloudDownload, BsStar, BsStarFill} from "react-icons/bs";
import { GoArrowDown, GoArrowUp } from "react-icons/go"
import MicropubBody from "../../../components/MicropubBody";
import text from "../../text.json";
import AddQuestion from "../../../components/AddQuestion";
import moment from "moment";
import  Image from 'next/image'
import { useRouter } from 'next/router'

import postsToMicropub from "../../../js/postToMicropub";
import MicropubCard from "../../../components/MicropubCard";

import VisibilitySelector from "../../../components/VisibilitySelector";
import StarRating from "../../../components/StarRating";
import {fetchAPI} from "../../../lib/api";




export default function Index() {
  const router = useRouter()

  const example = text.micropub;
  const time = moment.unix(example.publishTime).format("MM/DD/YYYY");
  const [micropubs, setMicropubs] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState();

  const [show, setShow] = useState(false);
  const [voteType, setVoteType] = useState(null);
  const [voteNum, setVoteNum] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewRatingHover, setReviewRatingHover] = useState(0);
  const [reviews] = useState([{ user: "Aa", text: "testing", rating: 3 }]);
  const handleStar = () => setIsStarred(!isStarred);
  const handleSelect = (e) => setVisibility(e);
  const [visibility, setVisibility] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //export async function getStaticPaths() {
   async function getStaticPaths() {
    const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

    return {
      paths: articlesRes.data.map((article) => ({
        params: {
          slug: article.attributes.slug,
        },
      })),
      fallback: false,
    };
  }

   async function getStaticProps({ params }) {
    const articlesRes = await fetchAPI("/articles", {
      filters: {
        slug: params.slug,
      },
      populate: ["image", "category", "author.picture"],
    });
    const categoriesRes = await fetchAPI("/categories");

    return {
      props: { article: articlesRes.data[0], categories: categoriesRes },
      revalidate: 1,
    };
  }


  useEffect(() => {
    if(!router.isReady) return;
    const { id } = router.query
    console.log("query")
    console.log("passed id" + id )
    var qid = id
    var url = `/articles/${qid}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      // body: JSON.stringify(form)
      //body: body
    })
        .then(
            response => response.json()
        )
        .then(data => {
          if (data.errors){
            setMicropubs([]);
          }
            let pubs = data
            if (! Array.isArray(data)  ){
              pubs = [data]
            }
             pubs = postsToMicropub(pubs)
            console.log(pubs);
            setMicropubs(pubs);

        }).catch(err =>  {
        console.log(err);
      //  navigate('/message?d=postfail')
      })
  }, [router.isReady, router.query])
  const handleVoteClick = (type) => {
    if (voteType === null) {
      setVoteNum(type === true ? voteNum + 1 : voteNum - 1);
      setVoteType(type);
    } else if (type === voteType) {
      setVoteType(null);
      setVoteNum(type === true ? voteNum - 1 : voteNum + 1);
    } else {
      setVoteType(type);
      setVoteNum(type === true ? voteNum + 2 : voteNum - 2);
    }
  };

  const writeReview = (
      <Form className="write-review">
        <Form.Group style={{ flex: "1 0" }}>
          <Form.Control
              as="textarea"
              placeholder="Write a review..."
              className="review"
          />
        </Form.Group>
        <Form.Group className="controls">
          <div className="selectors">
            <StarRating
                rating={reviewRating}
                setRating={setReviewRating}
                hover={reviewRatingHover}
                setHover={setReviewRatingHover}
                readonly={false}
            />
            <VisibilitySelector
                visibility={visibility}
                handleSelect={handleSelect}
            />
          </div>

          <Button className="btn--md">
            <MdRateReview />
            Post Review
          </Button>
        </Form.Group>
      </Form>
  );

  return (
    <Container id="read" className="max-window">
      <Modal show={show} onHide={handleClose}>
        <AddQuestion close={handleClose} />
      </Modal>
      <div>
      {micropubs.length > 0 &&
      <MicropubBody
          figure={micropubs.attributesfigure}
          authorIds={micropubs.attributes.authorNames}
          title={micropubs.attributes.title}
          abstract={micropubs[0].abstract}
          id={micropubs[0].id}
          body={micropubs[0].body}
          mp={micropubs[0]}
          refList={micropubs[0].refList}
      ></MicropubBody>
      }
      {writeReview}
      <div className="review__wrapper">
        {reviews
            ? reviews.map((item, i) => (
                <div id={i} key={i} className="review__item">
                  <div className="header">
                    {item.user}{" "}
                    <StarRating readonly={true} rating={item.rating} />{" "}
                  </div>
                  {item.text}
                </div>
            ))
            : ""}
      </div>
      </div>
      <div className="sidebar">
        <div className="info">
          <div className="publish-time">
            <div className="label">Published:</div>
            <div className="time">{time}</div>
          </div>
          <div className="authors">
            <div className="label">Author(s):</div>
            <div className="list">
              {example.authorIds
                ? example.authorIds.map((author) => (
                    <a href={author.link} key={author.id}>
                      <Image
                        src={author.img}
                        className="avatar--sm"
                        alt="avatar"
                      />
                      {author.name}
                    </a>
                  ))
                : ""}
            </div>
          </div>
          <div className="data">
            <div className="label">Data and Resources:</div>
            <div className="list">
              {example.data
                ? example.data.map((file) => (
                    <a href={file.link} key={file.id}>
                      {file.name}
                      <BsCloudDownload className="sidebar__icon" />
                    </a>
                  ))
                : ""}
            </div>
          </div>
          <div className="reviews">
            <div className="label">Reviews:</div>
            <div className="stars">
              <BsStar /> <BsStar /> <BsStar /> <BsStar /> <BsStar />(
              {example.reviewNum})
            </div>
          </div>
          <Button className="btn--white">View Related Questions</Button>
        </div>
        <div className="controls">
          <div className="icon-group">
            <div id="vote-btn" className={"vote--" + voteType}>
              <GoArrowUp
                  id="upvote-btn"
                  onClick={() => handleVoteClick(true)}
              />
              {voteNum}
              <GoArrowDown
                  id="downvote-btn"
                  onClick={() => handleVoteClick(false)}
              />
            </div>

            <Button className="icon-btn" id="star-btn" onClick={handleStar}>
              {isStarred ? (
                  <BsStarFill className="star-btn--filled" />
              ) : (
                  <BsStar />
              )}
            </Button>
          </div>
          <Button
              className="btn--blue btn--md"
              onClick={() => setShowQuestion(true)}
          >
            <MdQuestionAnswer />
            Ask a Question
          </Button>
          <Button
              className="btn--blue btn--md"
              onClick={() => console.log("aa")}
          >
            <MdRateReview />
            Write a Review
          </Button>
        </div>
      </div>
    </Container>
  );
}
