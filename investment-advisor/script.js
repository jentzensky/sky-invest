const defaultHoldings = [
  {
    market: "US",
    symbol: "SOFI",
    name: "SoFi Technologies",
    qty: 53,
    price: 17.845,
    cost: 21.368,
    value: 945.79,
    pnl: -862.49,
    today: -1.85,
    theme: "Fintech / 成長股",
    news: "2026-07-01：高波動 fintech 倉，不急補。先看是否守住第一支撐，反彈靠近壓力位可考慮減壓。",
    comments: {
      bullish: "市場常討論它的 fintech 成長、會員增長、金融產品交叉銷售。",
      bearish: "擔心估值、利率環境、貸款風險和成長股波動。",
      verify: "下一次財報要看收入增速、盈利能力、存款/貸款品質。",
    },
  },
  {
    market: "US",
    symbol: "NU",
    name: "Nu Holdings",
    qty: 17,
    price: 13.25,
    cost: 16.897,
    value: 225.25,
    pnl: -62.0,
    today: 1.36,
    theme: "Digital Bank / 拉美",
    news: "2026-07-01：成長故事仍在，但目前成本偏高。等止跌/放量再小額分批，不適合一次拉低成本。",
    comments: {
      bullish: "常被看作拉美 digital bank 高成長代表，市場喜歡它的用戶增長。",
      bearish: "估值、匯率、巴西利率和信貸週期是主要擔心。",
      verify: "看淨利潤、NPL 壞帳、ARPU 和管理層 guidance。",
    },
  },
  {
    market: "US",
    symbol: "VITL",
    name: "Vital Farms",
    qty: 54,
    price: 11.02,
    cost: 21.876,
    value: 595.08,
    pnl: -586.22,
    today: -9.18,
    theme: "Consumer / 食品",
    news: "2026-07-01：目前是最需要紀律的一支。除非財報/毛利率改善，不建議因跌深硬補。",
    comments: {
      bullish: "支持者看好品牌、健康食品趨勢和高品質雞蛋定位。",
      bearish: "市場擔心增長放慢、毛利率、食品成本和競爭。",
      verify: "看同店/渠道增長、毛利率和管理層是否下修預期。",
    },
  },
  {
    market: "US",
    symbol: "GRAB",
    name: "Grab Holdings",
    qty: 56,
    price: 3.625,
    cost: 4.12,
    value: 203.0,
    pnl: -27.72,
    today: 4.2,
    theme: "Super App / 東南亞",
    news: "2026-07-01：虧損幅度相對可控。若反彈接近成本區，可先減壓；若跌回支撐才重新觀察加倉。",
    comments: {
      bullish: "市場看好東南亞 super app、生態和盈利改善。",
      bearish: "擔心競爭、補貼、增長放慢和估值修復時間太久。",
      verify: "看 EBITDA、free cash flow、金融服務虧損是否收窄。",
    },
  },
  {
    market: "MY",
    symbol: "MATRIX",
    name: "Matrix Concepts",
    qty: 2500,
    price: 1.18,
    cost: 1.38,
    value: 2950.0,
    pnl: -500.0,
    today: -25.0,
    theme: "Property / Dividend",
    news: "2026-07-01：地產收息倉，重點看派息與銷售進度。可等更舒服價格，不必急補。",
    comments: {
      bullish: "投資者通常看重股息、土地儲備和房產銷售韌性。",
      bearish: "擔心地產週期、利率、銷售放慢和估值折價。",
      verify: "看未入賬銷售、派息率、負債和新項目 take-up rate。",
    },
  },
  {
    market: "MY",
    symbol: "RHBBANK",
    name: "RHB Bank",
    qty: 400,
    price: 8.32,
    cost: 8.395,
    value: 3328.0,
    pnl: -30.0,
    today: 40.0,
    theme: "Bank / Dividend",
    news: "2026-07-01：接近成本，適合繼續當股息倉觀察；加倉要避免和 Maybank/CIMB 過度重疊。",
    comments: {
      bullish: "常被視為股息穩定、估值合理的馬股銀行選擇。",
      bearish: "擔心銀行業息差壓縮、壞帳和股息成長有限。",
      verify: "看 NIM、CET1、ROE、派息率和管理層展望。",
    },
  },
  {
    market: "MY",
    symbol: "MAYBANK",
    name: "Maybank",
    qty: 300,
    price: 10.8,
    cost: 9.92,
    value: 3240.0,
    pnl: 264.0,
    today: 0.0,
    theme: "Bank / Core",
    news: "2026-07-01：目前有利潤，是馬股核心底倉。不要追高，回調才考慮分批，股息率要比價格更重要。",
    comments: {
      bullish: "市場普遍把它看作馬股銀行龍頭和長期股息核心。",
      bearish: "風險是價格太高時股息率下降，以及銀行業週期。",
      verify: "看股息是否穩定、NIM、ROE、壞帳和大盤資金流。",
    },
  },
];

let holdings = loadHoldings();

const currency = {
  US: "$",
  MY: "RM",
  SG: "S$",
  HK: "HK$",
};

let currentFilter = "all";
let currentRegion = "all";
let currentIdea = "all";
let currentAllocationMarket = "MY";
const userSettings = loadSettings();
let cloudClient = null;
let cloudSession = null;

const glossary = [
  {
    term: "支撐位",
    explain: "股價跌到這附近，買盤可能變多。不是保證反彈，只是比較值得觀察的位置。",
  },
  {
    term: "阻力位",
    explain: "股價漲到這附近，賣壓可能變大。虧損股回到成本附近通常會遇到阻力。",
  },
  {
    term: "Avg Down",
    explain: "跌了再買，把平均成本拉低。只能分批做，不能因為不甘心就一直補。",
  },
  {
    term: "Guidance",
    explain: "公司對未來業績的預測。財報後股價常常不是看過去，而是看它對未來說什麼。",
  },
];

const checklist = [
  "這筆買入後，單一股票會不會超過總資金 20%",
  "是否跌到計劃支撐位，而不是臨時手癢",
  "財報或重大消息是否快到了",
  "如果再跌 10%，你是否還睡得著",
  "有沒有先寫好止損或減倉條件",
];

