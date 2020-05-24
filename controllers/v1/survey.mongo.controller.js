const State = require('../../models/state.model');
const District = require('../../models/district.model');
const Block = require('../../models/block.model');
const Village = require('../../models/village.model');
const House = require('../../models/house.model');
const Member = require('../../models/member.model');

const {sendResponse} = require('../../config/response');

exports.dashboardMongo = async (req,res) => {
    try{
        const stateQuery = await State.countDocuments({}); 
        const districtQuery = await District.countDocuments({});
        const blockQuery = await Block.countDocuments({});
        const villageQuery = await Village.countDocuments({});
        const houseQuery = await House.countDocuments({});
        const memberQuery  = await Member.countDocuments({});

        return sendResponse(res, 200, 'Dashboard displayed successfully', {State : stateQuery, District : districtQuery, Block : blockQuery, Village : villageQuery, House : houseQuery, Member : memberQuery});

    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.statewiseAverageSalaryMongo = async (req,res) => {
    try{
       const result = await State.aggregate([{
            $lookup: {
                from: "District", // collection name in db
                localField: "_id",
                foreignField: "stateId",
                as: "district"
            }},
            { $unwind : '$district'},
            {
                $lookup: {
                    from: "Block", // collection name in db
                    localField: "district._id",
                    foreignField: "districtId",
                    as: "block"
                }},
                { $unwind : '$block'},
                {
                    $lookup: {
                        from: "Village", // collection name in db
                        localField: "block._id",
                        foreignField: "blockId",
                        as: "village"
                    }},
                    { $unwind : '$village'},
                    {
                        $lookup: {
                            from: "House", // collection name in db
                            localField: "village._id",
                            foreignField: "villageId",
                            as: "house"
                        }},
                        { $unwind : '$house'},
                        {
                            $lookup: {
                                from: "Member", // collection name in db
                                localField: "house._id",
                                foreignField: "houseId",
                                as: "member"
                            }},
                            { $unwind : '$member'},
                            {
                                $project: {
                                  "_id": 1,
                                  "name": 1,
                                  "district.name": 1,
                                  "block.name": 1,
                                  "village.name": 1,
                                  "house.houseNumber": 1,
                                  "member.name": 1,
                                  "member.salary" : 1,
                                  "member.gender" : 1
                                }
                              },
                              {
                                  $group: {
                                _id: "$name",
                                averageSalary: { $avg: "$member.salary" },
                                }
                            }                
       ]);
        return sendResponse(res, 200, 'Statewise Average salary displayed successfully', result);
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.statewiseGenderAverageSalaryMongo = async (req,res) => {
    try{
        const result = await State.aggregate([{
            $lookup: {
                from: "District", // collection name in db
                localField: "_id",
                foreignField: "stateId",
                as: "district"
            }},
            { $unwind : '$district'},
            {
                $lookup: {
                    from: "Block", // collection name in db
                    localField: "district._id",
                    foreignField: "districtId",
                    as: "block"
                }},
                { $unwind : '$block'},
                {
                    $lookup: {
                        from: "Village", // collection name in db
                        localField: "block._id",
                        foreignField: "blockId",
                        as: "village"
                    }},
                    { $unwind : '$village'},
                    {
                        $lookup: {
                            from: "House", // collection name in db
                            localField: "village._id",
                            foreignField: "villageId",
                            as: "house"
                        }},
                        { $unwind : '$house'},
                        {
                            $lookup: {
                                from: "Member", // collection name in db
                                localField: "house._id",
                                foreignField: "houseId",
                                as: "member"
                            }},
                            { $unwind : '$member'},
                            {
                                $project: {
                                  "_id": 1,
                                  "name": 1,
                                  "district.name": 1,
                                  "block.name": 1,
                                  "village.name": 1,
                                  "house.houseNumber": 1,
                                  "member.name": 1,
                                  "member.salary" : 1,
                                  "member.gender" : 1
                                }
                              },
                            {$group: {
                                _id: {
                                    name: "$name",
                                    gender: "$member.gender",
                                },
                                avg: {
                                    $avg: "$member.salary" 
                                }
                            }
                        }, 
                        {
                            $group: {
                                _id: "$_id.name",
                                Average_Salary: {
                                    $push: {
                                        gender: "$_id.gender",
                                        avgSalary: '$avg'
                                    }
                                }
                            }
                        }
                            
       ]);
   
          return sendResponse(res, 200, 'Statewise GenderWise Average salary displayed successfully', result);
       
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}

exports.getStateMongo = async (req,res) => {
    try{
        const result = await State.find({});
          let stateArray = [];
          result.map(item => {
            stateArray.push(item.name)
          })
          return sendResponse(res, 200, 'State displayed successfully', stateArray)
      
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getDistrictMongo = async (req,res) => {
    try{
        const result = await District.find({stateId : req.params.stateId});
          let districtArray = [];
          result.map(item => {
            districtArray.push(item.name)
          })
          return sendResponse(res, 200, 'District displayed successfully', districtArray)

    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getBlockMongo = async (req,res) => {
    try{
        const result = await Block.find({districtId : req.params.districtId});
          let blockArray = [];
          result.map(item => {
            blockArray.push(item.name)
          })
          return sendResponse(res, 200, 'Blocks displayed successfully', blockArray)
    
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getVillageMongo = async (req,res) => {
    try{
        const result = await Village.find({blockId : req.params.blockId});
          let villageArray = [];
          result.map(item => {
            villageArray.push(item.name)
          })
          return sendResponse(res, 200, 'Villages displayed successfully', villageArray)
       
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}
exports.getHouseMongo = async (req,res) => {
    try{
        const result = await House.find({ villageId : req.params.villageId});
          let houseArray = [];
          result.map(item => {
            houseArray.push(item.houseNumber)
          })
          return sendResponse(res, 200, 'House displayed successfully', houseArray)
    
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong");
    }
}

exports.addHouseMongo = async ({params : {villageId} , body : {houseNumber, headName}},res) => {
    try{
       const newHouse = await House.create({ houseNumber, headName, villageId });
       if(newHouse) return sendResponse(res, 200, 'House Created successfully', newHouse);
       else return sendResponse(res, 500, 'Error while saving to database. Please try again');

    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong", err.message);
    }
}

exports.addMemberMongo = async ({params : {houseId} , body : {name, age, salary, gender}},res) => {
    try{
        const newMember = await Member.create({ name, age, salary, gender ,houseId });
        if(newMember) return sendResponse(res, 200, 'Member Created successfully', newMember);
        else return sendResponse(res, 500, 'Error while saving to database. Please try again');
    }catch (err){
        console.log("Error Occurred", err);
        return sendResponse(res, 500, "Something went wrong", err.message);
    }
}