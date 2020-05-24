
/*******************************  Module Dependencies ********************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
// mongoose.connect('mongodb://localhost/Survey')
//   .then(() => console.log('Now connected to MongoDB!'))
//   .catch(err => console.error('Something went wrong', err));

/********************************** Validations ***************************************/

/******************************* Schema Options ********************************/
let schemaOptions = {
  collection : 'House'
};

/***************************  Parent Schema : State *************************************/

const HouseSchema = new Schema({
    houseNumber : {
        type :String, 
        required : (true , "Please provide House Number.")
    },
    headName : {
        type :String, 
        required : (true , "Please provide House Head Name.")
    },
    villageId : { type: ObjectId, ref: "Village" }
  },
  schemaOptions);

/********************************** Pre-save Hooks ************************************/

/********************************** Virtuals ******************************************/

/********************************** Methods *******************************************/

/********************************** Exports *******************************************/

// const House = mongoose.model('House', HouseSchema);
// //Narayanpur
// let a = new House({
//   houseNumber : '12',
//   headName : 'John',
//   villageId : '5ec96723ea4c8c21377e6fff'
// });

// let b = new House({
//   houseNumber : '234',
//   headName : 'Mark',
//   villageId : '5ec96723ea4c8c21377e6fff'
// });

// //Paatuwas 
// let c = new House({
//   houseNumber : '212',
//   headName : 'Zack',
//   villageId : '5ec96723ea4c8c21377e7001'
// });

// let d = new House({
//   houseNumber : '65',
//   headName : 'Rehan',
//   villageId : '5ec96723ea4c8c21377e7001'
// });

// let e = new House({
//   houseNumber : '34',
//   headName : 'Kreg',
//   villageId : '5ec96723ea4c8c21377e7001'
// });

// a.save();
// b.save();
// c.save();
// d.save();
// e.save(); 
module.exports = mongoose.model('House', HouseSchema);