const learningResources = [
  {
    name: "Finance Lang 財經狼",
    region: "馬來西亞",
    focus: "馬來西亞投資、理財、股市與財經時事，適合建立本地市場感。",
    url: "https://www.youtube.com/results?search_query=Finance+Lang+%E8%B2%A1%E7%B6%93%E7%8B%BC",
  },
  {
    name: "Mr Money TV 中文內容",
    region: "馬來西亞",
    focus: "個人理財、投資心態、資產配置，適合新手建立長期框架。",
    url: "https://www.youtube.com/results?search_query=Mr+Money+TV+%E4%B8%AD%E6%96%87+%E6%8A%95%E8%B3%87",
  },
  {
    name: "尼克 Nick",
    region: "美股 / ETF",
    focus: "美股、ETF、長期投資與市場觀察；適合看大方向，不盲目跟單。",
    url: "https://www.youtube.com/results?search_query=%E5%B0%BC%E5%85%8B+Nick+%E6%8A%95%E8%B3%87+%E7%BE%8E%E8%82%A1",
  },
  {
    name: "陳劍",
    region: "美股 / 科技股",
    focus: "美股、科技股、宏觀與產業觀點；適合做參考，仍要回到自己的風險承受。",
    url: "https://www.youtube.com/results?search_query=%E9%99%B3%E5%8A%8D+%E6%8A%95%E8%B3%87+%E7%BE%8E%E8%82%A1",
  },
  {
    name: "柴鼠兄弟",
    region: "台灣 / ETF",
    focus: "ETF、理財觀念、資產配置，內容相對生活化，適合新手慢慢學。",
    url: "https://www.youtube.com/@ZRBros",
  },
  {
    name: "SHIN LI",
    region: "馬來西亞 / 理財",
    focus: "大馬個人理財、儲蓄、投資入門，可作生活化補充。",
    url: "https://www.youtube.com/results?search_query=SHIN+LI+%E9%A6%AC%E4%BE%86%E8%A5%BF%E4%BA%9E+%E7%90%86%E8%B2%A1",
  },
];

const codexBriefingPlan = [
  {
    title: "2026-07-01 今日總體",
    copy: "免費行情源今日回應不穩，先不偽造即時價。操作上用券商現價確認：美股成長倉先防守，馬股股息倉可作核心觀察。",
  },
  {
    title: "你的 Portfolio 狀況",
    copy: "目前最大壓力仍在 VITL、NU、SOFI；GRAB 較接近可觀察反彈減壓。MAYBANK 有利潤，RHB 接近成本，MATRIX 屬收息/地產週期觀察。",
  },
  {
    title: "今日部署建議",
    copy: "有新錢時，不建議一次補最弱美股。優先保留現金，等支撐位；馬股股息核心只在回調分批，Maybank 不追高，RHB/MATRIX 看派息與大盤情緒。",
  },
  {
    title: "今日學習點",
    copy: "Avg down 不是跌越多越要買，而是公司基本面沒壞、價格到支撐、單一股比例不過重時，才小額分批降低成本。",
  },
];

const stockIdeas = [
  {
    category: "conservative",
    market: "MY",
    symbol: "MAYBANK",
    name: "Maybank",
    style: "保守股息",
    why: "銀行龍頭、股息穩定、適合當馬股核心底倉。",
    risk: "追太高會降低股息率；也要看利率和銀行業壞帳。",
  },
  {
    category: "conservative",
    market: "MY",
    symbol: "TENAGA",
    name: "Tenaga Nasional",
    style: "防守公用事業",
    why: "公用事業現金流相對穩，能分散銀行股集中風險。",
    risk: "受政策、電價和政府監管影響。",
  },
  {
    category: "long",
    market: "US",
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    style: "長期核心",
    why: "一次買進美國大型企業組合，適合長期定投。",
    risk: "短期仍會跟美股大盤下跌；股息率不高。",
  },
  {
    category: "conservative",
    market: "US",
    symbol: "SCHD",
    name: "US Dividend ETF",
    style: "美國股息",
    why: "偏品質股息股，適合和 VOO 搭配做現金流。",
    risk: "科技成長股比重較低，牛市可能跑輸大盤。",
  },
  {
    category: "long",
    market: "SG",
    symbol: "DBS",
    name: "DBS Group",
    style: "長期股息銀行",
    why: "新加坡銀行龍頭，適合作為區域金融和股息 exposure。",
    risk: "利率下行時銀行息差可能受壓。",
  },
  {
    category: "conservative",
    market: "SG",
    symbol: "C38U",
    name: "CICT REIT",
    style: "REIT 收租",
    why: "商業地產 REIT，可補足股息現金流和新加坡資產配置。",
    risk: "高利率和出租率下降會影響 DPU。",
  },
  {
    category: "growth",
    market: "US",
    symbol: "MSFT",
    name: "Microsoft",
    style: "優質成長",
    why: "雲端、AI、企業軟體護城河強，適合長期觀察。",
    risk: "估值通常不便宜，適合分批等回調。",
  },
  {
    category: "growth",
    market: "US",
    symbol: "GOOGL",
    name: "Alphabet",
    style: "AI + 廣告現金流",
    why: "搜尋、YouTube、雲端和 AI 生態，現金流強。",
    risk: "監管和 AI 競爭會影響估值。",
  },
  {
    category: "potential",
    market: "US",
    symbol: "SOFI",
    name: "SoFi Technologies",
    style: "高波動潛力",
    why: "fintech 成長題材仍有想像空間，你已持有，可用來做反彈減壓觀察。",
    risk: "波動大，不適合新錢重倉硬補。",
  },
  {
    category: "potential",
    market: "CN",
    symbol: "2800.HK",
    name: "Tracker Fund of Hong Kong",
    style: "港股低估值觀察",
    why: "港股估值有時較便宜，可作小比例反轉配置。",
    risk: "政策、資金流和中國經濟情緒影響大。",
  },
  {
    category: "growth",
    market: "CN",
    symbol: "MCHI",
    name: "MSCI China ETF",
    style: "中國大盤",
    why: "分散持有中國大型企業，比單買一支股票更適合新手。",
    risk: "波動和政策風險高，只適合小比例。",
  },
  {
    category: "potential",
    market: "MY",
    symbol: "CIMB",
    name: "CIMB Group",
    style: "銀行成長 + 股息",
    why: "比 Maybank 更偏成長和區域 exposure，可作馬股銀行觀察名單。",
    risk: "銀行類重疊高，避免和 Maybank/RHB 配太重。",
  },
];

