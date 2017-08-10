
'use strict'

class Reactant
{
	constructor(options)
	{
		Object.defineProperty(this, '$data', {
			writable: false,
			value: options.data || {}
		});
		Object.defineProperty(this, '$watch', {
			writable: false,
			value: options.watch || {}
		});

		Reactant.initialize(this, this.$data)
	}

	static initialize(reactant, data)
	{
		for (let key in data) if (data.hasOwnProperty(key))
		{
			if (Reactant.isObservable(data[key]))
			{
				Reactant.set(reactant, key)
			}
		}
	}

	static isObservable(property)
	{
		var scalar_types = {
			'undefined': true,
			'boolean': true,
			'number': true,
			'string': true
		}

		let type = typeof property

		return scalar_types[type] || (type === 'object' && (property === null || Array.isArray(property)))
	}

	static set(reactant, key)
	{
		Object.defineProperty(reactant, key, {
			get: () =>
			{
				return reactant.$data[key]
			},
			set: (new_value) =>
			{
				if (reactant.$data[key] !== new_value)
				{
					let old_value = reactant.$data[key]

					reactant.$data[key] = new_value

					if (typeof reactant.$watch[key] === 'function')
					{
						reactant.$watch[key].call(reactant, new_value, old_value)
					}
				}
			}
		});
	}
}

module.exports = Reactant
