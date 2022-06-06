import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { fromLonLat, transform } from "ol/proj";
import Feature from "ol/Feature";
import { Point, Circle, LineString } from "ol/geom";
import { Fill, Circle as CircleStyle, Style } from "ol/style";
import { Overlay } from "ol";
import Stroke from "ol/style/Stroke"; //添加填充样式
import styleText from "ol/style/Text"; //添加文字标注
import styleFill from "ol/style/Fill"; //添加填充样式
import StyleStyle from "ol/style/Style";
// import AlineData from "@/views/FunctionMenu/components/testData/waveLine.json";

export default function drawTyphoon(map, data, _this) {
  const points = data.points;
  let index = 0;
  let layer = new VectorLayer({ zIndex: 10 });
  let source = new VectorSource();
  //添加警戒线
  addWaringLine(source);
  layer.setSource(source);
  _this.intervalLogo = setInterval(() => {
    if (index == points.length) {
      //添加风圈
      addTyphoonImg(points[points.length - 1], map);
      clearInterval(_this.intervalLogo);
      return;
    }
    points[index].name = data.name;
    let position = [points[index].lng, points[index].lat];
    if (index == 0) {
      map.getView().setCenter(fromLonLat(position));
    }
    // 点 的 数据源设置
    let featurePoint = new Feature({
      geometry: new Point(fromLonLat(position)),
    });
    featurePoint.setStyle(
      new Style({
        image: new CircleStyle({
          fill: new Fill({
            color: judgeColorByWindLevel(points[index].strong),
          }),
          radius: 4,
        }),
      })
    );
    featurePoint.set("typhoonPoint", true);
    featurePoint.set("points", points[index]);
    // 写到这里的时候 预期的结果 应该是 如果有 全部都绘制了  、 没有清除  上一个被绘制的目标点
    if (points[index].radius7.length != 0 || points[index].radius7 != null) {
      let featureSolar = drawSolarExact(points[index]);
      let lastShowSolar = _this.lastShowSolar;
      if (lastShowSolar != null) {
        source.removeFeature(lastShowSolar);
      }
      _this.lastShowSolar = featureSolar;
      source.addFeature(featureSolar);
    }
    source.addFeature(featurePoint);
    if (index > 0) {
      let lastPosition = [points[index - 1].lng, points[index - 1].lat];
      let featureLine = new Feature({
        geometry: new LineString([fromLonLat(position), fromLonLat(lastPosition)]),
      });
      source.addFeature(featureLine);
    }
    // 需要一个出口
    index++;
  }, 100);
  map.addLayer(layer);
  showTyphoonItem(map, _this);
}
/**
 * 根据台风等级判断颜色
 * @param {String} windlevel 台风等级描述
 * @return {String} map[windlevel] color Name
 */
function judgeColorByWindLevel(windlevel) {
  let map = {
    热带风暴: "red",
    热带低压: "blue",
    强热带风暴: "green",
    台风: "orange",
    强台风: "yellow",
    超强台风: "salmon",
  };

  return map[windlevel];
}

// 准确的绘制台风风圈
function drawSolarExact(points) {
  let radiusArr = points.radius7.split("|").map((item) => {
    return parseFloat(item);
  });
  // south  南  East 东  notrh 北 west 西
  var configs = {
    SE: radiusArr[0] * 1000,
    SW: radiusArr[1] * 1000,
    NW: radiusArr[2] * 1000,
    NE: radiusArr[3] * 1000,
  };
  const circleFeature = new Feature({
    geometry: new Circle(fromLonLat([points.lng, points.lat])),
  });

  circleFeature.setStyle(
    new Style({
      renderer(coordinates, state) {
        let ctx = state.context;
        let [x, y] = coordinates[0];
        let count = 1;
        ctx.beginPath();
        // let []
        for (let i in configs) {
          let degree = 0.5 * Math.PI * count;
          let distance = configs[i] / state.resolution;
          ctx.arc(x, y, distance, degree - 0.5 * Math.PI, degree);
          count++;
        }
        ctx.fillStyle = "rgba(238, 160, 29,0.4)";
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "rgb(238, 160, 29)";
        ctx.stroke();
      },
    })
  );
  circleFeature.set("points", points);
  circleFeature.set("typhoonSolar", true);
  return circleFeature;
}

