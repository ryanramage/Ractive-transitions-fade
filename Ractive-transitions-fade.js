/*

	Ractive-transitions-fade
	========================

	Version 0.1.0.

	This plugin does exactly what it says on the tin - it fades elements
	in and out, using CSS transitions. You can control the following
	properties: `duration`, `delay` and `easing` (which must be a valid
	CSS transition timing function, and defaults to `linear`).

	The `duration` property is in milliseconds, and defaults to 300 (you
	can also use `fast` or `slow` instead of a millisecond value, which
	equate to 200 and 600 respectively). As a shorthand, you can use
	`intro='fade:500'` instead of `intro='fade:{"duration":500}'` - this
	applies to many other transition plugins as well.

	If an element has an opacity other than 1 (whether directly, because
	of an inline style, or indirectly because of a CSS rule), it will be
	respected. You can override the target opacity of an intro fade by
	specifying a `to` property between 0 and 1.

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'Ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/Ractive.js'></script>
	    <script src='lib/Ractive-transitions-fade.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'Ractive-transitions-fade' );

	Add a fade transition like so:

	    <div intro='fade'>this will fade in</div>

*/

(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'Ractive' ], factory );
	}

	// browser global
	else if ( global.Ractive ) {
		factory( global.Ractive );
	}

	else {
		throw new Error( 'Could not find Ractive! It must be loaded before the Ractive-transitions-fade plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive ) {

	'use strict';

	var fade, defaults;

	defaults = {
		duration: 300,
		easing: 'linear'
	};

	fade = function ( t ) {
		var targetOpacity;

		if ( t.isIntro ) {
			targetOpacity = ( t.to !== undefined ? t.to : t.getStyle( 'opacity' ) );
			t.setStyle( 'opacity', 0 );
		}

		// set defaults
		if ( t.duration === undefined ) {
			t.duration = defaults.duration;
		}

		if ( t.easing === undefined ) {
			t.easing = defaults.easing;
		}

		t.animateStyle({
			opacity: t.isIntro ? targetOpacity : 0
		});
	};

	Ractive.transitions.fade = fade;

}));