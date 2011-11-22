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
	
	function _draw() {
		
	}
	
	function __Canvas2D__(options) {
		
		options = options || {};
		var self = this;
		var canvas, context, element;
	
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
			
			if(!element.change()) return self;
			
			var top = element.style('top'), left = element.style('left'), right = element.style('right'), bottom = element.style('bottom');
			
			top = top===undefined?(bottom!==undefined?(canvas.height-element.style('height')-bottom):0):top;
			left = left===undefined?(right!==undefined?(canvas.width-element.style('width')-right):0):left;
			
			// frame!!!
			
			context.drawImage(element.draw(), left, top, element.style('width'), element.style('height'));
			
			return self;
		}
		
		/*
		self.rootSprite = function(sprite) {
			if(sprite instanceof __SpriteCanvas2D__) element = sprite; else element = null;
			return self;
		}
		*/
		
		self.append = function() {
			
		}
		
		self.remove = function() {
			
		}
		
		self.__destroy = function() {
			
			// unbind timer
			
			
		}
		
		__construct();
		
	}
	
	/*
	 * image, width, height, frame-x, frame-y, frame-width, frame-height, z-index, top, left, right, bottom, scale-x, scale-y, 
	 * rotate, opacity, visibility
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
			
			newStyles = {};
		}
		
		function setStyle(style) {
			for(var i in style) {
				if(i == 'width') {
					styles.width = parseFloat(style[i]) || 0;
				} else if(i == 'height') {
					styles.height = parseFloat(style[i]) || 0;
				} else if(i == 'frame-x') {
					styles['frame-x'] = (typeof style[i] == 'number' && style[i] >= 0)?parseFloat(style[i]):0;
				} else if(i == 'frame-y') {
					styles['frame-y'] = (typeof style[i] == 'number' && style[i] >= 0)?parseFloat(style[i]):0;
				} else if(i == 'frame-width') {
					styles['frame-width'] = (typeof style[i] == 'number' && style[i] >= 0)?parseFloat(style[i]):0;
				} else if(i == 'frame-height') {
					styles['frame-height'] = (typeof style[i] == 'number' && style[i] >= 0)?parseFloat(style[i]):0;
				} else if(i == 'top') {
					styles.top = (typeof style[i] == 'number' || style[i] === 0)?parseFloat(style[i]):null;
				} else if(i == 'left') {
					styles.left = (typeof style[i] == 'number' || style[i] === 0)?parseFloat(style[i]):null;
				} else if(i == 'right') {
					styles.right = (typeof style[i] == 'number' || style[i] === 0)?parseFloat(style[i]):0;
				} else if(i == 'bottom') {
					styles.bottom = (typeof style[i] == 'number' || style[i] === 0)?parseFloat(style[i]):0;
				} else if(i == 'visibility') {
					styles.visibility = (style[i]=='visible' || style[i]=='hidden')?style[i]:'visible';
				} else if(i == 'z-index') {
					styles['z-index'] = (typeof style[i] == 'number' || style[i] === 0)?parseInt(style[i]):0;
				} else if(i == 'scale-x') {
					newStyles['scale-x'] = styles['scale-x'] = (typeof style[i] == 'number')?parseFloat(style[i]):1;
				} else if(i == 'scale-y') {
					newStyles['scale-y'] = styles['scale-y'] = (typeof style[i] == 'number')?parseFloat(style[i]):1;
				} else if(i == 'rotate') {
					newStyles['rotate'] = styles['rotate'] = (typeof style[i] == 'number')?parseFloat(style[i]):0;
				} else if(i == 'opacity') {
					newStyles['opacity'] = styles['opacity'] = (style[i] > 0 && style[i] < 1)?parseFloat(style[i]):1;
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
					return styles[name];
				}
			}
			setStyle(style);
			change = true;
			return self;
		}
		
		self.draw = function() {
			var context = canvas.getContext();
			if(!change) return canvas.getCanvas();
			
			context.save();
			
			context.clearRect(0, 0 ,styles.width, styles.height);
			
			// current scale
			
			context.drawImage(image, 0, 0, styles.width, styles.height);
			
			for(var i=0; i<children.length; i++) {
				var sprt = children[i];
				context.drawImage(sprt.draw(), 0, 0, sprt.style('width'), sprt.style('height'));
			}
			
			// draw of new styles
			
			
			context.restore();
			
			return canvas.getCanvas();
		}
		
		self.append = function(sprite, opts) {
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
			if(!(sprite instanceof __SpriteCanvas2D__)) return;
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
