define([
	'react',
	'router/router',
	'collections/users',
	'dispatcher/dispatcher'
], function(
	React, 
	Router, 
	UsersCollection, 
	Dispatcher
) {

	/**
	 * Creating answer view
	 * @name AnswerView
	 * @constructor
	 */
	var AnswerView = React.createClass({
		getInitialState: function() {
			return {
				checked: false,
				answerText: ''
			}
		},

		/**
		 * Change radio
		 * @memberOf AnswerView
		 */
		changeRadio: function(e) {
			Dispatcher.trigger('changeAnswer', this.props.question, this.props.answer);
			this.setState({
				checked: this.state.checked
			})
		},

		/**
		 * Change checkbox
		 * @memberOf AnswerView
		 */
		changeCheckbox: function(e) {
			Dispatcher.trigger('changeAnswer', this.props.question, this.props.answer);
			this.setState({
				checked: !this.state.checked
			})
		},

		/**
		 * Chenge textarea
		 * @memberOf AnswerView
		 */
		// changeTextarea: function(e) {
		// 	Dispatcher.trigger('changeAnswer', this.props.question, e.target.value);
		// 	this.setState({
		// 		answerText: e.target.value
		// 	});
		// },

		/**
		 * Check on has error
		 * @memberOf AnswerView
		 * @returns {boolean}
		 */
		hasError: function() {
			var answer = this.props.answer,
				type = this.props.question.get('type');

			if(type === 'textarea') {
				return !answer.get('answerText');
			}
			
			return !(answer.get('correct') && answer.get('checked'));
		},

		/**
		 * Check the answer
		 * @memberOf AnswerView
		 * @returns {Object} styles Обьект со стилем
		 */
		getErrorMessage: function() {
			var answer = this.props.answer,
				resultPage = (Router.currentRoute.name === 'testend');

			if(!resultPage) {
				return '';
			}

			if(this.props.question.get('type') !== 'textarea' && (!answer.get('checked') && !answer.get('correct'))) {
				return '';
			}
			var styles = 'has-error';

			if(!this.hasError()) {
				styles = 'has-success';
			}

			return styles;
		},

		/**
		 * Getting template data
		 * @memberOf AnswerView
		 * @returns {{errorMessage: (Object|*), answer: (*|QuestionView.render.answer|answer|AnswerView.getTplData.answer), isFinished: *}}
		 */
		getTplData: function() {
			var user = UsersCollection.first(),
				isFinished = user.get('info').finished,
				answer = this.props.answer;

			return {
				errorMessage: this.getErrorMessage(),
				answer: answer,
				isFinished: isFinished
			};
		},

		/**
		 * Return radio template
		 * @memberOf AnswerView
		 */
		getRadioTpl: function() {
			var data = this.getTplData();

			return (
				<li className={data.errorMessage}>
					<div className='checkbox'>
						<label className='answer-label'>
							<input
								onChange={this.changeRadio}
								defaultChecked={data.isFinished ? data.answer.get('checked') : this.state.checked}
								name={this.props.question.get('question')}
								value={data.answer.cid + data.answer.get('text')}
								type='radio'
								disabled={data.isFinished} />

							{data.answer.get('text')}
						</label>
					</div>
				</li>
			)
		},

		/**
		 * Return checkbox template
		 * @memberOf AnswerView
		 */
		getCheckboxTpl: function() {
			var data = this.getTplData();
			return (
				<li className={data.errorMessage}>
					<div className='checkbox'>
						<label className='answer-label'>
							<input
								onChange={this.changeCheckbox}
								defaultChecked={data.isFinished ? data.answer.get('checked') : this.state.checked}
								name={this.props.question.get('question')}
								value={data.answer.cid + data.answer.get('text')}
								type='checkbox'
								disabled={data.isFinished}/>
							{data.answer.get('text')}
						</label>
					</div>
				</li>
			)
		},

		/**
		 * Return textarea template
		 * @memberOf AnswerView
		 */
		getTextareaTpl: function() {
			var data = this.getTplData();
			return (
				<li className={data.errorMessage}>
					<textarea
						className="form-control"
						onChange={this.changeTextarea}
						name={this.props.question.get('question')}
						defaultValue={data.isFinished ? data.answer.get('answerText') : this.state.answerText}
						disabled={data.isFinished}>
					</textarea>
				</li>
			)
		},

		/**
		 * Rendering answer
		 * @memberOf AnswerView
		 */
		render: function() {
			var answersType = this.props.question.get('type'),
				tpl = null;

			switch(answersType) {
				case "radio":
					tpl = this.getRadioTpl();
					break;
				case "checkbox":
					tpl = this.getCheckboxTpl();
					break;
				case "textarea":
					tpl = this.getTextareaTpl();
					break;
			}

			return tpl;
		}
	});

	return AnswerView;
});