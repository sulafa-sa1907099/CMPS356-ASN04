"use client"
import fs from "fs";
const uuid = require('uuid')
let ideas;



export default async function handler(req, res) {
    const file = await fs.promises.readFile("tmp/ideas.json");
    ideas = JSON.parse(file)

    if (req.method === "GET") {
        
          res.status(200).json(ideas.filter(idea => idea.user == req.query.user));
        
      } else if (req.method === "POST") {
        const idea = {
            id: uuid.v4(),
            ...req.body
        }
        ideas.push(idea)
        saveData()
        res.status(200).json(idea);

      }else if(req.method === "DELETE"){
        const {user, id} = req.query
        const index = ideas.findIndex(idea => idea.user == user && idea.id == id)
        ideas.splice(index, 1)
        saveData()
        res.status(200).json(id)
      }
      else  {
        res.status(405).json("Method not allowed.")
      }
}

function saveData() {
    fs.writeFileSync('tmp/ideas.json', JSON.stringify(ideas, null, 4));
}
