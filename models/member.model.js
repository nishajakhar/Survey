
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
  collection : 'Member'
};

/***************************  Parent Schema : State *************************************/

const MemberSchema = new Schema({
    name : {
        type :String, 
        required : (true , "Please provide Member name.")
    },
    salary : {
        type :Number, 
        required : (true , "Please provide Member Salary")
    },
    age : Number,
    gender : {
        type : String,
        default : 'Male',
        enum : ['Male', 'Female']
    },
    houseId : { type: ObjectId, ref: "House" }
  },
  schemaOptions);

/********************************** Pre-save Hooks ************************************/

/********************************** Virtuals ******************************************/

/********************************** Methods *******************************************/

/********************************** Exports *******************************************/


// const Member = mongoose.model('Member', MemberSchema);
// //john
// let a = new Member({
//     name : 'John',
//     salary : 5000,
//     age : 21,
//     gender : "Male",
//   houseId : '5ec9697729bd0d2228780414'
// });

// let b = new Member({
//     name : 'Jenny',
//     salary : 15000,
//     age : 20,
//     gender : "Female",
//   houseId : '5ec9697729bd0d2228780414'
// });

// //Zack 
// let c = new Member({
//     name : 'Zack',
//     salary : 25000,
//     age : 25,
//     gender : "Male",
//   houseId : '5ec9697729bd0d2228780416'
// });

// let d = new Member({
//     name : 'Jennifer',
//     salary : 69000,
//     age : 45,
//     gender : "Female",
//   houseId : '5ec9697729bd0d2228780416'
// });

// let e = new Member({
//     name : 'Carla',
//     salary : 20000,
//     age : 25,
//     gender : "Female",
//   houseId : '5ec9697729bd0d2228780416'
// });

// a.save();
// b.save();
// c.save();
// d.save();
// e.save(); 

module.exports = mongoose.model('Member', MemberSchema);


