const fulls = import.meta.glob('/assets/*.{jpg,png}', { eager: true, query: '?url', import: 'default' });
const portraits = import.meta.glob('/assets/covers/*.{jpg,png}', { eager: true, query: '?url', import: 'default' });
export const projects = [
  { image: '/assets/mossanee-hero-24.png', title: '茉山语', caseKey: 'mossanee', coverPath: '/assets/covers/mossanee-glass-01.jpg', glass: true, englishTitle: 'mossanee', exhibitType: '品牌创立', description: '品牌全案 / 策略 / 视觉 / 包装', field: '零食食品 · 品牌全案', statement: '用新鲜的零食传递爱', contextParagraphs: [
    '茉山语是一个从烘焙经营经验中发展出来的新品牌，其团队此前经营赣州本土品牌「芋贵圆」，积累了供应链资源与门店运营基础。面对新品牌认知不足、产品研发积累有限的现状，项目需要寻找一个既能发挥烘焙优势，又能回应多样化消费需求的方向。因此，品牌定位于“新鲜烘焙零食”，以烘焙为特色，结合坚果、果干、卤味及饮品等品类，将传统烘焙店的消费体验延展为多品类的零食选择。',
    '在这一定位下，如何让不同品类传达一致的品牌气质，成为视觉表达的出发点。「茉山语」的名字提供了三条线索：茉莉所代表的清新与纯净，山所连接的自然与食材，以及“语”所表达的真诚沟通与日常陪伴。由此，视觉方向以清新、自然为基础，通过明亮的色彩、简洁的形式与质朴的图形，回应品牌对新鲜的强调，并以轻松、直接的语言建立亲近感，让丰富的产品选择拥有统一的表达。'
  ], },
  { image: '/assets/ada-hero-00.png', caseKey: 'ada', coverPath: '/assets/covers/ada-glass.png', glass: true, title: 'ADA', englishTitle: 'ADA OVERLAND', exhibitType: '品牌创立', description: '品牌识别 / 户外生活 / 品牌体验', field: '户外生活 · 品牌识别', statement: 'Abode. Discover. Adventure.', contextParagraphs: [
    'ADA是一个户外用品品牌，拥有自有工厂、成熟的供应链与销售渠道。此次升级面对的主要问题，是不同版本的标识与应用缺乏统一标准，对外表达较为分散。设计以原有识别为基础，梳理标志、字体及组合方式，让已有的品牌积累形成清晰、稳定的视觉系统。',
    '标识保留ADA字母的几何骨架，通过统一笔画、转角与比例关系，强化硬朗、简洁的特征，并协调ADA与OVERLAND之间的阅读层级。方案分别探索横向字标与紧凑的框式组合，回应传播画面和装备表面不同的使用条件，让品牌在变化的载体中保持一致的识别。',
    '围绕“越专业才越野”的表达，视觉系统将产品细节与真实的户外场景连接起来，延展至车顶帐篷、遮阳篷、收纳装备、包装及传播物料。此次设计希望把品牌的制造与产品基础转化为有秩序的视觉表达，让ADA在户外环境中更容易被识别，也为后续应用建立可延续的规范。'
  ] },
  { image: '/assets/kapteyn-hero-00.png', caseKey: 'kapteyn', coverPath: '/assets/covers/kapteyn-glass.png', glass: true, title: '卡普坦', englishTitle: 'Kapteyn', exhibitType: '品牌创立', description: '品牌识别 / 科技产品 / 视觉系统', field: '智能产品 · 品牌识别', statement: 'Your health navigator.', contextParagraphs: [
    '卡普坦的项目始于一次高端厨电品牌的标志设计委托，名称由客户事先确定。围绕健康食谱与智能控火等产品信息，品牌表达逐步延伸到家庭日常饮食：从选择吃什么，到理解烹饪步骤与掌握火候，“你的健康领航员”概括了卡普坦希望提供的帮助，也让技术功能与一日三餐建立了更具体的联系。',
    '视觉识别以想象中的外星字符为切入点，将 KAPTEYN 的字母转化为具有符号感的字形。弧线、直线与斜切结构在字母之间反复出现，形成连贯的视觉节奏；中文标志延续这一构成特征，同时保留必要的可读性。陌生的字符形态与清晰的品牌名称共同出现，为卡普坦建立鲜明的辨识度，并呼应名字所带来的星际探索联想。',
    '字标中的字符进一步被提取、旋转与组合，延展为包装及其他物料中的图形语言。“领航员”则将探索的想象连接回厨房生活：开阔的星球场景承接品牌气质，食材、烹饪人物与功能信息说明日常用途。两者共同构成卡普坦的表达，让科技的想象力与家庭生活中的实用关怀相互呼应。'
  ] },
  { image: '/assets/jinxiuxiang-hero-00.png', caseKey: 'jinxiuxiang', coverPath: '/assets/covers/jinxiuxiang-glass.png', glass: true, title: '真秀香', englishTitle: 'GINSOHYANG', exhibitType: '品牌创立', description: '品牌全案 / 餐饮 / 文化识别', field: '餐饮 · 品牌全案', statement: '飞越 3618 公里，把好吃的从延边带到深圳。', contextParagraphs: [
    '真秀香是一个以延边朝鲜族风味为特色的餐饮品牌，创始人与核心团队来自延吉，并拥有当地餐厅的经营经验。此次项目面向深圳的新店展开：在周边自然客流有限的条件下，品牌需要建立更鲜明的吸引力。策略因此将延边风味与 Bistro 的餐酒体验结合，通过多品类、多时段的经营规划，回应从日常用餐到休闲小聚的不同需求。',
    '如何让地域文化成为一个当代餐饮品牌的识别，而不止于传统符号的装饰，是视觉设计的核心问题。方案从品牌名称中的“秀”出发，以朝鲜族长鼓舞为主要线索，将舞者舒展的姿态、服饰轮廓与鼓的形态提炼为人物标识。流动的衣袖与裙摆保留了舞蹈的节奏，也让品牌拥有一个鲜明、富有动感的视觉中心。',
    '围绕这一人物形象，字体保持相对简洁，将识别重点留给图形；舞蹈动作与民俗元素进一步延展为辅助图形和重复纹样，应用于菜单、包装、服装与传播物料。设计希望将延边文化的特色与轻松的餐酒氛围连接起来，让真秀香既有明确的地域来处，也呈现出适合都市日常相聚的当代表情。'
  ] },
  { image: '/assets/linjilinli-hero-00.png', caseKey: 'linjilinli', coverPath: '/assets/covers/linjilinli-glass.png', glass: true, title: '林记邻里', englishTitle: 'LINJILINLI', exhibitType: '品牌升级', description: '品牌全案 / 餐饮 / 在地叙事', field: '餐饮 · 品牌全案', statement: '林记六大拿手菜，街坊来代言。', contextParagraphs: [
    '林记是一家扎根长沙社区的家菜馆，项目开展时已有十三年的经营历史，以地道的长沙口味菜为主，兼做烧烤夜宵。随着周边餐饮品牌增多，反复的价格竞争逐渐削弱了老店的优势。此次品牌升级的核心，是重新梳理林记多年积累的价值，让熟悉的家常味道与街坊信任，成为顾客选择它的明确理由。',
    '“邻里”由此成为品牌的中心。地道的长沙菜构成邻里味，多年的社区经营积累邻里情，夜宵街的消费场景则为大排档的定位提供了依据。策略将林记从家菜馆重新定位为“街坊邻里的三餐四季大排档”，以中晚餐与夜宵为重点，把产品特色和社区关系连接成清晰的品牌表达。',
    '视觉方向延续大排档的热闹与烟火气，语言则从街坊之间熟悉、通俗的交流中寻找亲近感。“老口子长沙菜，邻里的心头爱”将口味与情感联系起来，“远亲不如近林”借用日常俗语，把品牌名称融入邻里关系。设计希望保留老店原有的人情味，让林记多年形成的熟悉感，在新的品牌表达中更容易被看见和记住。'
  ] },
  { image: '/assets/baozhuangyuan-hero-00.png', caseKey: 'baozhuangyuan', coverPath: '/assets/covers/baozhuangyuan-glass.png', glass: true, title: '鲍状元', englishTitle: 'BAOZHAUNGYUAN', exhibitType: '品牌升级', field: '餐饮', description: '品牌升级 / 餐饮 / 粤式啫啫小馆', role: 'Brand direction / Visual design', statement: '粤式啫啫小馆', contextParagraphs: [
    '鲍状元是美颐美在原有连锁餐饮基础上探索的小正餐品牌。项目开展时，美颐美已有十一年的经营积累，顾客对其鲍汁排骨饭、广式口味与产品品质形成了认知，但原有形象与品类表达已难以支持新的经营方向。此次升级围绕从快餐向小正餐的转变展开，以啫啫煲建立产品特色，同时保留鲍汁排骨饭的认知基础，兼顾一人用餐与多人小聚。',
    '设计从“鲍状元”的名字中寻找产品与文化的连接：“鲍”对应鲍鱼、鲍汁的风味记忆，“状元”则承载对品质的追求，以及金榜题名的喜庆寓意。视觉提案沿着两条路径展开：一条结合粤剧脸谱与状元帽，重新塑造原有人物标识；另一条从传统登科题材绘画中提取骑马人物，将手托砂锅的动作融入其中，让状元形象与啫啫煲产生直接联系。',
    '两套方案都将人物识别延伸到字体、辅助图形与应用物料中。字体借鉴榜书的厚重感，配合牌匾式构图、吉祥纹样与喜庆氛围，把“状元”的文化联想转化为可持续使用的视觉语言。设计希望让顾客在识别品牌的同时，也能感受到广式餐饮的热闹与亲近，为新的小正餐定位建立鲜明的形象。'
  ] },
  { image: '/assets/5200-hero-00.png', coverPath: '/assets/covers/5200-glass.png', glass: true, title: '悦喜5200', caseKey: '5200', englishTitle: 'MY LOVE MY CHOOICE', englishLines: ['MY LOVE', 'MY CHOOICE'], exhibitType: '品牌升级', description: '品牌全案 / 空间 / 导视 / 体验', field: '商业空间 · 品牌全案', statement: '我爱，我选择。', contextParagraphs: [
    '5200是一个位于长沙的婚礼宴会空间项目，依托造梦师原有的场地与团队基础展开。面对品牌认知不足与同类竞争，项目需要将空间规模、主题厅堂和一站式服务整合为清晰的品牌表达。策略以“用自己喜欢的方式定义爱情”为主张，将5200定位为年轻人表达自我、举办婚礼与相聚庆祝的场所，让宴会空间与个人的情感选择建立联系。',
    '视觉概念从“5200”的名字出发，借用“520”与“我爱你”的谐音联想，将数字逐步提炼为相连的双环。两个环既保留了数字的形态，也让人联想到两个人之间持续的连接；外侧的括号则被赋予“集合”的含义，容纳彼此的生活、经历与未来。爱情由此被表达为两个独立人生的相遇，以及共同生活不断展开的过程。',
    '围绕这一概念，品牌表达以时尚与艺术感为方向，与不同主题的婚礼场景形成呼应。“非凡体验，触手可及”将空间、婚礼、餐饮与服务连接起来，希望让新人从接触品牌到参与仪式，都能感受到一致的体验，也为5200建立区别于单一宴会场地的品牌认知。'
  ] },
  { image: '/assets/wink-hero-00.png', caseKey: 'wink', coverPath: '/assets/covers/wink-glass.png', glass: true, title: 'WINK顽客', englishTitle: 'Wink', exhibitType: '品牌创立', description: '品牌全案 / 文化场景 / 活动传播', field: '酒饮文化 · 品牌全案', statement: 'Keep Wink, Music & Drink.', contextParagraphs: [
    'WINK顽客是一个音乐酒馆项目，规划于长沙黄花国际机场附近的购物广场，与宴请、宵夜等业态形成配套。品牌的出发点，是为往来旅客与周边消费者提供一个听歌、用餐、喝酒和交流的场所。比起先定义酒馆的风格，项目更关注来到这里的人：他们愿意探索，也重视个人品味，希望在忙碌之外找到放松与相聚的空间。',
    '“世界公民，超级顽家”由此成为品牌的态度表达。“顽”被理解为保持好奇、幽默与个性，“客”则连接来自不同地方、拥有不同经历的人。“会产生化学反应的音乐酒馆”将这种相遇转化为品牌概念，而“听歌喝酒去顽客”用直接的语言说明消费场景，让品牌态度与到店理由形成联系。',
    '视觉方向围绕音乐、自由与玩趣展开，将潮流与科幻的联想带入品牌表达。语言系统以“KEEP WINK”为线索，延展出“保持幽默”“保持发现”“保持特立独行”等短句，并规划进入杯垫、台卡、墙面与霓虹屏等接触点。项目希望让这些日常可见的表达成为交流的开端，使顽客的个性贯穿于空间体验之中。'
  ] },
  { image: '/assets/juvta-hero-00.png', caseKey: 'juvta', coverPath: '/assets/covers/juvta-glass.png', glass: true, title: '莜嗒', englishTitle: 'JUVTA', exhibitType: '品牌创立', description: '品牌识别 / 美容科技 / 艺术指导', field: '美妆科技 · 品牌识别', statement: 'Beauty up to her.', contextParagraphs: [
    '莜嗒是一个面向家用护理场景的手持超声波美容仪项目。设计围绕关注外观、操作体验与产品专业感的女性用户展开，希望让技术型产品以更轻盈、亲近的面貌进入日常生活。项目的重点，是在简洁的使用表达与精致的品牌形象之间建立一致性。',
    '视觉以“内敛、信赖、轻盈”为方向。中英文标识通过纤细笔画与舒展的字形建立辨识，在简洁中保留细节变化；柔和的浅色背景与深色文字形成清晰的阅读关系，让产品信息成为画面的重点。整体表达保持克制，使品牌既呈现美容护理的细腻感，也回应技术产品所需要的专业印象。',
    '产品方向则围绕简明的按键、轻巧的手持形态与稳定的外观展开，以流畅曲线为主体，通过局部细节增加精致感。品牌与产品共同围绕同一个目标：让家用美容仪更容易被理解，并以轻盈、有秩序的设计融入日常护理场景。'
  ] },
  { image: '/assets/joys-hero-00.png', caseKey: 'joys', coverPath: '/assets/covers/joys-glass.png', glass: true, title: '冰·JOYS', englishTitle: 'DRINK JOYS', exhibitType: '品牌活动', field: '创意项目', description: '活动视觉 / 酒饮 / 艺术节场景', role: 'Graphic design', statement: '灵感候场，不如冰 JOYS', contextParagraphs: [
    '冰 JOYS 是围绕国窖1573与2026阿那亚戏剧节候鸟300展开的活动项目。方案以冰饮为载体，探索白酒在海边休闲与轻社交中的表达。延续此前“灵感补给”的主题，本次以“灵感候场，不如冰 JOYS”为线索，将活动构想为一个开放的即兴片场，让参与者通过交流、创作与记录，共同形成现场内容。',
    '视觉以蓝黄对比、旋涡式背景与富有动作感的人物图形构成主要识别，连接海边的清凉感与即兴创作的活力。场记板、胶片边框等元素进一步强化“片场”的联想，并延展至活动指引、酒单、杯贴、特调酒卡与互动任务卡，使不同用途的物料拥有一致的视觉关系。',
    '设计同时关注物料如何支持参与：人生台词墙提供表达的入口，相机记录现场瞬间，酒卡与创作卡则将饮品体验连接到个人故事。项目希望让品牌形象贯穿于点单、互动和分享之中，使“人人都是主角”的概念成为可以参与的体验。'
  ] }
].map((project, index) => ({
  ...project,
  image: fulls[project.image] || portraits[project.image],
  cover: portraits[project.coverPath || project.image.replace('/assets/', '/assets/covers/')] || fulls[project.image],
  index: index + 1
}));














