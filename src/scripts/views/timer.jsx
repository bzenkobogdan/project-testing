define([
	'react',
	'router/router',
	'collections/users'
], function(
	React, 
	Router, 
	UsersCollection
) {

	/**
	 * Create timer view
	 * @name TimerView
	 * @constructor
	 */
	var TimerView = React.createClass({

		/**
		 * Creating initial state
		 * @memberOf TimerView
		 * @returns {{timeLeft: string}}
		 */
		getInitialState: function() {
			return {
				timeLeft: ''
			};
		},

		/**
		 * Call tick in timer
		 * @memberOf TimerView
		 */
		componentDidMount: function() {
			this.timer = setInterval(this.tick, 1000);
		},

		/**
		 * Delete timer if his don't mount
		 * @memberOf TimerView
		 */
		componentWillUnmount: function() {
			clearInterval(this.timer);
		},

		/**
		 * Timer tick
		 * @memberOf TimerView
		 */
		tick: function() {
			var time = UsersCollection.first().get('time'),
				seconds = time.seconds,
				minutes = time.minutes;

			--seconds;
			if(seconds <= 0) {
				seconds = 59;
				minutes = minutes - 1;
			} else if(minutes === 0 && seconds === 1) {
				Router.navigate('testend', true);
				clearInterval(this.timer);
			}

			time.seconds = seconds;
			time.minutes = minutes;

			this.setState({
				timeLeft: minutes + ':' + seconds
			});
		},

		/**
		 * Timer rendering
		 * @memberOf TimerView
		 */
		render: function() {
			return (<div>Время: {this.state.timeLeft}</div>)
		}
	});

	return TimerView;
});