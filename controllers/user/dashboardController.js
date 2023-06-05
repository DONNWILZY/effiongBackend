import Dashboard from "../models/Dashboard.js";

/////CREATE HOTEL
export const createDashBoard = async (req, res, next) =>{
    const Addinfo = new Dashboard(req.body)

    try{
        const savedinfo = await Addinfo.save();
        res.json({
            status: 200,
            message: "successfully edited information",
            data: savedinfo
        });

    }catch(err){
        next(err);
    }
}

////// UPDATE HOTEL
export const updateHotel = async (req, res, next) =>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: value },
            { new: true }
          );
          res.json({
            status: 200,
            message: `Hotel with ID ${req.params.id} updated`,
            data: updatedHotel,
          });
        //catch blog for update
    }catch(err){
        next(err);
    }
}

/////DELETE HOTEL
export const deleteHotel = async (req, res, next) =>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.json({
            status: 200,
            message: `Hotel with ID:  ${req.params.id} deleted succesfully`
        })
        //catch blog for delete
    }catch(err){
        next(err);
    }
}


/////// GET HOTEL BY ID
export const getHotel = async (req, res, next) =>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.json({
            status: 200,
            message: `hotel with this ID(s) ${req.params.id} found`,
            data: hotel
        })

    }catch(err){
        next(err);
    }
}

/////GET ALL HOTELS
export const getAllHotels = async (req, res, next) =>{
    try{
        const hotels = await Hotel.find();
        res.json({
            status: 200,
            message: hotels
        })

    }catch(err){
        next(err);
    }
}