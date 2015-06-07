define([
	'backbone'
], function(
	Backbone
) {

	/**
	 * Create language model
	 * @name LanguageModel
	 * @constructor
	 */
	var LanguageModel = Backbone.Model.extend({

		/**
		 * Default fields for language model
		 * @memberOf LanguageModel
		 */
		defaults: {
			name: ''
		}
	})

	return LanguageModel;
})