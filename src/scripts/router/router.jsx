define([
	'backbone',
	'react',
	'collections/users',
	'dispatcher/dispatcher'
], function(
	Backbone, 
	React, 
	UsersCollection,
	Dispatcher
) {

	/**
	 * Create router APP
	 * @name Router
	 * @constructor
	 */
	var Router = Backbone.Router.extend({
			currentRoute: {
				name: null
			},

			initialize: function() {
				Backbone.history.stop();
			},

			/**
			 * Route for APP
			 * @memberOf Router
			 */
			routes: {
				'': 'testStart',
				'test': 'test',
				'testend' : 'testEnd'
			},

			/**
			 * Call TestStartView route and render her
			 * @memberOf Router
			 */
			testStart: function() {
				if(hasUser()) {
					router.navigate('testend', true);
					return false;
				}

				Dispatcher.trigger('getDataLanguages', function() {
					requirejs(['views/test-start'], function(TestStartView) {
						React.render(<TestStartView />, document.getElementById('app'));
					});
				})
			},

			/**
			 * Call TestView route and render her
			 * @memberOf Router
			 */
			test: function() {
				if(!hasUser()) {
					router.navigate('', true);
					return false;
				}

				Dispatcher.trigger('getDataTests', function() {
					requirejs(['views/test'], function(TestView) {
						React.render(<TestView />, document.getElementById('app'));
					});
				})
			},

			/**
			 * Call TestEndView route and render her
			 * @memberOf Router
			 */
			'testEnd': function() {
				if(!hasUser()) {
					router.navigate('', true);
					return false;
				}
				
				this.currentRoute.name = 'testend';
				Dispatcher.trigger('finishTest', function() {
					requirejs(['views/test-end'], function(TestEndView) {
						React.render(<TestEndView />, document.getElementById('app'));
					});
				});
			}
		});

		router = new Router;
		Backbone.history.start();
		return router;

		/**
		 * Check has user model
		 * @memberOf Router
		 * @returns {boolean}
		 */
		function hasUser() {
			return !!UsersCollection.first();
		}
});