define([
	'backbone', 
	'models/test',
], function(
	Backbone, 
	TestModel
) {

	/**
	 * Create collection with test models
	 * @name TestsCollection
	 * @constructor
	 */
	var TestsCollection = Backbone.Collection.extend({
		model: TestModel,
		url: 'api'
	});
	return new TestsCollection;
});