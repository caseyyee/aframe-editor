/* global aframeEditor */
/*
2D mouse inspector tool
*/
module.exports = {
  name: 'Mouse',

  start: function () {
    this.scene = document.querySelector('a-scene');
    this.camera = this.scene.cameraEl.object3D.children[0];

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
    this.scene.canvas.addEventListener('mousemove', this.handleMousemove.bind(this));
  },

  removeListeners: function () {
  },

  setupCursor: function () {
    this.raycaster = new THREE.Raycaster();
  },

  removeCursor: function () {
  },

  handleMousemove: function (e) {
    var scene = this.scene.object3D;

    var mouse = new THREE.Vector2();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(mouse, this.camera);

    var intersects = this.raycaster.intersectObjects(scene.children, true);

    var helpers = aframeEditor.editor.helpers.helpers;

    intersects.forEach(function (intersection) {
      var object3D = intersection.object;

      for (var id in helpers) {
        console.log(object3D) //  == helpers[id]
        // if (object3D === helpers[id]) {
        //   console.log(object3D);
        // }
      }
    })

    // console.log(intersects[0]);
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
