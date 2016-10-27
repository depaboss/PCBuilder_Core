var mongoose = require('mongoose');
var Components = require('./components.model');

module.exports = function() {

    //LISTA DI TUTTI GLI EROI
    var list = function(req, res) {
        Components.find(req.query).exec()
            .then(function(data) {
                res.json(data);
            });
    };

    //DETTAGLIO DI UN SINGOLO EROE
    var detail = function(req, res) {
        var id = req.params.id;
        Components.findById(id)
            .exec()
            .then(function(data) {
                res.status(200).send(data);
            },function(data) {
                res.status(404).send({'error':'Eroe non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //CREAZIONE DI UN NUOVO EROE
    var create = function(req, res) {
        var newComponent = new Components(req.body);
        newComponent.save()
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //AGGIORNAMENTO DI UN EROE
    var update = function(req, res) {
        var id = req.params.id;
        Components.findByIdAndUpdate(id, req.body, {new: true})
            .then(function(data) {
                res.status(200).send(data);
            },function() {
                res.status(404).send({'error':'Eroe non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    var remove = function(req, res) {
        var id = req.params.id;
        Components.findById(id).exec()
            .then(function(component) {
                return component.remove();
            })
            .then(function() {
                res.status(200).send('Eroe rimosso dal database');
            }, function() {
                res.status(404).send({'error':'Eroe non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    return {
        list: list,
        detail: detail,
        create: create,
        remove: remove,
        update: update
    }
};
