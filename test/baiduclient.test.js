'use strict';

const env = require('env-var');
const BaiduClient = require('../baiduclient');
const nock = require('nock');

const BASEURL = 'http://api.map.baidu.com';
// const token = env.get('BAIDU_API_TOKEN').asString();
const token = 'secret';

describe('BaiduClient Initialize', () => {
  test('should successful initialze the client', () => {
    let client = new BaiduClient('test-token');
    expect(typeof client.token).toBe('string');
    expect(client.token).toBe('test-token');
  });

  // test('should throw an error because no api token was set', () => {
  //   expect(new BaiduClient()).toThrowError('Missing Baidu API token');
  // });
});

describe('BaiduClient', () => {
  describe('search', () => {
    test('should search for a given city and address', done => {
      const city = 'shanghai';
      const addr = 'foo';
      nock(BASEURL)
        .get(`/geocoder/v2/?ak=${token}&city=${city}&address=${encodeURIComponent(addr)}&output=json`)
        .reply(200, {
          status: 0,
          result: {
            location: { lng: 121.52, lat: 31.23 },
            precise: 1,
            confidence: 75,
            level: '宾馆'
          }
        });

      let client = new BaiduClient(token);
      client.search('shanghai', 'foo').then(data => {
        expect(typeof data).toBe('object');
        expect(typeof data.status).toBe('number');
        expect(data.status).toBe(0);
        expect(typeof data.result).toBe('object');
        expect(typeof data.result.location).toBe('object');
        expect(typeof data.result.location.lat).toBe('number');
        expect(data.result.location.lat).toBe(31.23);
        expect(typeof data.result.location.lng).toBe('number');
        expect(data.result.location.lng).toBe(121.52);
        expect(typeof data.result.precise).toBe('number');
        expect(data.result.precise).toBe(1);
        expect(typeof data.result.confidence).toBe('number');
        expect(data.result.confidence).toBe(75);
        expect(typeof data.result.level).toBe('string');
        expect(data.result.level).toBe('宾馆');
        done();
      }).catch(e => {
        done(e);
      });
    });
  });

  describe('geotableList', () => {
    test('should list all geotables', done => {
      nock(BASEURL)
        .get(`/geodata/v4/geotable/list?ak=${token}&output=json`)
        .reply(200, {
          status: 0,
          message: '成功',
          size: 3,
          geotables: [
            {
              id: '1',
              name: 'table-1',
              is_published: 1,
              create_time: '2018-03-26 15:13:37',
              modify_time: '2018-03-26 15:13:37'
            },
            {
              id: '2',
              name: 'table-2',
              is_published: 1,
              create_time: '2018-04-26 16:13:37',
              modify_time: '2018-04-26 16:13:37'
            },
            {
              id: '3',
              name: 'table-3',
              is_published: 1,
              create_time: '2018-05-26 17:13:37',
              modify_time: '2018-05-26 17:13:37'
            }
          ]
        });

      let client = new BaiduClient(token);
      client.geotableList().then(data => {
        expect(typeof data).toBe('object');
        expect(typeof data.status).toBe('number');
        expect(data.status).toBe(0);
        expect(typeof data.message).toBe('string');
        expect(data.message).toBe('成功');
        expect(typeof data.size).toBe('number');
        expect(data.size).toBe(3);
        expect(Array.isArray(data.geotables)).toBe(true);
        expect(data.geotables).toHaveLength(3);
        expect(data.geotables[0].id).toBe('1');
        expect(data.geotables[1].id).toBe('2');
        expect(data.geotables[2].id).toBe('3');
        done();
      }).catch(e => {
        done(e);
      });
    });
  });

  // describe('geotableCreate', () => {
  //   test('should create a geotable', done => {
  //     client.geotableCreate().then(data => {
  //       data.should.be.an('object');
  //       console.log(data);
  //       done();
  //     }).catch(e => {
  //       done(e);
  //     });
  //   });
  // });

  describe('geotableDetail', () => {
    test('should get details of a geotable', done => {
      const id = '123';
      nock(BASEURL)
        .get(`/geodata/v4/geotable/detail?ak=${token}&id=${id}&output=json`)
        .reply(200, {
          status: 0,
          message: '成功',
          geotable: {
            id: '123',
            name: 'foo',
            is_published: 1,
            create_time: '2018-04-26 15:13:37',
            modify_time: '2018-04-26 15:13:37'
          }
        });

      let client = new BaiduClient(token);
      client.geotableDetail(id).then(data => {
        expect(typeof data).toBe('object');
        expect(typeof data.status).toBe('number');
        expect(data.status).toBe(0);
        expect(typeof data.message).toBe('string');
        expect(data.message).toBe('成功');
        expect(typeof data.geotable).toBe('object');
        expect(typeof data.geotable.id).toBe('string');
        expect(data.geotable.id).toBe('123');
        expect(typeof data.geotable.name).toBe('string');
        expect(data.geotable.name).toBe('foo');
        expect(typeof data.geotable.is_published).toBe('number');
        expect(data.geotable.is_published).toBe(1);
        expect(typeof data.geotable.create_time).toBe('string');
        expect(data.geotable.create_time).toBe('2018-04-26 15:13:37');
        expect(typeof data.geotable.modify_time).toBe('string');
        expect(data.geotable.modify_time).toBe('2018-04-26 15:13:37');
        done();
      }).catch(e => {
        done(e);
      });
    });
  });

  // describe('columnCreate', () => {
  //   test('should create a column', done => {
  //     const id = geotables[0].id;
  //     const name = 'storeId';
  //     const key = 'storeId';
  //     const type = client.columnType.string;
  //     client.columnCreate(id, name, key, type).then(data => {
  //       console.log(data);
  //       done();
  //     }).catch(e => {
  //       done(e);
  //     });
  //   });
  // });

  describe('columnList', () => {
    test('should response a column', done => {
      const id = '123';
      const name = 'storeId';
      const key = 'storeId';
      nock(BASEURL)
        .get(`/geodata/v4/column/list?ak=${token}&geotable_id=${id}&name=${name}&key=${key}&output=json`)
        .reply(200, {
          status: 0,
          message: '成功',
          size: 1,
          columns: [
            {
              id: '456',
              geotable_id: '123',
              type: 3,
              name: 'dataId',
              key: 'dataId',
              create_time: '2018-04-26 15:13:37',
              modify_time: '2018-04-26 15:13:37',
              is_search_field: 0,
              is_index_field: 0
            }
          ]
        });

      let client = new BaiduClient(token);
      client.columnList(id, name, key).then(data => {
        expect(typeof data).toBe('object');
        expect(typeof data.status).toBe('number');
        expect(data.status).toBe(0);
        expect(typeof data.message).toBe('string');
        expect(data.message).toBe('成功');
        expect(typeof data.size).toBe('number');
        expect(data.size).toBe(1);
        expect(Array.isArray(data.columns)).toBe(true);
        expect(data.columns).toHaveLength(1);
        expect(typeof data.columns[0]).toBe('object');
        expect(data.columns[0].id).toBe('456');
        expect(data.columns[0].geotable_id).toBe('123');
        expect(data.columns[0].type).toBe(3);
        expect(data.columns[0].name).toBe('dataId');
        expect(data.columns[0].key).toBe('dataId');
        expect(data.columns[0].create_time).toBe('2018-04-26 15:13:37');
        expect(data.columns[0].modify_time).toBe('2018-04-26 15:13:37');
        expect(data.columns[0].is_search_field).toBe(0);
        expect(data.columns[0].is_index_field).toBe(0);
        done();
      }).catch(e => {
        done(e);
      });
    });
  });

  // describe('poiCreate', () => {
  //   test('...', done => {
  //     client.geotableList().then(data => {
  //       data.should.be.an('object');
  //       console.log(data);
  //       done();
  //     }).catch(e => {
  //       done(e);
  //     });
  //   });
  // });

  // describe('nearby', () => {
  //   test('should search nearby a lat / lng', done => {
  //     const id = '123';
  //     const lat = 1;
  //     const lng = 2;
  //     const radius = 0;
  //     nock(BASEURL)
  //    .get(`/geodata/v4/nearby?ak=${token}&geotable_id=${id}&location=${lat}%252C${lng}&radius=${radius}&output=json`)
  //       .reply(200, {
  //         status: 0,
  //         message: '成功',
  //         size: 1,
  //         columns: [
  //           {
  //             id: '456',
  //             geotable_id: '123',
  //             type: 3,
  //             name: 'dataId',
  //             key: 'dataId',
  //             create_time: '2018-04-26 15:31:37',
  //             modify_time: '2018-04-26 15:31:37',
  //             is_search_field: 0,
  //             is_index_field: 0
  //           }
  //         ]
  //       });
  //
  //     let client = new BaiduClient(token);
  //     client.nearby(geotables[0].id, lat, lng, radius).then(data => {
  //       data.should.be.an('object');
  //       console.log(data);
  //       done();
  //     }).catch(e => {
  //       done(e);
  //     });
  //   });
  // });
});
