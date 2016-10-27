const Schema = require('mongoose').Schema;

var componentsSchema = new Schema({
	name: String,
	avatar: String,
	health: Number,
	mana: Number,
	weapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon' }],
	hasPowers: Boolean
});

var Components = mongoose.model('Components',componentsSchema);
module.exports = Components;