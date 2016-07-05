(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.aframeEditor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author mrdoob / http://mrdoob.com/
 */

var Sortable = require('sortablejs');

var UI = {};

UI.Element = function ( dom ) {

  this.dom = dom;

};

UI.Element.prototype = {

  add: function () {

    for ( var i = 0; i < arguments.length; i ++ ) {

      var argument = arguments[ i ];

      if ( argument instanceof UI.Element ) {

        this.dom.appendChild( argument.dom );

      } else {

        console.error( 'UI.Element:', argument, 'is not an instance of UI.Element.' );

      }

    }

    return this;

  },

  remove: function () {

    for ( var i = 0; i < arguments.length; i ++ ) {

      var argument = arguments[ i ];

      if ( argument instanceof UI.Element ) {

        this.dom.removeChild( argument.dom );

      } else {

        console.error( 'UI.Element:', argument, 'is not an instance of UI.Element.' );

      }

    }

    return this;

  },

  clear: function () {

    while ( this.dom.children.length ) {

      this.dom.removeChild( this.dom.lastChild );

    }

  },

  setId: function ( id ) {

    this.dom.id = id;

    return this;

  },

  getId: function () {

    return this.dom.id;

  },

  setClass: function ( name ) {

    this.dom.className = name;

    return this;

  },

  setStyle: function ( style, array ) {

    for ( var i = 0; i < array.length; i ++ ) {

      this.dom.style[ style ] = array[ i ];

    }

    return this;

  },

  show: function () {

      this.dom.style.display = 'block';
      this.visible = true;

  },

  hide: function () {

      this.dom.style.display = 'none';
      this.visible = false;
      
  },

  setDisabled: function ( value ) {

    this.dom.disabled = value;

    return this;

  },

  setTextContent: function ( value ) {

    this.dom.textContent = value;

    return this;

  }

};

// properties

var properties = [ 'position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'border', 'borderLeft',
'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'display', 'overflow', 'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'color',
'backgroundColor', 'opacity', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'textTransform', 'cursor', 'zIndex' ];

properties.forEach( function ( property ) {

  var method = 'set' + property.substr( 0, 1 ).toUpperCase() + property.substr( 1, property.length );

  UI.Element.prototype[ method ] = function () {

    this.setStyle( property, arguments );

    return this;

  };

} );

// events

var events = [ 'KeyUp', 'KeyDown', 'MouseOver', 'MouseOut', 'Click', 'DblClick', 'Change' ];

events.forEach( function ( event ) {

  var method = 'on' + event;

  UI.Element.prototype[ method ] = function ( callback ) {

    this.dom.addEventListener( event.toLowerCase(), callback.bind( this ), false );

    return this;

  };

} );

// Span

UI.Span = function () {

  UI.Element.call( this );

  this.dom = document.createElement( 'span' );

  return this;

};

UI.Span.prototype = Object.create( UI.Element.prototype );
UI.Span.prototype.constructor = UI.Span;

// Div

UI.Div = function () {

  UI.Element.call( this );

  this.dom = document.createElement( 'div' );

  return this;

};

UI.Div.prototype = Object.create( UI.Element.prototype );
UI.Div.prototype.constructor = UI.Div;

// Row

UI.Row = function () {

  UI.Element.call( this );

  var dom = document.createElement( 'div' );
  dom.className = 'Row';

  this.dom = dom;

  return this;

};

UI.Row.prototype = Object.create( UI.Element.prototype );
UI.Row.prototype.constructor = UI.Row;

// Panel

UI.Panel = function () {

  UI.Element.call( this );

  var dom = document.createElement( 'div' );
  dom.className = 'Panel';

  this.dom = dom;

  return this;

};

UI.Panel.prototype = Object.create( UI.Element.prototype );
UI.Panel.prototype.constructor = UI.Panel;


// Collapsible Panel

UI.CollapsiblePanel = function () {

  UI.Panel.call( this );

  this.setClass( 'Panel Collapsible' );

  var scope = this;

  this.static = new UI.Panel();
  this.static.setClass( 'Static' );
  this.static.onClick( function () {

    scope.toggle();

  } );
  this.dom.appendChild( this.static.dom );

  this.contents = new UI.Panel();
  this.contents.setClass( 'Content' );
  this.dom.appendChild( this.contents.dom );

  var button = new UI.Panel();
  button.setClass( 'Button' );
  this.static.add( button );

  this.isCollapsed = false;

  return this;

};

UI.CollapsiblePanel.prototype = Object.create( UI.Panel.prototype );
UI.CollapsiblePanel.prototype.constructor = UI.CollapsiblePanel;

UI.CollapsiblePanel.prototype.addStatic = function () {

  this.static.add.apply( this.static, arguments );
  return this;

};

UI.CollapsiblePanel.prototype.removeStatic = function () {

  this.static.remove.apply( this.static, arguments );
  return this;

};

UI.CollapsiblePanel.prototype.clearStatic = function () {

  this.static.clear();
  return this;

};

UI.CollapsiblePanel.prototype.add = function () {

  this.contents.add.apply( this.contents, arguments );
  return this;

};

UI.CollapsiblePanel.prototype.remove = function () {

  this.contents.remove.apply( this.contents, arguments );
  return this;

};

UI.CollapsiblePanel.prototype.clear = function () {

  this.contents.clear();
  return this;

};

UI.CollapsiblePanel.prototype.toggle = function() {

  this.setCollapsed( ! this.isCollapsed );

};

UI.CollapsiblePanel.prototype.collapse = function() {

  this.setCollapsed( true );

};

UI.CollapsiblePanel.prototype.expand = function() {

  this.setCollapsed( false );

};

UI.CollapsiblePanel.prototype.setCollapsed = function( boolean ) {

  if ( boolean ) {

    this.dom.classList.add( 'collapsed' );

  } else {

    this.dom.classList.remove( 'collapsed' );

  }

  this.isCollapsed = boolean;

  if ( this.onCollapsedChangeCallback !== undefined ) {

    this.onCollapsedChangeCallback( boolean );

  }

};

UI.CollapsiblePanel.prototype.onCollapsedChange = function ( callback ) {

  this.onCollapsedChangeCallback = callback;

};

// Text

UI.Text = function ( text ) {

  UI.Element.call( this );

  var dom = document.createElement( 'span' );
  dom.className = 'Text';
  dom.style.cursor = 'default';
  dom.style.display = 'inline-block';
  dom.style.verticalAlign = 'middle';

  this.dom = dom;
  this.setValue( text );

  return this;

};

UI.Text.prototype = Object.create( UI.Element.prototype );
UI.Text.prototype.constructor = UI.Text;

UI.Text.prototype.getValue = function () {

  return this.dom.textContent;

};

UI.Text.prototype.setValue = function ( value ) {

  if ( value !== undefined ) {

    this.dom.textContent = value;

  }

  return this;

};


// Input

UI.Input = function ( text ) {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'input' );
  dom.className = 'Input';
  dom.style.padding = '2px';
  dom.style.border = '1px solid transparent';

  dom.addEventListener( 'keydown', function ( event ) {

    event.stopPropagation();

  }, false );

  this.dom = dom;
  this.setValue( text );

  return this;

};

UI.Input.prototype = Object.create( UI.Element.prototype );
UI.Input.prototype.constructor = UI.Input;

UI.Input.prototype.getValue = function () {

  return this.dom.value;

};

UI.Input.prototype.setValue = function ( value ) {

  this.dom.value = value;

  return this;

};


// TextArea

UI.TextArea = function () {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'textarea' );
  dom.className = 'TextArea';
  dom.style.padding = '2px';
  dom.spellcheck = false;

  dom.addEventListener( 'keydown', function ( event ) {

    event.stopPropagation();

    if ( event.keyCode === 9 ) {

      event.preventDefault();

      var cursor = dom.selectionStart;

      dom.value = dom.value.substring( 0, cursor ) + '\t' + dom.value.substring( cursor );
      dom.selectionStart = cursor + 1;
      dom.selectionEnd = dom.selectionStart;

    }

  }, false );

  this.dom = dom;

  return this;

};

UI.TextArea.prototype = Object.create( UI.Element.prototype );
UI.TextArea.prototype.constructor = UI.TextArea;

UI.TextArea.prototype.getValue = function () {

  return this.dom.value;

};

UI.TextArea.prototype.setValue = function ( value ) {

  this.dom.value = value;

  return this;

};


// Select

UI.Select = function () {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'select' );
  dom.className = 'Select';
  dom.style.padding = '2px';

  this.dom = dom;

  return this;

};

UI.Select.prototype = Object.create( UI.Element.prototype );
UI.Select.prototype.constructor = UI.Select;

UI.Select.prototype.setMultiple = function ( boolean ) {

  this.dom.multiple = boolean;

  return this;

};

UI.Select.prototype.setOptions = function ( options ) {

  var selected = this.dom.value;

  while ( this.dom.children.length > 0 ) {

    this.dom.removeChild( this.dom.firstChild );

  }

  for ( var key in options ) {

    var option = document.createElement( 'option' );
    option.value = key;
    option.innerHTML = options[ key ];
    this.dom.appendChild( option );

  }

  this.dom.value = selected;

  return this;

};

UI.Select.prototype.getValue = function () {

  return this.dom.value;

};

UI.Select.prototype.setValue = function ( value ) {

  value = String( value );

  if ( this.dom.value !== value ) {

    this.dom.value = value;

  }

  return this;

};

// Checkbox

UI.Checkbox = function ( boolean ) {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'input' );
  dom.className = 'Checkbox';
  dom.type = 'checkbox';

  this.dom = dom;
  this.setValue( boolean );

  return this;

};

UI.Checkbox.prototype = Object.create( UI.Element.prototype );
UI.Checkbox.prototype.constructor = UI.Checkbox;

UI.Checkbox.prototype.getValue = function () {

  return this.dom.checked;

};

UI.Checkbox.prototype.setValue = function ( value ) {

  if ( value !== undefined ) {

    this.dom.checked = value;

  }

  return this;

};


// Color

UI.Color = function () {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'input' );
  dom.className = 'Color';
  dom.style.width = '64px';
  dom.style.height = '17px';
  dom.style.border = '0px';
  dom.style.padding = '2px';
  dom.style.backgroundColor = 'transparent';

  try {

    dom.type = 'color';
    dom.value = '#ffffff';

  } catch ( exception ) {}

  this.dom = dom;

  return this;

};

UI.Color.prototype = Object.create( UI.Element.prototype );
UI.Color.prototype.constructor = UI.Color;

UI.Color.prototype.getValue = function () {

  return this.dom.value;

};

UI.Color.prototype.getHexValue = function () {

  return parseInt( this.dom.value.substr( 1 ), 16 );

};

UI.Color.prototype.setValue = function ( value ) {

  this.dom.value = value;

  return this;

};

UI.Color.prototype.setHexValue = function ( hex ) {

  this.dom.value = '#' + ( '000000' + hex.toString( 16 ) ).slice( - 6 );

  return this;

};


// Number

UI.Number = function ( number ) {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'input' );
  dom.className = 'Number';
  dom.value = '0.00';

  dom.addEventListener( 'keydown', function ( event ) {

    event.stopPropagation();

    if ( event.keyCode === 13 ) dom.blur();

  }, false );

  this.value = 0;

  this.min = - Infinity;
  this.max = Infinity;

  this.precision = 2;
  this.step = 1;

  this.dom = dom;

  this.setValue( number );

  var changeEvent = document.createEvent( 'HTMLEvents' );
  changeEvent.initEvent( 'change', true, true );

  var distance = 0;
  var onMouseDownValue = 0;

  var pointer = [ 0, 0 ];
  var prevPointer = [ 0, 0 ];

  function onMouseDown( event ) {

    event.preventDefault();

    distance = 0;

    onMouseDownValue = scope.value;

    prevPointer = [ event.clientX, event.clientY ];

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mouseup', onMouseUp, false );

  }

  function onMouseMove( event ) {

    var currentValue = scope.value;

    pointer = [ event.clientX, event.clientY ];

    distance += ( pointer[ 0 ] - prevPointer[ 0 ] ) - ( pointer[ 1 ] - prevPointer[ 1 ] );

    var value = onMouseDownValue + ( distance / ( event.shiftKey ? 5 : 50 ) ) * scope.step;
    value = Math.min( scope.max, Math.max( scope.min, value ) );

    if ( currentValue !== value ) {

      scope.setValue( value );
      dom.dispatchEvent( changeEvent );

    }

    prevPointer = [ event.clientX, event.clientY ];

  }

  function onMouseUp( event ) {

    document.removeEventListener( 'mousemove', onMouseMove, false );
    document.removeEventListener( 'mouseup', onMouseUp, false );

    if ( Math.abs( distance ) < 2 ) {

      dom.focus();
      dom.select();

    }

  }

  function onChange( event ) {

    var value = 0;

    try {

      value = eval( dom.value );

    } catch ( error ) {

      console.error( error.message );

    }

    scope.setValue( parseFloat( value ) );

  }

  function onFocus( event ) {

    dom.style.backgroundColor = '';
    dom.style.cursor = '';

  }

  function onBlur( event ) {

    dom.style.backgroundColor = 'transparent';
    dom.style.cursor = 'col-resize';

  }

  onBlur();

  dom.addEventListener( 'mousedown', onMouseDown, false );
  dom.addEventListener( 'change', onChange, false );
  dom.addEventListener( 'focus', onFocus, false );
  dom.addEventListener( 'blur', onBlur, false );

  return this;

};

UI.Number.prototype = Object.create( UI.Element.prototype );
UI.Number.prototype.constructor = UI.Number;

UI.Number.prototype.getValue = function () {

  return this.value;

};

UI.Number.prototype.setValue = function ( value ) {

  if ( value !== undefined ) {

    value = parseFloat(value);
    if (value < this.min)
      value = this.min;
    if (value > this.max)
      value = this.max;
    
    this.value = value;
    this.dom.value = value.toFixed( this.precision );

  }

  return this;

};

UI.Number.prototype.setRange = function ( min, max ) {

  this.min = min;
  this.max = max;

  return this;

};

UI.Number.prototype.setPrecision = function ( precision ) {

  this.precision = precision;

  return this;

};


// Integer

UI.Integer = function ( number ) {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'input' );
  dom.className = 'Number';
  dom.value = '0';

  dom.addEventListener( 'keydown', function ( event ) {

    event.stopPropagation();

  }, false );

  this.value = 0;

  this.min = - Infinity;
  this.max = Infinity;

  this.step = 1;

  this.dom = dom;

  this.setValue( number );

  var changeEvent = document.createEvent( 'HTMLEvents' );
  changeEvent.initEvent( 'change', true, true );

  var distance = 0;
  var onMouseDownValue = 0;

  var pointer = [ 0, 0 ];
  var prevPointer = [ 0, 0 ];

  function onMouseDown( event ) {

    event.preventDefault();

    distance = 0;

    onMouseDownValue = scope.value;

    prevPointer = [ event.clientX, event.clientY ];

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mouseup', onMouseUp, false );

  }

  function onMouseMove( event ) {

    var currentValue = scope.value;

    pointer = [ event.clientX, event.clientY ];

    distance += ( pointer[ 0 ] - prevPointer[ 0 ] ) - ( pointer[ 1 ] - prevPointer[ 1 ] );

    var value = onMouseDownValue + ( distance / ( event.shiftKey ? 5 : 50 ) ) * scope.step;
    value = Math.min( scope.max, Math.max( scope.min, value ) ) | 0;

    if ( currentValue !== value ) {

      scope.setValue( value );
      dom.dispatchEvent( changeEvent );

    }

    prevPointer = [ event.clientX, event.clientY ];

  }

  function onMouseUp( event ) {

    document.removeEventListener( 'mousemove', onMouseMove, false );
    document.removeEventListener( 'mouseup', onMouseUp, false );

    if ( Math.abs( distance ) < 2 ) {

      dom.focus();
      dom.select();

    }

  }

  function onChange( event ) {

    var value = 0;

    try {

      value = eval( dom.value );

    } catch ( error ) {

      console.error( error.message );

    }

    scope.setValue( value );

  }

  function onFocus( event ) {

    dom.style.backgroundColor = '';
    dom.style.cursor = '';

  }

  function onBlur( event ) {

    dom.style.backgroundColor = 'transparent';
    dom.style.cursor = 'col-resize';

  }

  onBlur();

  dom.addEventListener( 'mousedown', onMouseDown, false );
  dom.addEventListener( 'change', onChange, false );
  dom.addEventListener( 'focus', onFocus, false );
  dom.addEventListener( 'blur', onBlur, false );

  return this;

};

UI.Integer.prototype = Object.create( UI.Element.prototype );
UI.Integer.prototype.constructor = UI.Integer;

UI.Integer.prototype.getValue = function () {

  return this.value;

};

UI.Integer.prototype.setValue = function ( value ) {

  if ( value !== undefined ) {

    this.value = value | 0;
    this.dom.value = value | 0;

  }

  return this;

};

UI.Integer.prototype.setRange = function ( min, max ) {

  this.min = min;
  this.max = max;

  return this;

};


// Break

UI.Break = function () {

  UI.Element.call( this );

  var dom = document.createElement( 'br' );
  dom.className = 'Break';

  this.dom = dom;

  return this;

};

UI.Break.prototype = Object.create( UI.Element.prototype );
UI.Break.prototype.constructor = UI.Break;


// HorizontalRule

UI.HorizontalRule = function () {

  UI.Element.call( this );

  var dom = document.createElement( 'hr' );
  dom.className = 'HorizontalRule';

  this.dom = dom;

  return this;

};

UI.HorizontalRule.prototype = Object.create( UI.Element.prototype );
UI.HorizontalRule.prototype.constructor = UI.HorizontalRule;


// Button

UI.Button = function ( value ) {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'button' );
  dom.className = 'Button';

  this.dom = dom;
  this.dom.textContent = value;

  return this;

};

UI.Button.prototype = Object.create( UI.Element.prototype );
UI.Button.prototype.constructor = UI.Button;

UI.Button.prototype.setLabel = function ( value ) {

  this.dom.textContent = value;

  return this;

};


// Modal

UI.Modal = function ( value ) {

  var scope = this;

  var dom = document.createElement( 'div' );

  dom.style.position = 'absolute';
  dom.style.width = '100%';
  dom.style.height = '100%';
  dom.style.backgroundColor = 'rgba(0,0,0,0.5)';
  dom.style.display = 'none';
  dom.style.alignItems = 'center';
  dom.style.justifyContent = 'center';
  dom.addEventListener( 'click', function ( event ) {

    scope.hide();

  } );

  this.dom = dom;

  this.container = new UI.Panel();
  this.container.dom.style.width = '200px';
  this.container.dom.style.padding = '20px';
  this.container.dom.style.backgroundColor = '#ffffff';
  this.container.dom.style.boxShadow = '0px 5px 10px rgba(0,0,0,0.5)';

  this.add( this.container );

  return this;

};

UI.Modal.prototype = Object.create( UI.Element.prototype );
UI.Modal.prototype.constructor = UI.Modal;

UI.Modal.prototype.show = function ( content ) {

  this.container.clear();
  this.container.add( content );

  this.dom.style.display = 'flex';

  return this;

};

UI.Modal.prototype.hide = function () {

  this.dom.style.display = 'none';

  return this;

};



// ----- UI.THREEJS

// Outliner

UI.Outliner = function ( editor ) {

  UI.Element.call( this );

  var scope = this;

  var dom = document.createElement( 'div' );
  dom.className = 'Outliner';
  dom.tabIndex = 0; // keyup event is ignored without setting tabIndex

  var scene = editor.scene;

  var sortable = Sortable.create( dom, {
    draggable: '.draggable',
    onUpdate: function ( event ) {

      var item = event.item;

      var object = scene.getObjectById( item.value );

      if ( item.nextSibling === null ) {

        editor.execute( new MoveObjectCommand( object, editor.scene ) );

      } else {

        var nextObject = scene.getObjectById( item.nextSibling.value );
        editor.execute( new MoveObjectCommand( object, nextObject.parent, nextObject ) );

      }

    }
  } );

  // Broadcast for object selection after arrow navigation
  var changeEvent = document.createEvent( 'HTMLEvents' );
  changeEvent.initEvent( 'change', true, true );

  // Prevent native scroll behavior
  dom.addEventListener( 'keydown', function ( event ) {

    switch ( event.keyCode ) {
      case 38: // up
      case 40: // down
        event.preventDefault();
        event.stopPropagation();
        break;
    }

  }, false );

  // Keybindings to support arrow navigation
  dom.addEventListener( 'keyup', function ( event ) {

    function select( index ) {

      if ( index >= 0 && index < scope.options.length ) {

        scope.selectedIndex = index;

        // Highlight selected dom elem and scroll parent if needed
        scope.setValue( scope.options[ index ].value );
        scope.dom.dispatchEvent( changeEvent );

      }

    }

    switch ( event.keyCode ) {
      case 38: // up
        select( scope.selectedIndex - 1 );
        break;
      case 40: // down
        select( scope.selectedIndex + 1 );
        break;
    }

  }, false );

  this.dom = dom;

  this.options = [];
  this.selectedIndex = - 1;
  this.selectedValue = null;

  return this;

};

UI.Outliner.prototype = Object.create( UI.Element.prototype );
UI.Outliner.prototype.constructor = UI.Outliner;

UI.Outliner.prototype.setOptions = function ( options ) {

  var scope = this;

  var changeEvent = document.createEvent( 'HTMLEvents' );
  changeEvent.initEvent( 'change', true, true );

  while ( scope.dom.children.length > 0 ) {

    scope.dom.removeChild( scope.dom.firstChild );

  }

  scope.options = [];

  for ( var i = 0; i < options.length; i ++ ) {

    var option = options[ i ];

    var div = document.createElement( 'div' );
    div.className = 'option ' + ( option.static === true ? '' : 'draggable' );
    div.innerHTML = option.html;
    div.value = option.value;
    scope.dom.appendChild( div );

    scope.options.push( div );

    div.addEventListener( 'click', function ( event ) {

      scope.setValue( this.value );
      scope.dom.dispatchEvent( changeEvent );

    }, false );

  }

  return scope;

};

UI.Outliner.prototype.getValue = function () {

  return this.selectedValue;

};

UI.Outliner.prototype.setValue = function ( value ) {

  for ( var i = 0; i < this.options.length; i ++ ) {

    var element = this.options[ i ];

    if ( element.value === value ) {

      element.classList.add( 'active' );

      // scroll into view

      var y = element.offsetTop - this.dom.offsetTop;
      var bottomY = y + element.offsetHeight;
      var minScroll = bottomY - this.dom.offsetHeight;

      if ( this.dom.scrollTop > y ) {

        this.dom.scrollTop = y;

      } else if ( this.dom.scrollTop < minScroll ) {

        this.dom.scrollTop = minScroll;

      }

      this.selectedIndex = i;

    } else {

      element.classList.remove( 'active' );

    }

  }

  this.selectedValue = value;

  return this;

};

UI.THREE = {};

UI.THREE.Boolean = function ( boolean, text ) {

  UI.Span.call( this );

  this.setMarginRight( '10px' );

  this.checkbox = new UI.Checkbox( boolean );
  this.text = new UI.Text( text ).setMarginLeft( '3px' );

  this.add( this.checkbox );
  this.add( this.text );

};

UI.THREE.Boolean.prototype = Object.create( UI.Span.prototype );
UI.THREE.Boolean.prototype.constructor = UI.THREE.Boolean;

UI.THREE.Boolean.prototype.getValue = function () {

  return this.checkbox.getValue();

};

UI.THREE.Boolean.prototype.setValue = function ( value ) {

  return this.checkbox.setValue( value );

};

UI.Vector3 = function ( vector3 ) {

  UI.Element.call( this );

  var dom = document.createElement( 'div' );
  dom.className = 'Row';

  this.dom = dom;

  var scope=this;
    
  this.vector={
    'x': new UI.Number().setWidth('50px'),
    'y': new UI.Number().setWidth('50px'),
    'z': new UI.Number().setWidth('50px'),
  }
  
  this.add(this.vector['x'] ,this.vector['y'] ,this.vector['z']);
};

UI.Vector3.prototype = Object.create( UI.Element.prototype );
UI.Vector3.prototype.constructor = UI.Vector3;

UI.Vector3.prototype.setWidth=function(value) {
  return this;
};

UI.Vector3.prototype.setValue=function(value) {
  for (var val in value) {
    this.vector[val].setValue(value[val]);
  }
  return this;
};

UI.Vector3.prototype.getValue=function() {
  return {
    'x': this.vector['x'].getValue(),
    'y': this.vector['x'].getValue(),
    'z': this.vector['x'].getValue()
  }
}

module.exports = UI;
},{"sortablejs":4}],2:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }
        
        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],3:[function(require,module,exports){
/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */

(function(global){

    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal : function () {
            return this._signal;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    function Signal() {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;

        // enforce dispatch to aways work on same context (#47)
        var self = this;
        this.dispatch = function(){
            Signal.prototype.dispatch.apply(self, arguments);
        };
    }

    Signal.prototype = {

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '1.0.0',

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    // Namespace -----------------------------------------------------
    //================================================================

    /**
     * Signals namespace
     * @namespace
     * @name signals
     */
    var signals = Signal;

    /**
     * Custom event broadcaster
     * @see Signal
     */
    // alias for backwards compatibility (see #gh-44)
    signals.Signal = Signal;



    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define(function () { return signals; });
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        /*jslint sub:true */
        global['signals'] = signals;
    }

}(this));

},{}],4:[function(require,module,exports){
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */


(function (factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else if (typeof Package !== "undefined") {
		Sortable = factory();  // export for Meteor.js
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function () {
	"use strict";

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,

		scrollEl,
		scrollParentEl,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		RSPACE = /\s+/g,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		slice = [].slice,

		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							if (el === win) {
								win.scrollTo(win.pageXOffset + vx * speed, win.pageYOffset + vy * speed);
							} else {
								vy && (el.scrollTop += vy * speed);
								vx && (el.scrollLeft += vx * speed);
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			var group = options.group;

			if (!group || typeof group != 'object') {
				group = options.group = {name: group};
			}

			['pull', 'put'].forEach(function (key) {
				if (!(key in group)) {
					group[key] = true;
				}
			});

			options.groups = ' ' + group.name + (group.put.join ? ' ' + group.put.join(' ') : '') + ' ';
		}
	;



	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;


		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			ignore: 'a, img',
			filter: null,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = target,
				filter = options.filter;


			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			// get the index of the dragged element within its parent
			oldIndex = _index(target);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, oldIndex);
					evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, oldIndex);
						return true;
					}
				});

				if (filter) {
					evt.preventDefault();
					return; // cancel dnd
				}
			}


			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}


			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				activeGroup = options.group;

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = true;

					// Chosen item
					_toggleClass(dragEl, _this.options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(touch);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Touch */touch) {
			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					document.selection.empty();
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				// Apply effect
				_toggleClass(dragEl, this.options.ghostClass, true);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					groupName = ' ' + this.options.group.name + '',
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando] && parent[expando].options.groups.indexOf(groupName) > -1) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				var touch = evt.touches ? evt.touches[0] : evt,
					dx = touch.clientX - tapEvt.clientX,
					dy = touch.clientY - tapEvt.clientY,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.pull == 'clone') {
				cloneEl = dragEl.cloneNode(true);
				_css(cloneEl, 'display', 'none');
				rootEl.insertBefore(cloneEl, dragEl);
			}

			if (useFallback) {

				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				revert,
				options = this.options,
				group = options.group,
				groupPut = group.put,
				isOwner = (activeGroup === group),
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			moved = true;

			if (activeGroup && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: activeGroup.pull && groupPut && (
						(activeGroup.name === group.name) || // by Name
						(groupPut.indexOf && ~groupPut.indexOf(activeGroup.name)) // by Array
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (revert) {
					_cloneHide(true);

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (target = _ghostIsLast(el, evt))
				) {

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}


					var targetRect = target.getBoundingClientRect(),
						width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect),
						after
					;

					if (moveVector !== false) {
						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(isOwner);

						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}
						else if (floating) {
							var elTop = dragEl.offsetTop,
								tgTop = target.offsetTop;

							if (elTop === tgTop) {
								after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
							} else {
								after = tgTop > elTop;
							}
						} else {
							after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
						}

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode.removeChild(ghostEl);

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);

						if (newIndex >= 0) {
							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);

							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						// Remove clone
						cloneEl && cloneEl.parentNode.removeChild(cloneEl);

						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						if (newIndex === null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

				// Nulling
				rootEl =
				dragEl =
				parentEl =
				ghostEl =
				nextEl =
				cloneEl =

				scrollEl =
				scrollParentEl =

				tapEvt =
				touchEvt =

				moved =
				newIndex =

				lastEl =
				lastCSS =

				activeGroup =
				Sortable.active = null;
			}
		},


		handleEvent: function (/**Event*/evt) {
			var type = evt.type;

			if (type === 'dragover' || type === 'dragenter') {
				if (dragEl) {
					this._onDragOver(evt);
					_globalDragOver(evt);
				}
			}
			else if (type === 'drop' || type === 'dragend') {
				this._onDrop(evt);
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(state) {
		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');
			!state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			do {
				if (
					(tag === '>*' && el.parentNode === ctx) || (
						(tag === '' || el.nodeName.toUpperCase() == tag) &&
						(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
					)
				) {
					return el;
				}
			}
			while (el !== ctx && (el = el.parentNode));
		}

		return null;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, false);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(RSPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		var evt = document.createEvent('Event'),
			options = (sortable || rootEl[expando]).options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
				rect = lastEl.getBoundingClientRect();

		return ((evt.clientY - (rect.top + rect.height) > 5) || (evt.clientX - (rect.right + rect.width) > 5)) && lastEl; // min delta
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent
	 * @param  {HTMLElement} el
	 * @return {number}
	 */
	function _index(el) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if (el.nodeName.toUpperCase() !== 'TEMPLATE') {
				index++;
			}
		}

		return index;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.4.2';
	return Sortable;
});

},{}],5:[function(require,module,exports){
/* global aframeEditor */
var Panels = require('./panels');
var Signals = require('signals');
var Viewport = require('./viewport');
var Helpers = require('./helpers');

function Editor () {
  document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
}

Editor.prototype = {
  onDomLoaded: function () {
    this.tools = require('./tools');
    this.sceneEl = document.querySelector('a-scene');

    if (this.sceneEl.hasLoaded) {
      this.initUI();
    } else {
      this.sceneEl.addEventListener('loaded', this.initUI.bind(this));
    }
  },

  initUI: function () {
    this.cameraEl = this.sceneEl.cameraEl;
    this.camera = this.cameraEl.object3D;

    this.initEvents();

    this.selected = null;
    this.panels = new Panels(this);
    this.scene = this.sceneEl.object3D;
    this.helpers = new Helpers(this);
    this.viewport = new Viewport(this);
  },

  initEvents: function () {
    this.signals = {
      sceneGraphChanged: new Signals.Signal(),
      objectSelected: new Signals.Signal(),
      entitySelected: new Signals.Signal(),
      objectChanged: new Signals.Signal(),
      componentChanged: new Signals.Signal()
    };

    this.signals.entitySelected.add(function (entity) {
      this.selectedEntity = entity;
      if (entity) {
        this.select(entity.object3D);
      } else {
        this.select(null);
      }
    }.bind(this));

    var entities = document.querySelectorAll('a-entity');
    for (var i = 0; i < entities.length; ++i) {
      var entity = entities[i];
      entity.addEventListener('componentchanged',
        function (evt) {
          if (this.selected && evt.srcElement === this.selected.el) {
            aframeEditor.editor.signals.componentChanged.dispatch(evt);
          }
        }.bind(this));
    }
  },

  selectById: function (id) {
    if (id === this.camera.id) {
      this.select(this.camera);
      return;
    }
    this.select(this.scene.getObjectById(id, true));
  },

  select: function (object) {
    if (this.selected === object) {
      return;
    }

    this.selected = object;
    this.signals.objectSelected.dispatch(object);
  }

};

module.exports = new Editor();

},{"./helpers":6,"./panels":13,"./tools":18,"./viewport":23,"signals":3}],6:[function(require,module,exports){
/* global THREE */
function Helpers (editor) {
  this.editor = editor;

  this.defaultSize = 0.5;

  // threejs Helpers
  this.sceneHelpers = new THREE.Group();
  this.sceneHelpers.visible = false;
  editor.scene.add(this.sceneHelpers);
  this.helpers = {};

  this.addGridHelper();
  this.findHelpers();

  editor.signals.objectChanged.add(function (object) {
    this.updateHelper(object.el);
  }.bind(this));
}

Helpers.prototype = {
  addGridHelper: function () {
    this.grid = new THREE.GridHelper(10, 1);
    this.add(this.grid);
  },

  updateHelper: function (entity) {
    if (entity.helper) {
      var object = entity.components['light'].light;
      var helper = this.helpers[ entity.object3D.id ];
      if (helper instanceof this.guessHelperType(entity)) {
        // It's the same helper, just update and skip
        helper.update();
      } else {
        helper.parent.remove(helper);
        delete this.helpers[ object.id ];
        this.addHelper(entity);
      }
    } else {
      this.addHelper(entity);
    }
  },

  removeHelper: function (object) {
    if (this.sceneHelpers[object.id] !== undefined) {
      var helper = this.helpers[ object.id ];
      helper.parent.remove(helper);
      delete this.helpers[ object.id ];
      this.signals.helperRemoved.dispatch(helper);
    }
  },

  guessHelperType: function (entity) {
    if (entity.components['light']) {
      var object = entity.components['light'].light;

      if (object instanceof THREE.PointLight) {
        return THREE.PointLightHelper;
      } else if (object instanceof THREE.DirectionalLight) {
        return THREE.DirectionalLightHelper;
      } else if (object instanceof THREE.SpotLight) {
        return THREE.SpotLightHelper;
      } else if (object instanceof THREE.HemisphereLight) {
        return THREE.HemisphereLightHelper;
      } else {
        // no helper for this object type
        return null;
      }
    }
  },

  addHelper: function (entity) {
    if (entity.dataset && !entity.dataset.isEditor) {
      var HelperType = this.guessHelperType(entity);
      if (HelperType == null) {
        return;
      }
      var object = entity.components['light'].light;
      var helper = new HelperType(object, this.defaultSize);

      entity.helper = helper;
      this.helpers[ entity.object3D.id ] = helper;
      this.add(helper);
    }
  },

  findHelpers: function () {
    var scene = this.editor.sceneEl;
    var $this = this;

    (function treeIterate (element) {
      var children = element.children;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        $this.addHelper(child);
        treeIterate(child);
      }
    })(scene);
  },

  add: function (helper) {
    this.sceneHelpers.add(helper);
  },

  hide: function () {
    this.sceneHelpers.visible = false;
  },

  show: function () {
    this.sceneHelpers.visible = true;
  }
};

module.exports = Helpers;

},{}],7:[function(require,module,exports){
var editor = require('./editor.js');

module.exports = {
  editor: editor
};

},{"./editor.js":5}],8:[function(require,module,exports){
/* global aframeCore */
var UI = require('../../lib/vendor/ui.js'); // @todo will be replaced with the npm package
var WidgetsFactory = require('./widgetsfactory.js'); // @todo will be replaced with the npm package

function Attributes (editor) {
  var objectId, objectType, objectCustomRow;
  var componentsList;
  var ignoreComponentsChange = false;
  var commonComponents = ['position', 'rotation', 'scale', 'visible'];

  /**
   * Update the entity component value
   * @param  {Element} entity   Entity to modify
   * @param  {string} component     Name of the component
   * @param  {string} property Property name
   * @param  {string|number} value    New value
   */
  function handleEntityChange (entity, componentName, propertyName, value) {
    if (propertyName) {
      entity.setAttribute(componentName, propertyName, value);
    } else {
      entity.setAttribute(componentName, value);
    }
  }

  /**
   * Generates a container with the common attributes and components for each entity:
   *   - type
   *   - ID
   *   - position
   *   - rotation
   *   - scale
   *   - visible
   * @return {UI.CollapsiblePanel} Panel containing all the widgets
   */
  function generateCommonComponentsPanel () {
    var container = new UI.CollapsiblePanel();

    container.addStatic(new UI.Text('Common attributes').setTextTransform('uppercase'));
    container.add(new UI.Break());

    // type
    var objectTypeRow = new UI.Row();
    objectType = new UI.Text();

    objectTypeRow.add(new UI.Text('Type').setWidth('90px'));
    objectTypeRow.add(objectType);

    container.add(objectTypeRow);

    // ID
    var objectIdRow = new UI.Row();
    objectId = new UI.Input().setWidth('150px').setFontSize('12px').onChange(function () {
      handleEntityChange(editor.selected.el, 'id', null, objectId.getValue());
      editor.signals.sceneGraphChanged.dispatch();
    });

    objectIdRow.add(new UI.Text('ID').setWidth('90px'));
    objectIdRow.add(objectId);
    container.add(objectIdRow);

    // Add the parameter rows for the common components
    for (var i = 0; i < commonComponents.length; i++) {
      container.add(getPropertyRow(commonComponents[i], null, aframeCore.components[commonComponents[i]].schema));
    }

    return container;
  }

  /**
   * Add component to the entity
   * @param {Element} entity        Entity
   * @param {string} componentName Component name
   */
  function addComponentToEntity (entity, componentName) {
    entity.setAttribute(componentName, '');
    generateComponentsPanels(entity);
    updateUI(entity);
  }

  /**
   * Generate a row including a combobox with the available components to add to
   * the current entity
   */
  function generateAddComponentRow () {
    var componentsRow = new UI.Row();
    var componentsOptions = {};
    for (var name in aframeCore.components) {
      if (commonComponents.indexOf(name) === -1) {
        componentsOptions[name] = name;
      }
    }

    componentsList = new UI.Select().setId('componentlist').setOptions(componentsOptions).setWidth('150px');
    componentsRow.add(new UI.Text('Add').setWidth('90px'));
    componentsRow.add(componentsList);
    var button = new UI.Button('+').onClick(function () {
      // Add the selected component from the combobox to the current active entity
      addComponentToEntity(editor.selected.el, componentsList.getValue());
    });
    componentsRow.add(button.setWidth('20px'));
    return componentsRow;
  }

  /**
   * Update the UI widgets based on the current entity & components values
   * @param  {Element} entity Entity currently selected
   */
  function updateUI (entity) {
    if (ignoreComponentsChange) {
      return;
    }

    objectType.setValue(entity.tagName);
    objectId.setValue(entity.id);

    // Disable the components already used form the list of available
    // components to add to this entity
    var availableComponents = componentsList.dom.querySelectorAll('option');
    for (var i = 0; i < availableComponents.length; i++) {
      availableComponents[i].disabled = entity.getAttribute(availableComponents[i].value);
    }

    // Set the common properties & components to default as they're not recreated
    // as the entity changed
    for (i = 0; i < commonComponents.length; i++) {
      var componentName = commonComponents[i];
      var component = aframeCore.components[componentName];
      if (component.schema.hasOwnProperty('default')) {
        WidgetsFactory.updateWidgetValue(componentName, component.schema.default);
      } else {
        for (var propertyName in component.schema) {
          WidgetsFactory.updateWidgetValue(componentName + '.' + propertyName, component.schema[propertyName].default);
        }
      }
    }

    var entityComponents = Array.prototype.slice.call(entity.attributes);
    entityComponents.forEach(function (component) {
      var properties = entity.getAttribute(component.name);
      if (typeof properties !== 'object') {
        WidgetsFactory.updateWidgetValue(component.name, properties);
      } else {
        for (var property in properties) {
          var id = component.name + '.' + property;
          WidgetsFactory.updateWidgetValue(id, properties[property]);
        }
      }
    });

    WidgetsFactory.updateWidgetVisibility(entity);
  }

  /**
   * Reset to default (clear) one entity's component
   * @param {Element} entity        Entity
   * @param {string} componentName Component name to clear
   */
  function setEmptyComponent (entity, componentName) {
    entity.setAttribute(componentName, '');
    generateComponentsPanels(entity);
    updateUI(entity);
    editor.signals.objectChanged.dispatch(entity.object3D);
  }

  /**
   * Generates a row containing the parameter label and its widget
   * @param {string} componentName   Component name
   * @param {string} propertyName   Property name
   * @param {object} propertySchema Property schema
   */
  function getPropertyRow (componentName, propertyName, propertySchema) {
    var propertyRow = new UI.Row();
    var panelName = propertyName || componentName;
    var label = new UI.Text(panelName);
    propertyRow.add(label);

    // If there's no propertyName it's considered a compound attribute.
    // eg: Position, Rotation & Scale are considered a compound attribute of type 'vector3'
    //    schema: {
    //        x: { default: 0 },
    //        y: { default: 0 },
    //        z: { default: 0 }
    //    }
    //
    // We should check also if the schema has a 'default' key in that case we're dealing
    // with a single property components like 'visible':
    //    schema: { default: true },
    if (!propertyName && !propertySchema.hasOwnProperty('default')) {
      // It's a compoundComponent like Position, Rotation or Scale
      label.setWidth('90px');
      var propertyWidgetSize = 150 / Object.keys(propertySchema).length;
      for (propertyName in propertySchema) {
        var propertyWidget = WidgetsFactory.getWidgetFromProperty(componentName, null, propertyName, updateEntityValue, propertySchema[propertyName]);
        propertyWidget.setWidth(propertyWidgetSize + 'px');
        propertyWidget.propertyRow = propertyRow;
        propertyRow.add(propertyWidget);
      }
    } else {
      label.setWidth('120px');
      var newWidget = WidgetsFactory.getWidgetFromProperty(componentName, null, propertyName, updateEntityValue, propertySchema);
      newWidget.propertyRow = propertyRow;
      propertyRow.add(newWidget);
    }

    return propertyRow;
  }

  /**
   * Generate an UI.CollapsiblePanel for each entity's component
   * @param  {Element} entity Current selected entity
   */
  function generateComponentsPanels (entity) {
    objectCustomRow.clear();

    for (var componentName in entity.components) {
      // Ignore the components that we've already included on the common attributes panel
      if (commonComponents.indexOf(componentName) !== -1) {
        continue;
      }

      var component = entity.components[componentName];

      // Add a context menu to delete or reset the component
      var objectActions = new UI.Select()
        .setId(componentName)
        .setPosition('absolute')
        .setRight('8px')
        .setFontSize('11px')
        .setOptions({
          'Actions': 'Actions',
          'Delete': 'Delete',
          'Clear': 'Clear'
        })
        .onClick(function (event) {
          event.stopPropagation(); // Avoid panel collapsing
        })
        .onChange(function (event, component) {
          var action = this.getValue();
          switch (action) {
            case 'Delete':
              entity.removeAttribute(this.getId());
              break;

            case 'Clear':
              setEmptyComponent(entity, this.getId());
              break;

            default:
              return;
          }
          this.setValue('Actions');
          generateComponentsPanels(entity);
          updateUI(entity);
          editor.signals.objectChanged.dispatch(entity.object3D);
        });

      // Collapsible panel with component name as title
      var container = new UI.CollapsiblePanel();
      container.addStatic(new UI.Text(componentName).setTextTransform('uppercase'), objectActions);
      container.add(new UI.Break());

      // Add a widget's row for each parameter on the component
      for (var propertyName in component.schema) {
        container.add(getPropertyRow(componentName, propertyName, component.schema[propertyName]));
      }

      container.add(new UI.Break());
      objectCustomRow.add(container);
    }
  }

  /**
   * Callback when a widget value is updated so we could update the entity attributes
   * @param  {EventTarget} event         Event generated by the onChange listener
   * @param  {string} componentName Component name being modified (eg: 'geometry')
   * @param  {string} attributeName Attribute name being modified (eg: 'primitive')
   * @param  {string} property      Property name, if any, being modified (eg: 'x')
   */
  function updateEntityValue (event, componentName, attributeName, property) {
    ignoreComponentsChange = true;
    var entity = editor.selected.el;

    var id = attributeName ? componentName + '.' + attributeName + '.' + property : property ? (componentName + '.' + property) : componentName;
    var widget = WidgetsFactory.widgets[id];

    handleEntityChange(entity, componentName, property, widget.getValue());

    WidgetsFactory.updateWidgetVisibility(entity);

    editor.signals.objectChanged.dispatch(entity.object3D);
    ignoreComponentsChange = false;
  }

  // Generate main attributes panel
  var container = new UI.Panel();
  container.setBorderTop('0');
  container.setPaddingTop('20px');
  container.setDisplay('none');

  // Add common attributes panel (type, id, position, rotation, scale, visible)
  container.add(generateCommonComponentsPanel());

  // Append the components list that the user can add to the selected entity
  container.add(generateAddComponentRow());

  // Empty row used to append the panels from each component
  objectCustomRow = new UI.Row();
  container.add(objectCustomRow);

  // Signal dispatchers
  editor.signals.entitySelected.add(function (entity) {
    if (entity) {
      container.show();
      generateComponentsPanels(entity);
      updateUI(entity);
    } else {
      container.hide();
    }
  });
  editor.signals.componentChanged.add(function (evt) {
    var entity = evt.detail.target;
    updateUI(entity);
    editor.signals.objectChanged.dispatch(entity.object3D);
  });

  return container;
}

module.exports = Attributes;

},{"../../lib/vendor/ui.js":1,"./widgetsfactory.js":17}],9:[function(require,module,exports){
var css = "#sidebar{top:0}.Outliner{height:300px}"; (require("browserify-css").createStyle(css, { "href": "src/panels/css/custom.css"})); module.exports = css;
},{"browserify-css":2}],10:[function(require,module,exports){
var css = ".Outliner{color:#444;background:#fff;padding:0;width:100%;height:140px;font-size:12px;cursor:default;overflow:auto;outline:0}.Outliner .option{padding:4px;color:#666;white-space:nowrap}.Outliner .option.active{background-color:#f8f8f8}input.Number{color:#0080f0!important;font-size:12px;border:0;padding:2px;cursor:col-resize}#viewport{position:absolute;top:32px;left:0;right:300px;bottom:32px}#viewport #info{text-shadow:1px 1px 0 rgba(0,0,0,.25);pointer-events:none}#script{position:absolute;top:32px;left:0;right:300px;bottom:32px;opacity:.9}#player{position:absolute;top:32px;left:0;right:300px;bottom:32px}#menubar{position:absolute;width:100%;height:32px;background:#eee;padding:0;margin:0;right:0;top:0}#menubar .menu{float:left;cursor:pointer;padding-right:8px}#menubar .menu.right{float:right;cursor:auto;padding-right:0;text-align:right}#menubar .menu .title{display:inline-block;color:#888;margin:0;padding:8px}#menubar .menu .options{position:absolute;display:none;padding:5px 0;background:#eee;width:150px}#menubar .menu:hover .options{display:block}#menubar .menu .options hr{border-color:#ddd}#menubar .menu .options .option{color:#666;background-color:transparent;padding:5px 10px;margin:0!important}#menubar .menu .options .option:hover{color:#fff;background-color:#08f}#menubar .menu .options .option:active{color:#666;background:0 0}#menubar .menu .options .inactive{color:#bbb;background-color:transparent;padding:5px 10px;margin:0!important}#sidebar{position:absolute;right:0;top:32px;bottom:0;width:300px;background:#eee;overflow:auto}#sidebar *{vertical-align:middle}#sidebar input,#sidebar select,#sidebar textarea{border:1px solid transparent;color:#444}#sidebar .Panel{color:#888;padding:10px;border-top:1px solid #ccc}#sidebar .Panel.collapsed{margin-bottom:0}#sidebar .Row{min-height:20px;margin-bottom:10px}#tabs{background-color:#ddd;border-top:1px solid #ccc}#tabs span{color:#aaa;border-right:1px solid #ccc;padding:10px}#tabs span.selected{color:#888;background-color:#eee}#toolbar{position:absolute;left:0;right:300px;bottom:0;height:32px;background:#eee;color:#333}#toolbar *{vertical-align:middle}#toolbar .Panel{padding:4px;color:#888}#toolbar button{margin-right:6px}"; (require("browserify-css").createStyle(css, { "href": "src/panels/css/light.css"})); module.exports = css;
},{"browserify-css":2}],11:[function(require,module,exports){
var css = "body{font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;overflow:hidden}hr{border:0;border-top:1px solid #ccc}button{position:relative}textarea{tab-size:4;white-space:pre;word-wrap:normal}textarea.success{border-color:#8b8!important}textarea.fail{border-color:red!important;background-color:rgba(255,0,0,.05)}input,textarea{outline:0}.Panel{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.Panel.Collapsible .Static{margin:0}.Panel.Collapsible .Static .Button{float:left;margin-right:6px;width:0;height:0;border:6px solid transparent}.Panel.Collapsible.collapsed .Static .Button{margin-top:2px;border-left-color:#bbb}.Panel.Collapsible:not(.collapsed) .Static .Button{margin-top:6px;border-top-color:#bbb}.Panel.Collapsible.collapsed .Content{display:none}.CodeMirror{position:absolute!important;top:37px;width:100%!important;height:calc(100% - 37px)!important}.CodeMirror .errorLine{background:rgba(255,0,0,.25)}.CodeMirror .esprima-error{color:red;text-align:right;padding:0 20px}.type{position:relative;top:-2px;padding:0 2px;color:#ddd}.type:after{content:'■'}.Scene{color:#ccf}.Object3D{color:#aae}.Mesh{color:#88e}.Line,.LineSegments{color:#8e8}.Points{color:#e88}.PointLight{color:#dd0}.Geometry{color:#8f8}.BoxGeometry{color:#beb}.TorusGeometry{color:#aea}.Material{color:#f88}.MeshPhongMaterial{color:#fa8}"; (require("browserify-css").createStyle(css, { "href": "src/panels/css/main.css"})); module.exports = css;
},{"browserify-css":2}],12:[function(require,module,exports){
var css = ".editor-tools{position:absolute;bottom:0;background:rgba(255,255,255,.8)}.editor-tools button{float:left}"; (require("browserify-css").createStyle(css, { "href": "src/panels/css/toolbar.css"})); module.exports = css;
},{"browserify-css":2}],13:[function(require,module,exports){
require('./css/main.css');
require('./css/light.css');
require('./css/custom.css');
require('./css/toolbar.css');

var ToolPanel = require('./tools');
var Sidebar = require('./sidebar.js');

function Panels (editor) {
  this.toolPanel = new ToolPanel();
  document.body.appendChild(this.toolPanel.el);

  this.sidebar = new Sidebar(editor);
  this.sidebar.hide();
  document.body.appendChild(this.sidebar.dom);
}

module.exports = Panels;

},{"./css/custom.css":9,"./css/light.css":10,"./css/main.css":11,"./css/toolbar.css":12,"./sidebar.js":15,"./tools":16}],14:[function(require,module,exports){
/* global aframeEditor */
var UI = require('../../lib/vendor/ui.js'); // @todo will be replaced with the npm package

function SceneGraph (editor) {
  // Megahack to include font-awesome
  // -------------
  var link = document.createElement('link');
  link.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.media = 'screen,print';
  document.getElementsByTagName('head')[0].appendChild(link);
  // ------------

  this.scene = document.querySelector('a-scene');

  var signals = editor.signals;

  var container = new UI.Panel();

  var ignoreObjectSelectedSignal = false;

  var outliner = this.outliner = new UI.Outliner(editor);

  // handle entity selection change in panel
  outliner.onChange(function (e) {
    ignoreObjectSelectedSignal = true;
    aframeEditor.editor.signals.entitySelected.dispatch(outliner.getValue());
    ignoreObjectSelectedSignal = false;
  });

  // handle enttiy change selection from scene.
  signals.objectSelected.add(function (object) {
    // ignore automated selection of object in scene triggered from outliner.
    if (ignoreObjectSelectedSignal === true) { return; }
    // set outliner to current selected object
    outliner.setValue(object !== null ? object.el : null);
  });

  signals.sceneGraphChanged.add(this.refresh);

  container.add(outliner);

  container.add(new UI.Break());

  this.refresh();

  return container;
}

SceneGraph.prototype.refresh = function () {
  var options = [];

  options.push({ static: true, value: this.scene, html: '<span class="type"></span> a-scene' });

  function treeIterate (element, depth) {
    if (depth === undefined) {
      depth = 1;
    } else {
      depth += 1;
    }

    var children = element.children;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      // filter out all entities added by editor
      if (!child.dataset.isEditor) {
        var extra = '';

        var icons = {'camera': 'fa-video-camera', 'light': 'fa-lightbulb-o', 'geometry': 'fa-cube', 'material': 'fa-picture-o'};
        for (var icon in icons) {
          if (child.components[icon]) {
            extra += ' <i class="fa ' + icons[icon] + '"></i>';
          }
        }

        var type = '<span class="type Mesh"></span>';
        var pad = '&nbsp;&nbsp;&nbsp;'.repeat(depth);
        var label = child.id ? child.id : 'a-entity';

        options.push({
          static: true,
          value: child,
          html: pad + type + label + extra
        });
      }
      treeIterate(child, depth);
    }
  }
  treeIterate(this.scene);

  this.outliner.setOptions(options);
};

module.exports = SceneGraph;

},{"../../lib/vendor/ui.js":1}],15:[function(require,module,exports){
var UI = require('../../lib/vendor/ui.js'); // @todo will be replaced with the npm package
var SceneGraph = require('./scenegraph');
var Attributes = require('./attributes');

function Sidebar (editor) {
  var container = new UI.Panel();
  container.setId('sidebar');

  this.sceneGraph = new SceneGraph(editor);
  this.attributes = new Attributes(editor);

  var scene = new UI.Span().add(
    this.sceneGraph,
    this.attributes
  );

  container.add(scene);

  return container;
}

module.exports = Sidebar;

},{"../../lib/vendor/ui.js":1,"./attributes":8,"./scenegraph":14}],16:[function(require,module,exports){
/* global aframeEditor */

function Panel () {
  this.el = document.createElement('div');
  this.el.classList.add('editor-tools');
  this.tools = aframeEditor.editor.tools;
  this.active = false;
  this.editToggle();
  this.makeTools();
  this.showTools(this.active);
}

Panel.prototype.editToggle = function () {
  this.toggleButton = document.createElement('button');
  this.toggleButton.innerHTML = 'Edit';
  this.el.appendChild(this.toggleButton);
  this.toggleButton.addEventListener('click', this.onToggleClick.bind(this));
};

Panel.prototype.makeTools = function () {
  var tools = this.tools;
  for (var tool in tools) {
    var button = document.createElement('button');
    button.id = tool;
    button.className = 'editor-tools--tool';
    button.innerHTML = tool;
    button.addEventListener('click', this.onToolClick.bind(this));
    this.el.appendChild(button);
  }
};

Panel.prototype.showTools = function (display) {
  var elements = this.el.querySelectorAll('.editor-tools--tool');
  var toolEls = Array.prototype.slice.call(elements);
  toolEls.forEach(function (el) {
    el.style.display = display ? 'block' : 'none';
  });
};

Panel.prototype.selectTool = function () {
  var first;
  for (first in this.tools) break;
  this.selectedTool = this.tools[first];
  this.selectedTool.start();
};

Panel.prototype.endCurrentTool = function () {
  if (this.selectedTool) {
    this.selectedTool.end();
  }
};

Panel.prototype.onToolClick = function (e) {
  this.endCurrentTool();
  this.selectedTool = this.tools[e.target.id];
  this.selectedTool.start();
};

Panel.prototype.onToggleClick = function (e) {
  this.active = this.active === false;

  if (this.active) {
    this.toggleButton.innerHTML = 'Exit';
    this.selectTool();
    this.showTools(true);
    aframeEditor.editor.helpers.show();
  } else {
    this.toggleButton.innerHTML = 'Edit';
    this.endCurrentTool();
    this.showTools(false);
    aframeEditor.editor.helpers.hide();
  }
};

module.exports = Panel;

},{}],17:[function(require,module,exports){
/* global aframeCore */
var UI = require('../../lib/vendor/ui.js'); // @todo will be replaced with the npm package

module.exports = {
  widgets: {},

  /**
   * [updateWidgetValue description]
   * @param  {[type]} id    [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  updateWidgetValue: function (id, value) {
    if (this.widgets[id]) {
      this.widgets[id].setValue(value);
      return true;
    }
    return false;
  },

  /**
   * Given an propertySchema it will returns the infered by the default value in case
   * that 'type' attribute is not defined
   * @param  {object} propertySchema JSON schema for the attribute
   * @return {string}                 Property type
   */
  getPropertyType: function (propertySchema) {
    var defaultValue = propertySchema.default;
    if (propertySchema.oneOf) {
      return 'select';
    } else {
      switch (typeof defaultValue) {
        case 'boolean':
          return 'checkbox';
        case 'number':
          return 'number';
        case 'object':
          return 'vector3';
        case 'string':
          return (defaultValue.indexOf('#') === -1) ? 'input' : 'color';
        default:
          console.warn('Unknown attribute', propertySchema);
          return null;
      }
    }
  },

  /**
   * Creates and returns a widget based on the type of the attribute
   * If a schema is provided it's used to set min/max values or populate the combobox values.
   * @param {string} componentName   Name of the component that has this attribute (e.g: 'geometry')
   * @param {string} propertyName   Property name in the component (e.g: 'primitive')
   * @param {string} property        Property name in case of multivalues attributes (e.g: 'x')
   * @param {string} type            Type of the widget to generate (e.g: 'checkbox')
   * @param {JSON} propertySchema [Optional] JSON with the schema definition of the attribute.
   * @return {UI.Widget} Returns an UI.js widget based on the type and schema of the attribute.
   */
  getWidgetFromProperty: function (componentName, propertyName, property, onUpdateEntityValue, propertySchema) {
    var widget = null;
    if (typeof propertySchema === 'undefined') {
      propertySchema = {};
    } else if (typeof propertySchema !== 'object') {
      console.error(componentName, propertyName, property, propertySchema);
    }

    var type = this.getPropertyType(propertySchema);

    switch (type) {
      case 'select':
        var options = {};
        // Convert array to object
        for (var key in propertySchema.oneOf) {
          options[propertySchema.oneOf[key]] = propertySchema.oneOf[key];
        }
        widget = new UI.Select().setOptions(options);
        break;
      case 'checkbox':
        widget = new UI.Checkbox().setWidth('50px');
        break;
      case 'number':
        widget = new UI.Number().setWidth('50px');
        break;
      case 'input':
        widget = new UI.Input('').setWidth('50px');
        break;
      case 'color':
        widget = new UI.Color().setWidth('50px');
        break;
      case 'vector3':
        widget = new UI.Vector3().setWidth('150px');
        break;
      default:
        console.warn('Unknown component type', componentName, propertyName, property, type);
        widget = new UI.Input('');
    }
    if (propertySchema.hasOwnProperty('min')) {
      widget.min = propertySchema.min;
    }
    if (propertySchema.hasOwnProperty('max')) {
      widget.max = propertySchema.max;
    }
    widget.schema = propertySchema;
    widget.onChange(function (event) {
      onUpdateEntityValue(event, componentName, propertyName, property);
    });

    // Generate an unique ID for this attribute (e.g: geometry.primitive)
    // and save it on the widgets variable so we could easily access to it in the following functions
    var id = propertyName ? componentName + '.' + propertyName + '.' + property : property ? (componentName + '.' + property) : componentName;
    widget.setId(id);
    widget.setValue(propertySchema.default);

    this.widgets[id] = widget;
    return widget;
  },

  /**
   * Update the widgets visibility based on the 'if' attribute from theirs attribute' schema
   * @param  {Element} entity Entity currently selected
   */
  updateWidgetVisibility: function (entity) {
    for (var componentName in entity.components) {
      var properties = aframeCore.components[componentName].schema;
      for (var property in properties) {
        var id = componentName + '.' + property;
        var widget = this.widgets[id];
        if (widget && widget.propertyRow) {
          var visible = true;
          if (widget.schema.if) {
            for (var condition in widget.schema.if) {
              var ifWidget = this.widgets[componentName + '.' + condition];
              if (widget.schema.if[condition].indexOf(ifWidget.getValue()) === -1) {
                visible = false;
              }
            }
          }
          if (visible) {
            widget.propertyRow.show();
          } else {
            widget.propertyRow.hide();
          }
        }
      }
    }
  }

};

},{"../../lib/vendor/ui.js":1}],18:[function(require,module,exports){
module.exports = {
  mouse: require('./mouse'),
  inspector: require('./inspector'),
  modify: require('./modify'),
  place: require('./place')
};

},{"./inspector":19,"./modify":20,"./mouse":21,"./place":22}],19:[function(require,module,exports){
/* global aframeEditor */
/*
Inspector tool
*/
module.exports = {
  name: 'Inspect',

  start: function () {
    this.scene = document.querySelector('a-scene');
    this.camera = this.scene.cameraEl;

    this.sidebar = aframeEditor.editor.panels.sidebar;
    this.sidebar.show();

    this.setupCursor();
    this.addListeners();
  },

  end: function () {
    this.sidebar.hide();
    this.removeListeners();
    this.removeCursor();
  },

  addListeners: function () {
    this.onContextmenu = this.pick.bind(this);
    this.onIntersection = this.handleIntersection.bind(this);
    this.onIntersectionClear = this.handleIntersectionClear.bind(this);
    this.onEntityChange = this.handleEntityChange.bind(this);

    this.scene.canvas.addEventListener('contextmenu', this.onContextmenu);
    this.cursor.addEventListener('intersection', this.onIntersection);
    this.cursor.addEventListener('intersectioncleared', this.onIntersectionClear);
  },

  removeListeners: function () {
    this.scene.canvas.removeEventListener('contextmenu', this.onContextmenu);
    this.cursor.removeEventListener('intersection', this.onIntersection);
    this.cursor.removeEventListener('intersectioncleared', this.onIntersectionClear);
  },

  setupCursor: function () {
    this.cursor = document.createElement('a-entity');
    this.cursor.dataset.isEditor = true;
    this.cursor.setAttribute('position', '0 0 -10');
    this.cursor.setAttribute('geometry', 'primitive: ring; radiusOuter: 0.3; radiusInner: 0.2');
    this.cursor.setAttribute('material', 'color: yellow; receiveLight: false;');
    this.cursor.setAttribute('cursor', 'maxDistance: 30');
    this.camera.appendChild(this.cursor);
  },

  removeCursor: function () {
    this.cursor.parentNode.removeChild(this.cursor);
    this.cursor = null;
  },

  handleIntersection: function (e) {
    this.currentIntersection = e.detail;
  },

  handleIntersectionClear: function (e) {
    this.currentIntersection = null;
  },

  handleEntityChange: function (name, property, value) {
    var entity = this.selectedEntity;

    if (property) {
      // multiple attribute properties
      var properties = entity.getAttribute(name);
      properties[property] = value;
      entity.setAttribute(name, properties);
    } else {
      // single attribute value
      entity.setAttribute(name, value);
    }

    this.sidebar.update();
  },

  pick: function (e) {
    e.preventDefault();
    if (!this.currentIntersection) {
      this.selectedEntity = null;
      aframeEditor.editor.signals.entitySelected.dispatch(null);
      return;
    }

    var entity = this.currentIntersection.el;
    aframeEditor.editor.signals.entitySelected.dispatch(entity);
  }
};

},{}],20:[function(require,module,exports){
/* global THREE */
/*
Modify entity tool
*/
module.exports = {
  name: 'Modify',

  start: function () {
    this.scene = document.querySelector('a-scene');
    this.camera = this.scene.cameraEl;

    this.setupCursor();
    this.addListeners();
  },

  end: function () {
    if (this.selectedEntity) {
      this.drop();
    }
    this.removeListeners();
    this.removeCursor();
  },

  addListeners: function () {
    this.onContextmenu = this.use.bind(this);
    this.onIntersection = this.handleIntersection.bind(this);
    this.onIntersectionClear = this.handleIntersectionClear.bind(this);
    this.onMousewheel = this.handleMousewheel.bind(this);

    this.scene.canvas.addEventListener('contextmenu', this.onContextmenu);
    this.cursor.addEventListener('intersection', this.onIntersection);
    this.cursor.addEventListener('intersectioncleared', this.onIntersectionClear);
    window.addEventListener('wheel', this.onMousewheel);
  },

  removeListeners: function () {
    this.scene.canvas.removeEventListener('contextmenu', this.onContextmenu);
    this.cursor.removeEventListener('intersection', this.onIntersection);
    this.cursor.removeEventListener('intersectioncleared', this.onIntersectionClear);
  },

  setupCursor: function () {
    this.cursor = document.createElement('a-entity');
    this.cursor.setAttribute('id', 'editor-select-cursor');
    this.cursor.setAttribute('position', '0 0 -10');
    this.cursor.setAttribute('cursor', 'maxDistance: 30');
    this.cursor.setAttribute('geometry', 'primitive: ring; radiusOuter: 0.3; radiusInner: 0.2');
    this.cursor.setAttribute('material', 'color: red; receiveLight: false;');
    this.camera.appendChild(this.cursor);
  },

  removeCursor: function () {
    this.cursor.parentNode.removeChild(this.cursor);
    this.cursor = null;
  },

  handleMousewheel: function (e) {
    var entity = this.selectedEntity;

    if (!entity) { return; }

    var parent = entity.parentNode;
    if (parent.hasAttribute('camera')) {
      var position = entity.getAttribute('position');
      position.z += e.deltaY;
      entity.setAttribute('position', position);
    }
  },

  handleIntersection: function (e) {
    this.currentIntersection = e.detail;
  },

  handleIntersectionClear: function (e) {
    this.currentIntersection = null;
  },

  pick: function () {
    if (!this.currentIntersection) { return; }

    var entity = this.currentIntersection.el;
    var distance = this.currentIntersection.distance;
    var clone = entity.cloneNode();

    clone.setAttribute('position', {x: 0, y: 0, z: -distance});
    this.camera.appendChild(clone);
    entity.parentNode.removeChild(entity);

    this.selectedEntity = clone;
  },

  drop: function () {
    if (!this.selectedEntity) { return; }

    var object3D = this.selectedEntity.object3D;
    object3D.updateMatrixWorld();

    // set objects to world rotation.
    var euler = new THREE.Euler();
    euler.setFromRotationMatrix(object3D.matrixWorld);

    var rotation = {
      x: 0,
      y: euler.y * (180 / Math.PI),
      z: 0
    };

    // position
    var position = new THREE.Vector3();
    position.setFromMatrixPosition(object3D.matrixWorld);

    var clone = this.selectedEntity.cloneNode();
    clone.setAttribute('rotation', rotation);
    clone.setAttribute('position', position);

    this.scene.appendChild(clone);

    this.selectedEntity.parentNode.removeChild(this.selectedEntity);

    this.selectedEntity = null;
  },

  use: function (e) {
    e.preventDefault();
    if (!this.selectedEntity) {
      this.pick();
    } else {
      this.drop();
    }
  }
};

},{}],21:[function(require,module,exports){
/* global aframeEditor */
/*
Inspector tool
*/
module.exports = {
  name: 'Mouse',

  start: function () {
    this.scene = document.querySelector('a-scene');
    this.camera = this.scene.cameraEl;

    this.sidebar = aframeEditor.editor.panels.sidebar;
    this.sidebar.show();

    this.setupCursor();
    this.addListeners();
  },

  end: function () {
    this.sidebar.hide();
    this.removeListeners();
    this.removeCursor();
  },

  addListeners: function () {
    this.onContextmenu = this.pick.bind(this);
    this.onIntersection = this.handleIntersection.bind(this);
    this.onIntersectionClear = this.handleIntersectionClear.bind(this);
    this.onEntityChange = this.handleEntityChange.bind(this);

    this.scene.canvas.addEventListener('contextmenu', this.onContextmenu);
    this.cursor.addEventListener('intersection', this.onIntersection);
    this.cursor.addEventListener('intersectioncleared', this.onIntersectionClear);
  },

  removeListeners: function () {
    this.scene.canvas.removeEventListener('contextmenu', this.onContextmenu);
    this.cursor.removeEventListener('intersection', this.onIntersection);
    this.cursor.removeEventListener('intersectioncleared', this.onIntersectionClear);
  },

  setupCursor: function () {
    this.cursor = document.createElement('a-entity');
    this.cursor.dataset.isEditor = true;
    this.cursor.setAttribute('position', '0 0 -10');
    this.cursor.setAttribute('geometry', 'primitive: ring; radiusOuter: 0.3; radiusInner: 0.2');
    this.cursor.setAttribute('material', 'color: yellow; receiveLight: false;');
    this.cursor.setAttribute('cursor', 'maxDistance: 30');
    this.camera.appendChild(this.cursor);
  },

  removeCursor: function () {
    this.cursor.parentNode.removeChild(this.cursor);
    this.cursor = null;
  },

  handleIntersection: function (e) {
    this.currentIntersection = e.detail;
  },

  handleIntersectionClear: function (e) {
    this.currentIntersection = null;
  },

  handleEntityChange: function (name, property, value) {
    var entity = this.selectedEntity;

    if (property) {
      // multiple attribute properties
      var properties = entity.getAttribute(name);
      properties[property] = value;
      entity.setAttribute(name, properties);
    } else {
      // single attribute value
      entity.setAttribute(name, value);
    }

    this.sidebar.update();
  },

  pick: function (e) {
    e.preventDefault();
    if (!this.currentIntersection) {
      this.selectedEntity = null;
      aframeEditor.editor.signals.entitySelected.dispatch(null);
      return;
    }

    var entity = this.currentIntersection.el;
    aframeEditor.editor.signals.entitySelected.dispatch(entity);
  }
};

},{}],22:[function(require,module,exports){
/* global THREE, aframeEditor */

var colours = ['#DA6369', '#4191A6', '#5AA89A', '#5AA89A', '#F39C85'];

var primitives = [
  {
    name: 'box',
    defaults: {
      geometry: 'primitive: box; width: 2; height: 2; depth: 2',
      material: 'color: ' + colours[0]
    }
  },
  {
    name: 'sphere',
    defaults: {
      geometry: 'primitive: sphere; radius: 1',
      material: 'color: ' + colours[1]
    }
  },
  {
    name: 'torus',
    defaults: {
      geometry: 'primitive: torus; radius: 1.6; tube: .5; segments: 32; tubularSegments: 10',
      material: 'color: ' + colours[2]
    }
  }
];

/*
Place new entity tool
*/
module.exports = {
  name: 'Place',

  start: function () {
    this.scene = document.querySelector('a-scene');
    this.camera = this.scene.cameraEl;

    this.setupCursor();
    this.addListeners();
  },

  end: function () {
    if (this.selectedEntity) {
      this.drop();
    }
    this.removeListeners();
    this.removeCursor();
  },

  addListeners: function () {
    this.onContextmenu = this.use.bind(this);
    this.onKeypress = this.handleKeypress.bind(this);
    this.scene.canvas.addEventListener('contextmenu', this.onContextmenu);
    window.addEventListener('keypress', this.onKeypress);
  },

  removeListeners: function () {
    this.scene.canvas.removeEventListener('contextmenu', this.onContextmenu);
  },

  setupCursor: function () {
    this.cursor = document.createElement('a-entity');
    this.cursor.setAttribute('id', 'editor-place-cursor');
    this.cursor.setAttribute('position', '0 0 -10');
    this.cursor.setAttribute('cursor', 'maxDistance: 30');
    this.cursor.setAttribute('geometry', 'primitive: sphere; radius: 0.3');
    this.cursor.setAttribute('material', 'color: green; receiveLight: false;');
    this.camera.appendChild(this.cursor);
  },

  removeCursor: function () {
    this.cursor.parentNode.removeChild(this.cursor);
    this.cursor = null;
  },

  handleKeypress: function (e) {
    switch (e.charCode) {
      case 91: // [
        this.prev();
        break;
      case 93: // ]
        this.next();
        break;
    }
  },

  prev: function () {
    if (!this.selectedEntity) { return; }

    this.index -= 1;
    if (this.index < 0) {
      this.index = primitives.length - 1;
    }

    this.clear();
    this.new(this.index);
  },

  next: function () {
    if (!this.selectedEntity) { return; }

    this.index += 1;
    if (this.index > primitives.length - 1) {
      this.index = 0;
    }
    this.clear();
    this.new(this.index);
  },

  clear: function () {
    if (this.selectedEntity) {
      this.selectedEntity.parentNode.removeChild(this.selectedEntity);
      this.selectedEntity = null;
    }
  },

  new: function (i) {
    if (!i) {
      i = this.index ? this.index : 0;
    }

    var primitive = primitives[i];

    // todo: use templates here.
    var entity = document.createElement('a-entity');

    // load default attributes
    for (var attr in primitive.defaults) {
      entity.setAttribute(attr, primitive.defaults[attr]);
    }

    entity.setAttribute('rotation', '0 0 0');
    entity.setAttribute('position', '0 0 -10');

    this.selectedEntity = entity;

    this.camera.appendChild(entity);

    this.index = i;
  },

  drop: function () {
    if (!this.selectedEntity) { return; }
    var object3D = this.selectedEntity.object3D;
    object3D.updateMatrixWorld();

    // set objects to world rotation.
    var euler = new THREE.Euler();
    euler.setFromRotationMatrix(object3D.matrixWorld);

    var rotation = {
      x: 0,
      y: euler.y * (180 / Math.PI),
      z: 0
    };

    // position
    var position = new THREE.Vector3();
    position.setFromMatrixPosition(object3D.matrixWorld);

    var clone = this.selectedEntity.cloneNode();
    clone.setAttribute('rotation', rotation);
    clone.setAttribute('position', position);

    this.scene.appendChild(clone);

    this.selectedEntity.parentNode.removeChild(this.selectedEntity);

    this.selectedEntity = null;

    aframeEditor.editor.signals.sceneGraphChanged.dispatch();
  },

  use: function (e) {
    e.preventDefault();
    if (!this.selectedEntity) {
      this.new();
    } else {
      this.drop();
    }
  }
};

},{}],23:[function(require,module,exports){
/* global THREE */
function Viewport (editor) {
  var signals = editor.signals;

  var selectionBox = new THREE.BoxHelper();
  selectionBox.material.depthTest = false;
  selectionBox.material.transparent = true;
  selectionBox.visible = false;
  editor.helpers.add(selectionBox);
  signals.objectSelected.add(function (object) {
    selectionBox.visible = false;
    if (!editor.selected || editor.selected.el.helper) {
      return;
    }

    if (object !== null) {
      if (object.geometry !== undefined &&
        object instanceof THREE.Sprite === false) {
        selectionBox.update(object);
        selectionBox.visible = true;
      }
    }
  });

  signals.objectChanged.add(function () {
    if (editor.selected.el.helper) {
      return;
    }
    selectionBox.update(editor.selected);
  });
}

module.exports = Viewport;

},{}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdmVuZG9yL3VpLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktY3NzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvc2lnbmFscy9kaXN0L3NpZ25hbHMuanMiLCJub2RlX21vZHVsZXMvc29ydGFibGVqcy9Tb3J0YWJsZS5qcyIsInNyYy9lZGl0b3IuanMiLCJzcmMvaGVscGVycy5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wYW5lbHMvYXR0cmlidXRlcy5qcyIsInNyYy9wYW5lbHMvY3NzL2N1c3RvbS5jc3MiLCJzcmMvcGFuZWxzL2Nzcy9saWdodC5jc3MiLCJzcmMvcGFuZWxzL2Nzcy9tYWluLmNzcyIsInNyYy9wYW5lbHMvY3NzL3Rvb2xiYXIuY3NzIiwic3JjL3BhbmVscy9pbmRleC5qcyIsInNyYy9wYW5lbHMvc2NlbmVncmFwaC5qcyIsInNyYy9wYW5lbHMvc2lkZWJhci5qcyIsInNyYy9wYW5lbHMvdG9vbHMuanMiLCJzcmMvcGFuZWxzL3dpZGdldHNmYWN0b3J5LmpzIiwic3JjL3Rvb2xzL2luZGV4LmpzIiwic3JjL3Rvb2xzL2luc3BlY3Rvci5qcyIsInNyYy90b29scy9tb2RpZnkuanMiLCJzcmMvdG9vbHMvbW91c2UuanMiLCJzcmMvdG9vbHMvcGxhY2UuanMiLCJzcmMvdmlld3BvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsNENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqdUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVVBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIFNvcnRhYmxlID0gcmVxdWlyZSgnc29ydGFibGVqcycpO1xuXG52YXIgVUkgPSB7fTtcblxuVUkuRWxlbWVudCA9IGZ1bmN0aW9uICggZG9tICkge1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuXG59O1xuXG5VSS5FbGVtZW50LnByb3RvdHlwZSA9IHtcblxuICBhZGQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3VtZW50c1sgaSBdO1xuXG4gICAgICBpZiAoIGFyZ3VtZW50IGluc3RhbmNlb2YgVUkuRWxlbWVudCApIHtcblxuICAgICAgICB0aGlzLmRvbS5hcHBlbmRDaGlsZCggYXJndW1lbnQuZG9tICk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvciggJ1VJLkVsZW1lbnQ6JywgYXJndW1lbnQsICdpcyBub3QgYW4gaW5zdGFuY2Ugb2YgVUkuRWxlbWVudC4nICk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICsrICkge1xuXG4gICAgICB2YXIgYXJndW1lbnQgPSBhcmd1bWVudHNbIGkgXTtcblxuICAgICAgaWYgKCBhcmd1bWVudCBpbnN0YW5jZW9mIFVJLkVsZW1lbnQgKSB7XG5cbiAgICAgICAgdGhpcy5kb20ucmVtb3ZlQ2hpbGQoIGFyZ3VtZW50LmRvbSApO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoICdVSS5FbGVtZW50OicsIGFyZ3VtZW50LCAnaXMgbm90IGFuIGluc3RhbmNlIG9mIFVJLkVsZW1lbnQuJyApO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB3aGlsZSAoIHRoaXMuZG9tLmNoaWxkcmVuLmxlbmd0aCApIHtcblxuICAgICAgdGhpcy5kb20ucmVtb3ZlQ2hpbGQoIHRoaXMuZG9tLmxhc3RDaGlsZCApO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgc2V0SWQ6IGZ1bmN0aW9uICggaWQgKSB7XG5cbiAgICB0aGlzLmRvbS5pZCA9IGlkO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBnZXRJZDogZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuZG9tLmlkO1xuXG4gIH0sXG5cbiAgc2V0Q2xhc3M6IGZ1bmN0aW9uICggbmFtZSApIHtcblxuICAgIHRoaXMuZG9tLmNsYXNzTmFtZSA9IG5hbWU7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIHNldFN0eWxlOiBmdW5jdGlvbiAoIHN0eWxlLCBhcnJheSApIHtcblxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArKyApIHtcblxuICAgICAgdGhpcy5kb20uc3R5bGVbIHN0eWxlIF0gPSBhcnJheVsgaSBdO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBzaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHRoaXMuZG9tLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuICB9LFxuXG4gIGhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgdGhpcy5kb20uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgXG4gIH0sXG5cbiAgc2V0RGlzYWJsZWQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cbiAgICB0aGlzLmRvbS5kaXNhYmxlZCA9IHZhbHVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBzZXRUZXh0Q29udGVudDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuICAgIHRoaXMuZG9tLnRleHRDb250ZW50ID0gdmFsdWU7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbn07XG5cbi8vIHByb3BlcnRpZXNcblxudmFyIHByb3BlcnRpZXMgPSBbICdwb3NpdGlvbicsICdsZWZ0JywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ2JvcmRlcicsICdib3JkZXJMZWZ0Jyxcbidib3JkZXJUb3AnLCAnYm9yZGVyUmlnaHQnLCAnYm9yZGVyQm90dG9tJywgJ2JvcmRlckNvbG9yJywgJ2Rpc3BsYXknLCAnb3ZlcmZsb3cnLCAnbWFyZ2luJywgJ21hcmdpbkxlZnQnLCAnbWFyZ2luVG9wJywgJ21hcmdpblJpZ2h0JywgJ21hcmdpbkJvdHRvbScsICdwYWRkaW5nJywgJ3BhZGRpbmdMZWZ0JywgJ3BhZGRpbmdUb3AnLCAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdCb3R0b20nLCAnY29sb3InLFxuJ2JhY2tncm91bmRDb2xvcicsICdvcGFjaXR5JywgJ2ZvbnRTaXplJywgJ2ZvbnRXZWlnaHQnLCAndGV4dEFsaWduJywgJ3RleHREZWNvcmF0aW9uJywgJ3RleHRUcmFuc2Zvcm0nLCAnY3Vyc29yJywgJ3pJbmRleCcgXTtcblxucHJvcGVydGllcy5mb3JFYWNoKCBmdW5jdGlvbiAoIHByb3BlcnR5ICkge1xuXG4gIHZhciBtZXRob2QgPSAnc2V0JyArIHByb3BlcnR5LnN1YnN0ciggMCwgMSApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zdWJzdHIoIDEsIHByb3BlcnR5Lmxlbmd0aCApO1xuXG4gIFVJLkVsZW1lbnQucHJvdG90eXBlWyBtZXRob2QgXSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuc2V0U3R5bGUoIHByb3BlcnR5LCBhcmd1bWVudHMgKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH07XG5cbn0gKTtcblxuLy8gZXZlbnRzXG5cbnZhciBldmVudHMgPSBbICdLZXlVcCcsICdLZXlEb3duJywgJ01vdXNlT3ZlcicsICdNb3VzZU91dCcsICdDbGljaycsICdEYmxDbGljaycsICdDaGFuZ2UnIF07XG5cbmV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQ7XG5cbiAgVUkuRWxlbWVudC5wcm90b3R5cGVbIG1ldGhvZCBdID0gZnVuY3Rpb24gKCBjYWxsYmFjayApIHtcblxuICAgIHRoaXMuZG9tLmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50LnRvTG93ZXJDYXNlKCksIGNhbGxiYWNrLmJpbmQoIHRoaXMgKSwgZmFsc2UgKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH07XG5cbn0gKTtcblxuLy8gU3BhblxuXG5VSS5TcGFuID0gZnVuY3Rpb24gKCkge1xuXG4gIFVJLkVsZW1lbnQuY2FsbCggdGhpcyApO1xuXG4gIHRoaXMuZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLlNwYW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVUkuRWxlbWVudC5wcm90b3R5cGUgKTtcblVJLlNwYW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuU3BhbjtcblxuLy8gRGl2XG5cblVJLkRpdiA9IGZ1bmN0aW9uICgpIHtcblxuICBVSS5FbGVtZW50LmNhbGwoIHRoaXMgKTtcblxuICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkRpdi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuRGl2LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVJLkRpdjtcblxuLy8gUm93XG5cblVJLlJvdyA9IGZ1bmN0aW9uICgpIHtcblxuICBVSS5FbGVtZW50LmNhbGwoIHRoaXMgKTtcblxuICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcbiAgZG9tLmNsYXNzTmFtZSA9ICdSb3cnO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5Sb3cucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVUkuRWxlbWVudC5wcm90b3R5cGUgKTtcblVJLlJvdy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVSS5Sb3c7XG5cbi8vIFBhbmVsXG5cblVJLlBhbmVsID0gZnVuY3Rpb24gKCkge1xuXG4gIFVJLkVsZW1lbnQuY2FsbCggdGhpcyApO1xuXG4gIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ1BhbmVsJztcblxuICB0aGlzLmRvbSA9IGRvbTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuUGFuZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVUkuRWxlbWVudC5wcm90b3R5cGUgKTtcblVJLlBhbmVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVJLlBhbmVsO1xuXG5cbi8vIENvbGxhcHNpYmxlIFBhbmVsXG5cblVJLkNvbGxhcHNpYmxlUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgVUkuUGFuZWwuY2FsbCggdGhpcyApO1xuXG4gIHRoaXMuc2V0Q2xhc3MoICdQYW5lbCBDb2xsYXBzaWJsZScgKTtcblxuICB2YXIgc2NvcGUgPSB0aGlzO1xuXG4gIHRoaXMuc3RhdGljID0gbmV3IFVJLlBhbmVsKCk7XG4gIHRoaXMuc3RhdGljLnNldENsYXNzKCAnU3RhdGljJyApO1xuICB0aGlzLnN0YXRpYy5vbkNsaWNrKCBmdW5jdGlvbiAoKSB7XG5cbiAgICBzY29wZS50b2dnbGUoKTtcblxuICB9ICk7XG4gIHRoaXMuZG9tLmFwcGVuZENoaWxkKCB0aGlzLnN0YXRpYy5kb20gKTtcblxuICB0aGlzLmNvbnRlbnRzID0gbmV3IFVJLlBhbmVsKCk7XG4gIHRoaXMuY29udGVudHMuc2V0Q2xhc3MoICdDb250ZW50JyApO1xuICB0aGlzLmRvbS5hcHBlbmRDaGlsZCggdGhpcy5jb250ZW50cy5kb20gKTtcblxuICB2YXIgYnV0dG9uID0gbmV3IFVJLlBhbmVsKCk7XG4gIGJ1dHRvbi5zZXRDbGFzcyggJ0J1dHRvbicgKTtcbiAgdGhpcy5zdGF0aWMuYWRkKCBidXR0b24gKTtcblxuICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNvbGxhcHNpYmxlUGFuZWwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVUkuUGFuZWwucHJvdG90eXBlICk7XG5VSS5Db2xsYXBzaWJsZVBhbmVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVJLkNvbGxhcHNpYmxlUGFuZWw7XG5cblVJLkNvbGxhcHNpYmxlUGFuZWwucHJvdG90eXBlLmFkZFN0YXRpYyA9IGZ1bmN0aW9uICgpIHtcblxuICB0aGlzLnN0YXRpYy5hZGQuYXBwbHkoIHRoaXMuc3RhdGljLCBhcmd1bWVudHMgKTtcbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNvbGxhcHNpYmxlUGFuZWwucHJvdG90eXBlLnJlbW92ZVN0YXRpYyA9IGZ1bmN0aW9uICgpIHtcblxuICB0aGlzLnN0YXRpYy5yZW1vdmUuYXBwbHkoIHRoaXMuc3RhdGljLCBhcmd1bWVudHMgKTtcbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNvbGxhcHNpYmxlUGFuZWwucHJvdG90eXBlLmNsZWFyU3RhdGljID0gZnVuY3Rpb24gKCkge1xuXG4gIHRoaXMuc3RhdGljLmNsZWFyKCk7XG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5Db2xsYXBzaWJsZVBhbmVsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdGhpcy5jb250ZW50cy5hZGQuYXBwbHkoIHRoaXMuY29udGVudHMsIGFyZ3VtZW50cyApO1xuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuQ29sbGFwc2libGVQYW5lbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXG4gIHRoaXMuY29udGVudHMucmVtb3ZlLmFwcGx5KCB0aGlzLmNvbnRlbnRzLCBhcmd1bWVudHMgKTtcbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNvbGxhcHNpYmxlUGFuZWwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuXG4gIHRoaXMuY29udGVudHMuY2xlYXIoKTtcbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNvbGxhcHNpYmxlUGFuZWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuXG4gIHRoaXMuc2V0Q29sbGFwc2VkKCAhIHRoaXMuaXNDb2xsYXBzZWQgKTtcblxufTtcblxuVUkuQ29sbGFwc2libGVQYW5lbC5wcm90b3R5cGUuY29sbGFwc2UgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLnNldENvbGxhcHNlZCggdHJ1ZSApO1xuXG59O1xuXG5VSS5Db2xsYXBzaWJsZVBhbmVsLnByb3RvdHlwZS5leHBhbmQgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLnNldENvbGxhcHNlZCggZmFsc2UgKTtcblxufTtcblxuVUkuQ29sbGFwc2libGVQYW5lbC5wcm90b3R5cGUuc2V0Q29sbGFwc2VkID0gZnVuY3Rpb24oIGJvb2xlYW4gKSB7XG5cbiAgaWYgKCBib29sZWFuICkge1xuXG4gICAgdGhpcy5kb20uY2xhc3NMaXN0LmFkZCggJ2NvbGxhcHNlZCcgKTtcblxuICB9IGVsc2Uge1xuXG4gICAgdGhpcy5kb20uY2xhc3NMaXN0LnJlbW92ZSggJ2NvbGxhcHNlZCcgKTtcblxuICB9XG5cbiAgdGhpcy5pc0NvbGxhcHNlZCA9IGJvb2xlYW47XG5cbiAgaWYgKCB0aGlzLm9uQ29sbGFwc2VkQ2hhbmdlQ2FsbGJhY2sgIT09IHVuZGVmaW5lZCApIHtcblxuICAgIHRoaXMub25Db2xsYXBzZWRDaGFuZ2VDYWxsYmFjayggYm9vbGVhbiApO1xuXG4gIH1cblxufTtcblxuVUkuQ29sbGFwc2libGVQYW5lbC5wcm90b3R5cGUub25Db2xsYXBzZWRDaGFuZ2UgPSBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG4gIHRoaXMub25Db2xsYXBzZWRDaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG59O1xuXG4vLyBUZXh0XG5cblVJLlRleHQgPSBmdW5jdGlvbiAoIHRleHQgKSB7XG5cbiAgVUkuRWxlbWVudC5jYWxsKCB0aGlzICk7XG5cbiAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzcGFuJyApO1xuICBkb20uY2xhc3NOYW1lID0gJ1RleHQnO1xuICBkb20uc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICBkb20uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICBkb20uc3R5bGUudmVydGljYWxBbGlnbiA9ICdtaWRkbGUnO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuICB0aGlzLnNldFZhbHVlKCB0ZXh0ICk7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLlRleHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVUkuRWxlbWVudC5wcm90b3R5cGUgKTtcblVJLlRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuVGV4dDtcblxuVUkuVGV4dC5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgcmV0dXJuIHRoaXMuZG9tLnRleHRDb250ZW50O1xuXG59O1xuXG5VSS5UZXh0LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cbiAgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgdGhpcy5kb20udGV4dENvbnRlbnQgPSB2YWx1ZTtcblxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblxuLy8gSW5wdXRcblxuVUkuSW5wdXQgPSBmdW5jdGlvbiAoIHRleHQgKSB7XG5cbiAgVUkuRWxlbWVudC5jYWxsKCB0aGlzICk7XG5cbiAgdmFyIHNjb3BlID0gdGhpcztcblxuICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ0lucHV0JztcbiAgZG9tLnN0eWxlLnBhZGRpbmcgPSAnMnB4JztcbiAgZG9tLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgdHJhbnNwYXJlbnQnO1xuXG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICB9LCBmYWxzZSApO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuICB0aGlzLnNldFZhbHVlKCB0ZXh0ICk7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLklucHV0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5JbnB1dC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVSS5JbnB1dDtcblxuVUkuSW5wdXQucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4gIHJldHVybiB0aGlzLmRvbS52YWx1ZTtcblxufTtcblxuVUkuSW5wdXQucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuICB0aGlzLmRvbS52YWx1ZSA9IHZhbHVlO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5cbi8vIFRleHRBcmVhXG5cblVJLlRleHRBcmVhID0gZnVuY3Rpb24gKCkge1xuXG4gIFVJLkVsZW1lbnQuY2FsbCggdGhpcyApO1xuXG4gIHZhciBzY29wZSA9IHRoaXM7XG5cbiAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICd0ZXh0YXJlYScgKTtcbiAgZG9tLmNsYXNzTmFtZSA9ICdUZXh0QXJlYSc7XG4gIGRvbS5zdHlsZS5wYWRkaW5nID0gJzJweCc7XG4gIGRvbS5zcGVsbGNoZWNrID0gZmFsc2U7XG5cbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKCBldmVudC5rZXlDb2RlID09PSA5ICkge1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgY3Vyc29yID0gZG9tLnNlbGVjdGlvblN0YXJ0O1xuXG4gICAgICBkb20udmFsdWUgPSBkb20udmFsdWUuc3Vic3RyaW5nKCAwLCBjdXJzb3IgKSArICdcXHQnICsgZG9tLnZhbHVlLnN1YnN0cmluZyggY3Vyc29yICk7XG4gICAgICBkb20uc2VsZWN0aW9uU3RhcnQgPSBjdXJzb3IgKyAxO1xuICAgICAgZG9tLnNlbGVjdGlvbkVuZCA9IGRvbS5zZWxlY3Rpb25TdGFydDtcblxuICAgIH1cblxuICB9LCBmYWxzZSApO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5UZXh0QXJlYS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuVGV4dEFyZWEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuVGV4dEFyZWE7XG5cblVJLlRleHRBcmVhLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblxuICByZXR1cm4gdGhpcy5kb20udmFsdWU7XG5cbn07XG5cblVJLlRleHRBcmVhLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cbiAgdGhpcy5kb20udmFsdWUgPSB2YWx1ZTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuXG4vLyBTZWxlY3RcblxuVUkuU2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gIFVJLkVsZW1lbnQuY2FsbCggdGhpcyApO1xuXG4gIHZhciBzY29wZSA9IHRoaXM7XG5cbiAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzZWxlY3QnICk7XG4gIGRvbS5jbGFzc05hbWUgPSAnU2VsZWN0JztcbiAgZG9tLnN0eWxlLnBhZGRpbmcgPSAnMnB4JztcblxuICB0aGlzLmRvbSA9IGRvbTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuU2VsZWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5TZWxlY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuU2VsZWN0O1xuXG5VSS5TZWxlY3QucHJvdG90eXBlLnNldE11bHRpcGxlID0gZnVuY3Rpb24gKCBib29sZWFuICkge1xuXG4gIHRoaXMuZG9tLm11bHRpcGxlID0gYm9vbGVhbjtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuU2VsZWN0LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXG4gIHZhciBzZWxlY3RlZCA9IHRoaXMuZG9tLnZhbHVlO1xuXG4gIHdoaWxlICggdGhpcy5kb20uY2hpbGRyZW4ubGVuZ3RoID4gMCApIHtcblxuICAgIHRoaXMuZG9tLnJlbW92ZUNoaWxkKCB0aGlzLmRvbS5maXJzdENoaWxkICk7XG5cbiAgfVxuXG4gIGZvciAoIHZhciBrZXkgaW4gb3B0aW9ucyApIHtcblxuICAgIHZhciBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnb3B0aW9uJyApO1xuICAgIG9wdGlvbi52YWx1ZSA9IGtleTtcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gb3B0aW9uc1sga2V5IF07XG4gICAgdGhpcy5kb20uYXBwZW5kQ2hpbGQoIG9wdGlvbiApO1xuXG4gIH1cblxuICB0aGlzLmRvbS52YWx1ZSA9IHNlbGVjdGVkO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5TZWxlY3QucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4gIHJldHVybiB0aGlzLmRvbS52YWx1ZTtcblxufTtcblxuVUkuU2VsZWN0LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cbiAgdmFsdWUgPSBTdHJpbmcoIHZhbHVlICk7XG5cbiAgaWYgKCB0aGlzLmRvbS52YWx1ZSAhPT0gdmFsdWUgKSB7XG5cbiAgICB0aGlzLmRvbS52YWx1ZSA9IHZhbHVlO1xuXG4gIH1cblxuICByZXR1cm4gdGhpcztcblxufTtcblxuLy8gQ2hlY2tib3hcblxuVUkuQ2hlY2tib3ggPSBmdW5jdGlvbiAoIGJvb2xlYW4gKSB7XG5cbiAgVUkuRWxlbWVudC5jYWxsKCB0aGlzICk7XG5cbiAgdmFyIHNjb3BlID0gdGhpcztcblxuICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ0NoZWNrYm94JztcbiAgZG9tLnR5cGUgPSAnY2hlY2tib3gnO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuICB0aGlzLnNldFZhbHVlKCBib29sZWFuICk7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNoZWNrYm94LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5DaGVja2JveC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVSS5DaGVja2JveDtcblxuVUkuQ2hlY2tib3gucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4gIHJldHVybiB0aGlzLmRvbS5jaGVja2VkO1xuXG59O1xuXG5VSS5DaGVja2JveC5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG4gIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblxuICAgIHRoaXMuZG9tLmNoZWNrZWQgPSB2YWx1ZTtcblxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblxuLy8gQ29sb3JcblxuVUkuQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG5cbiAgVUkuRWxlbWVudC5jYWxsKCB0aGlzICk7XG5cbiAgdmFyIHNjb3BlID0gdGhpcztcblxuICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ0NvbG9yJztcbiAgZG9tLnN0eWxlLndpZHRoID0gJzY0cHgnO1xuICBkb20uc3R5bGUuaGVpZ2h0ID0gJzE3cHgnO1xuICBkb20uc3R5bGUuYm9yZGVyID0gJzBweCc7XG4gIGRvbS5zdHlsZS5wYWRkaW5nID0gJzJweCc7XG4gIGRvbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gIHRyeSB7XG5cbiAgICBkb20udHlwZSA9ICdjb2xvcic7XG4gICAgZG9tLnZhbHVlID0gJyNmZmZmZmYnO1xuXG4gIH0gY2F0Y2ggKCBleGNlcHRpb24gKSB7fVxuXG4gIHRoaXMuZG9tID0gZG9tO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5Db2xvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuQ29sb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuQ29sb3I7XG5cblVJLkNvbG9yLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblxuICByZXR1cm4gdGhpcy5kb20udmFsdWU7XG5cbn07XG5cblVJLkNvbG9yLnByb3RvdHlwZS5nZXRIZXhWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblxuICByZXR1cm4gcGFyc2VJbnQoIHRoaXMuZG9tLnZhbHVlLnN1YnN0ciggMSApLCAxNiApO1xuXG59O1xuXG5VSS5Db2xvci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG4gIHRoaXMuZG9tLnZhbHVlID0gdmFsdWU7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkNvbG9yLnByb3RvdHlwZS5zZXRIZXhWYWx1ZSA9IGZ1bmN0aW9uICggaGV4ICkge1xuXG4gIHRoaXMuZG9tLnZhbHVlID0gJyMnICsgKCAnMDAwMDAwJyArIGhleC50b1N0cmluZyggMTYgKSApLnNsaWNlKCAtIDYgKTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuXG4vLyBOdW1iZXJcblxuVUkuTnVtYmVyID0gZnVuY3Rpb24gKCBudW1iZXIgKSB7XG5cbiAgVUkuRWxlbWVudC5jYWxsKCB0aGlzICk7XG5cbiAgdmFyIHNjb3BlID0gdGhpcztcblxuICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ051bWJlcic7XG4gIGRvbS52YWx1ZSA9ICcwLjAwJztcblxuICBkb20uYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIGV2ZW50LmtleUNvZGUgPT09IDEzICkgZG9tLmJsdXIoKTtcblxuICB9LCBmYWxzZSApO1xuXG4gIHRoaXMudmFsdWUgPSAwO1xuXG4gIHRoaXMubWluID0gLSBJbmZpbml0eTtcbiAgdGhpcy5tYXggPSBJbmZpbml0eTtcblxuICB0aGlzLnByZWNpc2lvbiA9IDI7XG4gIHRoaXMuc3RlcCA9IDE7XG5cbiAgdGhpcy5kb20gPSBkb207XG5cbiAgdGhpcy5zZXRWYWx1ZSggbnVtYmVyICk7XG5cbiAgdmFyIGNoYW5nZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdIVE1MRXZlbnRzJyApO1xuICBjaGFuZ2VFdmVudC5pbml0RXZlbnQoICdjaGFuZ2UnLCB0cnVlLCB0cnVlICk7XG5cbiAgdmFyIGRpc3RhbmNlID0gMDtcbiAgdmFyIG9uTW91c2VEb3duVmFsdWUgPSAwO1xuXG4gIHZhciBwb2ludGVyID0gWyAwLCAwIF07XG4gIHZhciBwcmV2UG9pbnRlciA9IFsgMCwgMCBdO1xuXG4gIGZ1bmN0aW9uIG9uTW91c2VEb3duKCBldmVudCApIHtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBkaXN0YW5jZSA9IDA7XG5cbiAgICBvbk1vdXNlRG93blZhbHVlID0gc2NvcGUudmFsdWU7XG5cbiAgICBwcmV2UG9pbnRlciA9IFsgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSBdO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSApO1xuXG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdXNlTW92ZSggZXZlbnQgKSB7XG5cbiAgICB2YXIgY3VycmVudFZhbHVlID0gc2NvcGUudmFsdWU7XG5cbiAgICBwb2ludGVyID0gWyBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZIF07XG5cbiAgICBkaXN0YW5jZSArPSAoIHBvaW50ZXJbIDAgXSAtIHByZXZQb2ludGVyWyAwIF0gKSAtICggcG9pbnRlclsgMSBdIC0gcHJldlBvaW50ZXJbIDEgXSApO1xuXG4gICAgdmFyIHZhbHVlID0gb25Nb3VzZURvd25WYWx1ZSArICggZGlzdGFuY2UgLyAoIGV2ZW50LnNoaWZ0S2V5ID8gNSA6IDUwICkgKSAqIHNjb3BlLnN0ZXA7XG4gICAgdmFsdWUgPSBNYXRoLm1pbiggc2NvcGUubWF4LCBNYXRoLm1heCggc2NvcGUubWluLCB2YWx1ZSApICk7XG5cbiAgICBpZiAoIGN1cnJlbnRWYWx1ZSAhPT0gdmFsdWUgKSB7XG5cbiAgICAgIHNjb3BlLnNldFZhbHVlKCB2YWx1ZSApO1xuICAgICAgZG9tLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cbiAgICB9XG5cbiAgICBwcmV2UG9pbnRlciA9IFsgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSBdO1xuXG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdXNlVXAoIGV2ZW50ICkge1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSApO1xuXG4gICAgaWYgKCBNYXRoLmFicyggZGlzdGFuY2UgKSA8IDIgKSB7XG5cbiAgICAgIGRvbS5mb2N1cygpO1xuICAgICAgZG9tLnNlbGVjdCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBvbkNoYW5nZSggZXZlbnQgKSB7XG5cbiAgICB2YXIgdmFsdWUgPSAwO1xuXG4gICAgdHJ5IHtcblxuICAgICAgdmFsdWUgPSBldmFsKCBkb20udmFsdWUgKTtcblxuICAgIH0gY2F0Y2ggKCBlcnJvciApIHtcblxuICAgICAgY29uc29sZS5lcnJvciggZXJyb3IubWVzc2FnZSApO1xuXG4gICAgfVxuXG4gICAgc2NvcGUuc2V0VmFsdWUoIHBhcnNlRmxvYXQoIHZhbHVlICkgKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gb25Gb2N1cyggZXZlbnQgKSB7XG5cbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyc7XG4gICAgZG9tLnN0eWxlLmN1cnNvciA9ICcnO1xuXG4gIH1cblxuICBmdW5jdGlvbiBvbkJsdXIoIGV2ZW50ICkge1xuXG4gICAgZG9tLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgZG9tLnN0eWxlLmN1cnNvciA9ICdjb2wtcmVzaXplJztcblxuICB9XG5cbiAgb25CbHVyKCk7XG5cbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UgKTtcbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UgKTtcbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIG9uRm9jdXMsIGZhbHNlICk7XG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIG9uQmx1ciwgZmFsc2UgKTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuTnVtYmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5OdW1iZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuTnVtYmVyO1xuXG5VSS5OdW1iZXIucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4gIHJldHVybiB0aGlzLnZhbHVlO1xuXG59O1xuXG5VSS5OdW1iZXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIGlmICh2YWx1ZSA8IHRoaXMubWluKVxuICAgICAgdmFsdWUgPSB0aGlzLm1pbjtcbiAgICBpZiAodmFsdWUgPiB0aGlzLm1heClcbiAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZG9tLnZhbHVlID0gdmFsdWUudG9GaXhlZCggdGhpcy5wcmVjaXNpb24gKTtcblxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLk51bWJlci5wcm90b3R5cGUuc2V0UmFuZ2UgPSBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG4gIHRoaXMubWluID0gbWluO1xuICB0aGlzLm1heCA9IG1heDtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuTnVtYmVyLnByb3RvdHlwZS5zZXRQcmVjaXNpb24gPSBmdW5jdGlvbiAoIHByZWNpc2lvbiApIHtcblxuICB0aGlzLnByZWNpc2lvbiA9IHByZWNpc2lvbjtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuXG4vLyBJbnRlZ2VyXG5cblVJLkludGVnZXIgPSBmdW5jdGlvbiAoIG51bWJlciApIHtcblxuICBVSS5FbGVtZW50LmNhbGwoIHRoaXMgKTtcblxuICB2YXIgc2NvcGUgPSB0aGlzO1xuXG4gIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnaW5wdXQnICk7XG4gIGRvbS5jbGFzc05hbWUgPSAnTnVtYmVyJztcbiAgZG9tLnZhbHVlID0gJzAnO1xuXG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICB9LCBmYWxzZSApO1xuXG4gIHRoaXMudmFsdWUgPSAwO1xuXG4gIHRoaXMubWluID0gLSBJbmZpbml0eTtcbiAgdGhpcy5tYXggPSBJbmZpbml0eTtcblxuICB0aGlzLnN0ZXAgPSAxO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuXG4gIHRoaXMuc2V0VmFsdWUoIG51bWJlciApO1xuXG4gIHZhciBjaGFuZ2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnSFRNTEV2ZW50cycgKTtcbiAgY2hhbmdlRXZlbnQuaW5pdEV2ZW50KCAnY2hhbmdlJywgdHJ1ZSwgdHJ1ZSApO1xuXG4gIHZhciBkaXN0YW5jZSA9IDA7XG4gIHZhciBvbk1vdXNlRG93blZhbHVlID0gMDtcblxuICB2YXIgcG9pbnRlciA9IFsgMCwgMCBdO1xuICB2YXIgcHJldlBvaW50ZXIgPSBbIDAsIDAgXTtcblxuICBmdW5jdGlvbiBvbk1vdXNlRG93biggZXZlbnQgKSB7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgZGlzdGFuY2UgPSAwO1xuXG4gICAgb25Nb3VzZURvd25WYWx1ZSA9IHNjb3BlLnZhbHVlO1xuXG4gICAgcHJldlBvaW50ZXIgPSBbIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgXTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSwgZmFsc2UgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3VzZU1vdmUoIGV2ZW50ICkge1xuXG4gICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHNjb3BlLnZhbHVlO1xuXG4gICAgcG9pbnRlciA9IFsgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSBdO1xuXG4gICAgZGlzdGFuY2UgKz0gKCBwb2ludGVyWyAwIF0gLSBwcmV2UG9pbnRlclsgMCBdICkgLSAoIHBvaW50ZXJbIDEgXSAtIHByZXZQb2ludGVyWyAxIF0gKTtcblxuICAgIHZhciB2YWx1ZSA9IG9uTW91c2VEb3duVmFsdWUgKyAoIGRpc3RhbmNlIC8gKCBldmVudC5zaGlmdEtleSA/IDUgOiA1MCApICkgKiBzY29wZS5zdGVwO1xuICAgIHZhbHVlID0gTWF0aC5taW4oIHNjb3BlLm1heCwgTWF0aC5tYXgoIHNjb3BlLm1pbiwgdmFsdWUgKSApIHwgMDtcblxuICAgIGlmICggY3VycmVudFZhbHVlICE9PSB2YWx1ZSApIHtcblxuICAgICAgc2NvcGUuc2V0VmFsdWUoIHZhbHVlICk7XG4gICAgICBkb20uZGlzcGF0Y2hFdmVudCggY2hhbmdlRXZlbnQgKTtcblxuICAgIH1cblxuICAgIHByZXZQb2ludGVyID0gWyBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZIF07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW91c2VVcCggZXZlbnQgKSB7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlICk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlICk7XG5cbiAgICBpZiAoIE1hdGguYWJzKCBkaXN0YW5jZSApIDwgMiApIHtcblxuICAgICAgZG9tLmZvY3VzKCk7XG4gICAgICBkb20uc2VsZWN0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2hhbmdlKCBldmVudCApIHtcblxuICAgIHZhciB2YWx1ZSA9IDA7XG5cbiAgICB0cnkge1xuXG4gICAgICB2YWx1ZSA9IGV2YWwoIGRvbS52YWx1ZSApO1xuXG4gICAgfSBjYXRjaCAoIGVycm9yICkge1xuXG4gICAgICBjb25zb2xlLmVycm9yKCBlcnJvci5tZXNzYWdlICk7XG5cbiAgICB9XG5cbiAgICBzY29wZS5zZXRWYWx1ZSggdmFsdWUgKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gb25Gb2N1cyggZXZlbnQgKSB7XG5cbiAgICBkb20uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyc7XG4gICAgZG9tLnN0eWxlLmN1cnNvciA9ICcnO1xuXG4gIH1cblxuICBmdW5jdGlvbiBvbkJsdXIoIGV2ZW50ICkge1xuXG4gICAgZG9tLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgZG9tLnN0eWxlLmN1cnNvciA9ICdjb2wtcmVzaXplJztcblxuICB9XG5cbiAgb25CbHVyKCk7XG5cbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UgKTtcbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UgKTtcbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIG9uRm9jdXMsIGZhbHNlICk7XG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIG9uQmx1ciwgZmFsc2UgKTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuSW50ZWdlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuSW50ZWdlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVSS5JbnRlZ2VyO1xuXG5VSS5JbnRlZ2VyLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblxuICByZXR1cm4gdGhpcy52YWx1ZTtcblxufTtcblxuVUkuSW50ZWdlci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG4gIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZSB8IDA7XG4gICAgdGhpcy5kb20udmFsdWUgPSB2YWx1ZSB8IDA7XG5cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5JbnRlZ2VyLnByb3RvdHlwZS5zZXRSYW5nZSA9IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cbiAgdGhpcy5taW4gPSBtaW47XG4gIHRoaXMubWF4ID0gbWF4O1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5cbi8vIEJyZWFrXG5cblVJLkJyZWFrID0gZnVuY3Rpb24gKCkge1xuXG4gIFVJLkVsZW1lbnQuY2FsbCggdGhpcyApO1xuXG4gIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnInICk7XG4gIGRvbS5jbGFzc05hbWUgPSAnQnJlYWsnO1xuXG4gIHRoaXMuZG9tID0gZG9tO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5CcmVhay5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuQnJlYWsucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuQnJlYWs7XG5cblxuLy8gSG9yaXpvbnRhbFJ1bGVcblxuVUkuSG9yaXpvbnRhbFJ1bGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgVUkuRWxlbWVudC5jYWxsKCB0aGlzICk7XG5cbiAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdocicgKTtcbiAgZG9tLmNsYXNzTmFtZSA9ICdIb3Jpem9udGFsUnVsZSc7XG5cbiAgdGhpcy5kb20gPSBkb207XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkhvcml6b250YWxSdWxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5Ib3Jpem9udGFsUnVsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVSS5Ib3Jpem9udGFsUnVsZTtcblxuXG4vLyBCdXR0b25cblxuVUkuQnV0dG9uID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuICBVSS5FbGVtZW50LmNhbGwoIHRoaXMgKTtcblxuICB2YXIgc2NvcGUgPSB0aGlzO1xuXG4gIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuICBkb20uY2xhc3NOYW1lID0gJ0J1dHRvbic7XG5cbiAgdGhpcy5kb20gPSBkb207XG4gIHRoaXMuZG9tLnRleHRDb250ZW50ID0gdmFsdWU7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLkJ1dHRvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuQnV0dG9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVJLkJ1dHRvbjtcblxuVUkuQnV0dG9uLnByb3RvdHlwZS5zZXRMYWJlbCA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cbiAgdGhpcy5kb20udGV4dENvbnRlbnQgPSB2YWx1ZTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuXG4vLyBNb2RhbFxuXG5VSS5Nb2RhbCA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cbiAgdmFyIHNjb3BlID0gdGhpcztcblxuICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuICBkb20uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICBkb20uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gIGRvbS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gIGRvbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLDAsMCwwLjUpJztcbiAgZG9tLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvbS5zdHlsZS5hbGlnbkl0ZW1zID0gJ2NlbnRlcic7XG4gIGRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInO1xuICBkb20uYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgIHNjb3BlLmhpZGUoKTtcblxuICB9ICk7XG5cbiAgdGhpcy5kb20gPSBkb207XG5cbiAgdGhpcy5jb250YWluZXIgPSBuZXcgVUkuUGFuZWwoKTtcbiAgdGhpcy5jb250YWluZXIuZG9tLnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgdGhpcy5jb250YWluZXIuZG9tLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gIHRoaXMuY29udGFpbmVyLmRvbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gIHRoaXMuY29udGFpbmVyLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDVweCAxMHB4IHJnYmEoMCwwLDAsMC41KSc7XG5cbiAgdGhpcy5hZGQoIHRoaXMuY29udGFpbmVyICk7XG5cbiAgcmV0dXJuIHRoaXM7XG5cbn07XG5cblVJLk1vZGFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5Nb2RhbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBVSS5Nb2RhbDtcblxuVUkuTW9kYWwucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoIGNvbnRlbnQgKSB7XG5cbiAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgdGhpcy5jb250YWluZXIuYWRkKCBjb250ZW50ICk7XG5cbiAgdGhpcy5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuTW9kYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdGhpcy5kb20uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuXG5cbi8vIC0tLS0tIFVJLlRIUkVFSlNcblxuLy8gT3V0bGluZXJcblxuVUkuT3V0bGluZXIgPSBmdW5jdGlvbiAoIGVkaXRvciApIHtcblxuICBVSS5FbGVtZW50LmNhbGwoIHRoaXMgKTtcblxuICB2YXIgc2NvcGUgPSB0aGlzO1xuXG4gIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ091dGxpbmVyJztcbiAgZG9tLnRhYkluZGV4ID0gMDsgLy8ga2V5dXAgZXZlbnQgaXMgaWdub3JlZCB3aXRob3V0IHNldHRpbmcgdGFiSW5kZXhcblxuICB2YXIgc2NlbmUgPSBlZGl0b3Iuc2NlbmU7XG5cbiAgdmFyIHNvcnRhYmxlID0gU29ydGFibGUuY3JlYXRlKCBkb20sIHtcbiAgICBkcmFnZ2FibGU6ICcuZHJhZ2dhYmxlJyxcbiAgICBvblVwZGF0ZTogZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgICAgdmFyIGl0ZW0gPSBldmVudC5pdGVtO1xuXG4gICAgICB2YXIgb2JqZWN0ID0gc2NlbmUuZ2V0T2JqZWN0QnlJZCggaXRlbS52YWx1ZSApO1xuXG4gICAgICBpZiAoIGl0ZW0ubmV4dFNpYmxpbmcgPT09IG51bGwgKSB7XG5cbiAgICAgICAgZWRpdG9yLmV4ZWN1dGUoIG5ldyBNb3ZlT2JqZWN0Q29tbWFuZCggb2JqZWN0LCBlZGl0b3Iuc2NlbmUgKSApO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHZhciBuZXh0T2JqZWN0ID0gc2NlbmUuZ2V0T2JqZWN0QnlJZCggaXRlbS5uZXh0U2libGluZy52YWx1ZSApO1xuICAgICAgICBlZGl0b3IuZXhlY3V0ZSggbmV3IE1vdmVPYmplY3RDb21tYW5kKCBvYmplY3QsIG5leHRPYmplY3QucGFyZW50LCBuZXh0T2JqZWN0ICkgKTtcblxuICAgICAgfVxuXG4gICAgfVxuICB9ICk7XG5cbiAgLy8gQnJvYWRjYXN0IGZvciBvYmplY3Qgc2VsZWN0aW9uIGFmdGVyIGFycm93IG5hdmlnYXRpb25cbiAgdmFyIGNoYW5nZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdIVE1MRXZlbnRzJyApO1xuICBjaGFuZ2VFdmVudC5pbml0RXZlbnQoICdjaGFuZ2UnLCB0cnVlLCB0cnVlICk7XG5cbiAgLy8gUHJldmVudCBuYXRpdmUgc2Nyb2xsIGJlaGF2aW9yXG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cbiAgICBzd2l0Y2ggKCBldmVudC5rZXlDb2RlICkge1xuICAgICAgY2FzZSAzODogLy8gdXBcbiAgICAgIGNhc2UgNDA6IC8vIGRvd25cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9LCBmYWxzZSApO1xuXG4gIC8vIEtleWJpbmRpbmdzIHRvIHN1cHBvcnQgYXJyb3cgbmF2aWdhdGlvblxuICBkb20uYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgZnVuY3Rpb24gKCBldmVudCApIHtcblxuICAgIGZ1bmN0aW9uIHNlbGVjdCggaW5kZXggKSB7XG5cbiAgICAgIGlmICggaW5kZXggPj0gMCAmJiBpbmRleCA8IHNjb3BlLm9wdGlvbnMubGVuZ3RoICkge1xuXG4gICAgICAgIHNjb3BlLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcblxuICAgICAgICAvLyBIaWdobGlnaHQgc2VsZWN0ZWQgZG9tIGVsZW0gYW5kIHNjcm9sbCBwYXJlbnQgaWYgbmVlZGVkXG4gICAgICAgIHNjb3BlLnNldFZhbHVlKCBzY29wZS5vcHRpb25zWyBpbmRleCBdLnZhbHVlICk7XG4gICAgICAgIHNjb3BlLmRvbS5kaXNwYXRjaEV2ZW50KCBjaGFuZ2VFdmVudCApO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBzd2l0Y2ggKCBldmVudC5rZXlDb2RlICkge1xuICAgICAgY2FzZSAzODogLy8gdXBcbiAgICAgICAgc2VsZWN0KCBzY29wZS5zZWxlY3RlZEluZGV4IC0gMSApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6IC8vIGRvd25cbiAgICAgICAgc2VsZWN0KCBzY29wZS5zZWxlY3RlZEluZGV4ICsgMSApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfSwgZmFsc2UgKTtcblxuICB0aGlzLmRvbSA9IGRvbTtcblxuICB0aGlzLm9wdGlvbnMgPSBbXTtcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLSAxO1xuICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBudWxsO1xuXG4gIHJldHVybiB0aGlzO1xuXG59O1xuXG5VSS5PdXRsaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVSS5FbGVtZW50LnByb3RvdHlwZSApO1xuVUkuT3V0bGluZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuT3V0bGluZXI7XG5cblVJLk91dGxpbmVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXG4gIHZhciBzY29wZSA9IHRoaXM7XG5cbiAgdmFyIGNoYW5nZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdIVE1MRXZlbnRzJyApO1xuICBjaGFuZ2VFdmVudC5pbml0RXZlbnQoICdjaGFuZ2UnLCB0cnVlLCB0cnVlICk7XG5cbiAgd2hpbGUgKCBzY29wZS5kb20uY2hpbGRyZW4ubGVuZ3RoID4gMCApIHtcblxuICAgIHNjb3BlLmRvbS5yZW1vdmVDaGlsZCggc2NvcGUuZG9tLmZpcnN0Q2hpbGQgKTtcblxuICB9XG5cbiAgc2NvcGUub3B0aW9ucyA9IFtdO1xuXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpICsrICkge1xuXG4gICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICAgIGRpdi5jbGFzc05hbWUgPSAnb3B0aW9uICcgKyAoIG9wdGlvbi5zdGF0aWMgPT09IHRydWUgPyAnJyA6ICdkcmFnZ2FibGUnICk7XG4gICAgZGl2LmlubmVySFRNTCA9IG9wdGlvbi5odG1sO1xuICAgIGRpdi52YWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICBzY29wZS5kb20uYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG4gICAgc2NvcGUub3B0aW9ucy5wdXNoKCBkaXYgKTtcblxuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG4gICAgICBzY29wZS5zZXRWYWx1ZSggdGhpcy52YWx1ZSApO1xuICAgICAgc2NvcGUuZG9tLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cbiAgICB9LCBmYWxzZSApO1xuXG4gIH1cblxuICByZXR1cm4gc2NvcGU7XG5cbn07XG5cblVJLk91dGxpbmVyLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblxuICByZXR1cm4gdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG59O1xuXG5VSS5PdXRsaW5lci5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICB2YXIgZWxlbWVudCA9IHRoaXMub3B0aW9uc1sgaSBdO1xuXG4gICAgaWYgKCBlbGVtZW50LnZhbHVlID09PSB2YWx1ZSApIHtcblxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnYWN0aXZlJyApO1xuXG4gICAgICAvLyBzY3JvbGwgaW50byB2aWV3XG5cbiAgICAgIHZhciB5ID0gZWxlbWVudC5vZmZzZXRUb3AgLSB0aGlzLmRvbS5vZmZzZXRUb3A7XG4gICAgICB2YXIgYm90dG9tWSA9IHkgKyBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgIHZhciBtaW5TY3JvbGwgPSBib3R0b21ZIC0gdGhpcy5kb20ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAoIHRoaXMuZG9tLnNjcm9sbFRvcCA+IHkgKSB7XG5cbiAgICAgICAgdGhpcy5kb20uc2Nyb2xsVG9wID0geTtcblxuICAgICAgfSBlbHNlIGlmICggdGhpcy5kb20uc2Nyb2xsVG9wIDwgbWluU2Nyb2xsICkge1xuXG4gICAgICAgIHRoaXMuZG9tLnNjcm9sbFRvcCA9IG1pblNjcm9sbDtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnYWN0aXZlJyApO1xuXG4gICAgfVxuXG4gIH1cblxuICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcblxuICByZXR1cm4gdGhpcztcblxufTtcblxuVUkuVEhSRUUgPSB7fTtcblxuVUkuVEhSRUUuQm9vbGVhbiA9IGZ1bmN0aW9uICggYm9vbGVhbiwgdGV4dCApIHtcblxuICBVSS5TcGFuLmNhbGwoIHRoaXMgKTtcblxuICB0aGlzLnNldE1hcmdpblJpZ2h0KCAnMTBweCcgKTtcblxuICB0aGlzLmNoZWNrYm94ID0gbmV3IFVJLkNoZWNrYm94KCBib29sZWFuICk7XG4gIHRoaXMudGV4dCA9IG5ldyBVSS5UZXh0KCB0ZXh0ICkuc2V0TWFyZ2luTGVmdCggJzNweCcgKTtcblxuICB0aGlzLmFkZCggdGhpcy5jaGVja2JveCApO1xuICB0aGlzLmFkZCggdGhpcy50ZXh0ICk7XG5cbn07XG5cblVJLlRIUkVFLkJvb2xlYW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVUkuU3Bhbi5wcm90b3R5cGUgKTtcblVJLlRIUkVFLkJvb2xlYW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUkuVEhSRUUuQm9vbGVhbjtcblxuVUkuVEhSRUUuQm9vbGVhbi5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgcmV0dXJuIHRoaXMuY2hlY2tib3guZ2V0VmFsdWUoKTtcblxufTtcblxuVUkuVEhSRUUuQm9vbGVhbi5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG4gIHJldHVybiB0aGlzLmNoZWNrYm94LnNldFZhbHVlKCB2YWx1ZSApO1xuXG59O1xuXG5VSS5WZWN0b3IzID0gZnVuY3Rpb24gKCB2ZWN0b3IzICkge1xuXG4gIFVJLkVsZW1lbnQuY2FsbCggdGhpcyApO1xuXG4gIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuICBkb20uY2xhc3NOYW1lID0gJ1Jvdyc7XG5cbiAgdGhpcy5kb20gPSBkb207XG5cbiAgdmFyIHNjb3BlPXRoaXM7XG4gICAgXG4gIHRoaXMudmVjdG9yPXtcbiAgICAneCc6IG5ldyBVSS5OdW1iZXIoKS5zZXRXaWR0aCgnNTBweCcpLFxuICAgICd5JzogbmV3IFVJLk51bWJlcigpLnNldFdpZHRoKCc1MHB4JyksXG4gICAgJ3onOiBuZXcgVUkuTnVtYmVyKCkuc2V0V2lkdGgoJzUwcHgnKSxcbiAgfVxuICBcbiAgdGhpcy5hZGQodGhpcy52ZWN0b3JbJ3gnXSAsdGhpcy52ZWN0b3JbJ3knXSAsdGhpcy52ZWN0b3JbJ3onXSk7XG59O1xuXG5VSS5WZWN0b3IzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVJLkVsZW1lbnQucHJvdG90eXBlICk7XG5VSS5WZWN0b3IzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVJLlZlY3RvcjM7XG5cblVJLlZlY3RvcjMucHJvdG90eXBlLnNldFdpZHRoPWZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuVUkuVmVjdG9yMy5wcm90b3R5cGUuc2V0VmFsdWU9ZnVuY3Rpb24odmFsdWUpIHtcbiAgZm9yICh2YXIgdmFsIGluIHZhbHVlKSB7XG4gICAgdGhpcy52ZWN0b3JbdmFsXS5zZXRWYWx1ZSh2YWx1ZVt2YWxdKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblVJLlZlY3RvcjMucHJvdG90eXBlLmdldFZhbHVlPWZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgICd4JzogdGhpcy52ZWN0b3JbJ3gnXS5nZXRWYWx1ZSgpLFxuICAgICd5JzogdGhpcy52ZWN0b3JbJ3gnXS5nZXRWYWx1ZSgpLFxuICAgICd6JzogdGhpcy52ZWN0b3JbJ3gnXS5nZXRWYWx1ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSTsiLCIndXNlIHN0cmljdCc7XG4vLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBicm93c2VyIGZpZWxkLCBjaGVjayBvdXQgdGhlIGJyb3dzZXIgZmllbGQgYXQgaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL2Jyb3dzZXJpZnktaGFuZGJvb2sjYnJvd3Nlci1maWVsZC5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gQ3JlYXRlIGEgPGxpbms+IHRhZyB3aXRoIG9wdGlvbmFsIGRhdGEgYXR0cmlidXRlc1xuICAgIGNyZWF0ZUxpbms6IGZ1bmN0aW9uKGhyZWYsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoICEgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgLy8gQ3JlYXRlIGEgPHN0eWxlPiB0YWcgd2l0aCBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXNcbiAgICBjcmVhdGVTdHlsZTogZnVuY3Rpb24oY3NzVGV4dCwgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKCAhIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHN0eWxlLnNoZWV0KSB7IC8vIGZvciBqc2RvbSBhbmQgSUU5K1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzVGV4dDtcbiAgICAgICAgICAgIHN0eWxlLnNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuc3R5bGVTaGVldCkgeyAvLyBmb3IgSUU4IGFuZCBiZWxvd1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICB9IGVsc2UgeyAvLyBmb3IgQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpXG4gICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKmpzbGludCBvbmV2YXI6dHJ1ZSwgdW5kZWY6dHJ1ZSwgbmV3Y2FwOnRydWUsIHJlZ2V4cDp0cnVlLCBiaXR3aXNlOnRydWUsIG1heGVycjo1MCwgaW5kZW50OjQsIHdoaXRlOmZhbHNlLCBub21lbjpmYWxzZSwgcGx1c3BsdXM6ZmFsc2UgKi9cbi8qZ2xvYmFsIGRlZmluZTpmYWxzZSwgcmVxdWlyZTpmYWxzZSwgZXhwb3J0czpmYWxzZSwgbW9kdWxlOmZhbHNlLCBzaWduYWxzOmZhbHNlICovXG5cbi8qKiBAbGljZW5zZVxuICogSlMgU2lnbmFscyA8aHR0cDovL21pbGxlcm1lZGVpcm9zLmdpdGh1Yi5jb20vanMtc2lnbmFscy8+XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEF1dGhvcjogTWlsbGVyIE1lZGVpcm9zXG4gKiBWZXJzaW9uOiAxLjAuMCAtIEJ1aWxkOiAyNjggKDIwMTIvMTEvMjkgMDU6NDggUE0pXG4gKi9cblxuKGZ1bmN0aW9uKGdsb2JhbCl7XG5cbiAgICAvLyBTaWduYWxCaW5kaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIE9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBiaW5kaW5nIGJldHdlZW4gYSBTaWduYWwgYW5kIGEgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAgICogPGJyIC8+LSA8c3Ryb25nPlRoaXMgaXMgYW4gaW50ZXJuYWwgY29uc3RydWN0b3IgYW5kIHNob3VsZG4ndCBiZSBjYWxsZWQgYnkgcmVndWxhciB1c2Vycy48L3N0cm9uZz5cbiAgICAgKiA8YnIgLz4tIGluc3BpcmVkIGJ5IEpvYSBFYmVydCBBUzMgU2lnbmFsQmluZGluZyBhbmQgUm9iZXJ0IFBlbm5lcidzIFNsb3QgY2xhc3Nlcy5cbiAgICAgKiBAYXV0aG9yIE1pbGxlciBNZWRlaXJvc1xuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqIEBuYW1lIFNpZ25hbEJpbmRpbmdcbiAgICAgKiBAcGFyYW0ge1NpZ25hbH0gc2lnbmFsIFJlZmVyZW5jZSB0byBTaWduYWwgb2JqZWN0IHRoYXQgbGlzdGVuZXIgaXMgY3VycmVudGx5IGJvdW5kIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEhhbmRsZXIgZnVuY3Rpb24gYm91bmQgdG8gdGhlIHNpZ25hbC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT25jZSBJZiBiaW5kaW5nIHNob3VsZCBiZSBleGVjdXRlZCBqdXN0IG9uY2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtsaXN0ZW5lckNvbnRleHRdIENvbnRleHQgb24gd2hpY2ggbGlzdGVuZXIgd2lsbCBiZSBleGVjdXRlZCAob2JqZWN0IHRoYXQgc2hvdWxkIHJlcHJlc2VudCB0aGUgYHRoaXNgIHZhcmlhYmxlIGluc2lkZSBsaXN0ZW5lciBmdW5jdGlvbikuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtwcmlvcml0eV0gVGhlIHByaW9yaXR5IGxldmVsIG9mIHRoZSBldmVudCBsaXN0ZW5lci4gKGRlZmF1bHQgPSAwKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTaWduYWxCaW5kaW5nKHNpZ25hbCwgbGlzdGVuZXIsIGlzT25jZSwgbGlzdGVuZXJDb250ZXh0LCBwcmlvcml0eSkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGVyIGZ1bmN0aW9uIGJvdW5kIHRvIHRoZSBzaWduYWwuXG4gICAgICAgICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBiaW5kaW5nIHNob3VsZCBiZSBleGVjdXRlZCBqdXN0IG9uY2UuXG4gICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2lzT25jZSA9IGlzT25jZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGV4dCBvbiB3aGljaCBsaXN0ZW5lciB3aWxsIGJlIGV4ZWN1dGVkIChvYmplY3QgdGhhdCBzaG91bGQgcmVwcmVzZW50IHRoZSBgdGhpc2AgdmFyaWFibGUgaW5zaWRlIGxpc3RlbmVyIGZ1bmN0aW9uKS5cbiAgICAgICAgICogQG1lbWJlck9mIFNpZ25hbEJpbmRpbmcucHJvdG90eXBlXG4gICAgICAgICAqIEBuYW1lIGNvbnRleHRcbiAgICAgICAgICogQHR5cGUgT2JqZWN0fHVuZGVmaW5lZHxudWxsXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBsaXN0ZW5lckNvbnRleHQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZmVyZW5jZSB0byBTaWduYWwgb2JqZWN0IHRoYXQgbGlzdGVuZXIgaXMgY3VycmVudGx5IGJvdW5kIHRvLlxuICAgICAgICAgKiBAdHlwZSBTaWduYWxcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NpZ25hbCA9IHNpZ25hbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTGlzdGVuZXIgcHJpb3JpdHlcbiAgICAgICAgICogQHR5cGUgTnVtYmVyXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG4gICAgfVxuXG4gICAgU2lnbmFsQmluZGluZy5wcm90b3R5cGUgPSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGJpbmRpbmcgaXMgYWN0aXZlIGFuZCBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZSA6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmF1bHQgcGFyYW1ldGVycyBwYXNzZWQgdG8gbGlzdGVuZXIgZHVyaW5nIGBTaWduYWwuZGlzcGF0Y2hgIGFuZCBgU2lnbmFsQmluZGluZy5leGVjdXRlYC4gKGN1cnJpZWQgcGFyYW1ldGVycylcbiAgICAgICAgICogQHR5cGUgQXJyYXl8bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgcGFyYW1zIDogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsbCBsaXN0ZW5lciBwYXNzaW5nIGFyYml0cmFyeSBwYXJhbWV0ZXJzLlxuICAgICAgICAgKiA8cD5JZiBiaW5kaW5nIHdhcyBhZGRlZCB1c2luZyBgU2lnbmFsLmFkZE9uY2UoKWAgaXQgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgZnJvbSBzaWduYWwgZGlzcGF0Y2ggcXVldWUsIHRoaXMgbWV0aG9kIGlzIHVzZWQgaW50ZXJuYWxseSBmb3IgdGhlIHNpZ25hbCBkaXNwYXRjaC48L3A+XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFtwYXJhbXNBcnJdIEFycmF5IG9mIHBhcmFtZXRlcnMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBsaXN0ZW5lclxuICAgICAgICAgKiBAcmV0dXJuIHsqfSBWYWx1ZSByZXR1cm5lZCBieSB0aGUgbGlzdGVuZXIuXG4gICAgICAgICAqL1xuICAgICAgICBleGVjdXRlIDogZnVuY3Rpb24gKHBhcmFtc0Fycikge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXJSZXR1cm4sIHBhcmFtcztcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhIXRoaXMuX2xpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5wYXJhbXM/IHRoaXMucGFyYW1zLmNvbmNhdChwYXJhbXNBcnIpIDogcGFyYW1zQXJyO1xuICAgICAgICAgICAgICAgIGhhbmRsZXJSZXR1cm4gPSB0aGlzLl9saXN0ZW5lci5hcHBseSh0aGlzLmNvbnRleHQsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzT25jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRhY2ggYmluZGluZyBmcm9tIHNpZ25hbC5cbiAgICAgICAgICogLSBhbGlhcyB0bzogbXlTaWduYWwucmVtb3ZlKG15QmluZGluZy5nZXRMaXN0ZW5lcigpKTtcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb258bnVsbH0gSGFuZGxlciBmdW5jdGlvbiBib3VuZCB0byB0aGUgc2lnbmFsIG9yIGBudWxsYCBpZiBiaW5kaW5nIHdhcyBwcmV2aW91c2x5IGRldGFjaGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZGV0YWNoIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNCb3VuZCgpPyB0aGlzLl9zaWduYWwucmVtb3ZlKHRoaXMuX2xpc3RlbmVyLCB0aGlzLmNvbnRleHQpIDogbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGJpbmRpbmcgaXMgc3RpbGwgYm91bmQgdG8gdGhlIHNpZ25hbCBhbmQgaGF2ZSBhIGxpc3RlbmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgaXNCb3VuZCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoISF0aGlzLl9zaWduYWwgJiYgISF0aGlzLl9saXN0ZW5lcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIFNpZ25hbEJpbmRpbmcgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIG9uY2UuXG4gICAgICAgICAqL1xuICAgICAgICBpc09uY2UgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNPbmNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gSGFuZGxlciBmdW5jdGlvbiBib3VuZCB0byB0aGUgc2lnbmFsLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TGlzdGVuZXIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge1NpZ25hbH0gU2lnbmFsIHRoYXQgbGlzdGVuZXIgaXMgY3VycmVudGx5IGJvdW5kIHRvLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2lnbmFsIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25hbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZXRlIGluc3RhbmNlIHByb3BlcnRpZXNcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9kZXN0cm95IDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3NpZ25hbDtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcjtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gU3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3QuXG4gICAgICAgICAqL1xuICAgICAgICB0b1N0cmluZyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnW1NpZ25hbEJpbmRpbmcgaXNPbmNlOicgKyB0aGlzLl9pc09uY2UgKycsIGlzQm91bmQ6JysgdGhpcy5pc0JvdW5kKCkgKycsIGFjdGl2ZTonICsgdGhpcy5hY3RpdmUgKyAnXSc7XG4gICAgICAgIH1cblxuICAgIH07XG5cblxuLypnbG9iYWwgU2lnbmFsQmluZGluZzpmYWxzZSovXG5cbiAgICAvLyBTaWduYWwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlTGlzdGVuZXIobGlzdGVuZXIsIGZuTmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdsaXN0ZW5lciBpcyBhIHJlcXVpcmVkIHBhcmFtIG9mIHtmbn0oKSBhbmQgc2hvdWxkIGJlIGEgRnVuY3Rpb24uJy5yZXBsYWNlKCd7Zm59JywgZm5OYW1lKSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGV2ZW50IGJyb2FkY2FzdGVyXG4gICAgICogPGJyIC8+LSBpbnNwaXJlZCBieSBSb2JlcnQgUGVubmVyJ3MgQVMzIFNpZ25hbHMuXG4gICAgICogQG5hbWUgU2lnbmFsXG4gICAgICogQGF1dGhvciBNaWxsZXIgTWVkZWlyb3NcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTaWduYWwoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSBBcnJheS48U2lnbmFsQmluZGluZz5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2JpbmRpbmdzID0gW107XG4gICAgICAgIHRoaXMuX3ByZXZQYXJhbXMgPSBudWxsO1xuXG4gICAgICAgIC8vIGVuZm9yY2UgZGlzcGF0Y2ggdG8gYXdheXMgd29yayBvbiBzYW1lIGNvbnRleHQgKCM0NylcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpc3BhdGNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFNpZ25hbC5wcm90b3R5cGUuZGlzcGF0Y2guYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBTaWduYWwucHJvdG90eXBlID0ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaWduYWxzIFZlcnNpb24gTnVtYmVyXG4gICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgKiBAY29uc3RcbiAgICAgICAgICovXG4gICAgICAgIFZFUlNJT04gOiAnMS4wLjAnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBTaWduYWwgc2hvdWxkIGtlZXAgcmVjb3JkIG9mIHByZXZpb3VzbHkgZGlzcGF0Y2hlZCBwYXJhbWV0ZXJzIGFuZFxuICAgICAgICAgKiBhdXRvbWF0aWNhbGx5IGV4ZWN1dGUgbGlzdGVuZXIgZHVyaW5nIGBhZGQoKWAvYGFkZE9uY2UoKWAgaWYgU2lnbmFsIHdhc1xuICAgICAgICAgKiBhbHJlYWR5IGRpc3BhdGNoZWQgYmVmb3JlLlxuICAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBtZW1vcml6ZSA6IGZhbHNlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfc2hvdWxkUHJvcGFnYXRlIDogdHJ1ZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgU2lnbmFsIGlzIGFjdGl2ZSBhbmQgc2hvdWxkIGJyb2FkY2FzdCBldmVudHMuXG4gICAgICAgICAqIDxwPjxzdHJvbmc+SU1QT1JUQU5UOjwvc3Ryb25nPiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgZHVyaW5nIGEgZGlzcGF0Y2ggd2lsbCBvbmx5IGFmZmVjdCB0aGUgbmV4dCBkaXNwYXRjaCwgaWYgeW91IHdhbnQgdG8gc3RvcCB0aGUgcHJvcGFnYXRpb24gb2YgYSBzaWduYWwgdXNlIGBoYWx0KClgIGluc3RlYWQuPC9wPlxuICAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmUgOiB0cnVlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT25jZVxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW2xpc3RlbmVyQ29udGV4dF1cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IFtwcmlvcml0eV1cbiAgICAgICAgICogQHJldHVybiB7U2lnbmFsQmluZGluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9yZWdpc3Rlckxpc3RlbmVyIDogZnVuY3Rpb24gKGxpc3RlbmVyLCBpc09uY2UsIGxpc3RlbmVyQ29udGV4dCwgcHJpb3JpdHkpIHtcblxuICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuX2luZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lciwgbGlzdGVuZXJDb250ZXh0KSxcbiAgICAgICAgICAgICAgICBiaW5kaW5nO1xuXG4gICAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGJpbmRpbmcgPSB0aGlzLl9iaW5kaW5nc1twcmV2SW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChiaW5kaW5nLmlzT25jZSgpICE9PSBpc09uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGFkZCcrIChpc09uY2U/ICcnIDogJ09uY2UnKSArJygpIHRoZW4gYWRkJysgKCFpc09uY2U/ICcnIDogJ09uY2UnKSArJygpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJpbmRpbmcgPSBuZXcgU2lnbmFsQmluZGluZyh0aGlzLCBsaXN0ZW5lciwgaXNPbmNlLCBsaXN0ZW5lckNvbnRleHQsIHByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRCaW5kaW5nKGJpbmRpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLm1lbW9yaXplICYmIHRoaXMuX3ByZXZQYXJhbXMpe1xuICAgICAgICAgICAgICAgIGJpbmRpbmcuZXhlY3V0ZSh0aGlzLl9wcmV2UGFyYW1zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7U2lnbmFsQmluZGluZ30gYmluZGluZ1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2FkZEJpbmRpbmcgOiBmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgLy9zaW1wbGlmaWVkIGluc2VydGlvbiBzb3J0XG4gICAgICAgICAgICB2YXIgbiA9IHRoaXMuX2JpbmRpbmdzLmxlbmd0aDtcbiAgICAgICAgICAgIGRvIHsgLS1uOyB9IHdoaWxlICh0aGlzLl9iaW5kaW5nc1tuXSAmJiBiaW5kaW5nLl9wcmlvcml0eSA8PSB0aGlzLl9iaW5kaW5nc1tuXS5fcHJpb3JpdHkpO1xuICAgICAgICAgICAgdGhpcy5fYmluZGluZ3Muc3BsaWNlKG4gKyAxLCAwLCBiaW5kaW5nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2luZGV4T2ZMaXN0ZW5lciA6IGZ1bmN0aW9uIChsaXN0ZW5lciwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIG4gPSB0aGlzLl9iaW5kaW5ncy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgY3VyO1xuICAgICAgICAgICAgd2hpbGUgKG4tLSkge1xuICAgICAgICAgICAgICAgIGN1ciA9IHRoaXMuX2JpbmRpbmdzW25dO1xuICAgICAgICAgICAgICAgIGlmIChjdXIuX2xpc3RlbmVyID09PSBsaXN0ZW5lciAmJiBjdXIuY29udGV4dCA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGxpc3RlbmVyIHdhcyBhdHRhY2hlZCB0byBTaWduYWwuXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF1cbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gaWYgU2lnbmFsIGhhcyB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgaGFzIDogZnVuY3Rpb24gKGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyLCBjb250ZXh0KSAhPT0gLTE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBhIGxpc3RlbmVyIHRvIHRoZSBzaWduYWwuXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFNpZ25hbCBoYW5kbGVyIGZ1bmN0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW2xpc3RlbmVyQ29udGV4dF0gQ29udGV4dCBvbiB3aGljaCBsaXN0ZW5lciB3aWxsIGJlIGV4ZWN1dGVkIChvYmplY3QgdGhhdCBzaG91bGQgcmVwcmVzZW50IHRoZSBgdGhpc2AgdmFyaWFibGUgaW5zaWRlIGxpc3RlbmVyIGZ1bmN0aW9uKS5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IFtwcmlvcml0eV0gVGhlIHByaW9yaXR5IGxldmVsIG9mIHRoZSBldmVudCBsaXN0ZW5lci4gTGlzdGVuZXJzIHdpdGggaGlnaGVyIHByaW9yaXR5IHdpbGwgYmUgZXhlY3V0ZWQgYmVmb3JlIGxpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXR5LiBMaXN0ZW5lcnMgd2l0aCBzYW1lIHByaW9yaXR5IGxldmVsIHdpbGwgYmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgb3JkZXIgYXMgdGhleSB3ZXJlIGFkZGVkLiAoZGVmYXVsdCA9IDApXG4gICAgICAgICAqIEByZXR1cm4ge1NpZ25hbEJpbmRpbmd9IEFuIE9iamVjdCByZXByZXNlbnRpbmcgdGhlIGJpbmRpbmcgYmV0d2VlbiB0aGUgU2lnbmFsIGFuZCBsaXN0ZW5lci5cbiAgICAgICAgICovXG4gICAgICAgIGFkZCA6IGZ1bmN0aW9uIChsaXN0ZW5lciwgbGlzdGVuZXJDb250ZXh0LCBwcmlvcml0eSkge1xuICAgICAgICAgICAgdmFsaWRhdGVMaXN0ZW5lcihsaXN0ZW5lciwgJ2FkZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIGZhbHNlLCBsaXN0ZW5lckNvbnRleHQsIHByaW9yaXR5KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGxpc3RlbmVyIHRvIHRoZSBzaWduYWwgdGhhdCBzaG91bGQgYmUgcmVtb3ZlZCBhZnRlciBmaXJzdCBleGVjdXRpb24gKHdpbGwgYmUgZXhlY3V0ZWQgb25seSBvbmNlKS5cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgU2lnbmFsIGhhbmRsZXIgZnVuY3Rpb24uXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbbGlzdGVuZXJDb250ZXh0XSBDb250ZXh0IG9uIHdoaWNoIGxpc3RlbmVyIHdpbGwgYmUgZXhlY3V0ZWQgKG9iamVjdCB0aGF0IHNob3VsZCByZXByZXNlbnQgdGhlIGB0aGlzYCB2YXJpYWJsZSBpbnNpZGUgbGlzdGVuZXIgZnVuY3Rpb24pLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ByaW9yaXR5XSBUaGUgcHJpb3JpdHkgbGV2ZWwgb2YgdGhlIGV2ZW50IGxpc3RlbmVyLiBMaXN0ZW5lcnMgd2l0aCBoaWdoZXIgcHJpb3JpdHkgd2lsbCBiZSBleGVjdXRlZCBiZWZvcmUgbGlzdGVuZXJzIHdpdGggbG93ZXIgcHJpb3JpdHkuIExpc3RlbmVycyB3aXRoIHNhbWUgcHJpb3JpdHkgbGV2ZWwgd2lsbCBiZSBleGVjdXRlZCBhdCB0aGUgc2FtZSBvcmRlciBhcyB0aGV5IHdlcmUgYWRkZWQuIChkZWZhdWx0ID0gMClcbiAgICAgICAgICogQHJldHVybiB7U2lnbmFsQmluZGluZ30gQW4gT2JqZWN0IHJlcHJlc2VudGluZyB0aGUgYmluZGluZyBiZXR3ZWVuIHRoZSBTaWduYWwgYW5kIGxpc3RlbmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgYWRkT25jZSA6IGZ1bmN0aW9uIChsaXN0ZW5lciwgbGlzdGVuZXJDb250ZXh0LCBwcmlvcml0eSkge1xuICAgICAgICAgICAgdmFsaWRhdGVMaXN0ZW5lcihsaXN0ZW5lciwgJ2FkZE9uY2UnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyLCB0cnVlLCBsaXN0ZW5lckNvbnRleHQsIHByaW9yaXR5KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGEgc2luZ2xlIGxpc3RlbmVyIGZyb20gdGhlIGRpc3BhdGNoIHF1ZXVlLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBIYW5kbGVyIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIHJlbW92ZWQuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF0gRXhlY3V0aW9uIGNvbnRleHQgKHNpbmNlIHlvdSBjYW4gYWRkIHRoZSBzYW1lIGhhbmRsZXIgbXVsdGlwbGUgdGltZXMgaWYgZXhlY3V0aW5nIGluIGEgZGlmZmVyZW50IGNvbnRleHQpLlxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gTGlzdGVuZXIgaGFuZGxlciBmdW5jdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZSA6IGZ1bmN0aW9uIChsaXN0ZW5lciwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFsaWRhdGVMaXN0ZW5lcihsaXN0ZW5lciwgJ3JlbW92ZScpO1xuXG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuX2luZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lciwgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kaW5nc1tpXS5fZGVzdHJveSgpOyAvL25vIHJlYXNvbiB0byBhIFNpZ25hbEJpbmRpbmcgZXhpc3QgaWYgaXQgaXNuJ3QgYXR0YWNoZWQgdG8gYSBzaWduYWxcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kaW5ncy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gdGhlIFNpZ25hbC5cbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZUFsbCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuID0gdGhpcy5fYmluZGluZ3MubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKG4tLSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdzW25dLl9kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9iaW5kaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IE51bWJlciBvZiBsaXN0ZW5lcnMgYXR0YWNoZWQgdG8gdGhlIFNpZ25hbC5cbiAgICAgICAgICovXG4gICAgICAgIGdldE51bUxpc3RlbmVycyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5ncy5sZW5ndGg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGV2ZW50LCBibG9ja2luZyB0aGUgZGlzcGF0Y2ggdG8gbmV4dCBsaXN0ZW5lcnMgb24gdGhlIHF1ZXVlLlxuICAgICAgICAgKiA8cD48c3Ryb25nPklNUE9SVEFOVDo8L3N0cm9uZz4gc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGR1cmluZyBzaWduYWwgZGlzcGF0Y2gsIGNhbGxpbmcgaXQgYmVmb3JlL2FmdGVyIGRpc3BhdGNoIHdvbid0IGFmZmVjdCBzaWduYWwgYnJvYWRjYXN0LjwvcD5cbiAgICAgICAgICogQHNlZSBTaWduYWwucHJvdG90eXBlLmRpc2FibGVcbiAgICAgICAgICovXG4gICAgICAgIGhhbHQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG91bGRQcm9wYWdhdGUgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGF0Y2gvQnJvYWRjYXN0IFNpZ25hbCB0byBhbGwgbGlzdGVuZXJzIGFkZGVkIHRvIHRoZSBxdWV1ZS5cbiAgICAgICAgICogQHBhcmFtIHsuLi4qfSBbcGFyYW1zXSBQYXJhbWV0ZXJzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byBlYWNoIGhhbmRsZXIuXG4gICAgICAgICAqL1xuICAgICAgICBkaXNwYXRjaCA6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICghIHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGFyYW1zQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBuID0gdGhpcy5fYmluZGluZ3MubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGJpbmRpbmdzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tZW1vcml6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZQYXJhbXMgPSBwYXJhbXNBcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIG4pIHtcbiAgICAgICAgICAgICAgICAvL3Nob3VsZCBjb21lIGFmdGVyIG1lbW9yaXplXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiaW5kaW5ncyA9IHRoaXMuX2JpbmRpbmdzLnNsaWNlKCk7IC8vY2xvbmUgYXJyYXkgaW4gY2FzZSBhZGQvcmVtb3ZlIGl0ZW1zIGR1cmluZyBkaXNwYXRjaFxuICAgICAgICAgICAgdGhpcy5fc2hvdWxkUHJvcGFnYXRlID0gdHJ1ZTsgLy9pbiBjYXNlIGBoYWx0YCB3YXMgY2FsbGVkIGJlZm9yZSBkaXNwYXRjaCBvciBkdXJpbmcgdGhlIHByZXZpb3VzIGRpc3BhdGNoLlxuXG4gICAgICAgICAgICAvL2V4ZWN1dGUgYWxsIGNhbGxiYWNrcyB1bnRpbCBlbmQgb2YgdGhlIGxpc3Qgb3IgdW50aWwgYSBjYWxsYmFjayByZXR1cm5zIGBmYWxzZWAgb3Igc3RvcHMgcHJvcGFnYXRpb25cbiAgICAgICAgICAgIC8vcmV2ZXJzZSBsb29wIHNpbmNlIGxpc3RlbmVycyB3aXRoIGhpZ2hlciBwcmlvcml0eSB3aWxsIGJlIGFkZGVkIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgICAgIGRvIHsgbi0tOyB9IHdoaWxlIChiaW5kaW5nc1tuXSAmJiB0aGlzLl9zaG91bGRQcm9wYWdhdGUgJiYgYmluZGluZ3Nbbl0uZXhlY3V0ZShwYXJhbXNBcnIpICE9PSBmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvcmdldCBtZW1vcml6ZWQgYXJndW1lbnRzLlxuICAgICAgICAgKiBAc2VlIFNpZ25hbC5tZW1vcml6ZVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yZ2V0IDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZQYXJhbXMgPSBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgYWxsIGJpbmRpbmdzIGZyb20gc2lnbmFsIGFuZCBkZXN0cm95IGFueSByZWZlcmVuY2UgdG8gZXh0ZXJuYWwgb2JqZWN0cyAoZGVzdHJveSBTaWduYWwgb2JqZWN0KS5cbiAgICAgICAgICogPHA+PHN0cm9uZz5JTVBPUlRBTlQ6PC9zdHJvbmc+IGNhbGxpbmcgYW55IG1ldGhvZCBvbiB0aGUgc2lnbmFsIGluc3RhbmNlIGFmdGVyIGNhbGxpbmcgZGlzcG9zZSB3aWxsIHRocm93IGVycm9ycy48L3A+XG4gICAgICAgICAqL1xuICAgICAgICBkaXNwb3NlIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9iaW5kaW5ncztcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2UGFyYW1zO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgKi9cbiAgICAgICAgdG9TdHJpbmcgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tTaWduYWwgYWN0aXZlOicrIHRoaXMuYWN0aXZlICsnIG51bUxpc3RlbmVyczonKyB0aGlzLmdldE51bUxpc3RlbmVycygpICsnXSc7XG4gICAgICAgIH1cblxuICAgIH07XG5cblxuICAgIC8vIE5hbWVzcGFjZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogU2lnbmFscyBuYW1lc3BhY2VcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG5hbWUgc2lnbmFsc1xuICAgICAqL1xuICAgIHZhciBzaWduYWxzID0gU2lnbmFsO1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGV2ZW50IGJyb2FkY2FzdGVyXG4gICAgICogQHNlZSBTaWduYWxcbiAgICAgKi9cbiAgICAvLyBhbGlhcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgKHNlZSAjZ2gtNDQpXG4gICAgc2lnbmFscy5TaWduYWwgPSBTaWduYWw7XG5cblxuXG4gICAgLy9leHBvcnRzIHRvIG11bHRpcGxlIGVudmlyb25tZW50c1xuICAgIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCl7IC8vQU1EXG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBzaWduYWxzOyB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKXsgLy9ub2RlXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gc2lnbmFscztcbiAgICB9IGVsc2UgeyAvL2Jyb3dzZXJcbiAgICAgICAgLy91c2Ugc3RyaW5nIGJlY2F1c2Ugb2YgR29vZ2xlIGNsb3N1cmUgY29tcGlsZXIgQURWQU5DRURfTU9ERVxuICAgICAgICAvKmpzbGludCBzdWI6dHJ1ZSAqL1xuICAgICAgICBnbG9iYWxbJ3NpZ25hbHMnXSA9IHNpZ25hbHM7XG4gICAgfVxuXG59KHRoaXMpKTtcbiIsIi8qKiFcbiAqIFNvcnRhYmxlXG4gKiBAYXV0aG9yXHRSdWJhWGEgICA8dHJhc2hAcnViYXhhLm9yZz5cbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9IFwidW5kZWZpbmVkXCIpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgUGFja2FnZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFNvcnRhYmxlID0gZmFjdG9yeSgpOyAgLy8gZXhwb3J0IGZvciBNZXRlb3IuanNcblx0fVxuXHRlbHNlIHtcblx0XHQvKiBqc2hpbnQgc3ViOnRydWUgKi9cblx0XHR3aW5kb3dbXCJTb3J0YWJsZVwiXSA9IGZhY3RvcnkoKTtcblx0fVxufSkoZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgZHJhZ0VsLFxuXHRcdHBhcmVudEVsLFxuXHRcdGdob3N0RWwsXG5cdFx0Y2xvbmVFbCxcblx0XHRyb290RWwsXG5cdFx0bmV4dEVsLFxuXG5cdFx0c2Nyb2xsRWwsXG5cdFx0c2Nyb2xsUGFyZW50RWwsXG5cblx0XHRsYXN0RWwsXG5cdFx0bGFzdENTUyxcblx0XHRsYXN0UGFyZW50Q1NTLFxuXG5cdFx0b2xkSW5kZXgsXG5cdFx0bmV3SW5kZXgsXG5cblx0XHRhY3RpdmVHcm91cCxcblx0XHRhdXRvU2Nyb2xsID0ge30sXG5cblx0XHR0YXBFdnQsXG5cdFx0dG91Y2hFdnQsXG5cblx0XHRtb3ZlZCxcblxuXHRcdC8qKiBAY29uc3QgKi9cblx0XHRSU1BBQ0UgPSAvXFxzKy9nLFxuXG5cdFx0ZXhwYW5kbyA9ICdTb3J0YWJsZScgKyAobmV3IERhdGUpLmdldFRpbWUoKSxcblxuXHRcdHdpbiA9IHdpbmRvdyxcblx0XHRkb2N1bWVudCA9IHdpbi5kb2N1bWVudCxcblx0XHRwYXJzZUludCA9IHdpbi5wYXJzZUludCxcblxuXHRcdHN1cHBvcnREcmFnZ2FibGUgPSAhISgnZHJhZ2dhYmxlJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSksXG5cdFx0c3VwcG9ydENzc1BvaW50ZXJFdmVudHMgPSAoZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcblx0XHRcdGVsLnN0eWxlLmNzc1RleHQgPSAncG9pbnRlci1ldmVudHM6YXV0byc7XG5cdFx0XHRyZXR1cm4gZWwuc3R5bGUucG9pbnRlckV2ZW50cyA9PT0gJ2F1dG8nO1xuXHRcdH0pKCksXG5cblx0XHRfc2lsZW50ID0gZmFsc2UsXG5cblx0XHRhYnMgPSBNYXRoLmFicyxcblx0XHRzbGljZSA9IFtdLnNsaWNlLFxuXG5cdFx0dG91Y2hEcmFnT3Zlckxpc3RlbmVycyA9IFtdLFxuXG5cdFx0X2F1dG9TY3JvbGwgPSBfdGhyb3R0bGUoZnVuY3Rpb24gKC8qKkV2ZW50Ki9ldnQsIC8qKk9iamVjdCovb3B0aW9ucywgLyoqSFRNTEVsZW1lbnQqL3Jvb3RFbCkge1xuXHRcdFx0Ly8gQnVnOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01MDU1MjFcblx0XHRcdGlmIChyb290RWwgJiYgb3B0aW9ucy5zY3JvbGwpIHtcblx0XHRcdFx0dmFyIGVsLFxuXHRcdFx0XHRcdHJlY3QsXG5cdFx0XHRcdFx0c2VucyA9IG9wdGlvbnMuc2Nyb2xsU2Vuc2l0aXZpdHksXG5cdFx0XHRcdFx0c3BlZWQgPSBvcHRpb25zLnNjcm9sbFNwZWVkLFxuXG5cdFx0XHRcdFx0eCA9IGV2dC5jbGllbnRYLFxuXHRcdFx0XHRcdHkgPSBldnQuY2xpZW50WSxcblxuXHRcdFx0XHRcdHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG5cdFx0XHRcdFx0d2luSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0LFxuXG5cdFx0XHRcdFx0dngsXG5cdFx0XHRcdFx0dnlcblx0XHRcdFx0O1xuXG5cdFx0XHRcdC8vIERlbGVjdCBzY3JvbGxFbFxuXHRcdFx0XHRpZiAoc2Nyb2xsUGFyZW50RWwgIT09IHJvb3RFbCkge1xuXHRcdFx0XHRcdHNjcm9sbEVsID0gb3B0aW9ucy5zY3JvbGw7XG5cdFx0XHRcdFx0c2Nyb2xsUGFyZW50RWwgPSByb290RWw7XG5cblx0XHRcdFx0XHRpZiAoc2Nyb2xsRWwgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdHNjcm9sbEVsID0gcm9vdEVsO1xuXG5cdFx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHRcdGlmICgoc2Nyb2xsRWwub2Zmc2V0V2lkdGggPCBzY3JvbGxFbC5zY3JvbGxXaWR0aCkgfHxcblx0XHRcdFx0XHRcdFx0XHQoc2Nyb2xsRWwub2Zmc2V0SGVpZ2h0IDwgc2Nyb2xsRWwuc2Nyb2xsSGVpZ2h0KVxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cdFx0XHRcdFx0XHR9IHdoaWxlIChzY3JvbGxFbCA9IHNjcm9sbEVsLnBhcmVudE5vZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzY3JvbGxFbCkge1xuXHRcdFx0XHRcdGVsID0gc2Nyb2xsRWw7XG5cdFx0XHRcdFx0cmVjdCA9IHNjcm9sbEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdHZ4ID0gKGFicyhyZWN0LnJpZ2h0IC0geCkgPD0gc2VucykgLSAoYWJzKHJlY3QubGVmdCAtIHgpIDw9IHNlbnMpO1xuXHRcdFx0XHRcdHZ5ID0gKGFicyhyZWN0LmJvdHRvbSAtIHkpIDw9IHNlbnMpIC0gKGFicyhyZWN0LnRvcCAtIHkpIDw9IHNlbnMpO1xuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHRpZiAoISh2eCB8fCB2eSkpIHtcblx0XHRcdFx0XHR2eCA9ICh3aW5XaWR0aCAtIHggPD0gc2VucykgLSAoeCA8PSBzZW5zKTtcblx0XHRcdFx0XHR2eSA9ICh3aW5IZWlnaHQgLSB5IDw9IHNlbnMpIC0gKHkgPD0gc2Vucyk7XG5cblx0XHRcdFx0XHQvKiBqc2hpbnQgZXhwcjp0cnVlICovXG5cdFx0XHRcdFx0KHZ4IHx8IHZ5KSAmJiAoZWwgPSB3aW4pO1xuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHRpZiAoYXV0b1Njcm9sbC52eCAhPT0gdnggfHwgYXV0b1Njcm9sbC52eSAhPT0gdnkgfHwgYXV0b1Njcm9sbC5lbCAhPT0gZWwpIHtcblx0XHRcdFx0XHRhdXRvU2Nyb2xsLmVsID0gZWw7XG5cdFx0XHRcdFx0YXV0b1Njcm9sbC52eCA9IHZ4O1xuXHRcdFx0XHRcdGF1dG9TY3JvbGwudnkgPSB2eTtcblxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoYXV0b1Njcm9sbC5waWQpO1xuXG5cdFx0XHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdFx0XHRhdXRvU2Nyb2xsLnBpZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGVsID09PSB3aW4pIHtcblx0XHRcdFx0XHRcdFx0XHR3aW4uc2Nyb2xsVG8od2luLnBhZ2VYT2Zmc2V0ICsgdnggKiBzcGVlZCwgd2luLnBhZ2VZT2Zmc2V0ICsgdnkgKiBzcGVlZCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dnkgJiYgKGVsLnNjcm9sbFRvcCArPSB2eSAqIHNwZWVkKTtcblx0XHRcdFx0XHRcdFx0XHR2eCAmJiAoZWwuc2Nyb2xsTGVmdCArPSB2eCAqIHNwZWVkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwgMjQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIDMwKSxcblxuXHRcdF9wcmVwYXJlR3JvdXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0dmFyIGdyb3VwID0gb3B0aW9ucy5ncm91cDtcblxuXHRcdFx0aWYgKCFncm91cCB8fCB0eXBlb2YgZ3JvdXAgIT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Z3JvdXAgPSBvcHRpb25zLmdyb3VwID0ge25hbWU6IGdyb3VwfTtcblx0XHRcdH1cblxuXHRcdFx0WydwdWxsJywgJ3B1dCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRpZiAoIShrZXkgaW4gZ3JvdXApKSB7XG5cdFx0XHRcdFx0Z3JvdXBba2V5XSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRvcHRpb25zLmdyb3VwcyA9ICcgJyArIGdyb3VwLm5hbWUgKyAoZ3JvdXAucHV0LmpvaW4gPyAnICcgKyBncm91cC5wdXQuam9pbignICcpIDogJycpICsgJyAnO1xuXHRcdH1cblx0O1xuXG5cblxuXHQvKipcblx0ICogQGNsYXNzICBTb3J0YWJsZVxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gIGVsXG5cdCAqIEBwYXJhbSAge09iamVjdH0gICAgICAgW29wdGlvbnNdXG5cdCAqL1xuXHRmdW5jdGlvbiBTb3J0YWJsZShlbCwgb3B0aW9ucykge1xuXHRcdGlmICghKGVsICYmIGVsLm5vZGVUeXBlICYmIGVsLm5vZGVUeXBlID09PSAxKSkge1xuXHRcdFx0dGhyb3cgJ1NvcnRhYmxlOiBgZWxgIG11c3QgYmUgSFRNTEVsZW1lbnQsIGFuZCBub3QgJyArIHt9LnRvU3RyaW5nLmNhbGwoZWwpO1xuXHRcdH1cblxuXHRcdHRoaXMuZWwgPSBlbDsgLy8gcm9vdCBlbGVtZW50XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucyA9IF9leHRlbmQoe30sIG9wdGlvbnMpO1xuXG5cblx0XHQvLyBFeHBvcnQgaW5zdGFuY2Vcblx0XHRlbFtleHBhbmRvXSA9IHRoaXM7XG5cblxuXHRcdC8vIERlZmF1bHQgb3B0aW9uc1xuXHRcdHZhciBkZWZhdWx0cyA9IHtcblx0XHRcdGdyb3VwOiBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0c29ydDogdHJ1ZSxcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdHN0b3JlOiBudWxsLFxuXHRcdFx0aGFuZGxlOiBudWxsLFxuXHRcdFx0c2Nyb2xsOiB0cnVlLFxuXHRcdFx0c2Nyb2xsU2Vuc2l0aXZpdHk6IDMwLFxuXHRcdFx0c2Nyb2xsU3BlZWQ6IDEwLFxuXHRcdFx0ZHJhZ2dhYmxlOiAvW3VvXWwvaS50ZXN0KGVsLm5vZGVOYW1lKSA/ICdsaScgOiAnPionLFxuXHRcdFx0Z2hvc3RDbGFzczogJ3NvcnRhYmxlLWdob3N0Jyxcblx0XHRcdGNob3NlbkNsYXNzOiAnc29ydGFibGUtY2hvc2VuJyxcblx0XHRcdGlnbm9yZTogJ2EsIGltZycsXG5cdFx0XHRmaWx0ZXI6IG51bGwsXG5cdFx0XHRhbmltYXRpb246IDAsXG5cdFx0XHRzZXREYXRhOiBmdW5jdGlvbiAoZGF0YVRyYW5zZmVyLCBkcmFnRWwpIHtcblx0XHRcdFx0ZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCBkcmFnRWwudGV4dENvbnRlbnQpO1xuXHRcdFx0fSxcblx0XHRcdGRyb3BCdWJibGU6IGZhbHNlLFxuXHRcdFx0ZHJhZ292ZXJCdWJibGU6IGZhbHNlLFxuXHRcdFx0ZGF0YUlkQXR0cjogJ2RhdGEtaWQnLFxuXHRcdFx0ZGVsYXk6IDAsXG5cdFx0XHRmb3JjZUZhbGxiYWNrOiBmYWxzZSxcblx0XHRcdGZhbGxiYWNrQ2xhc3M6ICdzb3J0YWJsZS1mYWxsYmFjaycsXG5cdFx0XHRmYWxsYmFja09uQm9keTogZmFsc2Vcblx0XHR9O1xuXG5cblx0XHQvLyBTZXQgZGVmYXVsdCBvcHRpb25zXG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBkZWZhdWx0cykge1xuXHRcdFx0IShuYW1lIGluIG9wdGlvbnMpICYmIChvcHRpb25zW25hbWVdID0gZGVmYXVsdHNbbmFtZV0pO1xuXHRcdH1cblxuXHRcdF9wcmVwYXJlR3JvdXAob3B0aW9ucyk7XG5cblx0XHQvLyBCaW5kIGFsbCBwcml2YXRlIG1ldGhvZHNcblx0XHRmb3IgKHZhciBmbiBpbiB0aGlzKSB7XG5cdFx0XHRpZiAoZm4uY2hhckF0KDApID09PSAnXycpIHtcblx0XHRcdFx0dGhpc1tmbl0gPSB0aGlzW2ZuXS5iaW5kKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldHVwIGRyYWcgbW9kZVxuXHRcdHRoaXMubmF0aXZlRHJhZ2dhYmxlID0gb3B0aW9ucy5mb3JjZUZhbGxiYWNrID8gZmFsc2UgOiBzdXBwb3J0RHJhZ2dhYmxlO1xuXG5cdFx0Ly8gQmluZCBldmVudHNcblx0XHRfb24oZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vblRhcFN0YXJ0KTtcblx0XHRfb24oZWwsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25UYXBTdGFydCk7XG5cblx0XHRpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcblx0XHRcdF9vbihlbCwgJ2RyYWdvdmVyJywgdGhpcyk7XG5cdFx0XHRfb24oZWwsICdkcmFnZW50ZXInLCB0aGlzKTtcblx0XHR9XG5cblx0XHR0b3VjaERyYWdPdmVyTGlzdGVuZXJzLnB1c2godGhpcy5fb25EcmFnT3Zlcik7XG5cblx0XHQvLyBSZXN0b3JlIHNvcnRpbmdcblx0XHRvcHRpb25zLnN0b3JlICYmIHRoaXMuc29ydChvcHRpb25zLnN0b3JlLmdldCh0aGlzKSk7XG5cdH1cblxuXG5cdFNvcnRhYmxlLnByb3RvdHlwZSA9IC8qKiBAbGVuZHMgU29ydGFibGUucHJvdG90eXBlICovIHtcblx0XHRjb25zdHJ1Y3RvcjogU29ydGFibGUsXG5cblx0XHRfb25UYXBTdGFydDogZnVuY3Rpb24gKC8qKiBFdmVudHxUb3VjaEV2ZW50ICovZXZ0KSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzLFxuXHRcdFx0XHRlbCA9IHRoaXMuZWwsXG5cdFx0XHRcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG5cdFx0XHRcdHR5cGUgPSBldnQudHlwZSxcblx0XHRcdFx0dG91Y2ggPSBldnQudG91Y2hlcyAmJiBldnQudG91Y2hlc1swXSxcblx0XHRcdFx0dGFyZ2V0ID0gKHRvdWNoIHx8IGV2dCkudGFyZ2V0LFxuXHRcdFx0XHRvcmlnaW5hbFRhcmdldCA9IHRhcmdldCxcblx0XHRcdFx0ZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG5cblxuXHRcdFx0aWYgKHR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2dC5idXR0b24gIT09IDAgfHwgb3B0aW9ucy5kaXNhYmxlZCkge1xuXHRcdFx0XHRyZXR1cm47IC8vIG9ubHkgbGVmdCBidXR0b24gb3IgZW5hYmxlZFxuXHRcdFx0fVxuXG5cdFx0XHR0YXJnZXQgPSBfY2xvc2VzdCh0YXJnZXQsIG9wdGlvbnMuZHJhZ2dhYmxlLCBlbCk7XG5cblx0XHRcdGlmICghdGFyZ2V0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgZHJhZ2dlZCBlbGVtZW50IHdpdGhpbiBpdHMgcGFyZW50XG5cdFx0XHRvbGRJbmRleCA9IF9pbmRleCh0YXJnZXQpO1xuXG5cdFx0XHQvLyBDaGVjayBmaWx0ZXJcblx0XHRcdGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGlmIChmaWx0ZXIuY2FsbCh0aGlzLCBldnQsIHRhcmdldCwgdGhpcykpIHtcblx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudChfdGhpcywgb3JpZ2luYWxUYXJnZXQsICdmaWx0ZXInLCB0YXJnZXQsIGVsLCBvbGRJbmRleCk7XG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuOyAvLyBjYW5jZWwgZG5kXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGZpbHRlcikge1xuXHRcdFx0XHRmaWx0ZXIgPSBmaWx0ZXIuc3BsaXQoJywnKS5zb21lKGZ1bmN0aW9uIChjcml0ZXJpYSkge1xuXHRcdFx0XHRcdGNyaXRlcmlhID0gX2Nsb3Nlc3Qob3JpZ2luYWxUYXJnZXQsIGNyaXRlcmlhLnRyaW0oKSwgZWwpO1xuXG5cdFx0XHRcdFx0aWYgKGNyaXRlcmlhKSB7XG5cdFx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudChfdGhpcywgY3JpdGVyaWEsICdmaWx0ZXInLCB0YXJnZXQsIGVsLCBvbGRJbmRleCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChmaWx0ZXIpIHtcblx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRyZXR1cm47IC8vIGNhbmNlbCBkbmRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cblx0XHRcdGlmIChvcHRpb25zLmhhbmRsZSAmJiAhX2Nsb3Nlc3Qob3JpZ2luYWxUYXJnZXQsIG9wdGlvbnMuaGFuZGxlLCBlbCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8vIFByZXBhcmUgYGRyYWdzdGFydGBcblx0XHRcdHRoaXMuX3ByZXBhcmVEcmFnU3RhcnQoZXZ0LCB0b3VjaCwgdGFyZ2V0KTtcblx0XHR9LFxuXG5cdFx0X3ByZXBhcmVEcmFnU3RhcnQ6IGZ1bmN0aW9uICgvKiogRXZlbnQgKi9ldnQsIC8qKiBUb3VjaCAqL3RvdWNoLCAvKiogSFRNTEVsZW1lbnQgKi90YXJnZXQpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXMsXG5cdFx0XHRcdGVsID0gX3RoaXMuZWwsXG5cdFx0XHRcdG9wdGlvbnMgPSBfdGhpcy5vcHRpb25zLFxuXHRcdFx0XHRvd25lckRvY3VtZW50ID0gZWwub3duZXJEb2N1bWVudCxcblx0XHRcdFx0ZHJhZ1N0YXJ0Rm47XG5cblx0XHRcdGlmICh0YXJnZXQgJiYgIWRyYWdFbCAmJiAodGFyZ2V0LnBhcmVudE5vZGUgPT09IGVsKSkge1xuXHRcdFx0XHR0YXBFdnQgPSBldnQ7XG5cblx0XHRcdFx0cm9vdEVsID0gZWw7XG5cdFx0XHRcdGRyYWdFbCA9IHRhcmdldDtcblx0XHRcdFx0cGFyZW50RWwgPSBkcmFnRWwucGFyZW50Tm9kZTtcblx0XHRcdFx0bmV4dEVsID0gZHJhZ0VsLm5leHRTaWJsaW5nO1xuXHRcdFx0XHRhY3RpdmVHcm91cCA9IG9wdGlvbnMuZ3JvdXA7XG5cblx0XHRcdFx0ZHJhZ1N0YXJ0Rm4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gRGVsYXllZCBkcmFnIGhhcyBiZWVuIHRyaWdnZXJlZFxuXHRcdFx0XHRcdC8vIHdlIGNhbiByZS1lbmFibGUgdGhlIGV2ZW50czogdG91Y2htb3ZlL21vdXNlbW92ZVxuXHRcdFx0XHRcdF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcoKTtcblxuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGVsZW1lbnQgZHJhZ2dhYmxlXG5cdFx0XHRcdFx0ZHJhZ0VsLmRyYWdnYWJsZSA9IHRydWU7XG5cblx0XHRcdFx0XHQvLyBDaG9zZW4gaXRlbVxuXHRcdFx0XHRcdF90b2dnbGVDbGFzcyhkcmFnRWwsIF90aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsIHRydWUpO1xuXG5cdFx0XHRcdFx0Ly8gQmluZCB0aGUgZXZlbnRzOiBkcmFnc3RhcnQvZHJhZ2VuZFxuXHRcdFx0XHRcdF90aGlzLl90cmlnZ2VyRHJhZ1N0YXJ0KHRvdWNoKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIFwiZHJhZ2dhYmxlXCJcblx0XHRcdFx0b3B0aW9ucy5pZ25vcmUuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChjcml0ZXJpYSkge1xuXHRcdFx0XHRcdF9maW5kKGRyYWdFbCwgY3JpdGVyaWEudHJpbSgpLCBfZGlzYWJsZURyYWdnYWJsZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAnbW91c2V1cCcsIF90aGlzLl9vbkRyb3ApO1xuXHRcdFx0XHRfb24ob3duZXJEb2N1bWVudCwgJ3RvdWNoZW5kJywgX3RoaXMuX29uRHJvcCk7XG5cdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fb25Ecm9wKTtcblxuXHRcdFx0XHRpZiAob3B0aW9ucy5kZWxheSkge1xuXHRcdFx0XHRcdC8vIElmIHRoZSB1c2VyIG1vdmVzIHRoZSBwb2ludGVyIG9yIGxldCBnbyB0aGUgY2xpY2sgb3IgdG91Y2hcblx0XHRcdFx0XHQvLyBiZWZvcmUgdGhlIGRlbGF5IGhhcyBiZWVuIHJlYWNoZWQ6XG5cdFx0XHRcdFx0Ly8gZGlzYWJsZSB0aGUgZGVsYXllZCBkcmFnXG5cdFx0XHRcdFx0X29uKG93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRcdFx0X29uKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcblx0XHRcdFx0XHRfb24ob3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0XHRcdF9vbihvd25lckRvY3VtZW50LCAndG91Y2htb3ZlJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cblx0XHRcdFx0XHRfdGhpcy5fZHJhZ1N0YXJ0VGltZXIgPSBzZXRUaW1lb3V0KGRyYWdTdGFydEZuLCBvcHRpb25zLmRlbGF5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkcmFnU3RhcnRGbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9kaXNhYmxlRGVsYXllZERyYWc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBvd25lckRvY3VtZW50ID0gdGhpcy5lbC5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fZHJhZ1N0YXJ0VGltZXIpO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRfb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRfb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaGNhbmNlbCcsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG5cdFx0XHRfb2ZmKG93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcblx0XHR9LFxuXG5cdFx0X3RyaWdnZXJEcmFnU3RhcnQ6IGZ1bmN0aW9uICgvKiogVG91Y2ggKi90b3VjaCkge1xuXHRcdFx0aWYgKHRvdWNoKSB7XG5cdFx0XHRcdC8vIFRvdWNoIGRldmljZSBzdXBwb3J0XG5cdFx0XHRcdHRhcEV2dCA9IHtcblx0XHRcdFx0XHR0YXJnZXQ6IGRyYWdFbCxcblx0XHRcdFx0XHRjbGllbnRYOiB0b3VjaC5jbGllbnRYLFxuXHRcdFx0XHRcdGNsaWVudFk6IHRvdWNoLmNsaWVudFlcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLl9vbkRyYWdTdGFydCh0YXBFdnQsICd0b3VjaCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIXRoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG5cdFx0XHRcdHRoaXMuX29uRHJhZ1N0YXJ0KHRhcEV2dCwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0X29uKGRyYWdFbCwgJ2RyYWdlbmQnLCB0aGlzKTtcblx0XHRcdFx0X29uKHJvb3RFbCwgJ2RyYWdzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuXHRcdFx0XHRcdGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9kcmFnU3RhcnRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHJvb3RFbCAmJiBkcmFnRWwpIHtcblx0XHRcdFx0Ly8gQXBwbHkgZWZmZWN0XG5cdFx0XHRcdF90b2dnbGVDbGFzcyhkcmFnRWwsIHRoaXMub3B0aW9ucy5naG9zdENsYXNzLCB0cnVlKTtcblxuXHRcdFx0XHRTb3J0YWJsZS5hY3RpdmUgPSB0aGlzO1xuXG5cdFx0XHRcdC8vIERyYWcgc3RhcnQgZXZlbnRcblx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQodGhpcywgcm9vdEVsLCAnc3RhcnQnLCBkcmFnRWwsIHJvb3RFbCwgb2xkSW5kZXgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfZW11bGF0ZURyYWdPdmVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodG91Y2hFdnQpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2xhc3RYID09PSB0b3VjaEV2dC5jbGllbnRYICYmIHRoaXMuX2xhc3RZID09PSB0b3VjaEV2dC5jbGllbnRZKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fbGFzdFggPSB0b3VjaEV2dC5jbGllbnRYO1xuXHRcdFx0XHR0aGlzLl9sYXN0WSA9IHRvdWNoRXZ0LmNsaWVudFk7XG5cblx0XHRcdFx0aWYgKCFzdXBwb3J0Q3NzUG9pbnRlckV2ZW50cykge1xuXHRcdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2hFdnQuY2xpZW50WCwgdG91Y2hFdnQuY2xpZW50WSksXG5cdFx0XHRcdFx0cGFyZW50ID0gdGFyZ2V0LFxuXHRcdFx0XHRcdGdyb3VwTmFtZSA9ICcgJyArIHRoaXMub3B0aW9ucy5ncm91cC5uYW1lICsgJycsXG5cdFx0XHRcdFx0aSA9IHRvdWNoRHJhZ092ZXJMaXN0ZW5lcnMubGVuZ3RoO1xuXG5cdFx0XHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHRpZiAocGFyZW50W2V4cGFuZG9dICYmIHBhcmVudFtleHBhbmRvXS5vcHRpb25zLmdyb3Vwcy5pbmRleE9mKGdyb3VwTmFtZSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG91Y2hEcmFnT3Zlckxpc3RlbmVyc1tpXSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGllbnRYOiB0b3VjaEV2dC5jbGllbnRYLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xpZW50WTogdG91Y2hFdnQuY2xpZW50WSxcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldDogdGFyZ2V0LFxuXHRcdFx0XHRcdFx0XHRcdFx0cm9vdEVsOiBwYXJlbnRcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0YXJnZXQgPSBwYXJlbnQ7IC8vIHN0b3JlIGxhc3QgZWxlbWVudFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cdFx0XHRcdFx0d2hpbGUgKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghc3VwcG9ydENzc1BvaW50ZXJFdmVudHMpIHtcblx0XHRcdFx0XHRfY3NzKGdob3N0RWwsICdkaXNwbGF5JywgJycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXG5cdFx0X29uVG91Y2hNb3ZlOiBmdW5jdGlvbiAoLyoqVG91Y2hFdmVudCovZXZ0KSB7XG5cdFx0XHRpZiAodGFwRXZ0KSB7XG5cdFx0XHRcdC8vIG9ubHkgc2V0IHRoZSBzdGF0dXMgdG8gZHJhZ2dpbmcsIHdoZW4gd2UgYXJlIGFjdHVhbGx5IGRyYWdnaW5nXG5cdFx0XHRcdGlmICghU29ydGFibGUuYWN0aXZlKSB7XG5cdFx0XHRcdFx0dGhpcy5fZHJhZ1N0YXJ0ZWQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGFzIHdlbGwgYXMgY3JlYXRpbmcgdGhlIGdob3N0IGVsZW1lbnQgb24gdGhlIGRvY3VtZW50IGJvZHlcblx0XHRcdFx0dGhpcy5fYXBwZW5kR2hvc3QoKTtcblxuXHRcdFx0XHR2YXIgdG91Y2ggPSBldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdIDogZXZ0LFxuXHRcdFx0XHRcdGR4ID0gdG91Y2guY2xpZW50WCAtIHRhcEV2dC5jbGllbnRYLFxuXHRcdFx0XHRcdGR5ID0gdG91Y2guY2xpZW50WSAtIHRhcEV2dC5jbGllbnRZLFxuXHRcdFx0XHRcdHRyYW5zbGF0ZTNkID0gZXZ0LnRvdWNoZXMgPyAndHJhbnNsYXRlM2QoJyArIGR4ICsgJ3B4LCcgKyBkeSArICdweCwwKScgOiAndHJhbnNsYXRlKCcgKyBkeCArICdweCwnICsgZHkgKyAncHgpJztcblxuXHRcdFx0XHRtb3ZlZCA9IHRydWU7XG5cdFx0XHRcdHRvdWNoRXZ0ID0gdG91Y2g7XG5cblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnd2Via2l0VHJhbnNmb3JtJywgdHJhbnNsYXRlM2QpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICdtb3pUcmFuc2Zvcm0nLCB0cmFuc2xhdGUzZCk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ21zVHJhbnNmb3JtJywgdHJhbnNsYXRlM2QpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICd0cmFuc2Zvcm0nLCB0cmFuc2xhdGUzZCk7XG5cblx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRHaG9zdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFnaG9zdEVsKSB7XG5cdFx0XHRcdHZhciByZWN0ID0gZHJhZ0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0XHRcdGNzcyA9IF9jc3MoZHJhZ0VsKSxcblx0XHRcdFx0XHRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuXHRcdFx0XHRcdGdob3N0UmVjdDtcblxuXHRcdFx0XHRnaG9zdEVsID0gZHJhZ0VsLmNsb25lTm9kZSh0cnVlKTtcblxuXHRcdFx0XHRfdG9nZ2xlQ2xhc3MoZ2hvc3RFbCwgb3B0aW9ucy5naG9zdENsYXNzLCBmYWxzZSk7XG5cdFx0XHRcdF90b2dnbGVDbGFzcyhnaG9zdEVsLCBvcHRpb25zLmZhbGxiYWNrQ2xhc3MsIHRydWUpO1xuXG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ3RvcCcsIHJlY3QudG9wIC0gcGFyc2VJbnQoY3NzLm1hcmdpblRvcCwgMTApKTtcblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnbGVmdCcsIHJlY3QubGVmdCAtIHBhcnNlSW50KGNzcy5tYXJnaW5MZWZ0LCAxMCkpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICd3aWR0aCcsIHJlY3Qud2lkdGgpO1xuXHRcdFx0XHRfY3NzKGdob3N0RWwsICdoZWlnaHQnLCByZWN0LmhlaWdodCk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ29wYWNpdHknLCAnMC44Jyk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ3pJbmRleCcsICcxMDAwMDAnKTtcblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAncG9pbnRlckV2ZW50cycsICdub25lJyk7XG5cblx0XHRcdFx0b3B0aW9ucy5mYWxsYmFja09uQm9keSAmJiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdob3N0RWwpIHx8IHJvb3RFbC5hcHBlbmRDaGlsZChnaG9zdEVsKTtcblxuXHRcdFx0XHQvLyBGaXhpbmcgZGltZW5zaW9ucy5cblx0XHRcdFx0Z2hvc3RSZWN0ID0gZ2hvc3RFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0X2NzcyhnaG9zdEVsLCAnd2lkdGgnLCByZWN0LndpZHRoICogMiAtIGdob3N0UmVjdC53aWR0aCk7XG5cdFx0XHRcdF9jc3MoZ2hvc3RFbCwgJ2hlaWdodCcsIHJlY3QuaGVpZ2h0ICogMiAtIGdob3N0UmVjdC5oZWlnaHQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uICgvKipFdmVudCovZXZ0LCAvKipib29sZWFuKi91c2VGYWxsYmFjaykge1xuXHRcdFx0dmFyIGRhdGFUcmFuc2ZlciA9IGV2dC5kYXRhVHJhbnNmZXIsXG5cdFx0XHRcdG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdHRoaXMuX29mZlVwRXZlbnRzKCk7XG5cblx0XHRcdGlmIChhY3RpdmVHcm91cC5wdWxsID09ICdjbG9uZScpIHtcblx0XHRcdFx0Y2xvbmVFbCA9IGRyYWdFbC5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0XHRcdF9jc3MoY2xvbmVFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdFx0XHRyb290RWwuaW5zZXJ0QmVmb3JlKGNsb25lRWwsIGRyYWdFbCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh1c2VGYWxsYmFjaykge1xuXG5cdFx0XHRcdGlmICh1c2VGYWxsYmFjayA9PT0gJ3RvdWNoJykge1xuXHRcdFx0XHRcdC8vIEJpbmQgdG91Y2ggZXZlbnRzXG5cdFx0XHRcdFx0X29uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuXHRcdFx0XHRcdF9vbihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Ecm9wKTtcblx0XHRcdFx0XHRfb24oZG9jdW1lbnQsICd0b3VjaGNhbmNlbCcsIHRoaXMuX29uRHJvcCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gT2xkIGJyd29zZXJcblx0XHRcdFx0XHRfb24oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG5cdFx0XHRcdFx0X29uKGRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuX29uRHJvcCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9sb29wSWQgPSBzZXRJbnRlcnZhbCh0aGlzLl9lbXVsYXRlRHJhZ092ZXIsIDUwKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoZGF0YVRyYW5zZmVyKSB7XG5cdFx0XHRcdFx0ZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG5cdFx0XHRcdFx0b3B0aW9ucy5zZXREYXRhICYmIG9wdGlvbnMuc2V0RGF0YS5jYWxsKHRoaXMsIGRhdGFUcmFuc2ZlciwgZHJhZ0VsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9vbihkb2N1bWVudCwgJ2Ryb3AnLCB0aGlzKTtcblx0XHRcdFx0c2V0VGltZW91dCh0aGlzLl9kcmFnU3RhcnRlZCwgMCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9vbkRyYWdPdmVyOiBmdW5jdGlvbiAoLyoqRXZlbnQqL2V2dCkge1xuXHRcdFx0dmFyIGVsID0gdGhpcy5lbCxcblx0XHRcdFx0dGFyZ2V0LFxuXHRcdFx0XHRkcmFnUmVjdCxcblx0XHRcdFx0cmV2ZXJ0LFxuXHRcdFx0XHRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuXHRcdFx0XHRncm91cCA9IG9wdGlvbnMuZ3JvdXAsXG5cdFx0XHRcdGdyb3VwUHV0ID0gZ3JvdXAucHV0LFxuXHRcdFx0XHRpc093bmVyID0gKGFjdGl2ZUdyb3VwID09PSBncm91cCksXG5cdFx0XHRcdGNhblNvcnQgPSBvcHRpb25zLnNvcnQ7XG5cblx0XHRcdGlmIChldnQucHJldmVudERlZmF1bHQgIT09IHZvaWQgMCkge1xuXHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0IW9wdGlvbnMuZHJhZ292ZXJCdWJibGUgJiYgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHRtb3ZlZCA9IHRydWU7XG5cblx0XHRcdGlmIChhY3RpdmVHcm91cCAmJiAhb3B0aW9ucy5kaXNhYmxlZCAmJlxuXHRcdFx0XHQoaXNPd25lclxuXHRcdFx0XHRcdD8gY2FuU29ydCB8fCAocmV2ZXJ0ID0gIXJvb3RFbC5jb250YWlucyhkcmFnRWwpKSAvLyBSZXZlcnRpbmcgaXRlbSBpbnRvIHRoZSBvcmlnaW5hbCBsaXN0XG5cdFx0XHRcdFx0OiBhY3RpdmVHcm91cC5wdWxsICYmIGdyb3VwUHV0ICYmIChcblx0XHRcdFx0XHRcdChhY3RpdmVHcm91cC5uYW1lID09PSBncm91cC5uYW1lKSB8fCAvLyBieSBOYW1lXG5cdFx0XHRcdFx0XHQoZ3JvdXBQdXQuaW5kZXhPZiAmJiB+Z3JvdXBQdXQuaW5kZXhPZihhY3RpdmVHcm91cC5uYW1lKSkgLy8gYnkgQXJyYXlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCkgJiZcblx0XHRcdFx0KGV2dC5yb290RWwgPT09IHZvaWQgMCB8fCBldnQucm9vdEVsID09PSB0aGlzLmVsKSAvLyB0b3VjaCBmYWxsYmFja1xuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIFNtYXJ0IGF1dG8tc2Nyb2xsaW5nXG5cdFx0XHRcdF9hdXRvU2Nyb2xsKGV2dCwgb3B0aW9ucywgdGhpcy5lbCk7XG5cblx0XHRcdFx0aWYgKF9zaWxlbnQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0YXJnZXQgPSBfY2xvc2VzdChldnQudGFyZ2V0LCBvcHRpb25zLmRyYWdnYWJsZSwgZWwpO1xuXHRcdFx0XHRkcmFnUmVjdCA9IGRyYWdFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0XHRpZiAocmV2ZXJ0KSB7XG5cdFx0XHRcdFx0X2Nsb25lSGlkZSh0cnVlKTtcblxuXHRcdFx0XHRcdGlmIChjbG9uZUVsIHx8IG5leHRFbCkge1xuXHRcdFx0XHRcdFx0cm9vdEVsLmluc2VydEJlZm9yZShkcmFnRWwsIGNsb25lRWwgfHwgbmV4dEVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIWNhblNvcnQpIHtcblx0XHRcdFx0XHRcdHJvb3RFbC5hcHBlbmRDaGlsZChkcmFnRWwpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cblx0XHRcdFx0aWYgKChlbC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHx8IChlbC5jaGlsZHJlblswXSA9PT0gZ2hvc3RFbCkgfHxcblx0XHRcdFx0XHQoZWwgPT09IGV2dC50YXJnZXQpICYmICh0YXJnZXQgPSBfZ2hvc3RJc0xhc3QoZWwsIGV2dCkpXG5cdFx0XHRcdCkge1xuXG5cdFx0XHRcdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0XHRcdFx0aWYgKHRhcmdldC5hbmltYXRlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X2Nsb25lSGlkZShpc093bmVyKTtcblxuXHRcdFx0XHRcdGlmIChfb25Nb3ZlKHJvb3RFbCwgZWwsIGRyYWdFbCwgZHJhZ1JlY3QsIHRhcmdldCwgdGFyZ2V0UmVjdCkgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWRyYWdFbC5jb250YWlucyhlbCkpIHtcblx0XHRcdFx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcblx0XHRcdFx0XHRcdFx0cGFyZW50RWwgPSBlbDsgLy8gYWN0dWFsaXphdGlvblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLl9hbmltYXRlKGRyYWdSZWN0LCBkcmFnRWwpO1xuXHRcdFx0XHRcdFx0dGFyZ2V0ICYmIHRoaXMuX2FuaW1hdGUodGFyZ2V0UmVjdCwgdGFyZ2V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodGFyZ2V0ICYmICF0YXJnZXQuYW5pbWF0ZWQgJiYgdGFyZ2V0ICE9PSBkcmFnRWwgJiYgKHRhcmdldC5wYXJlbnROb2RlW2V4cGFuZG9dICE9PSB2b2lkIDApKSB7XG5cdFx0XHRcdFx0aWYgKGxhc3RFbCAhPT0gdGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHRsYXN0RWwgPSB0YXJnZXQ7XG5cdFx0XHRcdFx0XHRsYXN0Q1NTID0gX2Nzcyh0YXJnZXQpO1xuXHRcdFx0XHRcdFx0bGFzdFBhcmVudENTUyA9IF9jc3ModGFyZ2V0LnBhcmVudE5vZGUpO1xuXHRcdFx0XHRcdH1cblxuXG5cdFx0XHRcdFx0dmFyIHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdFx0XHR3aWR0aCA9IHRhcmdldFJlY3QucmlnaHQgLSB0YXJnZXRSZWN0LmxlZnQsXG5cdFx0XHRcdFx0XHRoZWlnaHQgPSB0YXJnZXRSZWN0LmJvdHRvbSAtIHRhcmdldFJlY3QudG9wLFxuXHRcdFx0XHRcdFx0ZmxvYXRpbmcgPSAvbGVmdHxyaWdodHxpbmxpbmUvLnRlc3QobGFzdENTUy5jc3NGbG9hdCArIGxhc3RDU1MuZGlzcGxheSlcblx0XHRcdFx0XHRcdFx0fHwgKGxhc3RQYXJlbnRDU1MuZGlzcGxheSA9PSAnZmxleCcgJiYgbGFzdFBhcmVudENTU1snZmxleC1kaXJlY3Rpb24nXS5pbmRleE9mKCdyb3cnKSA9PT0gMCksXG5cdFx0XHRcdFx0XHRpc1dpZGUgPSAodGFyZ2V0Lm9mZnNldFdpZHRoID4gZHJhZ0VsLm9mZnNldFdpZHRoKSxcblx0XHRcdFx0XHRcdGlzTG9uZyA9ICh0YXJnZXQub2Zmc2V0SGVpZ2h0ID4gZHJhZ0VsLm9mZnNldEhlaWdodCksXG5cdFx0XHRcdFx0XHRoYWxmd2F5ID0gKGZsb2F0aW5nID8gKGV2dC5jbGllbnRYIC0gdGFyZ2V0UmVjdC5sZWZ0KSAvIHdpZHRoIDogKGV2dC5jbGllbnRZIC0gdGFyZ2V0UmVjdC50b3ApIC8gaGVpZ2h0KSA+IDAuNSxcblx0XHRcdFx0XHRcdG5leHRTaWJsaW5nID0gdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZyxcblx0XHRcdFx0XHRcdG1vdmVWZWN0b3IgPSBfb25Nb3ZlKHJvb3RFbCwgZWwsIGRyYWdFbCwgZHJhZ1JlY3QsIHRhcmdldCwgdGFyZ2V0UmVjdCksXG5cdFx0XHRcdFx0XHRhZnRlclxuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdGlmIChtb3ZlVmVjdG9yICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0X3NpbGVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KF91bnNpbGVudCwgMzApO1xuXG5cdFx0XHRcdFx0XHRfY2xvbmVIaWRlKGlzT3duZXIpO1xuXG5cdFx0XHRcdFx0XHRpZiAobW92ZVZlY3RvciA9PT0gMSB8fCBtb3ZlVmVjdG9yID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRhZnRlciA9IChtb3ZlVmVjdG9yID09PSAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGZsb2F0aW5nKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBlbFRvcCA9IGRyYWdFbC5vZmZzZXRUb3AsXG5cdFx0XHRcdFx0XHRcdFx0dGdUb3AgPSB0YXJnZXQub2Zmc2V0VG9wO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChlbFRvcCA9PT0gdGdUb3ApIHtcblx0XHRcdFx0XHRcdFx0XHRhZnRlciA9ICh0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gZHJhZ0VsKSAmJiAhaXNXaWRlIHx8IGhhbGZ3YXkgJiYgaXNXaWRlO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGFmdGVyID0gdGdUb3AgPiBlbFRvcDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YWZ0ZXIgPSAobmV4dFNpYmxpbmcgIT09IGRyYWdFbCkgJiYgIWlzTG9uZyB8fCBoYWxmd2F5ICYmIGlzTG9uZztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKCFkcmFnRWwuY29udGFpbnMoZWwpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChhZnRlciAmJiAhbmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChkcmFnRWwpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkcmFnRWwsIGFmdGVyID8gbmV4dFNpYmxpbmcgOiB0YXJnZXQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHBhcmVudEVsID0gZHJhZ0VsLnBhcmVudE5vZGU7IC8vIGFjdHVhbGl6YXRpb25cblxuXHRcdFx0XHRcdFx0dGhpcy5fYW5pbWF0ZShkcmFnUmVjdCwgZHJhZ0VsKTtcblx0XHRcdFx0XHRcdHRoaXMuX2FuaW1hdGUodGFyZ2V0UmVjdCwgdGFyZ2V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X2FuaW1hdGU6IGZ1bmN0aW9uIChwcmV2UmVjdCwgdGFyZ2V0KSB7XG5cdFx0XHR2YXIgbXMgPSB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uO1xuXG5cdFx0XHRpZiAobXMpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRSZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdF9jc3ModGFyZ2V0LCAndHJhbnNpdGlvbicsICdub25lJyk7XG5cdFx0XHRcdF9jc3ModGFyZ2V0LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCdcblx0XHRcdFx0XHQrIChwcmV2UmVjdC5sZWZ0IC0gY3VycmVudFJlY3QubGVmdCkgKyAncHgsJ1xuXHRcdFx0XHRcdCsgKHByZXZSZWN0LnRvcCAtIGN1cnJlbnRSZWN0LnRvcCkgKyAncHgsMCknXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0dGFyZ2V0Lm9mZnNldFdpZHRoOyAvLyByZXBhaW50XG5cblx0XHRcdFx0X2Nzcyh0YXJnZXQsICd0cmFuc2l0aW9uJywgJ2FsbCAnICsgbXMgKyAnbXMnKTtcblx0XHRcdFx0X2Nzcyh0YXJnZXQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoMCwwLDApJyk7XG5cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRhcmdldC5hbmltYXRlZCk7XG5cdFx0XHRcdHRhcmdldC5hbmltYXRlZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdF9jc3ModGFyZ2V0LCAndHJhbnNpdGlvbicsICcnKTtcblx0XHRcdFx0XHRfY3NzKHRhcmdldCwgJ3RyYW5zZm9ybScsICcnKTtcblx0XHRcdFx0XHR0YXJnZXQuYW5pbWF0ZWQgPSBmYWxzZTtcblx0XHRcdFx0fSwgbXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfb2ZmVXBFdmVudHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBvd25lckRvY3VtZW50ID0gdGhpcy5lbC5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRfb2ZmKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuXHRcdFx0X29mZihvd25lckRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuX29uRHJvcCk7XG5cdFx0XHRfb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uRHJvcCk7XG5cdFx0XHRfb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaGNhbmNlbCcsIHRoaXMuX29uRHJvcCk7XG5cdFx0fSxcblxuXHRcdF9vbkRyb3A6IGZ1bmN0aW9uICgvKipFdmVudCovZXZ0KSB7XG5cdFx0XHR2YXIgZWwgPSB0aGlzLmVsLFxuXHRcdFx0XHRvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuX2xvb3BJZCk7XG5cdFx0XHRjbGVhckludGVydmFsKGF1dG9TY3JvbGwucGlkKTtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9kcmFnU3RhcnRUaW1lcik7XG5cblx0XHRcdC8vIFVuYmluZCBldmVudHNcblx0XHRcdF9vZmYoZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG5cblx0XHRcdGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuXHRcdFx0XHRfb2ZmKGRvY3VtZW50LCAnZHJvcCcsIHRoaXMpO1xuXHRcdFx0XHRfb2ZmKGVsLCAnZHJhZ3N0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vZmZVcEV2ZW50cygpO1xuXG5cdFx0XHRpZiAoZXZ0KSB7XG5cdFx0XHRcdGlmIChtb3ZlZCkge1xuXHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdCFvcHRpb25zLmRyb3BCdWJibGUgJiYgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Z2hvc3RFbCAmJiBnaG9zdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ2hvc3RFbCk7XG5cblx0XHRcdFx0aWYgKGRyYWdFbCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuXHRcdFx0XHRcdFx0X29mZihkcmFnRWwsICdkcmFnZW5kJywgdGhpcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X2Rpc2FibGVEcmFnZ2FibGUoZHJhZ0VsKTtcblxuXHRcdFx0XHRcdC8vIFJlbW92ZSBjbGFzcydzXG5cdFx0XHRcdFx0X3RvZ2dsZUNsYXNzKGRyYWdFbCwgdGhpcy5vcHRpb25zLmdob3N0Q2xhc3MsIGZhbHNlKTtcblx0XHRcdFx0XHRfdG9nZ2xlQ2xhc3MoZHJhZ0VsLCB0aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsIGZhbHNlKTtcblxuXHRcdFx0XHRcdGlmIChyb290RWwgIT09IHBhcmVudEVsKSB7XG5cdFx0XHRcdFx0XHRuZXdJbmRleCA9IF9pbmRleChkcmFnRWwpO1xuXG5cdFx0XHRcdFx0XHRpZiAobmV3SW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdFx0XHQvLyBkcmFnIGZyb20gb25lIGxpc3QgYW5kIGRyb3AgaW50byBhbm90aGVyXG5cdFx0XHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KG51bGwsIHBhcmVudEVsLCAnc29ydCcsIGRyYWdFbCwgcm9vdEVsLCBvbGRJbmRleCwgbmV3SW5kZXgpO1xuXHRcdFx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudCh0aGlzLCByb290RWwsICdzb3J0JywgZHJhZ0VsLCByb290RWwsIG9sZEluZGV4LCBuZXdJbmRleCk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQWRkIGV2ZW50XG5cdFx0XHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KG51bGwsIHBhcmVudEVsLCAnYWRkJywgZHJhZ0VsLCByb290RWwsIG9sZEluZGV4LCBuZXdJbmRleCk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGV2ZW50XG5cdFx0XHRcdFx0XHRcdF9kaXNwYXRjaEV2ZW50KHRoaXMsIHJvb3RFbCwgJ3JlbW92ZScsIGRyYWdFbCwgcm9vdEVsLCBvbGRJbmRleCwgbmV3SW5kZXgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBjbG9uZVxuXHRcdFx0XHRcdFx0Y2xvbmVFbCAmJiBjbG9uZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVFbCk7XG5cblx0XHRcdFx0XHRcdGlmIChkcmFnRWwubmV4dFNpYmxpbmcgIT09IG5leHRFbCkge1xuXHRcdFx0XHRcdFx0XHQvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBkcmFnZ2VkIGVsZW1lbnQgd2l0aGluIGl0cyBwYXJlbnRcblx0XHRcdFx0XHRcdFx0bmV3SW5kZXggPSBfaW5kZXgoZHJhZ0VsKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAobmV3SW5kZXggPj0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGRyYWcgJiBkcm9wIHdpdGhpbiB0aGUgc2FtZSBsaXN0XG5cdFx0XHRcdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQodGhpcywgcm9vdEVsLCAndXBkYXRlJywgZHJhZ0VsLCByb290RWwsIG9sZEluZGV4LCBuZXdJbmRleCk7XG5cdFx0XHRcdFx0XHRcdFx0X2Rpc3BhdGNoRXZlbnQodGhpcywgcm9vdEVsLCAnc29ydCcsIGRyYWdFbCwgcm9vdEVsLCBvbGRJbmRleCwgbmV3SW5kZXgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKFNvcnRhYmxlLmFjdGl2ZSkge1xuXHRcdFx0XHRcdFx0aWYgKG5ld0luZGV4ID09PSBudWxsIHx8IG5ld0luZGV4ID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRuZXdJbmRleCA9IG9sZEluZGV4O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRfZGlzcGF0Y2hFdmVudCh0aGlzLCByb290RWwsICdlbmQnLCBkcmFnRWwsIHJvb3RFbCwgb2xkSW5kZXgsIG5ld0luZGV4KTtcblxuXHRcdFx0XHRcdFx0Ly8gU2F2ZSBzb3J0aW5nXG5cdFx0XHRcdFx0XHR0aGlzLnNhdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBOdWxsaW5nXG5cdFx0XHRcdHJvb3RFbCA9XG5cdFx0XHRcdGRyYWdFbCA9XG5cdFx0XHRcdHBhcmVudEVsID1cblx0XHRcdFx0Z2hvc3RFbCA9XG5cdFx0XHRcdG5leHRFbCA9XG5cdFx0XHRcdGNsb25lRWwgPVxuXG5cdFx0XHRcdHNjcm9sbEVsID1cblx0XHRcdFx0c2Nyb2xsUGFyZW50RWwgPVxuXG5cdFx0XHRcdHRhcEV2dCA9XG5cdFx0XHRcdHRvdWNoRXZ0ID1cblxuXHRcdFx0XHRtb3ZlZCA9XG5cdFx0XHRcdG5ld0luZGV4ID1cblxuXHRcdFx0XHRsYXN0RWwgPVxuXHRcdFx0XHRsYXN0Q1NTID1cblxuXHRcdFx0XHRhY3RpdmVHcm91cCA9XG5cdFx0XHRcdFNvcnRhYmxlLmFjdGl2ZSA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fSxcblxuXG5cdFx0aGFuZGxlRXZlbnQ6IGZ1bmN0aW9uICgvKipFdmVudCovZXZ0KSB7XG5cdFx0XHR2YXIgdHlwZSA9IGV2dC50eXBlO1xuXG5cdFx0XHRpZiAodHlwZSA9PT0gJ2RyYWdvdmVyJyB8fCB0eXBlID09PSAnZHJhZ2VudGVyJykge1xuXHRcdFx0XHRpZiAoZHJhZ0VsKSB7XG5cdFx0XHRcdFx0dGhpcy5fb25EcmFnT3ZlcihldnQpO1xuXHRcdFx0XHRcdF9nbG9iYWxEcmFnT3ZlcihldnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0eXBlID09PSAnZHJvcCcgfHwgdHlwZSA9PT0gJ2RyYWdlbmQnKSB7XG5cdFx0XHRcdHRoaXMuX29uRHJvcChldnQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIFNlcmlhbGl6ZXMgdGhlIGl0ZW0gaW50byBhbiBhcnJheSBvZiBzdHJpbmcuXG5cdFx0ICogQHJldHVybnMge1N0cmluZ1tdfVxuXHRcdCAqL1xuXHRcdHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBvcmRlciA9IFtdLFxuXHRcdFx0XHRlbCxcblx0XHRcdFx0Y2hpbGRyZW4gPSB0aGlzLmVsLmNoaWxkcmVuLFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0biA9IGNoaWxkcmVuLmxlbmd0aCxcblx0XHRcdFx0b3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuXHRcdFx0Zm9yICg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0ZWwgPSBjaGlsZHJlbltpXTtcblx0XHRcdFx0aWYgKF9jbG9zZXN0KGVsLCBvcHRpb25zLmRyYWdnYWJsZSwgdGhpcy5lbCkpIHtcblx0XHRcdFx0XHRvcmRlci5wdXNoKGVsLmdldEF0dHJpYnV0ZShvcHRpb25zLmRhdGFJZEF0dHIpIHx8IF9nZW5lcmF0ZUlkKGVsKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9yZGVyO1xuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIFNvcnRzIHRoZSBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIGFycmF5LlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ1tdfSAgb3JkZXIgIG9yZGVyIG9mIHRoZSBpdGVtc1xuXHRcdCAqL1xuXHRcdHNvcnQ6IGZ1bmN0aW9uIChvcmRlcikge1xuXHRcdFx0dmFyIGl0ZW1zID0ge30sIHJvb3RFbCA9IHRoaXMuZWw7XG5cblx0XHRcdHRoaXMudG9BcnJheSgpLmZvckVhY2goZnVuY3Rpb24gKGlkLCBpKSB7XG5cdFx0XHRcdHZhciBlbCA9IHJvb3RFbC5jaGlsZHJlbltpXTtcblxuXHRcdFx0XHRpZiAoX2Nsb3Nlc3QoZWwsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHJvb3RFbCkpIHtcblx0XHRcdFx0XHRpdGVtc1tpZF0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdG9yZGVyLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdGlmIChpdGVtc1tpZF0pIHtcblx0XHRcdFx0XHRyb290RWwucmVtb3ZlQ2hpbGQoaXRlbXNbaWRdKTtcblx0XHRcdFx0XHRyb290RWwuYXBwZW5kQ2hpbGQoaXRlbXNbaWRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXG5cdFx0LyoqXG5cdFx0ICogU2F2ZSB0aGUgY3VycmVudCBzb3J0aW5nXG5cdFx0ICovXG5cdFx0c2F2ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHN0b3JlID0gdGhpcy5vcHRpb25zLnN0b3JlO1xuXHRcdFx0c3RvcmUgJiYgc3RvcmUuc2V0KHRoaXMpO1xuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIEZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIHNldCwgZ2V0IHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IgYnkgdGVzdGluZyB0aGUgZWxlbWVudCBpdHNlbGYgYW5kIHRyYXZlcnNpbmcgdXAgdGhyb3VnaCBpdHMgYW5jZXN0b3JzIGluIHRoZSBET00gdHJlZS5cblx0XHQgKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9ICBlbFxuXHRcdCAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgIFtzZWxlY3Rvcl0gIGRlZmF1bHQ6IGBvcHRpb25zLmRyYWdnYWJsZWBcblx0XHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8bnVsbH1cblx0XHQgKi9cblx0XHRjbG9zZXN0OiBmdW5jdGlvbiAoZWwsIHNlbGVjdG9yKSB7XG5cdFx0XHRyZXR1cm4gX2Nsb3Nlc3QoZWwsIHNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHRoaXMuZWwpO1xuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIFNldC9nZXQgb3B0aW9uXG5cdFx0ICogQHBhcmFtICAge3N0cmluZ30gbmFtZVxuXHRcdCAqIEBwYXJhbSAgIHsqfSAgICAgIFt2YWx1ZV1cblx0XHQgKiBAcmV0dXJucyB7Kn1cblx0XHQgKi9cblx0XHRvcHRpb246IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zW25hbWVdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3B0aW9uc1tuYW1lXSA9IHZhbHVlO1xuXG5cdFx0XHRcdGlmIChuYW1lID09PSAnZ3JvdXAnKSB7XG5cdFx0XHRcdFx0X3ByZXBhcmVHcm91cChvcHRpb25zKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIERlc3Ryb3lcblx0XHQgKi9cblx0XHRkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZWwgPSB0aGlzLmVsO1xuXG5cdFx0XHRlbFtleHBhbmRvXSA9IG51bGw7XG5cblx0XHRcdF9vZmYoZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vblRhcFN0YXJ0KTtcblx0XHRcdF9vZmYoZWwsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25UYXBTdGFydCk7XG5cblx0XHRcdGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuXHRcdFx0XHRfb2ZmKGVsLCAnZHJhZ292ZXInLCB0aGlzKTtcblx0XHRcdFx0X29mZihlbCwgJ2RyYWdlbnRlcicsIHRoaXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgZHJhZ2dhYmxlIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgnW2RyYWdnYWJsZV0nKSwgZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dG91Y2hEcmFnT3Zlckxpc3RlbmVycy5zcGxpY2UodG91Y2hEcmFnT3Zlckxpc3RlbmVycy5pbmRleE9mKHRoaXMuX29uRHJhZ092ZXIpLCAxKTtcblxuXHRcdFx0dGhpcy5fb25Ecm9wKCk7XG5cblx0XHRcdHRoaXMuZWwgPSBlbCA9IG51bGw7XG5cdFx0fVxuXHR9O1xuXG5cblx0ZnVuY3Rpb24gX2Nsb25lSGlkZShzdGF0ZSkge1xuXHRcdGlmIChjbG9uZUVsICYmIChjbG9uZUVsLnN0YXRlICE9PSBzdGF0ZSkpIHtcblx0XHRcdF9jc3MoY2xvbmVFbCwgJ2Rpc3BsYXknLCBzdGF0ZSA/ICdub25lJyA6ICcnKTtcblx0XHRcdCFzdGF0ZSAmJiBjbG9uZUVsLnN0YXRlICYmIHJvb3RFbC5pbnNlcnRCZWZvcmUoY2xvbmVFbCwgZHJhZ0VsKTtcblx0XHRcdGNsb25lRWwuc3RhdGUgPSBzdGF0ZTtcblx0XHR9XG5cdH1cblxuXG5cdGZ1bmN0aW9uIF9jbG9zZXN0KC8qKkhUTUxFbGVtZW50Ki9lbCwgLyoqU3RyaW5nKi9zZWxlY3RvciwgLyoqSFRNTEVsZW1lbnQqL2N0eCkge1xuXHRcdGlmIChlbCkge1xuXHRcdFx0Y3R4ID0gY3R4IHx8IGRvY3VtZW50O1xuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLicpO1xuXG5cdFx0XHR2YXIgdGFnID0gc2VsZWN0b3Iuc2hpZnQoKS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0XHRyZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKCcgKyBzZWxlY3Rvci5qb2luKCd8JykgKyAnKSg/PVxcXFxzKScsICdnJyk7XG5cblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCh0YWcgPT09ICc+KicgJiYgZWwucGFyZW50Tm9kZSA9PT0gY3R4KSB8fCAoXG5cdFx0XHRcdFx0XHQodGFnID09PSAnJyB8fCBlbC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09IHRhZykgJiZcblx0XHRcdFx0XHRcdCghc2VsZWN0b3IubGVuZ3RoIHx8ICgoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5tYXRjaChyZSkgfHwgW10pLmxlbmd0aCA9PSBzZWxlY3Rvci5sZW5ndGgpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHdoaWxlIChlbCAhPT0gY3R4ICYmIChlbCA9IGVsLnBhcmVudE5vZGUpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cblx0ZnVuY3Rpb24gX2dsb2JhbERyYWdPdmVyKC8qKkV2ZW50Ki9ldnQpIHtcblx0XHRpZiAoZXZ0LmRhdGFUcmFuc2Zlcikge1xuXHRcdFx0ZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuXHRcdH1cblx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gX29uKGVsLCBldmVudCwgZm4pIHtcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgZmFsc2UpO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBfb2ZmKGVsLCBldmVudCwgZm4pIHtcblx0XHRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgZmFsc2UpO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBfdG9nZ2xlQ2xhc3MoZWwsIG5hbWUsIHN0YXRlKSB7XG5cdFx0aWYgKGVsKSB7XG5cdFx0XHRpZiAoZWwuY2xhc3NMaXN0KSB7XG5cdFx0XHRcdGVsLmNsYXNzTGlzdFtzdGF0ZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnKS5yZXBsYWNlKFJTUEFDRSwgJyAnKS5yZXBsYWNlKCcgJyArIG5hbWUgKyAnICcsICcgJyk7XG5cdFx0XHRcdGVsLmNsYXNzTmFtZSA9IChjbGFzc05hbWUgKyAoc3RhdGUgPyAnICcgKyBuYW1lIDogJycpKS5yZXBsYWNlKFJTUEFDRSwgJyAnKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cdGZ1bmN0aW9uIF9jc3MoZWwsIHByb3AsIHZhbCkge1xuXHRcdHZhciBzdHlsZSA9IGVsICYmIGVsLnN0eWxlO1xuXG5cdFx0aWYgKHN0eWxlKSB7XG5cdFx0XHRpZiAodmFsID09PSB2b2lkIDApIHtcblx0XHRcdFx0aWYgKGRvY3VtZW50LmRlZmF1bHRWaWV3ICYmIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUpIHtcblx0XHRcdFx0XHR2YWwgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoZWwuY3VycmVudFN0eWxlKSB7XG5cdFx0XHRcdFx0dmFsID0gZWwuY3VycmVudFN0eWxlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHByb3AgPT09IHZvaWQgMCA/IHZhbCA6IHZhbFtwcm9wXTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIShwcm9wIGluIHN0eWxlKSkge1xuXHRcdFx0XHRcdHByb3AgPSAnLXdlYmtpdC0nICsgcHJvcDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN0eWxlW3Byb3BdID0gdmFsICsgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gJycgOiAncHgnKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cdGZ1bmN0aW9uIF9maW5kKGN0eCwgdGFnTmFtZSwgaXRlcmF0b3IpIHtcblx0XHRpZiAoY3R4KSB7XG5cdFx0XHR2YXIgbGlzdCA9IGN0eC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSwgaSA9IDAsIG4gPSBsaXN0Lmxlbmd0aDtcblxuXHRcdFx0aWYgKGl0ZXJhdG9yKSB7XG5cdFx0XHRcdGZvciAoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdFx0aXRlcmF0b3IobGlzdFtpXSwgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblxuXG5cdGZ1bmN0aW9uIF9kaXNwYXRjaEV2ZW50KHNvcnRhYmxlLCByb290RWwsIG5hbWUsIHRhcmdldEVsLCBmcm9tRWwsIHN0YXJ0SW5kZXgsIG5ld0luZGV4KSB7XG5cdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpLFxuXHRcdFx0b3B0aW9ucyA9IChzb3J0YWJsZSB8fCByb290RWxbZXhwYW5kb10pLm9wdGlvbnMsXG5cdFx0XHRvbk5hbWUgPSAnb24nICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc3Vic3RyKDEpO1xuXG5cdFx0ZXZ0LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlKTtcblxuXHRcdGV2dC50byA9IHJvb3RFbDtcblx0XHRldnQuZnJvbSA9IGZyb21FbCB8fCByb290RWw7XG5cdFx0ZXZ0Lml0ZW0gPSB0YXJnZXRFbCB8fCByb290RWw7XG5cdFx0ZXZ0LmNsb25lID0gY2xvbmVFbDtcblxuXHRcdGV2dC5vbGRJbmRleCA9IHN0YXJ0SW5kZXg7XG5cdFx0ZXZ0Lm5ld0luZGV4ID0gbmV3SW5kZXg7XG5cblx0XHRyb290RWwuZGlzcGF0Y2hFdmVudChldnQpO1xuXG5cdFx0aWYgKG9wdGlvbnNbb25OYW1lXSkge1xuXHRcdFx0b3B0aW9uc1tvbk5hbWVdLmNhbGwoc29ydGFibGUsIGV2dCk7XG5cdFx0fVxuXHR9XG5cblxuXHRmdW5jdGlvbiBfb25Nb3ZlKGZyb21FbCwgdG9FbCwgZHJhZ0VsLCBkcmFnUmVjdCwgdGFyZ2V0RWwsIHRhcmdldFJlY3QpIHtcblx0XHR2YXIgZXZ0LFxuXHRcdFx0c29ydGFibGUgPSBmcm9tRWxbZXhwYW5kb10sXG5cdFx0XHRvbk1vdmVGbiA9IHNvcnRhYmxlLm9wdGlvbnMub25Nb3ZlLFxuXHRcdFx0cmV0VmFsO1xuXG5cdFx0ZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0ZXZ0LmluaXRFdmVudCgnbW92ZScsIHRydWUsIHRydWUpO1xuXG5cdFx0ZXZ0LnRvID0gdG9FbDtcblx0XHRldnQuZnJvbSA9IGZyb21FbDtcblx0XHRldnQuZHJhZ2dlZCA9IGRyYWdFbDtcblx0XHRldnQuZHJhZ2dlZFJlY3QgPSBkcmFnUmVjdDtcblx0XHRldnQucmVsYXRlZCA9IHRhcmdldEVsIHx8IHRvRWw7XG5cdFx0ZXZ0LnJlbGF0ZWRSZWN0ID0gdGFyZ2V0UmVjdCB8fCB0b0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0ZnJvbUVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuXHRcdGlmIChvbk1vdmVGbikge1xuXHRcdFx0cmV0VmFsID0gb25Nb3ZlRm4uY2FsbChzb3J0YWJsZSwgZXZ0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0VmFsO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBfZGlzYWJsZURyYWdnYWJsZShlbCkge1xuXHRcdGVsLmRyYWdnYWJsZSA9IGZhbHNlO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBfdW5zaWxlbnQoKSB7XG5cdFx0X3NpbGVudCA9IGZhbHNlO1xuXHR9XG5cblxuXHQvKiogQHJldHVybnMge0hUTUxFbGVtZW50fGZhbHNlfSAqL1xuXHRmdW5jdGlvbiBfZ2hvc3RJc0xhc3QoZWwsIGV2dCkge1xuXHRcdHZhciBsYXN0RWwgPSBlbC5sYXN0RWxlbWVudENoaWxkLFxuXHRcdFx0XHRyZWN0ID0gbGFzdEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0cmV0dXJuICgoZXZ0LmNsaWVudFkgLSAocmVjdC50b3AgKyByZWN0LmhlaWdodCkgPiA1KSB8fCAoZXZ0LmNsaWVudFggLSAocmVjdC5yaWdodCArIHJlY3Qud2lkdGgpID4gNSkpICYmIGxhc3RFbDsgLy8gbWluIGRlbHRhXG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBpZFxuXHQgKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBfZ2VuZXJhdGVJZChlbCkge1xuXHRcdHZhciBzdHIgPSBlbC50YWdOYW1lICsgZWwuY2xhc3NOYW1lICsgZWwuc3JjICsgZWwuaHJlZiArIGVsLnRleHRDb250ZW50LFxuXHRcdFx0aSA9IHN0ci5sZW5ndGgsXG5cdFx0XHRzdW0gPSAwO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0c3VtICs9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdW0udG9TdHJpbmcoMzYpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG9mIGFuIGVsZW1lbnQgd2l0aGluIGl0cyBwYXJlbnRcblx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm4ge251bWJlcn1cblx0ICovXG5cdGZ1bmN0aW9uIF9pbmRleChlbCkge1xuXHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRpZiAoIWVsIHx8ICFlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGVsICYmIChlbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG5cdFx0XHRpZiAoZWwubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ1RFTVBMQVRFJykge1xuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpbmRleDtcblx0fVxuXG5cdGZ1bmN0aW9uIF90aHJvdHRsZShjYWxsYmFjaywgbXMpIHtcblx0XHR2YXIgYXJncywgX3RoaXM7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGFyZ3MgPT09IHZvaWQgMCkge1xuXHRcdFx0XHRhcmdzID0gYXJndW1lbnRzO1xuXHRcdFx0XHRfdGhpcyA9IHRoaXM7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKF90aGlzLCBhcmdzWzBdKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suYXBwbHkoX3RoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFyZ3MgPSB2b2lkIDA7XG5cdFx0XHRcdH0sIG1zKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gX2V4dGVuZChkc3QsIHNyYykge1xuXHRcdGlmIChkc3QgJiYgc3JjKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGRzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZHN0O1xuXHR9XG5cblxuXHQvLyBFeHBvcnQgdXRpbHNcblx0U29ydGFibGUudXRpbHMgPSB7XG5cdFx0b246IF9vbixcblx0XHRvZmY6IF9vZmYsXG5cdFx0Y3NzOiBfY3NzLFxuXHRcdGZpbmQ6IF9maW5kLFxuXHRcdGlzOiBmdW5jdGlvbiAoZWwsIHNlbGVjdG9yKSB7XG5cdFx0XHRyZXR1cm4gISFfY2xvc2VzdChlbCwgc2VsZWN0b3IsIGVsKTtcblx0XHR9LFxuXHRcdGV4dGVuZDogX2V4dGVuZCxcblx0XHR0aHJvdHRsZTogX3Rocm90dGxlLFxuXHRcdGNsb3Nlc3Q6IF9jbG9zZXN0LFxuXHRcdHRvZ2dsZUNsYXNzOiBfdG9nZ2xlQ2xhc3MsXG5cdFx0aW5kZXg6IF9pbmRleFxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBzb3J0YWJsZSBpbnN0YW5jZVxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSAgZWxcblx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgW29wdGlvbnNdXG5cdCAqL1xuXHRTb3J0YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IFNvcnRhYmxlKGVsLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIEV4cG9ydFxuXHRTb3J0YWJsZS52ZXJzaW9uID0gJzEuNC4yJztcblx0cmV0dXJuIFNvcnRhYmxlO1xufSk7XG4iLCIvKiBnbG9iYWwgYWZyYW1lRWRpdG9yICovXG52YXIgUGFuZWxzID0gcmVxdWlyZSgnLi9wYW5lbHMnKTtcbnZhciBTaWduYWxzID0gcmVxdWlyZSgnc2lnbmFscycpO1xudmFyIFZpZXdwb3J0ID0gcmVxdWlyZSgnLi92aWV3cG9ydCcpO1xudmFyIEhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuZnVuY3Rpb24gRWRpdG9yICgpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHRoaXMub25Eb21Mb2FkZWQuYmluZCh0aGlzKSk7XG59XG5cbkVkaXRvci5wcm90b3R5cGUgPSB7XG4gIG9uRG9tTG9hZGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50b29scyA9IHJlcXVpcmUoJy4vdG9vbHMnKTtcbiAgICB0aGlzLnNjZW5lRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhLXNjZW5lJyk7XG5cbiAgICBpZiAodGhpcy5zY2VuZUVsLmhhc0xvYWRlZCkge1xuICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY2VuZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZCcsIHRoaXMuaW5pdFVJLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfSxcblxuICBpbml0VUk6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhbWVyYUVsID0gdGhpcy5zY2VuZUVsLmNhbWVyYUVsO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5jYW1lcmFFbC5vYmplY3QzRDtcblxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuXG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgdGhpcy5wYW5lbHMgPSBuZXcgUGFuZWxzKHRoaXMpO1xuICAgIHRoaXMuc2NlbmUgPSB0aGlzLnNjZW5lRWwub2JqZWN0M0Q7XG4gICAgdGhpcy5oZWxwZXJzID0gbmV3IEhlbHBlcnModGhpcyk7XG4gICAgdGhpcy52aWV3cG9ydCA9IG5ldyBWaWV3cG9ydCh0aGlzKTtcbiAgfSxcblxuICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zaWduYWxzID0ge1xuICAgICAgc2NlbmVHcmFwaENoYW5nZWQ6IG5ldyBTaWduYWxzLlNpZ25hbCgpLFxuICAgICAgb2JqZWN0U2VsZWN0ZWQ6IG5ldyBTaWduYWxzLlNpZ25hbCgpLFxuICAgICAgZW50aXR5U2VsZWN0ZWQ6IG5ldyBTaWduYWxzLlNpZ25hbCgpLFxuICAgICAgb2JqZWN0Q2hhbmdlZDogbmV3IFNpZ25hbHMuU2lnbmFsKCksXG4gICAgICBjb21wb25lbnRDaGFuZ2VkOiBuZXcgU2lnbmFscy5TaWduYWwoKVxuICAgIH07XG5cbiAgICB0aGlzLnNpZ25hbHMuZW50aXR5U2VsZWN0ZWQuYWRkKGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBlbnRpdHk7XG4gICAgICBpZiAoZW50aXR5KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KGVudGl0eS5vYmplY3QzRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdChudWxsKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgdmFyIGVudGl0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS1lbnRpdHknKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgZW50aXR5ID0gZW50aXRpZXNbaV07XG4gICAgICBlbnRpdHkuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9uZW50Y2hhbmdlZCcsXG4gICAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiBldnQuc3JjRWxlbWVudCA9PT0gdGhpcy5zZWxlY3RlZC5lbCkge1xuICAgICAgICAgICAgYWZyYW1lRWRpdG9yLmVkaXRvci5zaWduYWxzLmNvbXBvbmVudENoYW5nZWQuZGlzcGF0Y2goZXZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIHNlbGVjdEJ5SWQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmIChpZCA9PT0gdGhpcy5jYW1lcmEuaWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuY2FtZXJhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3QodGhpcy5zY2VuZS5nZXRPYmplY3RCeUlkKGlkLCB0cnVlKSk7XG4gIH0sXG5cbiAgc2VsZWN0OiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT09IG9iamVjdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSBvYmplY3Q7XG4gICAgdGhpcy5zaWduYWxzLm9iamVjdFNlbGVjdGVkLmRpc3BhdGNoKG9iamVjdCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRWRpdG9yKCk7XG4iLCIvKiBnbG9iYWwgVEhSRUUgKi9cbmZ1bmN0aW9uIEhlbHBlcnMgKGVkaXRvcikge1xuICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcblxuICB0aGlzLmRlZmF1bHRTaXplID0gMC41O1xuXG4gIC8vIHRocmVlanMgSGVscGVyc1xuICB0aGlzLnNjZW5lSGVscGVycyA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICB0aGlzLnNjZW5lSGVscGVycy52aXNpYmxlID0gZmFsc2U7XG4gIGVkaXRvci5zY2VuZS5hZGQodGhpcy5zY2VuZUhlbHBlcnMpO1xuICB0aGlzLmhlbHBlcnMgPSB7fTtcblxuICB0aGlzLmFkZEdyaWRIZWxwZXIoKTtcbiAgdGhpcy5maW5kSGVscGVycygpO1xuXG4gIGVkaXRvci5zaWduYWxzLm9iamVjdENoYW5nZWQuYWRkKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB0aGlzLnVwZGF0ZUhlbHBlcihvYmplY3QuZWwpO1xuICB9LmJpbmQodGhpcykpO1xufVxuXG5IZWxwZXJzLnByb3RvdHlwZSA9IHtcbiAgYWRkR3JpZEhlbHBlcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ3JpZCA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDEwLCAxKTtcbiAgICB0aGlzLmFkZCh0aGlzLmdyaWQpO1xuICB9LFxuXG4gIHVwZGF0ZUhlbHBlcjogZnVuY3Rpb24gKGVudGl0eSkge1xuICAgIGlmIChlbnRpdHkuaGVscGVyKSB7XG4gICAgICB2YXIgb2JqZWN0ID0gZW50aXR5LmNvbXBvbmVudHNbJ2xpZ2h0J10ubGlnaHQ7XG4gICAgICB2YXIgaGVscGVyID0gdGhpcy5oZWxwZXJzWyBlbnRpdHkub2JqZWN0M0QuaWQgXTtcbiAgICAgIGlmIChoZWxwZXIgaW5zdGFuY2VvZiB0aGlzLmd1ZXNzSGVscGVyVHlwZShlbnRpdHkpKSB7XG4gICAgICAgIC8vIEl0J3MgdGhlIHNhbWUgaGVscGVyLCBqdXN0IHVwZGF0ZSBhbmQgc2tpcFxuICAgICAgICBoZWxwZXIudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWxwZXIucGFyZW50LnJlbW92ZShoZWxwZXIpO1xuICAgICAgICBkZWxldGUgdGhpcy5oZWxwZXJzWyBvYmplY3QuaWQgXTtcbiAgICAgICAgdGhpcy5hZGRIZWxwZXIoZW50aXR5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRIZWxwZXIoZW50aXR5KTtcbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlSGVscGVyOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgaWYgKHRoaXMuc2NlbmVIZWxwZXJzW29iamVjdC5pZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGhlbHBlciA9IHRoaXMuaGVscGVyc1sgb2JqZWN0LmlkIF07XG4gICAgICBoZWxwZXIucGFyZW50LnJlbW92ZShoZWxwZXIpO1xuICAgICAgZGVsZXRlIHRoaXMuaGVscGVyc1sgb2JqZWN0LmlkIF07XG4gICAgICB0aGlzLnNpZ25hbHMuaGVscGVyUmVtb3ZlZC5kaXNwYXRjaChoZWxwZXIpO1xuICAgIH1cbiAgfSxcblxuICBndWVzc0hlbHBlclR5cGU6IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICBpZiAoZW50aXR5LmNvbXBvbmVudHNbJ2xpZ2h0J10pIHtcbiAgICAgIHZhciBvYmplY3QgPSBlbnRpdHkuY29tcG9uZW50c1snbGlnaHQnXS5saWdodDtcblxuICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlBvaW50TGlnaHQpIHtcbiAgICAgICAgcmV0dXJuIFRIUkVFLlBvaW50TGlnaHRIZWxwZXI7XG4gICAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQpIHtcbiAgICAgICAgcmV0dXJuIFRIUkVFLkRpcmVjdGlvbmFsTGlnaHRIZWxwZXI7XG4gICAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlNwb3RMaWdodCkge1xuICAgICAgICByZXR1cm4gVEhSRUUuU3BvdExpZ2h0SGVscGVyO1xuICAgICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5IZW1pc3BoZXJlTGlnaHQpIHtcbiAgICAgICAgcmV0dXJuIFRIUkVFLkhlbWlzcGhlcmVMaWdodEhlbHBlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vIGhlbHBlciBmb3IgdGhpcyBvYmplY3QgdHlwZVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkSGVscGVyOiBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgaWYgKGVudGl0eS5kYXRhc2V0ICYmICFlbnRpdHkuZGF0YXNldC5pc0VkaXRvcikge1xuICAgICAgdmFyIEhlbHBlclR5cGUgPSB0aGlzLmd1ZXNzSGVscGVyVHlwZShlbnRpdHkpO1xuICAgICAgaWYgKEhlbHBlclR5cGUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgb2JqZWN0ID0gZW50aXR5LmNvbXBvbmVudHNbJ2xpZ2h0J10ubGlnaHQ7XG4gICAgICB2YXIgaGVscGVyID0gbmV3IEhlbHBlclR5cGUob2JqZWN0LCB0aGlzLmRlZmF1bHRTaXplKTtcblxuICAgICAgZW50aXR5LmhlbHBlciA9IGhlbHBlcjtcbiAgICAgIHRoaXMuaGVscGVyc1sgZW50aXR5Lm9iamVjdDNELmlkIF0gPSBoZWxwZXI7XG4gICAgICB0aGlzLmFkZChoZWxwZXIpO1xuICAgIH1cbiAgfSxcblxuICBmaW5kSGVscGVyczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY2VuZSA9IHRoaXMuZWRpdG9yLnNjZW5lRWw7XG4gICAgdmFyICR0aGlzID0gdGhpcztcblxuICAgIChmdW5jdGlvbiB0cmVlSXRlcmF0ZSAoZWxlbWVudCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICR0aGlzLmFkZEhlbHBlcihjaGlsZCk7XG4gICAgICAgIHRyZWVJdGVyYXRlKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9KShzY2VuZSk7XG4gIH0sXG5cbiAgYWRkOiBmdW5jdGlvbiAoaGVscGVyKSB7XG4gICAgdGhpcy5zY2VuZUhlbHBlcnMuYWRkKGhlbHBlcik7XG4gIH0sXG5cbiAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2NlbmVIZWxwZXJzLnZpc2libGUgPSBmYWxzZTtcbiAgfSxcblxuICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2VuZUhlbHBlcnMudmlzaWJsZSA9IHRydWU7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGVscGVycztcbiIsInZhciBlZGl0b3IgPSByZXF1aXJlKCcuL2VkaXRvci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWRpdG9yOiBlZGl0b3Jcbn07XG4iLCIvKiBnbG9iYWwgYWZyYW1lQ29yZSAqL1xudmFyIFVJID0gcmVxdWlyZSgnLi4vLi4vbGliL3ZlbmRvci91aS5qcycpOyAvLyBAdG9kbyB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIG5wbSBwYWNrYWdlXG52YXIgV2lkZ2V0c0ZhY3RvcnkgPSByZXF1aXJlKCcuL3dpZGdldHNmYWN0b3J5LmpzJyk7IC8vIEB0b2RvIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgbnBtIHBhY2thZ2VcblxuZnVuY3Rpb24gQXR0cmlidXRlcyAoZWRpdG9yKSB7XG4gIHZhciBvYmplY3RJZCwgb2JqZWN0VHlwZSwgb2JqZWN0Q3VzdG9tUm93O1xuICB2YXIgY29tcG9uZW50c0xpc3Q7XG4gIHZhciBpZ25vcmVDb21wb25lbnRzQ2hhbmdlID0gZmFsc2U7XG4gIHZhciBjb21tb25Db21wb25lbnRzID0gWydwb3NpdGlvbicsICdyb3RhdGlvbicsICdzY2FsZScsICd2aXNpYmxlJ107XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZW50aXR5IGNvbXBvbmVudCB2YWx1ZVxuICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbnRpdHkgICBFbnRpdHkgdG8gbW9kaWZ5XG4gICAqIEBwYXJhbSAge3N0cmluZ30gY29tcG9uZW50ICAgICBOYW1lIG9mIHRoZSBjb21wb25lbnRcbiAgICogQHBhcmFtICB7c3RyaW5nfSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lXG4gICAqIEBwYXJhbSAge3N0cmluZ3xudW1iZXJ9IHZhbHVlICAgIE5ldyB2YWx1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlRW50aXR5Q2hhbmdlIChlbnRpdHksIGNvbXBvbmVudE5hbWUsIHByb3BlcnR5TmFtZSwgdmFsdWUpIHtcbiAgICBpZiAocHJvcGVydHlOYW1lKSB7XG4gICAgICBlbnRpdHkuc2V0QXR0cmlidXRlKGNvbXBvbmVudE5hbWUsIHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRpdHkuc2V0QXR0cmlidXRlKGNvbXBvbmVudE5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgY29udGFpbmVyIHdpdGggdGhlIGNvbW1vbiBhdHRyaWJ1dGVzIGFuZCBjb21wb25lbnRzIGZvciBlYWNoIGVudGl0eTpcbiAgICogICAtIHR5cGVcbiAgICogICAtIElEXG4gICAqICAgLSBwb3NpdGlvblxuICAgKiAgIC0gcm90YXRpb25cbiAgICogICAtIHNjYWxlXG4gICAqICAgLSB2aXNpYmxlXG4gICAqIEByZXR1cm4ge1VJLkNvbGxhcHNpYmxlUGFuZWx9IFBhbmVsIGNvbnRhaW5pbmcgYWxsIHRoZSB3aWRnZXRzXG4gICAqL1xuICBmdW5jdGlvbiBnZW5lcmF0ZUNvbW1vbkNvbXBvbmVudHNQYW5lbCAoKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IG5ldyBVSS5Db2xsYXBzaWJsZVBhbmVsKCk7XG5cbiAgICBjb250YWluZXIuYWRkU3RhdGljKG5ldyBVSS5UZXh0KCdDb21tb24gYXR0cmlidXRlcycpLnNldFRleHRUcmFuc2Zvcm0oJ3VwcGVyY2FzZScpKTtcbiAgICBjb250YWluZXIuYWRkKG5ldyBVSS5CcmVhaygpKTtcblxuICAgIC8vIHR5cGVcbiAgICB2YXIgb2JqZWN0VHlwZVJvdyA9IG5ldyBVSS5Sb3coKTtcbiAgICBvYmplY3RUeXBlID0gbmV3IFVJLlRleHQoKTtcblxuICAgIG9iamVjdFR5cGVSb3cuYWRkKG5ldyBVSS5UZXh0KCdUeXBlJykuc2V0V2lkdGgoJzkwcHgnKSk7XG4gICAgb2JqZWN0VHlwZVJvdy5hZGQob2JqZWN0VHlwZSk7XG5cbiAgICBjb250YWluZXIuYWRkKG9iamVjdFR5cGVSb3cpO1xuXG4gICAgLy8gSURcbiAgICB2YXIgb2JqZWN0SWRSb3cgPSBuZXcgVUkuUm93KCk7XG4gICAgb2JqZWN0SWQgPSBuZXcgVUkuSW5wdXQoKS5zZXRXaWR0aCgnMTUwcHgnKS5zZXRGb250U2l6ZSgnMTJweCcpLm9uQ2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGhhbmRsZUVudGl0eUNoYW5nZShlZGl0b3Iuc2VsZWN0ZWQuZWwsICdpZCcsIG51bGwsIG9iamVjdElkLmdldFZhbHVlKCkpO1xuICAgICAgZWRpdG9yLnNpZ25hbHMuc2NlbmVHcmFwaENoYW5nZWQuZGlzcGF0Y2goKTtcbiAgICB9KTtcblxuICAgIG9iamVjdElkUm93LmFkZChuZXcgVUkuVGV4dCgnSUQnKS5zZXRXaWR0aCgnOTBweCcpKTtcbiAgICBvYmplY3RJZFJvdy5hZGQob2JqZWN0SWQpO1xuICAgIGNvbnRhaW5lci5hZGQob2JqZWN0SWRSb3cpO1xuXG4gICAgLy8gQWRkIHRoZSBwYXJhbWV0ZXIgcm93cyBmb3IgdGhlIGNvbW1vbiBjb21wb25lbnRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21tb25Db21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb250YWluZXIuYWRkKGdldFByb3BlcnR5Um93KGNvbW1vbkNvbXBvbmVudHNbaV0sIG51bGwsIGFmcmFtZUNvcmUuY29tcG9uZW50c1tjb21tb25Db21wb25lbnRzW2ldXS5zY2hlbWEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgdG8gdGhlIGVudGl0eVxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVudGl0eSAgICAgICAgRW50aXR5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIENvbXBvbmVudCBuYW1lXG4gICAqL1xuICBmdW5jdGlvbiBhZGRDb21wb25lbnRUb0VudGl0eSAoZW50aXR5LCBjb21wb25lbnROYW1lKSB7XG4gICAgZW50aXR5LnNldEF0dHJpYnV0ZShjb21wb25lbnROYW1lLCAnJyk7XG4gICAgZ2VuZXJhdGVDb21wb25lbnRzUGFuZWxzKGVudGl0eSk7XG4gICAgdXBkYXRlVUkoZW50aXR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHJvdyBpbmNsdWRpbmcgYSBjb21ib2JveCB3aXRoIHRoZSBhdmFpbGFibGUgY29tcG9uZW50cyB0byBhZGQgdG9cbiAgICogdGhlIGN1cnJlbnQgZW50aXR5XG4gICAqL1xuICBmdW5jdGlvbiBnZW5lcmF0ZUFkZENvbXBvbmVudFJvdyAoKSB7XG4gICAgdmFyIGNvbXBvbmVudHNSb3cgPSBuZXcgVUkuUm93KCk7XG4gICAgdmFyIGNvbXBvbmVudHNPcHRpb25zID0ge307XG4gICAgZm9yICh2YXIgbmFtZSBpbiBhZnJhbWVDb3JlLmNvbXBvbmVudHMpIHtcbiAgICAgIGlmIChjb21tb25Db21wb25lbnRzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgIGNvbXBvbmVudHNPcHRpb25zW25hbWVdID0gbmFtZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRzTGlzdCA9IG5ldyBVSS5TZWxlY3QoKS5zZXRJZCgnY29tcG9uZW50bGlzdCcpLnNldE9wdGlvbnMoY29tcG9uZW50c09wdGlvbnMpLnNldFdpZHRoKCcxNTBweCcpO1xuICAgIGNvbXBvbmVudHNSb3cuYWRkKG5ldyBVSS5UZXh0KCdBZGQnKS5zZXRXaWR0aCgnOTBweCcpKTtcbiAgICBjb21wb25lbnRzUm93LmFkZChjb21wb25lbnRzTGlzdCk7XG4gICAgdmFyIGJ1dHRvbiA9IG5ldyBVSS5CdXR0b24oJysnKS5vbkNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIEFkZCB0aGUgc2VsZWN0ZWQgY29tcG9uZW50IGZyb20gdGhlIGNvbWJvYm94IHRvIHRoZSBjdXJyZW50IGFjdGl2ZSBlbnRpdHlcbiAgICAgIGFkZENvbXBvbmVudFRvRW50aXR5KGVkaXRvci5zZWxlY3RlZC5lbCwgY29tcG9uZW50c0xpc3QuZ2V0VmFsdWUoKSk7XG4gICAgfSk7XG4gICAgY29tcG9uZW50c1Jvdy5hZGQoYnV0dG9uLnNldFdpZHRoKCcyMHB4JykpO1xuICAgIHJldHVybiBjb21wb25lbnRzUm93O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgVUkgd2lkZ2V0cyBiYXNlZCBvbiB0aGUgY3VycmVudCBlbnRpdHkgJiBjb21wb25lbnRzIHZhbHVlc1xuICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbnRpdHkgRW50aXR5IGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlVUkgKGVudGl0eSkge1xuICAgIGlmIChpZ25vcmVDb21wb25lbnRzQ2hhbmdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb2JqZWN0VHlwZS5zZXRWYWx1ZShlbnRpdHkudGFnTmFtZSk7XG4gICAgb2JqZWN0SWQuc2V0VmFsdWUoZW50aXR5LmlkKTtcblxuICAgIC8vIERpc2FibGUgdGhlIGNvbXBvbmVudHMgYWxyZWFkeSB1c2VkIGZvcm0gdGhlIGxpc3Qgb2YgYXZhaWxhYmxlXG4gICAgLy8gY29tcG9uZW50cyB0byBhZGQgdG8gdGhpcyBlbnRpdHlcbiAgICB2YXIgYXZhaWxhYmxlQ29tcG9uZW50cyA9IGNvbXBvbmVudHNMaXN0LmRvbS5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF2YWlsYWJsZUNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF2YWlsYWJsZUNvbXBvbmVudHNbaV0uZGlzYWJsZWQgPSBlbnRpdHkuZ2V0QXR0cmlidXRlKGF2YWlsYWJsZUNvbXBvbmVudHNbaV0udmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgY29tbW9uIHByb3BlcnRpZXMgJiBjb21wb25lbnRzIHRvIGRlZmF1bHQgYXMgdGhleSdyZSBub3QgcmVjcmVhdGVkXG4gICAgLy8gYXMgdGhlIGVudGl0eSBjaGFuZ2VkXG4gICAgZm9yIChpID0gMDsgaSA8IGNvbW1vbkNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gY29tbW9uQ29tcG9uZW50c1tpXTtcbiAgICAgIHZhciBjb21wb25lbnQgPSBhZnJhbWVDb3JlLmNvbXBvbmVudHNbY29tcG9uZW50TmFtZV07XG4gICAgICBpZiAoY29tcG9uZW50LnNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpKSB7XG4gICAgICAgIFdpZGdldHNGYWN0b3J5LnVwZGF0ZVdpZGdldFZhbHVlKGNvbXBvbmVudE5hbWUsIGNvbXBvbmVudC5zY2hlbWEuZGVmYXVsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gY29tcG9uZW50LnNjaGVtYSkge1xuICAgICAgICAgIFdpZGdldHNGYWN0b3J5LnVwZGF0ZVdpZGdldFZhbHVlKGNvbXBvbmVudE5hbWUgKyAnLicgKyBwcm9wZXJ0eU5hbWUsIGNvbXBvbmVudC5zY2hlbWFbcHJvcGVydHlOYW1lXS5kZWZhdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbnRpdHlDb21wb25lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZW50aXR5LmF0dHJpYnV0ZXMpO1xuICAgIGVudGl0eUNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICB2YXIgcHJvcGVydGllcyA9IGVudGl0eS5nZXRBdHRyaWJ1dGUoY29tcG9uZW50Lm5hbWUpO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBXaWRnZXRzRmFjdG9yeS51cGRhdGVXaWRnZXRWYWx1ZShjb21wb25lbnQubmFtZSwgcHJvcGVydGllcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgdmFyIGlkID0gY29tcG9uZW50Lm5hbWUgKyAnLicgKyBwcm9wZXJ0eTtcbiAgICAgICAgICBXaWRnZXRzRmFjdG9yeS51cGRhdGVXaWRnZXRWYWx1ZShpZCwgcHJvcGVydGllc1twcm9wZXJ0eV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBXaWRnZXRzRmFjdG9yeS51cGRhdGVXaWRnZXRWaXNpYmlsaXR5KGVudGl0eSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdG8gZGVmYXVsdCAoY2xlYXIpIG9uZSBlbnRpdHkncyBjb21wb25lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbnRpdHkgICAgICAgIEVudGl0eVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBDb21wb25lbnQgbmFtZSB0byBjbGVhclxuICAgKi9cbiAgZnVuY3Rpb24gc2V0RW1wdHlDb21wb25lbnQgKGVudGl0eSwgY29tcG9uZW50TmFtZSkge1xuICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoY29tcG9uZW50TmFtZSwgJycpO1xuICAgIGdlbmVyYXRlQ29tcG9uZW50c1BhbmVscyhlbnRpdHkpO1xuICAgIHVwZGF0ZVVJKGVudGl0eSk7XG4gICAgZWRpdG9yLnNpZ25hbHMub2JqZWN0Q2hhbmdlZC5kaXNwYXRjaChlbnRpdHkub2JqZWN0M0QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHJvdyBjb250YWluaW5nIHRoZSBwYXJhbWV0ZXIgbGFiZWwgYW5kIGl0cyB3aWRnZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgICBDb21wb25lbnQgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lICAgUHJvcGVydHkgbmFtZVxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcGVydHlTY2hlbWEgUHJvcGVydHkgc2NoZW1hXG4gICAqL1xuICBmdW5jdGlvbiBnZXRQcm9wZXJ0eVJvdyAoY29tcG9uZW50TmFtZSwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVNjaGVtYSkge1xuICAgIHZhciBwcm9wZXJ0eVJvdyA9IG5ldyBVSS5Sb3coKTtcbiAgICB2YXIgcGFuZWxOYW1lID0gcHJvcGVydHlOYW1lIHx8IGNvbXBvbmVudE5hbWU7XG4gICAgdmFyIGxhYmVsID0gbmV3IFVJLlRleHQocGFuZWxOYW1lKTtcbiAgICBwcm9wZXJ0eVJvdy5hZGQobGFiZWwpO1xuXG4gICAgLy8gSWYgdGhlcmUncyBubyBwcm9wZXJ0eU5hbWUgaXQncyBjb25zaWRlcmVkIGEgY29tcG91bmQgYXR0cmlidXRlLlxuICAgIC8vIGVnOiBQb3NpdGlvbiwgUm90YXRpb24gJiBTY2FsZSBhcmUgY29uc2lkZXJlZCBhIGNvbXBvdW5kIGF0dHJpYnV0ZSBvZiB0eXBlICd2ZWN0b3IzJ1xuICAgIC8vICAgIHNjaGVtYToge1xuICAgIC8vICAgICAgICB4OiB7IGRlZmF1bHQ6IDAgfSxcbiAgICAvLyAgICAgICAgeTogeyBkZWZhdWx0OiAwIH0sXG4gICAgLy8gICAgICAgIHo6IHsgZGVmYXVsdDogMCB9XG4gICAgLy8gICAgfVxuICAgIC8vXG4gICAgLy8gV2Ugc2hvdWxkIGNoZWNrIGFsc28gaWYgdGhlIHNjaGVtYSBoYXMgYSAnZGVmYXVsdCcga2V5IGluIHRoYXQgY2FzZSB3ZSdyZSBkZWFsaW5nXG4gICAgLy8gd2l0aCBhIHNpbmdsZSBwcm9wZXJ0eSBjb21wb25lbnRzIGxpa2UgJ3Zpc2libGUnOlxuICAgIC8vICAgIHNjaGVtYTogeyBkZWZhdWx0OiB0cnVlIH0sXG4gICAgaWYgKCFwcm9wZXJ0eU5hbWUgJiYgIXByb3BlcnR5U2NoZW1hLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykpIHtcbiAgICAgIC8vIEl0J3MgYSBjb21wb3VuZENvbXBvbmVudCBsaWtlIFBvc2l0aW9uLCBSb3RhdGlvbiBvciBTY2FsZVxuICAgICAgbGFiZWwuc2V0V2lkdGgoJzkwcHgnKTtcbiAgICAgIHZhciBwcm9wZXJ0eVdpZGdldFNpemUgPSAxNTAgLyBPYmplY3Qua2V5cyhwcm9wZXJ0eVNjaGVtYSkubGVuZ3RoO1xuICAgICAgZm9yIChwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydHlTY2hlbWEpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5V2lkZ2V0ID0gV2lkZ2V0c0ZhY3RvcnkuZ2V0V2lkZ2V0RnJvbVByb3BlcnR5KGNvbXBvbmVudE5hbWUsIG51bGwsIHByb3BlcnR5TmFtZSwgdXBkYXRlRW50aXR5VmFsdWUsIHByb3BlcnR5U2NoZW1hW3Byb3BlcnR5TmFtZV0pO1xuICAgICAgICBwcm9wZXJ0eVdpZGdldC5zZXRXaWR0aChwcm9wZXJ0eVdpZGdldFNpemUgKyAncHgnKTtcbiAgICAgICAgcHJvcGVydHlXaWRnZXQucHJvcGVydHlSb3cgPSBwcm9wZXJ0eVJvdztcbiAgICAgICAgcHJvcGVydHlSb3cuYWRkKHByb3BlcnR5V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGFiZWwuc2V0V2lkdGgoJzEyMHB4Jyk7XG4gICAgICB2YXIgbmV3V2lkZ2V0ID0gV2lkZ2V0c0ZhY3RvcnkuZ2V0V2lkZ2V0RnJvbVByb3BlcnR5KGNvbXBvbmVudE5hbWUsIG51bGwsIHByb3BlcnR5TmFtZSwgdXBkYXRlRW50aXR5VmFsdWUsIHByb3BlcnR5U2NoZW1hKTtcbiAgICAgIG5ld1dpZGdldC5wcm9wZXJ0eVJvdyA9IHByb3BlcnR5Um93O1xuICAgICAgcHJvcGVydHlSb3cuYWRkKG5ld1dpZGdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BlcnR5Um93O1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGFuIFVJLkNvbGxhcHNpYmxlUGFuZWwgZm9yIGVhY2ggZW50aXR5J3MgY29tcG9uZW50XG4gICAqIEBwYXJhbSAge0VsZW1lbnR9IGVudGl0eSBDdXJyZW50IHNlbGVjdGVkIGVudGl0eVxuICAgKi9cbiAgZnVuY3Rpb24gZ2VuZXJhdGVDb21wb25lbnRzUGFuZWxzIChlbnRpdHkpIHtcbiAgICBvYmplY3RDdXN0b21Sb3cuY2xlYXIoKTtcblxuICAgIGZvciAodmFyIGNvbXBvbmVudE5hbWUgaW4gZW50aXR5LmNvbXBvbmVudHMpIHtcbiAgICAgIC8vIElnbm9yZSB0aGUgY29tcG9uZW50cyB0aGF0IHdlJ3ZlIGFscmVhZHkgaW5jbHVkZWQgb24gdGhlIGNvbW1vbiBhdHRyaWJ1dGVzIHBhbmVsXG4gICAgICBpZiAoY29tbW9uQ29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudE5hbWUpICE9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBvbmVudCA9IGVudGl0eS5jb21wb25lbnRzW2NvbXBvbmVudE5hbWVdO1xuXG4gICAgICAvLyBBZGQgYSBjb250ZXh0IG1lbnUgdG8gZGVsZXRlIG9yIHJlc2V0IHRoZSBjb21wb25lbnRcbiAgICAgIHZhciBvYmplY3RBY3Rpb25zID0gbmV3IFVJLlNlbGVjdCgpXG4gICAgICAgIC5zZXRJZChjb21wb25lbnROYW1lKVxuICAgICAgICAuc2V0UG9zaXRpb24oJ2Fic29sdXRlJylcbiAgICAgICAgLnNldFJpZ2h0KCc4cHgnKVxuICAgICAgICAuc2V0Rm9udFNpemUoJzExcHgnKVxuICAgICAgICAuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgJ0FjdGlvbnMnOiAnQWN0aW9ucycsXG4gICAgICAgICAgJ0RlbGV0ZSc6ICdEZWxldGUnLFxuICAgICAgICAgICdDbGVhcic6ICdDbGVhcidcbiAgICAgICAgfSlcbiAgICAgICAgLm9uQ2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIEF2b2lkIHBhbmVsIGNvbGxhcHNpbmdcbiAgICAgICAgfSlcbiAgICAgICAgLm9uQ2hhbmdlKGZ1bmN0aW9uIChldmVudCwgY29tcG9uZW50KSB7XG4gICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnRGVsZXRlJzpcbiAgICAgICAgICAgICAgZW50aXR5LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmdldElkKCkpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQ2xlYXInOlxuICAgICAgICAgICAgICBzZXRFbXB0eUNvbXBvbmVudChlbnRpdHksIHRoaXMuZ2V0SWQoKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2V0VmFsdWUoJ0FjdGlvbnMnKTtcbiAgICAgICAgICBnZW5lcmF0ZUNvbXBvbmVudHNQYW5lbHMoZW50aXR5KTtcbiAgICAgICAgICB1cGRhdGVVSShlbnRpdHkpO1xuICAgICAgICAgIGVkaXRvci5zaWduYWxzLm9iamVjdENoYW5nZWQuZGlzcGF0Y2goZW50aXR5Lm9iamVjdDNEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIENvbGxhcHNpYmxlIHBhbmVsIHdpdGggY29tcG9uZW50IG5hbWUgYXMgdGl0bGVcbiAgICAgIHZhciBjb250YWluZXIgPSBuZXcgVUkuQ29sbGFwc2libGVQYW5lbCgpO1xuICAgICAgY29udGFpbmVyLmFkZFN0YXRpYyhuZXcgVUkuVGV4dChjb21wb25lbnROYW1lKS5zZXRUZXh0VHJhbnNmb3JtKCd1cHBlcmNhc2UnKSwgb2JqZWN0QWN0aW9ucyk7XG4gICAgICBjb250YWluZXIuYWRkKG5ldyBVSS5CcmVhaygpKTtcblxuICAgICAgLy8gQWRkIGEgd2lkZ2V0J3Mgcm93IGZvciBlYWNoIHBhcmFtZXRlciBvbiB0aGUgY29tcG9uZW50XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gY29tcG9uZW50LnNjaGVtYSkge1xuICAgICAgICBjb250YWluZXIuYWRkKGdldFByb3BlcnR5Um93KGNvbXBvbmVudE5hbWUsIHByb3BlcnR5TmFtZSwgY29tcG9uZW50LnNjaGVtYVtwcm9wZXJ0eU5hbWVdKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5hZGQobmV3IFVJLkJyZWFrKCkpO1xuICAgICAgb2JqZWN0Q3VzdG9tUm93LmFkZChjb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB3aGVuIGEgd2lkZ2V0IHZhbHVlIGlzIHVwZGF0ZWQgc28gd2UgY291bGQgdXBkYXRlIHRoZSBlbnRpdHkgYXR0cmlidXRlc1xuICAgKiBAcGFyYW0gIHtFdmVudFRhcmdldH0gZXZlbnQgICAgICAgICBFdmVudCBnZW5lcmF0ZWQgYnkgdGhlIG9uQ2hhbmdlIGxpc3RlbmVyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY29tcG9uZW50TmFtZSBDb21wb25lbnQgbmFtZSBiZWluZyBtb2RpZmllZCAoZWc6ICdnZW9tZXRyeScpXG4gICAqIEBwYXJhbSAge3N0cmluZ30gYXR0cmlidXRlTmFtZSBBdHRyaWJ1dGUgbmFtZSBiZWluZyBtb2RpZmllZCAoZWc6ICdwcmltaXRpdmUnKVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5ICAgICAgUHJvcGVydHkgbmFtZSwgaWYgYW55LCBiZWluZyBtb2RpZmllZCAoZWc6ICd4JylcbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZUVudGl0eVZhbHVlIChldmVudCwgY29tcG9uZW50TmFtZSwgYXR0cmlidXRlTmFtZSwgcHJvcGVydHkpIHtcbiAgICBpZ25vcmVDb21wb25lbnRzQ2hhbmdlID0gdHJ1ZTtcbiAgICB2YXIgZW50aXR5ID0gZWRpdG9yLnNlbGVjdGVkLmVsO1xuXG4gICAgdmFyIGlkID0gYXR0cmlidXRlTmFtZSA/IGNvbXBvbmVudE5hbWUgKyAnLicgKyBhdHRyaWJ1dGVOYW1lICsgJy4nICsgcHJvcGVydHkgOiBwcm9wZXJ0eSA/IChjb21wb25lbnROYW1lICsgJy4nICsgcHJvcGVydHkpIDogY29tcG9uZW50TmFtZTtcbiAgICB2YXIgd2lkZ2V0ID0gV2lkZ2V0c0ZhY3Rvcnkud2lkZ2V0c1tpZF07XG5cbiAgICBoYW5kbGVFbnRpdHlDaGFuZ2UoZW50aXR5LCBjb21wb25lbnROYW1lLCBwcm9wZXJ0eSwgd2lkZ2V0LmdldFZhbHVlKCkpO1xuXG4gICAgV2lkZ2V0c0ZhY3RvcnkudXBkYXRlV2lkZ2V0VmlzaWJpbGl0eShlbnRpdHkpO1xuXG4gICAgZWRpdG9yLnNpZ25hbHMub2JqZWN0Q2hhbmdlZC5kaXNwYXRjaChlbnRpdHkub2JqZWN0M0QpO1xuICAgIGlnbm9yZUNvbXBvbmVudHNDaGFuZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIG1haW4gYXR0cmlidXRlcyBwYW5lbFxuICB2YXIgY29udGFpbmVyID0gbmV3IFVJLlBhbmVsKCk7XG4gIGNvbnRhaW5lci5zZXRCb3JkZXJUb3AoJzAnKTtcbiAgY29udGFpbmVyLnNldFBhZGRpbmdUb3AoJzIwcHgnKTtcbiAgY29udGFpbmVyLnNldERpc3BsYXkoJ25vbmUnKTtcblxuICAvLyBBZGQgY29tbW9uIGF0dHJpYnV0ZXMgcGFuZWwgKHR5cGUsIGlkLCBwb3NpdGlvbiwgcm90YXRpb24sIHNjYWxlLCB2aXNpYmxlKVxuICBjb250YWluZXIuYWRkKGdlbmVyYXRlQ29tbW9uQ29tcG9uZW50c1BhbmVsKCkpO1xuXG4gIC8vIEFwcGVuZCB0aGUgY29tcG9uZW50cyBsaXN0IHRoYXQgdGhlIHVzZXIgY2FuIGFkZCB0byB0aGUgc2VsZWN0ZWQgZW50aXR5XG4gIGNvbnRhaW5lci5hZGQoZ2VuZXJhdGVBZGRDb21wb25lbnRSb3coKSk7XG5cbiAgLy8gRW1wdHkgcm93IHVzZWQgdG8gYXBwZW5kIHRoZSBwYW5lbHMgZnJvbSBlYWNoIGNvbXBvbmVudFxuICBvYmplY3RDdXN0b21Sb3cgPSBuZXcgVUkuUm93KCk7XG4gIGNvbnRhaW5lci5hZGQob2JqZWN0Q3VzdG9tUm93KTtcblxuICAvLyBTaWduYWwgZGlzcGF0Y2hlcnNcbiAgZWRpdG9yLnNpZ25hbHMuZW50aXR5U2VsZWN0ZWQuYWRkKGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICBpZiAoZW50aXR5KSB7XG4gICAgICBjb250YWluZXIuc2hvdygpO1xuICAgICAgZ2VuZXJhdGVDb21wb25lbnRzUGFuZWxzKGVudGl0eSk7XG4gICAgICB1cGRhdGVVSShlbnRpdHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG4gIGVkaXRvci5zaWduYWxzLmNvbXBvbmVudENoYW5nZWQuYWRkKGZ1bmN0aW9uIChldnQpIHtcbiAgICB2YXIgZW50aXR5ID0gZXZ0LmRldGFpbC50YXJnZXQ7XG4gICAgdXBkYXRlVUkoZW50aXR5KTtcbiAgICBlZGl0b3Iuc2lnbmFscy5vYmplY3RDaGFuZ2VkLmRpc3BhdGNoKGVudGl0eS5vYmplY3QzRCk7XG4gIH0pO1xuXG4gIHJldHVybiBjb250YWluZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXR0cmlidXRlcztcbiIsInZhciBjc3MgPSBcIiNzaWRlYmFye3RvcDowfS5PdXRsaW5lcntoZWlnaHQ6MzAwcHh9XCI7IChyZXF1aXJlKFwiYnJvd3NlcmlmeS1jc3NcIikuY3JlYXRlU3R5bGUoY3NzLCB7IFwiaHJlZlwiOiBcInNyYy9wYW5lbHMvY3NzL2N1c3RvbS5jc3NcIn0pKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwidmFyIGNzcyA9IFwiLk91dGxpbmVye2NvbG9yOiM0NDQ7YmFja2dyb3VuZDojZmZmO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2hlaWdodDoxNDBweDtmb250LXNpemU6MTJweDtjdXJzb3I6ZGVmYXVsdDtvdmVyZmxvdzphdXRvO291dGxpbmU6MH0uT3V0bGluZXIgLm9wdGlvbntwYWRkaW5nOjRweDtjb2xvcjojNjY2O3doaXRlLXNwYWNlOm5vd3JhcH0uT3V0bGluZXIgLm9wdGlvbi5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZjhmOGY4fWlucHV0Lk51bWJlcntjb2xvcjojMDA4MGYwIWltcG9ydGFudDtmb250LXNpemU6MTJweDtib3JkZXI6MDtwYWRkaW5nOjJweDtjdXJzb3I6Y29sLXJlc2l6ZX0jdmlld3BvcnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjMycHg7bGVmdDowO3JpZ2h0OjMwMHB4O2JvdHRvbTozMnB4fSN2aWV3cG9ydCAjaW5mb3t0ZXh0LXNoYWRvdzoxcHggMXB4IDAgcmdiYSgwLDAsMCwuMjUpO3BvaW50ZXItZXZlbnRzOm5vbmV9I3NjcmlwdHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MzJweDtsZWZ0OjA7cmlnaHQ6MzAwcHg7Ym90dG9tOjMycHg7b3BhY2l0eTouOX0jcGxheWVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDozMnB4O2xlZnQ6MDtyaWdodDozMDBweDtib3R0b206MzJweH0jbWVudWJhcntwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDozMnB4O2JhY2tncm91bmQ6I2VlZTtwYWRkaW5nOjA7bWFyZ2luOjA7cmlnaHQ6MDt0b3A6MH0jbWVudWJhciAubWVudXtmbG9hdDpsZWZ0O2N1cnNvcjpwb2ludGVyO3BhZGRpbmctcmlnaHQ6OHB4fSNtZW51YmFyIC5tZW51LnJpZ2h0e2Zsb2F0OnJpZ2h0O2N1cnNvcjphdXRvO3BhZGRpbmctcmlnaHQ6MDt0ZXh0LWFsaWduOnJpZ2h0fSNtZW51YmFyIC5tZW51IC50aXRsZXtkaXNwbGF5OmlubGluZS1ibG9jaztjb2xvcjojODg4O21hcmdpbjowO3BhZGRpbmc6OHB4fSNtZW51YmFyIC5tZW51IC5vcHRpb25ze3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6bm9uZTtwYWRkaW5nOjVweCAwO2JhY2tncm91bmQ6I2VlZTt3aWR0aDoxNTBweH0jbWVudWJhciAubWVudTpob3ZlciAub3B0aW9uc3tkaXNwbGF5OmJsb2NrfSNtZW51YmFyIC5tZW51IC5vcHRpb25zIGhye2JvcmRlci1jb2xvcjojZGRkfSNtZW51YmFyIC5tZW51IC5vcHRpb25zIC5vcHRpb257Y29sb3I6IzY2NjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3BhZGRpbmc6NXB4IDEwcHg7bWFyZ2luOjAhaW1wb3J0YW50fSNtZW51YmFyIC5tZW51IC5vcHRpb25zIC5vcHRpb246aG92ZXJ7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiMwOGZ9I21lbnViYXIgLm1lbnUgLm9wdGlvbnMgLm9wdGlvbjphY3RpdmV7Y29sb3I6IzY2NjtiYWNrZ3JvdW5kOjAgMH0jbWVudWJhciAubWVudSAub3B0aW9ucyAuaW5hY3RpdmV7Y29sb3I6I2JiYjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3BhZGRpbmc6NXB4IDEwcHg7bWFyZ2luOjAhaW1wb3J0YW50fSNzaWRlYmFye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjMycHg7Ym90dG9tOjA7d2lkdGg6MzAwcHg7YmFja2dyb3VuZDojZWVlO292ZXJmbG93OmF1dG99I3NpZGViYXIgKnt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9I3NpZGViYXIgaW5wdXQsI3NpZGViYXIgc2VsZWN0LCNzaWRlYmFyIHRleHRhcmVhe2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQ7Y29sb3I6IzQ0NH0jc2lkZWJhciAuUGFuZWx7Y29sb3I6Izg4ODtwYWRkaW5nOjEwcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2NjY30jc2lkZWJhciAuUGFuZWwuY29sbGFwc2Vke21hcmdpbi1ib3R0b206MH0jc2lkZWJhciAuUm93e21pbi1oZWlnaHQ6MjBweDttYXJnaW4tYm90dG9tOjEwcHh9I3RhYnN7YmFja2dyb3VuZC1jb2xvcjojZGRkO2JvcmRlci10b3A6MXB4IHNvbGlkICNjY2N9I3RhYnMgc3Bhbntjb2xvcjojYWFhO2JvcmRlci1yaWdodDoxcHggc29saWQgI2NjYztwYWRkaW5nOjEwcHh9I3RhYnMgc3Bhbi5zZWxlY3RlZHtjb2xvcjojODg4O2JhY2tncm91bmQtY29sb3I6I2VlZX0jdG9vbGJhcntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MzAwcHg7Ym90dG9tOjA7aGVpZ2h0OjMycHg7YmFja2dyb3VuZDojZWVlO2NvbG9yOiMzMzN9I3Rvb2xiYXIgKnt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9I3Rvb2xiYXIgLlBhbmVse3BhZGRpbmc6NHB4O2NvbG9yOiM4ODh9I3Rvb2xiYXIgYnV0dG9ue21hcmdpbi1yaWdodDo2cHh9XCI7IChyZXF1aXJlKFwiYnJvd3NlcmlmeS1jc3NcIikuY3JlYXRlU3R5bGUoY3NzLCB7IFwiaHJlZlwiOiBcInNyYy9wYW5lbHMvY3NzL2xpZ2h0LmNzc1wifSkpOyBtb2R1bGUuZXhwb3J0cyA9IGNzczsiLCJ2YXIgY3NzID0gXCJib2R5e2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O21hcmdpbjowO292ZXJmbG93OmhpZGRlbn1ocntib3JkZXI6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjY2NjfWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZX10ZXh0YXJlYXt0YWItc2l6ZTo0O3doaXRlLXNwYWNlOnByZTt3b3JkLXdyYXA6bm9ybWFsfXRleHRhcmVhLnN1Y2Nlc3N7Ym9yZGVyLWNvbG9yOiM4YjghaW1wb3J0YW50fXRleHRhcmVhLmZhaWx7Ym9yZGVyLWNvbG9yOnJlZCFpbXBvcnRhbnQ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwwLDAsLjA1KX1pbnB1dCx0ZXh0YXJlYXtvdXRsaW5lOjB9LlBhbmVsey1tb3otdXNlci1zZWxlY3Q6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5QYW5lbC5Db2xsYXBzaWJsZSAuU3RhdGlje21hcmdpbjowfS5QYW5lbC5Db2xsYXBzaWJsZSAuU3RhdGljIC5CdXR0b257ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6NnB4O3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyOjZweCBzb2xpZCB0cmFuc3BhcmVudH0uUGFuZWwuQ29sbGFwc2libGUuY29sbGFwc2VkIC5TdGF0aWMgLkJ1dHRvbnttYXJnaW4tdG9wOjJweDtib3JkZXItbGVmdC1jb2xvcjojYmJifS5QYW5lbC5Db2xsYXBzaWJsZTpub3QoLmNvbGxhcHNlZCkgLlN0YXRpYyAuQnV0dG9ue21hcmdpbi10b3A6NnB4O2JvcmRlci10b3AtY29sb3I6I2JiYn0uUGFuZWwuQ29sbGFwc2libGUuY29sbGFwc2VkIC5Db250ZW50e2Rpc3BsYXk6bm9uZX0uQ29kZU1pcnJvcntwb3NpdGlvbjphYnNvbHV0ZSFpbXBvcnRhbnQ7dG9wOjM3cHg7d2lkdGg6MTAwJSFpbXBvcnRhbnQ7aGVpZ2h0OmNhbGMoMTAwJSAtIDM3cHgpIWltcG9ydGFudH0uQ29kZU1pcnJvciAuZXJyb3JMaW5le2JhY2tncm91bmQ6cmdiYSgyNTUsMCwwLC4yNSl9LkNvZGVNaXJyb3IgLmVzcHJpbWEtZXJyb3J7Y29sb3I6cmVkO3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzowIDIwcHh9LnR5cGV7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cGFkZGluZzowIDJweDtjb2xvcjojZGRkfS50eXBlOmFmdGVye2NvbnRlbnQ6J+KWoCd9LlNjZW5le2NvbG9yOiNjY2Z9Lk9iamVjdDNEe2NvbG9yOiNhYWV9Lk1lc2h7Y29sb3I6Izg4ZX0uTGluZSwuTGluZVNlZ21lbnRze2NvbG9yOiM4ZTh9LlBvaW50c3tjb2xvcjojZTg4fS5Qb2ludExpZ2h0e2NvbG9yOiNkZDB9Lkdlb21ldHJ5e2NvbG9yOiM4Zjh9LkJveEdlb21ldHJ5e2NvbG9yOiNiZWJ9LlRvcnVzR2VvbWV0cnl7Y29sb3I6I2FlYX0uTWF0ZXJpYWx7Y29sb3I6I2Y4OH0uTWVzaFBob25nTWF0ZXJpYWx7Y29sb3I6I2ZhOH1cIjsgKHJlcXVpcmUoXCJicm93c2VyaWZ5LWNzc1wiKS5jcmVhdGVTdHlsZShjc3MsIHsgXCJocmVmXCI6IFwic3JjL3BhbmVscy9jc3MvbWFpbi5jc3NcIn0pKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwidmFyIGNzcyA9IFwiLmVkaXRvci10b29sc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjgpfS5lZGl0b3ItdG9vbHMgYnV0dG9ue2Zsb2F0OmxlZnR9XCI7IChyZXF1aXJlKFwiYnJvd3NlcmlmeS1jc3NcIikuY3JlYXRlU3R5bGUoY3NzLCB7IFwiaHJlZlwiOiBcInNyYy9wYW5lbHMvY3NzL3Rvb2xiYXIuY3NzXCJ9KSk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsInJlcXVpcmUoJy4vY3NzL21haW4uY3NzJyk7XG5yZXF1aXJlKCcuL2Nzcy9saWdodC5jc3MnKTtcbnJlcXVpcmUoJy4vY3NzL2N1c3RvbS5jc3MnKTtcbnJlcXVpcmUoJy4vY3NzL3Rvb2xiYXIuY3NzJyk7XG5cbnZhciBUb29sUGFuZWwgPSByZXF1aXJlKCcuL3Rvb2xzJyk7XG52YXIgU2lkZWJhciA9IHJlcXVpcmUoJy4vc2lkZWJhci5qcycpO1xuXG5mdW5jdGlvbiBQYW5lbHMgKGVkaXRvcikge1xuICB0aGlzLnRvb2xQYW5lbCA9IG5ldyBUb29sUGFuZWwoKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRvb2xQYW5lbC5lbCk7XG5cbiAgdGhpcy5zaWRlYmFyID0gbmV3IFNpZGViYXIoZWRpdG9yKTtcbiAgdGhpcy5zaWRlYmFyLmhpZGUoKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnNpZGViYXIuZG9tKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYW5lbHM7XG4iLCIvKiBnbG9iYWwgYWZyYW1lRWRpdG9yICovXG52YXIgVUkgPSByZXF1aXJlKCcuLi8uLi9saWIvdmVuZG9yL3VpLmpzJyk7IC8vIEB0b2RvIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgbnBtIHBhY2thZ2VcblxuZnVuY3Rpb24gU2NlbmVHcmFwaCAoZWRpdG9yKSB7XG4gIC8vIE1lZ2FoYWNrIHRvIGluY2x1ZGUgZm9udC1hd2Vzb21lXG4gIC8vIC0tLS0tLS0tLS0tLS1cbiAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gIGxpbmsuaHJlZiA9ICdodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjUuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnO1xuICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgbGluay5tZWRpYSA9ICdzY3JlZW4scHJpbnQnO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAvLyAtLS0tLS0tLS0tLS1cblxuICB0aGlzLnNjZW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS1zY2VuZScpO1xuXG4gIHZhciBzaWduYWxzID0gZWRpdG9yLnNpZ25hbHM7XG5cbiAgdmFyIGNvbnRhaW5lciA9IG5ldyBVSS5QYW5lbCgpO1xuXG4gIHZhciBpZ25vcmVPYmplY3RTZWxlY3RlZFNpZ25hbCA9IGZhbHNlO1xuXG4gIHZhciBvdXRsaW5lciA9IHRoaXMub3V0bGluZXIgPSBuZXcgVUkuT3V0bGluZXIoZWRpdG9yKTtcblxuICAvLyBoYW5kbGUgZW50aXR5IHNlbGVjdGlvbiBjaGFuZ2UgaW4gcGFuZWxcbiAgb3V0bGluZXIub25DaGFuZ2UoZnVuY3Rpb24gKGUpIHtcbiAgICBpZ25vcmVPYmplY3RTZWxlY3RlZFNpZ25hbCA9IHRydWU7XG4gICAgYWZyYW1lRWRpdG9yLmVkaXRvci5zaWduYWxzLmVudGl0eVNlbGVjdGVkLmRpc3BhdGNoKG91dGxpbmVyLmdldFZhbHVlKCkpO1xuICAgIGlnbm9yZU9iamVjdFNlbGVjdGVkU2lnbmFsID0gZmFsc2U7XG4gIH0pO1xuXG4gIC8vIGhhbmRsZSBlbnR0aXkgY2hhbmdlIHNlbGVjdGlvbiBmcm9tIHNjZW5lLlxuICBzaWduYWxzLm9iamVjdFNlbGVjdGVkLmFkZChmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgLy8gaWdub3JlIGF1dG9tYXRlZCBzZWxlY3Rpb24gb2Ygb2JqZWN0IGluIHNjZW5lIHRyaWdnZXJlZCBmcm9tIG91dGxpbmVyLlxuICAgIGlmIChpZ25vcmVPYmplY3RTZWxlY3RlZFNpZ25hbCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cbiAgICAvLyBzZXQgb3V0bGluZXIgdG8gY3VycmVudCBzZWxlY3RlZCBvYmplY3RcbiAgICBvdXRsaW5lci5zZXRWYWx1ZShvYmplY3QgIT09IG51bGwgPyBvYmplY3QuZWwgOiBudWxsKTtcbiAgfSk7XG5cbiAgc2lnbmFscy5zY2VuZUdyYXBoQ2hhbmdlZC5hZGQodGhpcy5yZWZyZXNoKTtcblxuICBjb250YWluZXIuYWRkKG91dGxpbmVyKTtcblxuICBjb250YWluZXIuYWRkKG5ldyBVSS5CcmVhaygpKTtcblxuICB0aGlzLnJlZnJlc2goKTtcblxuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5TY2VuZUdyYXBoLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3B0aW9ucyA9IFtdO1xuXG4gIG9wdGlvbnMucHVzaCh7IHN0YXRpYzogdHJ1ZSwgdmFsdWU6IHRoaXMuc2NlbmUsIGh0bWw6ICc8c3BhbiBjbGFzcz1cInR5cGVcIj48L3NwYW4+IGEtc2NlbmUnIH0pO1xuXG4gIGZ1bmN0aW9uIHRyZWVJdGVyYXRlIChlbGVtZW50LCBkZXB0aCkge1xuICAgIGlmIChkZXB0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZXB0aCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlcHRoICs9IDE7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5jaGlsZHJlbjtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuXG4gICAgICAvLyBmaWx0ZXIgb3V0IGFsbCBlbnRpdGllcyBhZGRlZCBieSBlZGl0b3JcbiAgICAgIGlmICghY2hpbGQuZGF0YXNldC5pc0VkaXRvcikge1xuICAgICAgICB2YXIgZXh0cmEgPSAnJztcblxuICAgICAgICB2YXIgaWNvbnMgPSB7J2NhbWVyYSc6ICdmYS12aWRlby1jYW1lcmEnLCAnbGlnaHQnOiAnZmEtbGlnaHRidWxiLW8nLCAnZ2VvbWV0cnknOiAnZmEtY3ViZScsICdtYXRlcmlhbCc6ICdmYS1waWN0dXJlLW8nfTtcbiAgICAgICAgZm9yICh2YXIgaWNvbiBpbiBpY29ucykge1xuICAgICAgICAgIGlmIChjaGlsZC5jb21wb25lbnRzW2ljb25dKSB7XG4gICAgICAgICAgICBleHRyYSArPSAnIDxpIGNsYXNzPVwiZmEgJyArIGljb25zW2ljb25dICsgJ1wiPjwvaT4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0eXBlID0gJzxzcGFuIGNsYXNzPVwidHlwZSBNZXNoXCI+PC9zcGFuPic7XG4gICAgICAgIHZhciBwYWQgPSAnJm5ic3A7Jm5ic3A7Jm5ic3A7Jy5yZXBlYXQoZGVwdGgpO1xuICAgICAgICB2YXIgbGFiZWwgPSBjaGlsZC5pZCA/IGNoaWxkLmlkIDogJ2EtZW50aXR5JztcblxuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgIHN0YXRpYzogdHJ1ZSxcbiAgICAgICAgICB2YWx1ZTogY2hpbGQsXG4gICAgICAgICAgaHRtbDogcGFkICsgdHlwZSArIGxhYmVsICsgZXh0cmFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0cmVlSXRlcmF0ZShjaGlsZCwgZGVwdGgpO1xuICAgIH1cbiAgfVxuICB0cmVlSXRlcmF0ZSh0aGlzLnNjZW5lKTtcblxuICB0aGlzLm91dGxpbmVyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lR3JhcGg7XG4iLCJ2YXIgVUkgPSByZXF1aXJlKCcuLi8uLi9saWIvdmVuZG9yL3VpLmpzJyk7IC8vIEB0b2RvIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgbnBtIHBhY2thZ2VcbnZhciBTY2VuZUdyYXBoID0gcmVxdWlyZSgnLi9zY2VuZWdyYXBoJyk7XG52YXIgQXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5mdW5jdGlvbiBTaWRlYmFyIChlZGl0b3IpIHtcbiAgdmFyIGNvbnRhaW5lciA9IG5ldyBVSS5QYW5lbCgpO1xuICBjb250YWluZXIuc2V0SWQoJ3NpZGViYXInKTtcblxuICB0aGlzLnNjZW5lR3JhcGggPSBuZXcgU2NlbmVHcmFwaChlZGl0b3IpO1xuICB0aGlzLmF0dHJpYnV0ZXMgPSBuZXcgQXR0cmlidXRlcyhlZGl0b3IpO1xuXG4gIHZhciBzY2VuZSA9IG5ldyBVSS5TcGFuKCkuYWRkKFxuICAgIHRoaXMuc2NlbmVHcmFwaCxcbiAgICB0aGlzLmF0dHJpYnV0ZXNcbiAgKTtcblxuICBjb250YWluZXIuYWRkKHNjZW5lKTtcblxuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZGViYXI7XG4iLCIvKiBnbG9iYWwgYWZyYW1lRWRpdG9yICovXG5cbmZ1bmN0aW9uIFBhbmVsICgpIHtcbiAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci10b29scycpO1xuICB0aGlzLnRvb2xzID0gYWZyYW1lRWRpdG9yLmVkaXRvci50b29scztcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5lZGl0VG9nZ2xlKCk7XG4gIHRoaXMubWFrZVRvb2xzKCk7XG4gIHRoaXMuc2hvd1Rvb2xzKHRoaXMuYWN0aXZlKTtcbn1cblxuUGFuZWwucHJvdG90eXBlLmVkaXRUb2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHRoaXMudG9nZ2xlQnV0dG9uLmlubmVySFRNTCA9ICdFZGl0JztcbiAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLnRvZ2dsZUJ1dHRvbik7XG4gIHRoaXMudG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblRvZ2dsZUNsaWNrLmJpbmQodGhpcykpO1xufTtcblxuUGFuZWwucHJvdG90eXBlLm1ha2VUb29scyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRvb2xzID0gdGhpcy50b29scztcbiAgZm9yICh2YXIgdG9vbCBpbiB0b29scykge1xuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uaWQgPSB0b29sO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnZWRpdG9yLXRvb2xzLS10b29sJztcbiAgICBidXR0b24uaW5uZXJIVE1MID0gdG9vbDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uVG9vbENsaWNrLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxufTtcblxuUGFuZWwucHJvdG90eXBlLnNob3dUb29scyA9IGZ1bmN0aW9uIChkaXNwbGF5KSB7XG4gIHZhciBlbGVtZW50cyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLmVkaXRvci10b29scy0tdG9vbCcpO1xuICB2YXIgdG9vbEVscyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsZW1lbnRzKTtcbiAgdG9vbEVscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5ID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgfSk7XG59O1xuXG5QYW5lbC5wcm90b3R5cGUuc2VsZWN0VG9vbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZpcnN0O1xuICBmb3IgKGZpcnN0IGluIHRoaXMudG9vbHMpIGJyZWFrO1xuICB0aGlzLnNlbGVjdGVkVG9vbCA9IHRoaXMudG9vbHNbZmlyc3RdO1xuICB0aGlzLnNlbGVjdGVkVG9vbC5zdGFydCgpO1xufTtcblxuUGFuZWwucHJvdG90eXBlLmVuZEN1cnJlbnRUb29sID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zZWxlY3RlZFRvb2wpIHtcbiAgICB0aGlzLnNlbGVjdGVkVG9vbC5lbmQoKTtcbiAgfVxufTtcblxuUGFuZWwucHJvdG90eXBlLm9uVG9vbENsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhpcy5lbmRDdXJyZW50VG9vbCgpO1xuICB0aGlzLnNlbGVjdGVkVG9vbCA9IHRoaXMudG9vbHNbZS50YXJnZXQuaWRdO1xuICB0aGlzLnNlbGVjdGVkVG9vbC5zdGFydCgpO1xufTtcblxuUGFuZWwucHJvdG90eXBlLm9uVG9nZ2xlQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlID09PSBmYWxzZTtcblxuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi5pbm5lckhUTUwgPSAnRXhpdCc7XG4gICAgdGhpcy5zZWxlY3RUb29sKCk7XG4gICAgdGhpcy5zaG93VG9vbHModHJ1ZSk7XG4gICAgYWZyYW1lRWRpdG9yLmVkaXRvci5oZWxwZXJzLnNob3coKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi5pbm5lckhUTUwgPSAnRWRpdCc7XG4gICAgdGhpcy5lbmRDdXJyZW50VG9vbCgpO1xuICAgIHRoaXMuc2hvd1Rvb2xzKGZhbHNlKTtcbiAgICBhZnJhbWVFZGl0b3IuZWRpdG9yLmhlbHBlcnMuaGlkZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhbmVsO1xuIiwiLyogZ2xvYmFsIGFmcmFtZUNvcmUgKi9cbnZhciBVSSA9IHJlcXVpcmUoJy4uLy4uL2xpYi92ZW5kb3IvdWkuanMnKTsgLy8gQHRvZG8gd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBucG0gcGFja2FnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd2lkZ2V0czoge30sXG5cbiAgLyoqXG4gICAqIFt1cGRhdGVXaWRnZXRWYWx1ZSBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSBpZCAgICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gdmFsdWUgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHVwZGF0ZVdpZGdldFZhbHVlOiBmdW5jdGlvbiAoaWQsIHZhbHVlKSB7XG4gICAgaWYgKHRoaXMud2lkZ2V0c1tpZF0pIHtcbiAgICAgIHRoaXMud2lkZ2V0c1tpZF0uc2V0VmFsdWUodmFsdWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogR2l2ZW4gYW4gcHJvcGVydHlTY2hlbWEgaXQgd2lsbCByZXR1cm5zIHRoZSBpbmZlcmVkIGJ5IHRoZSBkZWZhdWx0IHZhbHVlIGluIGNhc2VcbiAgICogdGhhdCAndHlwZScgYXR0cmlidXRlIGlzIG5vdCBkZWZpbmVkXG4gICAqIEBwYXJhbSAge29iamVjdH0gcHJvcGVydHlTY2hlbWEgSlNPTiBzY2hlbWEgZm9yIHRoZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgUHJvcGVydHkgdHlwZVxuICAgKi9cbiAgZ2V0UHJvcGVydHlUeXBlOiBmdW5jdGlvbiAocHJvcGVydHlTY2hlbWEpIHtcbiAgICB2YXIgZGVmYXVsdFZhbHVlID0gcHJvcGVydHlTY2hlbWEuZGVmYXVsdDtcbiAgICBpZiAocHJvcGVydHlTY2hlbWEub25lT2YpIHtcbiAgICAgIHJldHVybiAnc2VsZWN0JztcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoICh0eXBlb2YgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiAnY2hlY2tib3gnO1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICByZXR1cm4gJ3ZlY3RvcjMnO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHJldHVybiAoZGVmYXVsdFZhbHVlLmluZGV4T2YoJyMnKSA9PT0gLTEpID8gJ2lucHV0JyA6ICdjb2xvcic7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIGF0dHJpYnV0ZScsIHByb3BlcnR5U2NoZW1hKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSB3aWRnZXQgYmFzZWQgb24gdGhlIHR5cGUgb2YgdGhlIGF0dHJpYnV0ZVxuICAgKiBJZiBhIHNjaGVtYSBpcyBwcm92aWRlZCBpdCdzIHVzZWQgdG8gc2V0IG1pbi9tYXggdmFsdWVzIG9yIHBvcHVsYXRlIHRoZSBjb21ib2JveCB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lICAgTmFtZSBvZiB0aGUgY29tcG9uZW50IHRoYXQgaGFzIHRoaXMgYXR0cmlidXRlIChlLmc6ICdnZW9tZXRyeScpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWUgICBQcm9wZXJ0eSBuYW1lIGluIHRoZSBjb21wb25lbnQgKGUuZzogJ3ByaW1pdGl2ZScpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSAgICAgICAgUHJvcGVydHkgbmFtZSBpbiBjYXNlIG9mIG11bHRpdmFsdWVzIGF0dHJpYnV0ZXMgKGUuZzogJ3gnKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAgICAgICAgICAgIFR5cGUgb2YgdGhlIHdpZGdldCB0byBnZW5lcmF0ZSAoZS5nOiAnY2hlY2tib3gnKVxuICAgKiBAcGFyYW0ge0pTT059IHByb3BlcnR5U2NoZW1hIFtPcHRpb25hbF0gSlNPTiB3aXRoIHRoZSBzY2hlbWEgZGVmaW5pdGlvbiBvZiB0aGUgYXR0cmlidXRlLlxuICAgKiBAcmV0dXJuIHtVSS5XaWRnZXR9IFJldHVybnMgYW4gVUkuanMgd2lkZ2V0IGJhc2VkIG9uIHRoZSB0eXBlIGFuZCBzY2hlbWEgb2YgdGhlIGF0dHJpYnV0ZS5cbiAgICovXG4gIGdldFdpZGdldEZyb21Qcm9wZXJ0eTogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUsIHByb3BlcnR5TmFtZSwgcHJvcGVydHksIG9uVXBkYXRlRW50aXR5VmFsdWUsIHByb3BlcnR5U2NoZW1hKSB7XG4gICAgdmFyIHdpZGdldCA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBwcm9wZXJ0eVNjaGVtYSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHByb3BlcnR5U2NoZW1hID0ge307XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJvcGVydHlTY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGNvbXBvbmVudE5hbWUsIHByb3BlcnR5TmFtZSwgcHJvcGVydHksIHByb3BlcnR5U2NoZW1hKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0UHJvcGVydHlUeXBlKHByb3BlcnR5U2NoZW1hKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgLy8gQ29udmVydCBhcnJheSB0byBvYmplY3RcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BlcnR5U2NoZW1hLm9uZU9mKSB7XG4gICAgICAgICAgb3B0aW9uc1twcm9wZXJ0eVNjaGVtYS5vbmVPZltrZXldXSA9IHByb3BlcnR5U2NoZW1hLm9uZU9mW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgd2lkZ2V0ID0gbmV3IFVJLlNlbGVjdCgpLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICB3aWRnZXQgPSBuZXcgVUkuQ2hlY2tib3goKS5zZXRXaWR0aCgnNTBweCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHdpZGdldCA9IG5ldyBVSS5OdW1iZXIoKS5zZXRXaWR0aCgnNTBweCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgICAgd2lkZ2V0ID0gbmV3IFVJLklucHV0KCcnKS5zZXRXaWR0aCgnNTBweCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgd2lkZ2V0ID0gbmV3IFVJLkNvbG9yKCkuc2V0V2lkdGgoJzUwcHgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2ZWN0b3IzJzpcbiAgICAgICAgd2lkZ2V0ID0gbmV3IFVJLlZlY3RvcjMoKS5zZXRXaWR0aCgnMTUwcHgnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ1Vua25vd24gY29tcG9uZW50IHR5cGUnLCBjb21wb25lbnROYW1lLCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5LCB0eXBlKTtcbiAgICAgICAgd2lkZ2V0ID0gbmV3IFVJLklucHV0KCcnKTtcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5U2NoZW1hLmhhc093blByb3BlcnR5KCdtaW4nKSkge1xuICAgICAgd2lkZ2V0Lm1pbiA9IHByb3BlcnR5U2NoZW1hLm1pbjtcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5U2NoZW1hLmhhc093blByb3BlcnR5KCdtYXgnKSkge1xuICAgICAgd2lkZ2V0Lm1heCA9IHByb3BlcnR5U2NoZW1hLm1heDtcbiAgICB9XG4gICAgd2lkZ2V0LnNjaGVtYSA9IHByb3BlcnR5U2NoZW1hO1xuICAgIHdpZGdldC5vbkNoYW5nZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIG9uVXBkYXRlRW50aXR5VmFsdWUoZXZlbnQsIGNvbXBvbmVudE5hbWUsIHByb3BlcnR5TmFtZSwgcHJvcGVydHkpO1xuICAgIH0pO1xuXG4gICAgLy8gR2VuZXJhdGUgYW4gdW5pcXVlIElEIGZvciB0aGlzIGF0dHJpYnV0ZSAoZS5nOiBnZW9tZXRyeS5wcmltaXRpdmUpXG4gICAgLy8gYW5kIHNhdmUgaXQgb24gdGhlIHdpZGdldHMgdmFyaWFibGUgc28gd2UgY291bGQgZWFzaWx5IGFjY2VzcyB0byBpdCBpbiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uc1xuICAgIHZhciBpZCA9IHByb3BlcnR5TmFtZSA/IGNvbXBvbmVudE5hbWUgKyAnLicgKyBwcm9wZXJ0eU5hbWUgKyAnLicgKyBwcm9wZXJ0eSA6IHByb3BlcnR5ID8gKGNvbXBvbmVudE5hbWUgKyAnLicgKyBwcm9wZXJ0eSkgOiBjb21wb25lbnROYW1lO1xuICAgIHdpZGdldC5zZXRJZChpZCk7XG4gICAgd2lkZ2V0LnNldFZhbHVlKHByb3BlcnR5U2NoZW1hLmRlZmF1bHQpO1xuXG4gICAgdGhpcy53aWRnZXRzW2lkXSA9IHdpZGdldDtcbiAgICByZXR1cm4gd2lkZ2V0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHdpZGdldHMgdmlzaWJpbGl0eSBiYXNlZCBvbiB0aGUgJ2lmJyBhdHRyaWJ1dGUgZnJvbSB0aGVpcnMgYXR0cmlidXRlJyBzY2hlbWFcbiAgICogQHBhcmFtICB7RWxlbWVudH0gZW50aXR5IEVudGl0eSBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICovXG4gIHVwZGF0ZVdpZGdldFZpc2liaWxpdHk6IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICBmb3IgKHZhciBjb21wb25lbnROYW1lIGluIGVudGl0eS5jb21wb25lbnRzKSB7XG4gICAgICB2YXIgcHJvcGVydGllcyA9IGFmcmFtZUNvcmUuY29tcG9uZW50c1tjb21wb25lbnROYW1lXS5zY2hlbWE7XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhciBpZCA9IGNvbXBvbmVudE5hbWUgKyAnLicgKyBwcm9wZXJ0eTtcbiAgICAgICAgdmFyIHdpZGdldCA9IHRoaXMud2lkZ2V0c1tpZF07XG4gICAgICAgIGlmICh3aWRnZXQgJiYgd2lkZ2V0LnByb3BlcnR5Um93KSB7XG4gICAgICAgICAgdmFyIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgIGlmICh3aWRnZXQuc2NoZW1hLmlmKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb25kaXRpb24gaW4gd2lkZ2V0LnNjaGVtYS5pZikge1xuICAgICAgICAgICAgICB2YXIgaWZXaWRnZXQgPSB0aGlzLndpZGdldHNbY29tcG9uZW50TmFtZSArICcuJyArIGNvbmRpdGlvbl07XG4gICAgICAgICAgICAgIGlmICh3aWRnZXQuc2NoZW1hLmlmW2NvbmRpdGlvbl0uaW5kZXhPZihpZldpZGdldC5nZXRWYWx1ZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIHdpZGdldC5wcm9wZXJ0eVJvdy5zaG93KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZGdldC5wcm9wZXJ0eVJvdy5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW91c2U6IHJlcXVpcmUoJy4vbW91c2UnKSxcbiAgaW5zcGVjdG9yOiByZXF1aXJlKCcuL2luc3BlY3RvcicpLFxuICBtb2RpZnk6IHJlcXVpcmUoJy4vbW9kaWZ5JyksXG4gIHBsYWNlOiByZXF1aXJlKCcuL3BsYWNlJylcbn07XG4iLCIvKiBnbG9iYWwgYWZyYW1lRWRpdG9yICovXG4vKlxuSW5zcGVjdG9yIHRvb2xcbiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogJ0luc3BlY3QnLFxuXG4gIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuc2NlbmUuY2FtZXJhRWw7XG5cbiAgICB0aGlzLnNpZGViYXIgPSBhZnJhbWVFZGl0b3IuZWRpdG9yLnBhbmVscy5zaWRlYmFyO1xuICAgIHRoaXMuc2lkZWJhci5zaG93KCk7XG5cbiAgICB0aGlzLnNldHVwQ3Vyc29yKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNpZGViYXIuaGlkZSgpO1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVDdXJzb3IoKTtcbiAgfSxcblxuICBhZGRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9uQ29udGV4dG1lbnUgPSB0aGlzLnBpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uSW50ZXJzZWN0aW9uID0gdGhpcy5oYW5kbGVJbnRlcnNlY3Rpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uSW50ZXJzZWN0aW9uQ2xlYXIgPSB0aGlzLmhhbmRsZUludGVyc2VjdGlvbkNsZWFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkVudGl0eUNoYW5nZSA9IHRoaXMuaGFuZGxlRW50aXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnNjZW5lLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0bWVudSk7XG4gICAgdGhpcy5jdXJzb3IuYWRkRXZlbnRMaXN0ZW5lcignaW50ZXJzZWN0aW9uJywgdGhpcy5vbkludGVyc2VjdGlvbik7XG4gICAgdGhpcy5jdXJzb3IuYWRkRXZlbnRMaXN0ZW5lcignaW50ZXJzZWN0aW9uY2xlYXJlZCcsIHRoaXMub25JbnRlcnNlY3Rpb25DbGVhcik7XG4gIH0sXG5cbiAgcmVtb3ZlTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2VuZS5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLm9uQ29udGV4dG1lbnUpO1xuICAgIHRoaXMuY3Vyc29yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ludGVyc2VjdGlvbicsIHRoaXMub25JbnRlcnNlY3Rpb24pO1xuICAgIHRoaXMuY3Vyc29yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ludGVyc2VjdGlvbmNsZWFyZWQnLCB0aGlzLm9uSW50ZXJzZWN0aW9uQ2xlYXIpO1xuICB9LFxuXG4gIHNldHVwQ3Vyc29yOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jdXJzb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhLWVudGl0eScpO1xuICAgIHRoaXMuY3Vyc29yLmRhdGFzZXQuaXNFZGl0b3IgPSB0cnVlO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCAnMCAwIC0xMCcpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnZ2VvbWV0cnknLCAncHJpbWl0aXZlOiByaW5nOyByYWRpdXNPdXRlcjogMC4zOyByYWRpdXNJbm5lcjogMC4yJyk7XG4gICAgdGhpcy5jdXJzb3Iuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsICdjb2xvcjogeWVsbG93OyByZWNlaXZlTGlnaHQ6IGZhbHNlOycpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnY3Vyc29yJywgJ21heERpc3RhbmNlOiAzMCcpO1xuICAgIHRoaXMuY2FtZXJhLmFwcGVuZENoaWxkKHRoaXMuY3Vyc29yKTtcbiAgfSxcblxuICByZW1vdmVDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnNvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3Vyc29yKTtcbiAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gIH0sXG5cbiAgaGFuZGxlSW50ZXJzZWN0aW9uOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuY3VycmVudEludGVyc2VjdGlvbiA9IGUuZGV0YWlsO1xuICB9LFxuXG4gIGhhbmRsZUludGVyc2VjdGlvbkNsZWFyOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuY3VycmVudEludGVyc2VjdGlvbiA9IG51bGw7XG4gIH0sXG5cbiAgaGFuZGxlRW50aXR5Q2hhbmdlOiBmdW5jdGlvbiAobmFtZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgdmFyIGVudGl0eSA9IHRoaXMuc2VsZWN0ZWRFbnRpdHk7XG5cbiAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgIC8vIG11bHRpcGxlIGF0dHJpYnV0ZSBwcm9wZXJ0aWVzXG4gICAgICB2YXIgcHJvcGVydGllcyA9IGVudGl0eS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgZW50aXR5LnNldEF0dHJpYnV0ZShuYW1lLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2luZ2xlIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgZW50aXR5LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zaWRlYmFyLnVwZGF0ZSgpO1xuICB9LFxuXG4gIHBpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5jdXJyZW50SW50ZXJzZWN0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcbiAgICAgIGFmcmFtZUVkaXRvci5lZGl0b3Iuc2lnbmFscy5lbnRpdHlTZWxlY3RlZC5kaXNwYXRjaChudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZW50aXR5ID0gdGhpcy5jdXJyZW50SW50ZXJzZWN0aW9uLmVsO1xuICAgIGFmcmFtZUVkaXRvci5lZGl0b3Iuc2lnbmFscy5lbnRpdHlTZWxlY3RlZC5kaXNwYXRjaChlbnRpdHkpO1xuICB9XG59O1xuIiwiLyogZ2xvYmFsIFRIUkVFICovXG4vKlxuTW9kaWZ5IGVudGl0eSB0b29sXG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6ICdNb2RpZnknLFxuXG4gIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuc2NlbmUuY2FtZXJhRWw7XG5cbiAgICB0aGlzLnNldHVwQ3Vyc29yKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVudGl0eSkge1xuICAgICAgdGhpcy5kcm9wKCk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVDdXJzb3IoKTtcbiAgfSxcblxuICBhZGRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9uQ29udGV4dG1lbnUgPSB0aGlzLnVzZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25JbnRlcnNlY3Rpb24gPSB0aGlzLmhhbmRsZUludGVyc2VjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25JbnRlcnNlY3Rpb25DbGVhciA9IHRoaXMuaGFuZGxlSW50ZXJzZWN0aW9uQ2xlYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTW91c2V3aGVlbCA9IHRoaXMuaGFuZGxlTW91c2V3aGVlbC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zY2VuZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLm9uQ29udGV4dG1lbnUpO1xuICAgIHRoaXMuY3Vyc29yLmFkZEV2ZW50TGlzdGVuZXIoJ2ludGVyc2VjdGlvbicsIHRoaXMub25JbnRlcnNlY3Rpb24pO1xuICAgIHRoaXMuY3Vyc29yLmFkZEV2ZW50TGlzdGVuZXIoJ2ludGVyc2VjdGlvbmNsZWFyZWQnLCB0aGlzLm9uSW50ZXJzZWN0aW9uQ2xlYXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMub25Nb3VzZXdoZWVsKTtcbiAgfSxcblxuICByZW1vdmVMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNjZW5lLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0bWVudSk7XG4gICAgdGhpcy5jdXJzb3IucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW50ZXJzZWN0aW9uJywgdGhpcy5vbkludGVyc2VjdGlvbik7XG4gICAgdGhpcy5jdXJzb3IucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW50ZXJzZWN0aW9uY2xlYXJlZCcsIHRoaXMub25JbnRlcnNlY3Rpb25DbGVhcik7XG4gIH0sXG5cbiAgc2V0dXBDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnNvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EtZW50aXR5Jyk7XG4gICAgdGhpcy5jdXJzb3Iuc2V0QXR0cmlidXRlKCdpZCcsICdlZGl0b3Itc2VsZWN0LWN1cnNvcicpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCAnMCAwIC0xMCcpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnY3Vyc29yJywgJ21heERpc3RhbmNlOiAzMCcpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnZ2VvbWV0cnknLCAncHJpbWl0aXZlOiByaW5nOyByYWRpdXNPdXRlcjogMC4zOyByYWRpdXNJbm5lcjogMC4yJyk7XG4gICAgdGhpcy5jdXJzb3Iuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsICdjb2xvcjogcmVkOyByZWNlaXZlTGlnaHQ6IGZhbHNlOycpO1xuICAgIHRoaXMuY2FtZXJhLmFwcGVuZENoaWxkKHRoaXMuY3Vyc29yKTtcbiAgfSxcblxuICByZW1vdmVDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnNvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3Vyc29yKTtcbiAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gIH0sXG5cbiAgaGFuZGxlTW91c2V3aGVlbDogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgZW50aXR5ID0gdGhpcy5zZWxlY3RlZEVudGl0eTtcblxuICAgIGlmICghZW50aXR5KSB7IHJldHVybjsgfVxuXG4gICAgdmFyIHBhcmVudCA9IGVudGl0eS5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQuaGFzQXR0cmlidXRlKCdjYW1lcmEnKSkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gZW50aXR5LmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKTtcbiAgICAgIHBvc2l0aW9uLnogKz0gZS5kZWx0YVk7XG4gICAgICBlbnRpdHkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHBvc2l0aW9uKTtcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlSW50ZXJzZWN0aW9uOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuY3VycmVudEludGVyc2VjdGlvbiA9IGUuZGV0YWlsO1xuICB9LFxuXG4gIGhhbmRsZUludGVyc2VjdGlvbkNsZWFyOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuY3VycmVudEludGVyc2VjdGlvbiA9IG51bGw7XG4gIH0sXG5cbiAgcGljazogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5jdXJyZW50SW50ZXJzZWN0aW9uKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGVudGl0eSA9IHRoaXMuY3VycmVudEludGVyc2VjdGlvbi5lbDtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmN1cnJlbnRJbnRlcnNlY3Rpb24uZGlzdGFuY2U7XG4gICAgdmFyIGNsb25lID0gZW50aXR5LmNsb25lTm9kZSgpO1xuXG4gICAgY2xvbmUuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHt4OiAwLCB5OiAwLCB6OiAtZGlzdGFuY2V9KTtcbiAgICB0aGlzLmNhbWVyYS5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgZW50aXR5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZW50aXR5KTtcblxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBjbG9uZTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkRW50aXR5KSB7IHJldHVybjsgfVxuXG4gICAgdmFyIG9iamVjdDNEID0gdGhpcy5zZWxlY3RlZEVudGl0eS5vYmplY3QzRDtcbiAgICBvYmplY3QzRC51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG4gICAgLy8gc2V0IG9iamVjdHMgdG8gd29ybGQgcm90YXRpb24uXG4gICAgdmFyIGV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKCk7XG4gICAgZXVsZXIuc2V0RnJvbVJvdGF0aW9uTWF0cml4KG9iamVjdDNELm1hdHJpeFdvcmxkKTtcblxuICAgIHZhciByb3RhdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiBldWxlci55ICogKDE4MCAvIE1hdGguUEkpLFxuICAgICAgejogMFxuICAgIH07XG5cbiAgICAvLyBwb3NpdGlvblxuICAgIHZhciBwb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgcG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKG9iamVjdDNELm1hdHJpeFdvcmxkKTtcblxuICAgIHZhciBjbG9uZSA9IHRoaXMuc2VsZWN0ZWRFbnRpdHkuY2xvbmVOb2RlKCk7XG4gICAgY2xvbmUuc2V0QXR0cmlidXRlKCdyb3RhdGlvbicsIHJvdGF0aW9uKTtcbiAgICBjbG9uZS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgcG9zaXRpb24pO1xuXG4gICAgdGhpcy5zY2VuZS5hcHBlbmRDaGlsZChjbG9uZSk7XG5cbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zZWxlY3RlZEVudGl0eSk7XG5cbiAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcbiAgfSxcblxuICB1c2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5zZWxlY3RlZEVudGl0eSkge1xuICAgICAgdGhpcy5waWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcCgpO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qIGdsb2JhbCBhZnJhbWVFZGl0b3IgKi9cbi8qXG5JbnNwZWN0b3IgdG9vbFxuKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiAnTW91c2UnLFxuXG4gIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuc2NlbmUuY2FtZXJhRWw7XG5cbiAgICB0aGlzLnNpZGViYXIgPSBhZnJhbWVFZGl0b3IuZWRpdG9yLnBhbmVscy5zaWRlYmFyO1xuICAgIHRoaXMuc2lkZWJhci5zaG93KCk7XG5cbiAgICB0aGlzLnNldHVwQ3Vyc29yKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNpZGViYXIuaGlkZSgpO1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5yZW1vdmVDdXJzb3IoKTtcbiAgfSxcblxuICBhZGRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9uQ29udGV4dG1lbnUgPSB0aGlzLnBpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uSW50ZXJzZWN0aW9uID0gdGhpcy5oYW5kbGVJbnRlcnNlY3Rpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uSW50ZXJzZWN0aW9uQ2xlYXIgPSB0aGlzLmhhbmRsZUludGVyc2VjdGlvbkNsZWFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkVudGl0eUNoYW5nZSA9IHRoaXMuaGFuZGxlRW50aXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnNjZW5lLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMub25Db250ZXh0bWVudSk7XG4gICAgdGhpcy5jdXJzb3IuYWRkRXZlbnRMaXN0ZW5lcignaW50ZXJzZWN0aW9uJywgdGhpcy5vbkludGVyc2VjdGlvbik7XG4gICAgdGhpcy5jdXJzb3IuYWRkRXZlbnRMaXN0ZW5lcignaW50ZXJzZWN0aW9uY2xlYXJlZCcsIHRoaXMub25JbnRlcnNlY3Rpb25DbGVhcik7XG4gIH0sXG5cbiAgcmVtb3ZlTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2VuZS5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLm9uQ29udGV4dG1lbnUpO1xuICAgIHRoaXMuY3Vyc29yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ludGVyc2VjdGlvbicsIHRoaXMub25JbnRlcnNlY3Rpb24pO1xuICAgIHRoaXMuY3Vyc29yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ludGVyc2VjdGlvbmNsZWFyZWQnLCB0aGlzLm9uSW50ZXJzZWN0aW9uQ2xlYXIpO1xuICB9LFxuXG4gIHNldHVwQ3Vyc29yOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jdXJzb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhLWVudGl0eScpO1xuICAgIHRoaXMuY3Vyc29yLmRhdGFzZXQuaXNFZGl0b3IgPSB0cnVlO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCAnMCAwIC0xMCcpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnZ2VvbWV0cnknLCAncHJpbWl0aXZlOiByaW5nOyByYWRpdXNPdXRlcjogMC4zOyByYWRpdXNJbm5lcjogMC4yJyk7XG4gICAgdGhpcy5jdXJzb3Iuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsICdjb2xvcjogeWVsbG93OyByZWNlaXZlTGlnaHQ6IGZhbHNlOycpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnY3Vyc29yJywgJ21heERpc3RhbmNlOiAzMCcpO1xuICAgIHRoaXMuY2FtZXJhLmFwcGVuZENoaWxkKHRoaXMuY3Vyc29yKTtcbiAgfSxcblxuICByZW1vdmVDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnNvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3Vyc29yKTtcbiAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gIH0sXG5cbiAgaGFuZGxlSW50ZXJzZWN0aW9uOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuY3VycmVudEludGVyc2VjdGlvbiA9IGUuZGV0YWlsO1xuICB9LFxuXG4gIGhhbmRsZUludGVyc2VjdGlvbkNsZWFyOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuY3VycmVudEludGVyc2VjdGlvbiA9IG51bGw7XG4gIH0sXG5cbiAgaGFuZGxlRW50aXR5Q2hhbmdlOiBmdW5jdGlvbiAobmFtZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgdmFyIGVudGl0eSA9IHRoaXMuc2VsZWN0ZWRFbnRpdHk7XG5cbiAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgIC8vIG11bHRpcGxlIGF0dHJpYnV0ZSBwcm9wZXJ0aWVzXG4gICAgICB2YXIgcHJvcGVydGllcyA9IGVudGl0eS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgZW50aXR5LnNldEF0dHJpYnV0ZShuYW1lLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2luZ2xlIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgZW50aXR5LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zaWRlYmFyLnVwZGF0ZSgpO1xuICB9LFxuXG4gIHBpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5jdXJyZW50SW50ZXJzZWN0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcbiAgICAgIGFmcmFtZUVkaXRvci5lZGl0b3Iuc2lnbmFscy5lbnRpdHlTZWxlY3RlZC5kaXNwYXRjaChudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZW50aXR5ID0gdGhpcy5jdXJyZW50SW50ZXJzZWN0aW9uLmVsO1xuICAgIGFmcmFtZUVkaXRvci5lZGl0b3Iuc2lnbmFscy5lbnRpdHlTZWxlY3RlZC5kaXNwYXRjaChlbnRpdHkpO1xuICB9XG59O1xuIiwiLyogZ2xvYmFsIFRIUkVFLCBhZnJhbWVFZGl0b3IgKi9cblxudmFyIGNvbG91cnMgPSBbJyNEQTYzNjknLCAnIzQxOTFBNicsICcjNUFBODlBJywgJyM1QUE4OUEnLCAnI0YzOUM4NSddO1xuXG52YXIgcHJpbWl0aXZlcyA9IFtcbiAge1xuICAgIG5hbWU6ICdib3gnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICBnZW9tZXRyeTogJ3ByaW1pdGl2ZTogYm94OyB3aWR0aDogMjsgaGVpZ2h0OiAyOyBkZXB0aDogMicsXG4gICAgICBtYXRlcmlhbDogJ2NvbG9yOiAnICsgY29sb3Vyc1swXVxuICAgIH1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdzcGhlcmUnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICBnZW9tZXRyeTogJ3ByaW1pdGl2ZTogc3BoZXJlOyByYWRpdXM6IDEnLFxuICAgICAgbWF0ZXJpYWw6ICdjb2xvcjogJyArIGNvbG91cnNbMV1cbiAgICB9XG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndG9ydXMnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICBnZW9tZXRyeTogJ3ByaW1pdGl2ZTogdG9ydXM7IHJhZGl1czogMS42OyB0dWJlOiAuNTsgc2VnbWVudHM6IDMyOyB0dWJ1bGFyU2VnbWVudHM6IDEwJyxcbiAgICAgIG1hdGVyaWFsOiAnY29sb3I6ICcgKyBjb2xvdXJzWzJdXG4gICAgfVxuICB9XG5dO1xuXG4vKlxuUGxhY2UgbmV3IGVudGl0eSB0b29sXG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6ICdQbGFjZScsXG5cbiAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNjZW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS1zY2VuZScpO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy5zY2VuZS5jYW1lcmFFbDtcblxuICAgIHRoaXMuc2V0dXBDdXJzb3IoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICB9LFxuXG4gIGVuZDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5KSB7XG4gICAgICB0aGlzLmRyb3AoKTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnJlbW92ZUN1cnNvcigpO1xuICB9LFxuXG4gIGFkZExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25Db250ZXh0bWVudSA9IHRoaXMudXNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbktleXByZXNzID0gdGhpcy5oYW5kbGVLZXlwcmVzcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2NlbmUuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5vbkNvbnRleHRtZW51KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLm9uS2V5cHJlc3MpO1xuICB9LFxuXG4gIHJlbW92ZUxpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2NlbmUuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5vbkNvbnRleHRtZW51KTtcbiAgfSxcblxuICBzZXR1cEN1cnNvcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY3Vyc29yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYS1lbnRpdHknKTtcbiAgICB0aGlzLmN1cnNvci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VkaXRvci1wbGFjZS1jdXJzb3InKTtcbiAgICB0aGlzLmN1cnNvci5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgJzAgMCAtMTAnKTtcbiAgICB0aGlzLmN1cnNvci5zZXRBdHRyaWJ1dGUoJ2N1cnNvcicsICdtYXhEaXN0YW5jZTogMzAnKTtcbiAgICB0aGlzLmN1cnNvci5zZXRBdHRyaWJ1dGUoJ2dlb21ldHJ5JywgJ3ByaW1pdGl2ZTogc3BoZXJlOyByYWRpdXM6IDAuMycpO1xuICAgIHRoaXMuY3Vyc29yLnNldEF0dHJpYnV0ZSgnbWF0ZXJpYWwnLCAnY29sb3I6IGdyZWVuOyByZWNlaXZlTGlnaHQ6IGZhbHNlOycpO1xuICAgIHRoaXMuY2FtZXJhLmFwcGVuZENoaWxkKHRoaXMuY3Vyc29yKTtcbiAgfSxcblxuICByZW1vdmVDdXJzb3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnNvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3Vyc29yKTtcbiAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gIH0sXG5cbiAgaGFuZGxlS2V5cHJlc3M6IGZ1bmN0aW9uIChlKSB7XG4gICAgc3dpdGNoIChlLmNoYXJDb2RlKSB7XG4gICAgICBjYXNlIDkxOiAvLyBbXG4gICAgICAgIHRoaXMucHJldigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTM6IC8vIF1cbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcblxuICBwcmV2OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkRW50aXR5KSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5pbmRleCAtPSAxO1xuICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xuICAgICAgdGhpcy5pbmRleCA9IHByaW1pdGl2ZXMubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5uZXcodGhpcy5pbmRleCk7XG4gIH0sXG5cbiAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZEVudGl0eSkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuaW5kZXggKz0gMTtcbiAgICBpZiAodGhpcy5pbmRleCA+IHByaW1pdGl2ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgfVxuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLm5ldyh0aGlzLmluZGV4KTtcbiAgfSxcblxuICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRW50aXR5KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRW50aXR5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zZWxlY3RlZEVudGl0eSk7XG4gICAgICB0aGlzLnNlbGVjdGVkRW50aXR5ID0gbnVsbDtcbiAgICB9XG4gIH0sXG5cbiAgbmV3OiBmdW5jdGlvbiAoaSkge1xuICAgIGlmICghaSkge1xuICAgICAgaSA9IHRoaXMuaW5kZXggPyB0aGlzLmluZGV4IDogMDtcbiAgICB9XG5cbiAgICB2YXIgcHJpbWl0aXZlID0gcHJpbWl0aXZlc1tpXTtcblxuICAgIC8vIHRvZG86IHVzZSB0ZW1wbGF0ZXMgaGVyZS5cbiAgICB2YXIgZW50aXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYS1lbnRpdHknKTtcblxuICAgIC8vIGxvYWQgZGVmYXVsdCBhdHRyaWJ1dGVzXG4gICAgZm9yICh2YXIgYXR0ciBpbiBwcmltaXRpdmUuZGVmYXVsdHMpIHtcbiAgICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoYXR0ciwgcHJpbWl0aXZlLmRlZmF1bHRzW2F0dHJdKTtcbiAgICB9XG5cbiAgICBlbnRpdHkuc2V0QXR0cmlidXRlKCdyb3RhdGlvbicsICcwIDAgMCcpO1xuICAgIGVudGl0eS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgJzAgMCAtMTAnKTtcblxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBlbnRpdHk7XG5cbiAgICB0aGlzLmNhbWVyYS5hcHBlbmRDaGlsZChlbnRpdHkpO1xuXG4gICAgdGhpcy5pbmRleCA9IGk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZEVudGl0eSkgeyByZXR1cm47IH1cbiAgICB2YXIgb2JqZWN0M0QgPSB0aGlzLnNlbGVjdGVkRW50aXR5Lm9iamVjdDNEO1xuICAgIG9iamVjdDNELnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cbiAgICAvLyBzZXQgb2JqZWN0cyB0byB3b3JsZCByb3RhdGlvbi5cbiAgICB2YXIgZXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoKTtcbiAgICBldWxlci5zZXRGcm9tUm90YXRpb25NYXRyaXgob2JqZWN0M0QubWF0cml4V29ybGQpO1xuXG4gICAgdmFyIHJvdGF0aW9uID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGV1bGVyLnkgKiAoMTgwIC8gTWF0aC5QSSksXG4gICAgICB6OiAwXG4gICAgfTtcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgdmFyIHBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICBwb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24ob2JqZWN0M0QubWF0cml4V29ybGQpO1xuXG4gICAgdmFyIGNsb25lID0gdGhpcy5zZWxlY3RlZEVudGl0eS5jbG9uZU5vZGUoKTtcbiAgICBjbG9uZS5zZXRBdHRyaWJ1dGUoJ3JvdGF0aW9uJywgcm90YXRpb24pO1xuICAgIGNsb25lLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBwb3NpdGlvbik7XG5cbiAgICB0aGlzLnNjZW5lLmFwcGVuZENoaWxkKGNsb25lKTtcblxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNlbGVjdGVkRW50aXR5KTtcblxuICAgIHRoaXMuc2VsZWN0ZWRFbnRpdHkgPSBudWxsO1xuXG4gICAgYWZyYW1lRWRpdG9yLmVkaXRvci5zaWduYWxzLnNjZW5lR3JhcGhDaGFuZ2VkLmRpc3BhdGNoKCk7XG4gIH0sXG5cbiAgdXNlOiBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRFbnRpdHkpIHtcbiAgICAgIHRoaXMubmV3KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcCgpO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qIGdsb2JhbCBUSFJFRSAqL1xuZnVuY3Rpb24gVmlld3BvcnQgKGVkaXRvcikge1xuICB2YXIgc2lnbmFscyA9IGVkaXRvci5zaWduYWxzO1xuXG4gIHZhciBzZWxlY3Rpb25Cb3ggPSBuZXcgVEhSRUUuQm94SGVscGVyKCk7XG4gIHNlbGVjdGlvbkJveC5tYXRlcmlhbC5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgc2VsZWN0aW9uQm94Lm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgc2VsZWN0aW9uQm94LnZpc2libGUgPSBmYWxzZTtcbiAgZWRpdG9yLmhlbHBlcnMuYWRkKHNlbGVjdGlvbkJveCk7XG4gIHNpZ25hbHMub2JqZWN0U2VsZWN0ZWQuYWRkKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBzZWxlY3Rpb25Cb3gudmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmICghZWRpdG9yLnNlbGVjdGVkIHx8IGVkaXRvci5zZWxlY3RlZC5lbC5oZWxwZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob2JqZWN0ICE9PSBudWxsKSB7XG4gICAgICBpZiAob2JqZWN0Lmdlb21ldHJ5ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuU3ByaXRlID09PSBmYWxzZSkge1xuICAgICAgICBzZWxlY3Rpb25Cb3gudXBkYXRlKG9iamVjdCk7XG4gICAgICAgIHNlbGVjdGlvbkJveC52aXNpYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHNpZ25hbHMub2JqZWN0Q2hhbmdlZC5hZGQoZnVuY3Rpb24gKCkge1xuICAgIGlmIChlZGl0b3Iuc2VsZWN0ZWQuZWwuaGVscGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbGVjdGlvbkJveC51cGRhdGUoZWRpdG9yLnNlbGVjdGVkKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld3BvcnQ7XG4iXX0=
