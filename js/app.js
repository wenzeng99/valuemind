// ========== ValueMind — Main App ==========
import { translations, setLang, t, getLang } from './i18n.js';
import { generateCandleData, renderCandlestickChart } from './chart.js';

// ========== State ==========
let marketData = null;
let cryptoData = null;
let newsData = null;
let fearGreedData = null;
let metaData = null;
let stockDetailsData = null;
let currentMaster = { signal: 'duan', deep: 'duan' };
let currentDeepTab = 'overview';

// ========== Stock Analysis Data (keyed by symbol) ==========
const stockAnalysis = {
  NVDA: {
    exchange: 'NASDAQ',
    revGrowth: '+78%', epsEst: '$0.89 vs est $0.84', grossMargin: '73.0%', dataCenterRev: '$35.1B (+93%)',
    peFwd: '24.8x', peg: '0.60', evEbitda: '28.5x', ps: '28.2x',
    netMargin: '55.8%', roe: '115%', fcfYield: '1.8%', divYield: '0.02%',
    valuationPctl: 75,
    summary: {
      zh: 'NVDA是AI基础设施的绝对龙头。Q4营收$39.3B（+78% YoY）大超预期，Blackwell加速出货。PEG 0.6说明增长正在消化高估值。但75分位估值意味着安全边际较薄。',
      en: 'NVDA is the dominant AI infrastructure play. Q4 revenue $39.3B (+78% YoY) crushed estimates, Blackwell ramping ahead of schedule. PEG 0.6 suggests growth digesting premium. At 75th pctl valuation, margin of safety is thin.',
    },
    verdict: { zh: '观望 — 等待$120-130入场', en: 'WATCH — Wait for $120-130 entry' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: 'AI算力=结构性需求。如同淘金热中的铲子。' },
        { status: 'uncertain', q: '赚得更多？ — 不确定', a: '50%+ YoY增速不可持续，将回归15-20%。关键风险：竞争。' },
        { status: 'positive', q: '护城河？ — 强（3-5年）', a: 'CUDA生态是护城河。关注自研芯片（Google/Amazon/Meta）。' },
      ],
      en: [
        { status: 'positive', q: 'Profitable in 10yr? — Yes', a: 'AI compute = structural demand. Like shovels in a Gold Rush.' },
        { status: 'uncertain', q: 'Earning more? — Uncertain', a: '50%+ YoY unsustainable. Growth normalizes to 15-20%. Key risk: competition.' },
        { status: 'positive', q: 'Moat? — Strong (3-5yr)', a: 'CUDA ecosystem is the moat. Watch in-house chips (Google, Amazon, Meta).' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '等$120-130', q: 'NVDA=卖铲子。CUDA=护城河。+1110%加仓。但需要安全边际。' },
        { name: 'Buffett', color: 'yellow', verdict: '能力圈外', q: '好公司，但我不懂芯片迭代。$373B现金就是我的态度。' },
        { name: 'Munger', color: 'green', verdict: '合理价可买', q: 'NVDA之于AI=微软之于PC。PEG 0.6。但反转思维：什么让NVDA失败？' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Wait $120-130', q: 'NVDA = selling shovels. CUDA = moat. +1,110% position. But need margin of safety.' },
        { name: 'Buffett', color: 'yellow', verdict: 'Outside circle', q: 'Great company, but I don\'t understand chip iteration. $373B cash is patient.' },
        { name: 'Munger', color: 'green', verdict: 'Fair price OK', q: 'NVDA in AI = Microsoft in PCs. PEG 0.6 = growth digesting valuation. Control size.' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q4',
      reportDate: '2025-02-26',
      zh: {
        revenue: { val: '$39.3B', yoy: '+78%', beat: '超预期$1.8B', note: '数据中心收入$35.1B占89%，Blackwell加速出货' },
        eps: { val: '$0.89', yoy: '+71%', beat: '超预期$0.05', note: 'GAAP EPS连续6季度超预期' },
        fcf: { val: '$16.8B', margin: '42.7%', trend: '↑', note: '自由现金流创历史新高，同比+82%' },
        grossMargin: { val: '73.0%', trend: '↓', note: '环比下降3.0pp，因Blackwell初期良率较低，管理层指引恢复至75%' },
        guidance: '下季指引营收$43B（+65% YoY），高于共识$41.8B',
        highlight: '核心看点：AI推理需求爆发，Blackwell架构供不应求，客户包括所有主要云厂商',
        risk: '风险信号：毛利率环比下降、资本开支激增可能压缩行业回报、中国禁令影响约$5B收入',
      },
      en: {
        revenue: { val: '$39.3B', yoy: '+78%', beat: 'Beat by $1.8B', note: 'Data Center $35.1B = 89% of total, Blackwell ramping fast' },
        eps: { val: '$0.89', yoy: '+71%', beat: 'Beat by $0.05', note: 'GAAP EPS beat for 6 consecutive quarters' },
        fcf: { val: '$16.8B', margin: '42.7%', trend: '↑', note: 'Free cash flow at all-time high, +82% YoY' },
        grossMargin: { val: '73.0%', trend: '↓', note: 'Down 3.0pp QoQ due to Blackwell early yield; mgmt guides recovery to 75%' },
        guidance: 'Next Q revenue guide $43B (+65% YoY), above consensus $41.8B',
        highlight: 'Key thesis: AI inference demand exploding, Blackwell supply-constrained, all major cloud customers',
        risk: 'Risk signals: GM declining QoQ, capex surge may compress industry returns, China ban impacts ~$5B rev',
      }
    },
    financialHealth: {
      zh: {
        cashPosition: '$43.2B现金 vs $9.7B长期债务 = 净现金$33.5B',
        debtToEquity: '0.17x — 极低杠杆',
        currentRatio: '4.17x — 流动性极强',
        capex: '$3.2B/季 — 资本开支占营收仅8%，轻资产模式',
        buyback: '回购$12.4B/年，股息仅$0.04/股（象征性）',
        summary: '资产负债表极其健康。净现金$33.5B提供强大安全垫。Fabless模式=低资本开支+高FCF转换。唯一注意：AI投资周期可能改变资本结构。'
      },
      en: {
        cashPosition: '$43.2B cash vs $9.7B LT debt = $33.5B net cash',
        debtToEquity: '0.17x — Very low leverage',
        currentRatio: '4.17x — Extremely liquid',
        capex: '$3.2B/Q — Capex only 8% of revenue, asset-light model',
        buyback: '$12.4B/yr buyback, dividend only $0.04/share (token)',
        summary: 'Extremely healthy balance sheet. $33.5B net cash = massive safety cushion. Fabless model = low capex + high FCF conversion. Only caveat: AI investment cycle may change capital structure.'
      }
    },
    moat: {
      duan: {
        zh: { score: '强（3-5年）', analysis: 'NVDA=卖铲子的生意模型。CUDA生态锁定开发者（300万+），形成网络效应。但护城河是"暂时性"的：Google TPU、AMD MI300X、自研芯片都在追赶。关键判断：CUDA的生态粘性能否像Windows一样持续？我的观点：至少3-5年内无可替代，但10年不确定。', moatType: '技术生态+网络效应+转换成本', risk: '自研芯片趋势是最大威胁。如果Google/Amazon的芯片性价比追上80%，CUDA的锁定力将减弱。' },
        en: { score: 'Strong (3-5yr)', analysis: 'NVDA = shovel business model. CUDA ecosystem locks in 3M+ developers via network effects. But moat is "temporary": Google TPU, AMD MI300X, custom chips all closing the gap. Key question: Can CUDA stickiness persist like Windows? My view: irreplaceable for 3-5 years, uncertain beyond 10.', moatType: 'Tech ecosystem + network effects + switching costs', risk: 'Custom chip trend is biggest threat. If Google/Amazon chips reach 80% perf/dollar, CUDA lock-in weakens.' }
      },
      buffett: {
        zh: { score: '能力圈外', analysis: '好公司，但芯片迭代速度太快，超出我的能力圈。我需要理解一个公司10-20年后的确定性——NVDA的技术领先在半导体行业可能很短暂。$373B现金=我对科技估值的态度。', moatType: '暂无法判断', risk: '技术颠覆风险高于我的舒适区。' },
        en: { score: 'Outside circle', analysis: 'Great company, but chip iteration too fast for my circle. I need 10-20yr certainty — NVDA\'s tech lead may be fleeting in semiconductors. $373B cash = my view on tech valuations.', moatType: 'Cannot assess', risk: 'Technology disruption risk exceeds my comfort zone.' }
      },
      munger: {
        zh: { score: '强，但需监控', analysis: 'NVDA之于AI=微软之于PC。这是平台级垄断的早期阶段。反转思维：什么能杀死NVDA？1）通用AI芯片商品化 2）量子计算突破 3）AI寒冬。概率？5年内<15%。PEG 0.6在好公司里是合理价格。但不要贪心——控制仓位。', moatType: '平台垄断+生态壁垒', risk: '用反转法评估：AI泡沫破裂概率10%，自研芯片替代概率20%，两者共振=5%概率的灾难场景。' },
        en: { score: 'Strong, monitor', analysis: 'NVDA in AI = Microsoft in PCs. Early-stage platform monopoly. Invert: what kills NVDA? 1) AI chip commoditization 2) Quantum computing 3) AI winter. Probability? <15% in 5 years. PEG 0.6 is fair for a great company. But don\'t be greedy — size the position.', moatType: 'Platform monopoly + ecosystem barrier', risk: 'Inversion: AI bubble burst 10%, custom chips replace 20%, combined = 5% disaster scenario.' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$145-165', method: 'DCF（10yr, 20% terminal growth, 10% WACC）', note: '假设增速从78%逐年回归至20%，终端增速15%' },
        peerComp: { value: '$160-190', method: '同行对比（AMD 55x, AVGO 35x, QCOM 18x fwd PE）', note: 'NVDA享受溢价因增速最快，但溢价幅度可能收窄' },
        grahamMargin: '当前$183 vs DCF中值$155 = 溢价18%，安全边际不足',
        verdict: '合理估值区间$145-175。当前价格反映了乐观预期，需要持续超预期交付才能维持。'
      },
      en: {
        dcf: { value: '$145-165', method: 'DCF (10yr, 20% terminal growth, 10% WACC)', note: 'Growth declining from 78% to 20%, terminal 15%' },
        peerComp: { value: '$160-190', method: 'Peer comp (AMD 55x, AVGO 35x, QCOM 18x fwd PE)', note: 'NVDA premium for fastest growth, but premium may narrow' },
        grahamMargin: 'Current $183 vs DCF midpoint $155 = 18% premium, insufficient margin of safety',
        verdict: 'Fair value range $145-175. Current price bakes in optimistic scenario, needs continuous beats to sustain.'
      }
    },
  },
  AAPL: {
    exchange: 'NASDAQ',
    revGrowth: '+4%', epsEst: '$2.40 vs est $2.35', grossMargin: '46.2%', dataCenterRev: 'Services $23.1B (+14%)',
    peFwd: '30.5x', peg: '2.80', evEbitda: '26.1x', ps: '8.9x',
    netMargin: '25.3%', roe: '160%', fcfYield: '3.2%', divYield: '0.44%',
    valuationPctl: 82,
    summary: {
      zh: 'Apple的服务业务持续增长，但iPhone增速放缓。品牌护城河极强但估值偏高（PEG 2.8）。AI功能落后竞争对手，需关注iPhone 17周期。',
      en: 'Apple Services growing steadily but iPhone growth slowing. Brand moat is exceptional but valuation stretched (PEG 2.8). AI features lagging competitors, watch iPhone 17 cycle.',
    },
    verdict: { zh: '持有 — 不追高，回调到$220考虑', en: 'HOLD — Don\'t chase, consider at $220 pullback' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '生态系统粘性极强，20亿+活跃设备。' },
        { status: 'positive', q: '赚得更多？ — 大概率', a: '服务收入占比持续提升，毛利率更高。' },
        { status: 'positive', q: '护城河？ — 极强', a: '品牌+生态+转换成本，几乎不可复制。' },
      ],
      en: [
        { status: 'positive', q: 'Profitable in 10yr? — Yes', a: 'Ecosystem stickiness is extreme, 2B+ active devices.' },
        { status: 'positive', q: 'Earning more? — Likely', a: 'Services revenue share rising, higher margins.' },
        { status: 'positive', q: 'Moat? — Very Strong', a: 'Brand + ecosystem + switching costs, nearly irreplicable.' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '持有不追', q: '好公司但太贵。等大幅回调。' },
        { name: 'Buffett', color: 'green', verdict: '核心持仓', q: '消费者特许权的巅峰。我能理解的最好的生意之一。' },
        { name: 'Munger', color: 'yellow', verdict: '好但贵', q: '伟大企业，但当前价格透支了未来几年增长。' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'Hold, don\'t chase', q: 'Great company but too expensive. Wait for deep pullback.' },
        { name: 'Buffett', color: 'green', verdict: 'Core holding', q: 'Peak consumer franchise. One of the best businesses I understand.' },
        { name: 'Munger', color: 'yellow', verdict: 'Great but pricey', q: 'Wonderful business, but current price discounts years of growth.' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q1',
      reportDate: '2025-01-30',
      zh: {
        revenue: { val: '$124.3B', yoy: '+4%', beat: '超预期$1.2B', note: 'iPhone $69.1B (+2%)，服务$26.3B (+14%)创新高' },
        eps: { val: '$2.40', yoy: '+10%', beat: '超预期$0.05', note: '回购缩股+服务占比提升驱动EPS增长快于营收' },
        fcf: { val: '$36.0B', margin: '29.0%', trend: '→', note: 'FCF稳健但增速放缓至+3%，大部分用于回购' },
        grossMargin: { val: '46.9%', trend: '↑', note: '创公司历史新高，服务业务毛利率>70%拉升整体' },
        guidance: '未给数字指引，暗示下季营收低个位数增长',
        highlight: '核心看点：服务业务是真正的利润引擎（毛利率>70%），iPhone安装基超20亿形成超级粘性',
        risk: '风险信号：iPhone增速仅+2%、中国市场份额下降、AI功能落后于三星/Google',
      },
      en: {
        revenue: { val: '$124.3B', yoy: '+4%', beat: 'Beat by $1.2B', note: 'iPhone $69.1B (+2%), Services $26.3B (+14%) record' },
        eps: { val: '$2.40', yoy: '+10%', beat: 'Beat by $0.05', note: 'Buybacks + Services mix shift drives EPS growth > revenue growth' },
        fcf: { val: '$36.0B', margin: '29.0%', trend: '→', note: 'Stable FCF but growth slowing to +3%, mostly returned via buybacks' },
        grossMargin: { val: '46.9%', trend: '↑', note: 'All-time high, Services margin >70% lifting blended rate' },
        guidance: 'No specific guidance, implied low-single-digit revenue growth next Q',
        highlight: 'Key thesis: Services is the real profit engine (>70% margin), 2B+ iPhone installed base = extreme stickiness',
        risk: 'Risk signals: iPhone growth only +2%, China share declining, AI features behind Samsung/Google',
      }
    },
    financialHealth: {
      zh: {
        cashPosition: '$65B现金+有价证券 vs $97B总债务 = 净债务$32B',
        debtToEquity: '净负债/权益比偏高，但经营现金流强劲支撑',
        currentRatio: '0.87x — 偏低但正常（高效营运资本管理）',
        capex: '$2.9B/季 — 资本开支占营收<3%，极致轻资产',
        buyback: '年回购$90B+股息$15B，是全球最大股东回报计划',
        summary: '账面看"净负债"，但Apple的$110B/年经营现金流远超债务偿还需求。这是典型的"借便宜钱回购+避税"策略。真实财务风险近乎为零。'
      },
      en: {
        cashPosition: '$65B cash+securities vs $97B total debt = $32B net debt',
        debtToEquity: 'Net debt/equity elevated, but strong operating cash flow support',
        currentRatio: '0.87x — Low but normal (efficient working capital mgmt)',
        capex: '$2.9B/Q — Capex <3% of revenue, ultra asset-light',
        buyback: '$90B/yr buyback + $15B dividend, largest shareholder return globally',
        summary: 'Looks "net debt" on paper, but Apple $110B/yr operating cash flow far exceeds debt service. Classic "borrow cheap to buy back + tax optimize" strategy. Real financial risk is near zero.'
      }
    },
    moat: {
      duan: {
        zh: { score: '极强', analysis: '品牌+生态系统是消费科技领域最强的护城河。20亿+活跃设备形成超级粘性。服务业务毛利率>70%，是真正的利润引擎。但增长天花板是核心担忧——iPhone渗透率已高，AI功能落后竞争对手。', moatType: '品牌+生态系统+转换成本', risk: '增长天花板明显。iPhone增速放缓至+2%，中国市场份额下降，AI布局滞后。估值需要增长故事支撑。' },
        en: { score: 'Very Strong', analysis: 'Brand + ecosystem is the strongest moat in consumer tech. 2B+ active devices = extreme stickiness. Services margin >70% is the real profit engine. But growth ceiling is the core concern — iPhone penetration already high, AI features lagging competitors.', moatType: 'Brand + ecosystem + switching costs', risk: 'Growth ceiling is clear. iPhone growth slowing to +2%, China share declining, AI strategy lagging. Valuation needs growth narrative.' }
      },
      buffett: {
        zh: { score: '核心持仓', analysis: '消费者特许权的巅峰。我深刻理解这个生意——20亿人每天使用的产品，转换成本极高。服务收入持续增长=经常性现金流。这是我能理解的最好的生意之一。', moatType: '消费者特许权+品牌忠诚度', risk: '估值不便宜，但好公司值得合理溢价。最大风险是中国地缘政治和监管。' },
        en: { score: 'Core holding', analysis: 'Peak consumer franchise. I deeply understand this business — 2B people use it daily, switching costs are extreme. Services revenue growth = recurring cash flow. One of the best businesses I can understand.', moatType: 'Consumer franchise + brand loyalty', risk: 'Not cheap, but great businesses deserve a fair premium. Biggest risk is China geopolitics and regulation.' }
      },
      munger: {
        zh: { score: '伟大企业，关注估值', analysis: '伟大的企业，但当前价格透支了未来几年增长。反转思维：Apple唯一死法是什么？失去生态粘性。概率？极低。但在PEG 2.8买入=你在为完美定价付费。耐心等回调。', moatType: '品牌垄断+生态锁定', risk: '估值风险>业务风险。PEG 2.8意味着你需要完美执行才能获得合理回报。任何失误都会导致估值收缩。' },
        en: { score: 'Great, watch valuation', analysis: 'Wonderful business, but current price discounts years of future growth. Invert: how does Apple die? Lose ecosystem stickiness. Probability? Very low. But buying at PEG 2.8 = paying for perfection. Be patient for a pullback.', moatType: 'Brand monopoly + ecosystem lock-in', risk: 'Valuation risk > business risk. PEG 2.8 means you need perfect execution for adequate returns. Any stumble triggers multiple compression.' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$200-230', method: 'DCF（10yr, 8% terminal growth, 9% WACC）', note: '假设营收增速从4%逐步提升至7%（AI/服务驱动），终端增速5%' },
        peerComp: { value: '$210-250', method: '同行对比（MSFT 30x, GOOGL 22x, Samsung 12x fwd PE）', note: 'Apple享受品牌溢价，但增速最低' },
        grahamMargin: '当前$242 vs DCF中值$215 = 溢价13%，安全边际偏薄',
        verdict: '合理估值区间$200-235。当前价格需要服务业务持续高增长+AI功能追赶才能支撑。'
      },
      en: {
        dcf: { value: '$200-230', method: 'DCF (10yr, 8% terminal growth, 9% WACC)', note: 'Revenue growth assumed 4% rising to 7% (AI/Services driven), terminal 5%' },
        peerComp: { value: '$210-250', method: 'Peer comp (MSFT 30x, GOOGL 22x, Samsung 12x fwd PE)', note: 'Apple commands brand premium, but has lowest growth' },
        grahamMargin: 'Current $242 vs DCF midpoint $215 = 13% premium, thin margin of safety',
        verdict: 'Fair value range $200-235. Current price requires sustained Services growth + AI catch-up to justify.'
      }
    },
  },
  MSFT: {
    exchange: 'NASDAQ',
    revGrowth: '+12%', epsEst: '$3.23 vs est $3.11', grossMargin: '69.4%', dataCenterRev: 'Azure +29%',
    peFwd: '29.8x', peg: '2.10', evEbitda: '24.5x', ps: '12.8x',
    netMargin: '35.6%', roe: '38%', fcfYield: '2.8%', divYield: '0.72%',
    valuationPctl: 70,
    summary: {
      zh: 'Azure云增长29%稳健，Copilot AI推动Office生态升级。估值合理但非便宜（PEG 2.1）。企业级护城河极深。',
      en: 'Azure cloud growth 29% is solid, Copilot AI driving Office ecosystem upgrades. Fair but not cheap valuation (PEG 2.1). Enterprise moat is very deep.',
    },
    verdict: { zh: '可持有 — 回调到$360考虑加仓', en: 'HOLD — Consider adding at $360 pullback' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '企业IT基础设施不可或缺，云+AI双引擎。' },
        { status: 'positive', q: '赚得更多？ — 是', a: 'AI Copilot提价空间大，Azure份额持续增长。' },
        { status: 'positive', q: '护城河？ — 极强', a: 'Office+Azure+GitHub+LinkedIn，生态壁垒极高。' },
      ],
      en: [
        { status: 'positive', q: 'Profitable in 10yr? — Yes', a: 'Enterprise IT infrastructure is essential, cloud + AI dual engines.' },
        { status: 'positive', q: 'Earning more? — Yes', a: 'AI Copilot has pricing power, Azure share keeps growing.' },
        { status: 'positive', q: 'Moat? — Very Strong', a: 'Office + Azure + GitHub + LinkedIn, ecosystem barrier is immense.' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '持有', q: '企业级护城河。理解商业模式，可长持。' },
        { name: 'Buffett', color: 'green', verdict: '能力圈内', q: '盈利能力强，分红增长稳定。' },
        { name: 'Munger', color: 'green', verdict: '好价格好公司', q: '垄断级地位，PEG合理。长期持有。' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Hold', q: 'Enterprise moat. Understand the business, long-term hold.' },
        { name: 'Buffett', color: 'green', verdict: 'In circle', q: 'Strong profitability, stable dividend growth.' },
        { name: 'Munger', color: 'green', verdict: 'Good price, good co', q: 'Monopoly position, reasonable PEG. Long-term hold.' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q2',
      reportDate: '2025-01-29',
      zh: {
        revenue: { val: '$69.6B', yoy: '+12%', beat: '超预期$0.9B', note: 'Intelligent Cloud $25.5B (+19%)，Azure+AI增长31%' },
        eps: { val: '$3.23', yoy: '+10%', beat: '超预期$0.12', note: 'Operating leverage改善，运营利润率45%' },
        fcf: { val: '$18.6B', margin: '26.7%', trend: '→', note: 'FCF同比+7%，低于营收增速因AI资本开支激增' },
        grossMargin: { val: '69.4%', trend: '→', note: '基本持平，Cloud毛利率被AI基建投入稀释' },
        guidance: '下季指引营收$68.1-69.1B，Azure增长31-32%',
        highlight: '核心看点：Azure AI ARR突破$13B（+175%），Copilot渗透率加速，企业级AI变现开始兑现',
        risk: '风险信号：AI资本开支$80B/年挤压FCF、Azure增长有放缓迹象、Copilot付费率仍低',
      },
      en: {
        revenue: { val: '$69.6B', yoy: '+12%', beat: 'Beat by $0.9B', note: 'Intelligent Cloud $25.5B (+19%), Azure+AI growth 31%' },
        eps: { val: '$3.23', yoy: '+10%', beat: 'Beat by $0.12', note: 'Operating leverage improving, op margin 45%' },
        fcf: { val: '$18.6B', margin: '26.7%', trend: '→', note: 'FCF +7% YoY, below revenue growth due to AI capex surge' },
        grossMargin: { val: '69.4%', trend: '→', note: 'Flat, Cloud GM diluted by AI infra investment' },
        guidance: 'Next Q revenue guide $68.1-69.1B, Azure growth 31-32%',
        highlight: 'Key thesis: Azure AI ARR crossed $13B (+175%), Copilot adoption accelerating, enterprise AI monetization starting',
        risk: 'Risk signals: AI capex $80B/yr pressuring FCF, Azure growth showing early decel, Copilot paid conversion still low',
      }
    },
    financialHealth: {
      zh: {
        cashPosition: '$78B现金 vs $42B长期债务 = 净现金$36B',
        debtToEquity: '0.29x — 保守杠杆，AAA信用评级',
        currentRatio: '1.27x — 健康',
        capex: '$16B/季 — AI基建投资激增（YoY +78%），占营收23%',
        buyback: '年回购$20B+股息$22B，股息连增20年',
        summary: '净现金$36B+AAA评级=最强财务堡垒之一。但关注AI资本开支激增至$64B/年——这是对未来的豪赌。若AI变现不达预期，FCF将承压。'
      },
      en: {
        cashPosition: '$78B cash vs $42B LT debt = $36B net cash',
        debtToEquity: '0.29x — Conservative leverage, AAA credit rating',
        currentRatio: '1.27x — Healthy',
        capex: '$16B/Q — AI infra investment surging (+78% YoY), 23% of revenue',
        buyback: '$20B/yr buyback + $22B dividend, 20-yr dividend growth streak',
        summary: '$36B net cash + AAA rating = one of strongest financial fortresses. But watch AI capex surging to $64B/yr — a massive bet on AI monetization. If AI fails to monetize, FCF will compress.'
      }
    },
    moat: {
      duan: {
        zh: { score: '极强', analysis: '企业级SaaS锁定=经常性收入机器。Office 365+Azure+GitHub+LinkedIn形成的生态壁垒几乎不可能被打破。企业一旦上Azure，迁移成本极高。AI Copilot是未来增长的加速器。', moatType: '企业级SaaS锁定+云平台+网络效应', risk: 'AI资本开支$80B/年是一场豪赌。若AI变现不达预期（Copilot转化率低），FCF将显著承压。Azure增长已有减速迹象。' },
        en: { score: 'Very Strong', analysis: 'Enterprise SaaS lock-in = recurring revenue machine. Office 365 + Azure + GitHub + LinkedIn ecosystem is nearly impossible to break. Once on Azure, migration costs are prohibitive. AI Copilot is the future growth accelerator.', moatType: 'Enterprise SaaS lock-in + cloud platform + network effects', risk: 'AI capex $80B/yr is a massive bet. If AI monetization disappoints (low Copilot conversion), FCF will compress. Azure growth already showing early deceleration.' }
      },
      buffett: {
        zh: { score: '能力圈内', analysis: '我能理解这个生意。企业离不开Office和Azure——这是经常性收入的典范。盈利能力强劲，分红持续增长。Azure的增长给了这个成熟企业新的增长引擎。', moatType: '企业级特许权+经常性收入', risk: '估值合理但不便宜。AI投入回报周期不确定。但这是能持有10年的好公司。' },
        en: { score: 'In circle', analysis: 'I understand this business. Enterprises can\'t live without Office and Azure — this is the epitome of recurring revenue. Strong profitability, growing dividends. Azure gives this mature business a new growth engine.', moatType: 'Enterprise franchise + recurring revenue', risk: 'Fair but not cheap valuation. AI investment return timeline uncertain. But this is a good business to hold for 10 years.' }
      },
      munger: {
        zh: { score: '垄断+AI期权，合理价', analysis: '垄断级地位+AI期权=合理价格可以买入。Office是全球企业的"税"。Azure+OpenAI合作让MSFT在AI竞赛中占据有利位置。PEG 2.1说明估值合理但非便宜。长期持有的好标的。', moatType: '事实垄断+AI先发优势', risk: '反转思维：什么让MSFT失败？1）Azure被AWS/GCP超越 2）AI投资打水漂 3）反垄断。概率？<10%。这是值得持有的好公司。' },
        en: { score: 'Monopoly + AI optionality, fair price', analysis: 'Monopoly position + AI optionality = buy at fair price. Office is a "tax" on global enterprises. Azure + OpenAI partnership gives MSFT strong AI positioning. PEG 2.1 means fair but not cheap. Good long-term hold.', moatType: 'De facto monopoly + AI first-mover advantage', risk: 'Inversion: what kills MSFT? 1) Azure overtaken by AWS/GCP 2) AI investment wasted 3) Antitrust. Probability? <10%. This is a business worth holding.' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$370-420', method: 'DCF（10yr, 12% terminal growth, 9.5% WACC）', note: '假设营收增速从12%逐步提升至15%（AI驱动），终端增速8%' },
        peerComp: { value: '$380-440', method: '同行对比（GOOGL 22x, AMZN 35x, ORCL 25x fwd PE）', note: 'MSFT享受企业级溢价+AI期权溢价' },
        grahamMargin: '当前$410 vs DCF中值$395 = 溢价4%，安全边际勉强',
        verdict: '合理估值区间$370-420。当前价格基本反映合理预期，回调到$360-380是更好的入场点。'
      },
      en: {
        dcf: { value: '$370-420', method: 'DCF (10yr, 12% terminal growth, 9.5% WACC)', note: 'Revenue growth assumed 12% rising to 15% (AI-driven), terminal 8%' },
        peerComp: { value: '$380-440', method: 'Peer comp (GOOGL 22x, AMZN 35x, ORCL 25x fwd PE)', note: 'MSFT commands enterprise premium + AI optionality premium' },
        grahamMargin: 'Current $410 vs DCF midpoint $395 = 4% premium, barely adequate margin of safety',
        verdict: 'Fair value range $370-420. Current price reflects fair expectations, $360-380 pullback is a better entry.'
      }
    },
  },
};

// Default analysis template for stocks without specific data
function getDefaultAnalysis(symbol, stock) {
  const lang = getLang();
  return {
    exchange: '—',
    revGrowth: '—', epsEst: '—', grossMargin: '—', dataCenterRev: '—',
    peFwd: stock?.pe ? stock.pe + 'x' : '—', peg: '—', evEbitda: '—', ps: '—',
    netMargin: '—', roe: '—', fcfYield: '—', divYield: '—',
    valuationPctl: 50,
    summary: {
      zh: `${symbol}的详细分析数据暂未收录。当前市价 $${stock?.price?.toFixed(2) || '—'}，涨跌幅 ${stock?.change?.toFixed(2) || '—'}%。请在Watchlist中查看更多信息。`,
      en: `Detailed analysis for ${symbol} is not yet available. Current price $${stock?.price?.toFixed(2) || '—'}, change ${stock?.change?.toFixed(2) || '—'}%. Check Watchlist for more info.`,
    },
    verdict: { zh: '暂无评级', en: 'Not rated' },
    verdictColor: 'text-muted',
    questions: {
      zh: [
        { status: 'uncertain', q: '10年后还赚钱？ — 待分析', a: '需要更多数据来判断。' },
        { status: 'uncertain', q: '赚得更多？ — 待分析', a: '需要更多数据来判断。' },
        { status: 'uncertain', q: '护城河？ — 待分析', a: '需要更多数据来判断。' },
      ],
      en: [
        { status: 'uncertain', q: 'Profitable in 10yr? — TBD', a: 'More data needed.' },
        { status: 'uncertain', q: 'Earning more? — TBD', a: 'More data needed.' },
        { status: 'uncertain', q: 'Moat? — TBD', a: 'More data needed.' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '待分析', q: '需要更多研究来判断。' },
        { name: 'Buffett', color: 'yellow', verdict: '待评估', q: '未在能力圈范围内深入分析。' },
        { name: 'Munger', color: 'yellow', verdict: '观察中', q: '需要反转思维分析风险。' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'TBD', q: 'More research needed.' },
        { name: 'Buffett', color: 'yellow', verdict: 'Not assessed', q: 'Not yet analyzed within circle of competence.' },
        { name: 'Munger', color: 'yellow', verdict: 'Watching', q: 'Need inversion analysis on risks.' },
      ],
    },
    earnings: null,
    financialHealth: null,
    moat: null,
    valuation: null,
  };
}

// ========== Signal Data ==========
const signalData = {
  zh: {
    duan: [
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T，AI资本开支持续超预期', tk:'NVDA', q:'卖铲子的生意。加仓1110%，但这个价格不追。' },
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'会员制护城河，如茅台。简单、可预测。' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent收入增长强劲，但估值偏高', tk:'CRM', q:'企业AI是好赛道，但CRM的护城河没有想象中深。' },
      { type:'yellow', cat:'Crypto', title:'BTC ETF单日流入$12亿创纪录', tk:'BTC', q:'不产生现金流但机构化在加速。作为另类资产可以理解，但不是价投。' },
      { type:'red', cat:'关税政策', title:'特朗普25%对华关税升级', tk:'—', q:'政策驱动不碰。投资找10年不变的东西。' },
      { type:'red', cat:'Meme', title:'Dogecoin暴涨40%，Meme板块狂欢', tk:'—', q:'不产生现金流。投机不是投资。' },
    ],
    buffett: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'消费者特许权典范。我能理解的好生意。' },
      { type:'green', cat:'能源', title:'雪佛龙提高股息+4%，年化达$6.52', tk:'CVX', q:'石油不会消失。现金流强劲，分红持续增长。' },
      { type:'yellow', cat:'保险', title:'美国保险业综合成本率改善', tk:'BRK.B', q:'Berkshire的能力圈。浮存金是核武器，但当前不够便宜。' },
      { type:'red', cat:'高估值科技', title:'七巨头总市值$20T占标普四成', tk:'—', q:'$3733亿现金说明一切。太贵了。' },
      { type:'red', cat:'Crypto', title:'DOGE暴涨40%', tk:'—', q:'老鼠药的平方。' },
    ],
    munger: [
      { type:'green', cat:'消费零售', title:'Costco Q2：会员续费率93.4%创新高', tk:'COST', q:'最爱。低毛利高周转，会员费=纯利润。' },
      { type:'green', cat:'AI算力', title:'NVIDIA市值破$5T', tk:'NVDA', q:'好公司可以付合理价格。PEG 0.6。但反转思维：什么让NVDA失败？' },
      { type:'yellow', cat:'医疗', title:'UnitedHealth估值合理但面临反垄断审查', tk:'UNH', q:'医疗是人口老龄化的确定趋势，但监管风险大。' },
      { type:'yellow', cat:'Crypto基建', title:'Coinbase Q4收入翻倍，受益于ETF', tk:'COIN', q:'受益于BTC ETF，但加密市场的周期性让我不确定。' },
      { type:'red', cat:'银行股', title:'美国中小银行因商业地产下跌', tk:'—', q:'资产负债表里隐藏风险太多。赚小钱，可能归零。' },
    ],
  },
  en: {
    duan: [
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T, AI capex exceeds expectations', tk:'NVDA', q:'Shovel business. +1,110% position. But won\'t chase here.' },
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Membership moat. Simple, predictable.' },
      { type:'yellow', cat:'SaaS', title:'Salesforce AI agent revenue surges, valuation stretched', tk:'CRM', q:'Enterprise AI is good, but CRM moat isn\'t as deep as imagined.' },
      { type:'yellow', cat:'Crypto', title:'BTC ETF $1.2B single-day inflow, record', tk:'BTC', q:'No cash flow but institutionalizing fast. Not value investing.' },
      { type:'red', cat:'Tariff', title:'Trump 25% China tariff escalation', tk:'—', q:'Policy-driven = avoid. Find 10-year certainties.' },
      { type:'red', cat:'Meme', title:'Dogecoin surges 40%, meme euphoria', tk:'—', q:'No cash flow. Speculation is not investing.' },
    ],
    buffett: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Consumer franchise epitome. A business I understand.' },
      { type:'green', cat:'Energy', title:'Chevron hikes dividend +4%, annualized $6.52', tk:'CVX', q:'Oil isn\'t going away. Strong cash flow, growing dividends.' },
      { type:'yellow', cat:'Insurance', title:'US insurance combined ratios improve', tk:'BRK.B', q:'Berkshire\'s sweet spot. Float is our weapon, but not cheap enough.' },
      { type:'red', cat:'Tech Valuation', title:'Mag 7 at $20T = 40% of S&P', tk:'—', q:'$373B cash says it all.' },
      { type:'red', cat:'Crypto', title:'DOGE surges 40%', tk:'—', q:'Rat poison squared.' },
    ],
    munger: [
      { type:'green', cat:'Consumer', title:'Costco Q2: 93.4% renewal rate', tk:'COST', q:'Favorite. Low margin high turnover. Membership = profit.' },
      { type:'green', cat:'AI Compute', title:'NVIDIA surpasses $5T', tk:'NVDA', q:'Fair price for great companies. PEG 0.6. Invert: what makes NVDA fail?' },
      { type:'yellow', cat:'Healthcare', title:'UnitedHealth fair valuation but antitrust risk', tk:'UNH', q:'Aging population is certain, but regulation is Damocles\' sword.' },
      { type:'yellow', cat:'Crypto Infra', title:'Coinbase Q4 revenue doubles on ETF tailwind', tk:'COIN', q:'Shovel play for BTC ETF, but crypto cyclicality concerns me.' },
      { type:'red', cat:'Banks', title:'US regional banks drop on CRE concerns', tk:'—', q:'Hidden balance sheet risks. Small gains, potential wipeout.' },
    ],
  },
};

// ========== Data Loading ==========
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function loadAllData() {
  try {
    const [market, crypto, news, fg, meta, stockDetails] = await Promise.all([
      loadJSON('data/market.json'),
      loadJSON('data/crypto.json'),
      loadJSON('data/news.json'),
      loadJSON('data/fear-greed.json'),
      loadJSON('data/meta.json'),
      loadJSON('data/stock-details.json'),
    ]);
    marketData = market;
    cryptoData = crypto;
    newsData = news;
    fearGreedData = fg;
    metaData = meta;
    stockDetailsData = stockDetails;

    renderTicker();
    renderMarketSnapshot();
    renderFearGreed();
    renderNews();
    renderHeadlineSummary();
    renderSectorTags();
    renderImpactTable();
    renderLastUpdate();
    renderTickerSuggestions();

    // Auto-render deep analysis for default ticker
    const defaultTk = document.getElementById('tickerInput')?.value || 'NVDA';
    renderDeepAnalysis(defaultTk);
  } catch (err) {
    console.error('loadAllData error:', err);
  }
}

// ========== Ticker Tape ==========
function renderTicker() {
  const container = document.getElementById('tickerScroll');
  if (!container) return;
  let items = '';
  const addItem = (name, price, change) => {
    const cls = change >= 0 ? 'text-green' : 'text-red';
    const sign = change >= 0 ? '+' : '';
    items += `<span class="ticker-item"><span class="label">${name}</span> <span class="price">${formatPrice(price)}</span> <span class="${cls}">${sign}${change.toFixed(2)}%</span></span>`;
  };
  if (marketData?.indices) {
    const nameMap = { '^GSPC': 'S&P 500', '^IXIC': 'NASDAQ', '^DJI': 'DJI', '^HSI': 'HSI', '000001.SS': 'SSE', '^N225': 'NKY' };
    marketData.indices.forEach(idx => addItem(nameMap[idx.symbol] || idx.symbol, idx.price, idx.change));
  }
  if (cryptoData) {
    cryptoData.slice(0, 3).forEach(c => addItem(c.symbol, c.price, c.change));
  }
  if (marketData?.macro) {
    const nameMap = { '^TNX': '10Y', 'DX-Y.NYB': 'DXY', 'GC=F': 'Gold', 'CL=F': 'WTI', '^VIX': 'VIX' };
    marketData.macro.forEach(m => addItem(nameMap[m.symbol] || m.symbol, m.price, m.change));
  }
  container.innerHTML = items + items;
}

// ========== Market Snapshot ==========
function renderMarketSnapshot() {
  const grid = document.getElementById('snapshotGrid');
  if (!grid) return;
  let html = '';
  const addSnapshot = (name, price, change) => {
    const cls = change >= 0 ? 'text-green' : 'text-red';
    const sign = change >= 0 ? '+' : '';
    html += `<div class="snapshot-item"><div class="name">${name}</div><div class="value mono">${formatPrice(price)}</div><div class="change ${cls}">${sign}${change.toFixed(2)}%</div></div>`;
  };
  if (marketData?.indices) {
    const nameMap = { '^GSPC': 'S&P 500', '^IXIC': 'NASDAQ', '^DJI': 'DJI', '^HSI': 'HSI', '000001.SS': 'SSE', '^N225': 'NKY' };
    marketData.indices.forEach(idx => addSnapshot(nameMap[idx.symbol] || idx.name, idx.price, idx.change));
  }
  grid.innerHTML = html;

  const grid2 = document.getElementById('snapshotGrid2');
  if (!grid2) return;
  html = '';
  if (cryptoData) cryptoData.slice(0, 3).forEach(c => addSnapshot(c.symbol, c.price, c.change));
  if (marketData?.macro) {
    const nameMap = { '^TNX': '10Y Yield', 'DX-Y.NYB': 'DXY', 'GC=F': 'Gold', 'CL=F': 'WTI', '^VIX': 'VIX' };
    marketData.macro.slice(0, 2).forEach(m => addSnapshot(nameMap[m.symbol] || m.name, m.price, m.change));
  }
  grid2.innerHTML = html;
}

// ========== Fear & Greed ==========
function renderFearGreed() {
  const valEl = document.getElementById('fgValue');
  const labelEl = document.getElementById('fgLabel');
  const fillEl = document.getElementById('fgFill');
  if (!valEl || !fearGreedData) return;
  const val = fearGreedData.value;
  valEl.textContent = val;
  fillEl.style.width = val + '%';
  const lang = getLang();
  let label = fearGreedData.label;
  if (lang === 'zh') {
    if (val >= 75) label = '极度贪婪';
    else if (val >= 55) label = '贪婪';
    else if (val >= 45) label = '中性';
    else if (val >= 25) label = '恐惧';
    else label = '极度恐惧';
  }
  labelEl.textContent = label;
  labelEl.className = val >= 55 ? 'text-green' : val <= 45 ? 'text-red' : 'text-yellow';
}

// ========== News ==========
function renderNews() {
  const container = document.getElementById('newsContainer');
  if (!container) return;
  if (!newsData || newsData.length === 0) {
    container.innerHTML = `<div class="news-item"><div class="news-content"><div class="news-title" style="color:var(--text-secondary)">${t('recap.no_news')}</div></div></div>`;
    return;
  }
  let html = '';
  newsData.slice(0, 10).forEach(n => {
    const sentCls = n.sentiment === 'positive' ? 'tag-positive' : n.sentiment === 'negative' ? 'tag-negative' : 'tag-neutral';
    const tags = (n.tags || []).slice(0, 3).map(tag =>
      `<span class="news-tag tag-default">${typeof tag === 'string' ? tag : tag.symbol || tag}</span>`
    ).join('');
    const titleTag = n.url && n.url !== '#'
      ? `<a class="news-title" href="${escapeAttr(n.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(n.title)}</a>`
      : `<span class="news-title">${escapeHtml(n.title)}</span>`;
    html += `<div class="news-item"><div class="news-time">${escapeHtml(n.time || '')}</div><div class="news-content">${titleTag}<div class="news-meta"><span class="news-source">${escapeHtml(n.source || '')}</span>${n.sentiment ? `<span class="news-tag ${sentCls}">${n.sentiment}</span>` : ''}${tags}</div></div></div>`;
  });
  container.innerHTML = html;
}

// ========== Last Update ==========
function renderLastUpdate() {
  const el = document.getElementById('lastUpdated');
  if (!el || !metaData) return;
  const d = new Date(metaData.lastUpdated);
  el.textContent = `${t('recap.last_updated')}: ${d.toLocaleString()}`;
}

// ========== Signal Wall ==========
function renderSignals(master) {
  const container = document.getElementById('signalCards');
  if (!container) return;
  const lang = getLang();
  const signals = signalData[lang]?.[master] || signalData.en?.[master] || [];
  const groups = { green: [], yellow: [], red: [] };
  signals.forEach(s => groups[s.type].push(s));
  const groupLabels = { green: t('signal.green'), yellow: t('signal.yellow'), red: t('signal.red') };
  const groupColors = {
    green: { dot: 'background:var(--green)', border: 'type-green' },
    yellow: { dot: 'background:var(--yellow)', border: 'type-yellow' },
    red: { dot: 'background:var(--red)', border: 'type-red' },
  };
  const tagColors = { green: 'tag-positive', yellow: 'tag-neutral', red: 'tag-negative' };

  let html = '';
  ['green', 'yellow', 'red'].forEach(type => {
    if (!groups[type].length) return;
    const gc = groupColors[type];
    html += `<div class="signal-group-label"><span class="signal-dot" style="${gc.dot}"></span><span class="signal-group-text">${groupLabels[type]}</span><span class="text-muted signal-group-count">${groups[type].length}</span></div>`;
    groups[type].forEach(s => {
      const isClickable = s.tk !== '—';
      const clickAttr = isClickable ? `onclick="window.vmApp.goDeepDive('${s.tk}')"` : '';
      const cursorCls = isClickable ? ' signal-card-clickable' : '';
      html += `<div class="signal-card ${gc.border}${cursorCls} fade-in" ${clickAttr}><div class="signal-header"><span class="news-tag ${tagColors[type]}">${escapeHtml(s.cat)}</span>${isClickable ? `<span class="mono text-muted signal-ticker">${s.tk}</span>` : ''}</div><div class="signal-title">${escapeHtml(s.title)}</div><div class="signal-quote">"${escapeHtml(s.q)}"</div></div>`;
    });
  });
  container.innerHTML = html;
}

// ========== Earnings Renderer ==========
function renderEarnings(analysis, lang) {
  const container = document.getElementById('earningsContainer');
  if (!container || !analysis.earnings) { if(container) container.innerHTML = ''; return; }
  const e = analysis.earnings[lang] || analysis.earnings.en;
  const trendIcon = (t) => t === '↑' ? '▲' : t === '↓' ? '▼' : '—';
  const trendCls = (t) => t === '↑' ? 'text-green' : t === '↓' ? 'text-red' : 'text-yellow';
  container.innerHTML = `
    <div class="earnings-header">${analysis.earnings.quarter} | ${analysis.earnings.reportDate}</div>
    <div class="earnings-grid">
      <div class="earnings-item"><div class="earnings-metric">${lang === 'zh' ? '营收' : 'Revenue'}</div><div class="earnings-val mono">${e.revenue.val} <span class="text-green">${e.revenue.yoy}</span></div><div class="earnings-beat text-green">${e.revenue.beat}</div><div class="earnings-note">${e.revenue.note}</div></div>
      <div class="earnings-item"><div class="earnings-metric">EPS</div><div class="earnings-val mono">${e.eps.val} <span class="text-green">${e.eps.yoy}</span></div><div class="earnings-beat text-green">${e.eps.beat}</div><div class="earnings-note">${e.eps.note}</div></div>
      <div class="earnings-item"><div class="earnings-metric">${lang === 'zh' ? '自由现金流' : 'Free Cash Flow'}</div><div class="earnings-val mono">${e.fcf.val} <span class="${trendCls(e.fcf.trend)}">${trendIcon(e.fcf.trend)} ${e.fcf.margin}</span></div><div class="earnings-note">${e.fcf.note}</div></div>
      <div class="earnings-item"><div class="earnings-metric">${lang === 'zh' ? '毛利率' : 'Gross Margin'}</div><div class="earnings-val mono">${e.grossMargin.val} <span class="${trendCls(e.grossMargin.trend)}">${trendIcon(e.grossMargin.trend)}</span></div><div class="earnings-note">${e.grossMargin.note}</div></div>
    </div>
    <div class="earnings-guidance"><strong>${lang === 'zh' ? '指引' : 'Guidance'}:</strong> ${e.guidance}</div>
    <div class="earnings-highlight"><strong>${lang === 'zh' ? '核心看点' : 'Key Thesis'}:</strong> ${e.highlight}</div>
    <div class="earnings-risk"><strong>${lang === 'zh' ? '风险信号' : 'Risk Signals'}:</strong> ${e.risk}</div>
  `;
}

// ========== Financial Health Renderer ==========
function renderFinancialHealth(analysis, lang) {
  const container = document.getElementById('finHealthContainer');
  if (!container || !analysis.financialHealth) { if(container) container.innerHTML = ''; return; }
  const h = analysis.financialHealth[lang] || analysis.financialHealth.en;
  container.innerHTML = `
    <div class="fin-health-grid">
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '现金/债务' : 'Cash/Debt'}</span><span class="stat-value">${h.cashPosition}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '负债权益比' : 'D/E Ratio'}</span><span class="stat-value">${h.debtToEquity}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '流动比率' : 'Current Ratio'}</span><span class="stat-value">${h.currentRatio}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '资本开支' : 'Capex'}</span><span class="stat-value">${h.capex}</span></div>
      <div class="stat-row"><span class="stat-label">${lang === 'zh' ? '股东回报' : 'Shareholder Returns'}</span><span class="stat-value">${h.buyback}</span></div>
    </div>
    <div class="fin-health-summary">${h.summary}</div>
  `;
}

// ========== Moat Analysis Renderer (PER MASTER) ==========
function renderMoatAnalysis(analysis, lang, master) {
  const container = document.getElementById('moatContainer');
  if (!container || !analysis.moat) { if(container) container.innerHTML = ''; return; }
  const m = analysis.moat[master]?.[lang] || analysis.moat[master]?.en || analysis.moat.duan?.[lang];
  if (!m) { container.innerHTML = ''; return; }
  const scoreColor = m.score.includes('强') || m.score.includes('Strong') || m.score.includes('极强') || m.score.includes('Very Strong') || m.score.includes('核心') || m.score.includes('Core') ? 'text-green' : m.score.includes('外') || m.score.includes('Outside') ? 'text-yellow' : 'text-yellow';
  container.innerHTML = `
    <div class="moat-header"><span class="fw-600">${lang === 'zh' ? '护城河评级' : 'Moat Rating'}: </span><span class="${scoreColor} fw-700">${m.score}</span></div>
    <div class="moat-type"><span class="text-muted">${lang === 'zh' ? '类型' : 'Type'}:</span> ${m.moatType}</div>
    <div class="moat-analysis">${m.analysis}</div>
    <div class="moat-risk"><span class="text-red fw-600">${lang === 'zh' ? '关键风险' : 'Key Risk'}:</span> ${m.risk}</div>
  `;
}

// ========== Valuation Renderer ==========
function renderValuation(analysis, lang) {
  const container = document.getElementById('valuationContainer');
  if (!container || !analysis.valuation) { if(container) container.innerHTML = ''; return; }
  const v = analysis.valuation[lang] || analysis.valuation.en;
  container.innerHTML = `
    <div class="valuation-methods">
      <div class="val-method"><div class="val-method-label">DCF</div><div class="val-method-value mono fw-700">${v.dcf.value}</div><div class="val-method-detail">${v.dcf.method}</div><div class="val-method-note text-muted">${v.dcf.note}</div></div>
      <div class="val-method"><div class="val-method-label">${lang === 'zh' ? '同行对比' : 'Peer Comp'}</div><div class="val-method-value mono fw-700">${v.peerComp.value}</div><div class="val-method-detail">${v.peerComp.method}</div><div class="val-method-note text-muted">${v.peerComp.note}</div></div>
    </div>
    <div class="val-margin"><span class="fw-600">${lang === 'zh' ? '安全边际' : 'Margin of Safety'}:</span> ${v.grahamMargin}</div>
    <div class="val-verdict fw-600">${v.verdict}</div>
  `;
}

// ========== Deep Analysis — FULLY DYNAMIC ==========
function renderDeepAnalysis(symbol) {
  const stock = marketData?.watchlist?.find(s => s.symbol === symbol);
  const sd = stockDetailsData?.[symbol]; // real-time financial data from Yahoo
  const analysis = stockAnalysis[symbol] || getDefaultAnalysis(symbol, stock);
  const lang = getLang();
  const el = (id) => document.getElementById(id);

  // Helper: use real data (sd) when available, fallback to hardcoded (analysis)
  const fmtPct = (v) => v != null ? (v * 100).toFixed(1) + '%' : '—';
  const fmtRatio = (v, suffix) => v != null ? v.toFixed(1) + (suffix || 'x') : '—';

  // Quote header
  el('deepSymbol').textContent = symbol;
  el('deepExchange').textContent = analysis.exchange || '—';
  el('deepName').textContent = stock?.name || symbol;
  if (stock) {
    el('deepPrice').textContent = stock.price.toFixed(2);
    const change = stock.price - (stock.price / (1 + stock.change / 100));
    const cls = stock.change >= 0 ? 'text-green' : 'text-red';
    const sign = stock.change >= 0 ? '+' : '';
    el('deepChange').className = `quote-change ${cls}`;
    el('deepChange').textContent = `${sign}${change.toFixed(2)} (${sign}${stock.change.toFixed(2)}%)`;
    el('deepOpen').textContent = stock.open?.toFixed(2) || '—';
    el('deepHigh').textContent = stock.dayHigh?.toFixed(2) || '—';
    el('deepLow').textContent = stock.dayLow?.toFixed(2) || '—';
    el('deepVolume').textContent = formatVolume(stock.volume);
    el('deepMktCap').textContent = stock.marketCap || '—';
    el('deepPE').textContent = stock.pe ? stock.pe + 'x' : '—';
  } else if (sd) {
    // Use stock-details data when watchlist doesn't have it
    el('deepPrice').textContent = sd.price?.toFixed(2) || '—';
    const sdChange = sd.change || 0;
    const sdCls = sdChange >= 0 ? 'text-green' : 'text-red';
    const sdSign = sdChange >= 0 ? '+' : '';
    el('deepChange').className = `quote-change ${sdCls}`;
    el('deepChange').textContent = `${sdSign}${sdChange.toFixed(2)}%`;
    el('deepOpen').textContent = '—';
    el('deepHigh').textContent = '—';
    el('deepLow').textContent = '—';
    el('deepVolume').textContent = '—';
    el('deepMktCap').textContent = sd.marketCap ? '$' + sd.marketCap : '—';
    el('deepPE').textContent = sd.pe != null ? sd.pe.toFixed(1) + 'x' : '—';
  } else {
    el('deepPrice').textContent = '—';
    el('deepChange').className = 'quote-change text-muted';
    el('deepChange').textContent = '—';
    ['deepOpen','deepHigh','deepLow','deepVolume','deepMktCap','deepPE'].forEach(id => el(id).textContent = '—');
  }

  // 52-week range (prefer stock-details, fallback to watchlist)
  const w52Low = sd?.fiftyTwoWeekLow || stock?.fiftyTwoWeekLow;
  const w52High = sd?.fiftyTwoWeekHigh || stock?.fiftyTwoWeekHigh;
  const curPrice = stock?.price || sd?.price;
  if (w52Low && w52High && curPrice) {
    const pct = ((curPrice - w52Low) / (w52High - w52Low) * 100).toFixed(0);
    el('range52Low').textContent = '$' + w52Low.toFixed(2);
    el('range52High').textContent = '$' + w52High.toFixed(2);
    el('range52Fill').style.width = pct + '%';
    el('range52Marker').style.left = pct + '%';
  }

  // AI Summary
  el('aiSummaryText').textContent = analysis.summary[lang] || analysis.summary.en;

  // Overview metrics (prefer real data)
  el('ovMktCap').textContent = sd?.marketCap ? '$' + sd.marketCap : (stock?.marketCap ? '$' + stock.marketCap : '—');
  el('ovPE').textContent = sd?.pe != null ? fmtRatio(sd.pe) : (stock?.pe ? stock.pe + 'x' : '—');
  el('ovRevGrowth').textContent = sd?.revenueGrowth != null ? fmtPct(sd.revenueGrowth) : analysis.revGrowth;
  el('ovGrossMargin').textContent = sd?.grossMargin != null ? fmtPct(sd.grossMargin) : analysis.grossMargin;

  // Valuation stats (prefer real data)
  el('statPE').textContent = sd?.pe != null ? fmtRatio(sd.pe) : (stock?.pe ? stock.pe + 'x' : '—');
  el('statFwdPE').textContent = sd?.forwardPE != null ? fmtRatio(sd.forwardPE) : analysis.peFwd;
  el('statPEG').textContent = sd?.peg != null ? sd.peg.toFixed(2) : analysis.peg;
  el('statEV').textContent = sd?.evEbitda != null ? fmtRatio(sd.evEbitda) : analysis.evEbitda;
  el('statPS').textContent = sd?.ps != null ? fmtRatio(sd.ps) : analysis.ps;
  el('statGrossMargin').textContent = sd?.grossMargin != null ? fmtPct(sd.grossMargin) : analysis.grossMargin;
  el('statNetMargin').textContent = sd?.netMargin != null ? fmtPct(sd.netMargin) : analysis.netMargin;
  el('statROE').textContent = sd?.roe != null ? fmtPct(sd.roe) : analysis.roe;
  el('statFCF').textContent = sd?.fcfYield != null ? fmtPct(sd.fcfYield) : analysis.fcfYield;
  el('statDiv').textContent = sd?.divYield != null ? fmtPct(sd.divYield) : analysis.divYield;

  // Financials panel
  el('finRevenue').textContent = analysis.revGrowth;
  el('finEPS').textContent = analysis.epsEst;
  el('finMargin').textContent = analysis.grossMargin;
  el('finSegment').textContent = analysis.dataCenterRev;

  // Valuation thermometer
  const pctl = analysis.valuationPctl;
  let valLabel = pctl >= 75 ? (lang === 'zh' ? '偏贵' : 'Expensive') : pctl >= 50 ? (lang === 'zh' ? '合理' : 'Fair') : (lang === 'zh' ? '便宜' : 'Cheap');
  let valColor = pctl >= 75 ? 'text-red' : pctl >= 50 ? 'text-yellow' : 'text-green';
  el('valPctlLabel').textContent = `${pctl}th pctl — ${valLabel}`;
  el('valPctlLabel').className = valColor + ' fw-600';
  el('valMarker').style.left = pctl + '%';

  // Three questions
  const questions = analysis.questions[lang] || analysis.questions.en;
  const qContainer = el('questionsContainer');
  qContainer.innerHTML = questions.map(q => {
    const statusCls = q.status === 'positive' ? 'positive' : q.status === 'uncertain' ? 'uncertain' : 'negative';
    const headerCls = q.status === 'positive' ? 'text-green' : q.status === 'uncertain' ? 'text-yellow' : 'text-red';
    return `<div class="question-item ${statusCls}"><div class="question-header ${headerCls}">${escapeHtml(q.q)}</div><div class="question-answer">${escapeHtml(q.a)}</div></div>`;
  }).join('');

  // Cross-validation
  const crossVal = analysis.crossVal[lang] || analysis.crossVal.en;
  const cvContainer = el('crossValContainer');
  cvContainer.innerHTML = crossVal.map(cv => {
    const borderCls = cv.color === 'green' ? 'cross-green' : cv.color === 'yellow' ? 'cross-yellow' : 'cross-red';
    const tagCls = cv.color === 'green' ? 'tag-positive' : cv.color === 'yellow' ? 'tag-neutral' : 'tag-negative';
    return `<div class="cross-item ${borderCls}"><div class="flex justify-between items-center mb-4"><span class="cross-name">${cv.name}</span><span class="cross-verdict ${tagCls}">${escapeHtml(cv.verdict)}</span></div><div class="cross-quote">"${escapeHtml(cv.q)}"</div></div>`;
  }).join('');

  // Final verdict
  el('verdictResult').textContent = analysis.verdict[lang] || analysis.verdict.en;
  el('verdictResult').className = 'fw-700 ' + analysis.verdictColor;

  // Chart
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const basePrice = stock?.price || 100;
    const data = generateCandleData(basePrice, 30);
    renderCandlestickChart(svg, data);
  }

  // New deep analysis panels
  const master = currentMaster.deep;
  renderEarnings(analysis, lang);
  renderFinancialHealth(analysis, lang);
  renderMoatAnalysis(analysis, lang, master);
  renderValuation(analysis, lang);
}

