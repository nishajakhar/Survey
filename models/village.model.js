
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
  collection : 'Village'
};

/***************************  Parent Schema : State *************************************/

const VillageSchema = new Schema({
    code : {
        type :String, 
        required : (true , "Please provide Village Code.")
    },
    name : {
        type :String, 
        required : (true , "Please provide Village Name.")
    },
    blockId : { type: ObjectId, ref: "Block" }
  },
  schemaOptions);

/********************************** Pre-save Hooks ************************************/

/********************************** Virtuals ******************************************/

/********************************** Methods *******************************************/

/********************************** Exports *******************************************/

// const Village = mongoose.model('Village', VillageSchema);
// //prahladnagar
// let a = new Village({
//   code : 'VEJ',
//   name  : 'Vejalpur',
//   blockId : '5ec96723ea4c8c21377e6fff'
// });

// let b = new Village({
//   code : 'NAR',
//   name  : 'Narayanpur',
//   blockId : '5ec96723ea4c8c21377e6fff'
// });

// //Jahangirpur 
// let c = new Village({
//   code : 'SON',
//   name  : 'Sonawas',
//   blockId : '5ec96723ea4c8c21377e7001'
// });

// let d = new Village({
//   code : 'PRT',
//   name  : 'Preetamnagar',
//   blockId : '5ec96723ea4c8c21377e7001'
// });

// let e = new Village({
//   code : 'PAT',
//   name  : 'Paatuwas',
//   blockId : '5ec96723ea4c8c21377e7001'
// });

// a.save();
// b.save();
// c.save();
// d.save();
// e.save(); 
module.exports = mongoose.model('Village', VillageSchema);


