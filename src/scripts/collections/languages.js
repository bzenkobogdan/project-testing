define([
	'backbone',
	'models/language'
], function(
	Backbone,
	LanguageModel
) {

	/**
	 * Create collection with language models
	 * @name LanguagesCollection
	 * @constructor
	 */
	var LanguagesCollection = Backbone.Collection.extend({
		model: LanguageModel
	})

	return new LanguagesCollection;
})