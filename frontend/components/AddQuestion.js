import React from "react";
import {useEffect, useState} from "react";
import { DropdownButton, Dropdown, Form, Button } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BiGlobe } from "react-icons/bi";

import VisibilitySelector from "./VisibilitySelector";

function AddQuestion(props) {
  const [visibility, setVisibility] = useState(null);
  const handleSelect = (e) => setVisibility(e);
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState(false)
  const [fetching, setFetching] = useState(false)
  let submitButtonRef
  const handleChange = e => {
    form[e.target.name] = e.target.value
    setForm({...form})
  }

  const handleSubmit = () => {
    const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
    setErrors(hasErrors)
    if(!hasErrors) {
      setFetching(true)
      fetch('api/createQuestion', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(form)
      })
          .then(response => response.json())
          .then(data => {
            if(data.success) {
              navigate('/message?d=postcreated')
            } else {
              navigate('/message?d=postfail')
            }
          })
    }
  }

  // useEffect(() => {
  //   submitButtonRef.fetching(fetching)
  // }, [fetching, submitButtonRef])


  return (
      <Form className="popup">
        <Form.Group className="inputs">
          <div className="heading">Add a Question </div>
          <Form.Control type="text" placeholder="Question" className="subject" />
          <Form.Control
              as="textarea"
              placeholder="Descriptions"
              className="description"
          />
          <div className="search">
            Keywords: <input type="text" placeholder="Search"></input>
          </div>
          <div className="search">
            Make this question:
            <VisibilitySelector
                visibility={visibility}
                handleSelect={handleSelect}
            />
          </div>
          <div className="search">
            Tag Researchers: <input type="text" placeholder="Search"></input>
          </div>
          <div className="search">
            Tag a Micropub: <input type="text" placeholder="Search"></input>
          </div>
        </Form.Group>
        <Form.Group className="controls">
          <Button className="btn--lg btn--cancel" onClick={props.close}>
            Cancel
          </Button>
          <Button className="btn--lg">
            <MdQuestionAnswer />
            Ask a Question
          </Button>
        </Form.Group>
      </Form>
  );
}



export default  AddQuestion
