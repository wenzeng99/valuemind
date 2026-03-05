// ========== ValueMind i18n ==========
export const translations = {
  zh: {
    // Nav
    'nav.recap': '每日速递',
    'nav.signal': '信号墙',
    'nav.deep': '深度分析',
    // Recap
    'recap.title': '今日市场速递',
    'recap.subtitle': '全球头条、宏观信号、价投解读。每日开盘前更新。',
    'recap.snapshot': '市场快照',
    'recap.fear': '恐惧贪婪',
    'recap.greed': '贪婪',
    'recap.neutral': '中性',
    'recap.fear_label': '恐惧',
    'recap.extreme_greed': '极度贪婪',
    'recap.extreme_fear': '极度恐惧',
    'recap.headlines': '全球财经头条',
    'recap.headlines_sub': 'Bloomberg / Reuters / FT / WSJ / CNBC',
    'recap.impact': '影响分析',
    'recap.th_event': '事件',
    'recap.th_assets': '相关资产',
    'recap.th_dir': '方向',
    'recap.th_logic': '传导逻辑',
    'recap.vitake': '价投视角',
    'recap.market_temp': '市场温度',
    'recap.action': '今日策略',
    'recap.opp': '机会雷达',
    'recap.no_news': '暂无实时新闻',
    'recap.last_updated': '最后更新',
    // Signal
    'signal.title': '每日信号墙',
    'signal.subtitle': 'AI模拟价投大师视角，覆盖全球市场。',
    'signal.green': '看得懂的机会',
    'signal.yellow': '能力圈边界',
    'signal.red': '不碰清单',
    'signal.analyze': '分析',
    // Deep
    'deep.btn': '分析 →',
    'deep.overview': '概览',
    'deep.chart': '走势图',
    'deep.financials': '财务数据',
    'deep.news': '相关新闻',
    'deep.analysis': '价值分析',
    'deep.perspective': '分析视角',
    'deep.stop': 'Stop Doing 检查',
    'deep.q_title': '三个终极问题',
    'deep.cross': '大师交叉验证',
    'deep.verdict': '最终判决',
    'deep.valuation': '估值指标',
    'deep.profitability': '盈利能力',
    // Footer
    'footer': 'AI生成分析，不构成投资建议。',
  },
  en: {
    'nav.recap': "Today's Recap",
    'nav.signal': 'Signal Wall',
    'nav.deep': 'Deep Analysis',
    'recap.title': "Today's Market Recap",
    'recap.subtitle': 'Global headlines, macro signals, and what matters for value investors. Updated daily before market open.',
    'recap.snapshot': 'Market Snapshot',
    'recap.fear': 'Fear & Greed',
    'recap.greed': 'Greed',
    'recap.neutral': 'Neutral',
    'recap.fear_label': 'Fear',
    'recap.extreme_greed': 'Extreme Greed',
    'recap.extreme_fear': 'Extreme Fear',
    'recap.headlines': 'Global Headlines',
    'recap.headlines_sub': 'Bloomberg / Reuters / FT / WSJ / CNBC',
    'recap.impact': 'Impact Analysis',
    'recap.th_event': 'Event',
    'recap.th_assets': 'Affected Assets',
    'recap.th_dir': 'Direction',
    'recap.th_logic': 'Logic',
    'recap.vitake': "Value Investor's Take",
    'recap.market_temp': 'Market Temperature',
    'recap.action': "Today's Stance",
    'recap.opp': 'Opportunity Radar',
    'recap.no_news': 'No live news available',
    'recap.last_updated': 'Last Updated',
    'signal.title': 'Daily Signal Wall',
    'signal.subtitle': 'AI-simulated perspectives from legendary value investors across global markets.',
    'signal.green': 'Actionable',
    'signal.yellow': 'Circle Edge',
    'signal.red': 'Avoid',
    'signal.analyze': 'Analyze',
    'deep.btn': 'Analyze →',
    'deep.overview': 'Overview',
    'deep.chart': 'Chart',
    'deep.financials': 'Financials',
    'deep.news': 'News',
    'deep.analysis': 'Value Analysis',
    'deep.perspective': 'Perspective',
    'deep.stop': 'Stop Doing Checklist',
    'deep.q_title': 'Three Ultimate Questions',
    'deep.cross': 'Cross-Validation',
    'deep.verdict': 'Final Verdict',
    'deep.valuation': 'Valuation',
    'deep.profitability': 'Profitability',
    'footer': 'AI-generated analysis. Not investment advice.',
  }
};

let currentLang = 'zh';

export function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const t = translations[lang]?.[key];
    if (t) el.textContent = t;
  });
}

export function t(key) {
  return translations[currentLang]?.[key] || translations.en?.[key] || key;
}

export function getLang() {
  return currentLang;
}
