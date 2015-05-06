'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}/stops/{stopId}',
    config: {
      description: 'Remove a stop to trip',
      handler: function(request, reply){
        Trip.findByIdAndUpdate(request.params.tripId, {$pull: { stops: {_id: request.params.stopId}}}, function(trip){
          return reply({stopId: request.params.stopId});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.remove-stop'
};