const dividendCandidates = [
  {
    region: "MY",
    symbol: "MAYBANK",
    name: "Maybank",
    price: 10.8,
    current: "RM10.80",
    yield: 5.6,
    role: "核心收息",
    note: "你已持有，適合作為長期核心。銀行龍頭，重點看派息是否穩定和買入價不要追太高。",
  },
  {
    region: "MY",
    symbol: "RHBBANK",
    name: "RHB Bank",
    price: 8.32,
    current: "RM8.32",
    yield: 5.0,
    role: "穩定補強",
    note: "你已持有，波動通常比成長股舒服。適合分批加，但不要和 Maybank/CIMB 全部重疊太重。",
  },
  {
    region: "MY",
    symbol: "CIMB",
    name: "CIMB Group",
    price: 7.0,
    current: "約 RM7.00",
    yield: 4.5,
    role: "銀行成長 + 股息",
    note: "可列入觀察。比 Maybank 更偏成長和 ASEAN exposure，買點要看估值和大盤銀行股情緒。",
  },
  {
    region: "MY",
    symbol: "PBBANK",
    name: "Public Bank",
    price: 4.3,
    current: "約 RM4.30",
    yield: 4.0,
    role: "防守型銀行",
    note: "通常較穩，但股息率未必最高。適合當防守倉，不一定是最高收益選擇。",
  },
  {
    region: "MY",
    symbol: "TENAGA",
    name: "Tenaga Nasional",
    price: 14.0,
    current: "約 RM14.00",
    yield: 3.5,
    role: "公用事業",
    note: "偏防守和現金流，但要看電價政策與政府監管。可作銀行以外的分散。",
  },
  {
    region: "MY",
    symbol: "AXREIT",
    name: "Axis REIT",
    price: 1.8,
    current: "約 RM1.80",
    yield: 5.0,
    role: "REIT 收租",
    note: "REIT 可補足股息現金流，但利率高時估值會受壓。適合慢慢研究，不一次重倉。",
  },
  {
    region: "US",
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    price: 0,
    current: "待接行情",
    yield: 1.2,
    role: "美股核心增長",
    note: "追蹤 S&P 500，股息不高但長期增長品質好。適合新手用定投，不適合拿來短炒。",
  },
  {
    region: "US",
    symbol: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    price: 0,
    current: "約 $32.10",
    yield: 3.25,
    role: "美國股息 ETF",
    note: "偏高品質股息股，適合和 VOO 搭配。股息比 S&P 500 高，但成長性通常較溫和。",
  },
  {
    region: "US",
    symbol: "VNQ",
    name: "Vanguard Real Estate ETF",
    price: 0,
    current: "待接行情",
    yield: 3.8,
    role: "美國 REIT",
    note: "提供房地產收息 exposure，但會受利率影響。適合小比例，不要當唯一核心。",
  },
  {
    region: "SG",
    symbol: "DBS",
    name: "DBS Group",
    price: 0,
    current: "待接行情",
    yield: 4.5,
    role: "新加坡銀行核心",
    note: "新加坡銀行龍頭，適合收息和區域金融 exposure。買點要看估值和利率周期。",
  },
  {
    region: "SG",
    symbol: "UOB",
    name: "UOB",
    price: 0,
    current: "待接行情",
    yield: 4.5,
    role: "新加坡銀行分散",
    note: "可和 DBS 分散，但同屬銀行，不要全部集中在金融業。",
  },
  {
    region: "SG",
    symbol: "C38U",
    name: "CapitaLand Integrated Commercial Trust",
    price: 0,
    current: "待接行情",
    yield: 5.0,
    role: "新加坡 REIT",
    note: "偏收租現金流，利率下降時通常較舒服。REIT 要看出租率、DPU 和負債成本。",
  },
  {
    region: "CN",
    symbol: "MCHI",
    name: "iShares MSCI China ETF",
    price: 0,
    current: "約 $50.48",
    yield: 2.3,
    role: "中國大盤 ETF",
    note: "中國 exposure 波動較大，股息不是主菜。適合小比例配置，不建議新手重倉。",
  },
  {
    region: "CN",
    symbol: "2800.HK",
    name: "Tracker Fund of Hong Kong",
    price: 0,
    current: "待接行情",
    yield: 3.0,
    role: "港股大盤",
    note: "追蹤香港大盤，估值有時便宜，但需要承受政策和資金流波動。",
  },
];

const marketPulse = {
  mood: "Cautious",
  title: "今天策略：先確認行情，不急著補最弱倉",
  reason:
    "2026-07-01 更新：你的美股虧損倉仍需要時間解套，新錢先不要急著平均下去。若手上有現金，優先分三份：一份留現金、一份等馬股股息核心回調、一份只在美股跌到支撐後小額試單。",
};

const pct = (item) => ((item.price - item.cost) / item.cost) * 100;
const fmt = (value, market = "US") => `${currency[market]}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const profileKey = (email) => `skyInvestHoldings:${email.toLowerCase().trim()}`;

function activeProfileEmail() {
  return (localStorage.getItem("skyInvestActiveProfile") || "").trim();
}

function setActiveProfileEmail(email) {
  const normalized = email.toLowerCase().trim();
  if (normalized) {
    localStorage.setItem("skyInvestActiveProfile", normalized);
  } else {
    localStorage.removeItem("skyInvestActiveProfile");
  }
  return normalized;
}

function loadHoldings() {
  try {
    const email = activeProfileEmail();
    const saved = localStorage.getItem(email ? profileKey(email) : "skyInvestHoldings");
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.warn("Unable to load saved portfolio", error);
  }
  return defaultHoldings.map((item) => ({ ...item }));
}

function saveHoldings() {
  const email = activeProfileEmail();
  localStorage.setItem(email ? profileKey(email) : "skyInvestHoldings", JSON.stringify(holdings));
  const status = document.querySelector("#saveStatus");
  if (status) {
    const owner = email ? email.split("@")[0] : "本機預設";
    status.textContent = `${owner} 已保存 · ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  updateProfileStatus();
}

function updateProfileStatus() {
  const email = activeProfileEmail();
  const input = document.querySelector("#profileEmail");
  const status = document.querySelector("#profileStatus");
  if (input) input.value = email;
  if (status) {
    status.textContent = email
      ? `目前 profile：${email} · 此裝置獨立保存`
      : "目前使用本機預設 portfolio";
  }
}

function loadCloudConfig() {
  try {
    return {
      url: "",
      anonKey: "",
      email: "",
      ...(JSON.parse(localStorage.getItem("skyInvestCloudConfig") || "{}")),
    };
  } catch (error) {
    return { url: "", anonKey: "", email: "" };
  }
}

function saveCloudConfig(config) {
  localStorage.setItem("skyInvestCloudConfig", JSON.stringify(config));
}

