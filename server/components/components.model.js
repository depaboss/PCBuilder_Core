const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var componentsSchema = new Schema({
	model: String,
	type: {
			type: String,
			enum: ['CPU', 'CPU Cooler', 'Motherboard', 'Memory', 'Storage', 'GPU', 'Power Supply', 'Case', 'Mouse', 'Monitor'],
			require: true
	},
	description: Object,
	computerType: {
			type: String,
			enum: ['Desktop', 'Notebook'],
			require: true
	},
	price: Number,
	releaseDate: Date,
	manufacturer: String
});

var Components = mongoose.model('Components',componentsSchema);
module.exports = Components;