import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
import { createError } from "../errormgt/error.js";



export const createRoom = async (req, res, next)=>{
    ///// Import Hotel ID
    const hotelId = req.params.hotelid;


    //// CREATE NEW ROOM
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}})
        }catch(err){
            next(err); 
        }
        res.json({
            status: 201,
            Message: "room added with number",
            data: savedRoom,
        })
    }catch(err){
        next(err)
    }
}

////// UPDATE ROOM
export const updateRoom = async (req, res, next) =>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
          );
          res.json({
            status: 200,
            message: `Room with ID ${req.params.id} updated`,
            data: updatedRoom,
          });
        //catch blog for update
    }catch(err){
        next(err);
    }
}

/////DELETE room
export const deleteRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id},
            });
        }catch(err){
            next(err); 
        }
        res.json({
            status: 200,
            message: `Room with ID:  deleted succesfully`
        })
        //catch blog for delete
    }catch(err){
        next(err);
    }
}


/////// GET HOTEL BY ID
export const getRoom = async (req, res, next) =>{
    try{
        const room = await Room.findById(req.params.id);
        res.json({
            status: 200,
            message: `hotel with this ID(s) ${req.params.id} found`,
            data: room
        })

    }catch(err){
        next(err);
    }
}

/////GET ALL Rooms
export const getAllRooms = async (req, res, next) =>{
    try{
        const rooms = await Room.find();
        res.json({
            status: 200,
            message: rooms
        })

    }catch(err){
        next(err);
    }
}



export const updateRoomAvailability = async (req, res, next) =>{    
    try{
        const updatedRoomAvailability = await Room.findOneAndUpdate(
            {"roomNumbers._id": req.params.id}, 
            {$push: {"roomNumbers.$.unavailableDates": req.body.dates}},
            {new: true}
        );
        
          res.json({
            status: 200,
            message: `Room date with ID ${req.params.id} updated`,
           // data: updatedRoomAvailability,
          
          });
        //catch block for update
    }catch(err){
        next(err);
    }
}



/*
////// UPDATE ROOM AVAIL
export const updateRoomAvailability = async (req, res, next) =>{
    try{
        await Room.findOne(
            {"roomNumbers._id": req.params.id}, 
            {
        $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
        }
        });
        
          res.json({
            status: 200,
            message: `Room  date with ID updated`
          });
        //catch blog for update
    }catch(err){
        next(err);
    }
}
*/