/**
 * @param {map,vue} map对象 vue实例
 * @return {}
 */
//鼠标移动显示显示台风信息
function showTyphoonItem(map, _this) {
  let showTphoonMes = new Overlay({
    element: document.getElementById("TyphoonInfo"),
  });
  map.on("pointermove", function (evt) {
    if (evt.dragging) {
      return;
    }
    let pixel = map.getEventPixel(evt.originalEvent);
    let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    });
    if (feature) {
      let type = feature.getProperties()["typhoonPoint"];
      let _type = feature.getProperties()["typhoonSolar"];
      const points = feature.getProperties()["points"];
      if (!points) {
        return;
      }
      let lon = points["lng"];
      let lat = points["lat"];
      let pixel2 = map.getPixelFromCoordinate(transform([lon, lat], "EPSG:4326", "EPSG:3857"));
      if (type || _type) {
        console.log(feature);
        const pointValue = feature.get("points");
        _this.TphoonMes = pointValue;
        if (evt.pixel[0] - pixel2[0] < -200) {
          lon -= 720;
        }
        if (Math.abs(evt.pixel[0] - pixel2[0]) > 200) {
          lon += 360;
        }
        showTphoonMes.setPosition(transform([lon, lat], "EPSG:4326", "EPSG:3857"));
        map.addOverlay(showTphoonMes);
      }
    } else {
      map.removeOverlay(showTphoonMes);
    }
  });
}

//添加24小时警戒线  48小时警戒线
function addWaringLine(source) {
  // console.log(AlineData);
  // const dataItem = AlineData[79];
  // console.log(dataItem);
  // let str = "";
  // dataItem.forEach((element) => {
  //   const { Longitude, Latigude } = element;
  //   str += `${Longitude} ${Latigude},`;
  // });
  // console.log(str);
  // const lineArray24 = str;
  const lineArray24 = "127 34,127 22,119 18,119 11,113 4.5,105 0";
  const lineArray48 = "132 34,132 15,120 0,105 0";
  source.addFeature(lineDataTransTF(lineArray24, "Line", "red", "24小时警戒线", "red"));
  source.addFeature(lineDataTransTF(lineArray48, "Line", "#6677F5", "48小时警戒线", "#6677F5"));
}

function lineDataTransTF(d, lineType, color, text, textcolor) {
  let data = [];
  let d1 = d.split(",");
  for (let i1 in d1) {
    let d2 = d1[i1].split(" ");
    data.push({
      lon: Number(d2[0]),
      lat: Number(d2[1]),
    });
  }
  data.map(function (item, index, arr) {
    if (index > 0) {
      if (item.lon - arr[index - 1].lon < -180) item.lon += 360;
      else if (item.lon - arr[index - 1].lon > 180) {
        let i = index - 1;
        while (i >= 0) {
          arr[i--].lon += 360;
        }
      }
    }
  });
  let ar = [];
  data.forEach(function (item) {
    ar.push(fromLonLat([Number(item.lon), Number(item.lat)]));
  });
  let ls = null;
  ls = new LineString(ar);
  let lsf = new Feature({
    geometry: ls,
  });

  lsf.setStyle(TFStyle(color, lineType, text, textcolor));
  return lsf;
}

function TFStyle(color, lineType, text, textcolor) {
  let lineStyle = {
    color,
    width: 2,
  };
  if (lineType == "dash") {
    Object.assign(lineStyle, { lineDash: [10, 10] });
  }
  let stroke = new Stroke(lineStyle);
  return new StyleStyle({
    stroke,
    text: new styleText({
      text,
      font: "16px Calibri,sans-serif",
      fill: new styleFill({
        color: textcolor,
      }),
      maxAngle: Math.PI / 10,
      placement: "line",
    }),
  });
}

function addTyphoonImg(value, map) {
  console.log(value, map);
  let parentDom = document.getElementById("map");
  let div;
  div = document.createElement("div");
  div.innerHTML = `<div class="wind-circle" id='wind-circle'>
    <img src="${require("../../../../assets/typhoon.png")}" alt="" />
  </div>`;

  parentDom.appendChild(div);
  const windCircle = new Overlay({
    element: document.querySelector(".wind-circle"),
  });
  windCircle.setPosition(transform([value.lng, value.lat], "EPSG:4326", "EPSG:3857"));
  map.addOverlay(windCircle);
}
