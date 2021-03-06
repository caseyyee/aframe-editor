import React from 'react';
import Modal from './Modal';
var insertNewAsset = require('../../lib/assetsUtils').insertNewAsset;

function getFilename(url) {
  return url.split('/').pop();
}

var ModalTextures = React.createClass({
  getInitialState: function() {
    return {
      isOpen: this.props.isOpen,
      loadedTextures: [],
      assetsImages: [],
      samplesImages: [],
      addNewDialogOpened: false,
      preview: {width:0, height:0, src: '', name: '', loaded: false}
    }
  },
  componentWillReceiveProps: function(newProps) {
    if (this.state.isOpen !== newProps.isOpen) {
      this.setState({isOpen: newProps.isOpen});
      if (newProps.isOpen) {
        this.generateFromAssets();
      }
    }
  },
  onClose: function(value) {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },
  selectTexture: function(value) {
    if (this.props.onClose) {
      this.props.onClose(value);
    }
  },
  generateFromSamples: function() {
    var self = this;
    this.samplesImages.map((imageData) => {

      var image = new Image();
      image.addEventListener('load', function() {
        self.state.samplesImages.push({id: imageData.name, src: image.src, width: image.width, height: image.height, name: imageData.name, type: 'sample', value: 'url(' + image.src + ')'});
        self.setState({samplesImages: self.state.samplesImages});
      });
      image.src = imageData.src;
    });
  },
  generateFromAssets: function() {
    this.setState({assetsImages: []});

    var self = this;
    Array.prototype.slice.call(document.querySelectorAll('a-assets img')).map((asset) => {
      var image = new Image();
      image.addEventListener('load', function() {
        self.state.assetsImages.push({id: asset.id, src: image.src, width: image.width, height: image.height, name: asset.id, type: 'asset', value: '#' + asset.id});
        self.setState({assetsImages: self.state.assetsImages});
      });
      image.src = asset.src;
    });
  },
  generateFromTextureCache: function() {

  },
  componentDidMount: function() {
    this.samplesImages = [
      {name: 'create1111', src:'assets/textures/758px-Canestra_di_frutta_Caravaggio.jpg'},
      {name: 'asdfqwer', src:'assets/textures/2294472375_24a3b8ef46_o.jpg'},
      {name: 'werwere', src:'assets/textures/brick_diffuse.jpg'},
      {name: 'werasdfasdf', src:'assets/textures/checkerboard.jpg'},
      {name: 'create', src:'assets/textures/crate.gif'},
      {name: 'uv_grid_sim', src:'assets/textures/UV_Grid_Sm.jpg'},
      {name: 'sprite0', src:'assets/textures/sprite0.png'},
      {name: 'envmap', src:'assets/textures/envmap.png'},
      {name: 'brick dump', src:'assets/textures/brick_bump.jpg'}
    ];

    this.generateFromSamples();
    this.generateFromAssets();
    this.generateFromTextureCache();

    /*
    Object.keys(editor.sceneEl.systems.material.textureCache).map((hash) => {
      var texturePromise = editor.sceneEl.systems.material.textureCache[hash];
      texturePromise.then(texture => {
        var elementPos = self.state.loadedTextures.map(function(x) {return x.image.src; }).indexOf(texture.image.src);
        if (elementPos === -1) {
          var newTextures = self.state.loadedTextures.slice();
          newTextures.push(texture);
          self.setState({
            loadedTextures: newTextures
          });
        }
      })
    });*/
  },
  onNewUrl: function(event) {
    var self = this;
    function onImageLoaded(img) {
      self.setState({preview: {
          width: self.refs.preview.naturalWidth,
          height: self.refs.preview.naturalHeight,
          src: self.refs.preview.src,
          id: '',
          name: '',
          type: 'new',
          loaded: true,
          value: 'url(' + self.refs.preview.src + ')'
        }
      });
      self.refs.preview.removeEventListener('load', onImageLoaded);
    }
    this.refs.preview.addEventListener('load', onImageLoaded);
    //this.refs.preview.src = event.target.value;
    this.refs.preview.src = 'assets/textures/wall.jpg';
  },
  onNewName: function(event) {
    this.state.preview.name = event.target.value;
  },
  onNameChanged: function(event) {
    this.state.preview.name = event.target.value;
    this.setState({preview: this.state.preview});
  },
  toggleNewDialog: function() {
    this.setState({addNewDialogOpened: !this.state.addNewDialogOpened});
  },
  render: function() {
    let samples = this.textures;
    //let alreadyLoaded = editor.sceneEl.systems.material.textureCache;
    let loadedTextures = this.state.loadedTextures;
    let newUrl = this.state.newUrl;
    let preview = this.state.preview;
    let name = this.state.preview.name;

    //title="Textures" isOpen={this.state.isOpen} onClose={this.onClose}>
    //let imagePreviewClick = this.selectTexture.bind(this, this.state.preview);
    var self = this;
    let imagePreviewClick = function() {

      self.selectTexture(self.state.preview);
    }

    let addNewAsset = function() {
      insertNewAsset('img', self.state.preview.name, self.state.preview.src);
      self.generateFromAssets();
      self.toggleNewDialog();
    }

    let selectSample = function(image) {
      self.setState({preview: {
          width: image.width,
          height: image.height,
          src: image.src,
          id: '',
          name: image.name, // or id?
          type: 'sample',
          loaded: true,
          value: 'url(' + image.src + ')'
        }
      });
      self.refs.imageName.focus();
    }

    return <Modal title="Textures" isOpen={this.state.isOpen} onClose={this.onClose}>
      <button onClick={this.toggleNewDialog}>ADD NEW ASSET</button>
      <div className={this.state.addNewDialogOpened ? '' : 'hide'}>
        <div className="newimage">
          <div className="new_asset_options">
            <span>Please choose one of the following options to add a new image asset</span>
            <ul>
              <li><span>Enter URL:</span> <input type="text" value={this.props.newUrl} onChange={this.onNewUrl}/></li>
              <li><span>Upload file:</span> <input type="file" value={this.props.newUrl} onChange={this.onNewUrl}/></li>
              <li><span>Select image from samples</span>
                <ul className="gallery">
                  {
                     this.state.samplesImages.map(function(image) {
                       //let imageClick = this.selectTexture.bind(this, image);
                       let imageClick = selectSample.bind(this, image);
                        return (
                          <li key={image.src} onClick={imageClick}>
                            <img width="155px" height="155px" src={image.src}/>
                            <div className="detail">
                              <span className="title">{image.name}</span><br/>
                              <span>{getFilename(image.src)}</span><br/>
                              <span><em>{image.width} x {image.height}</em></span>
                            </div>
                          </li>
                        )
                     })
                  }
                </ul>
              </li>
            </ul>
          </div>
          <div className="preview">
            Image name: <input ref="imageName" type="text" value={this.state.preview.name} onChange={this.onNameChanged}/><br/><br/>
          <img ref="preview" width="155px" height="155px" src={preview.src}/>
            {
              this.state.preview.loaded ?
              (
                <div className="detail">
                  <span>{getFilename(preview.src)}</span><br/>
                  <span>{preview.width} x {preview.height}</span>
                </div>
              ) : <span></span>
            }
            <br/><br/>
            <button onClick={addNewAsset}>ADD IMAGE TO ASSETS</button>
          </div>
        </div>
      </div>
      <div className={this.state.addNewDialogOpened ? 'hide' : ''}>
        <ul className="gallery">
          {
            this.state.assetsImages.map(function(image) {
              let textureClick = this.selectTexture.bind(this, image);
               return (
                 <li key={image.id} onClick={textureClick}>
                   <img width="155px" height="155px" src={image.src}/>
                   <div className="detail">
                     <span className="title">{image.name}</span><br/>
                     <span>{getFilename(image.src)}</span><br/>
                     <span><em>{image.width} x {image.height}</em></span>
                   </div>
                 </li>
               )
            }.bind(this))
          }

          {
            loadedTextures.map(function(texture) {
              var image = texture.image;
              let textureClick = this.selectTexture.bind(this, texture);
               return (
                 <li key={texture.uuid} onClick={textureClick}>
                   <img width="155px" height="155px" src={image.src}/>
                   <div className="detail">
                     <span className="title">Name:</span> <span>{image.name}</span><br/>
                     <span className="title">Filename:</span> <span>{getFilename(image.src)}</span><br/>
                     <span><em>{image.width} x {image.height}</em></span>
                   </div>
                 </li>
               )
            })
          }
        </ul>
      </div>
    </Modal>
  }
});

module.exports = ModalTextures;
