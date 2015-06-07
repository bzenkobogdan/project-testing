define([
	'backbone', 
	'models/user',
], function(
	Backbone, 
	UserModel
) {

	/**
	 * Create collection with user models
	 * @name UsersCollection
	 * @constructor
	 */
	var UsersCollection = Backbone.Collection.extend({
		model: UserModel,
		url: 'api'
	});

	return new UsersCollection;
});