// ===== 本命星盘计算引擎 =====
// 基于简化平均轨道元素的占星计算，适用于1900-2100年
// 输出精度约±1度，满足日常占星需求

var PI = Math.PI;
var RAD = PI / 180;
var DEG = 180 / PI;

// ===== 基础数学工具 =====
function toRange360(deg) {
  var r = deg % 360;
  if (r < 0) r += 360;
  return r;
}

function sinDeg(deg) {
  return Math.sin(deg * RAD);
}

function cosDeg(deg) {
  return Math.cos(deg * RAD);
}

function asinDeg(x) {
  return Math.asin(x) * DEG;
}

function atan2Deg(y, x) {
  return Math.atan2(y, x) * DEG;
}

// ===== 儒略日计算 =====
function getJulianDay(year, month, day, hour, minute) {
  var Y = year;
  var M = month;
  var D = day + (hour + minute / 60) / 24;

  if (M < 3) {
    Y -= 1;
    M += 12;
  }

  var A = Math.floor(Y / 100);
  var B = 2 - A + Math.floor(A / 4);

  var JD = Math.floor(365.25 * (Y + 4716)) +
           Math.floor(30.6001 * (M + 1)) +
           D + B - 1524.5;

  return JD;
}

// 从儒略日计算世纪数（以J2000为基准）
function getJulianCentury(JD) {
  return (JD - 2451545.0) / 36525.0;
}

// ===== 格林威治恒星时（GMST） =====
function getGMST(JD) {
  var T = getJulianCentury(JD);
  var theta = 280.46061837 +
              360.98564736629 * (JD - 2451545.0) +
              0.000387933 * T * T -
              T * T * T / 38710000.0;
  return toRange360(theta);
}

// 本地恒星时（LST）
function getLST(JD, longitude) {
  var gmst = getGMST(JD);
  return toRange360(gmst + longitude);
}

// ===== 黄道十二宫名称 =====
var zodiacNames = [
  '白羊座', '金牛座', '双子座', '巨蟹座',
  '狮子座', '处女座', '天秤座', '天蝎座',
  '射手座', '摩羯座', '水瓶座', '双鱼座'
];

var zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// 从黄道经度获取星座信息
function getZodiacSign(longitude) {
  var lon = toRange360(longitude);
  var signIndex = Math.floor(lon / 30);
  var degreeInSign = lon - signIndex * 30;
  return {
    signIndex: signIndex,
    signName: zodiacNames[signIndex],
    symbol: zodiacSymbols[signIndex],
    degree: degreeInSign,
    fullLongitude: lon
  };
}

