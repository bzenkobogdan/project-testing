define([
	'react',
	'collections/languages',
	'router/router',
	'dispatcher/dispatcher'
], function(
	React,
	LanguagesCollection, 
	Router, 
	Dispatcher
) {

	/**
	 * Create initial view for test
	 * @name TestStartView
	 * @constructor
	 */
	var TestStartView = React.createClass({

		/**
		 * Create initial state
		 * @memberOf TestStartView
		 * @returns {{userName: string, test: null}}
		 */
		getInitialState: function() {
			var state = {
				userName: '',
				test: null
			};
			return state;
		},

		/**
		 * Change field user name
		 * @memberOf TestStartView
		 * @param {Object} e - eventObject
		 */
		changeUserName: function(e) {
			this.setState({
				userName: e.target.value
			});
		},

		/**
		 * Change test
		 * @memberOf TestStartView
		 * @param {Object} e - eventObject
		 */
		changeTest: function(e) {
			this.setState({
				test: e.target.value
			});
		},

		/**
		 * Validation on has nick and test
		 * @memberOf TestStartView
		 * @returns {boolean}
		 */
		validation: function() {
			var state = this.state,
				Valid = !!(state.userName && state.test);

			return Valid;
		},

		/**
		 * Create user
		 * @memberOf TestStartView
		 */
		createUser: function() {
			Dispatcher.trigger('createUser', {
				name: this.state.userName,
				test: this.state.test,
				info: {
					started: true
				}
			})
		},

		/**
		 * Check on has creating user
		 * @memberOf TestStartView
		 */
		startTest: function(e) {
			e.preventDefault();
			if(!this.validation()) {
				return false;
			}

			this.createUser();
			Router.navigate('test', true);
		},


		/**
		 * Отрисовка начальной страницы.
		 * @memberOf TestStartView
		 */
		render: function() {
			var	userName = this.state.userName;

			return (
				<form className='initial-form form-signin'>
					<input
						value={userName}
						className='userName form-control'
						onChange={this.changeUserName}
						placeholder='Ваше имя'
						type='text'
					/>

					<select
						className='form-control'
						onChange={this.changeTest}>

							<option value="">Язык программирования</option>
							{LanguagesCollection.models.map(function(language) {
								return <option value={language.get('name')}>{language.get('name')}</option>
							})}
					</select>

					<button
						className='btn btn-primary'
						onClick={this.startTest}>
						Start test
					</button>
				</form>
			)
		}
	});

	return TestStartView;
});