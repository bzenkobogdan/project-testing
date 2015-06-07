define([
	'backbone',
	'models/answer'
], function(
	Backbone, 
	AnswerModel
) {

	/**
	 * Create collection with answer models
	 * @name AnswersCollection
	 * @constructor
	 */
	var AnswersCollection = Backbone.Collection.extend({
		model: AnswerModel
	});

	return AnswersCollection;
});