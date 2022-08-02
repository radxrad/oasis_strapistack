const Dotenv = require('dotenv-webpack');
const path = require('path')
module.exports = {
  reactStrictMode: true,
    plugins: [
        new Dotenv()
    ],
    images: {
        loader: "default",
        domains: ['dummyimage.com','source.unsplash.com',"localhost","strapi-ynme.onrender.com","strapi-jc84.onrender.com"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },

}



