const Dotenv = require('dotenv-webpack');
const path = require('path')
module.exports = {
  reactStrictMode: true,
    plugins: [
        new Dotenv()
    ],
    images: {
        loader: "default",
        domains: ['dummyimage.com','source.unsplash.com',"localhost"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },

}



