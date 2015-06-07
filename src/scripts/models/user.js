define([
	'backbone'
], function(
	Backbone
) {

	/**
	 * Creating model user
	 * @name UserModel
	 * @constructor
	 */
	var UserModel = Backbone.Model.extend({

		/**
		 * Default fields for user model
		 * @memberOf UserModel
		 */
		defaults: {
			name: '',
			time: {
				minutes: 15,
				seconds: 0
			},
			info: {
				started: false,
				finished: false
			},
			test: 0,
			correctAnswers: 0
		}
	});

	return UserModel;
});