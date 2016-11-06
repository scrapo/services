module.exports = {
	title: 'Amazon',
	templates: {
		products: {
			attributes: {
				asin: {from: [['ASIN']]},
				url: {from: [['DetailPageURL']]}
			}
		}
	},
	actions: {
		search: {
			request: function (accessKey, secretKey, associateTag, query) {
				const amazon = require('amazon-product-api');
				const client = amazon.createClient({awsId: accessKey, awsSecret: secretKey, awsTag: associateTag});
				return client.itemSearch({keywords: query});
			},
			templates: {products: 'products'}
		}
	}
};