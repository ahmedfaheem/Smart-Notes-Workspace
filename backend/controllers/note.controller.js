
const asyncHandler = require("express-async-handler");
const Note = require("../models/node.model");
const { regex, success } = require("zod");
const { default: mongoose } = require("mongoose");

const createNote = async (req, res) => {
    const note = await Note.create({
        ...req.body,
        userId: req.user.id,
    });
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note,
});
}

const getNotes = asyncHandler(async (req, res) => {
     const {search, category, status, isPinned} = req.query;
     const page = Number(req.query.page) || 1;
     const limit = Number(req.query.limit) || 10;

     const skip = (page - 1) * limit;

     const filter = {
        userId: req.user.id,
     }

     if(search){
        filter.$or = [
            {
                title:{
                    $regex: search,
                    $options: "i"
                } 
            },
            {
                content:{
                    $regex: search,
                    $options: "i"
                }
            }
        ]
     } 


     if(category){
        filter.category = category;
     }

     if(status){
        filter.status = status
     }

     if(isPinned){
        filter.isPinned = true;
     }

     const notes = await Note.find(filter).sort({
        createdAt: -1
     }).skip(skip).limit(limit);

     if(!notes){
        throw new Error("Notes Not Found");
     }
    
      const totalNotes = await Note.countDocuments(filter);

     return res.json({
        success: true,
        pagination:{
            totalNotes,
            page,
            limit,
            totalPages: Math.ceil(totalNotes/ limit),
            hasNextPage: page <  Math.ceil(totalNotes/ limit),
            hasPrevPage: page > 1,
        },
         notes
     })
});
 

const getNote = asyncHandler(async (req, res)=>{

    const id = req.params.id;
    
    if(!mongoose.isValidObjectId(id)){
                res.status(400);
         throw new Error("Note Not Found")
    }

    

    const note = await Note.findOne({
        _id: id,
        userId: req.user.id
    });
   
  
      if(!note){
        res.status(400);
        throw new Error("Note Not Found");
    }
   


         return res.json({
            success: true,
            note
         });

});


const updateNote = asyncHandler(async (req, res)=>{
   
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400);
        throw new Error("Note Not Found");
    }

    const note = await Note.findOneAndUpdate(
        {
            _id: req.params.id,
            userId: req.user.id
        },
        req.body,
        {
            new:true,
            runValidators:true
        }
    );

      if(!note){
        res.status(400);
        throw new Error("Note Not Found");
    }

    return res.json({
        success: true,
        note
    })

});


const deleteNote = asyncHandler(async (req, res)=>{
   
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400);
        throw new Error("Note Not Found");
    }

    const note = await Note.findOneAndDelete(
        {
            _id: req.params.id,
            userId: req.user.id
        }
    );

      if(!note){
        res.status(400);
        throw new Error("Note Not Found");
    }

    return res.json({
        success: true,
        message: "Note Deleted Successfully"
    })

});



module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
};