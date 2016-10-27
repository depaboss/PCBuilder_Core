var mongoose = require('mongoose');
var Desktops = require('./desktop.model');

var Desktops = function(){
	 //LISTA DI TUTTI I DESKTOP
    var desktopList = function(req, res) {
        Desktops.find().exec()
            .then(function(data) {
                res.json(data);
            });
    };

    //DETTAGLIO DI UN SINGOLO DESKTOP
    var desktopDetail = function(req, res) {
        var id = req.params.id;
        Desktops.findById(id)
            .populate('components')
            .exec()
            .then(function(data) {
                res.status(200).send(data);
            },function(data) {
                res.status(404).send({'error':'X non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //CREAZIONE DI UN NUOVO DESKTOP
    var desktopCreate = function(req, res) {
        var newDesktops = new Desktops(req.body);
        newDesktops.save()
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //AGGIORNAMENTO DI UN DESKTOP
    var desktopUpdate = function(req, res) {
        var id = req.params.id;
        Desktops.findByIdAndUpdate(id, req.body, {new: true})
            .then(function(data) {
                res.status(200).send(data);
            },function() {
                res.status(404).send({'error':'X non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    var desktopRemove = function(req, res) {
        var id = req.params.id;
        Desktops.findById(id).exec()
            .then(function(desktop) {
                return desktop.remove();
            })
            .then(function() {
                res.status(200).send('X rimosso dal database');
            }, function() {
                res.status(404).send({'error':'X non trovato nel database'});
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

module.exports = Desktops;