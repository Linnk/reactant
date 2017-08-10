
'use strict'

const Reactant = require('./Reactant.js');

let substance = new Reactant({
	data: {
		a: 1,
		b: 2,
		c: 3,
		d: {
			what: 123
		},
		e: null,
		f: [1, 2, 3]
	},
	watch: {
		a: function(new_value)
		{
			console.log('a: ' + new_value);
		},
		b: function(new_value)
		{
			console.log('b: ' + new_value);
		},
		c: function(new_value)
		{
			console.log('c: ' + new_value);
		},
	}
})

substance.c = 0