// ========== Tab Switching ==========
function switchMainTab(tab) {
  ['recap', 'signal', 'deep'].forEach(tabId => {
    const page = document.getElementById('page-' + tabId);
    const btn = document.getElementById('mainTab-' + tabId);
    if (page) page.classList.toggle('active', tabId === tab);
    if (btn) btn.classList.toggle('active', tabId === tab);
  });
  if (tab === 'signal') renderSignals(currentMaster.signal);
  if (tab === 'deep') renderDeepAnalysis(document.getElementById('tickerInput')?.value || 'NVDA');
}

function switchMaster(master, ctx) {
  currentMaster[ctx] = master;
  const selector = document.getElementById(`masterSelector-${ctx}`);
  if (selector) {
    selector.querySelectorAll('.master-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.master === master);
    });
  }
  if (ctx === 'signal') renderSignals(master);
  if (ctx === 'deep') {
    renderDeepAnalysis(document.getElementById('tickerInput')?.value || 'NVDA');
  }
}

function switchDeepTab(tab) {
  currentDeepTab = tab;
  document.querySelectorAll('.deep-panel').forEach(p => p.classList.toggle('active', p.id === 'dpanel-' + tab));
  document.querySelectorAll('.deep-tab').forEach(b => b.classList.toggle('active', b.dataset.dtab === tab));
}

