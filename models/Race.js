const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema({
  _id: String,
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
  // endPoint: {type: {type: String},coordinates: [Number]},
  imgUrl: String,
  //   stars: 4.6,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

raceSchema.index({startPoint: '2dsphere'})

const Race = mongoose.model('User', userSchema);
module.exports = Race;
