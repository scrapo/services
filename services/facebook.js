module.exports = {
	title: 'Facebook',
	templates: {
		events: {
			selector: ['data'],
			attributes: {
				id: {from: [['id']]},
				title: {from: [['name']]},
				description: {from: [['description']]},
				startTime: {from: [['start_time']]},
				endTime: {from: [['end_time']]},
				place: {
					selector: ['place'],
					attributes: {
						id: {from: [['id']]},
						title: {from: [['name']]},
						country: {from: [['location', 'country']]},
						city: {from: [['location', 'city']]},
						zip: {from: [['location', 'zip']]},
						street: {from: [['location', 'street']]},
						latitude: {from: [['location', 'latitude']]},
						longitude: {from: [['location', 'longitude']]}
					}
				}
			}
		},
		paging: {
			selector: ['paging', 'cursors', 'after']
		},
		errors: {
			selector: ['error']
		}
	},
	actions: {
		page_events: {
			request: {url: 'https://graph.facebook.com/v2.8/{{id}}/events?access_token={{accessToken}}&limit=100&format=json&method=get&pretty=0{&after={?token}}'},
			templates: {events: 'events', errors: 'errors'},
			after: {
				action: 'page_events',
				values: {
					token: 'paging'
				}
			}
		}
	}
};