
/*******************************  Module Dependencies ********************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
//MongoDB Database Connection
// mongoose.connect('mongodb://localhost/Survey')
//   .then(() => console.log('Now connected to MongoDB!'))
//   .catch(err => console.error('Something went wrong', err));

/********************************** Validations ***************************************/

/******************************* Schema Options ********************************/
let schemaOptions = {
  collection : 'District'
};

/***************************  Parent Schema : State *************************************/

const DistrictSchema = new Schema({
    code : {
        type :String, 
        required : (true , "Please provide District Code.")
    },
    name : {
        type :String, 
        required : (true , "Please provide District Name.")
    },
    stateId : { type: ObjectId, ref: "State" }
  },
  schemaOptions);

/********************************** Pre-save Hooks ************************************/

/********************************** Virtuals ******************************************/

/********************************** Methods *******************************************/

/********************************** Exports *******************************************/

// const District = mongoose.model('District', DistrictSchema);
// //gujarat
// let a = new District({
//   code : 'AHM',
//   name  : 'Ahmedabad',
//   stateId : '5ec9645812b5841f914f5f79'
// });

// let b = new District({
//   code : 'SUR',
//   name  : 'SURAT',
//   stateId : '5ec9645812b5841f914f5f79'
// });

// //haryana 5ec9645812b5841f914f5f7b
// let c = new District({
//   code : 'RH',
//   name  : 'Rohtak',
//   stateId : '5ec9645812b5841f914f5f7b'
// });

// let d = new District({
//   code : 'JH',
//   name  : 'Jhajjar',
//   stateId : '5ec9645812b5841f914f5f7b'
// });

// let e = new District({
//   code : 'RW',
//   name  : 'Rewari',
//   stateId : '5ec9645812b5841f914f5f7b'
// });

// a.save();
// b.save();
// c.save();
// d.save();
// e.save();
 
module.exports = mongoose.model('District', DistrictSchema);