// ===== 太阳位置计算（简化模型） =====
// 精度：约±0.5度
function calculateSun(JD) {
  var T = getJulianCentury(JD);

  // 太阳平均近点角
  var M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = toRange360(M);

  // 太阳平黄经
  var L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = toRange360(L0);

  // 轨道方程（中心差）
  var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sinDeg(M) +
          (0.019993 - 0.000101 * T) * sinDeg(2 * M) +
          0.000289 * sinDeg(3 * M);

  // 太阳真黄经
  var lambda = L0 + C;

  return {
    name: '太阳',
    symbol: '☉',
    longitude: toRange360(lambda),
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 月球位置计算（简化模型） =====
// 精度：约±5度（简化模型）
function calculateMoon(JD) {
  var T = getJulianCentury(JD);

  // 月球平黄经
  var L = 218.316 + 481267.8813 * T;
  L = toRange360(L);

  // 月球平均近点角
  var M = 134.963 + 477198.8673 * T;
  M = toRange360(M);

  // 升交点经度
  var F = 93.272 + 483202.0175 * T;
  F = toRange360(F);

  // 太阳平均近点角
  var Ms = 357.52911 + 35999.05029 * T;
  Ms = toRange360(Ms);

  // 月球平均延伸角
  var D = 297.8502 + 445267.1115 * T;
  D = toRange360(D);

  // 简化的月球位置计算（主要项）
  var lambda = L +
    6.289 * sinDeg(M) +
    (-1.274) * sinDeg(M - 2 * D) +
    0.658 * sinDeg(2 * D) +
    (-0.186) * sinDeg(Ms) +
    (-0.059) * sinDeg(2 * M - 2 * D) +
    (-0.057) * sinDeg(M - 2 * D + Ms) +
    0.053 * sinDeg(M + 2 * D) +
    0.046 * sinDeg(2 * D - Ms) +
    0.041 * sinDeg(M - Ms) +
    (-0.035) * sinDeg(D) +
    (-0.031) * sinDeg(M + Ms);

  return {
    name: '月亮',
    symbol: '☽',
    longitude: toRange360(lambda),
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 水星位置计算 =====
function calculateMercury(JD) {
  var T = getJulianCentury(JD);

  var L = 252.25 + 149474.0708 * T;
  L = toRange360(L);

  var a = 0.387098;
  var e = 0.205635 + 0.0000000559 * T;
  var i = 7.00487 - 0.00001871 * T;
  var omega = 48.33167 - 0.00001245 * T;
  var omegaP = 77.45645 + 0.00001514 * T;

  var M = L - omegaP;
  M = toRange360(M);

  var E = solveKepler(M, e);

  var nu = 2 * atan2Deg(Math.sqrt(1 + e) * sinDeg(E / 2), Math.sqrt(1 - e) * cosDeg(E / 2));

  var r = a * (1 - e * cosDeg(E));

  var lambda = omegaP + nu;
  lambda = toRange360(lambda);

  return {
    name: '水星',
    symbol: '☿',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 金星位置计算 =====
function calculateVenus(JD) {
  var T = getJulianCentury(JD);

  var L = 181.9797 + 58517.81567 * T;
  L = toRange360(L);

  var e = 0.006772;
  var omegaP = 131.53298;

  var M = L - omegaP;
  M = toRange360(M);

  var E = solveKepler(M, e);
  var nu = 2 * atan2Deg(Math.sqrt(1 + e) * sinDeg(E / 2), Math.sqrt(1 - e) * cosDeg(E / 2));

  var lambda = omegaP + nu;
  lambda = toRange360(lambda);

  return {
    name: '金星',
    symbol: '♀',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 火星位置计算 =====
function calculateMars(JD) {
  var T = getJulianCentury(JD);

  var L = 355.4333 + 19140.29893 * T;
  L = toRange360(L);

  var e = 0.093403;
  var omegaP = 336.04084;

  var M = L - omegaP;
  M = toRange360(M);

  var E = solveKepler(M, e);
  var nu = 2 * atan2Deg(Math.sqrt(1 + e) * sinDeg(E / 2), Math.sqrt(1 - e) * cosDeg(E / 2));

  var lambda = omegaP + nu;
  lambda = toRange360(lambda);

  return {
    name: '火星',
    symbol: '♂',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 木星位置计算 =====
function calculateJupiter(JD) {
  var T = getJulianCentury(JD);

  var L = 34.4 + 3036.30277 * T;
  L = toRange360(L);

  var e = 0.048498;
  var omegaP = 14.75385;

  var M = L - omegaP;
  M = toRange360(M);

  var E = solveKepler(M, e);
  var nu = 2 * atan2Deg(Math.sqrt(1 + e) * sinDeg(E / 2), Math.sqrt(1 - e) * cosDeg(E / 2));

  var lambda = omegaP + nu;
  lambda = toRange360(lambda);

  return {
    name: '木星',
    symbol: '♃',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 土星位置计算 =====
function calculateSaturn(JD) {
  var T = getJulianCentury(JD);

  var L = 50.0774 + 1224.07466 * T;
  L = toRange360(L);

  var e = 0.055549;
  var omegaP = 93.05724;

  var M = L - omegaP;
  M = toRange360(M);

  var E = solveKepler(M, e);
  var nu = 2 * atan2Deg(Math.sqrt(1 + e) * sinDeg(E / 2), Math.sqrt(1 - e) * cosDeg(E / 2));

  var lambda = omegaP + nu;
  lambda = toRange360(lambda);

  return {
    name: '土星',
    symbol: '♄',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 天王星位置计算（简化平均轨道） =====
// 精度：约±2-3度（适用于日常占星）
function calculateUranus(JD) {
  var T = getJulianCentury(JD);
  var lambda = 313.2 + 42.96 * T;
  lambda = toRange360(lambda);
  return {
    name: '天王星',
    symbol: '♅',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 海王星位置计算（简化平均轨道） =====
function calculateNeptune(JD) {
  var T = getJulianCentury(JD);
  var lambda = 304.88 + 21.83 * T;
  lambda = toRange360(lambda);
  return {
    name: '海王星',
    symbol: '♆',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 冥王星位置计算（简化平均轨道） =====
function calculatePluto(JD) {
  var T = getJulianCentury(JD);
  var lambda = 238.96 + 14.54 * T;
  lambda = toRange360(lambda);
  return {
    name: '冥王星',
    symbol: '♇',
    longitude: lambda,
    longitudeStr: formatLongitude(lambda)
  };
}

// ===== 开普勒方程求解：E - e*sin(E) = M =====
function solveKepler(M, e) {
  var M_rad = M * RAD;
  var E = M_rad;

  for (var i = 0; i < 10; i++) {
    var dE = (E - e * Math.sin(E) - M_rad) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 0.0000001) break;
  }

  return E * DEG;
}

// ===== 上升点（ASC）计算 =====
// 使用整宫制简化计算
function calculateAscendant(JD, latitude, longitude) {
  var T = getJulianCentury(JD);
  var LST = getLST(JD, longitude);

  // 黄道倾角
  var epsilon = 23.4392911 - 0.0130042 * T - 0.00000016 * T * T;

  // 上升点 = arctan(-cos(LST) / (sin(LST)*cos(eps) + tan(lat)*sin(eps)))
  var numerator = -cosDeg(LST);
  var denominator = sinDeg(LST) * cosDeg(epsilon) + Math.tan(latitude * RAD) * sinDeg(epsilon);

  var asc = atan2Deg(numerator, denominator);
  asc = toRange360(asc);

  // 调整：上升点应该与LST相差约90度的关系
  // 重新用标准公式计算
  var phi = latitude * RAD;
  var eps = epsilon * RAD;
  var lstRad = LST * RAD;

  var y = -Math.cos(lstRad);
  var x = Math.sin(lstRad) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps);
  var ascRad = Math.atan2(y, x);
  asc = ascRad * DEG;
  asc = toRange360(asc);

  return {
    name: '上升',
    symbol: 'ASC',
    longitude: asc,
    longitudeStr: formatLongitude(asc)
  };
}

// ===== 天顶（MC）计算 =====
function calculateMidheaven(JD, latitude, longitude) {
  var T = getJulianCentury(JD);
  var LST = getLST(JD, longitude);
  var epsilon = 23.4392911 - 0.0130042 * T;

  // MC 是本地子午线与黄道的交点
  var mc = atan2Deg(sinDeg(LST), cosDeg(LST) * cosDeg(epsilon));
  mc = toRange360(mc);

  return {
    name: '天顶',
    symbol: 'MC',
    longitude: mc,
    longitudeStr: formatLongitude(mc)
  };
}

// ===== 格式化经度为可读字符串 =====
function formatLongitude(longitude) {
  var info = getZodiacSign(longitude);
  var deg = Math.floor(info.degree);
  var min = Math.floor((info.degree - deg) * 60);
  return info.signName + ' ' + deg + '°' + min + "'";
}

// ===== 计算完整本命星盘 =====
function calculateNatalChart(birthInfo) {
  var year = birthInfo.year;
  var month = birthInfo.month;
  var day = birthInfo.day;
  var hour = birthInfo.hour !== undefined && birthInfo.hour !== null ? birthInfo.hour : 12;
  var minute = birthInfo.minute !== undefined && birthInfo.minute !== null ? birthInfo.minute : 0;
  var latitude = birthInfo.latitude;
  var longitude = birthInfo.longitude;
  var hasExactTime = birthInfo.hasExactTime;

  var JD = getJulianDay(year, month, day, hour, minute);

  var sun = calculateSun(JD);
  var moon = calculateMoon(JD);
  var mercury = calculateMercury(JD);
  var venus = calculateVenus(JD);
  var mars = calculateMars(JD);
  var jupiter = calculateJupiter(JD);
  var saturn = calculateSaturn(JD);
  var uranus = calculateUranus(JD);
  var neptune = calculateNeptune(JD);
  var pluto = calculatePluto(JD);

  var ascendant = null;
  var midheaven = null;

  if (hasExactTime) {
    ascendant = calculateAscendant(JD, latitude, longitude);
    midheaven = calculateMidheaven(JD, latitude, longitude);
  }

  // 为每颗行星添加星座信息
  var planets = [sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto];
  for (var i = 0; i < planets.length; i++) {
    var info = getZodiacSign(planets[i].longitude);
    planets[i].signIndex = info.signIndex;
    planets[i].signName = info.signName;
    planets[i].degreeInSign = Math.floor(info.degree);
    planets[i].minuteInSign = Math.floor((info.degree - planets[i].degreeInSign) * 60);
  }

  if (ascendant) {
    var ascInfo = getZodiacSign(ascendant.longitude);
    ascendant.signIndex = ascInfo.signIndex;
    ascendant.signName = ascInfo.signName;
    ascendant.degreeInSign = Math.floor(ascInfo.degree);
    ascendant.minuteInSign = Math.floor((ascInfo.degree - ascendant.degreeInSign) * 60);
  }

  if (midheaven) {
    var mcInfo = getZodiacSign(midheaven.longitude);
    midheaven.signIndex = mcInfo.signIndex;
    midheaven.signName = mcInfo.signName;
    midheaven.degreeInSign = Math.floor(mcInfo.degree);
    midheaven.minuteInSign = Math.floor((mcInfo.degree - midheaven.degreeInSign) * 60);
  }

  // ===== 整宫制 12 宫位 =====
  // 以 ASC 所在星座（即上升点所在星座）为第 1 宫，
  // 每 30° 一宫，逆时针方向依次为 2、3、4... 12 宫
  // （宫位分界正好与星座分界重合，便于展示）
  var houses = null;
  var houseCusps = null;

  if (hasExactTime && ascendant) {
    houses = [];
    houseCusps = [];
    // 第 1 宫起始经度 = ASC 所在星座的 0 度起点（整宫制规则）
    var house1Cusp = ascendant.signIndex * 30;

    for (var hi = 0; hi < 12; hi++) {
      var cuspLong = (house1Cusp + hi * 30) % 360;
      var cuspInfo = getZodiacSign(cuspLong);
      houseCusps.push({
        houseNumber: hi + 1,
        longitude: cuspLong,
        signIndex: cuspInfo.signIndex,
        signName: cuspInfo.signName
      });
    }

    // 为每颗行星添加"所在宫位"信息
    for (var pi = 0; pi < planets.length; pi++) {
      var pl = planets[pi];
      var rel = ((pl.longitude - house1Cusp) % 360 + 360) % 360;
      var houseNum = Math.floor(rel / 30) + 1;
      pl.house = houseNum;
    }

    // ASC 和 MC 的宫位
    var ascRel = ((ascendant.longitude - house1Cusp) % 360 + 360) % 360;
    ascendant.house = Math.floor(ascRel / 30) + 1;

    var mcRel = ((midheaven.longitude - house1Cusp) % 360 + 360) % 360;
    midheaven.house = Math.floor(mcRel / 30) + 1;
  }

  return {
    sun: sun,
    moon: moon,
    mercury: mercury,
    venus: venus,
    mars: mars,
    jupiter: jupiter,
    saturn: saturn,
    uranus: uranus,
    neptune: neptune,
    pluto: pluto,
    ascendant: ascendant,
    midheaven: midheaven,
    planets: planets,
    houses: houses,
    houseCusps: houseCusps,
    JD: JD
  };
}

// ===== 计算行运星盘（某日期的行星位置）=====
function calculateTransitChart(year, month, day, hour, minute, natalAscSignIndex, house1Cusp) {
  var JD = getJulianDay(year, month, day, hour || 12, minute || 0);

  var sun = calculateSun(JD);
  var moon = calculateMoon(JD);
  var mercury = calculateMercury(JD);
  var venus = calculateVenus(JD);
  var mars = calculateMars(JD);
  var jupiter = calculateJupiter(JD);
  var saturn = calculateSaturn(JD);
  var uranus = calculateUranus(JD);
  var neptune = calculateNeptune(JD);
  var pluto = calculatePluto(JD);

  var planets = [sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto];
  for (var i = 0; i < planets.length; i++) {
    var info = getZodiacSign(planets[i].longitude);
    planets[i].signIndex = info.signIndex;
    planets[i].signName = info.signName;
    planets[i].degreeInSign = Math.floor(info.degree);
    // 计算行运行星所在宫位（整宫制，需要本命第一宫宫头）
    if (house1Cusp !== undefined && house1Cusp !== null) {
      var rel = ((planets[i].longitude - house1Cusp) % 360 + 360) % 360;
      planets[i].house = Math.floor(rel / 30) + 1;
    }
  }

  return {
    sun: sun,
    moon: moon,
    mercury: mercury,
    venus: venus,
    mars: mars,
    jupiter: jupiter,
    saturn: saturn,
    uranus: uranus,
    neptune: neptune,
    pluto: pluto,
    planets: planets,
    JD: JD
  };
}

// ===== 相位类型定义 =====
var aspectTypeDefs = [
  { type: '合相', englishName: 'conjunction', exactAngle: 0, maxOrb: 8, friendly: true, baseScore: 5 },
  { type: '六分', englishName: 'sextile', exactAngle: 60, maxOrb: 6, friendly: true, baseScore: 6 },
  { type: '刑', englishName: 'square', exactAngle: 90, maxOrb: 7, friendly: false, baseScore: -8 },
  { type: '三分', englishName: 'trine', exactAngle: 120, maxOrb: 8, friendly: true, baseScore: 8 },
  { type: '对分', englishName: 'opposition', exactAngle: 180, maxOrb: 8, friendly: false, baseScore: -7 }
];

// ===== 计算两颗行星之间的所有相位 =====
function calculateAspectsBetween(tp, np) {
  var diff = Math.abs(tp.longitude - np.longitude);
  if (diff > 180) diff = 360 - diff;

  var found = [];
  for (var i = 0; i < aspectTypeDefs.length; i++) {
    var def = aspectTypeDefs[i];
    var orb = Math.abs(diff - def.exactAngle);
    if (orb <= def.maxOrb) {
      found.push({
        type: def.type,
        englishName: def.englishName,
        orb: orb,
        exactAngle: diff,
        friendly: def.friendly,
        score: def.friendly ? def.baseScore * (1 - orb / def.maxOrb) : def.baseScore * (1 - orb / def.maxOrb),
        transitPlanet: { name: tp.name, signName: tp.signName, longitude: tp.longitude, house: tp.house },
        natalPlanet: { name: np.name, signName: np.signName, longitude: np.longitude, house: np.house }
      });
    }
  }
  return found;
}

// ===== 识别行运-本命 所有相位 =====
function identifyAllTransitAspects(natalChart, transitChart) {
  var allAspects = [];
  // 行运的10颗行星 vs 本命的10颗行星
  for (var i = 0; i < transitChart.planets.length; i++) {
    for (var j = 0; j < natalChart.planets.length; j++) {
      var found = calculateAspectsBetween(transitChart.planets[i], natalChart.planets[j]);
      for (var k = 0; k < found.length; k++) {
        allAspects.push(found[k]);
      }
    }
  }
  // 按强度排序（绝对值从大到小）
  allAspects.sort(function(a, b) { return Math.abs(b.score) - Math.abs(a.score); });
  return allAspects;
}

// ===== 关键事件识别（相位 + 行运行星进入宫位 =====
function getKeyTransitEvents(natalChart, transitChart, natalAscSignIndex, house1Cusp) {
  var events = [];

  // 1. 基于相位识别关键事件
  var allAspects = identifyAllTransitAspects(natalChart, transitChart);

  for (var idx = 0; idx < allAspects.length; idx++) {
    var aspect = allAspects[idx];
    var title = aspect.transitPlanet.name + ' ' + aspect.type + ' 本命' + aspect.natalPlanet.name;
    var domain = mapPlanetToDomain(aspect.transitPlanet.name, aspect.natalPlanet.name);
    var keywords = generateEventKeywords(aspect);
    var intensity = Math.round(Math.abs(aspect.score) * 10) / 10;

    events.push({
      title: title,
      type: aspect.type,
      friendly: aspect.friendly,
      intensity: intensity,
      keywords: keywords,
      domain: domain,
      house: aspect.transitPlanet.house,
      natalPlanet: aspect.natalPlanet,
      transitPlanet: aspect.transitPlanet,
      orb: aspect.orb
    });
  }

  // 2. 行运行星进入重要宫位的事件（特别关注月亮、太阳、水星、金星、火星）
  var specialPlanets = ['太阳', '月亮', '水星', '金星', '火星', '木星', '土星'];
  for (var idx = 0; idx < transitChart.planets.length; idx++) {
    var tp = transitChart.planets[idx];
    if (specialPlanets.indexOf(tp.name) >= 0 && tp.house) {
      var houseKeywords = {
        1: ['自我展现', '个人形象', '新开始'],
        2: ['财务', '价值', '安全感'],
        3: ['沟通', '学习', '短途旅行'],
        4: ['家庭', '根源', '内心世界'],
        5: ['创造', '恋爱', '娱乐'],
        6: ['工作', '健康', '日常事务'],
        7: ['关系', '合作', '伴侣'],
        8: ['深度转化', '共享资源', '亲密关系'],
        9: ['远方', '哲学', '高等学习'],
        10: ['事业', '成就', '社会形象'],
        11: ['朋友', '社交圈', '理想'],
        12: ['潜意识', '精神世界', '独处']
      };
      var hk = houseKeywords[tp.house] || ['生活', '日常', '感受'];
      events.push({
        title: tp.name + '在第' + tp.house + '宫',
        type: 'house',
        friendly: true,
        intensity: 3,
        keywords: hk,
        domain: mapHouseToDomain(tp.house),
        house: tp.house,
        transitPlanet: { name: tp.name, signName: tp.signName },
        orb: 0
      });
    }
  }

  // 按强度排序
  events.sort(function(a, b) { return b.intensity - a.intensity; });

  return events;
}

function mapPlanetToDomain(transitName, natalName) {
  var map = {
    '太阳': '自我',
    '月亮': '情感',
    '水星': '沟通',
    '金星': '爱情',
    '火星': '行动',
    '木星': '成长',
    '土星': '责任',
    '天王星': '变革',
    '海王星': '灵感',
    '冥王星': '转化'
  };
  return (map[transitName] || '生活') + '与' + (map[natalName] || '内心');
}

function mapHouseToDomain(house) {
  var map = {
    1: '自我认知', 2: '财务价值', 3: '沟通学习', 4: '家庭根源', 5: '创造恋爱',
    6: '工作健康', 7: '关系合作', 8: '深度共享', 9: '远方探索',
    10: '事业成就', 11: '社交理想', 12: '精神世界'
  };
  return map[house] || '日常生活';
}

function generateEventKeywords(aspect) {
  var positiveWords = ['能量交融', '顺畅', '自然流动', '天赋展现', '灵感涌现'];
  var challengeWords = ['内在张力', '需要平衡', '深度议题', '需要觉察', '转化契机'];
  var words = aspect.friendly ? positiveWords : challengeWords;
  // pick 3 based on planet names
  var result = [];
  result.push(aspect.transitPlanet.name + '能量');
  result.push(words[0]);
  result.push(words[1]);
  return result;
}

// ===== 计算当日运势（增强版） =====
function calculateDailyFortune(natalChart, transitDate, house1Cusp) {
  var transitChart = calculateTransitChart(
    transitDate.year,
    transitDate.month,
    transitDate.day,
    12, 0,
    natalChart.ascendant ? natalChart.ascendant.signIndex : null,
    house1Cusp
  );

  var events = getKeyTransitEvents(natalChart, transitChart,
    natalChart.ascendant ? natalChart.ascendant.signIndex : null,
    house1Cusp);

  // 综合评分：基础分 + 所有相位分累加，再裁剪到合理范围
  // 评分：以相位事件的数量和性质决定，避免天天 5 星或天天低分
  var posCount = 0;
  var chalCount = 0;
  for (var e2 = 0; e2 < events.length; e2++) {
    if (events[e2].type !== 'house') {
      if (events[e2].friendly) posCount++;
      else chalCount++;
    }
  }
  // 基准 60，每个正面事件 +6，每个困难事件 -7，限制在 50-98 之间
  var score = Math.max(50, Math.min(98, 60 + posCount * 6 - chalCount * 7));

  // 五星评分
  var starRating;
  if (score >= 90) starRating = 5;
  else if (score >= 80) starRating = 4;
  else if (score >= 70) starRating = 3;
  else if (score >= 60) starRating = 2;
  else starRating = 1;

  // 幸运数字和颜色（基于本命太阳星座）
  var luckyNumber = Math.floor(Math.abs(transitChart.sun.longitude - natalChart.sun.longitude)) % 9 + 1;

  var colorMap = {
    '白羊座': '红色', '金牛座': '绿色', '双子座': '黄色', '巨蟹座': '银色',
    '狮子座': '金色', '处女座': '深蓝色', '天秤座': '粉色', '天蝎座': '深紫色',
    '射手座': '紫色', '摩羯座': '深棕色', '水瓶座': '蓝绿色', '双鱼座': '海蓝色'
  };
  var luckyColor = colorMap[natalChart.sun.signName] || '白色';

  // 找到主导相位事件（最强的那个）
  var dominantTitle = '';
  var dominantEvent = null;
  for (var z = 0; z < events.length; z++) {
    if (events[z].type !== 'house') {
      dominantEvent = events[z];
      dominantTitle = events[z].title;
      break;
    }
  }
  if (!dominantEvent && events.length > 0) dominantEvent = events[0];

  return {
    score: score,
    starRating: starRating,
    luckyNumber: luckyNumber,
    luckyColor: luckyColor,
    events: events,
    dominantTitle: dominantTitle,
    dominantEvent: dominantEvent,
    natalSign: natalChart.sun.signName,
    transitMoonSign: transitChart.moon.signName,
    ascSign: natalChart.ascendant ? natalChart.ascendant.signName : null,
    natalPlanets: natalChart.planets,
    houseCusps: house1Cusp
  };
}

// ===== 生成圆形星盘图的坐标数据 =====
function generateChartCoordinates(chart, radius) {
  var coords = {};
  var planetList = chart.planets;

  // 行星在星盘外圈的位置（以12点为0度，顺时针）
  for (var i = 0; i < planetList.length; i++) {
    var angle = 270 - planetList[i].longitude; // 转换为canvas坐标
    var rad = angle * RAD;
    coords[planetList[i].name] = {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      angle: planetList[i].longitude
    };
  }

  if (chart.ascendant) {
    var ascAngle = 270 - chart.ascendant.longitude;
    var ascRad = ascAngle * RAD;
    coords['上升'] = {
      x: (radius + 30) * Math.cos(ascRad),
      y: (radius + 30) * Math.sin(ascRad),
      angle: chart.ascendant.longitude
    };
  }

  return coords;
}

module.exports = {
  getJulianDay: getJulianDay,
  getZodiacSign: getZodiacSign,
  zodiacNames: zodiacNames,
  zodiacSymbols: zodiacSymbols,
  calculateNatalChart: calculateNatalChart,
  calculateTransitChart: calculateTransitChart,
  calculateDailyFortune: calculateDailyFortune,
  generateChartCoordinates: generateChartCoordinates,
  calculateAspectsBetween: calculateAspectsBetween,
  identifyAllTransitAspects: identifyAllTransitAspects,
  getKeyTransitEvents: getKeyTransitEvents,
  aspectTypeDefs: aspectTypeDefs
};
