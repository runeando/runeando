const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema({
  // _id: String,
  name: String,
  description: String,
  area: {
      type: String,
      enum: ['CasaDeCampo','MadridRio']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  length: Number,
  startPoint: {type: { type: String},coordinates: [Number]},
  imgUrl: String
},
{ timestamps: true }
);

raceSchema.index({startPoint: '2dsphere'})
const Race = mongoose.model('Race', raceSchema);
module.exports = Race;
