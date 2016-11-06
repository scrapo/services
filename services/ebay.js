module.exports = {
	title: 'eBay',
	templates: {
		auctions: {
			selector: ['findItemsByKeywordsResponse', 'searchResult', 'item'],
			attributes: {
				id: {from: [['itemId']]},
				url: {from: [['viewItemURL']]},
				title: {from: [['title']]},
				price: {from: [['sellingStatus', 'currentPrice', '__value__']]},
				priceCurrency: {from: [['sellingStatus', 'currentPrice', '@currencyId']]},
				shippingCost: {from: [['shippingInfo', 'shippingServiceCost', '__value__']]},
				shippingCostCurrency: {from: [['shippingInfo', 'shippingServiceCost', '@currencyId']]},
				shippingLocations: {from: [['shippingInfo', 'shipToLocations']]},
				imageUrl: {from: [['galleryURL']]},
				startTime: {from: [['listingInfo', 'startTime']]},
				endTime: {from: [['listingInfo', 'endTime']]},
				categoryId: {from: [['primaryCategory', 'categoryId']]},
				categoryTitle: {from: [['primaryCategory', 'categoryName']]}
			}
		},
		errors: {
			selector: ['errorMessage', 'error'],
			attributes: {
				id: {from: [['errorId']]},
				message: {from: [['message']]}
			}
		}
	},
	actions: {
		search: {
			request: {url: 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&SECURITY-APPNAME={{appId}}&keywords={{query}}'},
			templates: {auctions: 'auctions', errors: 'errors'}
		}
	}
};