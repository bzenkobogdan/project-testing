define([
	'backbone',
	'collections/answers'
], function(
	Backbone, 
	Answers
) {

	/**
	 * Create question model
	 * @name QuestionModel
	 * @constructor
	 */
	var QuestionModel = Backbone.Model.extend({

		/**
		 * Default fields question model
		 * @memberOf QuestionModel
		 */
		defaults: function() {
			return {
				title: '',
				question: '',
				type: '',
				result: false,
				answers: new Answers([])
			}
		},

		/**
		 * @memberOf QuestionModel
		 * @param {data} data - данные
		 */
		initialize: function(data) {
			var answers = new Answers(data.answers);
			this.set('answers', answers);
		},

		/**
		 * Compare answers type and call necessary method
		 * @memberOf QuestionModel
		 * @returns {boolean}
		 */
		checkResult: function() {
			var type = this.get('type'),
				flag = false;

			switch(type) {
				case "radio":
					flag = this.checkRadio();
					break;
				case "checkbox":
					flag = this.checkCheckbox();
					break;
				case "textarea":
					flag = this.checkTextarea();
					break;
			}
			this.set('result', true);
			return flag;
		},


		/**
		 * Check checkbox models
		 * @memberOf QuestionModel
		 * @returns {boolean}
		 */
		checkCheckbox: function() {
			var answers =  this.get('answers'),
				flag = null;

			_.forEach(answers.models, function(answer) {
				var isCorrect = answer.get('correct');
				if(isCorrect) {
					if(!answer.get('checked')) {
						flag = false;
						return true;
					}
					flag = _.isNull(flag) ? true : flag;
					return true;
				}
				flag = !answer.get('checked') ? flag : false;
			});

			return flag;
		},

		/**
		 * Check radio models
		 * @memberOf QuestionModel
		 * @returns {boolean}
		 */
		checkRadio: function() {
			var answers = this.get('answers'),
				flag = false;

			_.forEach(answers.models, function(answer) {
				if(!(answer.get('checked') && answer.get('correct'))) {
					return true;
				}
				flag = true;
			});

			return flag;
		},

		/**
		 * Check textarea models
		 * @memberOf QuestionModel
		 * @returns {boolean}
		 */
		checkTextarea: function() {
			var answers = this.get('answers'),
				flag = false;
						
			_.forEach(answers.models, function(answer) {
				if(!answer.get('answerText')) {
					return true;
				}
				flag = true;
			});
			return flag;
		}
	});

	return QuestionModel;
});