define([
	'react',
	'router/router',
	'views/answer'
], function(
	React, 
	Router, 
	AnswerView
) {

	/**
	 * Create question view
	 * @name QuestionView
	 * @constructor
	 */
	var QuestionView = React.createClass({

		/**
		 * Rendering question block
		 * @memberOf QuestionView
		 */
		render: function() {
			var count = this.props.count || Router.currentRoute.page,
				question = this.props.question,
				type = question.get('type'),
				answers = question.get('answers');
				
			return (
				<div>
					<h3>{'Вопрос ' + count}</h3>

					<blockquote>
						<p>{question.get('question')}</p>
					</blockquote>

					<ul className='list-unstyled'>
						{answers.map(function(answer) {
							return <AnswerView question={question} answer={answer}/>
						})}
					</ul>
				</div>
			)
		}
	});

	return QuestionView;
});