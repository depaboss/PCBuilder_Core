var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var desktopSchema = new Schema {

	name: String,
	components: [{
		type: Schema.Type.Object.Id,
		ref: 'Components'

	}],
	price: number
}

desktopSchema.methods.sumPrice = function(){
	this.price += components.map(function(ogg){
		return ogg.price;
	});
};



var Desktops = mongoose.model('Desktops',desktopSchema);
module.exports = Desktops;