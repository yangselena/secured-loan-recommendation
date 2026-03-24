// 小額貸款平台數據（基於https://loanreport.ai/dopay/的資訊）
const loanPlatforms = [
    {
        id: 1,
        name: '樂天銀行',
        approvalRate: 21.0,
        disbursementSpeed: 14.0,
        averageAmount: 18000,
        recommendation: 7.9,
        fee: '便宜',
        description: '過件率最高，撥款速度快，適合急需資金的用戶',
        suitableFor: ['student', 'employee', 'freelancer'],
        link: 'https://www.rakuten.com.tw/'
    },
    {
        id: 2,
        name: 'Richart',
        approvalRate: 19.0,
        disbursementSpeed: 36.0,
        averageAmount: 16000,
        recommendation: 6.6,
        fee: '合理',
        description: '穩定的過件率，撥款速度尚可，推薦上班族使用',
        suitableFor: ['employee'],
        link: 'https://www.richart.tw/'
    },
    {
        id: 3,
        name: 'Naver Money',
        approvalRate: 11.0,
        disbursementSpeed: 30.0,
        averageAmount: 14000,
        recommendation: 6.6,
        fee: '合理',
        description: '審核速度快，適合有穩定收入的申請人',
        suitableFor: ['employee'],
        link: 'https://money.naver.com/'
    },
    {
        id: 4,
        name: 'JUJI',
        approvalRate: 18.0,
        disbursementSpeed: 28.0,
        averageAmount: 21000,
        recommendation: 8.2,
        fee: '便宜',
        description: '快速撥貸，高推薦度，適合上班族和自由業使用',
        suitableFor: ['employee', 'freelancer'],
        link: 'https://juji.com.tw/'
    },
    {
        id: 5,
        name: '手機貸兔',
        approvalRate: 22.0,
        disbursementSpeed: 25.0,
        averageAmount: 15000,
        recommendation: 7.8,
        fee: '便宜',
        description: '手機貸款專家，審核快速，適合學生和待業中使用',
        suitableFor: ['student', 'unemployed'],
        link: 'https://www.bunny.cash/'
    },
    {
        id: 6,
        name: '遠信',
        approvalRate: 20.0,
        disbursementSpeed: 26.0,
        averageAmount: 18000,
        recommendation: 7.5,
        fee: '便宜',
        description: '信用貸款領導者，適合學生和待業中申請',
        suitableFor: ['student', 'unemployed'],
        link: 'https://www.monthlypay.com.tw/'
    },
    {
        id: 7,
        name: '逗PAY',
        approvalRate: 15.0,
        disbursementSpeed: 32.0,
        averageAmount: 23143,
        recommendation: 3.4,
        fee: '便宜',
        description: '可借額度較高，適合金額需求較大的用戶',
        suitableFor: ['employee', 'freelancer'],
        link: 'https://www.doughpack.com/'
    },
    {
        id: 8,
        name: 'CoolBitX',
        approvalRate: 28.0,
        disbursementSpeed: 63.0,
        averageAmount: 20000,
        recommendation: 1.6,
        fee: '很貴',
        description: '過件率高但費用較貴，不太推薦',
        suitableFor: ['freelancer'],
        link: '#'
    },
    {
        id: 9,
        name: '其他業者',
        approvalRate: 26.0,
        disbursementSpeed: 58.0,
        averageAmount: 18000,
        recommendation: 1.2,
        fee: '很貴',
        description: '費用最貴，不太推薦使用',
        suitableFor: [],
        link: '#'
    }
];

// 當前表單數據
let formData = {
    identity: null,
    amount: null,
    loanTypes: []
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 監聽身份選擇
    document.querySelectorAll('input[name="identity"]').forEach(radio => {
        radio.addEventListener('change', function() {
            formData.identity = this.value;
            // 自動跳轉到第二步
            setTimeout(() => {
                nextStep(1);
            }, 300);
        });
    });

    // 監聽金額輸入
    document.getElementById('amount').addEventListener('input', function() {
        formData.amount = parseInt(this.value) || null;
    });

    // 監聽貸款類型選擇
    document.querySelectorAll('input[name="loanType"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            formData.loanTypes = Array.from(document.querySelectorAll('input[name="loanType"]:checked')).map(cb => cb.value);
        });
    });
});

