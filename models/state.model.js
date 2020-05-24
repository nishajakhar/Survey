
/*******************************  Module Dependencies ********************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//MongoDB Database Connection
// mongoose.connect('mongodb://localhost/Survey')
//   .then(() => console.log('Now connected to MongoDB!'))
//   .catch(err => console.error('Something went wrong', err));


/********************************** Validations ***************************************/

/******************************* Schema Options ********************************/
let schemaOptions = {
  collection : 'State'
};

/***************************  Parent Schema : State *************************************/

const StateSchema = new Schema({
    code : {
        type :String, 
        required : (true , "Please provide State Code.")
    },
    name : {
        type :String, 
        required : (true , "Please provide State Name.")
    }
  },
  schemaOptions);

/********************************** Pre-save Hooks ************************************/

/********************************** Virtuals ******************************************/

/********************************** Methods *******************************************/

/********************************** Exports *******************************************/

// const State = mongoose.model('State', StateSchema);
// let state1 = new State({
//   code : 'GJ',
//   name  : 'Gujarat',
// });

// let state2 = new State({
//   code : 'MH',
//   name  : 'Maharastra',
// });

// let state3 = new State({
//   code : 'HR',
//   name  : 'Haryana',
// });

// let state4 = new State({
//   code : 'DL',
//   name  : 'Delhi',
// });

// let state5 = new State({
//   code : 'RJ',
//   name  : 'Rajasthan',
// });

// state1.save();
// state2.save();
// state3.save();
// state4.save();
// state5.save();
 
module.exports = mongoose.model('State', StateSchema);


