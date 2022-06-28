import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton, Form,
  ListGroup, Modal,
  Tab, TabContainer, TabContent,
  Table, TabPane, Tabs,
} from "react-bootstrap";
import { BiGlobe } from "react-icons/bi";
import MicropubCard from "../components/MicropubCard";
import text from "./text.json";
import MicropubBody from "../components/MicropubBody";
import { EditorState,convertToRaw } from "draft-js";
//import history from "history.js";
// import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import VisibilitySelector from "../components/VisibilitySelector";
import ResourcesTab from "../components/ResourcesTab";

import dynamic from 'next/dynamic'
import router from 'next/router'
import  Image from 'next/image'
//import TextEditor from "../components/TextEditor";
const  TextEditor= dynamic(() => import( "../components/TextEditor"), { ssr: false });

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {FiDelete} from "react-icons/fi";
const ResourceItem = dynamic(() => import( "../components/ResourceItem"), { ssr: false });

export default function Publish() {
// Convert these values to html: draftToHtml(convertToRaw(abstractValue.getCurrentContent()));
    const [titleValue, setTitleValue] = useState("");
  const [abstractValue, setAbstractValue] = useState(EditorState.createEmpty());
  const [bodyValue, setBodyValue] = useState(EditorState.createEmpty());
  const [keywordsArray, setKeywordsArray ] = useState(['covid'])
  const [refList, setRefList] = useState([]);
  const [resources, setResources] = useState([]);
  const [visibility, setVisibility] = useState("");
  const [activeTab, setActiveTab] = useState("#abstract");
  const [errors, setErrors]= useState("");
  const [showError, setShowError] = useState(false);

  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);

  const handleSelect = (e) => setVisibility(e);
  const handleAbstractChange = (e) => setAbstractValue(e);
  const handleBodyChange = (e) => setBodyValue(e);

  const micropub = text.micropub;
   const handleTitleChange=  (event) =>{
       setTitleValue( event.target.value);
    }
  // const handleSave = () => {
  //  // const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
  //   const hasErrors = false
  //   setErrors(hasErrors)
  //   let title =titleValue
  //
  //   const abstractHtml =draftToHtml(convertToRaw(abstractValue.getCurrentContent()))
  //     const bodyHtml = draftToHtml(convertToRaw(bodyValue.getCurrentContent()))
  //
  //
  //
  //     let raw = `<div class="radx" <div class='abstract'> ${abstractHtml} </div>
  //               <div class="body">${bodyHtml} </div>
  //               <div class="referenceList">${refList}</div>
  //
  //            </div>
  //     `
  //     let body = JSON.stringify({"title":title, "raw":raw, "tags[]":keywordsArray})
  //   if(!hasErrors) {
  //     setFetching(true)
  //     fetch('api/createPost', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8'
  //       },
  //   //    body: JSON.stringify(form)
  //       body: body
  //     })
  //         // THIS IS HANDLE SAVE
  //         .then(response => response.json())
  //         .then(data => {
  //           if(data.success) {
  //             console.log("saved")
  //           } else {
  //            // navigate('/message?d=postfail')
  //             console.log("error")
  //             handleErrorShow()
  //           }
  //         }).catch(err => {
  //       console.log("error")
  //       handleErrorShow()
  //     })
  //   }
  // }
  const handleSubmit = () => {
    var form = event.target
   // const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
    const hasErrors = false
    setErrors(hasErrors)
      let title =titleValue

      const abstractHtml =draftToHtml(convertToRaw(abstractValue.getCurrentContent()))
      const bodyHtml = draftToHtml(convertToRaw(bodyValue.getCurrentContent()))
      let raw = `<div class="radquestion" > 
                   <div class='abstract'> ${abstractHtml} </div>
                    <div class="body">${bodyHtml} </div>
                    <div class="referenceList">${refList}</div>
                    <div class="resources">${resources}</div>
                 </div>
      `
      let tags = keywordsArray
    //let title =convertToRaw(abstractValue.getCurrentContent())

   // let raw =convertToRaw(bodyValue.getCurrentContent())
      // "tags[]" is repeated in the formbody in discourse.. so will need to do something.
    let body = JSON.stringify({"title":title, "raw":raw, "tags[]":keywordsArray[0]})
    if(!errors) {
      ///setFetching(true)
      fetch('api/createQuestion', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
       // body: JSON.stringify(form)
        body: body
      })
          // THIS IS HANDLE CREATE
          .then(response => response.json())
          .then(data => {
            if(data.id) {
              //navigate('/message?d=postcreated')
              router.push({
                pathname: '/Read/[pid]',
                query: { pid: data.id },
              })
            } else {
              // navigate('/message?d=postfail')
              handleErrorShow()
            }
          }).catch(err => {
        console.log(err)
        handleErrorShow()
      })
    }
  }

  const tabNav = (
      <div className="tab__nav">
        <h2 className="heading">Create a Micropub</h2>
        <ListGroup defaultActiveKey={activeTab} onSelect={(e) => setActiveTab(e)}>
          <ListGroup.Item
              action
              href="#abstract"
              active={"#abstract" === activeTab}
          >
            Abstract
          </ListGroup.Item>
          <ListGroup.Item
              action
              href="#resources"
              active={"#resources" === activeTab}
          >
            <span>Data and </span>Resources
          </ListGroup.Item>
          <ListGroup.Item action href="#body" active={"#body" === activeTab}>
            Body
          </ListGroup.Item>
          <ListGroup.Item
              action
              href="#preview"
              active={"#preview" === activeTab}
          >
            Preview
          </ListGroup.Item>
        </ListGroup>
      </div>
  );

  const tabContent = (
      <div className="tab__content">
        <TabContent defaultActiveKey={activeTab}>
          <TabPane eventKey="#abstract" active={"#abstract" === activeTab}>
            <div className="abstract">
              <input
                  type="textarea"
                  placeholder="What question would you like to answer?..."
                  value={titleValue}
                  onChange={handleTitleChange}
              />
              <TextEditor
                  parent="abstract"
                  value={abstractValue}
                  onChange={handleAbstractChange}
                  refList={refList}
                  setRefList={setRefList}
              />
            </div>
          </TabPane>
          <TabPane eventKey="#resources" active={"#resources" === activeTab}>
            <ResourcesTab resources={resources} setResources={setResources}/>
          </TabPane>
          <TabPane eventKey="#body" active={"#body" === activeTab}>
            <div className="body-tab">
              <div className="label">Body</div>
              <TextEditor
                  parent="body"
                  value={bodyValue}
                  onChange={handleBodyChange}
                  refList={refList}
                  setRefList={setRefList}
              />
            </div>
          </TabPane>
          <TabPane eventKey="#preview" active={"#preview" === activeTab}>
            <div className="preview">
              <div className="label">Card Preview</div>
              <MicropubCard
                  img={micropub.img}
                  authorIds={micropub.authorIds}
                  title={titleValue}
                  abstract={draftToHtml(convertToRaw(abstractValue.getCurrentContent()))}
              ></MicropubCard>
              <div className="label">Micropub Preview</div>
              <MicropubBody
                  title={titleValue}
                  figure={micropub.img}
                  body={draftToHtml(convertToRaw(bodyValue.getCurrentContent()))}
                  refList={refList}
              />
            </div>
          </TabPane>
        </TabContent>
      </div>
  );

  const sidebar = (
      <div className="sidebar">
        <div className="list">
          <div className="label">Authors</div>
          <div className="search">
            Add Author: <input type="text" placeholder="Search"></input>
          </div>
        </div>
        <div>
          <div className="label">Visibility</div>
          <VisibilitySelector
              visibility={visibility}
              handleSelect={handleSelect}
          />
        </div>
        <div>
          <div className="label">Keywords</div>
          <div className="search">
            Add Keyword: <input type="text" placeholder="Search"></input>
          </div>
        </div>
        <div>
          <div className="label">Uploaded Resources</div>
          < Table >
            <tbody>
            {resources
          ? resources.map((item, i) => (
                    <ResourceItem props={item} key={i}/>
          ))
          : "" }
            </tbody>
          < /Table>
        </div>
        <div style={{ flex: 1, background: "none" }}></div>
        <div className="controls">
          <Button className="btn--sm btn--lightblue" variant="primary">
            Save
          </Button>
          <Button className="btn--sm btn--blue" variant="primary" onClick={handleSubmit}>
            Publish
          </Button>
          <Button
              className="btn--sm btn--discard"
              variant="danger"
              onClick={() => history.push("/user")}
          >
            Discard
          </Button>
        </div>
      </div>
  );
    // const DynamicNoSSR =  dynamic(() => (
    //     <div id="publish">
    //         <Tab.Container defaultActiveKey={activeTab}>
    //             <div className="max-window">
    //                 {tabNav}
    //                 {tabContent}
    //                 {sidebar}
    //             </div>
    //         </Tab.Container>
    //     </div>
    // ), { ssr: false });
    // return  DynamicNoSSR
  return (
      <div id="publish">
        <TabContainer defaultActiveKey={activeTab}>
          <div className="max-window">
            {tabNav}
            {tabContent}
            {sidebar}
          </div>
        </TabContainer>

      </div>
  );
}
