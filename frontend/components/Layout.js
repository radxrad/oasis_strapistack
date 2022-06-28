// components/Layout.js
import React, {Component, useEffect, useState} from 'react';
import CustomNavbar from './CustomNavbar';

function Layout (props){
    const { children } = props
    const [user, setUser] = useState({ profilePic: "" });
    const [auth, setauth] = useState();
   // const auth = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        setauth( JSON.parse(localStorage.getItem("user")));
        if (auth) {
            const options = {
                method: "GET",
                url: `https://stoplight.io/mocks/oasis/oasis/19253909/user/${auth.userId}`,
                headers: { "Content-Type": "application/json" },
            };

            axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    setUser(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


        return (
            <div className='root'>
                <CustomNavbar user={user} auth={auth} />
                {children}
            </div>
        );

}

export default Layout
