// 城市坐标数据库 - 全国地级市及全球主要城市
// 字段：name(中文名) / pinyin(拼音) / lng(经度) / lat(纬度) / timezone(时区偏移)
var cityList = [
  // ===== 直辖市（4） =====
  { name: '北京', pinyin: 'beijing', lng: 116.4074, lat: 39.9042, timezone: 8 },
  { name: '上海', pinyin: 'shanghai', lng: 121.4737, lat: 31.2304, timezone: 8 },
  { name: '天津', pinyin: 'tianjin', lng: 117.1902, lat: 39.1236, timezone: 8 },
  { name: '重庆', pinyin: 'chongqing', lng: 106.5516, lat: 29.5630, timezone: 8 },

  // ===== 广东省（21） =====
  { name: '广州', pinyin: 'guangzhou', lng: 113.2644, lat: 23.1291, timezone: 8 },
  { name: '深圳', pinyin: 'shenzhen', lng: 114.0579, lat: 22.5431, timezone: 8 },
  { name: '珠海', pinyin: 'zhuhai', lng: 113.5767, lat: 22.2707, timezone: 8 },
  { name: '东莞', pinyin: 'dongguan', lng: 113.7518, lat: 23.0208, timezone: 8 },
  { name: '佛山', pinyin: 'foshan', lng: 113.1219, lat: 23.0218, timezone: 8 },
  { name: '中山', pinyin: 'zhongshan', lng: 113.3924, lat: 22.5175, timezone: 8 },
  { name: '惠州', pinyin: 'huizhou', lng: 114.4163, lat: 23.1117, timezone: 8 },
  { name: '汕头', pinyin: 'shantou', lng: 116.6820, lat: 23.3540, timezone: 8 },
  { name: '韶关', pinyin: 'shaoguan', lng: 113.5914, lat: 24.8104, timezone: 8 },
  { name: '湛江', pinyin: 'zhanjiang', lng: 110.3597, lat: 21.2707, timezone: 8 },
  { name: '肇庆', pinyin: 'zhaoqing', lng: 112.4725, lat: 23.0519, timezone: 8 },
  { name: '江门', pinyin: 'jiangmen', lng: 113.0818, lat: 22.5783, timezone: 8 },
  { name: '茂名', pinyin: 'maoming', lng: 110.9250, lat: 21.6627, timezone: 8 },
  { name: '梅州', pinyin: 'meizhou', lng: 116.1184, lat: 24.2884, timezone: 8 },
  { name: '汕尾', pinyin: 'shanwei', lng: 115.3754, lat: 22.7787, timezone: 8 },
  { name: '河源', pinyin: 'heyuan', lng: 114.6978, lat: 23.7466, timezone: 8 },
  { name: '阳江', pinyin: 'yangjiang', lng: 111.9750, lat: 21.8598, timezone: 8 },
  { name: '清远', pinyin: 'qingyuan', lng: 113.0513, lat: 23.6852, timezone: 8 },
  { name: '潮州', pinyin: 'chaozhou', lng: 116.6226, lat: 23.6561, timezone: 8 },
  { name: '揭阳', pinyin: 'jieyang', lng: 116.3729, lat: 23.5497, timezone: 8 },
  { name: '云浮', pinyin: 'yunfu', lng: 112.0446, lat: 22.9159, timezone: 8 },

  // ===== 江苏省（13） =====
  { name: '南京', pinyin: 'nanjing', lng: 118.7969, lat: 32.0603, timezone: 8 },
  { name: '苏州', pinyin: 'suzhou', lng: 120.5853, lat: 31.2990, timezone: 8 },
  { name: '无锡', pinyin: 'wuxi', lng: 120.3119, lat: 31.4912, timezone: 8 },
  { name: '常州', pinyin: 'changzhou', lng: 119.9740, lat: 31.8112, timezone: 8 },
  { name: '徐州', pinyin: 'xuzhou', lng: 117.2857, lat: 34.2058, timezone: 8 },
  { name: '南通', pinyin: 'nantong', lng: 120.8650, lat: 32.0162, timezone: 8 },
  { name: '扬州', pinyin: 'yangzhou', lng: 119.4216, lat: 32.3932, timezone: 8 },
  { name: '镇江', pinyin: 'zhenjiang', lng: 119.4521, lat: 32.2035, timezone: 8 },
  { name: '泰州', pinyin: 'taizhou', lng: 119.9156, lat: 32.4842, timezone: 8 },
  { name: '盐城', pinyin: 'yancheng', lng: 120.1385, lat: 33.3777, timezone: 8 },
  { name: '连云港', pinyin: 'lianyungang', lng: 119.2220, lat: 34.5968, timezone: 8 },
  { name: '淮安', pinyin: 'huaian', lng: 119.0213, lat: 33.5974, timezone: 8 },
  { name: '宿迁', pinyin: 'suqian', lng: 118.2758, lat: 33.9632, timezone: 8 },

  // ===== 浙江省（11） =====
  { name: '杭州', pinyin: 'hangzhou', lng: 120.1551, lat: 30.2741, timezone: 8 },
  { name: '宁波', pinyin: 'ningbo', lng: 121.5440, lat: 29.8683, timezone: 8 },
  { name: '温州', pinyin: 'wenzhou', lng: 120.6994, lat: 27.9938, timezone: 8 },
  { name: '绍兴', pinyin: 'shaoxing', lng: 120.5853, lat: 30.0303, timezone: 8 },
  { name: '嘉兴', pinyin: 'jiaxing', lng: 120.7555, lat: 30.7465, timezone: 8 },
  { name: '金华', pinyin: 'jinhua', lng: 119.6479, lat: 29.0782, timezone: 8 },
  { name: '台州', pinyin: 'taizhou2', lng: 121.4287, lat: 28.6615, timezone: 8 },
  { name: '湖州', pinyin: 'huzhou', lng: 120.0880, lat: 30.8909, timezone: 8 },
  { name: '丽水', pinyin: 'lishui', lng: 119.9229, lat: 28.4517, timezone: 8 },
  { name: '衢州', pinyin: 'quzhou', lng: 118.8740, lat: 28.9414, timezone: 8 },
  { name: '舟山', pinyin: 'zhoushan', lng: 122.1062, lat: 30.0162, timezone: 8 },

  // ===== 山东省（16） =====
  { name: '济南', pinyin: 'jinan', lng: 117.1205, lat: 36.6510, timezone: 8 },
  { name: '青岛', pinyin: 'qingdao', lng: 120.3826, lat: 36.0671, timezone: 8 },
  { name: '烟台', pinyin: 'yantai', lng: 121.4480, lat: 37.4638, timezone: 8 },
  { name: '潍坊', pinyin: 'weifang', lng: 119.1071, lat: 36.7093, timezone: 8 },
  { name: '淄博', pinyin: 'zibo', lng: 118.0476, lat: 36.8140, timezone: 8 },
  { name: '威海', pinyin: 'weihai', lng: 122.1164, lat: 37.5087, timezone: 8 },
  { name: '济宁', pinyin: 'jining', lng: 116.5871, lat: 35.4148, timezone: 8 },
  { name: '泰安', pinyin: 'taian', lng: 117.0892, lat: 36.2005, timezone: 8 },
  { name: '日照', pinyin: 'rizhao', lng: 119.5272, lat: 35.4158, timezone: 8 },
  { name: '临沂', pinyin: 'linyi', lng: 118.3266, lat: 35.0654, timezone: 8 },
  { name: '德州', pinyin: 'dezhou', lng: 116.3073, lat: 37.4532, timezone: 8 },
  { name: '聊城', pinyin: 'liaocheng', lng: 115.9808, lat: 36.4567, timezone: 8 },
  { name: '滨州', pinyin: 'binzhou', lng: 117.9708, lat: 37.3827, timezone: 8 },
  { name: '菏泽', pinyin: 'heze', lng: 115.4698, lat: 35.2463, timezone: 8 },
  { name: '枣庄', pinyin: 'zaozhuang', lng: 117.5577, lat: 34.8569, timezone: 8 },
  { name: '东营', pinyin: 'dongying', lng: 118.6645, lat: 37.4342, timezone: 8 },

  // ===== 四川省（18） =====
  { name: '成都', pinyin: 'chengdu', lng: 104.0665, lat: 30.5728, timezone: 8 },
  { name: '绵阳', pinyin: 'mianyang', lng: 104.7417, lat: 31.4642, timezone: 8 },
  { name: '德阳', pinyin: 'deyang', lng: 104.3983, lat: 31.1269, timezone: 8 },
  { name: '自贡', pinyin: 'zigong', lng: 104.7826, lat: 29.3416, timezone: 8 },
  { name: '攀枝花', pinyin: 'panzhihua', lng: 101.7157, lat: 26.5798, timezone: 8 },
  { name: '泸州', pinyin: 'luzhou', lng: 105.4432, lat: 28.8892, timezone: 8 },
  { name: '广元', pinyin: 'guangyuan', lng: 105.8288, lat: 32.4338, timezone: 8 },
  { name: '遂宁', pinyin: 'suining', lng: 105.5714, lat: 30.5136, timezone: 8 },
  { name: '内江', pinyin: 'neijiang', lng: 105.0655, lat: 29.5863, timezone: 8 },
  { name: '乐山', pinyin: 'leshan', lng: 103.7613, lat: 29.5822, timezone: 8 },
  { name: '南充', pinyin: 'nanchong', lng: 106.1107, lat: 30.8378, timezone: 8 },
  { name: '眉山', pinyin: 'meishan', lng: 103.8315, lat: 30.0483, timezone: 8 },
  { name: '宜宾', pinyin: 'yibin', lng: 104.6307, lat: 28.7606, timezone: 8 },
  { name: '广安', pinyin: 'guangan', lng: 106.6332, lat: 30.4567, timezone: 8 },
  { name: '达州', pinyin: 'dazhou', lng: 107.4679, lat: 31.2083, timezone: 8 },
  { name: '雅安', pinyin: 'yaan', lng: 103.0420, lat: 29.9800, timezone: 8 },
  { name: '巴中', pinyin: 'bazhong', lng: 106.7537, lat: 31.8678, timezone: 8 },
  { name: '资阳', pinyin: 'ziyang', lng: 104.6421, lat: 30.1224, timezone: 8 },

  // ===== 湖北省（12） =====
  { name: '武汉', pinyin: 'wuhan', lng: 114.3055, lat: 30.5928, timezone: 8 },
  { name: '宜昌', pinyin: 'yichang', lng: 111.2865, lat: 30.6919, timezone: 8 },
  { name: '襄阳', pinyin: 'xiangyang', lng: 112.1441, lat: 32.0420, timezone: 8 },
  { name: '黄石', pinyin: 'huangshi', lng: 115.0782, lat: 30.1946, timezone: 8 },
  { name: '十堰', pinyin: 'shiyan', lng: 110.7985, lat: 32.6328, timezone: 8 },
  { name: '荆州', pinyin: 'jingzhou', lng: 112.2387, lat: 30.3355, timezone: 8 },
  { name: '荆门', pinyin: 'jingmen', lng: 112.2042, lat: 31.0355, timezone: 8 },
  { name: '鄂州', pinyin: 'ezhou', lng: 114.8912, lat: 30.3964, timezone: 8 },
  { name: '孝感', pinyin: 'xiaogan', lng: 113.9229, lat: 30.9265, timezone: 8 },
  { name: '黄冈', pinyin: 'huanggang', lng: 114.8720, lat: 30.4535, timezone: 8 },
  { name: '咸宁', pinyin: 'xianning', lng: 114.3225, lat: 29.8410, timezone: 8 },
  { name: '随州', pinyin: 'suizhou', lng: 113.3741, lat: 31.7170, timezone: 8 },

  // ===== 湖南省（13） =====
  { name: '长沙', pinyin: 'changsha', lng: 112.9389, lat: 28.2282, timezone: 8 },
  { name: '株洲', pinyin: 'zhuzhou', lng: 113.1341, lat: 27.8279, timezone: 8 },
  { name: '湘潭', pinyin: 'xiangtan', lng: 112.9440, lat: 27.8299, timezone: 8 },
  { name: '衡阳', pinyin: 'hengyang', lng: 112.6074, lat: 26.8981, timezone: 8 },
  { name: '邵阳', pinyin: 'shaoyang', lng: 111.4687, lat: 27.2378, timezone: 8 },
  { name: '岳阳', pinyin: 'yueyang', lng: 113.1290, lat: 29.3572, timezone: 8 },
  { name: '常德', pinyin: 'changde', lng: 111.6980, lat: 29.0317, timezone: 8 },
  { name: '张家界', pinyin: 'zhangjiajie', lng: 110.4797, lat: 29.1175, timezone: 8 },
  { name: '益阳', pinyin: 'yiyang', lng: 112.3550, lat: 28.5716, timezone: 8 },
  { name: '郴州', pinyin: 'chenzhou', lng: 113.0323, lat: 25.7946, timezone: 8 },
  { name: '永州', pinyin: 'yongzhou', lng: 111.6088, lat: 26.4351, timezone: 8 },
  { name: '怀化', pinyin: 'huaihua', lng: 110.0080, lat: 27.5501, timezone: 8 },
  { name: '娄底', pinyin: 'loudi', lng: 111.9928, lat: 27.7299, timezone: 8 },

  // ===== 河南省（17） =====
  { name: '郑州', pinyin: 'zhengzhou', lng: 113.6254, lat: 34.7466, timezone: 8 },
  { name: '洛阳', pinyin: 'luoyang', lng: 112.4540, lat: 34.6197, timezone: 8 },
  { name: '开封', pinyin: 'kaifeng', lng: 114.3417, lat: 34.7971, timezone: 8 },
  { name: '南阳', pinyin: 'nanyang', lng: 112.5284, lat: 32.9909, timezone: 8 },
  { name: '新乡', pinyin: 'xinxiang', lng: 113.9271, lat: 35.3030, timezone: 8 },
  { name: '安阳', pinyin: 'anyang', lng: 114.3932, lat: 36.0975, timezone: 8 },
  { name: '焦作', pinyin: 'jiaozuo', lng: 113.2387, lat: 35.2341, timezone: 8 },
  { name: '许昌', pinyin: 'xuchang', lng: 113.8535, lat: 34.0235, timezone: 8 },
  { name: '平顶山', pinyin: 'pingdingshan', lng: 113.3086, lat: 33.7352, timezone: 8 },
  { name: '漯河', pinyin: 'luohe', lng: 114.0042, lat: 33.5769, timezone: 8 },
  { name: '商丘', pinyin: 'shangqiu', lng: 115.6506, lat: 34.4373, timezone: 8 },
  { name: '信阳', pinyin: 'xinyang', lng: 114.0747, lat: 32.1247, timezone: 8 },
  { name: '周口', pinyin: 'zhoukou', lng: 114.6561, lat: 33.6201, timezone: 8 },
  { name: '驻马店', pinyin: 'zhumadian', lng: 114.0248, lat: 32.9803, timezone: 8 },
  { name: '濮阳', pinyin: 'puyang', lng: 115.0414, lat: 35.7685, timezone: 8 },
  { name: '鹤壁', pinyin: 'hebi', lng: 114.2958, lat: 35.7417, timezone: 8 },
  { name: '三门峡', pinyin: 'sanmenxia', lng: 111.1939, lat: 34.7777, timezone: 8 },

  // ===== 河北省（11） =====
  { name: '石家庄', pinyin: 'shijiazhuang', lng: 114.5149, lat: 38.0428, timezone: 8 },
  { name: '唐山', pinyin: 'tangshan', lng: 118.1803, lat: 39.6302, timezone: 8 },
  { name: '保定', pinyin: 'baoding', lng: 115.4646, lat: 38.8739, timezone: 8 },
  { name: '秦皇岛', pinyin: 'qinhuangdao', lng: 119.5875, lat: 39.9424, timezone: 8 },
  { name: '邯郸', pinyin: 'handan', lng: 114.4903, lat: 36.6128, timezone: 8 },
  { name: '邢台', pinyin: 'xingtai', lng: 114.5090, lat: 37.0678, timezone: 8 },
  { name: '张家口', pinyin: 'zhangjiakou', lng: 114.8844, lat: 40.8117, timezone: 8 },
  { name: '承德', pinyin: 'chengde', lng: 117.9392, lat: 40.9763, timezone: 8 },
  { name: '沧州', pinyin: 'cangzhou', lng: 116.8571, lat: 38.3106, timezone: 8 },
  { name: '廊坊', pinyin: 'langfang', lng: 116.7048, lat: 39.5220, timezone: 8 },
  { name: '衡水', pinyin: 'hengshui', lng: 115.6658, lat: 37.7358, timezone: 8 },

  // ===== 福建省（9） =====
  { name: '福州', pinyin: 'fuzhou', lng: 119.2965, lat: 26.0745, timezone: 8 },
  { name: '厦门', pinyin: 'xiamen', lng: 118.0894, lat: 24.4798, timezone: 8 },
  { name: '泉州', pinyin: 'quanzhou', lng: 118.5895, lat: 24.8741, timezone: 8 },
  { name: '漳州', pinyin: 'zhangzhou', lng: 117.6611, lat: 24.5095, timezone: 8 },
  { name: '莆田', pinyin: 'putian', lng: 119.0076, lat: 25.4547, timezone: 8 },
  { name: '龙岩', pinyin: 'longyan', lng: 117.0298, lat: 25.0916, timezone: 8 },
  { name: '三明', pinyin: 'sanming', lng: 117.6352, lat: 26.2655, timezone: 8 },
  { name: '南平', pinyin: 'nanping', lng: 118.1784, lat: 26.6358, timezone: 8 },
  { name: '宁德', pinyin: 'ningde', lng: 119.5275, lat: 26.6603, timezone: 8 },

  // ===== 安徽省（16） =====
  { name: '合肥', pinyin: 'hefei', lng: 117.2272, lat: 31.8206, timezone: 8 },
  { name: '芜湖', pinyin: 'wuhu', lng: 118.4331, lat: 31.3526, timezone: 8 },
  { name: '安庆', pinyin: 'anqing', lng: 117.0536, lat: 30.5085, timezone: 8 },
  { name: '马鞍山', pinyin: 'maanshan', lng: 118.5074, lat: 31.6895, timezone: 8 },
  { name: '滁州', pinyin: 'chuzhou', lng: 118.3172, lat: 32.2963, timezone: 8 },
  { name: '宿州', pinyin: 'suzhou', lng: 116.9845, lat: 33.6333, timezone: 8 },
  { name: '蚌埠', pinyin: 'bengbu', lng: 117.3630, lat: 32.9395, timezone: 8 },
  { name: '淮南', pinyin: 'huainan', lng: 116.9993, lat: 32.6238, timezone: 8 },
  { name: '淮北', pinyin: 'huaibei', lng: 116.7980, lat: 33.9558, timezone: 8 },
  { name: '铜陵', pinyin: 'tongling', lng: 117.8173, lat: 30.9264, timezone: 8 },
  { name: '黄山', pinyin: 'huangshan', lng: 118.3164, lat: 29.7147, timezone: 8 },
  { name: '阜阳', pinyin: 'fuyang', lng: 115.8199, lat: 32.8961, timezone: 8 },
  { name: '六安', pinyin: 'liuan', lng: 116.5087, lat: 31.7526, timezone: 8 },
  { name: '池州', pinyin: 'chizhou', lng: 117.4889, lat: 30.6560, timezone: 8 },
  { name: '宣城', pinyin: 'xuancheng', lng: 118.7570, lat: 30.9490, timezone: 8 },
  { name: '亳州', pinyin: 'bozhou', lng: 115.7789, lat: 33.8696, timezone: 8 },

  // ===== 江西省（11） =====
  { name: '南昌', pinyin: 'nanchang', lng: 115.8581, lat: 28.6820, timezone: 8 },
  { name: '赣州', pinyin: 'ganzhou', lng: 114.9401, lat: 25.8310, timezone: 8 },
  { name: '九江', pinyin: 'jiujiang', lng: 115.9921, lat: 29.7051, timezone: 8 },
  { name: '景德镇', pinyin: 'jingdezhen', lng: 117.2140, lat: 29.2738, timezone: 8 },
  { name: '萍乡', pinyin: 'pingxiang', lng: 113.8527, lat: 27.6220, timezone: 8 },
  { name: '新余', pinyin: 'xinyu', lng: 114.9305, lat: 27.8122, timezone: 8 },
  { name: '鹰潭', pinyin: 'yingtan', lng: 117.0325, lat: 28.2447, timezone: 8 },
  { name: '宜春', pinyin: 'yichun', lng: 114.3913, lat: 27.8187, timezone: 8 },
  { name: '抚州', pinyin: 'fuzhou', lng: 116.3578, lat: 27.9836, timezone: 8 },
  { name: '上饶', pinyin: 'shangrao', lng: 117.9715, lat: 28.4560, timezone: 8 },
  { name: '吉安', pinyin: 'jian', lng: 114.9928, lat: 27.1143, timezone: 8 },

  // ===== 辽宁省（14） =====
  { name: '沈阳', pinyin: 'shenyang', lng: 123.4328, lat: 41.8057, timezone: 8 },
  { name: '大连', pinyin: 'dalian', lng: 121.6147, lat: 38.9140, timezone: 8 },
  { name: '鞍山', pinyin: 'anshan', lng: 122.9957, lat: 41.1100, timezone: 8 },
  { name: '抚顺', pinyin: 'fushun', lng: 123.9213, lat: 41.8765, timezone: 8 },
  { name: '本溪', pinyin: 'benxi', lng: 123.7705, lat: 41.2965, timezone: 8 },
  { name: '丹东', pinyin: 'dandong', lng: 124.3825, lat: 40.1245, timezone: 8 },
  { name: '锦州', pinyin: 'jinzhou', lng: 121.1269, lat: 41.0952, timezone: 8 },
  { name: '营口', pinyin: 'yingkou', lng: 122.2355, lat: 40.6677, timezone: 8 },
  { name: '阜新', pinyin: 'fuxin', lng: 121.6708, lat: 42.0227, timezone: 8 },
  { name: '辽阳', pinyin: 'liaoyang', lng: 123.1801, lat: 41.2701, timezone: 8 },
  { name: '盘锦', pinyin: 'panjin', lng: 122.0704, lat: 41.1245, timezone: 8 },
  { name: '铁岭', pinyin: 'tieling', lng: 123.8447, lat: 42.2911, timezone: 8 },
  { name: '朝阳', pinyin: 'chaoyang', lng: 120.4511, lat: 41.5762, timezone: 8 },
  { name: '葫芦岛', pinyin: 'huludao', lng: 120.8360, lat: 40.7117, timezone: 8 },

  // ===== 吉林省（8） =====
  { name: '长春', pinyin: 'changchun', lng: 125.3245, lat: 43.8868, timezone: 8 },
  { name: '吉林', pinyin: 'jilin', lng: 126.5530, lat: 43.8434, timezone: 8 },
  { name: '四平', pinyin: 'siping', lng: 124.3506, lat: 43.3119, timezone: 8 },
  { name: '辽源', pinyin: 'liaoyuan', lng: 125.1457, lat: 42.9027, timezone: 8 },
  { name: '通化', pinyin: 'tonghua', lng: 125.9366, lat: 41.7213, timezone: 8 },
  { name: '白山', pinyin: 'baishan', lng: 126.4275, lat: 41.9420, timezone: 8 },
  { name: '松原', pinyin: 'songyuan', lng: 124.8244, lat: 45.1185, timezone: 8 },
  { name: '白城', pinyin: 'baicheng', lng: 122.8413, lat: 45.6194, timezone: 8 },

  // ===== 黑龙江省（12） =====
  { name: '哈尔滨', pinyin: 'haerbin', lng: 126.6425, lat: 45.7560, timezone: 8 },
  { name: '大庆', pinyin: 'daqing', lng: 125.1035, lat: 46.5892, timezone: 8 },
  { name: '齐齐哈尔', pinyin: 'qiqihaer', lng: 123.9184, lat: 47.3523, timezone: 8 },
  { name: '牡丹江', pinyin: 'mudanjiang', lng: 129.6333, lat: 44.5872, timezone: 8 },
  { name: '佳木斯', pinyin: 'jiamusi', lng: 130.3617, lat: 46.8093, timezone: 8 },
  { name: '伊春', pinyin: 'yichun', lng: 128.8428, lat: 47.7231, timezone: 8 },
  { name: '鸡西', pinyin: 'jixi', lng: 130.9691, lat: 45.2952, timezone: 8 },
  { name: '鹤岗', pinyin: 'hegang', lng: 130.2776, lat: 47.3335, timezone: 8 },
  { name: '双鸭山', pinyin: 'shuangyashan', lng: 131.1579, lat: 46.6432, timezone: 8 },
  { name: '七台河', pinyin: 'qitaihe', lng: 131.0033, lat: 45.7721, timezone: 8 },
  { name: '黑河', pinyin: 'heihe', lng: 127.4981, lat: 50.2492, timezone: 8 },
  { name: '绥化', pinyin: 'suihua', lng: 126.9865, lat: 46.6373, timezone: 8 },

  // ===== 山西省（11） =====
  { name: '太原', pinyin: 'taiyuan', lng: 112.5489, lat: 37.8706, timezone: 8 },
  { name: '大同', pinyin: 'datong', lng: 113.2950, lat: 40.0906, timezone: 8 },
  { name: '阳泉', pinyin: 'yangquan', lng: 113.5830, lat: 37.8601, timezone: 8 },
  { name: '长治', pinyin: 'changzhi', lng: 113.1125, lat: 36.1914, timezone: 8 },
  { name: '晋城', pinyin: 'jincheng', lng: 112.8516, lat: 35.4909, timezone: 8 },
  { name: '朔州', pinyin: 'shuozhou', lng: 112.4335, lat: 39.3320, timezone: 8 },
  { name: '晋中', pinyin: 'jinzhong', lng: 112.7365, lat: 37.6965, timezone: 8 },
  { name: '运城', pinyin: 'yuncheng', lng: 111.0036, lat: 35.0226, timezone: 8 },
  { name: '忻州', pinyin: 'xinzhou', lng: 112.7337, lat: 38.4177, timezone: 8 },
  { name: '临汾', pinyin: 'linfen', lng: 111.5177, lat: 36.0832, timezone: 8 },
  { name: '吕梁', pinyin: 'lvliang', lng: 111.1346, lat: 37.5246, timezone: 8 },

  // ===== 陕西省（10） =====
  { name: '西安', pinyin: 'xian', lng: 108.9398, lat: 34.3416, timezone: 8 },
  { name: '宝鸡', pinyin: 'baoji', lng: 107.2374, lat: 34.3612, timezone: 8 },
  { name: '咸阳', pinyin: 'xianyang', lng: 108.7050, lat: 34.3308, timezone: 8 },
  { name: '铜川', pinyin: 'tongchuan', lng: 108.9451, lat: 34.8970, timezone: 8 },
  { name: '渭南', pinyin: 'weinan', lng: 109.5025, lat: 34.4995, timezone: 8 },
  { name: '延安', pinyin: 'yanan', lng: 109.4907, lat: 36.5853, timezone: 8 },
  { name: '汉中', pinyin: 'hanzhong', lng: 107.0232, lat: 33.0673, timezone: 8 },
  { name: '榆林', pinyin: 'yulin', lng: 109.7352, lat: 38.2848, timezone: 8 },
  { name: '安康', pinyin: 'ankang', lng: 109.0293, lat: 32.6844, timezone: 8 },
  { name: '商洛', pinyin: 'shangluo', lng: 109.9401, lat: 33.8699, timezone: 8 },

  // ===== 甘肃省（12） =====
  { name: '兰州', pinyin: 'lanzhou', lng: 103.8341, lat: 36.0611, timezone: 8 },
  { name: '天水', pinyin: 'tianshui', lng: 105.7250, lat: 34.5810, timezone: 8 },
  { name: '嘉峪关', pinyin: 'jiayuguan', lng: 98.2893, lat: 39.7730, timezone: 8 },
  { name: '金昌', pinyin: 'jinchang', lng: 102.1883, lat: 38.5204, timezone: 8 },
  { name: '白银', pinyin: 'baiyin', lng: 104.1820, lat: 36.5490, timezone: 8 },
  { name: '酒泉', pinyin: 'jiuquan', lng: 98.5093, lat: 39.7441, timezone: 8 },
  { name: '张掖', pinyin: 'zhangye', lng: 100.4554, lat: 38.9320, timezone: 8 },
  { name: '武威', pinyin: 'wuwei', lng: 102.6380, lat: 37.9284, timezone: 8 },
  { name: '定西', pinyin: 'dingxi', lng: 104.6282, lat: 35.5795, timezone: 8 },
  { name: '陇南', pinyin: 'longnan', lng: 104.9283, lat: 33.3883, timezone: 8 },
  { name: '平凉', pinyin: 'pingliang', lng: 106.6650, lat: 35.5434, timezone: 8 },
  { name: '庆阳', pinyin: 'qingyang', lng: 107.6370, lat: 35.7343, timezone: 8 },

  // ===== 青海省（2） =====
  { name: '西宁', pinyin: 'xining', lng: 101.7782, lat: 36.6171, timezone: 8 },
  { name: '海东', pinyin: 'haidong', lng: 102.1044, lat: 36.5023, timezone: 8 },

  // ===== 宁夏回族自治区（5） =====
  { name: '银川', pinyin: 'yinchuan', lng: 106.2309, lat: 38.4872, timezone: 8 },
  { name: '石嘴山', pinyin: 'shizuishan', lng: 106.3773, lat: 39.0128, timezone: 8 },
  { name: '吴忠', pinyin: 'wuzhong', lng: 106.2080, lat: 37.9974, timezone: 8 },
  { name: '固原', pinyin: 'guyuan', lng: 106.2422, lat: 36.1870, timezone: 8 },
  { name: '中卫', pinyin: 'zhongwei', lng: 105.1921, lat: 37.4998, timezone: 8 },

  // ===== 内蒙古自治区（9） =====
  { name: '呼和浩特', pinyin: 'huhehaote', lng: 111.7519, lat: 40.8415, timezone: 8 },
  { name: '包头', pinyin: 'baotou', lng: 109.8404, lat: 40.6583, timezone: 8 },
  { name: '乌海', pinyin: 'wuhai', lng: 106.7968, lat: 39.6560, timezone: 8 },
  { name: '赤峰', pinyin: 'chifeng', lng: 118.9565, lat: 42.2760, timezone: 8 },
  { name: '通辽', pinyin: 'tongliao', lng: 122.2630, lat: 43.6176, timezone: 8 },
  { name: '鄂尔多斯', pinyin: 'eerduosi', lng: 109.7822, lat: 39.6088, timezone: 8 },
  { name: '呼伦贝尔', pinyin: 'hulunbeier', lng: 119.7583, lat: 49.2153, timezone: 8 },
  { name: '巴彦淖尔', pinyin: 'bayannaoer', lng: 107.3811, lat: 40.7433, timezone: 8 },
  { name: '乌兰察布', pinyin: 'wulanchabu', lng: 113.1159, lat: 41.0342, timezone: 8 },

  // ===== 新疆维吾尔自治区（4） =====
  { name: '乌鲁木齐', pinyin: 'wulumuqi', lng: 87.6168, lat: 43.8256, timezone: 8 },
  { name: '克拉玛依', pinyin: 'kelamayi', lng: 84.8739, lat: 45.5952, timezone: 8 },
  { name: '吐鲁番', pinyin: 'tulufan', lng: 89.1849, lat: 42.9476, timezone: 8 },
  { name: '哈密', pinyin: 'hami', lng: 93.5170, lat: 42.8207, timezone: 8 },

  // ===== 西藏自治区（1） =====
  { name: '拉萨', pinyin: 'lasa', lng: 91.1322, lat: 29.6604, timezone: 8 },

  // ===== 云南省（8） =====
  { name: '昆明', pinyin: 'kunming', lng: 102.8329, lat: 24.8801, timezone: 8 },
  { name: '曲靖', pinyin: 'qujing', lng: 103.7976, lat: 25.4900, timezone: 8 },
  { name: '玉溪', pinyin: 'yuxi', lng: 102.5431, lat: 24.3506, timezone: 8 },
  { name: '保山', pinyin: 'baoshan', lng: 99.1630, lat: 25.1121, timezone: 8 },
  { name: '昭通', pinyin: 'zhaotong', lng: 103.7170, lat: 27.3384, timezone: 8 },
  { name: '丽江', pinyin: 'lijiang', lng: 100.2330, lat: 26.8722, timezone: 8 },
  { name: '普洱', pinyin: 'puer', lng: 100.9720, lat: 22.7773, timezone: 8 },
  { name: '临沧', pinyin: 'lincang', lng: 100.0800, lat: 23.8866, timezone: 8 },

  // ===== 贵州省（6） =====
  { name: '贵阳', pinyin: 'guiyang', lng: 106.6302, lat: 26.6477, timezone: 8 },
  { name: '遵义', pinyin: 'zunyi', lng: 106.9074, lat: 27.7254, timezone: 8 },
  { name: '六盘水', pinyin: 'liupanshui', lng: 104.8312, lat: 26.5917, timezone: 8 },
  { name: '安顺', pinyin: 'anshun', lng: 105.9460, lat: 26.2525, timezone: 8 },
  { name: '毕节', pinyin: 'bijie', lng: 105.2848, lat: 27.3027, timezone: 8 },
  { name: '铜仁', pinyin: 'tongren', lng: 109.1891, lat: 27.7163, timezone: 8 },

  // ===== 广西壮族自治区（14） =====
  { name: '南宁', pinyin: 'nanning', lng: 108.3665, lat: 22.8170, timezone: 8 },
  { name: '柳州', pinyin: 'liuzhou', lng: 109.4155, lat: 24.3290, timezone: 8 },
  { name: '桂林', pinyin: 'guilin', lng: 110.2998, lat: 25.2742, timezone: 8 },
  { name: '梧州', pinyin: 'wuzhou', lng: 111.2797, lat: 23.4767, timezone: 8 },
  { name: '北海', pinyin: 'beihai', lng: 109.1204, lat: 21.4813, timezone: 8 },
  { name: '防城港', pinyin: 'fangchenggang', lng: 108.3576, lat: 21.6885, timezone: 8 },
  { name: '钦州', pinyin: 'qinzhou', lng: 108.6430, lat: 21.9819, timezone: 8 },
  { name: '贵港', pinyin: 'guigang', lng: 109.6020, lat: 23.1128, timezone: 8 },
  { name: '玉林', pinyin: 'yulin', lng: 110.1535, lat: 22.6381, timezone: 8 },
  { name: '百色', pinyin: 'baise', lng: 106.6161, lat: 23.8972, timezone: 8 },
  { name: '贺州', pinyin: 'hezhou', lng: 111.5663, lat: 24.4025, timezone: 8 },
  { name: '河池', pinyin: 'hechi', lng: 108.0620, lat: 24.6954, timezone: 8 },
  { name: '来宾', pinyin: 'laibin', lng: 109.2296, lat: 23.7335, timezone: 8 },
  { name: '崇左', pinyin: 'chongzuo', lng: 107.3532, lat: 22.4051, timezone: 8 },

  // ===== 海南省（4） =====
  { name: '海口', pinyin: 'haikou', lng: 110.3312, lat: 20.0311, timezone: 8 },
  { name: '三亚', pinyin: 'sanya', lng: 109.5082, lat: 18.2479, timezone: 8 },
  { name: '儋州', pinyin: 'danzhou', lng: 109.5766, lat: 19.5170, timezone: 8 },
  { name: '三沙', pinyin: 'sansha', lng: 112.3480, lat: 16.8315, timezone: 8 },

  // ===== 港澳台 =====
  { name: '香港', pinyin: 'xianggang', lng: 114.1694, lat: 22.3193, timezone: 8 },
  { name: '澳门', pinyin: 'aomen', lng: 113.5439, lat: 22.1987, timezone: 8 },
  { name: '台北', pinyin: 'taibei', lng: 121.5654, lat: 25.0330, timezone: 8 },
  { name: '高雄', pinyin: 'gaoxiong', lng: 120.3014, lat: 22.6273, timezone: 8 },
  { name: '台中', pinyin: 'taizhong', lng: 120.6736, lat: 24.1477, timezone: 8 },

  // ===== 全球主要城市 =====
  { name: '东京', pinyin: 'dongjing', lng: 139.6917, lat: 35.6895, timezone: 9 },
  { name: '首尔', pinyin: 'shouer', lng: 126.9780, lat: 37.5665, timezone: 9 },
  { name: '新加坡', pinyin: 'xinjiapo', lng: 103.8198, lat: 1.3521, timezone: 8 },
  { name: '曼谷', pinyin: 'mangu', lng: 100.5018, lat: 13.7563, timezone: 7 },
  { name: '吉隆坡', pinyin: 'jilongpo', lng: 101.6869, lat: 3.1390, timezone: 8 },
  { name: '雅加达', pinyin: 'yajiada', lng: 106.8456, lat: -6.2088, timezone: 7 },
  { name: '马尼拉', pinyin: 'manila', lng: 120.9842, lat: 14.5995, timezone: 8 },
  { name: '河内', pinyin: 'henei', lng: 105.8342, lat: 21.0278, timezone: 7 },
  { name: '万象', pinyin: 'wanxiang', lng: 102.6331, lat: 17.9757, timezone: 7 },
  { name: '金边', pinyin: 'jinbian', lng: 104.9167, lat: 11.5564, timezone: 7 },
  { name: '仰光', pinyin: 'yangguang', lng: 96.1951, lat: 16.8409, timezone: 6.5 },
  { name: '孟买', pinyin: 'mengmai', lng: 72.8777, lat: 19.0760, timezone: 5.5 },
  { name: '新德里', pinyin: 'xindeli', lng: 77.2090, lat: 28.6139, timezone: 5.5 },
  { name: '迪拜', pinyin: 'dubai', lng: 55.2708, lat: 25.2048, timezone: 4 },
  { name: '伊斯坦布尔', pinyin: 'yisitannbaoer', lng: 28.9784, lat: 41.0082, timezone: 3 },
  { name: '莫斯科', pinyin: 'mosike', lng: 37.6173, lat: 55.7558, timezone: 3 },
  { name: '伦敦', pinyin: 'lundun', lng: -0.1278, lat: 51.5074, timezone: 0 },
  { name: '巴黎', pinyin: 'bali', lng: 2.3522, lat: 48.8566, timezone: 1 },
  { name: '柏林', pinyin: 'bolin', lng: 13.4050, lat: 52.5200, timezone: 1 },
  { name: '罗马', pinyin: 'luoma', lng: 12.4964, lat: 41.9028, timezone: 1 },
  { name: '马德里', pinyin: 'madeli', lng: -3.7038, lat: 40.4168, timezone: 1 },
  { name: '阿姆斯特丹', pinyin: 'amusite', lng: 4.9041, lat: 52.3676, timezone: 1 },
  { name: '雅典', pinyin: 'yadian', lng: 23.7275, lat: 37.9838, timezone: 2 },
  { name: '开罗', pinyin: 'kailuo', lng: 31.2357, lat: 30.0444, timezone: 2 },
  { name: '约翰内斯堡', pinyin: 'yuehanneisibao', lng: 28.0473, lat: -26.2041, timezone: 2 },
  { name: '纽约', pinyin: 'niuyue', lng: -74.0060, lat: 40.7128, timezone: -5 },
  { name: '洛杉矶', pinyin: 'luoshanji', lng: -118.2437, lat: 34.0522, timezone: -8 },
  { name: '旧金山', pinyin: 'jiujinshan', lng: -122.4194, lat: 37.7749, timezone: -8 },
  { name: '芝加哥', pinyin: 'zhijiage', lng: -87.6298, lat: 41.8781, timezone: -6 },
  { name: '华盛顿', pinyin: 'huashengdun', lng: -77.0369, lat: 38.9072, timezone: -5 },
  { name: '多伦多', pinyin: 'duolunduo', lng: -79.3832, lat: 43.6532, timezone: -5 },
  { name: '温哥华', pinyin: 'wengehua', lng: -123.1207, lat: 49.2827, timezone: -8 },
  { name: '悉尼', pinyin: 'xini', lng: 151.2093, lat: -33.8688, timezone: 10 },
  { name: '墨尔本', pinyin: 'moerben', lng: 144.9631, lat: -37.8136, timezone: 10 },
  { name: '奥克兰', pinyin: 'aokelan', lng: 174.7633, lat: -36.8485, timezone: 12 },
  { name: '圣保罗', pinyin: 'shengbaoluo', lng: -46.6333, lat: -23.5505, timezone: -3 },
  { name: '布宜诺斯艾利斯', pinyin: 'buyinuosiailisi', lng: -58.3816, lat: -34.6037, timezone: -3 },
  { name: '墨西哥城', pinyin: 'moxigecheng', lng: -99.1332, lat: 19.4326, timezone: -6 }
];

// 模糊搜索城市
function searchCity(keyword) {
  if (!keyword || !keyword.trim()) {
    return cityList.slice(0, 20);
  }
  var kw = keyword.trim().toLowerCase();
  var results = [];
  for (var i = 0; i < cityList.length; i++) {
    var city = cityList[i];
    if (city.name.indexOf(keyword) !== -1 ||
        city.pinyin.indexOf(kw) !== -1 ||
        city.pinyin.charAt(0) === kw.charAt(0)) {
      results.push(city);
    }
    if (results.length >= 50) break;
  }
  return results;
}

module.exports = {
  cityList: cityList,
  searchCity: searchCity
};
