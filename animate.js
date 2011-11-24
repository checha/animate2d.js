function Animate2D(options) {
	
	options = options || {};
	var self = this;
	
	function __construct() {
		
	}
	
	self.createCanvas = function(type, opts) {// width, height, class, id
		/*
		 * canvas-2d, canvas-native-2d, canvas-dom, canvas-dom-transition, canvas-svg
		 */
		if(type == 'canvas-2d') {
			return new __Canvas2D__(opts);
		} else if(type == 'canvas-native-2d') {
			return new __CanvasNative2D__(opts);
		} else if(type == 'canvas-dom-transition') {
			
		} else if(type == 'canvas-dom') {
			
		} else if(type == 'canvas-svg') {
			
		} else {
			
		}
	}
	
	self.destroyCanvas = function(canvas) {
		
	}
	
	function _draw(sprites, context, p_width, p_height) {
		
		context.save();
		
		for(var i=0; i<sprites.length; i++) {
			
			var sprite = sprites[i];
			
			if(sprite.style('visibility') == 'hidden') continue;
			
			var width = sprite.style('width'), height = sprite.style('height');
			
			// position
			var top = sprite.style('top'), left = sprite.style('left'), right = sprite.style('right'), bottom = sprite.style('bottom');
				top = top===null?(bottom!==null?(p_height-height-bottom):0):top;
				left = left===null?(right!==null?(p_width-width-right):0):left;
			
			// frame
			var frameX = sprite.style('frame-x'), frameY = sprite.style('frame-y'),
				frameWidth = sprite.style('frame-width') || width, frameHeight = sprite.style('frame-height') || height;
				
			// offset
			var offsetX = sprite.style('offset-x'), offsetY = sprite.style('offset-y');
				
			// scale
			var scaleX = sprite.style('scale-x') || 1, scaleY = sprite.style('scale-y') || 1;
			
			// opacity
			var opacity = sprite.style('opacity');
			if(opacity !== null) context.globalAlpha = opacity;
				
			// rotate
			var rotate = sprite._style('rotate');
			if(rotate !== null) {
				var originX = sprite.style('origin-x'), originY = sprite.style('origin-y');
				originX = originX===null?width/2:originX;
				originY = originY===null?height/2:originY;
				
				context.save();
				context.translate(left+originX, top+originY);
				context.rotate(rotate * Math.PI/180);
				
				try {
					context.drawImage(sprite.draw(), 
						offsetX===null?frameX*frameWidth:offsetX, offsetY===null?frameY*frameHeight:offsetY, 
						frameWidth, frameHeight, 
						-originX-(frameWidth*(scaleX-1)/2), -originY-(frameHeight*(scaleY-1)/2), 
						frameWidth*scaleX, frameHeight*scaleY
					);
				} catch(e) {
					console.error(e);
				}
				
				context.translate(-left-originX, -top-originY);
				context.restore();
				
			} else {
				
				try {
					context.drawImage(sprite.draw(),
						offsetX===null?frameX*frameWidth:offsetX, offsetY===null?frameY*frameHeight:offsetY, 
						frameWidth, frameHeight, 
						left-(frameWidth*(scaleX-1)/2), top-(frameHeight*(scaleY-1)/2), 
						frameWidth*scaleX, frameHeight*scaleY
					);
				} catch(e) {
					console.error(e);
				}
			}
			
		}
		
		context.restore();
		
	}
	
	function __Canvas2D__(options) {
		
		options = options || {};
		var self = this;
		var canvas, context, sprites = [];		
	
		function __construct() {
			canvas = document.createElement('canvas');
			canvas.width = parseInt(options.width);
			canvas.height = parseInt(options.height);
			if(options.id) canvas.setAttribute('id', options.id);
			if(options['class']) canvas.setAttribute('class', options['class']);
			context = canvas.getContext('2d');			
			// bind timer
			
			
		}
		
		self.appendTo = function(parentNode) {
			parentNode.appendChild(canvas);
			return self;
		}
				
		self.createSprite = function(opts) {
			// add to timer
			
			return new __SpriteCanvas2D__(opts);
		}
		
		self.destroySprite = function(sprite) {			
			// delete to timer
			
			return self;
		}
		
		self.draw = function() {
			
			_draw(sprites, context, canvas.width, canvas.height);
			
			return self;
		}
		
		self.append = function(sprite, opts) {
			if(!(sprite instanceof __SpriteCanvas2D__)) return self;
			sprites.push(sprite);
			sprite.style(opts);
			sprites.sort(function(a, b) {
				return a.style('z-index') - b.style('z-index');
			});
			return self;
		}
		
		self.remove = function() {
			if(!(sprite instanceof __SpriteCanvas2D__)) return self;
			for(var i=0; i<sprites.length; i++) {
				if(sprites[i] == sprite) sprites.splice(i, 0);
			}
			return self;
		}
		
		self.__destroy = function() {
			
			// unbind timer
			
			
		}
		
		__construct();
		
	}
	
	/*
	 * image(y), width(y), height(y), frame-x(y), frame-y(y), frame-width(y), frame-height(y), z-index(y), 
	 * top(y), left(y), right(y), bottom(y), scale-x(y), scale-y(y), 
	 * rotate(y), opacity(y), visibility(y), origin-x(y), origin-y(y),
	 * offset-x(y), offset-y(y)
	 * parent
	 */
	function __SpriteCanvas2D__(options) {
		
		options = options || {};
		var self = this;
		var canvas,
			image,
			children = [], 
			parent = null, 
			styles = {},
			newStyles = {},
			change = false;
			
		
		function __construct() {
			setStyle(options);
			
			if(!styles['frame-width'] && styles['frame-width'] !== 0) styles['frame-width'] = styles.width;
			if(!styles['frame-height'] && styles['frame-height'] !== 0) styles['frame-height'] = styles.height;
			
			if(options.parent instanceof __SpriteCanvas2D__) parent = options.parent;
			
			canvas = new __CanvasNative2D__({width: styles.width, height: styles.height, buffer: true}).appendTo(document.body);
			if(options.image instanceof Image) {
				image = options.image;
				
				canvas.getContext().drawImage(image, 0, 0, styles.width, styles.height);
			}
			
		}
		
		function setStyle(style) {
			for(var i in style) {
				if(i == 'width') {
					styles.width = parseFloat(style[i]);
				} else if(i == 'height') {
					styles.height = parseFloat(style[i]);
				} else if(i == 'frame-x') {
					styles['frame-x'] = parseFloat(style[i]);
				} else if(i == 'frame-y') {
					styles['frame-y'] = parseFloat(style[i]);
				} else if(i == 'frame-width') {
					styles['frame-width'] = parseFloat(style[i]);
				} else if(i == 'frame-height') {
					styles['frame-height'] = parseFloat(style[i]);
				} else if(i == 'top') {
					styles.top = parseFloat(style[i]) || null;
				} else if(i == 'left') {
					styles.left = parseFloat(style[i]) || null;
				} else if(i == 'right') {
					styles.right = parseFloat(style[i]);
				} else if(i == 'bottom') {
					styles.bottom = parseFloat(style[i]);
				} else if(i == 'visibility') {
					styles.visibility = (style[i]=='visible' || style[i]=='hidden')?style[i]:'visible';
				} else if(i == 'z-index') {
					styles['z-index'] = parseInt(style[i]) || 0;
				} else if(i == 'scale-x') {
					newStyles['scale-x'] = styles['scale-x'] = (typeof style[i] == 'number' && style[i] > 0)?parseFloat(style[i]):1;
				} else if(i == 'scale-y') {
					newStyles['scale-y'] = styles['scale-y'] = (typeof style[i] == 'number' && style[i] > 0)?parseFloat(style[i]):1;
				} else if(i == 'rotate') {
					newStyles['rotate'] = styles['rotate'] = parseFloat(style[i]);
				} else if(i == 'opacity') {
					newStyles['opacity'] = styles['opacity'] = (style[i] > 0 && style[i] < 1)?parseFloat(style[i]):1;
				} else if(i == 'origin-x') {
					styles['origin-x'] = parseFloat(style[i]);
				} else if(i == 'origin-y') {
					styles['origin-y'] = parseFloat(style[i]);
				} else if(i == 'offset-x') {
					styles['offset-x'] = parseFloat(style[i]);
				} else if(i == 'offset-y') {
					styles['offset-y'] = parseFloat(style[i]);
				}
			}
		}
		
		self.style = function(name, value) {
			var style = {};
			if(self.style.arguments.length > 1) {
				style[name] = value;
			} else {
				if(name instanceof Object) {
					style = name;
				} else {
					return (styles[name] || styles[name] === 0)?styles[name]:null;
				}
			}
			setStyle(style);
			change = true;
			return self;
		}
		
		self._style = function(name) {
			return (newStyles[name] || newStyles[name] === 0)?newStyles[name]:null;
		}
		
		self.draw = function() {
			
			_draw(children, canvas.getContext(), styles.width, styles.height);
			
			newStyles = {};
			
			return canvas.getCanvas();
			
		}
		
		self.append = function(sprite, opts) {
			if(!(sprite instanceof __SpriteCanvas2D__)) return self;
			children.push(sprite);
			sprite.style(opts);
			children.sort(function(a, b) {
				return a.style('z-index') - b.style('z-index');
			});
			// change
			self.change(true);
			return self;
		}
		
		self.remove = function(sprite) {
			if(!(sprite instanceof __SpriteCanvas2D__)) return self;
			for(var i=0; i<children.length; i++) {
				if(children[i] == sprite) children.splice(i, 0);
			}
			// change
			self.change(true);
			return self;
		}
		
		function _change() {
			if(parent instanceof __SpriteCanvas2D__) parent.change(true);
		}
		
		self.change = function(status) {
			if(self.change.arguments.length > 0) {
				change = status;
				if(status) _change(true);
				return self;
			}
			return change;
		}
		
		self.parent = function() {
			return parent;
		}
		
		self.children = function(arg) {// index/each(this, index)
			if(typeof arg == 'function') {
				for(var i=0; i<children.length; i++) arg.call(children[i], i);
			} else {
				return children[arg];
			}
		}
		
		// animation
		self.animation = function(id, opts) {// delay, duration, action, property: {name: value, ...}, direction
			
		}
		
		self.play = function(id) {
			
		}
		
		self.stop = function(id) {
			
		}
		
		self.pause = function(id) {
			
		}
		
		self.movie = function(name, movie) {// id:count;id:count;...
			
		}
		
		self.playMovie = function(name) {
			
		}
		
		self.pauseMovie = function(name) {
			
		}
		
		self.stopMovie = function(name) {
			
		}
		
		self.addEventListener = function() {// ended, play, pause, stop, click
			
		}
		
		self.removeEventListener = function() {
			
		}
		
		self.on = self.addEventListener;
		
		self.one = function() {
			
		}
		
		__construct();
		
	}
	
	/*
	 * buffer
	 */
	function __CanvasNative2D__(options) {
		
		options = options || {};
		var self = this;
		var canvas, context;
	
		function __construct() {
			canvas = document.createElement('canvas');
			canvas.width = parseInt(options.width);
			canvas.height = parseInt(options.height);
			if(options.id) canvas.setAttribute('id', options.id);
			if(options['class']) canvas.setAttribute('class', options['class']);
			context = canvas.getContext('2d');
			
			if(options.buffer) {
				//canvas.style.visibility = 'hidden';
				//canvas.style.position = 'absolute';
				//canvas.style.left = (-1*(options.width+100))+'px';
			}
		}
		
		self.appendTo = function(parentNode) {
			parentNode.appendChild(canvas);
			return self;
		}
		
		self.getContext = function() {
			return context;
		}
		
		self.getCanvas = function() {
			return canvas;
		}
		
		__construct();
		
	}
	
	__construct();
	
}
