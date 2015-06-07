define([
	'backbone'
], function(
	Backbone
) {

	/**
	 * Create answer model
	 * @name AnswerModel
	 * @constructor
	 */
	var AnswerModel = Backbone.Model.extend({

		/**
		 * Default field answer model
		 * @memberOf AnswerModel
		 */
		defaults: function() {
			return {
				text: null,
				correct: false,
				checked: false
			}
		}
	});

	return AnswerModel;
});