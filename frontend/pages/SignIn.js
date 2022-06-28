import React, {useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import dynamic from 'next/dynamic';
import {useRouter} from "next/router";
//import Discourse from "discourse-client";
const SignInComponent = dynamic(() => import('../components/SignInComponent'), { ssr: false });
//const Discourse = import('discourse-client').default

export default function SignIn() {
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) return;
        const {payload} = router.query
        console.log("payload")
        console.log("passed payload" + payload)

    },[router.isReady, router.query] )
  // async function handleSignIn(e) {
  //
  //   const authClient =  Discourse({
  //     appName: 'Oasis',
  //     apiBaseUrl: 'https://discourse.earth2.ucsd.edu/',
  //     scopes: ['write','read','session_info','notifications']
  //   })
  //   e.preventDefault();
  //   authClient.login()
  //
  //   // const options = {
  //   //   method: "POST",
  //   //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/signin",
  //   //   headers: { "Content-Type": "application/json", Prefer: "" },
  //   //   data: { email: "alice.smith@gmail.com", password: "1234" },
  //   // };
  //   //
  //   // axios
  //   //   .request(options)
  //   //   .then(function (response) {
  //   //     console.log(response.data);
  //   //     localStorage.setItem("user", JSON.stringify(response.data));
  //   //     window.location.replace("/user");
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.error(error);
  //   //   });
  // }
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
    <div className="signin light-bg max-window">
      <SignInComponent></SignInComponent>
    </div>
  );
}
