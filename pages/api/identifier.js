
import fs from "fs";
const uuid = require('uuid')
let users=null;
export default async function handler(req, res) {
    if (req.method === "GET") {
       
          const file = await fs.promises.readFile("tmp/users.json");
          users = JSON.parse(file)
          const identifier = uuid.v4()
          users.push(identifier)
          saveData()
          res.status(200).json(identifier);
       
      } else  {
        res.status(405).json("Method not allowed.")
      }
}

function saveData() {
    fs.writeFileSync('tmp/users.json', JSON.stringify(users, null, 4));
}