function switchChartPeriod(period) {
  document.querySelectorAll('.chart-period-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === period);
  });
  const days = { '1D': 1, '1W': 5, '1M': 30, '3M': 90, '1Y': 252, '5Y': 1260 };
  const svg = document.getElementById('chartSvg');
  if (svg) {
    const stock = marketData?.watchlist?.find(s => s.symbol === (document.getElementById('tickerInput')?.value || 'NVDA'));
    const data = generateCandleData(stock?.price || 100, days[period] || 30);
    renderCandlestickChart(svg, data);
  }
}

function goDeepDive(tk) {
  document.getElementById('tickerInput').value = tk;
  switchMainTab('deep');
  // renderDeepAnalysis already called by switchMainTab
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function runAnalysis() {
  const tk = document.getElementById('tickerInput')?.value.trim().toUpperCase();
  if (!tk) return;
  renderDeepAnalysis(tk);
}

// ========== Ticker Suggestions ==========
function renderTickerSuggestions() {
  const container = document.getElementById('tickerSuggestions');
  if (!container) return;
  const suggestions = [];
  if (marketData?.watchlist) {
    marketData.watchlist.forEach(s => {
      const cls = s.change >= 0 ? 'text-green' : 'text-red';
      const sign = s.change >= 0 ? '+' : '';
      suggestions.push({ symbol: s.symbol, change: s.change, cls, sign });
    });
  }
  suggestions.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  let html = '';
  suggestions.slice(0, 8).forEach(s => {
    html += `<button class="ticker-chip" onclick="vmApp.quickTicker('${s.symbol}')"><span class="ticker-chip-symbol">${s.symbol}</span><span class="${s.cls}">${s.sign}${s.change.toFixed(1)}%</span></button>`;
  });
  container.innerHTML = html;
}

function quickTicker(symbol) {
  const input = document.getElementById('tickerInput');
  if (input) input.value = symbol;
  renderDeepAnalysis(symbol);
}

// ========== Helpers ==========
function formatPrice(val) {
  if (val == null) return '—';
  if (val >= 1000) return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (val >= 1) return val.toFixed(2);
  return val.toFixed(4);
}

function formatVolume(val) {
  if (!val) return '—';
  if (val >= 1e9) return (val / 1e9).toFixed(1) + 'B';
  if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + 'K';
  return String(val);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ========== Init ==========
function initLang() {
  const langZh = document.getElementById('lang-zh');
  const langEn = document.getElementById('lang-en');
  if (langZh) langZh.addEventListener('click', () => {
    setLang('zh');
    langZh.classList.add('active');
    langEn.classList.remove('active');
    renderAll();
  });
  if (langEn) langEn.addEventListener('click', () => {
    setLang('en');
    langEn.classList.add('active');
    langZh.classList.remove('active');
    renderAll();
  });
}

// ========== Headline Summary (Value Investing Focus) ==========
function renderHeadlineSummary() {
  const container = document.getElementById('headlineSummary');
  if (!container) return;
  const lang = getLang();
  const summaryData = {
    zh: {
      title: '今日价投要点',
      items: [
        { icon: '📊', label: '财报信号', text: 'NVDA Q4营收$39.3B超预期+78%，FCF创新高$16.8B — <strong>AI算力现金流持续验证</strong>。但毛利率环比↓3pp需关注。' },
        { icon: '💰', label: '现金流影响', text: '油价因中东局势走强 → XOM/CVX自由现金流短期受益。10Y Yield 4.15%上行 → DCF折现率↑ = 成长股估值承压。' },
        { icon: '🛡️', label: '安全边际', text: 'F&G 22（极度恐惧）+ VIX 23.4 — 市场恐慌时寻找被错杀的优质企业。BRK-B $373B现金 = Buffett在等更便宜的价格。' },
        { icon: '⚠️', label: '回避区域', text: '关税升级影响AAPL/TSLA供应链成本，政策驱动型标的不碰（DYP框架）。Meme币暴涨 = 投机非投资。' },
      ]
    },
    en: {
      title: "Today's Value Investing Signals",
      items: [
        { icon: '📊', label: 'Earnings Signal', text: 'NVDA Q4 revenue $39.3B beat +78%, FCF record $16.8B — <strong>AI compute cash flow thesis confirmed</strong>. But GM declining 3pp QoQ needs monitoring.' },
        { icon: '💰', label: 'Cash Flow Impact', text: 'Oil rising on Mideast tension → XOM/CVX FCF short-term boost. 10Y Yield 4.15% rising → higher discount rate = growth stock valuations compressed.' },
        { icon: '🛡️', label: 'Margin of Safety', text: 'F&G 22 (Extreme Fear) + VIX 23.4 — look for quality businesses sold off by panic. BRK-B $373B cash = Buffett waiting for cheaper prices.' },
        { icon: '⚠️', label: 'Avoid Zone', text: 'Tariff escalation hits AAPL/TSLA supply chain costs, avoid policy-driven names (DYP framework). Meme coin surge = speculation, not investing.' },
      ]
    }
  };
  const s = summaryData[lang] || summaryData.en;
  let html = `<div class="headline-summary-title">${s.title}</div>`;
  s.items.forEach(item => {
    html += `<div class="summary-item"><span class="summary-icon">${item.icon}</span><div class="summary-content"><span class="summary-label">${item.label}</span><span class="summary-text">${item.text}</span></div></div>`;
  });
  container.innerHTML = html;
}

// ========== Sector Tags (Expandable with clickable stocks) ==========
let expandedSector = null;

function renderSectorTags() {
  const container = document.getElementById('sectorTags');
  if (!container) return;
  const lang = getLang();
  const sectors = [
    { name: lang === 'zh' ? 'AI算力' : 'AI Compute', status: 'active', stocks: [
      { tk: 'NVDA', note: lang === 'zh' ? 'GPU龙头，Q4 FCF $16.8B' : 'GPU leader, Q4 FCF $16.8B' },
      { tk: 'AMD', note: lang === 'zh' ? 'MI300X追赶，数据中心+32%' : 'MI300X catching up, DC +32%' },
      { tk: 'TSM', note: lang === 'zh' ? '代工垄断，先进制程护城河' : 'Foundry monopoly, node moat' },
    ]},
    { name: lang === 'zh' ? '能源/石油' : 'Energy/Oil', status: 'hot', stocks: [
      { tk: 'CVX', note: lang === 'zh' ? '股息+4%年化$6.52，FCF强劲' : 'Div +4% annualized $6.52, strong FCF' },
      { tk: 'XOM', note: lang === 'zh' ? '全球最大石油公司，现金牛' : 'Largest oil major, cash cow' },
    ]},
    { name: lang === 'zh' ? '加密/Web3' : 'Crypto/Web3', status: 'active', stocks: [
      { tk: 'COIN', note: lang === 'zh' ? 'ETF受益，Q4收入翻倍' : 'ETF beneficiary, Q4 revenue doubled' },
    ]},
    { name: lang === 'zh' ? '消费/零售' : 'Consumer', status: 'neutral', stocks: [
      { tk: 'COST', note: lang === 'zh' ? '会员续费93.4%，消费者特许权' : '93.4% renewal, consumer franchise' },
      { tk: 'AAPL', note: lang === 'zh' ? '服务毛利>70%，安装基20亿' : 'Services GM >70%, 2B installed base' },
    ]},
    { name: lang === 'zh' ? '企业SaaS' : 'Enterprise SaaS', status: 'neutral', stocks: [
      { tk: 'MSFT', note: lang === 'zh' ? 'Azure AI ARR $13B，Copilot变现' : 'Azure AI ARR $13B, Copilot monetizing' },
      { tk: 'GOOGL', note: lang === 'zh' ? '搜索+Cloud双引擎，AI投入大' : 'Search + Cloud dual engine, heavy AI spend' },
    ]},
    { name: lang === 'zh' ? '中概股' : 'China ADR', status: 'neutral', stocks: [
      { tk: 'BABA', note: lang === 'zh' ? '云智能分拆+回购，估值极低' : 'Cloud spin-off + buyback, ultra cheap valuation' },
    ]},
  ];
  const sLabel = lang === 'zh' ? '关联重点板块' : 'Key Sectors in Focus';
  let html = `<div class="section-label">${sLabel}</div><div class="sector-tags-row">`;
  sectors.forEach((s, i) => {
    const cls = s.status === 'hot' ? 'sector-tag-hot' : s.status === 'active' ? 'sector-tag-active' : 'sector-tag-neutral';
    const isExp = expandedSector === i;
    html += `<button class="sector-tag ${cls}${isExp ? ' sector-tag-open' : ''}" onclick="vmApp.toggleSector(${i})"><span class="sector-dot"></span>${s.name}<span class="sector-arrow">${isExp ? '▲' : '▼'}</span></button>`;
  });
  html += '</div>';
  if (expandedSector !== null && sectors[expandedSector]) {
    const s = sectors[expandedSector];
    html += '<div class="sector-stock-list">';
    s.stocks.forEach(st => {
      html += `<div class="sector-stock-item" onclick="vmApp.goDeepDive('${st.tk}')"><span class="sector-stock-tk">${st.tk}</span><span class="sector-stock-note">${st.note}</span><span class="sector-stock-arrow">→</span></div>`;
    });
    html += '</div>';
  }
  container.innerHTML = html;
}

function toggleSector(idx) {
  expandedSector = expandedSector === idx ? null : idx;
  renderSectorTags();
}

// ========== Impact Table (Dynamic, clickable tickers) ==========
function renderImpactTable() {
  const container = document.getElementById('impactTableContainer');
  if (!container) return;
  const lang = getLang();
  const impacts = [
    { event: lang === 'zh' ? 'NVDA财报超预期' : 'NVDA earnings beat', tickers: ['NVDA', 'AMD', 'TSM'], dir: 'bullish', logic: lang === 'zh' ? 'AI资本开支周期加速，FCF创新高验证现金流' : 'AI capex cycle accelerating, record FCF validates cash flow' },
    { event: lang === 'zh' ? '10Y收益率上行' : '10Y yield rising', tickers: ['BRK-B', 'COST'], dir: 'mixed', logic: lang === 'zh' ? '折现率↑压缩成长股估值，利好价值股/保险浮存金' : 'Higher discount rate compresses growth; benefits value stocks/insurance float' },
    { event: lang === 'zh' ? '中国刺激政策' : 'China stimulus', tickers: ['BABA', 'GOOGL'], dir: 'bullish', logic: lang === 'zh' ? '消费复苏利好电商，关注自由现金流改善' : 'Consumer recovery benefits e-commerce, watch FCF improvement' },
    { event: lang === 'zh' ? '关税升级' : 'Tariff escalation', tickers: ['AAPL', 'COST'], dir: 'bearish', logic: lang === 'zh' ? '供应链成本↑ → 毛利率承压，关注定价权能否转嫁' : 'Supply chain cost ↑ → margin pressure, watch pricing power pass-through' },
    { event: lang === 'zh' ? 'BTC ETF持续流入' : 'BTC ETF inflows', tickers: ['COIN', 'MSFT'], dir: 'bullish', logic: lang === 'zh' ? 'COIN手续费收入↑，MSFT Azure区块链服务受益' : 'COIN fee revenue ↑, MSFT Azure blockchain services benefit' },
  ];
  const dirMap = { bullish: { cls: 'text-green', zh: '看多', en: 'Bullish' }, bearish: { cls: 'text-red', zh: '看空', en: 'Bearish' }, mixed: { cls: 'text-yellow', zh: '混合', en: 'Mixed' } };
  let html = `<table class="impact-table"><thead><tr><th>${t('recap.th_event')}</th><th>${t('recap.th_assets')}</th><th class="text-center">${t('recap.th_dir')}</th><th class="hide-mobile">${t('recap.th_logic')}</th></tr></thead><tbody>`;
  impacts.forEach(imp => {
    const tickerLinks = imp.tickers.map(tk => `<a class="impact-ticker" onclick="vmApp.goDeepDive('${tk}')">${tk}</a>`).join(', ');
    const d = dirMap[imp.dir];
    html += `<tr><td>${imp.event}</td><td class="mono">${tickerLinks}</td><td class="text-center"><span class="${d.cls} fw-600">${d[lang] || d.en}</span></td><td class="hide-mobile text-muted">${imp.logic}</td></tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderAll() {
  renderSignals(currentMaster.signal);
  renderFearGreed();
  renderNews();
  renderHeadlineSummary();
  renderSectorTags();
  renderImpactTable();
  renderLastUpdate();
  const tk = document.getElementById('tickerInput')?.value || 'NVDA';
  renderDeepAnalysis(tk);
}

window.vmApp = { switchMainTab, switchMaster, switchDeepTab, switchChartPeriod, goDeepDive, runAnalysis, quickTicker, toggleSector };

document.addEventListener('DOMContentLoaded', () => {
  const d = new Date();
  const dateStr = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  const dateEl = document.getElementById('dateDisplay');
  if (dateEl) dateEl.textContent = dateStr;
  const dateLabel = document.getElementById('dateLabel');
  if (dateLabel) dateLabel.textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  initLang();
  setLang('zh');
  loadAllData();
  renderSignals('duan');
});
