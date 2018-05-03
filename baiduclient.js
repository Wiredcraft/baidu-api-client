/* eslint-disable max-len */

'use strict';

const rp = require('request-promise');

const COORD_TYPE = {
  // GPS latitude and longitude coordinates
  GPS: 1,
  // The National Bureau of Survey encryption latitude and longitude coordinates
  NATIONAL_BUREAU: 2,
  // Baidu encryption latitude and longitude coordinates
  BAIDU_LL: 3,
  // Baidu encryption Mercator coordinates
  BAIDU_MC: 4
};

/**
 * @doc http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodataV4
 */
class BaiduClient {
  /**
   * @param {string} token - the baidu `ak`
   */
  constructor(token) {
    this.baseurl = 'http://api.map.baidu.com';

    if (token === undefined || token === '') {
      throw new Error('Missing Baidu API token');
    }
    this.token = token;

    this.columnType = {
      int: 1,
      double: 2,
      string: 3,
      imageUrl: 4
    };
  }

  /**
   * Search geo position of the given city and address <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodata">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} city    - the city you want to search
   * @param  {string} address - the address you want to search
   * @return {Promise}
   */
  search(city, address) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geocoder/v2/`,
      qs: {
        ak: this.token,
        city: city,
        address: address,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * List all geotables <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodata#.E6.9F.A5.E8.AF.A2.E8.A1.A8.EF.BC.88list_geotable.EF.BC.89.E6.8E.A5.E5.8F.A3">
   * Link to the baidu api docs
   * </a>
   *
   * @return {Promise}
   */
  geotableList() {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/geotable/list`,
      qs: {
        ak: this.token,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * Create a geotable <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodata#.E5.88.9B.E5.BB.BA.E8.A1.A8.EF.BC.88create_geotable.EF.BC.89.E6.8E.A5.E5.8F.A3">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} name        - the name of the table
   * @param  {number} isPublished - the city you want to search
   * @return {Promise}
   */
  geotableCreate(name, isPublished = 1) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/geotable/create`,
      qs: {
        ak: this.token,
        name: name,
        is_published: isPublished,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  // geotableUpdate() {
  //
  // }

  /**
   * @return {Promise}
   */
  geotableDelete(id) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/geotable/delete`,
      qs: {
        ak: this.token,
        id: id,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  // TODO: geotableDelete() {
  //
  // }

  /**
   * Get details about a geotable <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodata#">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} id - the geotable id
   * @return {Promise}
   */
  geotableDetail(id) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/geotable/detail`,
      qs: {
        ak: this.token,
        id: id,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   *
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodataV4">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} id            - the geotable id
   * @param  {string} name          - column name description
   * @param  {string} key           - The stored key identifier of the column has the same meaning as the column "id" field in the returned result, which is the user-defined custom setting
   * @param  {number} type          - The type of value stored. enumeration value 1: Int64, 2: double, 3: string, 4: online image url
   * @param  {number} isSearchField - Whether to set the cloud search sort or search field, 1 for yes, 0 for no
   * @param  {number} isIndexField  - Whether to set the field as the index field of the cloud storage. 1 for yes, 0 for no.
   * @return {Promise}
   */
  columnCreate(id, name, key, type, isSearchField = 0, isIndexField = 0) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/column/create`,
      qs: {
        ak: this.token,
        geotable_id: id,
        name: name,
        key: key,
        type: type,
        is_search_field: isSearchField,
        is_index_field: isIndexField,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * @return {Promise}
   */
  columnList(id, name, key) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/column/list`,
      qs: {
        ak: this.token,
        geotable_id: id,
        name: name,
        key: key,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  // columnUpdate() {
  //
  // }

  // columnDelete() {
  //
  // }

  /**
   * Create a poi <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geodata#.E5.88.9B.E5.BB.BA.E6.95.B0.E6.8D.AE.EF.BC.88create_poi.EF.BC.89.E6.8E.A5.E5.8F.A3">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} geotableId - the geotable id
   * @param  {string} title      - the title of the poi
   * @param  {string} address    - the address of the poi
   * @param  {string} latitude   - the latitude of the poi
   * @param  {string} longitude  - the longitude of the poi
   * @return {Promise}
   */
  poiCreate(geotableId, title, address, latitude, longitude) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/poi/create`,
      qs: {
        ak: this.token,
        coord_type: COORD_TYPE.GEO,
        geotable_id: geotableId,
        title: title,
        address: address,
        latitude: latitude,
        longitude: longitude,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * @param  {string} geotableId - the geotable id
   * @param  {number} index      - the list index
   * @param  {number} size       - the list size
   * @return {Promise}
   */
  poiList(geotableId, index = 0, size = 200) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/poi/list`,
      qs: {
        ak: this.token,
        geotable_id: geotableId,
        page_index: index,
        page_size: size,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * @param  {string} geotableId - the geotable id
   * @param  {string} id         - the point id
   * @return {Promise}
   */
  poiGet(geotableId, id) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/poi/detail`,
      qs: {
        ak: this.token,
        geotable_id: geotableId,
        id: id,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * @param  {string} geotableId - the geotable id
   * @param  {string} id         - the point id
   * @param  {string} title      - the point title
   * @param  {string} address    - the point address
   * @param  {string} latitude   - the point latitude
   * @param  {string} longitude  - the point latitude
   * @return {Promise}
   */
  poiUpdate(geotableId, id, title, address, latitude, longitude) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/poi/update`,
      qs: {
        ak: this.token,
        geotable_id: geotableId,
        id: id,
        title: title,
        address: address,
        latitude: latitude,
        longitude: longitude,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * @param  {string} geotableId - the geotable id
   * @param  {string} id         - the point id
   * @return {Promise}
   */
  poiDelete(geotableId, id) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/poi/delete`,
      qs: {
        ak: this.token,
        geotable_id: geotableId,
        id: id,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * @param  {string} geotableId - the geotable id
   * @return {Promise}
   */
  poiDeleteAll(geotableId) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geodata/v4/poi/delete`,
      qs: {
        ak: this.token,
        geotable_id: geotableId,
        is_total_del: 1,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * Find geopoints nearby a given latitude / longitude <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=lbscloud/api/geosearch">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} id        - the geotable id
   * @param  {string} latitude  - the latitude of the poi
   * @param  {string} longitude - the longitude of the poi
   * @param  {string} radius    - the search raduis
   * @return {Promise}
   */
  nearby(id, latitude, longitude, radius) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geosearch/v4/nearby`,
      qs: {
        ak: this.token,
        geotable_id: id,
        location: `${latitude}%2C${longitude}`,
        radius: radius,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    });
  }

  /**
   * Transform WGS84 to Baidu coordinate system <br/>
   * <a href="http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition">
   * Link to the baidu api docs
   * </a>
   *
   * @param  {string} latitude  - the latitude of the poi
   * @param  {string} longitude - the longitude of the poi
   * @param  {string} from      - the coordinate type
   * @param  {string} to        - the coordinate type
   * @return {Promise}
   */
  geoTransform(latitude, longitude, from = 1, to = 5) {
    var options = {
      method: 'GET',
      url: `${this.baseurl}/geoconv/v1/`,
      qs: {
        ak: this.token,
        coords: `${latitude},${longitude}`,
        from: from,
        to: to,
        output: 'json'
      },
      json: true
    };
    return rp(options).then(res => {
      if (res) {
        if (res.status !== 0) {
          return Promise.reject('baidu api status not ok');
        }
        if (!res.result) {
          return Promise.reject('baidu api response missing transform result');
        }
        if (res.result.length <= 0) {
          return Promise.reject('baidu api response missing transform result');
        }
        return Promise.resolve([res.result[0].x, res.result[0].y]);
      } else {
        return Promise.reject('baidu api response without data');
      }
    });
  }
}

module.exports = BaiduClient;
