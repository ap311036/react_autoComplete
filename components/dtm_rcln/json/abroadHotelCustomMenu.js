var vLine = {
	"_1": "美洲",
	"_2": "大洋洲",
	"_3": "歐洲",
	"_4": "亞非",
	"_5": "大陸港澳",
	"_6": "東北亞",
	"_7": "東南亞"
};
var vCountry = {
	"_1": {
		"_PCT_1": "熱門城市",
		"_PCTZ_1": "熱門區域"
	},
	"_2": {
		"_PCT_2": "熱門城市",
		"_PCTZ_2": "熱門區域"
	},
	"_3": {
		"_PCT_3": "熱門城市",
		"_PCTZ_3": "熱門區域"
	},
	"_4": {
		"_PCT_4": "熱門城市",
		"_PCTZ_4": "熱門區域"
	},
	"_5": {
		"_PCT_5": "熱門城市",
		"_PCTZ_5": "熱門區域"
	},
	"_6": {
		"_PCT_6": "熱門城市",
		"_PCTZ_6": "熱門區域"
	},
	"_7": {
		"_PCT_7": "熱門城市",
		"_PCTZ_7": "熱門區域"
	}
};
var vCity = {
	"_PCT_1": {
		"_NYC_US": "紐約-紐約州(NEW YORK NY) NYC-美國",
		"_LAX_US": "洛杉磯-加州(LOS ANGELES CA) LAX-美國",
		"_SFO_US": "舊金山-加州(SAN FRANCISCO CA) SFO-美國",
		"_LAS_US": "拉斯維加斯-內華達州(LAS VEGAS NV) LAS-美國",
		"_HNL_US": "壇香山-夏威夷州(HONOLULU) HNL-美國",
		"_GUM_US": "關島(GUAM) GUM-美國",
		"_YVR_CA": "溫哥華(VANCOUVER) YVR-加拿大",
		"_BOS_US": "波士頓-麻塞諸塞州(BOSTON MA) BOS-美國",
		"_SEA_US": "西雅圖-華盛頓州(SEATTLE TACOMA) SEA-美國",
		"_CHI_US": "芝加哥-伊利諾州(CHICAGO IL) CHI-美國",
		"_YYZ_CA": "多倫多(TORONTO) YYZ-加拿大",
		"_ORL_US": "奧蘭多-佛州(ORLANDO FL) ORL-美國",
		"_SAN_US": "聖地牙哥-加州(SAN DIEGO CA) SAN-美國",
		"_ANA_US": "安納漢-加州迪士尼(ANAHEIM CA) ANA-美國",
		"_SJC_US": "聖荷西-加州(SAN JOSE CA) SJC-美國",
		"_YLL_CA": "露易絲湖(LAKE LOUISE AB) YLL-加拿大",
		"_WAS_US": "華盛頓(WASHINGTON DC) WAS-美國",
		"_MIA_US": "邁阿密-佛州(MIAMI FL) MIA-美國",
		"_KOA_US": "KAILUA KONA-夏威夷州(KAILUA KONA HI) KOA-美國",
		"_YBA_CA": "班夫(BANFF) YBA-加拿大"
	},
	"_PCTZ_1": {
		"_SFO_US_01": "梅西百貨、聯合廣場-舊金山-加州(SAN FRANCISCO CA) SFO",
		"_NYC_US_01": "時代廣場、賓州車站周-紐約-紐約州(NEW YORK NY) NYC",
		"_GUM_US_01": "杜夢灣(Tumon)-關島(GUAM) GUM",
		"_YVR_CA_01": "市區-溫哥華(VANCOUVER) YVR",
		"_HNL_US_01": "檀香山市、威基基海灘-壇香山-夏威夷州(HONOLULU) HNL",
		"_LAX_US_06": "洛杉磯機場周圍-洛杉磯-加州(LOS ANGELES CA) LAX",
		"_NYC_US_10": "甘迺迪機場、牙買加區-紐約-紐約州(NEW YORK NY) NYC",
		"_NYC_US_14": "中央公園、大都會博物-紐約-紐約州(NEW YORK NY) NYC"
	},
	"_PCT_2": {
		"_SYD_AU": "雪梨(SYDNEY) SYD-澳洲",
		"_MEL_AU": "墨爾本(MELBOURNE) MEL-澳洲",
		"_BNE_AU": "布里斯班(BRISBANE) BNE-澳洲",
		"_ROR_PW": "科羅(KOROR) ROR-帛琉",
		"_AKL_NZ": "奧克蘭(AUCKLAND) AKL-紐西蘭",
		"_OOL_AU": "黃金海岸(GOLD COAST) OOL-澳洲",
		"_CNS_AU": "凱恩斯(CAIRNS) CNS-澳洲",
		"_ZQN_NZ": "皇后鎮(QUEENSTOWN) ZQN-紐西蘭",
		"_CHC_NZ": "基督城(CHRISTCHURCH) CHC-紐西蘭",
		"_PWL_PW": "帛琉() PWL-帛琉",
		"_PER_AU": "柏斯(PERTH) PER-澳洲",
		"_BMT_AU": "藍山(BLUE MOUNTAIN) BMT-澳洲",
		"_FIJ_FJ": "斐濟() FIJ-斐濟",
		"_ADL_AU": "阿德雷德(ADELAIDE) ADL-澳洲",
		"_GTN_NZ": "庫克山(MT.COOK) GTN-紐西蘭",
		"_TKP_NZ": "第卡波(TEKAPO) TKP-紐西蘭",
		"_TPO_NZ": "陶波湖(TAUPO) TPO-紐西蘭",
		"_DRW_AU": "達爾文(DARWIN) DRW-澳洲",
		"_BOB_PF": "BORA BORA-大溪地",
		"_ROT_NZ": "羅吐魯阿(ROTOROA) ROT-紐西蘭"
	},
	"_PCTZ_2": {
		"_SYD_AU_01": "市中心區-雪梨(SYDNEY) SYD-澳洲",
		"_MEL_AU_01": "市中心區-墨爾本(MELBOURNE) MEL-澳洲",
		"_SYD_AU_02": "達令港區-雪梨(SYDNEY) SYD-澳洲",
		"_BNE_AU_01": "市中心區-布里斯班(BRISBANE) BNE-澳洲",
		"_OOL_AU_01": "衝浪者天堂-黃金海岸(GOLD COAST) OOL-澳洲",
		"_ROR_PW_01": "帛琉-科羅(KOROR) ROR-帛琉",
		"_AKL_NZ_01": "市中心區-奧克蘭(AUCKLAND) AKL-紐西蘭",
		"_BNE_AU_02": "南布里斯本-布里斯班(BRISBANE) BNE-澳洲"
	},
	"_PCT_3": {
		"_LON_UK": "倫敦(LONDON) LON-英國",
		"_PAR_FR": "巴黎(PARIS) PAR-法國",
		"_MUC_DE": "慕尼黑-德國",
		"_AMS_NL": "阿姆斯特丹(AMSTERDAM) AMS-荷蘭",
		"_FRA_DE": "法蘭克福(FRANKFURT) FRA-德國",
		"_VIE_AT": "維也納(VIENNA) VIE-奧地利",
		"_PRG_CZ": "布拉格(PRAGUE) PRG-捷克",
		"_MIL_IT": "米蘭(MILAN) MIL-義大利",
		"_BER_DE": "柏林(BERLIN) BER-德國",
		"_ROM_IT": "羅馬(ROME) ROM-義大利",
		"_BCN_ES": "巴塞隆納(BARCELONA) BCN-西班牙",
		"_CGN_DE": "科隆(COLOGNE) CGN-德國",
		"_MAD_ES": "馬德里(MADRID) MAD-西班牙",
		"_STO_SE": "斯德哥爾摩(STOCKHOLM) STO-瑞典",
		"_VCE_IT": "威尼斯(VENICE) VCE-義大利",
		"_DUS_DE": "杜塞道夫(DUSSELDORF) DUS-德國",
		"_DRS_DE": "德勒斯登(DRESDEN) DRS-德國",
		"_SZG_AT": "薩爾斯堡(SALZBURG) SZG-奧地利",
		"_ATH_GR": "雅典(ATHENS) ATH-希臘",
		"_MOW_RU": "莫斯科(MOSCOW) MOW-俄羅斯"
	},
	"_PCTZ_3": {
		"_MUC_DE_06": "中央車站-慕尼黑(MUNICH) MUC-德國",
		"_PAR_FR_01": "1區◆羅浮宮、杜勒麗-巴黎(PARIS) PAR-法國",
		"_PAR_FR_10": "10區◆巴黎北站-巴黎(PARIS) PAR-法國",
		"_LON_UK_02": "帕丁頓-倫敦(LONDON) LON-英國",
		"_PRG_CZ_01": "1區◆舊城區-布拉格-捷克",
		"_PAR_FR_08": "8區◆香榭大道-巴黎(PARIS) PAR-法國",
		"_DRS_DE_04": "中央車站-德勒斯登(DRESDEN) DRS-德國",
		"_PAR_FR_09": "9區◆歌劇院區-巴黎(PARIS) PAR-法國"
	},
	"_PCT_4": {
		"_DXB_AE": "杜拜(DUBAI) DXB-阿拉伯聯合大公國",
		"_MDV_MV": "馬爾地夫() MDV-馬爾地夫",
		"_DEL_IN": "德里(DELHI) DEL-印度",
		"_IST_TR": "伊斯坦堡(ISTANBUL) IST-土耳其",
		"_BOM_IN": "孟買(MUMBAI(BOMBAY)) BOM-印度",
		"_MLE_MV": "馬列(MALE) MLE-馬爾地夫",
		"_AUH_AE": "阿布達比(ABU DHABI) AUH-阿拉伯聯合大公國",
		"_CMB_LK": "可倫坡(COLOMBO) CMB-斯里蘭卡",
		"_ETH_IL": "EILAT() ETH-以色列",
		"_BLR_IN": "BANGALORE() BLR-印度",
		"_MRU_MU": "模里西斯(MAURITIUS) MRU-模里西斯",
		"_KTM_NP": "加德滿都(KATHMANDU) KTM-尼泊爾",
		"_CAI_EG": "開羅(CAIRO) CAI-埃及",
		"_ANK_TR": "安卡拉(ANKARA) ANK-土耳其",
		"_CPT_ZA": "開普敦(CAPE TOWN) CPT-南非",
		"_NBO_KE": "奈洛比(NAIROBI) NBO-肯亞",
		"_KUS_TR": "庫薩達西(KUSADASI KUSADASI) KUS-土耳其",
		"_RAK_MA": "馬拉喀什(MARRAKECH) RAK-摩洛哥",
		"_JNB_ZA": "約翰尼斯堡(JOHANNESBURG) JNB-南非",
		"_JAI_IN": "捷普(JAIPUR) JAI-印度"
	},
	"_PCTZ_4": {
		"_MDV_MV_01": "馬列-馬爾地夫() MDV-馬爾地夫",
		"_DXB_AE_01": "市區-杜拜(DUBAI) DXB-阿拉伯聯合大公國",
		"_DEL_IN_01": "新城-德里(DELHI) DEL-印度",
		"_DXB_AE_02": "海灘區-杜拜(DUBAI) DXB-阿拉伯聯合大公國",
		"_MDV_MV_02": "北馬列環礁-馬爾地夫() MDV-馬爾地夫",
		"_DXB_AE_03": "柏迪拜-杜拜(DUBAI) DXB-阿拉伯聯合大公國",
		"_BLR_IN_01": "市中心-BANGALORE() BLR-印度",
		"_IST_TR_01": "老城區-伊斯坦堡(ISTANBUL) IST-土耳其"
	},
	"_PCT_5": {
		"_HKG_CN": "香港(HONG KONG) HKG-中國大陸",
		"_MFM_CN": "澳門(MACAU) MFM-中國大陸",
		"_SHA_CN": "上海(SHANGHAI) SHA-中國大陸",
		"_PEK_CN": "北京(BEIJING) PEK-中國大陸",
		"_ZUH_CN": "珠海-廣東省(ZHUHAI) ZUH-中國大陸",
		"_XMN_CN": "廈門-福建省(XIAMEN) XMN-中國大陸",
		"_HGH_CN": "杭州-浙江省(HANGZHOU) HGH-中國大陸",
		"_SZX_CN": "深圳-廣東省(SHENZHEN) SZX-中國大陸",
		"_CAN_CN": "廣州-廣東省(GUANGZHOU) CAN-中國大陸",
		"_SUZ_CN": "蘇州-江蘇省(SUZHOU) SUZ-中國大陸",
		"_SYX_CN": "三亞-海南省(SANYA) SYX-中國大陸",
		"_NKG_CN": "南京-江蘇省(NANJING) NKG-中國大陸",
		"_CTU_CN": "成都-四川省(CHENGDU) CTU-中國大陸",
		"_FOC_CN": "福州-福建省(FUZHOU) FOC-中國大陸",
		"_SIA_CN": "西安-陜西省(XIAN) SIA-中國大陸",
		"_TAO_CN": "青島-山東省(QINGDAO) TAO-中國大陸",
		"_WUH_CN": "武漢-湖北省(WUHAN) WUH-中國大陸",
		"_TSN_CN": "天津-河北省(TIANJIN) TSN-中國大陸",
		"_NGB_CN": "寧波-浙江省(NINGBO) NGB-中國大陸",
		"_KMG_CN": "昆明-雲南省(KUNMING) KMG-中國大陸"
	},
	"_PCTZ_5": {
		"_HKG_CN_18": "尖沙咀-香港(HONG KONG) HKG-中國大陸",
		"_MFM_CN_09": "路氹-澳門(MACAU) MFM-中國大陸",
		"_HKG_CN_05": "銅鑼灣-香港(HONG KONG) HKG-中國大陸",
		"_HKG_CN_02": "中環/金鐘-香港(HONG KONG) HKG-中國大陸",
		"_HKG_CN_17": "佐敦-香港(HONG KONG) HKG-中國大陸",
		"_HKG_CN_08": "西環/上環-香港(HONG KONG) HKG-中國大陸",
		"_HKG_CN_15": "旺角/太子-香港(HONG KONG) HKG-中國大陸",
		"_HKG_CN_04": "灣仔-香港(HONG KONG) HKG-中國大陸"
	},
	"_PCT_6": {
		"_TYO_JP": "東京(TOKYO) TYO-日本",
		"_OSA_JP": "大阪(OSAKA) OSA-日本",
		"_OKA_JP": "沖繩(OKINAWA) OKA-日本",
		"_SEL_KR": "首爾(SEOUL) SEL-韓國",
		"_KYO_JP": "京都(KYOTO) KYO-日本",
		"_FUK_JP": "福岡市-福岡縣(FUKUOKA) FUK-日本",
		"_SPK_JP": "札幌-北海道(SAPPORO) SPK-日本",
		"_NGO_JP": "名古屋-愛知縣(NAGOYA) NGO-日本",
		"_KAL_JP": "輕井澤-長野縣(KARUIZAWA) KAL-日本",
		"_HKD_JP": "函館-北海道(HAKODATE) HKD-日本",
		"_PUS_KR": "釜山(PUSAN) PUS-韓國",
		"_KOB_JP": "神戶市-兵庫縣(KOBE) KOB-日本",
		"_JHA_JP": "箱根-神奈川縣(HAKONE) JHA-日本",
		"_FUC_JP": "河口湖-山梨縣(KAWAGUCHIKO) FUC-日本",
		"_YOK_JP": "橫濱-神奈川縣(YOKOHAMA) YOK-日本",
		"_NOB_JP": "登別-北海道(NOBORIBETSU) NOB-日本",
		"_ICN_KR": "仁川(INCHEON) ICN-韓國",
		"_KZA_JP": "金澤市-石川縣(KANAZAWA) KZA-日本",
		"_TJH_JP": "洞爺湖-北海道(TOYAKO) TJH-日本",
		"_HIJ_JP": "廣島市-廣島縣(HIROSHIMA SHI) HIJ-日本"
	},
	"_PCTZ_6": {
		"_TYO_JP_04": "新宿-東京(TOKYO) TYO-日本",
		"_OSA_JP_08": "道頓堀、難波-大阪(OSAKA) OSA-日本",
		"_TYO_JP_24": "上野御徒町-東京(TOKYO) TYO-日本",
		"_TYO_JP_20": "東京-東京(TOKYO) TYO-日本",
		"_TYO_JP_10": "淺草-東京(TOKYO) TYO-日本",
		"_OKA_JP_01": "那霸地區-沖繩(OKINAWA) OKA-日本",
		"_OSA_JP_06": "心齋橋-大阪(OSAKA) OSA-日本",
		"_TYO_JP_05": "池袋-東京(TOKYO) TYO-日本"
	},
	"_PCT_7": {
		"_SIN_SG": "新加坡(SINGAPORE) SIN-新加坡",
		"_BKK_TH": "曼谷(BANGKOK) BKK-泰國",
		"_DPS_ID": "峇里島(BALI) DPS-印尼",
		"_HHQ_TH": "華欣(HUA-HIN) HHQ-泰國",
		"_KUL_MY": "吉隆坡(Kuala Lumpur) KUL-馬來西亞",
		"_PYX_TH": "芭達雅(PATTAYA) PYX-泰國",
		"_USM_TH": "蘇美島(KOH SAMUI) USM-泰國",
		"_BKI_MY": "沙巴(亞庇)(SABAH（KOTA KINABALU）) BKI-馬來西亞",
		"_SGN_VN": "胡志明市(HO CHI MINH) SGN-越南",
		"_MNL_PH": "馬尼拉(MANILA) MNL-菲律賓",
		"_CEB_PH": "宿霧(CEBU) CEB-菲律賓",
		"_BOR_PH": "長灘島(BORACAY) BOR-菲律賓",
		"_CNX_TH": "清邁(CHIANG MAI) CNX-泰國",
		"_HKT_TH": "普吉島(PHUKET) HKT-泰國",
		"_SEN_SG": "SENTOSA(聖陶沙) SEN-新加坡",
		"_HAN_VN": "河內(HANOI) HAN-越南",
		"_JKT_ID": "雅加達(JAKARTA) JKT-印尼",
		"_JHB_MY": "柔佛州(新山)(JOHOR BAHRU) JHB-馬來西亞",
		"_PEN_MY": "檳城(PENANG) PEN-馬來西亞",
		"_BOH_PH": "薄荷島(BOHOL) BOH-菲律賓"
	},
	"_PCTZ_7": {
		"_BKK_TH_11": "蘇坤逸區-曼谷(BANGKOK) BKK-泰國",
		"_SIN_SG_10": "濱海行政區-新加坡(SINGAPORE) SIN-新加坡",
		"_BKK_TH_03": "四面佛鬧區-曼谷(BANGKOK) BKK-泰國",
		"_SIN_SG_15": "烏節路地區-新加坡(SINGAPORE) SIN-新加坡",
		"_SIN_SG_12": "牛車水地區-新加坡(SINGAPORE) SIN-新加坡",
		"_SIN_SG_09": "聖陶沙地區-新加坡(SINGAPORE) SIN-新加坡",
		"_BKK_TH_10": "湄南河畔區-曼谷(BANGKOK) BKK-泰國",
		"_BKK_TH_14": "席隆區-曼谷(BANGKOK) BKK-泰國"
	}
};