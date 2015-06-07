define([
	'react',
	'router/router',
	'collections/users',
	'dispatcher/dispatcher',
	'views/info',
	'views/question'
], function(
	React, 
	Router, 
	UsersCollection, 
	Dispatcher,
	InfoView, 
	QuestionView
) {

	/**
	 * Create test view
	 * @name TestView
	 * @constructor
	 */
	var TestView = React.createClass({

		/**
		 * Transition on Finish View
		 * @method finishTest
		 * @memberOf TestView
		 */
		finishTest: function() {
			Router.navigate('testend', true);
		},

		/**
		 * Getting questions
		 * @memberOf TestView
		 * @method getQuestions
		 */
		getQuestions: function() {
			var user = UsersCollection.first(),
				test = user.get('test'),
				questions = test.get('questions');

			return questions;
		},

		/**
		 * Rendering test view
		 * @memberOf TestView
		 */
		render: function() {
			var user = UsersCollection.first(),
				page = Router.currentRoute.page,
				isFinished = user.get('info').finished,
				questions = this.getQuestions();

			return (
				<div className="col-lg-12">
					<InfoView />
					<div>
						{questions.map(function(question,i) {
							i++;
							return <QuestionView question={question} count={i}/>
						})}
					</div>

					<button className="btn btn-primary" onClick={this.finishTest}>Finish test</button>
				</div>
			)
		}
	});

	return TestView;
});