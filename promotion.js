// JUJI 擔保貸款方案資料
const securedLoanProducts = [
    {
        id: 1,
        name: 'JUJI 房屋貸款',
        type: '房屋擔保貸款',
        logo: '🏠',
        interestRate: '1.68%',
        interestRateDesc: '起',
        maxAmount: '500萬',
        loanTerm: '20年',
        approvalTime: '3-5 工作天',
        features: ['利率優惠', '高額度', '長期限'],
        description: '以房屋作為擔保，享有最優惠利率與最高額度',
        link: 'https://juji.tw/loan-estimation',
        featured: true
    },
    {
        id: 2,
        name: 'JUJI 汽車貸款',
        type: '汽車擔保貸款',
        logo: '🚗',
        interestRate: '2.88%',
        interestRateDesc: '起',
        maxAmount: '150萬',
        loanTerm: '7年',
        approvalTime: '1-2 工作天',
        features: ['快速審核', '免留車', '彈性還款'],
        description: '以汽車作為擔保，快速取得周轉資金，車輛可繼續使用',
        link: 'https://juji.tw/loan-estimation',
        featured: false
    },
    {
        id: 3,
        name: 'JUJI 機車貸款',
        type: '機車擔保貸款',
        logo: '🏍️',
        interestRate: '3.5%',
        interestRateDesc: '起',
        maxAmount: '30萬',
        loanTerm: '5年',
        approvalTime: '24小時',
        features: ['線上申請', '快速撥款', '低門檻'],
        description: '以機車作為擔保，適合小額資金需求，審核快速',
        link: 'https://juji.tw/loan-estimation',
        featured: false
    },
    {
        id: 4,
        name: 'JUJI 土地貸款',
        type: '土地擔保貸款',
        logo: '🌳',
        interestRate: '2.5%',
        interestRateDesc: '起',
        maxAmount: '300萬',
        loanTerm: '15年',
        approvalTime: '5-7 工作天',
        features: ['農地可貸', '建地優惠', '專人服務'],
        description: '以土地作為擔保，農地、建地皆可申請',
        link: 'https://juji.tw/loan-estimation',
        featured: false
    },
    {
        id: 5,
        name: 'JUJI 二胎房貸',
        type: '二順位房屋貸款',
        logo: '🏘️',
        interestRate: '2.88%',
        interestRateDesc: '起',
        maxAmount: '200萬',
        loanTerm: '10年',
        approvalTime: '3-5 工作天',
        features: ['不影響一胎', '額外資金', '利率合理'],
        description: '已有房貸的房屋可再申請，取得額外資金',
        link: 'https://juji.tw/loan-estimation',
        featured: false
    },
    {
        id: 6,
        name: 'JUJI 股票質借',
        type: '股票擔保貸款',
        logo: '📈',
        interestRate: '2.25%',
        interestRateDesc: '起',
        maxAmount: '依股票市值',
        loanTerm: '1年',
        approvalTime: '1-2 工作天',
        features: ['保留持股', '隨借隨還', '利息靈活'],
        description: '以股票作為擔保，保留持股繼續參與市場',
        link: 'https://juji.tw/loan-estimation',
        featured: false
    }
];

// 渲染產品卡片
function renderProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    container.innerHTML = securedLoanProducts.map(product => `
        <div class="product-card ${product.featured ? 'featured' : ''}">
            <div class="product-header">
                <div class="product-logo">${product.logo}</div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="product-type">${product.type}</span>
                </div>
            </div>

            <div class="product-details">
                <div class="detail-item">
                    <div class="detail-label">年利率</div>
                    <div class="detail-value highlight">${product.interestRate} ${product.interestRateDesc}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">最高額度</div>
                    <div class="detail-value">${product.maxAmount}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">貸款期限</div>
                    <div class="detail-value">${product.loanTerm}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">審核時間</div>
                    <div class="detail-value">${product.approvalTime}</div>
                </div>
            </div>

            <div class="product-features">
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="product-actions">
                <a href="${product.link}" target="_blank" class="btn-apply">立即申請</a>
                <button class="btn-details" onclick="showDetails(${product.id})">了解更多</button>
            </div>
        </div>
    `).join('');
}

// 顯示產品詳細資訊
function showDetails(productId) {
    const product = securedLoanProducts.find(p => p.id === productId);
    if (product) {
        alert(`${product.name}\n\n${product.description}\n\n年利率：${product.interestRate} ${product.interestRateDesc}\n最高額度：${product.maxAmount}\n貸款期限：${product.loanTerm}\n審核時間：${product.approvalTime}`);
    }
}

// 頁面載入時渲染產品
document.addEventListener('DOMContentLoaded', renderProducts);
