define([
	'backbone',
	'react',
	'collections/users',
	'views/timer'
], function(
	Backbone, 
	React, 
	UsersCollection, 
	TimerView
) {

	/**
	 * Create user info view
	 * @name UserView
	 * @constructor
	 */
	var UserView = React.createClass({

		/**
		 * Rendering user info view
		 * @memberOf UserView
		 */
		render: function() {
			var user = UsersCollection.first(),
				userName = user.get('name'),
				testName = user.get('test').get('name'),
				time = user.get('time');

			return (
				<div className="pull-right sidebar-module-inset lead col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<div>Имя: {userName}</div>
					<TimerView time={time}/>
					<div>Тест: {testName}</div>
				</div>
			)
		}
	});

	return UserView;
});