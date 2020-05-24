
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
  collection : 'Block'
};

/***************************  Parent Schema : State *************************************/

const BlockSchema = new Schema({
    code : {
        type :String, 
        required : (true , "Please provide Block Code.")
    },
    name : {
        type :String, 
        required : (true , "Please provide Block Name.")
    },
    districtId : { type: ObjectId, ref: "District" }
  },
  schemaOptions);

/********************************** Pre-save Hooks ************************************/

/********************************** Virtuals ******************************************/

/********************************** Methods *******************************************/

/********************************** Exports *******************************************/
// const Block = mongoose.model('Block', BlockSchema);
// //Ahmedbad
// let a = new Block({
//   code : 'AND',
//   name  : 'Anandnagar',
//   districtId : '5ec96622459e6e206f339c4d'
// });

// let b = new Block({
//   code : 'PRA',
//   name  : 'Prahladnagar',
//   districtId : '5ec96622459e6e206f339c4d'
// });

// //rewari 
// let c = new Block({
//   code : 'SAL',
//   name  : 'Salawas',
//   districtId : '5ec96622459e6e206f339c51'
// });

// let d = new Block({
//   code : 'JAH',
//   name  : 'Jahangirpur',
//   districtId : '5ec96622459e6e206f339c51'
// });

// let e = new Block({
//   code : 'KHD',
//   name  : 'Kheda',
//   districtId : '5ec96622459e6e206f339c51'
// });

// a.save();
// b.save();
// c.save();
// d.save();
// e.save();
module.exports = mongoose.model('Block', BlockSchema);


