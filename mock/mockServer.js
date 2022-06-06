import Mock from "mockjs";
const baseurl = "http://192.168.4.124:8150/";

const user = require("./user");
const routes = require("./routes");

const mocks = [...user, ...routes];

/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

function XHR2ExpressReqWrap(respond) {
  return function (options) {
    let result = null;
    if (respond instanceof Function) {
      const { body, type, url } = options;
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url),
      });
    } else {
      result = respond;
    }
    return Mock.mock(result);
  };
}

for (const i of mocks) {
  Mock.mock(
    `${baseurl}${i.url}`,
    i.type || "get",
    XHR2ExpressReqWrap(i.response)
  );
}
//示例
Mock.mock(`${baseurl}/list`, {
  code: 200,
  data: {
    "data|100": [
      {
        id: "@id", //随机id
        name: "@name", //随机名称
        nickName: "@last", //随机昵称
        phone: /^1[34578]\d{9}$/, //随机电话号码
        "age|11-99": 1, //年龄
        address: "@county(true)", //随机地址
        email: "@email", //随机邮箱
        isMale: "@boolean", //随机性别
        createTime: "@datetime", //创建时间
      },
    ],
  },
});
