import Hotel from "../models/Hotels.js";
import Room from "../models/Rooms.js";

/////CREATE HOTEL
export const createHotel = async (req, res, next) =>{
    const newHotel = new Hotel(req.body)

    try{
        const savedhotel = await newHotel.save();
        res.json({
            status: 200,
            message: "successfully Created New Hotel",
            data: savedhotel
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
            { $set: req.body},
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
    const {min, max, ...others} = req.query
    try{
        const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min | 1, $lt: max || 2200},
        }).limit(req.query.limit);
        res.json({
            status: 200,
            message: hotels
        })

    }catch(err){
        next(err);
    }
}


/////SORT HOTELS by cities
export const countByCity = async (req, res, next) =>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }));
        res.json({
            status: 200,
            message: list
        })

    }catch(err){
        next(err);
    }
}


/////SORT by type
export const countByType = async (req, res, next) =>{
    try{
       const hotelCount = await Hotel.countDocuments({type: "hotel"})
       const apartmentCount = await Hotel.countDocuments({type: "apartment"})
       const resortCount = await Hotel.countDocuments({type: "resort"})
       const villaCount = await Hotel.countDocuments({type: "villa"})
       const cabinCount = await Hotel.countDocuments({type: "cabin"})
       const tentCount = await Hotel.countDocuments({type: "tent"})

       res.json({
        status: 200,
        message: "RESULTS",
        data: [
            {type: "hotel", count: hotelCount},
            {type: "apartments", count: apartmentCount},
            {type: "resorts", count: resortCount},
            {type: "villas", count:villaCount},
            {type: "cabins", count: cabinCount},
            {type: "tents", count: tentCount}
        ]
       })


    }catch(err){
        next(err);
    }
}

 export const getHotelRooms = async (req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room)=>{
                return Room.findById(room);
            })
        )
            res.json({
                status: 200,
                message: "LIST OF ROOMS",
                data: list
            })

            console.log(list)
    }catch (err){
        next(err)
    }
 }