define([
	'react',
	'collections/users',
	'views/question'
], function(
	React, 
	UsersCollection, 
	QuestionView
) {

	/**
	 * Create final test view
	 * @name TestEndView
	 * @constructor
	 */
	var TestEndView = React.createClass({


		/**
		 * Rendering with answers on questions
		 * @memberOf TestEndView
		 */
		render: function() {
			var user = UsersCollection.first(),
				test = user.get('test'),
				questions = test.get('questions');

				var progress = {
					width: parseInt(100 / questions.length * user.get('correctAnswers')) + '%'
				};
			

			return (
				<div>
					<div className="result-block jumbotron lead">
						<div>Имя:{user.get('name')}</div>
						<div>Времени осталось:{user.get('time').minutes + ':' + user.get('time').seconds}</div>
						<div>Тест: {test.get('name')}</div>
						<div className="progress">
							<div className="progress-bar"
							role="progressbar"
							aria-valuenow={progress.width}
							ria-valuemin="0"
							aria-valuemax='100'
							style={progress}
							>
								<span>{progress.width}</span>
							</div>
						</div>
					</div>
					{questions.map(function(question, key) {
						return <QuestionView question={question} count={key + 1} />
					})}
				</div>
			)
		}
	});

	return TestEndView;
});