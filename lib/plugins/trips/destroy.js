'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}',
    config: {
      description: 'Delete a trip',
      handler: function(request, reply){
        Trip.findOne({_id: request.params.tripId}, function(err, trip){
          if(!trip){return reply().code(400);}

          trip.remove(function(){
            return reply(trip);
          });
        })
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.destroy'
};
