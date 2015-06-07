define([
	'backbone',
	'models/question'
], function(
	Backbone, 
	QuestionModel
) {

	/**
	 * Create collection with question models
	 * @name QuestionsCollection
	 * @constructor
	 */
	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel,

		/**
		 * Call calculate models
		 * @memberOf QuestionsCollection
		 */
		checkResult: function() {
			var count = 0;
			_.forEach(this.models, function(question) {
				if(!question.checkResult()) {
					return true;
				}
				++count;
			});
			return count;
		}
	});

	return QuestionsCollection;
});