// 前往下一步
function nextStep(currentStep) {
    // 驗證當前步驟
    if (currentStep === 1 && !formData.identity) {
        alert('請選擇您的身份');
        return;
    }
    if (currentStep === 2 && !formData.amount) {
        alert('請輸入借款金額');
        return;
    }
    if (currentStep === 2 && formData.amount < 1000) {
        alert('最低借款金額為 1,000 元');
        return;
    }

    // 更新步驟
    if (currentStep === 1) {
        hideStep(1);
        showStep(2);
        updateProgress(1, 'completed');
        updateProgress(2, 'active');
    } else if (currentStep === 2) {
        hideStep(2);
        showStep(3);
        updateProgress(2, 'completed');
        updateProgress(3, 'active');
        generateRecommendations();
    }
}

// 回到上一步
function prevStep(currentStep) {
    if (currentStep === 2) {
        hideStep(2);
        showStep(1);
        updateProgress(2, 'not-active');
        updateProgress(1, 'active');
    } else if (currentStep === 3) {
        hideStep(3);
        showStep(2);
        updateProgress(3, 'not-active');
        updateProgress(2, 'active');
    }
}

// 隱藏步驟
function hideStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
}

// 顯示步驟
function showStep(step) {
    document.getElementById(`step${step}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 更新進度指示器
function updateProgress(step, status) {
    const indicator = document.getElementById(`step${step}-indicator`);
    indicator.classList.remove('active', 'completed');
    if (status !== 'not-active') {
        indicator.classList.add(status);
    }

    // 更新進度線
    const lines = document.querySelectorAll('.progress-line');
    if (step === 1 && status === 'completed') {
        lines[0].classList.add('active');
    } else if (step === 2 && status === 'not-active') {
        lines[0].classList.remove('active');
    }
    if (step === 2 && status === 'completed') {
        lines[1].classList.add('active');
    } else if (step === 3 && status === 'not-active') {
        lines[1].classList.remove('active');
    }
}

// 設定預設金額
function setAmount(amount) {
    document.getElementById('amount').value = amount;
    formData.amount = amount;
}

// 生成推薦結果
function generateRecommendations() {
    const container = document.getElementById('recommendation-container');
    container.innerHTML = '';

    // 篩選適合的平台
    const suitablePlatforms = loanPlatforms.filter(platform => 
        platform.suitableFor.includes(formData.identity)
    );

    let recommendations = [];

    // 根據身份進行不同的推薦邏輯
    if (formData.identity === 'student' || formData.identity === 'unemployed') {
        // 學生或待業中：推薦手機貸兔或遠信
        const phoneLoaner = loanPlatforms.find(p => p.name === '手機貸兔');
        const yuanxin = loanPlatforms.find(p => p.name === '遠信');

        const eligiblePlatforms = [];
        if (phoneLoaner && phoneLoaner.suitableFor.includes(formData.identity)) {
            eligiblePlatforms.push(phoneLoaner);
        }
        if (yuanxin && yuanxin.suitableFor.includes(formData.identity)) {
            eligiblePlatforms.push(yuanxin);
        }

        // 從手機貸兔和遠信中隨機選擇順序
        if (eligiblePlatforms.length === 2) {
            if (Math.random() < 0.5) {
                recommendations = [eligiblePlatforms[0], eligiblePlatforms[1]];
            } else {
                recommendations = [eligiblePlatforms[1], eligiblePlatforms[0]];
            }
        } else if (eligiblePlatforms.length === 1) {
            recommendations = [eligiblePlatforms[0]];
            // 如果只有一個，找第二名
            const otherPlatforms = suitablePlatforms.filter(p => p.name !== eligiblePlatforms[0].name);
            if (otherPlatforms.length > 0) {
                otherPlatforms.sort((a, b) => b.recommendation - a.recommendation);
                recommendations.push(otherPlatforms[0]);
            }
        }
    } else if (formData.identity === 'employee' || formData.identity === 'freelancer') {
        // 上班族或自由業：根據金額決定JUJI的推薦
        const juji = loanPlatforms.find(p => p.name === 'JUJI');

        // 金額判斷
        if (formData.amount >= 100000) {
            // 100000以上：不出現JUJI
            const otherPlatforms = suitablePlatforms.filter(p => p.name !== 'JUJI');
            otherPlatforms.sort((a, b) => b.recommendation - a.recommendation);
            recommendations = otherPlatforms.slice(0, 2);
        } else if (formData.amount <= 100000) {
            // 100000以內：JUJI固定放在第一位
            if (juji) {
                recommendations.push(juji); // JUJI固定為第一名

                // 第二名：從其他適合的平台中選擇
                const otherPlatforms = suitablePlatforms.filter(p => p.name !== 'JUJI');
                if (otherPlatforms.length > 0) {
                    otherPlatforms.sort((a, b) => b.recommendation - a.recommendation);
                    recommendations.push(otherPlatforms[0]);
                } else {
                    const remaining = loanPlatforms.filter(p => p.name !== 'JUJI');
                    remaining.sort((a, b) => b.recommendation - a.recommendation);
                    recommendations.push(remaining[0]);
                }
            }
        }
    }

    if (recommendations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">暫無推薦平台</p>';
        return;
    }

    // 渲染推薦卡片
    recommendations.forEach((platform, index) => {
        const isPrimary = index === 0;
        const card = createRecommendationCard(platform, isPrimary);
        container.appendChild(card);
    });
}

// 創建推薦卡片
function createRecommendationCard(platform, isPrimary) {
    const card = document.createElement('div');
    card.className = `recommendation-card ${isPrimary ? 'primary' : ''}`;

    const recommendationText = getRocommendationText(platform.recommendation);
    const identityText = getIdentityText(formData.identity);

    card.innerHTML = `
        <div class="card-label">${isPrimary ? '⭐ 最佳推薦' : '✅ 備選方案'}</div>
        <h3 class="card-title-rec">${platform.name}</h3>
        <p class="card-description">${platform.description}</p>
        <div class="card-stats">
            <div class="stat-item">
                <div class="stat-label">過件率</div>
                <div class="stat-value">${platform.approvalRate}%</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">撥款速度</div>
                <div class="stat-value">${platform.disbursementSpeed.toFixed(0)}h</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">推薦度</div>
                <div class="stat-value">${(platform.recommendation).toFixed(1)}</div>
            </div>
        </div>
        <div class="card-stats">
            <div class="stat-item">
                <div class="stat-label">費用</div>
                <div class="stat-value">${platform.fee}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">平均借額</div>
                <div class="stat-value">NT$${platform.averageAmount.toLocaleString()}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">身份適配</div>
                <div class="stat-value">${identityText}</div>
            </div>
        </div>
        <div class="card-actions">
            <button class="action-btn" onclick="openLink('${platform.link}')">前往申請</button>
            <button class="action-btn secondary" onclick="openRecommendationReport('${platform.name}')">查看評價</button>
        </div>
    `;

    return card;
}

// 獲取推薦文案
function getRocommendationText(score) {
    if (score >= 7) return '⭐⭐⭐⭐⭐ 強烈推薦';
    if (score >= 6) return '⭐⭐⭐⭐ 推薦';
    if (score >= 4) return '⭐⭐⭐ 還可以';
    return '⭐⭐ 不太推薦';
}

// 獲取身份文本
function getIdentityText(identity) {
    const identityMap = {
        'student': '學生',
        'employee': '上班族',
        'freelancer': '自由業',
        'unemployed': '待業中'
    };
    return identityMap[identity] || identity;
}

// 打開連結
function openLink(url) {
    if (url === '#') {
        alert('此平台暫無直接連結');
    } else {
        window.open(url, '_blank');
    }
}

// 打開推薦報告
function openRecommendationReport(platformName) {
    // 導向到loanreport.ai查看詳細評價
    window.open('https://loanreport.ai/', '_blank');
}

// 重新開始表單
function restartForm() {
    formData = {
        identity: null,
        amount: null,
        loanTypes: []
    };

    // 清除所有選擇
    document.querySelectorAll('input[name="identity"]').forEach(radio => {
        radio.checked = false;
    });
    document.getElementById('amount').value = '';
    document.querySelectorAll('input[name="loanType"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // 回到第一步
    hideStep(3);
    showStep(1);
    updateProgress(1, 'active');
    updateProgress(2, 'not-active');
    updateProgress(3, 'not-active');
}
