// ========== Stock Analysis Data (keyed by symbol) ==========
// Auto-merged from research agents — 2026-03-06
// Contains: NVDA, AAPL, MSFT, GOOGL, AMZN, META, TSM, COST, BRK-B, BABA, AMD, CVX, COIN, CRM, UNH, XOM

export const stockAnalysis = {
  NVDA: {
    exchange: 'NASDAQ',
    desc: { zh: 'AI芯片龙头，GPU+CUDA平台驱动数据中心、自动驾驶、游戏三大业务', en: 'AI chip leader; GPU + CUDA platform powering data centers, autonomous driving, and gaming' },
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
    desc: { zh: '全球市值最大科技公司，iPhone+Mac+iPad硬件生态+Services订阅服务', en: 'World\'s most valuable tech company; iPhone/Mac/iPad hardware ecosystem + Services subscriptions' },
    revGrowth: '+4%', epsEst: '$2.40 vs est $2.35', grossMargin: '46.9%', dataCenterRev: 'Services $26.3B (+14%)',
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
    desc: { zh: '企业级软件+云计算巨头，Office 365+Azure+AI Copilot驱动', en: 'Enterprise software + cloud giant; Office 365, Azure cloud, and AI Copilot' },
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
        risk: '风险信号：AI资本开支$64B/年挤压FCF、Azure增长有放缓迹象、Copilot付费率仍低',
      },
      en: {
        revenue: { val: '$69.6B', yoy: '+12%', beat: 'Beat by $0.9B', note: 'Intelligent Cloud $25.5B (+19%), Azure+AI growth 31%' },
        eps: { val: '$3.23', yoy: '+10%', beat: 'Beat by $0.12', note: 'Operating leverage improving, op margin 45%' },
        fcf: { val: '$18.6B', margin: '26.7%', trend: '→', note: 'FCF +7% YoY, below revenue growth due to AI capex surge' },
        grossMargin: { val: '69.4%', trend: '→', note: 'Flat, Cloud GM diluted by AI infra investment' },
        guidance: 'Next Q revenue guide $68.1-69.1B, Azure growth 31-32%',
        highlight: 'Key thesis: Azure AI ARR crossed $13B (+175%), Copilot adoption accelerating, enterprise AI monetization starting',
        risk: 'Risk signals: AI capex $64B/yr pressuring FCF, Azure growth showing early decel, Copilot paid conversion still low',
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
        zh: { score: '极强', analysis: '企业级SaaS锁定=经常性收入机器。Office 365+Azure+GitHub+LinkedIn形成的生态壁垒几乎不可能被打破。企业一旦上Azure，迁移成本极高。AI Copilot是未来增长的加速器。', moatType: '企业级SaaS锁定+云平台+网络效应', risk: 'AI资本开支$64B/年是一场豪赌。若AI变现不达预期（Copilot转化率低），FCF将显著承压。Azure增长已有减速迹象。' },
        en: { score: 'Very Strong', analysis: 'Enterprise SaaS lock-in = recurring revenue machine. Office 365 + Azure + GitHub + LinkedIn ecosystem is nearly impossible to break. Once on Azure, migration costs are prohibitive. AI Copilot is the future growth accelerator.', moatType: 'Enterprise SaaS lock-in + cloud platform + network effects', risk: 'AI capex $64B/yr is a massive bet. If AI monetization disappoints (low Copilot conversion), FCF will compress. Azure growth already showing early deceleration.' }
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
GOOGL: {
    exchange: 'NASDAQ',
    desc: { zh: '全球搜索引擎垄断+YouTube+Google Cloud，AI驱动的数字广告平台', en: 'Global search monopoly + YouTube + Google Cloud; AI-powered digital advertising platform' },
    revGrowth: '+18%', epsEst: '$2.82 vs est $2.61', grossMargin: '58.2%', dataCenterRev: 'Google Cloud $17.7B (+48% YoY), op margin 30.1%',
    peFwd: '26.6x', peg: '1.69', evEbitda: '19.95x', ps: '9.22x',
    netMargin: '32.8%', roe: '34.4%', fcfYield: '2.0%', divYield: '0.27%',
    valuationPctl: 68,
    summary: {
      zh: 'Alphabet Q4 2025营收$1138亿超预期,同比+18%。Google Cloud是最大亮点,营收增长48%至$177亿,运营利润率跃升至30.1%。Gemini AI月活突破7.5亿。全年净利$1322亿,EPS $10.91。YouTube广告略逊预期。2026年资本开支指引$1750-1850亿,较2025年翻倍,引发市场对回报率的担忧。云业务积压订单$2400亿,同比翻倍,AI变现前景明朗。核心风险:反垄断诉讼、搜索份额受AI竞品侵蚀、巨额Capex短期压制FCF。',
      en: 'Alphabet Q4 2025 revenue of $113.8B beat estimates (+18% YoY). Google Cloud was the star, surging 48% to $17.7B with operating margin expanding to 30.1%. Gemini AI hit 750M MAUs. Full-year net income reached $132.2B with EPS of $10.91. YouTube ads slightly missed. 2026 capex guidance of $175-185B (nearly 2x 2025) spooked markets on ROI concerns. Cloud backlog hit $240B, doubling YoY, validating AI monetization. Key risks: antitrust litigation, AI search competitors eroding share, massive capex compressing near-term FCF.',
    },
    verdict: { zh: '持有 — Cloud增长强劲但巨额Capex需观察回报', en: 'HOLD — Cloud momentum strong but massive capex ROI needs monitoring' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '搜索+云+AI三大引擎,数字广告仍是刚需,AI时代护城河加深' },
        { status: 'positive', q: '赚得更多？ — 大概率是', a: 'Cloud高速增长+AI变现开启,但$1750亿Capex需要时间兑现回报' },
        { status: 'positive', q: '护城河？ — 宽广', a: '搜索垄断+Android生态+YouTube+Cloud基础设施,多维度护城河' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'Search + Cloud + AI triple engine; digital ads remain essential; AI era deepens moat' },
        { status: 'positive', q: 'Earning more? — Likely yes', a: 'Cloud growing rapidly + AI monetization unlocking, but $175B capex needs time to yield returns' },
        { status: 'positive', q: 'Moat? — Wide', a: 'Search monopoly + Android ecosystem + YouTube + Cloud infrastructure; multi-dimensional moat' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '好生意', q: '搜索是"印钞机"式生意,Cloud是"卖铲子"给AI淘金者。段永平会喜欢这种躺着赚钱的商业模式,但$1750亿Capex让人犹豫。' },
        { name: 'Buffett', color: 'green', verdict: '优秀企业', q: '强大品牌+消费者习惯粘性+定价权。ROE 34%远超资本成本。Google Search是数字时代的"收费桥梁"。' },
        { name: 'Munger', color: 'yellow', verdict: '需要观察', q: '用逆向思维看:如果AI颠覆搜索,Alphabet会怎样?Cloud和Gemini是对冲,但转型期的资本配置效率存疑。激励机制是否对齐?' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Good business', q: 'Search is a "money printer" business; Cloud is "selling shovels" to AI gold rushers. DYP would love the business model but $175B capex gives pause.' },
        { name: 'Buffett', color: 'green', verdict: 'Excellent business', q: 'Strong brand + consumer habit stickiness + pricing power. 34% ROE far exceeds cost of capital. Google Search is the digital "toll bridge."' },
        { name: 'Munger', color: 'yellow', verdict: 'Needs watching', q: 'Invert: what if AI disrupts search? Cloud and Gemini hedge this, but capital allocation efficiency during transition is questionable. Are incentives aligned?' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q4',
      reportDate: '2026-02-04',
      zh: {
        revenue: { val: '$113.8B', yoy: '+18%', beat: '超预期$2.4B', note: 'Google Cloud增长48%是核心驱动,广告业务+13.5%' },
        eps: { val: '$2.82', yoy: '+30%', beat: '超预期$0.21', note: '全年EPS $10.91,同比+36%' },
        fcf: { val: '$24.6B(季)', margin: '21.6%', trend: '↓', note: '全年FCF $73.3B,受Capex增长压制' },
        grossMargin: { val: '58.2%', trend: '→', note: 'Cloud利润率大幅改善至30.1%拉升整体' },
        guidance: '2026 Capex $1750-1850亿,几乎是2025年的两倍;未提供营收指引',
        highlight: 'Google Cloud积压订单$2400亿翻倍增长,Gemini MAU 7.5亿,AI变现路径清晰',
        risk: '巨额Capex可能压制短期回报;YouTube广告不及预期;反垄断判决悬而未决',
      },
      en: {
        revenue: { val: '$113.8B', yoy: '+18%', beat: 'Beat by $2.4B', note: 'Google Cloud +48% was key driver; Ads +13.5%' },
        eps: { val: '$2.82', yoy: '+30%', beat: 'Beat by $0.21', note: 'Full year EPS $10.91, +36% YoY' },
        fcf: { val: '$24.6B(Q)', margin: '21.6%', trend: '↓', note: 'Full year FCF $73.3B, compressed by rising capex' },
        grossMargin: { val: '58.2%', trend: '→', note: 'Cloud margin expansion to 30.1% lifted the overall figure' },
        guidance: '2026 capex $175-185B, nearly 2x 2025 spend; no revenue guidance provided',
        highlight: 'Google Cloud backlog doubled to $240B; Gemini 750M MAUs; AI monetization path clear',
        risk: 'Massive capex may compress near-term returns; YouTube ads missed; antitrust ruling pending',
      },
    },
    financialHealth: {
      zh: {
        cashPosition: '现金及有价证券$1268亿,长期债务$465亿,净现金充裕',
        debtToEquity: '0.12x — 极低杠杆,财务非常安全',
        currentRatio: '1.95x — 流动性充足',
        capex: '2025年Capex约$750亿;2026指引$1750-1850亿,大幅加码AI基础设施',
        buyback: '持续回购,2025年回购约$620亿;股息年化$0.84/股,收益率0.27%',
        summary: '资产负债表极为健康,净现金$800亿+。唯一担忧是2026年Capex翻倍,但以Alphabet的盈利能力完全可承受。'
      },
      en: {
        cashPosition: '$126.8B cash & securities vs $46.5B long-term debt; strong net cash position',
        debtToEquity: '0.12x — extremely low leverage, very safe financially',
        currentRatio: '1.95x — ample liquidity',
        capex: '2025 capex ~$75B; 2026 guidance $175-185B, massive AI infrastructure investment',
        buyback: 'Consistent buybacks, ~$62B repurchased in 2025; dividend $0.84/share annualized, 0.27% yield',
        summary: 'Exceptionally healthy balance sheet with $80B+ net cash. Only concern is 2026 capex doubling, but Alphabet\'s earnings power can easily absorb it.'
      }
    },
    moat: {
      duan: {
        zh: { score: '极强', analysis: '搜索业务是终极"躺赚"模式——用户主动来找你,广告主必须投放。Cloud是"卖铲子"的好生意。关键是管理层是否足够专注,不在非核心领域浪费钱。', moatType: '平台网络效应+数据垄断', risk: 'AI搜索替代风险,管理层注意力分散' },
        en: { score: 'Very Strong', analysis: 'Search is the ultimate "sit back and earn" model — users come to you, advertisers must spend. Cloud is a great "sell shovels" business. Key is whether management stays focused and doesn\'t waste on non-core.', moatType: 'Platform network effects + data monopoly', risk: 'AI search substitution risk, management attention dilution' }
      },
      buffett: {
        zh: { score: '极强', analysis: 'Google是数字世界的"收费桥梁",所有互联网流量都要经过。品牌信任度极高,消费者"Google it"已成为动词。ROE 34%说明资本回报优秀。', moatType: '品牌+规模经济+转换成本', risk: '监管拆分风险,AI时代搜索入口可能改变' },
        en: { score: 'Very Strong', analysis: 'Google is the digital "toll bridge" — all internet traffic passes through. Brand trust is extreme; "Google it" is a verb. 34% ROE indicates excellent capital returns.', moatType: 'Brand + economies of scale + switching costs', risk: 'Regulatory breakup risk; AI may change the search entry point' }
      },
      munger: {
        zh: { score: '强', analysis: '多重心理偏见都有利于Google:习惯效应(默认搜索)、社会证明(大家都用)、禀赋效应(生态锁定)。但逆向思考:如果AI Agent替代搜索框,整个商业模式都要重构。', moatType: 'Lollapalooza效应:多重竞争优势叠加', risk: '过度自信偏误——管理层可能低估AI对搜索的颠覆速度' },
        en: { score: 'Strong', analysis: 'Multiple psychological biases favor Google: habit (default search), social proof (everyone uses it), endowment (ecosystem lock-in). But invert: if AI agents replace the search box, the entire business model needs rethinking.', moatType: 'Lollapalooza effect: multiple competitive advantages compounding', risk: 'Overconfidence bias — management may underestimate AI disruption speed to search' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$190-220', method: '10年DCF,WACC 9%,终端增长3%', note: '假设营收CAGR 12%,FCF margin逐步恢复至25%+' },
        peerComp: { value: '$180-210', method: '对标MSFT/META的Cloud和广告业务加总', note: 'Cloud按15x EV/Sales,广告按7x EV/Sales' },
        grahamMargin: '当前价约$195,接近合理估值区间上沿,安全边际较窄',
        verdict: '合理偏贵——Cloud增长支撑溢价,但巨额Capex压力下建议等回调5-10%再加仓'
      },
      en: {
        dcf: { value: '$190-220', method: '10yr DCF, WACC 9%, terminal growth 3%', note: 'Assumes revenue CAGR 12%, FCF margin gradually recovering to 25%+' },
        peerComp: { value: '$180-210', method: 'SOTP vs MSFT/META for Cloud + Ads segments', note: 'Cloud at 15x EV/Sales, Ads at 7x EV/Sales' },
        grahamMargin: 'Current price ~$195, near upper end of fair value range; thin margin of safety',
        verdict: 'Fair to slightly expensive — Cloud growth supports premium, but massive capex pressure suggests waiting for a 5-10% pullback'
      }
    },
  },

  AMZN: {
    exchange: 'NASDAQ',
    desc: { zh: '全球电商+AWS云计算+数字广告三引擎，物流网络覆盖全球', en: 'Global e-commerce + AWS cloud + digital ads triple engine; worldwide logistics network' },
    revGrowth: '+14%', epsEst: '$1.95 vs est $1.97', grossMargin: '50.2%', dataCenterRev: 'AWS $35.6B (+24% YoY), op margin 35%',
    peFwd: '27.8x', peg: '1.44', evEbitda: '13.73x', ps: '3.15x',
    netMargin: '10.8%', roe: '22.3%', fcfYield: '0.3%', divYield: '0.00%',
    valuationPctl: 62,
    summary: {
      zh: 'Amazon Q4 2025营收$2134亿超预期,同比+14%。AWS是核心引擎,收入$356亿增长24%,为13个季度最快增速。运营利润$250亿,利润率11.7%。全年净利$777亿,同比+31%。但EPS $1.95略低于预期$1.97。关键争议:2026年Capex指引$2000亿,较2025年增超50%,导致FCF骤降至$112亿(-70%)。AWS积压订单持续扩大,AI需求强劲,但投资者担忧巨额投资的回报时间表。',
      en: 'Amazon Q4 2025 revenue of $213.4B beat estimates (+14% YoY). AWS was the core engine at $35.6B (+24%), the fastest growth in 13 quarters. Operating income hit $25B with 11.7% margin. Full-year net income reached $77.7B (+31%). However, EPS of $1.95 slightly missed the $1.97 estimate. Key controversy: 2026 capex guidance of $200B (+50% YoY) crushed FCF to just $11.2B (-70%). AWS backlog keeps expanding on strong AI demand, but investors worry about the return timeline on massive investments.',
    },
    verdict: { zh: '持有 — AWS强劲但$2000亿Capex短期压制回报', en: 'HOLD — AWS strong but $200B capex compresses near-term returns' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '电商+云+广告+AI多元引擎,AWS是企业IT基础设施的必需品' },
        { status: 'uncertain', q: '赚得更多？ — 大概率但有波动', a: 'AWS和广告利润率优秀,但2026年$2000亿Capex短期大幅拖累FCF' },
        { status: 'positive', q: '护城河？ — 宽广', a: 'Prime生态+AWS先发优势+物流网络+数据飞轮,多重护城河' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'E-commerce + Cloud + Ads + AI multiple engines; AWS is essential enterprise IT infrastructure' },
        { status: 'uncertain', q: 'Earning more? — Likely but volatile', a: 'AWS and ads margins are excellent, but $200B capex in 2026 severely drags FCF short-term' },
        { status: 'positive', q: 'Moat? — Wide', a: 'Prime ecosystem + AWS first-mover + logistics network + data flywheel; multi-layered moat' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '好生意但太贵', q: 'AWS是顶级"卖铲子"生意,广告是"坐地收钱"。但Amazon长期薄利多销的风格让人不安——什么时候才真正赚大钱?$2000亿Capex太激进。' },
        { name: 'Buffett', color: 'yellow', verdict: '优秀企业但难估值', q: 'Bezos构建的消费者忠诚度堪比可口可乐,Prime粘性极强。但始终在"重新投资"利润,FCF yield仅0.3%,违背了"给股东回报"的原则。' },
        { name: 'Munger', color: 'green', verdict: '长期看好', q: '规模效应+网络效应+学习曲线效应叠加——这是典型的Lollapalooza。关键洞察:Amazon牺牲短期利润换长期垄断地位,这种"延迟满足"的策略长期有利。' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'Good biz but pricey', q: 'AWS is a top-tier "shovel" business; ads are "sit and collect." But Amazon\'s perpetual thin-margin strategy is unsettling — when do they actually print money? $200B capex is too aggressive.' },
        { name: 'Buffett', color: 'yellow', verdict: 'Great biz, hard to value', q: 'Consumer loyalty Bezos built rivals Coca-Cola; Prime stickiness is extreme. But constantly "reinvesting" profits, 0.3% FCF yield violates the principle of returning capital to shareholders.' },
        { name: 'Munger', color: 'green', verdict: 'Long-term bullish', q: 'Scale + network effects + learning curve compound — classic Lollapalooza. Key insight: Amazon sacrifices short-term profit for long-term monopoly position; this "delayed gratification" strategy pays off over time.' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q4',
      reportDate: '2026-02-05',
      zh: {
        revenue: { val: '$213.4B', yoy: '+14%', beat: '超预期$2.1B', note: 'AWS $356亿+24%,广告$213亿+21%,北美电商稳健' },
        eps: { val: '$1.95', yoy: '+5%', beat: '略低于预期$0.02', note: '全年EPS $7.12,同比+31%' },
        fcf: { val: '$11.2B(年)', margin: '1.6%', trend: '↓', note: '全年FCF从$37.3B骤降至$11.2B,受$1318亿Capex压制' },
        grossMargin: { val: '50.2%', trend: '↑', note: 'AWS和广告高利润业务占比提升拉动毛利率改善' },
        guidance: 'Q1 2026营收指引$151-155.5B(+5-9%);2026 Capex约$2000亿',
        highlight: 'AWS增长24%为13季最快;运营利润$250亿创新高;广告业务成第三增长曲线',
        risk: 'EPS略低于预期;$2000亿Capex令人震惊;FCF暴跌70%;Q1指引增速放缓至5-9%',
      },
      en: {
        revenue: { val: '$213.4B', yoy: '+14%', beat: 'Beat by $2.1B', note: 'AWS $35.6B +24%, Ads $21.3B +21%, NA e-commerce steady' },
        eps: { val: '$1.95', yoy: '+5%', beat: 'Missed by $0.02', note: 'Full year EPS $7.12, +31% YoY' },
        fcf: { val: '$11.2B(FY)', margin: '1.6%', trend: '↓', note: 'Annual FCF plunged from $37.3B to $11.2B due to $131.8B capex' },
        grossMargin: { val: '50.2%', trend: '↑', note: 'Higher-margin AWS and ads business mix driving improvement' },
        guidance: 'Q1 2026 revenue guidance $151-155.5B (+5-9%); 2026 capex ~$200B',
        highlight: 'AWS +24% fastest in 13 quarters; record $25B operating income; ads becoming 3rd growth curve',
        risk: 'EPS slight miss; staggering $200B capex; FCF down 70%; Q1 guidance decelerating to 5-9%',
      },
    },
    financialHealth: {
      zh: {
        cashPosition: '现金及等价物约$780亿,长期债务约$580亿',
        debtToEquity: '0.43x — 杠杆适中,以Amazon的现金流生成能力完全可控',
        currentRatio: '1.06x — 偏紧但符合零售行业特征',
        capex: '2025年Capex $1318亿;2026指引$2000亿,几乎全部投向AI和云基础设施',
        buyback: '无股息;2025年回购较少,优先投资增长',
        summary: '资产负债表稳健,但$2000亿年度Capex是史无前例的。运营现金流$1395亿强劲,关键看投资回报能否兑现。'
      },
      en: {
        cashPosition: '~$78B cash & equivalents vs ~$58B long-term debt',
        debtToEquity: '0.43x — moderate leverage, well-manageable given Amazon\'s cash generation',
        currentRatio: '1.06x — tight but typical for retail industry',
        capex: '2025 capex $131.8B; 2026 guidance ~$200B, nearly all for AI and cloud infrastructure',
        buyback: 'No dividend; minimal buybacks in 2025, prioritizing growth investment',
        summary: 'Solid balance sheet, but $200B annual capex is unprecedented. Operating cash flow of $139.5B is strong; key is whether investment returns materialize.'
      }
    },
    moat: {
      duan: {
        zh: { score: '强', analysis: 'AWS是全球最大的"卖铲子"生意——企业上云是不可逆趋势。Prime是消费者的"习惯税"。问题是Bezos/Jassy太喜欢花钱,净利润率才10.8%,什么时候真正像印钞机一样赚钱?', moatType: '规模经济+生态锁定', risk: '管理层持续重投资,FCF长期被压制' },
        en: { score: 'Strong', analysis: 'AWS is the world\'s largest "shovel" business — cloud migration is irreversible. Prime is a consumer "habit tax." Problem is Bezos/Jassy love spending; net margin only 10.8%. When will it actually print money?', moatType: 'Economies of scale + ecosystem lock-in', risk: 'Management keeps reinvesting heavily, suppressing FCF long-term' }
      },
      buffett: {
        zh: { score: '中等偏强', analysis: 'Prime会员粘性极强,消费者一旦加入很少退出。AWS企业客户转换成本高。但利润率始终不高,股东回报主要靠股价升值而非现金分配,不太符合"奶牛"标准。', moatType: '消费者习惯+高转换成本', risk: '利润长期被再投资消耗,股东实际回报依赖增长预期' },
        en: { score: 'Moderate-Strong', analysis: 'Prime membership stickiness is extreme; consumers rarely cancel once joined. AWS enterprise clients face high switching costs. But margins remain modest; shareholder returns depend on price appreciation not cash distributions.', moatType: 'Consumer habit + high switching costs', risk: 'Profits perpetually reinvested; actual shareholder returns depend on growth expectations' }
      },
      munger: {
        zh: { score: '极强', analysis: '用逆向思维:竞争对手要打败Amazon需要同时复制物流网络+云基础设施+Prime生态+广告平台+数据飞轮,几乎不可能。这是多重竞争优势叠加的Lollapalooza效应。延迟满足战略虽然短期不讨好,但长期会形成无法逾越的壁垒。', moatType: 'Lollapalooza:规模+网络+学习曲线多重叠加', risk: '制度性惯性——组织过大可能导致创新放缓和官僚化' },
        en: { score: 'Very Strong', analysis: 'Invert: to beat Amazon a competitor must simultaneously replicate logistics + cloud + Prime + ads + data flywheel — nearly impossible. Classic Lollapalooza of multiple advantages compounding. Delayed gratification strategy is unpleasant short-term but builds insurmountable barriers long-term.', moatType: 'Lollapalooza: scale + network + learning curve compounding', risk: 'Institutional imperative — excessive size may slow innovation and breed bureaucracy' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$210-250', method: '10年DCF,WACC 9.5%,终端增长3.5%', note: '假设营收CAGR 11%,FCF margin 2028年后恢复至10%+' },
        peerComp: { value: '$200-230', method: 'SOTP:AWS按25x EBITDA + 电商按1.5x Sales + 广告按15x EBITDA', note: 'AWS占估值约60%' },
        grahamMargin: '当前价约$213,处于合理估值区间中段,安全边际适中',
        verdict: '合理估值——PEG 1.44有吸引力,但$2000亿Capex的回报不确定性要求折扣。建议$190以下积极建仓。'
      },
      en: {
        dcf: { value: '$210-250', method: '10yr DCF, WACC 9.5%, terminal growth 3.5%', note: 'Assumes revenue CAGR 11%, FCF margin recovering to 10%+ post-2028' },
        peerComp: { value: '$200-230', method: 'SOTP: AWS at 25x EBITDA + e-commerce at 1.5x Sales + ads at 15x EBITDA', note: 'AWS accounts for ~60% of valuation' },
        grahamMargin: 'Current price ~$213, mid-range of fair value; moderate margin of safety',
        verdict: 'Fairly valued — PEG of 1.44 is attractive, but $200B capex return uncertainty demands a discount. Accumulate below $190.'
      }
    },
  },

  META: {
    exchange: 'NASDAQ',
    desc: { zh: '全球最大社交媒体平台，Facebook+Instagram+WhatsApp+Reality Labs元宇宙', en: 'World\'s largest social media; Facebook, Instagram, WhatsApp, and Reality Labs metaverse' },
    revGrowth: '+24%', epsEst: '$8.88 vs est $8.19', grossMargin: '82.1%', dataCenterRev: 'Family of Apps $59.1B; Reality Labs $0.79B (loss $6B)',
    peFwd: '22.4x', peg: '1.09', evEbitda: '16.0x', ps: '8.55x',
    netMargin: '30.1%', roe: '30.2%', fcfYield: '2.7%', divYield: '0.30%',
    valuationPctl: 55,
    summary: {
      zh: 'Meta Q4 2025营收$599亿超预期,同比+24%,连续多季度保持20%+增长。EPS $8.88大超预期$8.19。全年营收突破$2010亿,净利润约$606亿。AI驱动的广告推荐系统持续提升ARPU,Advantage+广告产品表现强劲。Reality Labs季度亏损$60亿,全年亏损$192亿,但管理层暗示亏损已见顶。Q1 2026指引$535-565亿(+14-20%)。2026年Capex $1150-1350亿。PEG仅1.09是大型科技股中最具吸引力的。',
      en: 'Meta Q4 2025 revenue of $59.9B beat estimates (+24% YoY), maintaining 20%+ growth for multiple consecutive quarters. EPS of $8.88 crushed the $8.19 estimate. Full-year revenue surpassed $201B with ~$60.6B net income. AI-powered ad recommendation drives rising ARPU; Advantage+ ad products performing strongly. Reality Labs lost $6B in Q4, $19.2B for the year, but management hinted losses have peaked. Q1 2026 guidance $53.5-56.5B (+14-20%). 2026 capex $115-135B. PEG of just 1.09 is the most attractive among mega-cap tech.',
    },
    verdict: { zh: '买入 — AI广告变现强劲,PEG最具性价比', en: 'BUY — AI ad monetization strong, best PEG among mega-caps' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '全球40亿用户基数+数字广告持续增长,社交媒体是人类刚需' },
        { status: 'positive', q: '赚得更多？ — 是', a: 'AI广告推荐提升效率,ARPU还有大量增长空间;Reality Labs亏损见顶' },
        { status: 'positive', q: '护城河？ — 宽广', a: '社交网络效应极强,用户关系链难以迁移,广告生态系统粘性高' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: '4B+ global users + growing digital ads; social media is a human necessity' },
        { status: 'positive', q: 'Earning more? — Yes', a: 'AI ad recommendations boost efficiency; ARPU has significant upside; Reality Labs losses peaking' },
        { status: 'positive', q: 'Moat? — Wide', a: 'Social network effects are extremely strong; user social graphs hard to migrate; ad ecosystem highly sticky' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '优秀生意', q: 'Meta的广告业务是顶级"印钞机"——82%毛利率,用户免费提供内容和数据,广告主争相竞价。这就是段永平说的"不需要太多资本就能赚大钱"的生意。' },
        { name: 'Buffett', color: 'green', verdict: '强力买入', q: '类似可口可乐的消费者特许经营权——40亿人的日常习惯。品牌可能不如可口可乐经典,但用户粘性更强。30%净利润率+22x远期PE,估值合理。' },
        { name: 'Munger', color: 'green', verdict: '优质资产', q: '从心智模型看:社交网络具有"临界质量"效应,一旦超过临界点,竞争对手几乎不可能撼动。Instagram+WhatsApp的组合像是双保险。但需警惕:年轻用户是否在向TikTok等平台流失?' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Excellent business', q: 'Meta\'s ads business is a top-tier "money printer" — 82% gross margin, users provide free content and data, advertisers bid competitively. This is what DYP calls "making big money without much capital."' },
        { name: 'Buffett', color: 'green', verdict: 'Strong buy', q: 'Similar to Coca-Cola consumer franchise — 4B people\'s daily habit. Brand may not be as iconic as Coke, but user stickiness is stronger. 30% net margin + 22x fwd PE, valuation is reasonable.' },
        { name: 'Munger', color: 'green', verdict: 'Quality asset', q: 'Mental model: social networks have "critical mass" effect — once past the tipping point, competitors can hardly dislodge. Instagram + WhatsApp combo is like double insurance. But watch: are younger users migrating to TikTok?' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q4',
      reportDate: '2026-01-28',
      zh: {
        revenue: { val: '$59.9B', yoy: '+24%', beat: '超预期$2.9B', note: 'Family of Apps贡献$59.1B;AI广告推荐系统驱动ARPU提升' },
        eps: { val: '$8.88', yoy: '+9%', beat: '超预期$0.69', note: '全年EPS $23.98;运营利润率41%' },
        fcf: { val: '$14.1B(季)', margin: '23.5%', trend: '→', note: '全年FCF约$461亿;受$722亿Capex影响但仍健康' },
        grossMargin: { val: '82.1%', trend: '→', note: '广告业务毛利率极高且稳定,Reality Labs拖累有限' },
        guidance: 'Q1 2026营收$535-565亿(+14-20%);2026 Capex $1150-1350亿;Reality Labs亏损见顶',
        highlight: 'AI广告变现效率持续提升;Advantage+产品强劲;用户增长稳健;运营利润率41%',
        risk: 'Reality Labs年亏$192亿;总费用同比+40%;2026 Capex大幅增加;监管和隐私风险',
      },
      en: {
        revenue: { val: '$59.9B', yoy: '+24%', beat: 'Beat by $2.9B', note: 'Family of Apps contributed $59.1B; AI ad recommendations driving ARPU gains' },
        eps: { val: '$8.88', yoy: '+9%', beat: 'Beat by $0.69', note: 'Full year EPS $23.98; operating margin 41%' },
        fcf: { val: '$14.1B(Q)', margin: '23.5%', trend: '→', note: 'Full year FCF ~$46.1B; impacted by $72.2B capex but still healthy' },
        grossMargin: { val: '82.1%', trend: '→', note: 'Ad business gross margin extremely high and stable; Reality Labs drag limited' },
        guidance: 'Q1 2026 revenue $53.5-56.5B (+14-20%); 2026 capex $115-135B; Reality Labs losses peaking',
        highlight: 'AI ad monetization efficiency improving; Advantage+ products strong; steady user growth; 41% op margin',
        risk: 'Reality Labs $19.2B annual loss; total expenses +40% YoY; 2026 capex rising sharply; regulatory and privacy risks',
      },
    },
    financialHealth: {
      zh: {
        cashPosition: '现金及有价证券$816亿,债务$587亿,净现金$229亿',
        debtToEquity: '0.47x — 杠杆适中,完全可控',
        currentRatio: '2.68x — 流动性非常充足',
        capex: '2025年Capex $722亿;2026指引$1150-1350亿,主要投向AI基础设施',
        buyback: '2025年回购$263亿;季度股息$0.525/股;股息率0.30%',
        summary: '财务状况优秀。82%毛利率提供巨大的利润缓冲,即使Reality Labs每年亏损$190亿也不影响整体健康。现金流充沛,有余力同时回购+分红+重投资。'
      },
      en: {
        cashPosition: '$81.6B cash & securities vs $58.7B debt; $22.9B net cash',
        debtToEquity: '0.47x — moderate leverage, well under control',
        currentRatio: '2.68x — very ample liquidity',
        capex: '2025 capex $72.2B; 2026 guidance $115-135B, primarily for AI infrastructure',
        buyback: '$26.3B repurchased in 2025; quarterly dividend $0.525/share; 0.30% yield',
        summary: 'Excellent financial health. 82% gross margin provides enormous profit cushion; even $19B annual Reality Labs losses don\'t threaten overall health. Cash flow ample for buybacks + dividends + reinvestment simultaneously.'
      }
    },
    moat: {
      duan: {
        zh: { score: '极强', analysis: '这是段永平最喜欢的生意类型——用户自己创造内容,平台几乎零边际成本地卖广告,82%毛利率证明了一切。不需要工厂、不需要库存、不需要物流,纯粹的"轻资产印钞机"。', moatType: '网络效应+零边际成本', risk: '年轻用户注意力转移,监管对数据使用的限制' },
        en: { score: 'Very Strong', analysis: 'This is DYP\'s favorite business type — users create content, platform sells ads at near-zero marginal cost, 82% gross margin proves it all. No factories, no inventory, no logistics — a pure "asset-light money printer."', moatType: 'Network effects + zero marginal cost', risk: 'Young user attention shifting, regulatory data use restrictions' }
      },
      buffett: {
        zh: { score: '极强', analysis: '40亿用户的社交关系链构成了最强的消费者"习惯"。Instagram和WhatsApp在各自领域都是主导地位。广告主没有其他渠道能触达如此精准的受众。这是数字时代的报纸广告垄断。', moatType: '消费者习惯+广告主依赖', risk: '品牌形象争议(隐私、社会影响),可能影响监管和用户信任' },
        en: { score: 'Very Strong', analysis: '4B users\' social graphs form the strongest consumer "habit." Instagram and WhatsApp dominate their respective domains. No other channel offers advertisers such precise audience targeting. This is the digital-age newspaper advertising monopoly.', moatType: 'Consumer habit + advertiser dependency', risk: 'Brand reputation concerns (privacy, social impact) may trigger regulation and erode trust' }
      },
      munger: {
        zh: { score: '极强', analysis: '社交网络展现了完美的"临界质量"心智模型——一旦你的朋友都在上面,你不可能离开。多重心理偏见支持粘性:社会认同、FOMO、损失厌恶。Zuckerberg展现了罕见的适应能力(Stories、Reels都是成功抄袭)。逆向思考:如果Meta失败会是什么原因?最可能是监管拆分,而非竞争。', moatType: '临界质量+多重心理偏见锁定', risk: '逆向风险:监管拆分可能性>竞争替代可能性' },
        en: { score: 'Very Strong', analysis: 'Social networks exhibit the perfect "critical mass" mental model — once all your friends are on it, you can\'t leave. Multiple psychological biases sustain stickiness: social proof, FOMO, loss aversion. Zuckerberg shows rare adaptability (Stories, Reels were successful copies). Invert: if Meta fails, why? Most likely regulatory breakup, not competition.', moatType: 'Critical mass + multiple psychological biases lock-in', risk: 'Inverted risk: regulatory breakup probability > competitive displacement probability' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$680-780', method: '10年DCF,WACC 9%,终端增长3%', note: '假设营收CAGR 15%,FCF margin稳定在22-25%' },
        peerComp: { value: '$650-750', method: '对标GOOGL广告业务估值+同业P/E', note: '22x远期PE vs GOOGL 27x,有折价空间' },
        grahamMargin: '当前价约$680,处于合理估值区间下沿,安全边际充足',
        verdict: '低估——PEG 1.09是Mag7中最低,AI广告增长趋势确定性高,Reality Labs亏损见顶是额外期权。建议积极买入。'
      },
      en: {
        dcf: { value: '$680-780', method: '10yr DCF, WACC 9%, terminal growth 3%', note: 'Assumes revenue CAGR 15%, FCF margin stable at 22-25%' },
        peerComp: { value: '$650-750', method: 'Comp to GOOGL ad biz valuation + peer P/E', note: '22x fwd PE vs GOOGL 27x, room for re-rating' },
        grahamMargin: 'Current price ~$680, near lower end of fair value range; ample margin of safety',
        verdict: 'Undervalued — PEG of 1.09 is lowest among Mag 7; AI ad growth trajectory has high certainty; Reality Labs loss peak is free optionality. Recommend active buying.'
      }
    },
  },

  TSM: {
    exchange: 'NYSE',
    desc: { zh: '全球最大半导体代工厂，垄断3nm/5nm先进制程，AI芯片必经之路', en: 'World\'s largest chip foundry; monopoly on 3nm/5nm advanced nodes; essential for AI chips' },
    revGrowth: '+20.5%', epsEst: '$2.24 vs est $2.17 (ADR)', grossMargin: '62.3%', dataCenterRev: 'HPC(含AI) 53%营收;3nm占28%晶圆收入',
    peFwd: '26.2x', peg: '1.52', evEbitda: '19.0x', ps: '14.2x',
    netMargin: '45.1%', roe: '35.2%', fcfYield: '1.2%', divYield: '0.87%',
    valuationPctl: 72,
    summary: {
      zh: 'TSMC Q4 2025营收NT$1.046万亿(约$337亿),环比+5.7%,同比+20.5%。毛利率62.3%环比改善2.8ppt,运营利润率54%。全年营收增长35.9%至约$1213亿,净利$547亿。3nm贡献28%晶圆收入,先进制程(7nm及以下)占77%。AI加速器占2025年收入high-teens%。EPS NT$19.50(ADR约$3.14)。2026年Capex $520-560亿,营收预计增长接近30%。Q1 2026指引毛利率63-65%,显示定价权持续增强。',
      en: 'TSMC Q4 2025 revenue NT$1.046T (~$33.7B), +5.7% QoQ, +20.5% YoY. Gross margin 62.3%, up 2.8ppt QoQ; operating margin 54%. Full-year revenue grew 35.9% to ~$121.3B, net income $54.7B. N3 contributed 28% of wafer revenue; advanced nodes (7nm and below) at 77%. AI accelerators were high-teens % of 2025 revenue. EPS NT$19.50 (ADR ~$3.14). 2026 capex $52-56B; revenue expected to grow ~30%. Q1 2026 gross margin guidance 63-65%, showing continued pricing power.',
    },
    verdict: { zh: '持有 — AI需求确定但估值已反映增长预期', en: 'HOLD — AI demand certain but valuation already prices in growth' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '半导体制造是所有数字经济的基石,AI时代更加不可或缺' },
        { status: 'positive', q: '赚得更多？ — 是', a: 'AI加速器需求爆发+先进制程溢价+客户集中带来定价权,毛利率持续扩张' },
        { status: 'positive', q: '护城河？ — 极宽', a: '先进制程技术领先至少2-3年,客户无替代选择,资本壁垒极高' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'Semiconductor manufacturing is the bedrock of all digital economy; even more essential in AI era' },
        { status: 'positive', q: 'Earning more? — Yes', a: 'AI accelerator demand explosion + advanced node premium + customer concentration = pricing power; margins expanding' },
        { status: 'positive', q: 'Moat? — Extremely wide', a: 'Advanced process tech leads by 2-3 years minimum; customers have no alternatives; extreme capital barriers' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '顶级铲子生意', q: '这是"卖铲子"商业模式的巅峰——所有AI公司都需要TSMC代工芯片,无论谁赢了AI竞赛,TSMC都赚钱。45%净利润率证明定价权极强。唯一担忧是地缘政治。' },
        { name: 'Buffett', color: 'yellow', verdict: '好生意但有风险', q: '技术护城河极深,ROE 35%优秀。但资本密集度太高(每年$500亿+Capex),且台海地缘风险是无法通过分析消除的"黑天鹅"。这不完全在能力圈内。' },
        { name: 'Munger', color: 'green', verdict: '稀缺资产', q: '用"有限且不可替代"模型分析:全球能做3nm及以下的只有TSMC一家,这种独占性在工业史上极为罕见。规模效应+学习曲线使追赶者几乎不可能缩小差距。逆向思考:唯一破坏性风险是地缘冲突。' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Ultimate shovel biz', q: 'This is the pinnacle of the "sell shovels" model — every AI company needs TSMC to fab chips. Whoever wins the AI race, TSMC profits. 45% net margin proves extreme pricing power. Only concern is geopolitics.' },
        { name: 'Buffett', color: 'yellow', verdict: 'Good biz with risk', q: 'Tech moat is extremely deep; 35% ROE is excellent. But very capital-intensive ($50B+ annual capex), and Taiwan Strait geopolitical risk is a "black swan" that analysis cannot eliminate. Not entirely within circle of competence.' },
        { name: 'Munger', color: 'green', verdict: 'Scarce asset', q: 'Using the "scarce and irreplaceable" mental model: TSMC is the only company that can do 3nm and below. This monopoly is historically rare in industry. Scale + learning curve make it nearly impossible for chasers to close the gap. Invert: the only destructive risk is geopolitical conflict.' },
      ],
    },
    earnings: {
      quarter: 'FY2025 Q4',
      reportDate: '2026-01-16',
      zh: {
        revenue: { val: '$33.7B', yoy: '+20.5%', beat: '超指引上沿', note: '全年$1213亿+35.9%;HPC占53%,智能手机35%' },
        eps: { val: 'NT$19.50 ($2.24 ADR)', yoy: '+35%', beat: '超市场预期', note: '全年EPS NT$62.79,同比+35.9%' },
        fcf: { val: 'NT$1.003T(年)', margin: '25.8%', trend: '↑', note: '全年FCF约$310亿,同比+15.2%' },
        grossMargin: { val: '62.3%', trend: '↑', note: '环比+2.8ppt;Q1 2026指引63-65%,定价权持续增强' },
        guidance: 'Q1 2026营收$346-358亿;毛利率63-65%;2026年Capex $520-560亿;全年营收增长约30%',
        highlight: '3nm占28%收入;先进制程77%;AI加速器需求强劲;毛利率持续扩张;2026展望乐观',
        risk: '地缘政治风险(台海);智能手机季节性;客户集中度高(NVDA+AAPL);美国建厂成本溢价',
      },
      en: {
        revenue: { val: '$33.7B', yoy: '+20.5%', beat: 'Beat top of guidance', note: 'Full year $121.3B +35.9%; HPC 53%, smartphone 35%' },
        eps: { val: 'NT$19.50 ($2.24 ADR)', yoy: '+35%', beat: 'Beat consensus', note: 'Full year EPS NT$62.79, +35.9% YoY' },
        fcf: { val: 'NT$1.003T(FY)', margin: '25.8%', trend: '↑', note: 'Full year FCF ~$31B, +15.2% YoY' },
        grossMargin: { val: '62.3%', trend: '↑', note: '+2.8ppt QoQ; Q1 2026 guidance 63-65%, showing continued pricing power' },
        guidance: 'Q1 2026 revenue $34.6-35.8B; GM 63-65%; 2026 capex $52-56B; full year revenue ~+30%',
        highlight: 'N3 at 28% of revenue; advanced nodes 77%; strong AI accelerator demand; margin expansion; bullish 2026 outlook',
        risk: 'Geopolitical risk (Taiwan Strait); smartphone seasonality; customer concentration (NVDA+AAPL); US fab cost premium',
      },
    },
    financialHealth: {
      zh: {
        cashPosition: '现金充裕,长期资产以晶圆厂设备为主',
        debtToEquity: '0.24x — 极低杠杆,几乎无负债风险',
        currentRatio: '2.57x — 流动性非常健康',
        capex: '2025年Capex约$380亿;2026指引$520-560亿,70-80%用于先进制程',
        buyback: '不回购;2026年股息提高28%至NT$18/股,ADR年化约$3.07,收益率0.87%',
        summary: '财务极为稳健。45%净利润率+低负债+强FCF。Capex虽高但以TSMC的盈利能力和独占地位,投资回报有高确定性。'
      },
      en: {
        cashPosition: 'Ample cash reserves; long-term assets dominated by fab equipment',
        debtToEquity: '0.24x — extremely low leverage, virtually no debt risk',
        currentRatio: '2.57x — very healthy liquidity',
        capex: '2025 capex ~$38B; 2026 guidance $52-56B, 70-80% for advanced process tech',
        buyback: 'No buybacks; 2026 dividend raised 28% to NT$18/share, ADR annualized ~$3.07, 0.87% yield',
        summary: 'Extremely solid financials. 45% net margin + low debt + strong FCF. Capex is high but with TSMC\'s profitability and monopoly position, investment returns have high certainty.'
      }
    },
    moat: {
      duan: {
        zh: { score: '极强', analysis: '终极"卖铲子"生意——无论NVIDIA、Apple、AMD还是高通,都必须找TSMC代工。45%净利润率说明定价权绝对强势。这种"你不找我就没人能做"的生意模式,段永平会给满分。', moatType: '技术垄断+资本壁垒', risk: '地缘政治是唯一无法用商业分析解决的风险' },
        en: { score: 'Very Strong', analysis: 'Ultimate "shovel" business — whether NVIDIA, Apple, AMD, or Qualcomm, all must use TSMC. 45% net margin proves absolute pricing power. This "come to me or no one can do it" model would get full marks from DYP.', moatType: 'Technological monopoly + capital barriers', risk: 'Geopolitics is the only risk that business analysis cannot resolve' }
      },
      buffett: {
        zh: { score: '强', analysis: 'ROE 35%证明资本回报优秀。TSMC是半导体世界的"唯一桥梁",类似伯克希尔喜欢的公用事业型垄断。但过于资本密集,且台海风险超出了"可理解"的范畴——巴菲特曾短暂持有后卖出,正是因为地缘不确定性。', moatType: '必需品垄断+规模经济', risk: '台海风险无法量化,超出能力圈;资本密集度高于理想水平' },
        en: { score: 'Strong', analysis: 'ROE of 35% proves excellent capital returns. TSMC is the "only bridge" in the semiconductor world, similar to the utility monopolies Berkshire favors. But too capital-intensive, and Taiwan risk exceeds "understandable" bounds — Buffett briefly held then sold precisely due to geopolitical uncertainty.', moatType: 'Essential monopoly + economies of scale', risk: 'Taiwan risk unquantifiable, outside circle of competence; capital intensity higher than ideal' }
      },
      munger: {
        zh: { score: '极强', analysis: '从多个心智模型看都是顶级资产:1)规模效应——越大越强;2)学习曲线——每一代制程的know-how不可复制;3)临界质量——客户生态形成正反馈;4)有限供给——全球仅此一家能做最先进芯片。这是工业史上罕见的"赢家通吃"格局。', moatType: '多重心智模型共振:规模+学习曲线+有限供给', risk: '地缘冲突是唯一的"致命一击"风险,但概率虽低影响巨大' },
        en: { score: 'Very Strong', analysis: 'Top-tier asset across multiple mental models: 1) Scale effects — bigger is stronger; 2) Learning curve — each process node\'s know-how is unreplicable; 3) Critical mass — customer ecosystem creates positive feedback; 4) Scarce supply — only company globally for cutting-edge chips. Historically rare "winner-take-all" dynamic.', moatType: 'Multi-model resonance: scale + learning curve + scarce supply', risk: 'Geopolitical conflict is the only "knockout blow" risk — low probability but catastrophic impact' }
      }
    },
    valuation: {
      zh: {
        dcf: { value: '$190-230 (ADR)', method: '10年DCF,WACC 10%(含地缘风险溢价),终端增长3%', note: '假设营收CAGR 18%,FCF margin稳定25%+' },
        peerComp: { value: '$200-240 (ADR)', method: '对标ASML半导体设备估值+历史PE区间', note: '26x远期PE处于5年历史中位偏上' },
        grahamMargin: '当前ADR价格约$195,处于DCF合理区间中段,安全边际适中但需对冲地缘风险',
        verdict: '合理偏高——AI需求确定性支撑溢价,但26x PE已price in大部分增长。建议$170以下加仓或通过期权对冲地缘风险后建仓。'
      },
      en: {
        dcf: { value: '$190-230 (ADR)', method: '10yr DCF, WACC 10% (incl. geo-risk premium), terminal growth 3%', note: 'Assumes revenue CAGR 18%, FCF margin stable 25%+' },
        peerComp: { value: '$200-240 (ADR)', method: 'Comp to ASML semi-equipment valuation + historical PE range', note: '26x fwd PE at upper end of 5yr historical range' },
        grahamMargin: 'Current ADR ~$195, mid-range of DCF fair value; moderate margin of safety but geopolitical hedging needed',
        verdict: 'Fair to slightly rich — AI demand certainty supports premium, but 26x PE prices in most growth. Accumulate below $170 or build position with geopolitical hedges via options.'
      }
    },
  },
  COST: {
    exchange: 'NASDAQ',
    desc: { zh: '全球第三大零售商，会员制仓储超市，以极低毛利率换取极高会员忠诚度', en: 'World\'s 3rd largest retailer; membership warehouse club trading ultra-low margins for extreme loyalty' },
    revGrowth: '+9.1%', epsEst: '$4.02 vs est $4.09', grossMargin: '12.8%', dataCenterRev: 'E-commerce +20.9% YoY; membership fee $1.19B (+7.2%)',
    peFwd: '49.4x', peg: '5.35', evEbitda: '33.8x', ps: '15.3x',
    netMargin: '2.9%', roe: '30%', fcfYield: '1.8%', divYield: '0.51%',
    valuationPctl: 92,
    summary: {
      zh: 'Costco FY2025 Q2营收$62.5B同比+9.1%，可比销售+6.8%，电商+20.9%领先，会员费收入$1.19B。EPS $4.02略低于预期$4.09，但整体基本面依然强劲。会员续费率超90%，付费会员7840万人。自由现金流年化$7.8B（+18%）。公司以极低毛利率（~12.8%）换取极高会员黏性与周转效率，ROE 30%，ROIC 35%。估值处历史高位，Forward PE 49x反映市场对长期复利增长的信心。',
      en: 'Costco Q2 FY2025 revenue hit $62.5B (+9.1% YoY) with comparable sales +6.8% and e-commerce surging +20.9%. Membership fee income rose to $1.19B. EPS of $4.02 slightly missed the $4.09 estimate, but fundamentals remain rock-solid. Renewal rates exceed 90% with 78.4M paid members. Annual FCF reached $7.8B (+18%). The business model trades ultra-low gross margins (~12.8%) for exceptional member loyalty and capital efficiency (ROE 30%, ROIC 35%). Valuation sits at historic highs with forward P/E of 49x, reflecting the market\'s premium for Costco\'s durable compounding.'
    },
    verdict: { zh: '长期优质，但估值偏贵 — 回调至45x PE以下更安全', en: 'Outstanding long-term compounder, but valuation stretched — safer below 45x forward PE' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '会员制零售模式极具黏性，续费率>90%，全球仓库持续扩张，消费必需品需求刚性' },
        { status: 'positive', q: '赚得更多？ — 大概率', a: '全球开店+电商增长+会员费提价周期+Kirkland自有品牌扩张，收入长期复合增长8-10%' },
        { status: 'positive', q: '护城河？ — 极宽', a: '规模采购优势+会员锁定+品牌忠诚度+极低运营成本结构，竞争者难以复制' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'Membership retail model with 90%+ renewal rate, global warehouse expansion, essential goods demand is non-discretionary' },
        { status: 'positive', q: 'Earning more? — Very likely', a: 'Global store growth + e-commerce + membership fee hikes + Kirkland brand expansion drive 8-10% long-term revenue CAGR' },
        { status: 'positive', q: 'Moat? — Very wide', a: 'Scale purchasing power + member lock-in + brand loyalty + ultra-low cost structure create a near-impossible-to-replicate model' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '核心持仓', q: '段永平长期重仓Costco，认为其商业模式是"消费者代理人"，永远站在用户一边，这是最好的生意模式之一' },
        { name: 'Buffett', color: 'green', verdict: '优质生意', q: '巴菲特多次称赞Costco，认为其会员模式创造了持久竞争优势，唯一顾虑是当前估值偏高' },
        { name: 'Munger', color: 'green', verdict: '挚爱企业', q: '芒格曾任Costco董事近20年，视其为最完美的零售企业——低价、高品质、高效率的极致组合' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Core holding', q: 'Duan Yongping holds Costco as a core position, viewing its model as a "consumer agent" that always sides with the customer — one of the best business models' },
        { name: 'Buffett', color: 'green', verdict: 'Great business', q: 'Buffett has praised Costco repeatedly, seeing its membership model as a durable competitive advantage; only concern is current valuation premium' },
        { name: 'Munger', color: 'green', verdict: 'Beloved company', q: 'Munger served on Costco\'s board for nearly 20 years, calling it the most perfect retailer — the ultimate combination of low price, high quality, and efficiency' },
      ],
    },
    earnings: {
      quarter: 'Q2 FY2025 (Dec-Feb)', reportDate: '2025-03-06',
      zh: {
        revenue: { val: '$62.5B', yoy: '+9.1%', beat: '超预期$0.3B', note: '可比销售+6.8%，电商+20.9%，非食品品类增长mid-teens' },
        eps: { val: '$4.02', yoy: '+2.6%', beat: '低于预期$0.07', note: 'EPS $4.02 vs 预期$4.09，主要因SG&A略高及汇率影响' },
        fcf: { val: '$7.8B(年化)', margin: '3.2%', trend: '↑', note: '年化FCF同比+18%，资本配置高效' },
        grossMargin: { val: '12.8%', trend: '→', note: '毛利率保持稳定，会员费收入增长部分抵消商品让利' },
        guidance: '未给具体指引，但管理层对全球扩张和电商势头持乐观态度',
        highlight: '电商增长20.9%加速；会员费涨价效应持续释放；全球净新增29家仓库',
        risk: 'EPS略低于预期；关税政策不确定性；高估值意味着容错率低',
      },
      en: {
        revenue: { val: '$62.5B', yoy: '+9.1%', beat: 'Beat by $0.3B', note: 'Comparable sales +6.8%, e-commerce +20.9%, non-foods mid-teens growth' },
        eps: { val: '$4.02', yoy: '+2.6%', beat: 'Missed by $0.07', note: 'EPS $4.02 vs $4.09 est, impacted by higher SG&A and FX headwinds' },
        fcf: { val: '$7.8B (annualized)', margin: '3.2%', trend: '↑', note: 'Annualized FCF up 18% YoY, capital-efficient model' },
        grossMargin: { val: '12.8%', trend: '→', note: 'Stable gross margins; membership fee growth partially offsets merchandise margin pressure' },
        guidance: 'No specific guidance given; management optimistic on global expansion and e-commerce momentum',
        highlight: 'E-commerce accelerating at +20.9%; membership fee hike flowing through; 29 net new warehouses globally',
        risk: 'EPS slight miss; tariff policy uncertainty; elevated valuation leaves little room for error',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金$17.8B，财务状况极为稳健', debtToEquity: '负债率较低，D/E约0.35', currentRatio: '流动比率1.07，零售业正常水平', capex: '年Capex约$5B用于新店扩张和物流', buyback: '少量回购，主要通过分红和特别股息回报股东', summary: '财务极其健康，轻资产高周转模式，现金流充裕' },
      en: { cashPosition: 'Cash $17.8B, extremely strong financial position', debtToEquity: 'Low leverage with D/E ~0.35', currentRatio: 'Current ratio 1.07, normal for retail', capex: 'Annual capex ~$5B for new store expansion and logistics', buyback: 'Minimal buybacks; returns via regular + special dividends', summary: 'Exceptionally healthy finances; asset-light, high-turnover model with abundant cash flow' }
    },
    moat: {
      duan: { zh: { score: '极强', analysis: '段永平视角：Costco是"消费者代理人"的极致体现，用最低毛利率换取最高用户信任，形成飞轮效应', moatType: '规模经济+品牌忠诚+转换成本', risk: '估值过高时入场会降低长期回报' }, en: { score: 'Very Strong', analysis: 'DYP view: Costco is the ultimate "consumer agent" — lowest margins for highest trust, creating a flywheel effect', moatType: 'Scale economics + brand loyalty + switching costs', risk: 'Overpaying at high valuations reduces long-term returns' } },
      buffett: { zh: { score: '极强', analysis: '巴菲特视角：会员费模式创造可预测的经常性收入流，品牌在消费者心智中占据独特位置', moatType: '经济护城河——成本优势+品牌', risk: '零售业永远面临竞争，但Costco的模式极难被颠覆' }, en: { score: 'Very Strong', analysis: 'Buffett view: Membership model creates predictable recurring revenue; the brand occupies a unique position in consumer mindshare', moatType: 'Economic moat — cost advantage + brand', risk: 'Retail always faces competition, but Costco\'s model is extremely hard to disrupt' } },
      munger: { zh: { score: '极强', analysis: '芒格视角：Costco体现了"反过来想"的智慧——不追求高毛利而是最低价格，反而获得最大忠诚度和最佳回报', moatType: '文化护城河+成本领先+网络效应', risk: '几乎看不到重大风险，但要警惕管理层更迭后文化稀释' }, en: { score: 'Very Strong', analysis: 'Munger view: Costco embodies "invert, always invert" — by not chasing high margins but offering lowest prices, it earns maximum loyalty and best returns', moatType: 'Cultural moat + cost leadership + network effects', risk: 'Almost no major risks, but watch for cultural dilution after management transitions' } }
    },
    valuation: {
      zh: { dcf: { value: '$700-850', method: '10年DCF，假设营收CAGR 8%，终端增长率3%，WACC 9%', note: '基于当前FCF $7.8B增长' }, peerComp: { value: '$750-900', method: '相对Walmart(23x)和Target(16x)显著溢价，但增长和质量更优', note: '40-50x PE对Costco品质合理但偏高端' }, grahamMargin: '当前价格$1007，安全边际不足，DCF中值约$775', verdict: '优质但昂贵——适合持有，新建仓建议等回调至$850以下' },
      en: { dcf: { value: '$700-850', method: '10-year DCF assuming 8% revenue CAGR, 3% terminal growth, 9% WACC', note: 'Based on current FCF of $7.8B growing' }, peerComp: { value: '$750-900', method: 'Significant premium vs Walmart (23x) and Target (16x), justified by superior growth and quality', note: '40-50x PE reasonable for Costco quality but at high end' }, grahamMargin: 'Current price ~$1007 offers insufficient margin of safety; DCF midpoint ~$775', verdict: 'Outstanding quality but expensive — hold if owned; new positions better below $850' }
    },
  },

  'BRK-B': {
    exchange: 'NYSE',
    desc: { zh: '巴菲特旗下多元化控股集团，保险浮存金+铁路+能源+制造+投资组合', en: 'Buffett\'s diversified conglomerate; insurance float + railroad + energy + manufacturing + investment portfolio' },
    revGrowth: '+1.9%', epsEst: '$6,656 (Class A) vs est $5,938', grossMargin: '26.2%', dataCenterRev: 'Insurance underwriting +302% QoQ; GEICO turnaround; $334B cash',
    peFwd: '20.6x', peg: '1.80', evEbitda: '15.1x', ps: '2.8x',
    netMargin: '18.0%', roe: '10%', fcfYield: '3.2%', divYield: '0.00%',
    valuationPctl: 55,
    summary: {
      zh: 'Berkshire Q4 2024运营利润$14.5B同比+71%，全年运营利润$47.4B同比+27%。保险承保利润飙升302%至$3.4B，GEICO扭亏为盈贡献巨大。现金储备达到创纪录$334B，Buffett持续减持股票（包括苹果和美银）但尚未找到"大象级"收购目标。全年投资收益$79.6B。BNSF铁路稳健+0.7%。公司治理层面，Greg Abel已确认为接班人。估值合理，P/B约1.53x，低于历史溢价水平。',
      en: 'Berkshire Q4 2024 operating earnings surged 71% to $14.5B, with full-year operating profit hitting $47.4B (+27%). Insurance underwriting rocketed 302% to $3.4B, driven by GEICO\'s dramatic turnaround. Cash reserves reached a record $334B as Buffett sold equities (including Apple and BofA) without finding an "elephant-sized" acquisition target. Full-year investment gains totaled $79.6B. BNSF railroad grew modestly at +0.7%. On succession, Greg Abel is confirmed as Buffett\'s successor. Valuation is reasonable at ~1.53x book value, below historical premium levels.'
    },
    verdict: { zh: '合理估值，防御性极强 — 适合长期配置', en: 'Fairly valued with extreme defensive quality — suitable for long-term allocation' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 毫无疑问', a: '多元化经营+保险浮存金+铁路+能源+制造，任何单一风险都不会威胁整体' },
        { status: 'positive', q: '赚得更多？ — 大概率', a: '保险浮存金增长+$334B现金待部署+能源转型投资+各子公司内生增长' },
        { status: 'positive', q: '护城河？ — 极宽', a: '保险浮存金模式+品牌信任+规模效应+分散化经营+资本配置能力全球顶尖' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Absolutely', a: 'Diversified operations: insurance float + railroad + energy + manufacturing; no single risk threatens the whole' },
        { status: 'positive', q: 'Earning more? — Very likely', a: 'Growing insurance float + $334B cash to deploy + energy transition + organic growth across subsidiaries' },
        { status: 'positive', q: 'Moat? — Extremely wide', a: 'Insurance float model + brand trust + scale + diversification + world-class capital allocation' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '最敬佩的企业家', q: '段永平视角：巴菲特是他最敬佩的投资者和企业家，Berkshire的商业模式"永远不缺钱"，浮存金模式是金融界最伟大的发明之一' },
        { name: 'Buffett', color: 'green', verdict: '这是我的毕生心血', q: '巴菲特视角：Berkshire是我60年心血的结晶，目标是建造一艘永不沉没的方舟——即使我不在了，它依然会繁荣' },
        { name: 'Munger', color: 'green', verdict: '我搭档的杰作', q: '芒格视角：Berkshire是一个独特的文明产物，融合了理性、诚信和长期主义，Greg Abel会延续这一传统' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Most admired entrepreneur', q: 'DYP view: Buffett is his most admired investor and entrepreneur; Berkshire\'s model "never lacks capital" — the float model is one of finance\'s greatest inventions' },
        { name: 'Buffett', color: 'green', verdict: 'This is my life\'s work', q: 'Buffett view: Berkshire is 60 years of my life\'s work; the goal is to build an unsinkable ark — it will thrive even after I\'m gone' },
        { name: 'Munger', color: 'green', verdict: 'My partner\'s masterpiece', q: 'Munger view: Berkshire is a unique product of civilization, blending rationality, integrity, and long-term thinking; Greg Abel will carry this tradition forward' },
      ],
    },
    earnings: {
      quarter: 'Q4 2024 / FY2024', reportDate: '2025-02-22',
      zh: {
        revenue: { val: '$371.4B(全年)', yoy: '+1.9%', beat: '超预期1.3%', note: '保险和其他业务收入$321.6B，铁路+能源贡献稳定' },
        eps: { val: '$61,900(A类/全年)', yoy: '-6.8%', beat: '运营EPS超预期12%', note: '净利润受投资收益波动影响，运营利润$47.4B同比+27%才是核心指标' },
        fcf: { val: '~$30B(估算)', margin: '~8%', trend: '↑', note: '强劲运营现金流，但大量现金以国债形式持有' },
        grossMargin: { val: '26.2%', trend: '↑', note: '保险业务毛利改善显著，GEICO综合成本率大幅优化' },
        guidance: 'Buffett不提供指引，但在年度信中暗示将耐心等待大型收购机会',
        highlight: 'Q4运营利润+71%；保险承保+302%；GEICO扭亏；现金$334B创纪录',
        risk: '接班人过渡风险；$334B现金的机会成本；铁路业务增长乏力',
      },
      en: {
        revenue: { val: '$371.4B (FY)', yoy: '+1.9%', beat: 'Beat by 1.3%', note: 'Insurance & Other $321.6B; railroad + energy stable contributors' },
        eps: { val: '$61,900 (Class A/FY)', yoy: '-6.8%', beat: 'Operating EPS beat by 12%', note: 'Net income affected by investment gain volatility; operating earnings of $47.4B (+27%) is the core metric' },
        fcf: { val: '~$30B (est.)', margin: '~8%', trend: '↑', note: 'Strong operating cash flow, but significant cash held in T-bills' },
        grossMargin: { val: '26.2%', trend: '↑', note: 'Insurance margins improved significantly; GEICO combined ratio optimized substantially' },
        guidance: 'Buffett does not provide guidance; annual letter hints at patient wait for elephant-sized acquisitions',
        highlight: 'Q4 operating profit +71%; insurance underwriting +302%; GEICO turnaround; record $334B cash',
        risk: 'Succession transition risk; opportunity cost of $334B cash pile; railroad growth stagnation',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金及等价物$334B，以短期美国国债为主，史上最高', debtToEquity: 'D/E仅0.19，杠杆极低', currentRatio: '流动比率7.07，极其充裕', capex: '年Capex约$15B，主要用于BNSF铁路和BHE能源', buyback: '2024年回购约$2.9B，远低于手头现金', summary: '全球最强资产负债表之一，$334B现金提供极端下行保护和收购火力' },
      en: { cashPosition: 'Cash & equivalents $334B, primarily in short-term US Treasuries, all-time high', debtToEquity: 'D/E only 0.19, extremely low leverage', currentRatio: 'Current ratio 7.07, exceptionally liquid', capex: 'Annual capex ~$15B, primarily for BNSF railroad and BHE energy', buyback: '~$2.9B repurchased in 2024, well below available cash', summary: 'One of the strongest balance sheets globally; $334B cash provides extreme downside protection and acquisition firepower' }
    },
    moat: {
      duan: { zh: { score: '极强', analysis: '段永平视角：Berkshire的保险浮存金模式相当于"免费借钱投资"，加上巴菲特的资本配置能力，构成无与伦比的商业帝国', moatType: '浮存金优势+多元化+品牌+资本配置', risk: 'Buffett不在后能否维持同等水平的资本配置能力' }, en: { score: 'Very Strong', analysis: 'DYP view: Berkshire\'s insurance float model is essentially "free leverage for investing" — combined with Buffett\'s capital allocation, it creates an unmatched business empire', moatType: 'Float advantage + diversification + brand + capital allocation', risk: 'Whether post-Buffett leadership can maintain the same caliber of capital allocation' } },
      buffett: { zh: { score: '极强', analysis: '巴菲特视角：这是我用一生建造的方舟，保险浮存金、优质子公司、充沛现金——三重防护让Berkshire几乎不可能失败', moatType: '综合护城河——保险+铁路+能源+品牌', risk: '我最大的遗憾是没有更早出手做更大的收购' }, en: { score: 'Very Strong', analysis: 'Buffett view: This is the ark I built over a lifetime — insurance float, quality subsidiaries, abundant cash — triple protection makes Berkshire near-impossible to fail', moatType: 'Composite moat — insurance + railroad + energy + brand', risk: 'My biggest regret is not moving sooner on larger acquisitions' } },
      munger: { zh: { score: '极强', analysis: '芒格视角：Berkshire成功的秘诀是"持续学习+理性决策+耐心等待"，这种文化比任何单个业务都更有价值', moatType: '文化护城河+理性决策框架+永久资本', risk: '企业文化的传承是最大挑战，但Greg Abel已证明自己的能力' }, en: { score: 'Very Strong', analysis: 'Munger view: Berkshire\'s secret is "continuous learning + rational decisions + patient waiting" — this culture is more valuable than any single business', moatType: 'Cultural moat + rational decision framework + permanent capital', risk: 'Cultural succession is the biggest challenge, but Greg Abel has proven himself capable' } }
    },
    valuation: {
      zh: { dcf: { value: '$480-550 (B类)', method: 'SOTP估值：保险+铁路+能源+制造+投资组合+现金分部加总', note: '现金$334B本身就约占市值30%' }, peerComp: { value: '$450-520', method: 'P/B 1.53x vs 历史均值1.4x；运营PE约18x合理', note: '保险同业通常1.0-1.5x P/B' }, grahamMargin: '当前$496，处于合理估值区间，安全边际约10-15%', verdict: '估值合理，$334B现金提供安全垫——适合作为核心配置长期持有' },
      en: { dcf: { value: '$480-550 (Class B)', method: 'SOTP valuation: Insurance + Railroad + Energy + Manufacturing + Portfolio + Cash segments', note: 'Cash of $334B alone represents ~30% of market cap' }, peerComp: { value: '$450-520', method: 'P/B 1.53x vs historical avg 1.4x; operating PE ~18x is reasonable', note: 'Insurance peers typically trade at 1.0-1.5x P/B' }, grahamMargin: 'Current price ~$496, within fair value range, margin of safety ~10-15%', verdict: 'Fairly valued with $334B cash cushion — suitable as a long-term core holding' }
    },
  },

  BABA: {
    exchange: 'NYSE',
    desc: { zh: '中国最大电商+云计算平台，淘宝天猫+阿里云+国际电商+本地生活', en: 'China\'s largest e-commerce + cloud platform; Taobao/Tmall, Alibaba Cloud, international commerce' },
    revGrowth: '+8%', epsEst: '$2.93 adj vs est $2.76', grossMargin: '38.2%', dataCenterRev: 'Cloud Intelligence +13% YoY ($4.3B); AI-related revenue triple-digit growth 6th consecutive quarter',
    peFwd: '11.5x', peg: '0.65', evEbitda: '14.2x', ps: '2.4x',
    netMargin: '17.5%', roe: '11%', fcfYield: '5.8%', divYield: '1.21%',
    valuationPctl: 28,
    summary: {
      zh: 'Alibaba FY2025 Q3（2024年12月季度）营收同比+8%至RMB 280.2B ($38.4B)，超预期。调整后EPS $2.93同比+13%。云智能业务+13%至RMB 31.7B，AI产品收入连续6个季度三位数增长。净利润RMB 46.4B大幅增长，受益于投资收益及运营效率提升。FCF $5.35B同比-31%，因加大AI基础设施投入。公司宣布未来3年云和AI投入超过过去10年总和。估值处于历史低位，Forward PE仅11.5x，但地缘政治风险和国内消费疲软是主要压力。',
      en: 'Alibaba Q3 FY2025 (Dec 2024 quarter) revenue grew 8% YoY to RMB 280.2B ($38.4B), beating estimates. Adjusted EPS $2.93 rose 13% YoY. Cloud Intelligence grew 13% to RMB 31.7B with AI-related revenue achieving triple-digit growth for the 6th consecutive quarter. Net income surged to RMB 46.4B on investment gains and operating efficiency. FCF declined 31% to $5.35B due to heavy AI infrastructure spending. The company announced cloud/AI investment over the next 3 years will exceed the past decade\'s total. Valuation sits at historical lows (11.5x forward PE), but geopolitical risks and weak domestic consumption remain key headwinds.'
    },
    verdict: { zh: '估值极低但风险溢价合理 — AI叙事若兑现则显著低估', en: 'Extremely cheap valuation with justified risk premium — significantly undervalued if AI narrative delivers' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 大概率', a: '中国最大电商+云计算平台，国内消费基本盘稳固，AI战略加速推进' },
        { status: 'uncertain', q: '赚得更多？ — 取决于宏观和监管', a: '云计算和AI有巨大增长空间，但国内消费复苏不确定，国际业务亏损，监管政策仍是变量' },
        { status: 'uncertain', q: '护城河？ — 中等偏宽', a: '电商生态系统+云市场份额领先+支付体系，但拼多多和抖音电商在国内侵蚀份额' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Very likely', a: 'China\'s largest e-commerce + cloud platform, domestic consumption base is solid, AI strategy accelerating' },
        { status: 'uncertain', q: 'Earning more? — Depends on macro & regulation', a: 'Cloud and AI offer massive growth potential, but domestic consumption recovery uncertain, international losses, regulatory policy remains a variable' },
        { status: 'uncertain', q: 'Moat? — Moderate to wide', a: 'E-commerce ecosystem + cloud market share leadership + payment system, but Pinduoduo and Douyin erode domestic share' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '有条件看好', q: '段永平视角：中国互联网有好公司，但需要考虑VIE结构风险和监管不确定性。估值足够低可以配置，但不宜重仓' },
        { name: 'Buffett', color: 'red', verdict: '圈外', q: '巴菲特视角：我不太理解中国的监管环境，也不确定能否预测10年后的格局。我更倾向于投资我完全理解的生意' },
        { name: 'Munger', color: 'yellow', verdict: '值得研究', q: '芒格视角：中国有极其优秀的企业，BABA估值确实便宜，但投资者需要为政策不确定性要求更高的安全边际' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'Conditionally bullish', q: 'DYP view: China has great internet companies, but VIE structure risk and regulatory uncertainty must be weighed. Cheap enough to own, but not as a concentrated position' },
        { name: 'Buffett', color: 'red', verdict: 'Outside circle', q: 'Buffett view: I don\'t fully understand China\'s regulatory environment and can\'t predict the landscape 10 years out. I prefer businesses I completely understand' },
        { name: 'Munger', color: 'yellow', verdict: 'Worth studying', q: 'Munger view: China has exceptionally good companies, BABA is genuinely cheap, but investors should demand a higher margin of safety for policy uncertainty' },
      ],
    },
    earnings: {
      quarter: 'Q3 FY2025 (Oct-Dec 2024)', reportDate: '2025-02-20',
      zh: {
        revenue: { val: 'RMB 280.2B ($38.4B)', yoy: '+8%', beat: '超预期$0.2B', note: '淘天+8%，云智能+13%，国际电商+32%，本地生活+12%' },
        eps: { val: '$2.93 (adj ADS)', yoy: '+13%', beat: '超预期$0.17', note: '调整后净利润RMB 51.1B，受益于运营效率提升和投资收益' },
        fcf: { val: '$5.35B', margin: '13.9%', trend: '↓', note: 'FCF同比-31%，因AI和云基础设施资本开支大幅增加' },
        grossMargin: { val: '38.2%', trend: '↑', note: '毛利率改善，高毛利的云业务占比提升' },
        guidance: '未来3年云和AI投入将超过过去10年总和；预计国际电商FY26盈利',
        highlight: '云AI收入连续6季度三位数增长；淘天恢复增长；国际电商+32%',
        risk: 'FCF大幅下滑；国内消费疲软；地缘政治和VIE结构风险；竞争加剧',
      },
      en: {
        revenue: { val: 'RMB 280.2B ($38.4B)', yoy: '+8%', beat: 'Beat by $0.2B', note: 'Taobao/Tmall +8%, Cloud Intelligence +13%, International +32%, Local Services +12%' },
        eps: { val: '$2.93 (adj ADS)', yoy: '+13%', beat: 'Beat by $0.17', note: 'Adjusted net income RMB 51.1B, benefiting from operational efficiency and investment gains' },
        fcf: { val: '$5.35B', margin: '13.9%', trend: '↓', note: 'FCF down 31% YoY due to heavy AI and cloud infrastructure capex ramp' },
        grossMargin: { val: '38.2%', trend: '↑', note: 'Margin improvement driven by higher-margin cloud business mix shift' },
        guidance: 'Cloud/AI investment over next 3 years to exceed past decade\'s total; international e-commerce profitable by FY26',
        highlight: 'Cloud AI revenue triple-digit growth for 6th consecutive quarter; Taobao/Tmall back to growth; International +32%',
        risk: 'Sharp FCF decline; weak domestic consumption; geopolitical & VIE structure risk; intensifying competition from PDD/Douyin',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金及等价物$83.6B，净现金充裕', debtToEquity: 'D/E仅0.23，杠杆极低', currentRatio: '流动比率约1.5，健康水平', capex: '资本开支加速，AI云基础设施投入大幅增加', buyback: 'FY2025已回购超5%股份，$25B回购计划进行中', summary: '财务状况极为稳健，$83.6B现金+积极回购+低负债率，资产负债表为市场低估的安全垫' },
      en: { cashPosition: 'Cash & equivalents $83.6B, strong net cash position', debtToEquity: 'D/E only 0.23, very low leverage', currentRatio: 'Current ratio ~1.5, healthy', capex: 'Capex accelerating with massive AI/cloud infrastructure investment', buyback: '>5% of shares repurchased in FY2025; $25B buyback program underway', summary: 'Extremely solid financial position with $83.6B cash + active buybacks + low debt, balance sheet is an underappreciated safety cushion' }
    },
    moat: {
      duan: { zh: { score: '中等偏强', analysis: '段永平视角：阿里巴巴在电商和云计算有强大生态，但拼多多和抖音正在侵蚀其核心电商份额，护城河在收窄', moatType: '生态系统+规模+数据优势', risk: 'VIE结构是根本性风险，监管环境可能再次变化' }, en: { score: 'Moderate-Strong', analysis: 'DYP view: Alibaba has a powerful e-commerce and cloud ecosystem, but Pinduoduo and Douyin are eroding its core e-commerce share — the moat is narrowing', moatType: 'Ecosystem + scale + data advantage', risk: 'VIE structure is a fundamental risk; regulatory environment could shift again' } },
      buffett: { zh: { score: '弱', analysis: '巴菲特视角：我对中国企业的监管环境缺乏足够理解，VIE结构意味着你并不真正拥有企业的所有权', moatType: '规模优势，但监管风险削弱了护城河的可靠性', risk: '无法确信10年后的竞争格局和政策环境' }, en: { score: 'Weak', analysis: 'Buffett view: I lack sufficient understanding of China\'s regulatory environment; VIE structure means you don\'t truly own the business', moatType: 'Scale advantage, but regulatory risk undermines moat reliability', risk: 'Cannot be confident about competitive landscape and policy environment in 10 years' } },
      munger: { zh: { score: '中等偏强', analysis: '芒格视角：阿里巴巴是中国数字经济的核心基础设施之一，AI和云的布局具有前瞻性，但投资者需为不确定性留足安全边际', moatType: '平台网络效应+技术积累+云市场份额', risk: '中美博弈和国内监管是最大不确定性，但估值已反映大量悲观预期' }, en: { score: 'Moderate-Strong', analysis: 'Munger view: Alibaba is core infrastructure of China\'s digital economy; AI and cloud positioning is forward-thinking, but investors need ample margin of safety for uncertainty', moatType: 'Platform network effects + tech accumulation + cloud market share', risk: 'US-China tensions and domestic regulation are biggest unknowns, but valuation already reflects substantial pessimism' } }
    },
    valuation: {
      zh: { dcf: { value: '$160-200 (ADS)', method: '10年DCF，假设营收CAGR 8%，终端增长率3%，WACC 12%（含国家风险溢价）', note: '高折现率反映地缘政治和监管风险' }, peerComp: { value: '$150-190', method: '对比Amazon(60x)和Tencent(20x)严重折价，反映"中国折扣"', note: '11.5x Forward PE为中概股最低区间' }, grahamMargin: '当前价格约$145，相对DCF中值$180有约20%安全边际', verdict: '估值极度低估（如果忽略政治风险）——AI催化剂可能触发重估，但风险不容忽视' },
      en: { dcf: { value: '$160-200 (ADS)', method: '10-year DCF assuming 8% revenue CAGR, 3% terminal growth, 12% WACC (including country risk premium)', note: 'Higher discount rate reflects geopolitical and regulatory risks' }, peerComp: { value: '$150-190', method: 'Deeply discounted vs Amazon (60x) and Tencent (20x), reflecting "China discount"', note: '11.5x Forward PE is at the bottom range for Chinese tech' }, grahamMargin: 'Current price ~$145, approximately 20% margin of safety vs DCF midpoint of $180', verdict: 'Extremely undervalued (if political risks are discounted) — AI catalyst could trigger re-rating, but risks cannot be ignored' }
    },
  },
  AMD: {
    exchange: 'NASDAQ',
    desc: { zh: 'CPU+GPU双线布局的半导体公司，MI300X AI加速器挑战NVDA', en: 'Dual CPU+GPU semiconductor company; MI300X AI accelerator challenging NVIDIA' },
    revGrowth: '+24%', epsEst: '$1.09 vs est $1.08', grossMargin: '54.0%', dataCenterRev: '$3.9B data center (+69% YoY), MI300X GPU ramp',
    peFwd: '30.4x', peg: '0.72', evEbitda: '47.9x', ps: '8.5x',
    netMargin: '6.3%', roe: '3.2%', fcfYield: '1.8%', divYield: '0.00%',
    valuationPctl: 75,
    summary: {
      zh: 'AMD Q4 2024营收77亿美元创纪录,同比+24%,数据中心业务39亿美元同比暴增69%,MI300X GPU出货强劲带动增长。调整后EPS $1.09小幅超预期。全年营收258亿美元同比+14%,净利润近翻倍至16.4亿美元。非GAAP毛利率54%,运营利润20亿美元。Q1 2025指引营收71亿美元(+30% YoY),但环比下降7%引发市场担忧。自由现金流10.9亿美元。AI GPU赛道与NVDA竞争加剧,MI300X获大型云客户采用,但市占率仍远落后。GAAP净利率偏低,因无形资产摊销较大。',
      en: 'AMD posted record Q4 2024 revenue of $7.7B (+24% YoY), powered by Data Center segment at $3.9B (+69% YoY) driven by MI300X GPU ramp and EPYC CPU growth. Adjusted EPS of $1.09 slightly beat the $1.08 estimate. Full-year revenue hit $25.8B (+14%), with net income nearly doubling to $1.64B. Non-GAAP gross margin was 54%, operating income $2B. Q1 2025 guidance of $7.1B (+30% YoY) was solid but the ~7% sequential decline spooked investors. FCF was $1.09B in Q4. The AI GPU competition with NVIDIA intensifies; MI300X is gaining traction with hyperscalers but market share remains a fraction of NVDA. GAAP net margin is low due to heavy intangible amortization from acquisitions.'
    },
    verdict: { zh: '谨慎看多 — AI GPU高成长但估值偏贵,需验证MI300X持续放量', en: 'Cautiously Bullish — AI GPU high-growth story but valuation stretched, MI300X ramp must sustain' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: 'x86 CPU + GPU双线布局,数据中心AI需求结构性增长,AMD作为第二大GPU供应商地位稳固' },
        { status: 'uncertain', q: '赚得更多？ — 不确定', a: 'MI300X放量中但NVDA CUDA生态壁垒极高,AI GPU市占率能否突破20%是关键' },
        { status: 'uncertain', q: '护城河？ — 中等', a: 'x86授权+先进制程(台积电代工)+ROCm软件栈构成护城河,但软件生态远弱于CUDA' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'Dual CPU+GPU positioning with structural AI data center demand; AMD is the solid #2 GPU supplier' },
        { status: 'uncertain', q: 'Earning more? — Uncertain', a: 'MI300X ramping but NVIDIA CUDA ecosystem moat is formidable; whether AMD can breach 20% GPU share is key' },
        { status: 'uncertain', q: 'Moat? — Moderate', a: 'x86 license + TSMC advanced nodes + ROCm stack form a moat, but software ecosystem far behind CUDA' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'yellow', verdict: '观望', q: '段永平视角：业务模型不够简单,GPU竞争格局不清晰,现金流相对营收偏低' },
        { name: 'Buffett', color: 'yellow', verdict: '不在能力圈', q: '巴菲特视角：半导体周期性强,技术迭代快,不符合消费垄断型企业标准' },
        { name: 'Munger', color: 'yellow', verdict: '有潜力但风险大', q: '芒格视角：AI是大趋势但竞争激烈,NVDA先发优势明显,逆向思维需考虑技术落后风险' },
      ],
      en: [
        { name: 'DYP', color: 'yellow', verdict: 'Wait & See', q: 'Business model not simple enough, GPU competitive landscape unclear, FCF low relative to revenue' },
        { name: 'Buffett', color: 'yellow', verdict: 'Outside circle of competence', q: 'Semiconductors are cyclical with rapid tech changes, not a consumer franchise' },
        { name: 'Munger', color: 'yellow', verdict: 'Potential but risky', q: 'AI is a secular trend but competition is fierce; NVDA first-mover advantage is strong; inversion thinking flags tech obsolescence risk' },
      ],
    },
    earnings: {
      quarter: 'Q4 2024', reportDate: '2025-02-04',
      zh: {
        revenue: { val: '$7.7B', yoy: '+24%', beat: '超预期$7.5B', note: '数据中心$3.9B(+69%),客户端$2.3B(+58%),嵌入式$923M(-11%),游戏$563M(-59%)' },
        eps: { val: '$1.09', yoy: '+42%', beat: '超预期$1.08', note: '非GAAP EPS;GAAP EPS $0.29因无形资产摊销' },
        fcf: { val: '$1.09B', margin: '14.2%', trend: '↑', note: '全年FCF约$1.8B,Q4季度环比改善' },
        grossMargin: { val: '54.0%', trend: '→', note: '非GAAP毛利率持平,产品组合向高利润数据中心倾斜' },
        guidance: 'Q1 2025营收指引$7.1B(+/-$300M),同比+30%,环比-7%',
        highlight: 'MI300X GPU大规模出货,数据中心营收创纪录;EPYC Turin CPU获云客户广泛采用',
        risk: '游戏与嵌入式持续疲软;AI GPU市场NVDA占据80%+份额;GAAP利润率偏低',
      },
      en: {
        revenue: { val: '$7.7B', yoy: '+24%', beat: 'Beat est $7.5B', note: 'Data Center $3.9B (+69%), Client $2.3B (+58%), Embedded $923M (-11%), Gaming $563M (-59%)' },
        eps: { val: '$1.09', yoy: '+42%', beat: 'Beat est $1.08', note: 'Non-GAAP EPS; GAAP EPS $0.29 due to intangible amortization' },
        fcf: { val: '$1.09B', margin: '14.2%', trend: '↑', note: 'Full-year FCF ~$1.8B, Q4 improved sequentially' },
        grossMargin: { val: '54.0%', trend: '→', note: 'Non-GAAP GM flat; product mix shifting toward higher-margin data center' },
        guidance: 'Q1 2025 revenue guide $7.1B (+/-$300M), +30% YoY, -7% QoQ',
        highlight: 'MI300X GPU mass shipping, record data center revenue; EPYC Turin broadly adopted by cloud customers',
        risk: 'Gaming and Embedded remain weak; NVDA holds 80%+ AI GPU market share; GAAP margins compressed',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金$5.1B', debtToEquity: '负债率3.7%,低杠杆', currentRatio: '流动比率2.5,健康', capex: '年capex约$0.5B,轻资产fabless模式', buyback: '2024年回购约$2.3B', summary: '财务健康,低负债,fabless模式现金流稳定增长,但绝对FCF偏低' },
      en: { cashPosition: 'Cash $5.1B', debtToEquity: 'D/E 3.7%, low leverage', currentRatio: 'Current ratio 2.5, healthy', capex: 'Annual capex ~$0.5B, asset-light fabless model', buyback: '~$2.3B buybacks in 2024', summary: 'Financially healthy, low debt, fabless model with growing FCF, but absolute FCF still low' }
    },
    moat: {
      duan: { zh: { score: '中等', analysis: 'x86授权是稀缺资源,但GPU软件生态远落后NVDA,业务模型复杂度高', moatType: '技术壁垒+知识产权', risk: 'AI GPU竞争可能长期处于劣势' }, en: { score: 'Moderate', analysis: 'x86 license is scarce, but GPU software ecosystem far behind NVDA; complex business model', moatType: 'Tech barrier + IP', risk: 'May remain disadvantaged in AI GPU long-term' } },
      buffett: { zh: { score: '弱', analysis: '非消费垄断型,技术迭代风险高,周期性明显', moatType: '技术竞争型', risk: '无品牌忠诚度,客户随性能/价格切换' }, en: { score: 'Weak', analysis: 'Not a consumer monopoly, high tech obsolescence risk, cyclical', moatType: 'Tech competition', risk: 'No brand loyalty, customers switch on performance/price' } },
      munger: { zh: { score: '中等', analysis: '受益于AI大趋势(顺势),但竞争格局不利(逆向思考NVDA可能赢者通吃)', moatType: '技术追赶者优势', risk: '心理偏误:市场可能过度外推AI增长到AMD' }, en: { score: 'Moderate', analysis: 'Benefits from AI megatrend (tailwind), but competitive position weak (inversion: NVDA may winner-take-most)', moatType: 'Fast-follower advantage', risk: 'Psychological bias: market may over-extrapolate AI growth to AMD' } }
    },
    valuation: {
      zh: { dcf: { value: '$100-130', method: '基于FY2025E FCF $3B,15%折现率,5年高增长后10%终端增速', note: '高度依赖AI GPU增速假设' }, peerComp: { value: '$110-150', method: '参考NVDA PEG折价50%,INTC溢价200%', note: 'PEG 0.72低于行业,但EV/EBITDA 47.9x偏高' }, grahamMargin: '当前价约$115,安全边际有限', verdict: '估值合理偏贵,需持续验证MI300X放量' },
      en: { dcf: { value: '$100-130', method: 'Based on FY2025E FCF $3B, 15% discount, 5yr high growth then 10% terminal', note: 'Highly dependent on AI GPU growth assumptions' }, peerComp: { value: '$110-150', method: 'vs NVDA PEG at 50% discount, vs INTC at 200% premium', note: 'PEG 0.72 below sector, but EV/EBITDA 47.9x is elevated' }, grahamMargin: 'Current ~$115, limited margin of safety', verdict: 'Fair to slightly expensive; MI300X ramp must be sustained' }
    },
  },

  CVX: {
    exchange: 'NYSE',
    desc: { zh: '全球第二大石油公司，Permian盆地+Guyana油田，37年股息增长', en: '2nd largest oil major; Permian Basin + Guyana assets; 37 consecutive years of dividend growth' },
    revGrowth: '+10.7%', epsEst: '$2.06 adj vs est $2.19', grossMargin: '41.8%', dataCenterRev: 'Upstream production record 3.35M BOED',
    peFwd: '14.8x', peg: '3.10', evEbitda: '6.8x', ps: '1.3x',
    netMargin: '6.6%', roe: '12.5%', fcfYield: '5.8%', divYield: '4.38%',
    valuationPctl: 40,
    summary: {
      zh: 'Chevron Q4 2024营收$52.2B同比+10.7%超预期,但调整后EPS $2.06不及预期$2.19。全年产量创纪录335万桶油当量/日。全年FCF $16.6B,股东回报$26.3B(股息$12B+回购$14.3B)。季度股息提升5%至$1.71/股,连续37年增长。负债率13%,现金$23.2B,财务极稳健。Hess收购因仲裁延迟是主要不确定性。巴菲特持仓标的,典型价值+股息投资。',
      en: 'Chevron Q4 2024 revenue $52.2B beat expectations (+10.7% YoY), but adjusted EPS $2.06 missed est $2.19. Record full-year production of 3.35M BOED. Full-year FCF $16.6B, shareholder returns $26.3B ($12B dividends + $14.3B buybacks). Quarterly dividend raised 5% to $1.71/share, 37th consecutive year of increases. Debt-to-capital 13%, cash $23.2B — rock-solid balance sheet. Hess acquisition delayed by arbitration remains key uncertainty. A Buffett portfolio holding, classic value + dividend play.'
    },
    verdict: { zh: '看多 — 高股息+低估值+巴菲特持仓,油价风险可控', en: 'Bullish — High dividend + low valuation + Buffett holding, oil price risk manageable' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '全球石油需求未来10年仍在,Permian+Guyana+LNG多元布局确保长期盈利' },
        { status: 'uncertain', q: '赚得更多？ — 取决于油价', a: '产量增长确定(Tengiz扩产+Permian),但盈利高度依赖大宗商品周期' },
        { status: 'positive', q: '护城河？ — 宽', a: '全球一体化能源巨头,低成本资产组合(Permian/Guyana),规模+资本壁垒极高' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'Global oil demand persists for the next decade; diversified Permian + Guyana + LNG portfolio ensures profitability' },
        { status: 'uncertain', q: 'Earning more? — Depends on oil price', a: 'Production growth certain (Tengiz expansion + Permian), but earnings highly tied to commodity cycles' },
        { status: 'positive', q: 'Moat? — Wide', a: 'Global integrated energy major, low-cost asset portfolio (Permian/Guyana), massive scale + capital barriers' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '合格', q: '段永平视角：简单商品业务,现金流充沛,股息持续增长,管理层注重股东回报' },
        { name: 'Buffett', color: 'green', verdict: '持仓中', q: '巴菲特视角：实际持有CVX,现金流覆盖股息,低估值高回报率,能力圈内' },
        { name: 'Munger', color: 'green', verdict: '合理配置', q: '芒格视角：能源是文明基础,CVX低成本资产+强资产负债表=确定性高,但需避免追高油价' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Qualified', q: 'Simple commodity business, abundant cash flow, growing dividend, shareholder-friendly management' },
        { name: 'Buffett', color: 'green', verdict: 'Holding', q: 'Actually holds CVX; FCF covers dividends, low valuation, high returns, within circle of competence' },
        { name: 'Munger', color: 'green', verdict: 'Reasonable allocation', q: 'Energy is foundation of civilization; low-cost assets + strong balance sheet = high certainty; avoid chasing oil price peaks' },
      ],
    },
    earnings: {
      quarter: 'Q4 2024', reportDate: '2025-01-31',
      zh: {
        revenue: { val: '$52.2B', yoy: '+10.7%', beat: '超预期$47B', note: '美国上游产量强劲推动营收超预期' },
        eps: { val: '$2.06 adj', yoy: '-40%', beat: '低于预期$2.19', note: 'GAAP EPS $1.84;炼油利润率下滑拖累盈利' },
        fcf: { val: '$16.6B(全年)', margin: '10.0%', trend: '→', note: 'Q4运营现金流稳健,全年股东回报$26.3B' },
        grossMargin: { val: '41.8%', trend: '↓', note: '炼油利润率收窄,下游业务承压' },
        guidance: '2025年Capex指引$14.5-15.5B;Tengiz扩产项目2025年达产',
        highlight: '股息连续37年增长;创纪录产量335万桶/日;Permian产量持续增长',
        risk: 'Hess收购仲裁不确定;下游炼油利润率压缩;油价波动风险',
      },
      en: {
        revenue: { val: '$52.2B', yoy: '+10.7%', beat: 'Beat est $47B', note: 'Strong US upstream production drove revenue beat' },
        eps: { val: '$2.06 adj', yoy: '-40%', beat: 'Missed est $2.19', note: 'GAAP EPS $1.84; refining margin compression hurt earnings' },
        fcf: { val: '$16.6B (FY)', margin: '10.0%', trend: '→', note: 'Q4 operating cash flow solid; FY shareholder returns $26.3B' },
        grossMargin: { val: '41.8%', trend: '↓', note: 'Refining margins narrowed, downstream pressured' },
        guidance: '2025 Capex guidance $14.5-15.5B; Tengiz expansion to reach full capacity in 2025',
        highlight: '37th consecutive year of dividend growth; record production 3.35M BOED; Permian output rising',
        risk: 'Hess acquisition arbitration uncertainty; downstream margin compression; oil price volatility',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金$23.2B', debtToEquity: '负债率13%,净负债率6%,极低杠杆', currentRatio: '流动比率1.3', capex: '年capex约$16.4B,投资纪律严格', buyback: '2024年回购$14.3B', summary: '财务极稳健,AA级信用,充沛现金储备覆盖周期波动' },
      en: { cashPosition: 'Cash $23.2B', debtToEquity: 'Debt-to-capital 13%, net debt 6%, very low leverage', currentRatio: 'Current ratio 1.3', capex: 'Annual capex ~$16.4B, disciplined investment', buyback: '$14.3B buybacks in 2024', summary: 'Extremely solid financials, AA-rated credit, ample cash reserves to weather commodity cycles' }
    },
    moat: {
      duan: { zh: { score: '宽', analysis: '简单易懂的商品业务,现金流可预测性较高(低成本资产),管理层专注回报', moatType: '规模+低成本资产', risk: '长期能源转型可能侵蚀需求' }, en: { score: 'Wide', analysis: 'Simple commodity business, reasonably predictable cash flows from low-cost assets, management focused on returns', moatType: 'Scale + low-cost assets', risk: 'Long-term energy transition may erode demand' } },
      buffett: { zh: { score: '宽', analysis: '巴菲特实际持仓,符合其简单业务+强现金流+股息增长标准', moatType: '资源垄断+规模经济', risk: '大宗商品价格不可控' }, en: { score: 'Wide', analysis: 'Buffett actually holds CVX; fits his criteria of simple business + strong FCF + dividend growth', moatType: 'Resource monopoly + economies of scale', risk: 'Commodity prices uncontrollable' } },
      munger: { zh: { score: '宽', analysis: '文明需要能源,CVX低成本资产确保即使油价下跌仍盈利;逆向思考:能源转型是数十年过程', moatType: '必需品+成本优势', risk: '避免在油价高点过度乐观(心理偏误)' }, en: { score: 'Wide', analysis: 'Civilization needs energy; CVX low-cost assets ensure profitability even at lower oil prices; inversion: energy transition is a multi-decade process', moatType: 'Essential commodity + cost advantage', risk: 'Avoid being overly bullish at peak oil prices (psychological bias)' } }
    },
    valuation: {
      zh: { dcf: { value: '$155-180', method: '基于FY2025E FCF $18B,10%折现率,$65油价假设', note: '对油价敏感度高' }, peerComp: { value: '$160-185', method: 'EV/EBITDA 6.8x vs XOM 7.2x,略有折价', note: '股息率4.38%高于XOM 3.4%' }, grahamMargin: '当前价~$163,安全边际适中', verdict: '估值便宜,股息+回购提供下行保护' },
      en: { dcf: { value: '$155-180', method: 'Based on FY2025E FCF $18B, 10% discount, $65 oil assumption', note: 'High sensitivity to oil prices' }, peerComp: { value: '$160-185', method: 'EV/EBITDA 6.8x vs XOM 7.2x, slight discount', note: 'Dividend yield 4.38% above XOM 3.4%' }, grahamMargin: 'Current ~$163, moderate margin of safety', verdict: 'Cheap valuation; dividend + buyback provide downside protection' }
    },
  },

  COIN: {
    exchange: 'NASDAQ',
    desc: { zh: '美国最大合规加密货币交易所，BTC ETF托管商，Base L2链运营方', en: 'Largest US regulated crypto exchange; BTC ETF custodian; operates Base L2 blockchain' },
    revGrowth: '+88% QoQ / +138% YoY', epsEst: '$4.68 vs est $1.81', grossMargin: '84.5%', dataCenterRev: 'Transaction rev $1.56B (+172% QoQ), Subscription $641M',
    peFwd: '24.5x', peg: '0.85', evEbitda: '18.2x', ps: '7.8x',
    netMargin: '41.0%', roe: '25.2%', fcfYield: '4.1%', divYield: '0.00%',
    valuationPctl: 60,
    summary: {
      zh: 'Coinbase Q4 2024营收$2.27B大幅超预期$1.59B,同比+138%,环比+88%。EPS $4.68远超预期$1.81。交易收入$1.56B(+172% QoQ),受BTC ETF上市+大选后加密牛市驱动。订阅服务收入$641M(+15% QoQ)提供稳定底层。全年营收$6.6B,净利润$2.6B,调整EBITDA $3.3B。毛利率84.5%,净利率41%。总资产$22.5B,负债$12.3B,权益$10.3B。作为美国合规加密交易所龙头,受益于ETF+监管明确化趋势,但收入高度依赖加密市场周期。',
      en: 'Coinbase Q4 2024 revenue of $2.27B massively beat est $1.59B (+138% YoY, +88% QoQ). EPS $4.68 crushed estimate of $1.81. Transaction revenue $1.56B (+172% QoQ) driven by BTC ETF launch + post-election crypto bull market. Subscription revenue $641M (+15% QoQ) provides stable base. FY2024 revenue $6.6B, net income $2.6B, adj EBITDA $3.3B. Gross margin 84.5%, net margin 41%. Total assets $22.5B, total debt $4.3B, equity $10.3B. As the dominant US regulated crypto exchange, COIN benefits from ETF + regulatory clarity trends, but revenue is highly cyclical with crypto markets.'
    },
    verdict: { zh: '谨慎看多 — 加密合规龙头,BTC ETF受益者,但周期性极强', en: 'Cautiously Bullish — Regulated crypto leader, BTC ETF beneficiary, but extremely cyclical' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 大概率是', a: '加密资产类别已获机构认可(BTC ETF),Coinbase作为合规龙头地位稳固' },
        { status: 'uncertain', q: '赚得更多？ — 取决于加密周期', a: '订阅收入增长提供底层,但交易收入占比70%+,严重依赖市场活跃度' },
        { status: 'uncertain', q: '护城河？ — 中等偏强', a: '美国合规牌照是核心护城河,但费率持续下降,DEX竞争加剧' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Likely yes', a: 'Crypto as asset class is institutionally validated (BTC ETF); Coinbase regulatory position is strong' },
        { status: 'uncertain', q: 'Earning more? — Depends on crypto cycle', a: 'Subscription revenue growing provides floor, but transaction rev 70%+ of total, heavily market-dependent' },
        { status: 'uncertain', q: 'Moat? — Moderate to strong', a: 'US regulatory compliance is the core moat, but fee compression ongoing and DEX competition rising' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'red', verdict: '不合格', q: '段永平视角：收入波动极大,不符合简单稳定现金流标准,难以估值' },
        { name: 'Buffett', color: 'red', verdict: '不在能力圈', q: '巴菲特视角：加密货币非生产性资产,交易所收入随市场情绪波动,非消费垄断' },
        { name: 'Munger', color: 'yellow', verdict: '有趣但投机', q: '芒格视角：合规交易所有"收费站"属性,但加密市场本身充满投机心理,逆向思考熊市时盈利大幅缩水' },
      ],
      en: [
        { name: 'DYP', color: 'red', verdict: 'Not qualified', q: 'Revenue extremely volatile, fails simple stable cash flow criteria, hard to value' },
        { name: 'Buffett', color: 'red', verdict: 'Outside competence', q: 'Crypto is non-productive asset; exchange revenue swings with sentiment; not a consumer franchise' },
        { name: 'Munger', color: 'yellow', verdict: 'Interesting but speculative', q: 'Regulated exchange has toll-booth quality, but crypto market itself is speculative; inversion: bear market earnings collapse dramatically' },
      ],
    },
    earnings: {
      quarter: 'Q4 2024', reportDate: '2025-02-13',
      zh: {
        revenue: { val: '$2.27B', yoy: '+138%', beat: '超预期$1.59B(+43%)', note: '交易收入$1.56B(+172% QoQ),订阅$641M(+15% QoQ)' },
        eps: { val: '$4.68', yoy: '+350%', beat: '超预期$1.81(+159%)', note: '净利润$1.3B,上年同期$2.73M' },
        fcf: { val: '$3.07B', margin: '135%', trend: '↑', note: 'Q4自由现金流极强,主要因交易量暴增' },
        grossMargin: { val: '84.5%', trend: '↑', note: '高毛利率体现平台型轻资产模式' },
        guidance: '未提供具体数字指引;2025年目标驱动收入增长、推动加密实用化、扩展基础设施',
        highlight: 'BTC ETF带来机构资金流入;月活交易用户+24% QoQ;交易量+185% YoY;Base L2链生态持续扩展',
        risk: '加密周期性极强;费率下降趋势;SEC/监管政策变化;DEX分流交易量',
      },
      en: {
        revenue: { val: '$2.27B', yoy: '+138%', beat: 'Beat est $1.59B (+43%)', note: 'Transaction rev $1.56B (+172% QoQ), Subscription $641M (+15% QoQ)' },
        eps: { val: '$4.68', yoy: '+350%', beat: 'Beat est $1.81 (+159%)', note: 'Net income $1.3B vs $273M year-ago' },
        fcf: { val: '$3.07B', margin: '135%', trend: '↑', note: 'Exceptional Q4 FCF driven by trading volume surge' },
        grossMargin: { val: '84.5%', trend: '↑', note: 'High gross margin reflects asset-light platform model' },
        guidance: 'No specific quantitative guidance; 2025 goals: drive revenue, crypto utility, scale foundations',
        highlight: 'BTC ETF institutional inflows; MTU +24% QoQ; trading volume +185% YoY; Base L2 ecosystem expanding',
        risk: 'Extreme crypto cyclicality; fee compression; regulatory changes; DEX competition siphoning volume',
      }
    },
    financialHealth: {
      zh: { cashPosition: '总资产$22.5B,权益$10.3B', debtToEquity: '总债务$4.3B,D/E约0.42', currentRatio: '流动性充足,加密牛市期间现金积累快', capex: '轻资产模式,capex极低', buyback: '2024年回购约$1.2B', summary: '财务状况良好,牛市积累充足现金储备,但需防范熊市现金消耗' },
      en: { cashPosition: 'Total assets $22.5B, equity $10.3B', debtToEquity: 'Total debt $4.3B, D/E ~0.42', currentRatio: 'Ample liquidity, rapid cash build during crypto bull market', capex: 'Asset-light model, minimal capex', buyback: '~$1.2B buybacks in 2024', summary: 'Healthy financials with ample reserves from bull market, but bear market cash burn is a risk' }
    },
    moat: {
      duan: { zh: { score: '中等', analysis: '合规牌照有价值但不算简单可预测的业务,现金流波动太大', moatType: '监管壁垒+品牌', risk: '加密熊市可能持续数年' }, en: { score: 'Moderate', analysis: 'Regulatory license is valuable but business not simple or predictable; cash flow too volatile', moatType: 'Regulatory barrier + brand', risk: 'Crypto bear market can last years' } },
      buffett: { zh: { score: '弱', analysis: '非消费垄断,收入随市场情绪大幅波动,不产生稳定可预测的现金流', moatType: '监管优势(非持久)', risk: '新竞争者+DEX可能削弱市场地位' }, en: { score: 'Weak', analysis: 'Not a consumer monopoly; revenue swings wildly with market sentiment; no stable predictable cash flow', moatType: 'Regulatory advantage (not durable)', risk: 'New entrants + DEX may erode market position' } },
      munger: { zh: { score: '中等', analysis: '收费站模式有吸引力,但底层资产(加密)本身具有投机性;逆向思考:如果加密成为主流金融基础设施,COIN地位极强', moatType: '双面平台+监管', risk: '投机心理驱动的行业,均值回归风险大' }, en: { score: 'Moderate', analysis: 'Toll-booth model is attractive, but underlying assets (crypto) are speculative; inversion: if crypto becomes mainstream financial infra, COIN position is very strong', moatType: 'Two-sided platform + regulatory', risk: 'Speculation-driven industry, high mean-reversion risk' } }
    },
    valuation: {
      zh: { dcf: { value: '$180-280', method: '基于正常化年度FCF $2-3B(周期平均),12%折现率', note: '周期平均化是关键假设,范围极宽' }, peerComp: { value: '$200-260', method: '参考传统交易所(CME/ICE)给予溢价,PE 20-30x', note: '加密增长溢价vs周期折价' }, grahamMargin: '当前价~$230,处于合理区间中部', verdict: '估值合理但波动率极高,适合周期交易而非长期持有' },
      en: { dcf: { value: '$180-280', method: 'Based on normalized annual FCF $2-3B (cycle average), 12% discount', note: 'Cycle normalization is the key assumption; range is very wide' }, peerComp: { value: '$200-260', method: 'vs traditional exchanges (CME/ICE) with premium, PE 20-30x', note: 'Crypto growth premium vs cyclicality discount' }, grahamMargin: 'Current ~$230, mid-range of fair value', verdict: 'Fairly valued but extreme volatility; better as a cycle trade than long-term hold' }
    },
  },

  CRM: {
    exchange: 'NYSE',
    desc: { zh: '全球CRM SaaS龙头，Salesforce平台+Slack+AI Agentforce', en: 'Global CRM SaaS leader; Salesforce platform + Slack + AI Agentforce agent platform' },
    revGrowth: '+8%', epsEst: '$3.81 adj vs est $3.05', grossMargin: '78.0%', dataCenterRev: 'Agentforce AI: 5K deals closed, 380K conversations handled',
    peFwd: '26.5x', peg: '2.80', evEbitda: '22.8x', ps: '7.5x',
    netMargin: '16.7%', roe: '10.8%', fcfYield: '3.8%', divYield: '0.56%',
    valuationPctl: 55,
    summary: {
      zh: 'Salesforce Q4 FY2025营收$10.0B创纪录,首次突破百亿美元季度大关,同比+8%。调整后EPS $3.81大幅超预期$3.05(+25%)。全年营收$37.9B(+9%),非GAAP运营利润率33.0%(+250bps),FCF $12.4B(+31%)。Agentforce AI产品势头强劲,自10月以来签约5000笔交易,380K对话84%解决率。FY26营收指引$40.5-40.9B(+7-8%),FY27营收指引$46B。利润率持续扩张,从亏损转型为高利润SaaS平台,但营收增速放缓至个位数是隐忧。',
      en: 'Salesforce Q4 FY2025 revenue hit a record $10.0B, the first-ever $10B quarter, up 8% YoY. Adjusted EPS $3.81 beat est $3.05 by 25%. FY2025 revenue $37.9B (+9%), non-GAAP op margin 33.0% (+250bps), FCF $12.4B (+31%). Agentforce AI gained strong momentum with 5,000 deals closed since October, 380K conversations at 84% resolution rate. FY26 revenue guide $40.5-40.9B (+7-8%), FY27 guide $46B. Margin expansion continues as CRM transformed from losses to highly profitable SaaS. However, revenue growth decelerating to single digits is a concern.'
    },
    verdict: { zh: '中性偏多 — 利润率扩张+AI Agentforce催化,但增速放缓', en: 'Neutral to Bullish — Margin expansion + AI Agentforce catalyst, but growth decelerating' },
    verdictColor: 'text-yellow',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: 'CRM是企业级SaaS标杆,客户粘性极高(转换成本巨大),企业数字化不可逆' },
        { status: 'positive', q: '赚得更多？ — 大概率是', a: '利润率从亏损扩张至33%+,FCF持续增长;Agentforce开辟AI新增长曲线' },
        { status: 'positive', q: '护城河？ — 宽', a: '客户切换成本极高+数据锁定+生态系统(AppExchange/Slack)+品牌认知度第一' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'CRM is the enterprise SaaS benchmark; extremely high switching costs; digital transformation is irreversible' },
        { status: 'positive', q: 'Earning more? — Likely yes', a: 'Margin expanded from losses to 33%+; FCF growing; Agentforce opens new AI growth curve' },
        { status: 'positive', q: 'Moat? — Wide', a: 'Extremely high switching costs + data lock-in + ecosystem (AppExchange/Slack) + #1 brand recognition' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '合格', q: '段永平视角：SaaS订阅模式现金流稳定可预测,利润率持续提升,管理层聚焦利润质量' },
        { name: 'Buffett', color: 'green', verdict: '合格', q: '巴菲特视角：高转换成本=消费垄断型企业,FCF强劲增长,虽非传统能力圈但符合标准' },
        { name: 'Munger', color: 'green', verdict: '优质', q: '芒格视角：企业软件天然具有网络效应+锁定效应,Agentforce是AI应用落地的好案例' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Qualified', q: 'SaaS subscription model with predictable cash flows; margin expanding; management focused on profit quality' },
        { name: 'Buffett', color: 'green', verdict: 'Qualified', q: 'High switching costs = consumer monopoly type; strong FCF growth; fits criteria even if not traditional competence' },
        { name: 'Munger', color: 'green', verdict: 'High quality', q: 'Enterprise software has natural network effects + lock-in; Agentforce is a good AI application case' },
      ],
    },
    earnings: {
      quarter: 'Q4 FY2025 (Jan 2025)', reportDate: '2025-02-26',
      zh: {
        revenue: { val: '$10.0B', yoy: '+8%', beat: '符合预期$10.0B', note: '首次突破百亿季度,订阅收入$9.45B(+9%)' },
        eps: { val: '$3.81 adj', yoy: '+24%', beat: '超预期$3.05(+25%)', note: 'GAAP EPS因重组费用较低;利润率持续扩张' },
        fcf: { val: '$12.4B(全年)', margin: '32.7%', trend: '↑', note: 'FCF同比+31%,FCF利润率达32.7%创新高' },
        grossMargin: { val: '~78%', trend: '→', note: '估算值,SaaS模式毛利率稳定在高位' },
        guidance: 'FY26营收$40.5-40.9B(+7-8%);FY27营收$46B;非GAAP运营利润率~33.5%',
        highlight: 'Agentforce签约5000笔,84%自动解决率;利润率持续扩张;$12.4B FCF创纪录',
        risk: '营收增速放缓至个位数;AI变现仍在早期;宏观经济不确定性影响企业IT支出',
      },
      en: {
        revenue: { val: '$10.0B', yoy: '+8%', beat: 'In line with est $10.0B', note: 'First-ever $10B quarter; subscription rev $9.45B (+9%)' },
        eps: { val: '$3.81 adj', yoy: '+24%', beat: 'Beat est $3.05 (+25%)', note: 'GAAP EPS boosted by lower restructuring; margin expansion continuing' },
        fcf: { val: '$12.4B (FY)', margin: '32.7%', trend: '↑', note: 'FCF +31% YoY, FCF margin 32.7% — record high' },
        grossMargin: { val: '~78%', trend: '→', note: 'Estimated; SaaS model gross margin stable at high level' },
        guidance: 'FY26 revenue $40.5-40.9B (+7-8%); FY27 revenue $46B; non-GAAP op margin ~33.5%',
        highlight: 'Agentforce 5K deals, 84% auto-resolution; margin expansion continues; $12.4B FCF record',
        risk: 'Revenue growth decelerating to single digits; AI monetization still early; macro uncertainty on IT spend',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金+等价物约$12.8B', debtToEquity: '长期债务约$8.4B,D/E约0.16', currentRatio: '流动比率~1.1', capex: 'Capex约$0.9B,轻资产SaaS模式', buyback: 'FY2025回购约$9.4B', summary: '财务极健康,FCF充沛,低负债,积极回购,SaaS订阅模式提供收入可见性' },
      en: { cashPosition: 'Cash ~$12.8B', debtToEquity: 'LT debt ~$8.4B, D/E ~0.16', currentRatio: 'Current ratio ~1.1', capex: 'Capex ~$0.9B, asset-light SaaS model', buyback: '~$9.4B buybacks in FY2025', summary: 'Extremely healthy financials; abundant FCF, low debt, aggressive buybacks; SaaS subscription revenue visibility' }
    },
    moat: {
      duan: { zh: { score: '宽', analysis: '订阅模式现金流极稳定,客户锁定效应强,管理层从增长转向利润,符合好生意标准', moatType: '转换成本+数据锁定', risk: 'AI可能改变SaaS竞争格局' }, en: { score: 'Wide', analysis: 'Subscription model with very stable cash flows; strong customer lock-in; management pivoted to profitability', moatType: 'Switching costs + data lock-in', risk: 'AI may reshape SaaS competitive landscape' } },
      buffett: { zh: { score: '宽', analysis: '高转换成本创造类消费垄断;FCF利润率32.7%且持续扩张;品牌=企业CRM代名词', moatType: '消费垄断(企业版)', risk: 'SaaS估值仍偏高,需持续验证增长' }, en: { score: 'Wide', analysis: 'High switching costs create consumer-monopoly-like quality; FCF margin 32.7% expanding; brand = synonym for enterprise CRM', moatType: 'Consumer monopoly (enterprise)', risk: 'SaaS valuations still elevated, growth must be sustained' } },
      munger: { zh: { score: '宽', analysis: '企业软件是最好的商业模式之一:经常性收入+低边际成本+高锁定;Agentforce体现AI落地能力', moatType: '网络效应+生态系统', risk: '注意估值过高带来的均值回归风险' }, en: { score: 'Wide', analysis: 'Enterprise software is one of the best business models: recurring revenue + low marginal cost + high lock-in; Agentforce shows AI execution', moatType: 'Network effects + ecosystem', risk: 'Watch for mean-reversion risk from elevated valuation' } }
    },
    valuation: {
      zh: { dcf: { value: '$280-330', method: '基于FY26E FCF $14B,10%折现率,8%增长5年后4%终端', note: '对增速假设敏感,AI变现可能上修' }, peerComp: { value: '$270-320', method: 'EV/FCF 22x vs MSFT 28x/ORCL 20x', note: '低于MSFT但增速也较低' }, grahamMargin: '当前价~$300,安全边际一般', verdict: '估值合理,利润率扩张是核心逻辑,AI Agentforce提供上行空间' },
      en: { dcf: { value: '$280-330', method: 'Based on FY26E FCF $14B, 10% discount, 8% growth 5yr then 4% terminal', note: 'Sensitive to growth assumptions; AI monetization could push higher' }, peerComp: { value: '$270-320', method: 'EV/FCF 22x vs MSFT 28x / ORCL 20x', note: 'Below MSFT but growth also lower' }, grahamMargin: 'Current ~$300, moderate margin of safety', verdict: 'Fairly valued; margin expansion is the core thesis; AI Agentforce provides upside optionality' }
    },
  },

  UNH: {
    exchange: 'NYSE',
    desc: { zh: '美国最大健康保险+医疗服务公司，UnitedHealthcare+Optum垂直整合', en: 'Largest US health insurer + healthcare services; UnitedHealthcare + Optum vertical integration' },
    revGrowth: '+6.8%', epsEst: '$6.81 adj vs est $6.72', grossMargin: '23.5%', dataCenterRev: 'Optum Health + Optum Rx + UnitedHealthcare combined',
    peFwd: '16.1x', peg: '1.35', evEbitda: '13.5x', ps: '0.85x',
    netMargin: '5.5%', roe: '12.5%', fcfYield: '4.2%', divYield: '1.68%',
    valuationPctl: 35,
    summary: {
      zh: 'UnitedHealth Q4 2024营收$1008亿(+6.8% YoY),调整EPS $6.81超预期。全年营收$4008亿,调整EPS $27.66符合指引。运营现金流$24.2B(为净利润1.6倍),FCF $20.7B同比-19%主因Change Healthcare网络攻击影响。医疗保健比率承压。2025指引:营收$450-455B,调整EPS $29.50-30.00。面临CEO遇害事件后社会舆论压力、政府审查加强、医疗成本上升等挑战,但市场地位依然不可动摇。Optum业务持续增长是差异化竞争力。',
      en: 'UnitedHealth Q4 2024 revenue $100.8B (+6.8% YoY), adj EPS $6.81 beat estimates. FY2024 revenue $400.8B, adj EPS $27.66 in line with guidance. Operating cash flow $24.2B (1.6x net income), FCF $20.7B declined 19% YoY partly due to Change Healthcare cyberattack impact. Medical care ratio under pressure. 2025 guidance: revenue $450-455B, adj EPS $29.50-30.00. Facing challenges from CEO assassination aftermath, heightened government scrutiny, rising medical costs, but market position remains unassailable. Optum segment growth is a key differentiator.'
    },
    verdict: { zh: '看多 — 短期噪音大但长期地位无可替代,估值处于低位', en: 'Bullish — Short-term noise is loud but long-term position irreplaceable, valuation at low end' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '美国医疗保健支出占GDP 18%且持续增长,UNH作为最大保险+服务商地位不可动摇' },
        { status: 'positive', q: '赚得更多？ — 是', a: '美国老龄化+Medicare Advantage渗透率提升+Optum垂直整合持续推动盈利增长' },
        { status: 'positive', q: '护城河？ — 极宽', a: '规模(覆盖1.5亿人)+数据优势+Optum垂直整合+监管壁垒,竞争者极难复制' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'US healthcare spending is 18% of GDP and rising; UNH as largest insurer + services provider is unassailable' },
        { status: 'positive', q: 'Earning more? — Yes', a: 'US aging + Medicare Advantage penetration + Optum vertical integration drive sustained earnings growth' },
        { status: 'positive', q: 'Moat? — Very wide', a: 'Scale (150M+ lives) + data advantage + Optum vertical integration + regulatory barriers; nearly impossible to replicate' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '合格', q: '段永平视角：业务简单可理解(收保费+管医疗),现金流稳定增长,管理层执行力强' },
        { name: 'Buffett', color: 'green', verdict: '合格', q: '巴菲特视角：类保险浮存金模式,规模经济+垂直整合=消费垄断,长期复合增长确定' },
        { name: 'Munger', color: 'green', verdict: '优质', q: '芒格视角：医疗是刚需+老龄化趋势不可逆;当前社会舆论压力=反向买入机会;心理恐慌创造价值' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Qualified', q: 'Simple understandable business (collect premiums + manage care); stable growing cash flow; strong execution' },
        { name: 'Buffett', color: 'green', verdict: 'Qualified', q: 'Insurance float-like model; scale + vertical integration = consumer monopoly; long-term compounding certain' },
        { name: 'Munger', color: 'green', verdict: 'High quality', q: 'Healthcare is essential + aging trend irreversible; current social backlash = contrarian buy opportunity; fear creates value' },
      ],
    },
    earnings: {
      quarter: 'Q4 2024', reportDate: '2025-01-16',
      zh: {
        revenue: { val: '$100.8B', yoy: '+6.8%', beat: '略低于预期$101.7B', note: 'UnitedHealthcare $74.1B,Optum $63.3B(有内部交叉收入)' },
        eps: { val: '$6.81 adj', yoy: '+10.6%', beat: '超预期$6.72', note: 'GAAP EPS $5.98;Change Healthcare影响逐步消退' },
        fcf: { val: '$20.7B(全年)', margin: '5.2%', trend: '↓', note: 'FCF同比-19%,主因网络攻击修复支出+医疗成本上升' },
        grossMargin: { val: '23.5%', trend: '↓', note: '医疗保健比率上升压缩利润空间' },
        guidance: '2025年:营收$450-455B,GAAP EPS $28.15-28.65,调整EPS $29.50-30.00',
        highlight: 'Optum收入持续高增长;Medicare Advantage会员增加;运营现金流为净利润1.6倍',
        risk: 'CEO遇害后社会舆论/政策风险;医疗成本上升;Change Healthcare网络攻击后续影响;政府审查加强',
      },
      en: {
        revenue: { val: '$100.8B', yoy: '+6.8%', beat: 'Slightly missed est $101.7B', note: 'UnitedHealthcare $74.1B, Optum $63.3B (with intercompany)' },
        eps: { val: '$6.81 adj', yoy: '+10.6%', beat: 'Beat est $6.72', note: 'GAAP EPS $5.98; Change Healthcare impact fading' },
        fcf: { val: '$20.7B (FY)', margin: '5.2%', trend: '↓', note: 'FCF -19% YoY from cyberattack remediation + rising medical costs' },
        grossMargin: { val: '23.5%', trend: '↓', note: 'Medical care ratio rising compressed margins' },
        guidance: '2025: Revenue $450-455B, GAAP EPS $28.15-28.65, Adj EPS $29.50-30.00',
        highlight: 'Optum revenue strong growth; Medicare Advantage membership gains; operating cash flow 1.6x net income',
        risk: 'CEO assassination aftermath social/policy risk; rising medical costs; Change Healthcare breach fallout; government scrutiny',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金$25.3B', debtToEquity: '长期债务$72.4B,D/E约1.8(行业正常)', currentRatio: '流动比率~0.8(保险业特征)', capex: '年capex约$3.5B', buyback: '2024年回购约$6B', summary: '保险业杠杆率正常,现金流覆盖强,但长期债务规模大需关注利率环境' },
      en: { cashPosition: 'Cash $25.3B', debtToEquity: 'LT debt $72.4B, D/E ~1.8 (industry normal)', currentRatio: 'Current ratio ~0.8 (typical for insurance)', capex: 'Annual capex ~$3.5B', buyback: '~$6B buybacks in 2024', summary: 'Leverage normal for insurance; strong cash flow coverage; large LT debt requires rate environment monitoring' }
    },
    moat: {
      duan: { zh: { score: '极宽', analysis: '收保费管医疗的简单模式,规模带来成本优势和议价能力,Optum垂直整合增强价值链控制', moatType: '规模经济+垂直整合+监管壁垒', risk: '政策风险(单付制/药价管控)' }, en: { score: 'Very wide', analysis: 'Simple model of collecting premiums and managing care; scale drives cost advantage and bargaining power; Optum vertical integration', moatType: 'Economies of scale + vertical integration + regulatory barriers', risk: 'Policy risk (single payer / drug price controls)' } },
      buffett: { zh: { score: '极宽', analysis: '覆盖1.5亿人的保险浮存金+Optum数据驱动的服务平台,是健康领域的BRK', moatType: '浮存金+消费垄断+垂直整合', risk: '政治环境变化可能限制盈利能力' }, en: { score: 'Very wide', analysis: 'Float from 150M+ lives insured + Optum data-driven services platform; the BRK of healthcare', moatType: 'Float + consumer monopoly + vertical integration', risk: 'Political environment shifts may cap profitability' } },
      munger: { zh: { score: '极宽', analysis: '医疗是人类刚需(不可逆趋势)+UNH已形成数据飞轮(越大越精准);当前恐慌是逆向买入良机', moatType: '刚需+数据飞轮+规模', risk: '不要忽视制度性变革风险(逆向思考)' }, en: { score: 'Very wide', analysis: 'Healthcare is essential human need (irreversible) + UNH has data flywheel (bigger = more accurate); current fear is contrarian opportunity', moatType: 'Essential need + data flywheel + scale', risk: 'Do not ignore systemic reform risk (inversion thinking)' } }
    },
    valuation: {
      zh: { dcf: { value: '$550-650', method: '基于FY2025E FCF $24B,9%折现率,10%增长5年后5%终端', note: '医疗保健增长较确定,折现率可适当降低' }, peerComp: { value: '$520-600', method: 'PE 16x vs HUM 14x/CI 12x,合理溢价', note: '市场给予Optum增长溢价' }, grahamMargin: '当前价~$510,安全边际较大', verdict: '明显低估,社会舆论恐慌创造买入机会,长期复合增长确定' },
      en: { dcf: { value: '$550-650', method: 'Based on FY2025E FCF $24B, 9% discount, 10% growth 5yr then 5% terminal', note: 'Healthcare growth is fairly certain; lower discount rate justified' }, peerComp: { value: '$520-600', method: 'PE 16x vs HUM 14x / CI 12x, reasonable premium', note: 'Market gives Optum growth premium' }, grahamMargin: 'Current ~$510, significant margin of safety', verdict: 'Clearly undervalued; social fear creating buying opportunity; long-term compounding certain' }
    },
  },

  XOM: {
    exchange: 'NYSE',
    desc: { zh: '全球最大上市石油公司，Pioneer收购后Permian盆地最大生产商，42年股息增长', en: 'World\'s largest public oil company; largest Permian producer post-Pioneer; 42-yr dividend growth' },
    revGrowth: '-1.1%', epsEst: '$1.72 vs est $1.76', grossMargin: '32.4%', dataCenterRev: 'Permian Basin largest producer post-Pioneer acquisition',
    peFwd: '14.2x', peg: '8.50', evEbitda: '7.2x', ps: '1.4x',
    netMargin: '9.1%', roe: '15.8%', fcfYield: '6.5%', divYield: '3.41%',
    valuationPctl: 38,
    summary: {
      zh: 'ExxonMobil Q4 2024营收$83.4B同比-1.1%,略低于预期。EPS $1.72略不及预期$1.76。全年盈利$33.7B(EPS $7.84),FCF $34.4B。2024年完成Pioneer Natural Resources $63B收购,成为Permian盆地最大生产商。产量创纪录,Permian产量翻倍至130万桶/日。负债率仅13%,净负债率6%,现金$23.2B。年度股息+回购达$36B。股息连续42年增长(Dividend Aristocrat)。资本支出$27.6B符合指引。2030年计划大幅提升盈利和现金流潜力。',
      en: 'ExxonMobil Q4 2024 revenue $83.4B (-1.1% YoY), slightly below expectations. EPS $1.72 narrowly missed est $1.76. FY2024 earnings $33.7B (EPS $7.84), FCF $34.4B. Completed $63B Pioneer Natural Resources acquisition in 2024, becoming Permian Basin\'s largest producer. Record production with Permian output doubling to 1.3M BOED. Debt-to-capital just 13%, net debt 6%, cash $23.2B. Annual dividends + buybacks totaled $36B. Dividend raised 42 consecutive years (Aristocrat status). Capex $27.6B in line with guidance. 2030 plan targets significantly higher earnings and cash flow potential.'
    },
    verdict: { zh: '看多 — 能源蓝筹,Pioneer整合释放价值,股息贵族+强回购', en: 'Bullish — Energy blue chip, Pioneer integration unlocking value, Dividend Aristocrat + strong buyback' },
    verdictColor: 'text-green',
    questions: {
      zh: [
        { status: 'positive', q: '10年后还赚钱？ — 是', a: '全球最大上市石油公司,低成本资产组合+下游炼化+化工多元化确保长期盈利' },
        { status: 'uncertain', q: '赚得更多？ — 取决于油价和整合效率', a: 'Pioneer协同效应$3B+/年,Permian产量翻倍,但盈利仍受大宗商品价格主导' },
        { status: 'positive', q: '护城河？ — 极宽', a: '全球规模最大+一体化运营+低成本Permian资产+42年股息增长记录=极强竞争壁垒' },
      ],
      en: [
        { status: 'positive', q: 'Still profitable in 10 years? — Yes', a: 'World\'s largest public oil company; low-cost portfolio + downstream refining + chemicals diversification ensures profitability' },
        { status: 'uncertain', q: 'Earning more? — Oil price and integration dependent', a: 'Pioneer synergies $3B+/yr, Permian output doubled, but earnings remain commodity-driven' },
        { status: 'positive', q: 'Moat? — Very wide', a: 'Largest scale + integrated operations + low-cost Permian + 42-year dividend growth = formidable barriers' },
      ],
    },
    crossVal: {
      zh: [
        { name: 'DYP', color: 'green', verdict: '合格', q: '段永平视角：业务简单(采油炼油卖油),现金流极强,股东回报突出,管理层理性配置资本' },
        { name: 'Buffett', color: 'green', verdict: '优质能源股', q: '巴菲特视角：资源垄断型企业,现金流覆盖高额股息+回购,在能力圈内,类似CVX逻辑' },
        { name: 'Munger', color: 'green', verdict: '合理持有', q: '芒格视角：全球文明离不开石油(至少再20年),XOM低成本资产在任何油价环境都能生存;逆向思考能源转型比预期慢' },
      ],
      en: [
        { name: 'DYP', color: 'green', verdict: 'Qualified', q: 'Simple business (extract, refine, sell oil); very strong cash flow; outstanding shareholder returns; rational capital allocation' },
        { name: 'Buffett', color: 'green', verdict: 'Quality energy', q: 'Resource monopoly enterprise; FCF covers generous dividends + buybacks; within competence; similar to CVX logic' },
        { name: 'Munger', color: 'green', verdict: 'Reasonable hold', q: 'Global civilization needs oil (at least 20 more years); XOM low-cost assets survive at any oil price; inversion: energy transition is slower than expected' },
      ],
    },
    earnings: {
      quarter: 'Q4 2024', reportDate: '2025-01-31',
      zh: {
        revenue: { val: '$83.4B', yoy: '-1.1%', beat: '略低于预期', note: '油价小幅下降抵消产量增长' },
        eps: { val: '$1.72', yoy: '-11%', beat: '略低于预期$1.76', note: '全年EPS $7.84;Q4受油价和炼油利润率影响' },
        fcf: { val: '$34.4B(全年)', margin: '10.1%', trend: '→', note: 'Q4 FCF $8.0B;全年FCF覆盖$36B股东回报' },
        grossMargin: { val: '32.4%', trend: '↓', note: '油价走弱+炼油利润率下降' },
        guidance: '2025年Capex $28-33B;Permian产量目标持续增长;2030计划提升盈利潜力',
        highlight: 'Pioneer整合顺利,协同效应超$3B/年;Permian产量创纪录;股息连续42年增长',
        risk: '油价下行风险;能源转型长期压力;高额资本支出需持续高油价支撑回报率',
      },
      en: {
        revenue: { val: '$83.4B', yoy: '-1.1%', beat: 'Slightly missed', note: 'Lower oil prices offset production growth' },
        eps: { val: '$1.72', yoy: '-11%', beat: 'Missed est $1.76', note: 'FY EPS $7.84; Q4 affected by oil price and refining margins' },
        fcf: { val: '$34.4B (FY)', margin: '10.1%', trend: '→', note: 'Q4 FCF $8.0B; FY FCF covers $36B shareholder returns' },
        grossMargin: { val: '32.4%', trend: '↓', note: 'Lower oil prices + refining margin compression' },
        guidance: '2025 Capex $28-33B; Permian output targets sustained growth; 2030 plan to raise earnings potential',
        highlight: 'Pioneer integration on track, synergies >$3B/yr; record Permian production; 42 consecutive yrs of dividend growth',
        risk: 'Oil price downside risk; long-term energy transition pressure; heavy capex needs sustained high oil prices for returns',
      }
    },
    financialHealth: {
      zh: { cashPosition: '现金$23.2B', debtToEquity: '负债率13%,净负债率6%,行业最低', currentRatio: '流动比率~1.4', capex: '年capex $27.6B(含Pioneer),投资纪律严', buyback: '2024年回购$19.3B', summary: '财务极稳健,AA+信用评级,低杠杆+高FCF+慷慨股东回报,石油行业最强资产负债表之一' },
      en: { cashPosition: 'Cash $23.2B', debtToEquity: 'Debt-to-capital 13%, net debt 6%, industry lowest', currentRatio: 'Current ratio ~1.4', capex: 'Annual capex $27.6B (incl Pioneer), disciplined', buyback: '$19.3B buybacks in 2024', summary: 'Extremely solid financials; AA+ credit; low leverage + high FCF + generous returns; one of the strongest balance sheets in oil' }
    },
    moat: {
      duan: { zh: { score: '极宽', analysis: '全球最大石油公司,业务简单易懂,Pioneer整合后Permian成本优势更突出,现金流极强', moatType: '规模+低成本资源+一体化', risk: '20年以上能源转型风险' }, en: { score: 'Very wide', analysis: 'World\'s largest oil company; simple business; Pioneer integration enhances Permian cost advantage; extremely strong FCF', moatType: 'Scale + low-cost resources + integration', risk: '20+ year energy transition risk' } },
      buffett: { zh: { score: '极宽', analysis: '资源垄断+规模经济+42年股息增长=经典巴菲特标的;FCF $34B覆盖$36B回报', moatType: '资源垄断+消费必需', risk: '大宗商品价格不可预测' }, en: { score: 'Very wide', analysis: 'Resource monopoly + scale + 42-yr dividend growth = classic Buffett holding; FCF $34B covers $36B returns', moatType: 'Resource monopoly + essential commodity', risk: 'Commodity prices unpredictable' } },
      munger: { zh: { score: '极宽', analysis: '石油是文明运转的血液(至少未来20年);XOM规模最大+成本最低=最后存活者;逆向:即使能源转型,石油需求下降缓慢', moatType: '必需品垄断+最后存活者', risk: '心理偏误:不要因ESG情绪低估化石能源的持久性' }, en: { score: 'Very wide', analysis: 'Oil is the lifeblood of civilization (at least 20 more years); XOM largest scale + lowest cost = last survivor; inversion: even with transition, oil demand declines slowly', moatType: 'Essential monopoly + last survivor', risk: 'Psychological bias: don\'t underestimate fossil fuel durability due to ESG sentiment' } }
    },
    valuation: {
      zh: { dcf: { value: '$110-135', method: '基于FY2025E FCF $32B,10%折现率,$65-75油价假设', note: '对油价假设高度敏感' }, peerComp: { value: '$115-140', method: 'EV/EBITDA 7.2x vs CVX 6.8x,合理溢价因规模和整合', note: '股息率3.41%低于CVX 4.38%但回购更激进' }, grahamMargin: '当前价~$118,安全边际适中', verdict: '估值合理偏便宜,Pioneer整合释放价值+股息贵族提供长期确定性' },
      en: { dcf: { value: '$110-135', method: 'Based on FY2025E FCF $32B, 10% discount, $65-75 oil assumption', note: 'Highly sensitive to oil price assumption' }, peerComp: { value: '$115-140', method: 'EV/EBITDA 7.2x vs CVX 6.8x, reasonable premium for scale and integration', note: 'Div yield 3.41% below CVX 4.38% but more aggressive buyback' }, grahamMargin: 'Current ~$118, moderate margin of safety', verdict: 'Fair to slightly cheap; Pioneer integration unlocking value + Dividend Aristocrat provides long-term certainty' }
    },
  },


};
