require('../config/config');

const {mongoose} =require('../db/mongoose');

const {Story}=require('../models/Story');

const id=new mongoose.Types.ObjectId("5a106182faadfe3df8dac60e");
const id_user=new mongoose.Types.ObjectId("5a1065164f1d5b407c170f44");
const id_new=new mongoose.Types.ObjectId;
console.log(id,id_new);

Story.findOne({
  _id:id
})
.or([{'status':'public'},{'user':id_user}])
.select(['title','user.firstName'])
.then(story=>{
  if(!story) return console.log('Story not found');
  console.log(story);
});