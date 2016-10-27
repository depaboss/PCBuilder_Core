var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notebooksSchema = new Schema ({
  name: String,
  components: [{type: Schema.Types.ObjectId, ref: 'Components'}],
  price: Number
});
  notebooksSchema.methods.SumPrices = function (){
    this.price += components.map(function (component){
      return component.price;
    });
  };

module.exports = mongoose.model('Notebooks', notebooksSchema);
