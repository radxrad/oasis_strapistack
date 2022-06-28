import formidable from "formidable";
import Authenticate from "../../js/Authenticate";
import { getSession } from "../../lib/get-session.js";

export default async function handler(req, res) {
    const authenticate = new Authenticate()
    const session = await getSession(req, res);
    const data = await new Promise((resolve, reject) => {

                authenticate.login (req.body.username, req.body.password)


    } )

}
