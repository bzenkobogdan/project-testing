define([
	'backbone',
	'underscore',
	'jquery',
	'collections/users',
	'collections/tests',
	'collections/languages'
], function(
	Backbone,
	_,
	$,
	UsersCollection,
	TestsCollection,
	LanguagesCollection
) {
	/**
	 * Create Dispatcher
	 */
	var Dispatcher = _.clone(Backbone.Events);

	/**
	 * Call calculate answers and call callback
	 * @param  {Function} callback
	 * @membeOf Dispatcher
	 */
	Dispatcher.on('finishTest', function(callback) {
		var test = getTest(),
			user = getUser(),
			correctsCount = test.checkResult();
		
		user.set('correctAnswers', correctsCount);
		user.get('info').finished = true;
		
		callback();

	})

	/**
	 * Getting data tests and push their in TestsCollection and call callback
	 * @param  {Function} callback
	 * @memberOf Dispatcher
	 */
	Dispatcher.on('getDataTests', function(callback) {
		var user = getUser();
		$.ajax({
			method: 'GET',
			url: '/languages/' + user.get('test'),
			success: function(data) {
				TestsCollection.reset(data);

				var test = TestsCollection.where({language: user.get('test').name})[0];
				user.set('test', test);
				callback();
			}
		})
	});

	/**
	 * Create user in UsersCollection
	 * @param  {Object} userInfo
	 * @memberOf Dispatcher 
	 */
	Dispatcher.on('createUser', function(userInfo) {
		UsersCollection.create(userInfo);
	});

	/**
	 * Getting data languaguages and push their in TestsCollection and call callback
	 * @param  {Function} callback
	 * @memberOf  Dispatcher
	 */
	Dispatcher.on('getDataLanguages', function(callback) {
		$.ajax({
			method: 'GET',
			url: '/languages',
			success: function(data) {
				LanguagesCollection.reset(data);
				callback();
			}
		})

	});

	/**
	 * Change answer
	 * @param  {Object}
	 * @param  {Object} data
	 * @memberOf Dispatcher
	 */
	Dispatcher.on('changeAnswer', function(question,data) {
		var question = getQuestion(question);

		switch(question.get('type')) {
			case 'radio':
				var answer = question.get('answers').findWhere({text: data.get('text')});
				question.get('answers').models.map(function(ans) {
					ans.set('checked', false);
				});
				answer.set('checked', true);
				break;

			case 'checkbox':
				var answer = question.get('answers').findWhere({text: data.get('text')});
				answer.set('checked', !answer.get('checked'));
				break;

			// case 'textarea':
			// 	var answer = question.get('answers').models[0];
			// 	answer.set('answerText', data);
			// 	break;

		}
	});

	function getUser() {
		return UsersCollection.first();
	}

	function getQuestion(question) {
		var test = getTest();
		return test.get('questions').where({question: question.get('question')})[0];
	}

	function getTest() {
		return UsersCollection.first().get('test');
	}

	return Dispatcher;
})