function setCloudStatus(message, tone = "muted") {
  const status = document.querySelector("#cloudStatus");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function readCloudConfigFromUi() {
  return {
    url: document.querySelector("#supabaseUrl")?.value.trim() || "",
    anonKey: document.querySelector("#supabaseAnonKey")?.value.trim() || "",
    email: document.querySelector("#cloudEmail")?.value.trim().toLowerCase() || "",
  };
}

function applyCloudConfigToUi() {
  const config = loadCloudConfig();
  const activeEmail = activeProfileEmail();
  const url = document.querySelector("#supabaseUrl");
  const key = document.querySelector("#supabaseAnonKey");
  const email = document.querySelector("#cloudEmail");
  if (url) url.value = config.url;
  if (key) key.value = config.anonKey;
  if (email) email.value = config.email || activeEmail;
}

function getCloudClient() {
  const config = loadCloudConfig();
  if (!config.url || !config.anonKey) {
    setCloudStatus("請先保存 Supabase 設定", "warn");
    return null;
  }
  if (!window.supabase?.createClient) {
    setCloudStatus("Supabase SDK 載入中，請稍後再試", "warn");
    return null;
  }
  if (!cloudClient) {
    cloudClient = window.supabase.createClient(config.url, config.anonKey);
  }
  return cloudClient;
}

async function refreshCloudSession() {
  const client = getCloudClient();
  if (!client) return null;
  const { data, error } = await client.auth.getSession();
  if (error) {
    setCloudStatus(`登入狀態讀取失敗：${error.message}`, "danger");
    return null;
  }
  cloudSession = data.session;
  if (cloudSession?.user?.email) {
    setActiveProfileEmail(cloudSession.user.email);
    updateProfileStatus();
    setCloudStatus(`已登入：${cloudSession.user.email}`, "ok");
  } else {
    setCloudStatus("未登入 Supabase", "muted");
  }
  return cloudSession;
}

async function sendMagicLink() {
  const config = readCloudConfigFromUi();
  if (!config.url || !config.anonKey || !config.email) {
    setCloudStatus("請填 Project URL、anon key 和 Email", "warn");
    return;
  }
  saveCloudConfig(config);
  cloudClient = null;
  const client = getCloudClient();
  if (!client) return;
  const { error } = await client.auth.signInWithOtp({
    email: config.email,
    options: { emailRedirectTo: `${location.origin}${location.pathname}` },
  });
  if (error) {
    setCloudStatus(`登入連結寄送失敗：${error.message}`, "danger");
    return;
  }
  setCloudStatus(`登入連結已寄到 ${config.email}`, "ok");
}

async function uploadPortfolioToCloud() {
  const session = cloudSession || (await refreshCloudSession());
  if (!session?.user) {
    setCloudStatus("請先用 Email 登入", "warn");
    return;
  }
  const client = getCloudClient();
  if (!client) return;
  saveHoldings();
  const payload = {
    user_id: session.user.id,
    email: session.user.email,
    profile_email: activeProfileEmail() || session.user.email,
    holdings,
    updated_at: new Date().toISOString(),
  };
  const { error } = await client.from("portfolios").upsert(payload, { onConflict: "user_id" });
  if (error) {
    setCloudStatus(`同步失敗：${error.message}`, "danger");
    return;
  }
  setCloudStatus(`已同步到雲端：${session.user.email}`, "ok");
}

async function downloadPortfolioFromCloud() {
  const session = cloudSession || (await refreshCloudSession());
  if (!session?.user) {
    setCloudStatus("請先用 Email 登入", "warn");
    return;
  }
  const client = getCloudClient();
  if (!client) return;
  const { data, error } = await client
    .from("portfolios")
    .select("holdings, profile_email, updated_at")
    .eq("user_id", session.user.id)
    .single();
  if (error) {
    setCloudStatus(`雲端讀取失敗：${error.message}`, "danger");
    return;
  }
  holdings = Array.isArray(data.holdings) ? data.holdings : defaultHoldings.map((item) => ({ ...item }));
  setActiveProfileEmail(data.profile_email || session.user.email);
  saveHoldings();
  updateProfileStatus();
  refreshApp(holdings[0]?.symbol || "VITL");
  setCloudStatus(`已載入雲端 portfolio · ${new Date(data.updated_at).toLocaleString()}`, "ok");
}

async function signOutCloud() {
  const client = getCloudClient();
  if (!client) return;
  await client.auth.signOut();
  cloudSession = null;
  setCloudStatus("已登出 Supabase", "muted");
}

function loadSettings() {
  try {
    return {
      theme: "dark",
      language: "zh",
      fontSize: "normal",
      density: "comfortable",
      ...(JSON.parse(localStorage.getItem("skyInvestSettings") || "{}")),
    };
  } catch (error) {
    return { theme: "dark", language: "zh", fontSize: "normal", density: "comfortable" };
  }
}

function saveSettings() {
  localStorage.setItem("skyInvestSettings", JSON.stringify(userSettings));
}

function applySettings() {
  document.body.dataset.theme = userSettings.theme;
  document.body.dataset.language = userSettings.language;
  document.body.dataset.fontSize = userSettings.fontSize;
  document.body.dataset.density = userSettings.density;
  document.querySelector("#themeSelect").value = userSettings.theme;
  document.querySelector("#languageSelect").value = userSettings.language;
  document.querySelector("#fontSizeSelect").value = userSettings.fontSize;
  document.querySelector("#densitySelect").value = userSettings.density;
}

function refreshApp(focusSymbol = "VITL") {
  renderSummary();
  renderPortfolioHealth();
  renderAllocationChart();
  renderHoldings();
  const fallback = holdings[0]?.symbol || "VITL";
  setFocus(holdings.some((item) => item.symbol === focusSymbol) ? focusSymbol : fallback);
  renderCashAlert();
}

function setupCollapsibleSections() {
  const sections = document.querySelectorAll(".workspace > section");
  sections.forEach((section, index) => {
    if (section.dataset.collapsibleReady === "true") return;
    section.dataset.collapsibleReady = "true";
    const existing = section.innerHTML;
    section.innerHTML = `
      <button class="section-toggle" type="button" aria-expanded="true">
        <span>收合 / 展開</span>
        <b>−</b>
      </button>
      <div class="section-content">${existing}</div>
    `;
    const toggle = section.querySelector(".section-toggle");
    toggle.addEventListener("click", () => {
      const collapsed = section.classList.toggle("is-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.querySelector("b").textContent = collapsed ? "+" : "−";
    });
  });
}

async function sendSupportAlert(message) {
  if (!("Notification" in window)) {
    alert(message);
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    new Notification("SKY invest 支撐點提醒", { body: message });
  } else {
    alert(message);
  }
}

function checkSupportAlerts() {
  const candidates = holdings.filter((item) => {
    const zone = buyZone(item);
    return zone.cls === "zone-good" || (zone.cls === "zone-watch" && item.price <= levels(item).support1);
  });
  if (!candidates.length) return "目前沒有持倉剛好進入適合買入支撐區。";
  return `${candidates.map((item) => item.symbol).join(", ")} 已接近買入/支撐觀察區，請打開 SKY invest 看分批計劃。`;
}

function classify(item) {
  const loss = pct(item);
  if (loss <= -35) {
    return {
      label: "危險",
      cls: "danger",
      action: "先停手",
      tone: "跌幅太深，先等止跌和財報確認，不要情緒化補倉。",
    };
  }
  if (loss <= -12) {
    return {
      label: "偏高",
      cls: "watch",
      action: "等支撐",
      tone: "成本偏高，可以補，但只能分批，並且要在支撐位附近。",
    };
  }
  if (loss < 8) {
    return {
      label: "合理",
      cls: "good",
      action: "持有",
      tone: "位置還算舒服，重點是守住節奏，不急著追。",
    };
  }
  return {
    label: "有利潤",
    cls: "good",
    action: "守盈利",
    tone: "已經有浮盈，可以用移動止盈保護勝利。",
  };
}

function levels(item) {
  const support1 = item.price * 0.94;
  const support2 = item.price * 0.88;
  const resistance = item.cost > item.price ? item.cost : item.price * 1.08;
  return { support1, support2, resistance };
}

function avgDownPlan(item) {
  const l = levels(item);
  return [
    {
      title: "第一層",
      price: l.support1,
      copy: "只買計劃資金的 30%。目的是拉低成本，不是賭反彈。",
    },
    {
      title: "第二層",
      price: l.support2,
      copy: "再買 30%。需要看到成交量收斂或止跌訊號。",
    },
    {
      title: "第三層",
      price: item.price * 0.8,
      copy: "最後 40%。如果基本面變差，這層取消，不硬接。",
    },
  ];
}

function buyZone(item) {
  const l = levels(item);
  const state = classify(item);
  if (state.cls === "danger") {
    return {
      label: "不急補",
      text: `${fmt(l.support2, item.market)} 下方才重新評估`,
      cls: "zone-danger",
    };
  }
  if (state.cls === "watch") {
    return {
      label: "等回調",
      text: `${fmt(l.support1, item.market)} - ${fmt(l.support2, item.market)}`,
      cls: "zone-watch",
    };
  }
  return {
    label: "可分批",
    text: `${fmt(item.price * 0.97, item.market)} 附近`,
    cls: "zone-good",
  };
}

function renderHoldings() {
  const body = document.querySelector("#holdingsBody");
  const rows = holdings
    .filter((item) => currentFilter === "all" || item.market === currentFilter)
    .map((item) => {
      const state = classify(item);
      const loss = pct(item);
      const zone = buyZone(item);
      return `
        <tr>
          <td>
            <span class="symbol">
              <strong>${item.symbol}</strong>
              <span>${item.name}</span>
            </span>
          </td>
          <td>${item.qty.toLocaleString()}</td>
          <td>${fmt(item.price, item.market)}</td>
          <td>${fmt(item.cost, item.market)}</td>
          <td><span class="buy-zone ${zone.cls}"><b>${zone.label}</b>${zone.text}</span></td>
          <td><span class="news-chip">${item.news}</span></td>
          <td><button class="mini-button sentiment-button" data-symbol="${item.symbol}" type="button">看聲量</button></td>
          <td><span class="status ${state.cls}">${state.label} · ${loss.toFixed(1)}%</span></td>
          <td><button class="mini-button" data-symbol="${item.symbol}">${state.action}</button></td>
        </tr>
      `;
    })
    .join("");

  body.innerHTML = rows;

  body.querySelectorAll("button").forEach((button) => {
    if (button.classList.contains("sentiment-button")) {
      button.addEventListener("click", () => openSentimentPanel(button.dataset.symbol));
    } else {
      button.addEventListener("click", () => setFocus(button.dataset.symbol));
    }
  });
}

function openSentimentPanel(symbol) {
  const item = holdings.find((entry) => entry.symbol === symbol);
  if (!item) return;
  const comments = item.comments || {
    bullish: "手動新增股票，暫時沒有自動整理到線上評論。",
    bearish: "請先用 Codex 晨報或手動更新資料來補充市場看法。",
    verify: "接行情/新聞資料源後會自動合併評論、新聞和公告。",
  };
  document.querySelector("#sentimentTitle").textContent = `${item.symbol} 線上評論摘要`;
  document.querySelector("#sentimentBody").innerHTML = `
    <article class="sentiment-card green"><span>市場看多</span><p>${comments.bullish}</p></article>
    <article class="sentiment-card red"><span>市場擔心</span><p>${comments.bearish}</p></article>
    <article class="sentiment-card blue"><span>需要核實</span><p>${comments.verify}</p></article>
    <article class="sentiment-card gold"><span>我的判斷方式</span><p>不要只看網友留言。先看財報、支撐位、你的成本和 portfolio 比重，再決定是否加倉、持有或減壓。</p></article>
  `;
  document.querySelector("#sentimentPanel").classList.add("open");
}

function setFocus(symbol) {
  const item = holdings.find((entry) => entry.symbol === symbol) || holdings[2];
  const state = classify(item);
  const l = levels(item);

  document.querySelector("#focusCard").innerHTML = `
    <span class="pill ${state.cls === "danger" ? "muted" : ""}">${item.theme}</span>
    <div>
      <p class="eyebrow">Focus Stock</p>
      <strong>${item.symbol}</strong>
      <p>${state.tone}</p>
    </div>
    <div class="levels">
      <div class="level"><span>第一支撐</span><strong>${fmt(l.support1, item.market)}</strong></div>
      <div class="level"><span>第二支撐</span><strong>${fmt(l.support2, item.market)}</strong></div>
      <div class="level"><span>壓力 / 回本</span><strong>${fmt(l.resistance, item.market)}</strong></div>
    </div>
  `;

  const strategies = [
    {
      title: `${item.symbol} 的成本判斷`,
      copy:
        pct(item) < -20
          ? "你的買入價明顯偏高。現在最重要不是馬上補，而是確認它不是基本面轉弱。"
          : "成本壓力可控，適合用技術位管理，不需要過度操作。",
    },
    {
      title: "買賣節奏",
      copy: `低於 ${fmt(l.support1, item.market)} 才開始看第一筆；回到 ${fmt(l.resistance, item.market)} 附近先評估減壓或保本。`,
    },
    {
      title: "風險提醒",
      copy: "單一成長股不要補到超過整個 portfolio 的 20%。銀行/股息股可當穩定層，但也要看大盤資金流。",
    },
  ];

  document.querySelector("#strategyList").innerHTML = strategies
    .map((entry) => `<article class="strategy-item"><strong>${entry.title}</strong><p>${entry.copy}</p></article>`)
    .join("");

  document.querySelector("#avgPlan").innerHTML = avgDownPlan(item)
    .map(
      (entry) => `
      <article class="plan-card">
        <strong>${entry.title} · ${fmt(entry.price, item.market)}</strong>
        <p>${entry.copy}</p>
      </article>
    `,
    )
    .join("");
}

function renderSummary() {
  const stress = holdings.reduce((score, item) => {
    const loss = Math.max(0, -pct(item));
    return score + loss * (item.value / 1000);
  }, 0);
  const risk = Math.min(88, Math.round(44 + stress / 5));
  document.querySelector("#riskScore").textContent = risk;
  document.querySelector("#riskBar").style.width = `${risk}%`;
}

function renderPortfolioHealth() {
  const usValue = holdings.filter((item) => item.market === "US").reduce((sum, item) => sum + item.value, 0);
  const myValue = holdings.filter((item) => item.market === "MY").reduce((sum, item) => sum + item.value, 0);
  const weakStocks = holdings.filter((item) => pct(item) <= -12);
  const winners = holdings.filter((item) => pct(item) > 0);
  const dividendValue = holdings
    .filter((item) => ["MAYBANK", "RHBBANK", "MATRIX"].includes(item.symbol))
    .reduce((sum, item) => sum + item.value, 0);
  const totalApprox = usValue * 4.7 + myValue;
  const dividendWeight = totalApprox ? Math.round((dividendValue / totalApprox) * 100) : 0;
  const usWeight = totalApprox ? Math.round(((usValue * 4.7) / totalApprox) * 100) : 0;

  const verdict =
    weakStocks.length >= 4
      ? "需要減少成長股壓力"
      : dividendWeight >= 60
        ? "股息底倉正在成形"
        : "配置還在轉型中";

  document.querySelector("#healthBadge").textContent = verdict;
  document.querySelector("#portfolioHealth").innerHTML = [
    {
      title: "整體判斷",
      value: verdict,
      copy: "你的馬股股息/銀行倉比較穩，美股成長股目前是主要心理壓力。策略不應該是急著回本，而是慢慢把 portfolio 轉成有現金流。",
      tone: "blue",
    },
    {
      title: "美股壓力",
      value: `${usWeight}%`,
      copy: `目前有 ${weakStocks.length} 支股票成本偏高或危險。SOFI、VITL 不建議用新錢重補，等反彈或財報確認後才處理。`,
      tone: "red",
    },
    {
      title: "股息底倉",
      value: `${dividendWeight}%`,
      copy: "Maybank / RHB / Matrix 是你現在比較接近長期收息的部分。下一步可以慢慢加入 CIMB、REIT 或 SCHD/VOO 來分散。",
      tone: "green",
    },
    {
      title: "下一步建議",
      value: "分批轉換",
      copy: `保留現金，優先買股息核心；${winners.map((item) => item.symbol).join(" / ") || "盈利股"} 可用移動止盈保護，美股虧損股反彈時分段減壓。`,
      tone: "gold",
    },
  ]
    .map(
      (item) => `
        <article class="health-card ${item.tone}">
          <span>${item.title}</span>
          <strong>${item.value}</strong>
          <p>${item.copy}</p>
        </article>
      `,
    )
    .join("");
}

function renderLearningTools() {
  document.querySelector("#glossary").innerHTML = glossary
    .map((entry) => `<article><strong>${entry.term}</strong><p>${entry.explain}</p></article>`)
    .join("");

  document.querySelector("#tradeChecklist").innerHTML = checklist
    .map((item, index) => `<label><input type="checkbox" ${index < 2 ? "checked" : ""} /> ${item}</label>`)
    .join("");
}

function renderAllocationChart() {
  const values = {
    MY: holdings.filter((item) => item.market === "MY").reduce((sum, item) => sum + item.value, 0),
    US: holdings.filter((item) => item.market === "US").reduce((sum, item) => sum + item.value * 4.7, 0),
    SG: holdings.filter((item) => item.market === "SG").reduce((sum, item) => sum + item.value * 3.5, 0),
    HK: holdings.filter((item) => item.market === "HK").reduce((sum, item) => sum + item.value * 0.6, 0),
  };
  const total = Object.values(values).reduce((sum, value) => sum + value, 0) || 1;
  const parts = [
    { market: "MY", label: "馬來西亞", value: values.MY, color: "#3ee4a0" },
    { market: "US", label: "美國", value: values.US, color: "#7db5ff" },
    { market: "SG", label: "新加坡", value: values.SG, color: "#e3be65" },
    { market: "HK", label: "中國/港股", value: values.HK, color: "#c7a3ff" },
  ].filter((item) => item.value > 0);

  let cursor = 0;
  const gradient = parts
    .map((item) => {
      const start = cursor;
      const end = cursor + (item.value / total) * 100;
      cursor = end;
      return `${item.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`;
    })
    .join(", ");

  document.querySelector("#allocationDonut").style.background = `conic-gradient(${gradient})`;
  document.querySelector("#allocationDonut").innerHTML = `<strong>${Math.round((values.MY / total) * 100)}%</strong><span>MY Core</span>`;
  document.querySelector("#allocationLegend").innerHTML = parts
    .map(
      (item) => `
        <button class="allocation-item ${item.market === currentAllocationMarket ? "active" : ""}" data-market="${item.market}" type="button">
          <i style="background:${item.color}"></i>
          <span>${item.label}</span>
          <strong>${Math.round((item.value / total) * 100)}%</strong>
        </button>
      `,
    )
    .join("");
  document.querySelectorAll(".allocation-item").forEach((button) => {
    button.addEventListener("click", () => {
      currentAllocationMarket = button.dataset.market;
      renderAllocationChart();
    });
  });
  renderAllocationDetails(total);
}

function renderAllocationDetails(total) {
  const marketHoldings = holdings.filter((item) => item.market === currentAllocationMarket);
  const marketValue = marketHoldings.reduce((sum, item) => sum + item.value * fxRate(item.market), 0);
  const label = marketName(currentAllocationMarket);
  const topHolding = [...marketHoldings].sort((a, b) => b.value - a.value)[0];
  const pressure = marketHoldings.filter((item) => pct(item) <= -12).length;
  const suggestion =
    currentAllocationMarket === "MY"
      ? "這是你的穩定/股息核心。可繼續用回調分批，不要追高銀行股。"
      : currentAllocationMarket === "US"
        ? "美股目前是成長壓力區。先等反彈減壓，再把新錢轉向 ETF/股息核心。"
        : "目前配置較小，可先當分散觀察，不必急著重倉。";

  document.querySelector("#allocationDetails").innerHTML = `
    <div class="allocation-detail-head">
      <div>
        <span>Selected Market</span>
        <strong>${label}</strong>
      </div>
      <b>${Math.round((marketValue / total) * 100)}%</b>
    </div>
    <div class="allocation-mini-stats">
      <article><span>持倉數</span><strong>${marketHoldings.length}</strong></article>
      <article><span>最大持倉</span><strong>${topHolding?.symbol || "—"}</strong></article>
      <article><span>壓力股</span><strong>${pressure}</strong></article>
    </div>
    <p>${suggestion}</p>
    <div class="allocation-holdings">
      ${marketHoldings
        .map(
          (item) => `
            <article>
              <strong>${item.symbol}</strong>
              <span>${item.qty.toLocaleString()} 股 · ${fmt(item.price, item.market)} · ${pct(item).toFixed(1)}%</span>
            </article>
          `,
        )
        .join("") || "<article><strong>暫無持倉</strong><span>可在手動增加區加入</span></article>"}
    </div>
  `;
}

function fxRate(market) {
  return {
    MY: 1,
    US: 4.7,
    SG: 3.5,
    HK: 0.6,
  }[market] || 1;
}

function renderLearningHub() {
  document.querySelector("#learningHub").innerHTML = learningResources
    .map(
      (item) => `
        <a class="learning-card" href="${item.url}" target="_blank" rel="noreferrer">
          <span>${item.region}</span>
          <strong>${item.name}</strong>
          <p>${item.focus}</p>
        </a>
      `,
    )
    .join("");
}

function renderCodexBriefingPlan() {
  document.querySelector("#codexBriefingPlan").innerHTML = codexBriefingPlan
    .map(
      (item, index) => `
        <article>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${item.title}</strong>
          <p>${item.copy}</p>
        </article>
      `,
    )
    .join("");
}

function renderStockIdeas() {
  document.querySelector("#stockIdeas").innerHTML = stockIdeas
    .filter((item) => currentIdea === "all" || item.category === currentIdea)
    .map(
      (item) => `
        <article class="idea-card ${item.category}">
          <div class="idea-top">
            <div>
              <span>${marketName(item.market)} · ${categoryName(item.category)}</span>
              <strong>${item.symbol}</strong>
              <p>${item.name}</p>
            </div>
            <b>${item.style}</b>
          </div>
          <div class="idea-body">
            <p><strong>為什麼：</strong>${item.why}</p>
            <p><strong>風險：</strong>${item.risk}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function marketName(market) {
  return {
    MY: "馬來西亞",
    US: "美國",
    SG: "新加坡",
    HK: "港股",
    CN: "中國",
  }[market];
}

function categoryName(category) {
  return {
    conservative: "保守",
    long: "長期",
    growth: "成長",
    potential: "潛力",
  }[category];
}

function renderDividendCore() {
  document.querySelector("#dividendCore").innerHTML = dividendCandidates
    .filter((item) => currentRegion === "all" || item.region === currentRegion)
    .map(
      (item) => `
        <article class="dividend-card">
          <div class="dividend-top">
            <div>
              <strong>${item.symbol}</strong>
              <p>${regionLabel(item.region)} · ${item.name} · ${item.role}</p>
            </div>
            <span class="yield">${item.yield.toFixed(1)}%</span>
          </div>
          <div class="price-line">
            <span>當下價格</span>
            <strong>${item.current}</strong>
          </div>
          <div class="bar green"><i style="width: ${Math.min(100, item.yield * 14)}%"></i></div>
          <p>${item.note}</p>
          <small>估算股息率，之後接行情/派息資料源會自動更新</small>
        </article>
      `,
    )
    .join("");
}

function regionLabel(region) {
  return {
    MY: "馬來西亞",
    US: "美國",
    SG: "新加坡",
    CN: "中國/港股",
  }[region];
}

function renderCashAlert() {
  const cash = Number(document.querySelector("#cashInput").value || 0);
  const currencyCode = document.querySelector("#cashCurrency").value;
  const symbol = { MYR: "RM", USD: "$", SGD: "S$" }[currencyCode];
  const first = cash * 0.35;
  const second = cash * 0.25;
  const reserve = cash * 0.4;

  document.querySelector("#cashAlertText").textContent = `${marketPulse.title}。${marketPulse.reason}`;
  document.querySelector("#deployPlan").innerHTML = [
    {
      title: "第一批 · 股息核心",
      amount: first,
      copy: "今天可以先部署 35%，優先 Maybank/RHB/CIMB 或 SCHD/VOO 這類核心，不追高單一股票。",
    },
    {
      title: "第二批 · 等回調",
      amount: second,
      copy: "保留 25% 等支撐位，例如馬股銀行回調、S&P 500 ETF 回落時再買。",
    },
    {
      title: "第三批 · 防守現金",
      amount: reserve,
      copy: "保留 40% 現金，不拿去硬補 SOFI/VITL。等美股虧損倉反彈才轉換。",
    },
  ]
    .map(
      (item) => `
        <article>
          <strong>${item.title}</strong>
          <span>${symbol}${item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          <p>${item.copy}</p>
        </article>
      `,
    )
    .join("");
}

function wireControls() {
  document.querySelectorAll(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".region-tabs");
      if (group) {
        group.querySelectorAll("button").forEach((entry) => entry.classList.remove("active"));
        button.classList.add("active");
        currentRegion = button.dataset.region;
        renderDividendCore();
      } else if (button.closest(".idea-tabs")) {
        button.parentElement.querySelectorAll("button").forEach((entry) => entry.classList.remove("active"));
        button.classList.add("active");
        currentIdea = button.dataset.idea;
        renderStockIdeas();
      } else {
        button.parentElement.querySelectorAll("button").forEach((entry) => entry.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderHoldings();
      }
    });
  });

  document.querySelector("#refreshBtn").addEventListener("click", () => {
    refreshApp("VITL");
  });

  document.querySelector("#imageInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.alt = "Portfolio screenshot preview";
    const box = document.querySelector("#previewBox");
    box.innerHTML = "";
    box.appendChild(image);
  });

  document.querySelector("#beginnerMode").addEventListener("change", (event) => {
    document.body.classList.toggle("expert", !event.target.checked);
  });

  document.querySelector("#cashInput").addEventListener("input", renderCashAlert);
  document.querySelector("#cashCurrency").addEventListener("change", renderCashAlert);

  document.querySelector("#notifyBtn").addEventListener("click", async () => {
    if (!("Notification" in window)) {
      alert("這個瀏覽器不支援桌面通知。手機推播需要之後做成 PWA。");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("SKY invest 現金部署提醒", {
        body: "今天先部署股息核心，保留現金，不急著補美股虧損倉。",
      });
    }
  });

  document.querySelector("#tradeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const market = document.querySelector("#tradeMarket").value;
    const symbol = document.querySelector("#tradeSymbol").value.trim().toUpperCase();
    const name = document.querySelector("#tradeName").value.trim() || symbol;
    const qty = Number(document.querySelector("#tradeQty").value);
    const cost = Number(document.querySelector("#tradeCost").value);
    const price = Number(document.querySelector("#tradePrice").value);
    if (!symbol || !qty || !cost || !price) return;

    const existing = holdings.find((item) => item.symbol === symbol && item.market === market);
    if (existing) {
      const nextQty = existing.qty + qty;
      existing.cost = (existing.cost * existing.qty + cost * qty) / nextQty;
      existing.qty = nextQty;
      existing.price = price;
      existing.value = price * nextQty;
      existing.pnl = (price - existing.cost) * nextQty;
    } else {
      holdings.push({
        market,
        symbol,
        name,
        qty,
        price,
        cost,
        value: price * qty,
        pnl: (price - cost) * qty,
        today: 0,
        theme: market === "MY" ? "Dividend / Manual" : "Manual Holding",
        news: "手動新增持倉。之後接行情/新聞資料源後會自動更新時事提醒。",
      });
    }

    saveHoldings();
    refreshApp(symbol);
    event.target.reset();
  });

  document.querySelector("#savePortfolioBtn").addEventListener("click", saveHoldings);

  document.querySelector("#resetPortfolioBtn").addEventListener("click", () => {
    holdings = defaultHoldings.map((item) => ({ ...item }));
    saveHoldings();
    refreshApp("VITL");
  });

  document.querySelector("#codexDockBtn").addEventListener("click", () => {
    document.querySelector("#codexPanel").classList.add("open");
  });

  document.querySelector("#closeCodexPanel").addEventListener("click", () => {
    document.querySelector("#codexPanel").classList.remove("open");
  });

  document.querySelector("#switchProfileBtn").addEventListener("click", () => {
    const email = document.querySelector("#profileEmail").value.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      alert("請輸入完整 Gmail，例如 name@gmail.com");
      return;
    }
    setActiveProfileEmail(email);
    holdings = loadHoldings();
    updateProfileStatus();
    refreshApp(holdings[0]?.symbol || "VITL");
  });

  document.querySelector("#saveProfileBtn").addEventListener("click", () => {
    const email = document.querySelector("#profileEmail").value.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      alert("請輸入完整 Gmail，例如 name@gmail.com");
      return;
    }
    setActiveProfileEmail(email);
    saveHoldings();
    refreshApp(holdings[0]?.symbol || "VITL");
  });

  document.querySelector("#saveCloudConfigBtn").addEventListener("click", async () => {
    const config = readCloudConfigFromUi();
    if (!config.url || !config.anonKey) {
      setCloudStatus("請填 Supabase Project URL 和 anon public key", "warn");
      return;
    }
    saveCloudConfig(config);
    cloudClient = null;
    setCloudStatus("Supabase 設定已保存", "ok");
    await refreshCloudSession();
  });

  document.querySelector("#sendMagicLinkBtn").addEventListener("click", sendMagicLink);
  document.querySelector("#cloudUploadBtn").addEventListener("click", uploadPortfolioToCloud);
  document.querySelector("#cloudDownloadBtn").addEventListener("click", downloadPortfolioFromCloud);
  document.querySelector("#cloudSignOutBtn").addEventListener("click", signOutCloud);

  document.querySelector("#exportPortfolioBtn").addEventListener("click", () => {
    document.querySelector("#portfolioExport").value = JSON.stringify(
      { profile: activeProfileEmail() || "local-default", holdings },
      null,
      2,
    );
  });

  document.querySelector("#copyCodexPrompt").addEventListener("click", async () => {
    const owner = activeProfileEmail() || "本機預設 profile";
    const prompt = `請根據這份 SKY invest portfolio 更新 ${owner} 的今日投資狀況、支撐位、買入區、股息核心和解套建議：\n\n${JSON.stringify(holdings, null, 2)}`;
    document.querySelector("#portfolioExport").value = prompt;
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (error) {
      console.warn("Clipboard unavailable", error);
    }
  });

  document.querySelector("#settingsBtn").addEventListener("click", () => {
    document.querySelector("#settingsPanel").classList.add("open");
  });

  document.querySelector("#closeSettingsPanel").addEventListener("click", () => {
    document.querySelector("#settingsPanel").classList.remove("open");
  });

  document.querySelector("#closeSentimentPanel").addEventListener("click", () => {
    document.querySelector("#sentimentPanel").classList.remove("open");
  });

  [
    ["#themeSelect", "theme"],
    ["#languageSelect", "language"],
    ["#fontSizeSelect", "fontSize"],
    ["#densitySelect", "density"],
  ].forEach(([selector, key]) => {
    document.querySelector(selector).addEventListener("change", (event) => {
      userSettings[key] = event.target.value;
      saveSettings();
      applySettings();
    });
  });

  document.querySelector("#collapseAllBtn").addEventListener("click", () => {
    document.querySelectorAll(".workspace > section").forEach((section) => {
      section.classList.add("is-collapsed");
      const toggle = section.querySelector(".section-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector("b").textContent = "+";
      }
    });
  });

  document.querySelector("#expandAllBtn").addEventListener("click", () => {
    document.querySelectorAll(".workspace > section").forEach((section) => {
      section.classList.remove("is-collapsed");
      const toggle = section.querySelector(".section-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "true");
        toggle.querySelector("b").textContent = "−";
      }
    });
  });

  document.querySelector("#testSupportAlertBtn").addEventListener("click", async () => {
    await sendSupportAlert(checkSupportAlerts());
  });
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

setupCollapsibleSections();
refreshApp("VITL");
renderLearningTools();
renderDividendCore();
renderLearningHub();
renderCodexBriefingPlan();
renderStockIdeas();
wireControls();
applySettings();
updateProfileStatus();
applyCloudConfigToUi();
refreshCloudSession();
