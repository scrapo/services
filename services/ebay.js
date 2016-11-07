module.exports = {
	title: 'eBay',
	templates: {
		search: {
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
		details: {
			selector: ['Item'],
			attributes: {
				id: {from: [['ItemID']]},
				url: {from: [['ViewItemURLForNaturalSearch']]},
				title: {from: [['Title']]},
				condition: {from: [['ConditionDisplayName']]},
				paymentMethods: {from: [['PaymentMethods']]},
				price: {from: [['CurrentPrice', 'Value']]},
				priceCurrency: {from: [['CurrentPrice', 'CurrencyID']]},
				imageUrl: {from: [['GalleryURL']]},
				startTime: {from: [['StartTime']]},
				endTime: {from: [['EndTime']]},
				hitCount: {from: [['HitCount']]},
				country: {from: [['Country']]}
			}
		},
		shipping: {
			selector: ['ShippingDetails', 'ShippingServiceOption'],
			attributes: {
				title: {from: [['ShippingServiceName']]},
				cost: {from: [['ShippingServiceCost', 'Value']]},
				costCurrency: {from: [['ShippingServiceCost', 'CurrencyID']]},
				timeMin: {from: [['ShippingTimeMin']]},
				timeMax: {from: [['ShippingTimeMax']]}
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
			templates: {items: 'search', errors: 'errors'}
		},
		details: {
			request: {url: 'http://open.api.ebay.com/shopping?callname=GetMultipleItems&responseencoding=JSON&appid={{appId}}&siteid=0&version=897&ItemID={{id}}&IncludeSelector=Details,ShippingCosts'},
			templates: {details: 'details', errors: 'errors'}
		},
		shipping: {
			request: {url: 'http://open.api.ebay.com/shopping?callname=GetShippingCosts&responseencoding=JSON&appid={{appId}}&siteid=0&version=897&ItemID={{id}}&DestinationCountryCode=DE&IncludeDetails=true&QuantitySold=1'},
			templates: {shipping: 'shipping', errors: 'errors'}
		}
	}
};