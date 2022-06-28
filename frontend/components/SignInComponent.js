import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

//import dynamic from 'next/dynamic';
//import Discourse from "discourse-client";
import ResourcesTab from "./ResourcesTab";
//const Discourse = dynamic(() => import('discourse-client'), { ssr: false });
//const Discourse = import('discourse-client').default
import Authenticate from "../js/Authenticate";

function SignInComponent() {
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
 const handleUsername = (e)=> setUsername(e.target.value)
  const handlePassword = (e)=> setPassword(e.target.value)
   // const Auth = new Authenticate()
  async function handleSignIn(e) {

   // console.log(Authenticate);
   // let auth =  await Auth.login(username,password)
      fetch('api/signin', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json; charset=UTF-8'
          },
          // body: JSON.stringify(form)
          body: JSON.stringify({username:username,password:password})
      }).then( (auth) =>{
          console.log(auth)
          setLoggedIn(auth)
      } )

    // const authClient = new Discourse({
    //   appName: 'Oasis',
    //   apiBaseUrl: 'https://discourse.earth2.ucsd.edu/',
    //   scopes: ['write','read','session_info','notifications']
    // })
    // e.preventDefault();
    // authClient.login()

    // const options = {
    //   method: "POST",
    //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/signin",
    //   headers: { "Content-Type": "application/json", Prefer: "" },
    //   data: { email: "alice.smith@gmail.com", password: "1234" },
    // };
    //
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //     window.location.replace("/user");
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }
  // async function handleSignIn(e) {
  //   e.preventDefault();
  //
  //   const options = {
  //     method: "POST",
  //     url: "https://stoplight.io/mocks/oasis/oasis/19253909/signin",
  //     headers: { "Content-Type": "application/json", Prefer: "" },
  //     data: { email: "alice.smith@gmail.com", password: "1234" },
  //   };
  //
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //       window.location.replace("/user");
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  return (
<div>
      <Form className="signup__container">
        <div className="signup__header">Sign In</div>
        <Form.Group>
          <Form.Control
           // type="email"
            className="signup__textbox"
            placeholder="Email"
            value={username}
            onChange={handleUsername}
          />
          <Form.Control
            type="password"
            className="signup__textbox"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button
          className="btn--md"
          type="submit"
          onClick={(e) => handleSignIn(e)}
        >
          Sign In
        </Button>
        <a href="/signup">New to OASIS? Sign up now</a>
      </Form>
</div>
  );
}
export default SignInComponent;
