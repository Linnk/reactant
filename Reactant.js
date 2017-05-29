
'use strict'

class Reactant
{
	constructor()
	{
		var state = {}
		var state_stringified = JSON.stringify(state)

		Object.defineProperty(this, 'state', {
			enumerable: false,
			configurable: false,
			get: () =>
			{
				return state
			},
			set: (new_value) =>
			{
				var new_state_stringified = JSON.stringify(new_value)
				if (state_stringified === new_state_stringified)
				{
					return;
				}

				var old_value = state

				state = new_value
				state_stringified = new_state_stringified

				this.didSetState(old_value)
			},
		});
	}

	didSetState(old_value)
	{
		console.log('----------------------------')
		console.log(old_value)
		console.log(this.state)
	}


}

var r = new Reactant()

r.state = {hola: 'mundo'}
r.state = {hola: 'mundo_1'}
r.state = {hola: 'mundo_1'}
r.state = {hola: 'mundo_1'}
r.state = {hola: 'mundo_1'}
r.state = {hola: 'mundo_2'}
