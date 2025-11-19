let notes=[];let nextId=1;
const express=require("express");const router=express.Router();
router.post("/",(req,res)=>{const{title,content}=req.body;const n={id:nextId++,title,content};notes.push(n);res.json(n);});
router.get("/",(req,res)=>res.json(notes));
router.get("/:id",(req,res)=>{const n=notes.find(x=>x.id==req.params.id);if(!n)return res.status(404).end();res.json(n);});
router.put("/:id",(req,res)=>{const n=notes.find(x=>x.id==req.params.id);if(!n)return res.status(404).end();Object.assign(n,req.body);res.json(n);});
router.delete("/:id",(req,res)=>{const i=notes.findIndex(x=>x.id==req.params.id);if(i<0)return res.status(404).end();notes.splice(i,1);res.json({ok:true});});
module.exports=router;