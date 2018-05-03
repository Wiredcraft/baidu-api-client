# baidu-api-client

## Example
```js
let client = new BaiduClient('BAIDU_API_TOKEN');

client.geotableList().then(data => {
  console.log(data);
}).catch(e => {
  console.error(e);
});
```
