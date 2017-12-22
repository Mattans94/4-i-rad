(function ($) {
	//
	// Zachary Johnson (@zacharyjohnson, zachstronaut.com)
	// Forked from: https://www.zachstronaut.com/posts/2009/12/21/happy-xmas-winternet.html
	//
	
	var ww = 0,
		wh = 0,
		maxw = 0,
		minw = 0,
		maxh = 0,
		textShadowSupport = true,
		xv = 0, // shared wind velocity
		colors = ['#f33', '#3f3', '#66f', '#3ff', '#f93', '#ff3', '#c3f'],
		confetti = ["\u2666", "\u2726", "\u25b0"],
		prevTime,
		absMax = 200,
		flakeCount = 0,
		flakes = [],
		xs = [],
		ys = [],
		vs = [], // falling/y velocities
		hvs = [];

	
	$(init);

	function init() {
		var initialFlakes = 75,
			detectSize = function () {
				ww = $(window).width();
				wh = $(window).height();
				
				maxw = ww + 300;
				minw = -300;
				maxh = wh + 300;
			};
		
		detectSize();
		
		$(window).resize(detectSize);
		
		// Should return a string for the text-shadow applied to body or 'none'
		// Otherwise would return null or undefined for browsers that don't support text-shadow
		if (!$('body').css('textShadow')) {
			textShadowSupport = false;
		}
		
		// FF seems to just be able to handle like 50... 25 with rotation
		// Safari seems fine with 150+... 75 with rotation
		while (initialFlakes--) {
			addFlake(true);
		}
		
		prevTime = Date.now();
		setInterval(move, 50);
	} // init()


	function addFlake(initial) {		
		var $flake = $('<span>' + confetti[Math.floor(Math.random() * confetti.length)] + '</span>').css(
				{
					display: 'block',
					position: 'fixed',
					background: 'transparent',
					width: 'auto',
					height: 'auto',
					margin: '0',
					padding: '0',
					textAlign: 'left',
					zIndex: 9999
				}
			);

		$('#gameOverModal .confetti').append($flake);

		flakes.push($flake);
		xs.push(0);
		ys.push(0);
		vs.push(0);
		hvs.push(0);

		flakeCount++;

		resetFlake(flakes.length - 1, initial);
	} // addFlake()


	function removeFlake() {
		$(flakes[0]).remove();

		flakes.shift();
		xs.shift();
		ys.shift();
		vs.shift();
		hvs.shift();

		flakeCount--;
	} // removeFlake()


	function resetFlake(i, initial) {
		var color = colors[Math.floor(Math.random() * colors.length)],
			sizes = [
				{
					r: 1.0, // compared against Math.random()
					css: {
						fontSize: 15 + Math.floor(Math.random() * 20) + 'px',
						textShadow: '9999px 0 6px ' + color
					},
					v: 4 + Math.floor(Math.random() * 2) // velocity
				},
				{
					r: 0.6,
					css: {
						fontSize: 50 + Math.floor(Math.random() * 20) + 'px',
						textShadow: '9999px 0 4px ' + color
					},
					v: 12 + Math.floor(Math.random() * 6)
				},
				{
					r: 0.2,
					css: {
						fontSize: 90 + Math.floor(Math.random() * 30) + 'px',
						textShadow: '9999px 0 12px ' + color
					},
					v: 24 + Math.floor(Math.random() * 12)
				},
				{
					r: 0.1,
					css: {
						fontSize: 150 + Math.floor(Math.random() * 50) + 'px',
						textShadow: '9999px 0 36px ' + color
					},
					v: 40 + Math.floor(Math.random() * 20)
				}
			],
			$flake = $(flakes[i]),
			r = Math.random(),
			s = sizes.length,
			v,
			x = (-300 + Math.floor(Math.random() * (ww + 300))),
			y = (initial) ? (-300 + Math.floor(Math.random() * (wh + 300))) : -300;

		if (textShadowSupport) {
			$flake.css('textIndent', '-9999px');
		}
		
		while (s--) {
			// Pick which size flake this will be
			if (r < sizes[s].r) {
				v = sizes[s].v;
				$flake.css(sizes[s].css);
				break;
			}
		}
		
		$flake.css(
			{
				color: color,
				left: x + 'px',
				top: y + 'px'
			}
		);

		$flake.html(confetti[Math.floor(Math.random() * confetti.length)]);

		xs[i] = x;
		ys[i] = y;
		vs[i] = v;
		hvs[i] = Math.round(v * 0.5);
	} // resetFlake

	
	function move() {
		var i = flakeCount,
			x, y, v, half_v,
			newTime = Date.now(),
			diffTime = newTime - prevTime;

		// Throttle code
		if (diffTime < 55 && flakeCount < absMax) {
			addFlake();

		} else if (diffTime > 150) {
			removeFlake();
		}

		prevTime = newTime;

		// Wind changes
		if (Math.random() > 0.8) {
			xv += -1 + Math.random() * 2;
			
			if (Math.abs(xv) > 3) {
				xv = 3 * (xv / Math.abs(xv));
			}
		}
		
		// Move each flake
		while (i--) {
			x = xs[i];
			y = ys[i];
			v = vs[i];
			half_v = hvs[i];
			
			y += v;
			
			x += Math.round(xv * v);
			x += -half_v + Math.round(Math.random() * v);
			
			// Because flakes are rotating, the origin could be +/- the size of the flake offset
			if (x > maxw) {
				x = -300;

			} else if (x < minw) {
				x = ww;
			}
			
			if (y > maxh) {
				resetFlake(i);

			} else {
				xs[i] = x;
				ys[i] = y;

				$(flakes[i]).css(
					{
						left: x + 'px',
						top: y + 'px'
					}
				);
				
				// Only spin biggest three flake sizes
				// Stupid IE9 can't do CSS3 transitions/animations
				// Of course it also can't do text-shadow... so maybe my accomodating IE9 here with a JS animation is silly. heh
				if (v >= 6) {
					$(flakes[i]).animate({rotate: '+=' + half_v + 'deg'}, 0);
				}
			}
		}
	} // move()
}(jQuery));