var mongoose = require('mongoose');
var Notebooks = require('./notebooks.model.js');

module.exports = function(){

  //LISTA DI TUTTI I NOTEBOOKS
  var notebookList = function (req, res){
      Notebooks.find(req.query).populate('Components')
              .exec()
              .then(function(data){
                res.json(data);
              });
  };

  //VISUALIZZARE I DETTAGLI DI UN SINGOLO NOTEBOOK
  var notebookDetail = function (req, res){
    var id = req.params.id;
    Notebooks.findById(id)
        .populate('components')
        .exec()
        .then(function(data){
            res.status(200).send(data);
        }, function(data) {
            res.status(404).send({'error':'Notebook non trovato nel database'});
        })
        .catch(function(err){
            res.status(500).send(err);
        });
  };

  //CREAZIONE DI UN NUOVO NOTEBOOK
  var notebookCreate = function (req, res){
    console.info(req);
      var newNotebook = new Notebooks(req.body);
      newNotebook.save()
          .then(function(data){
              res.status(200).send(data);
          })
          .catch(function(err){
              res.status(500).send(err);
          });
  };

  //AGGIORNAMENTO DI UN NETBOOK
  var notebookUpdate = function(req,res){
      var id = req.params.id
      Notebooks.findByIdAndUpdate(id, req.body, {new:true})
          .then(function(data){
              res.status(200).send(data);
          }, function(){
              res.status(404).send({'error':'Notebook non trovato nel database'});
          })
          .catch(function(err){
              res.status(500).send(err);
          });
  };

  //RIMOZIONE DI UN NOTEBOOK
  var notebookRemove = function(req,res){
      var id = req.params.id;
      Notebooks.findById(id)
          .exec()
          .then(function(Notebooks){
              return Notebooks.remove();
          })
          .then(function(){
              res.status(200).send('Notebook rimosso dal database');
          }, function() {
              res.status(404).send({'error':'Notebook non trovato nel database'});
          })
          .catch(function(err){
              res.status(500).send(err);
          });
  };

  return {
    notebookList: notebookList,
    notebookDetail: notebookDetail,
    notebookCreate: notebookCreate,
    notebookUpdate: notebookUpdate,
    notebookRemove: notebookRemove
  }
}();
