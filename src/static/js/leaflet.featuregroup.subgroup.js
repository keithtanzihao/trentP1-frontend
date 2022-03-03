/*!
 Leaflet.FeatureGroup.SubGroup 1.0.2+00bb0d4
 (c) 2015-2017 Boris Seang
 License BSD-2-Clause
 */
!(function (e, r) {
  "function" == typeof define && define.amd
    ? define(["leaflet"], r)
    : r("object" == typeof module && module.exports ? require("leaflet") : e.L);
})(this, function (e) {
  (e.FeatureGroup.SubGroup = e.FeatureGroup.extend({
    initialize: function (r, t) {
      e.FeatureGroup.prototype.initialize.call(this, t), this.setParentGroup(r);
    },
    setParentGroup: function (r) {
      var t = r instanceof e.LayerGroup;
      return (
        (this._parentGroup = r),
        (this.onAdd = t
          ? "function" == typeof r.addLayers
            ? this._onAddToGroupBatch
            : this._onAddToGroup
          : this._onAddToMap),
        (this.onRemove = t
          ? "function" == typeof r.removeLayers
            ? this._onRemoveFromGroupBatch
            : this._onRemoveFromGroup
          : this._onRemoveFromMap),
        (this.addLayer = t ? this._addLayerToGroup : this._addLayerToMap),
        (this.removeLayer = t
          ? this._removeLayerFromGroup
          : this._removeLayerFromMap),
        this
      );
    },
    setParentGroupSafe: function (e) {
      var r = this._map;
      return (
        r && r.removeLayer(this),
        this.setParentGroup(e),
        r && r.addLayer(this),
        this
      );
    },
    getParentGroup: function () {
      return this._parentGroup;
    },
    _onAddToGroupBatch: function (e) {
      var r = this.getLayers();
      (this._map = e), this._parentGroup.addLayers(r);
    },
    _onRemoveFromGroupBatch: function () {
      var e = this.getLayers();
      this._parentGroup.removeLayers(e), (this._map = null);
    },
    _onAddToGroup: function (e) {
      var r = this._parentGroup;
      (this._map = e), this.eachLayer(r.addLayer, r);
    },
    _onRemoveFromGroup: function () {
      var e = this._parentGroup;
      this.eachLayer(e.removeLayer, e), (this._map = null);
    },
    _onAddToMap: e.FeatureGroup.prototype.onAdd,
    _onRemoveFromMap: e.FeatureGroup.prototype.onRemove,
    _addLayerToGroup: function (e) {
      if (this.hasLayer(e)) return this;
      e.addEventParent(this);
      var r = this.getLayerId(e);
      return (
        (this._layers[r] = e),
        this._map && this._parentGroup.addLayer(e),
        this.fire("layeradd", { layer: e })
      );
    },
    _removeLayerFromGroup: function (e) {
      if (!this.hasLayer(e)) return this;
      var r = e in this._layers ? e : this.getLayerId(e);
      return (
        (e = this._layers[r]),
        e.removeEventParent(this),
        this._map && e && this._parentGroup.removeLayer(e),
        delete this._layers[r],
        this.fire("layerremove", { layer: e })
      );
    },
    _addLayerToMap: e.FeatureGroup.prototype.addLayer,
    _removeLayerFromMap: e.FeatureGroup.prototype.removeLayer,
  })),
    (e.featureGroup.subGroup = function (r, t) {
      return new e.FeatureGroup.SubGroup(r, t);
    });
});
