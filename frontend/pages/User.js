import React, {useEffect, useState} from "react";
import { Button, ListGroup, Container, Modal } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ListItem from "../components/ListItem";
import Question from "../components/Question";
//import history from "history.js";
import text from "./text.json";
import AddQuestion from "../components/AddQuestion";
import  Image from 'next/image'
import postsToMicropub from "../js/postToMicropub";
import {useRouter} from "next/router";

export default function User() {
  const router = useRouter()
  const [userData, setUserData] = useState();
  const [userMicropubs, setUserMicropubs] = useState([])


  const exampleQuestion = text.question;
  useEffect(() => {
    const userMock = {
      name: "User",
      id: -1,
      avatar_template: "https://source.unsplash.com/random",
    };
    if(!router.isReady) return;
    const { user } = router.query
    console.log("user")
    console.log("passed user" + user )

    var url = `/api/user?id=${user}`
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
          setUserData(userMock)
        }
        let userDiscoruce = data.user
        setUserData(userDiscoruce)


      }).catch(err =>  {
    console.log(err);
    //  navigate('/message?d=postfail')
  })
    var mpurl = `/api/userMicropubs?id=${user}`
    fetch(mpurl, {
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
            setUserMicropubs([])
          }
          let userMps = data.user_actions
          setUserMicropubs(userMps)


        }).catch(err =>  {
      console.log(err);
      //  navigate('/message?d=postfail')
    })

}, [router.isReady, router.query])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="userpage">
      <Modal show={show} onHide={handleClose}>
        <AddQuestion close={handleClose} />
      </Modal>
      {userData  && <div>

        <div className="welcome heading">
          <Image src={userData.avatar_template} alt="user-avatar" className="avatar--lg" width="80" height="80"></Image>
          Welcome, {userData.name}
        </div>
        <div className="block">
          <div className="heading">
            My Micropubs{" "}
            <Button
                className="btn--blue btn--lg"
                onClick={() => history.push("/publish")}
            >
              <BsFillPlusSquareFill/>
              <span>Create a Micropub</span>
            </Button>
          </div>
          <ListGroup className="list-group--small">
            {userMicropubs
                ? userMicropubs.map((item, i) => (
            <ListItem
                type="micropub"
                title={item.title}
                id={item.uid}
                key={i}
            ></ListItem>
                ))

            : ""}
          </ListGroup>
        </div>

        <div className="block">
          <div className="heading">
            My Question & Answers
            <Button className="btn--blue btn--lg" onClick={handleShow}>
              <MdQuestionAnswer close={handleClose}/>
              <span>Ask a Question</span>
            </Button>
          </div>
          <ListGroup className="list-group--small">
            <ListItem
                type="question"
                title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>
            <ListItem
                type="answer"
                title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>
            <ListItem
                type="question"
                title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>
          </ListGroup>
        </div>
      </div>
      }
      <div>
        <div className="block">
          <div className="heading">
            My Feeds
            <Button className="btn--blue btn--lg">Browse Open Questions</Button>
          </div>
          <ListGroup className="list-group--large">
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
          </ListGroup>
        </div>
      </div>
    </Container>
  );
}
