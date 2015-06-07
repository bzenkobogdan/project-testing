define([
	'backbone',
	'collections/questions'
], function(
	Backbone,
	Questions
) {
	
	/**
	 * Create model for test
	 * @name TestModel
	 * @constructor
	 */
	var TestModel = Backbone.Model.extend({

		/**
		 * Default fields for test model
		 * @memberOf TestModel
		 */
		defaults: {
			name: '',
			questions: new Questions([])
		},

		initialize: function(data) {
			var question = new Questions(data.questions);
			this.set('questions', question);
		},

		/**
		 * Calculating answers on all models
		 * @memberOf TestModel
		 */
		checkResult: function() {
			return this.get('questions').checkResult();
		}
	});

	return TestModel;
});