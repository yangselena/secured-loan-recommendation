// 貸款投放頁面 JavaScript

// Demo 數據
const demoData = {
    pending: {
        applicationId: 'LN2024031500001',
        applicationDate: '2024-03-15 14:30',
        platform: '樂天銀行',
        amount: 50000,
        status: 'pending',
        statusText: '審核中',
        timeline: {
            submitted: '2024-03-15 14:30',
            reviewing: '2024-03-15 15:00',
            approved: null,
            disbursing: null,
            completed: null
        }
    },
    approved: {
        applicationId: 'LN2024031400002',
        applicationDate: '2024-03-14 10:20',
        platform: 'JUJI',
        amount: 30000,
        status: 'approved',
        statusText: '已核准',
        approvedAmount: 28000,
        interestRate: '7.9%',
        repaymentPeriod: '12期',
        monthlyPayment: 'NT$ 2,433',
        bankAccount: '台新銀行 ***1234',
        firstPaymentDate: '2024-04-15',
        timeline: {
            submitted: '2024-03-14 10:20',
            reviewing: '2024-03-14 11:00',
            approved: '2024-03-15 09:30',
            disbursing: null,
            completed: null
        }
    },
    disbursing: {
        applicationId: 'LN2024031300003',
        applicationDate: '2024-03-13 09:15',
        platform: '手機貸兔',
        amount: 20000,
        status: 'disbursing',
        statusText: '撥款中',
        approvedAmount: 20000,
        interestRate: '8.5%',
        repaymentPeriod: '6期',
        monthlyPayment: 'NT$ 3,476',
        bankAccount: '中國信託 ***5678',
        firstPaymentDate: '2024-04-13',
        timeline: {
            submitted: '2024-03-13 09:15',
            reviewing: '2024-03-13 10:00',
            approved: '2024-03-13 16:30',
            disbursing: '2024-03-14 10:00',
            completed: null
        }
    },
    completed: {
        applicationId: 'LN2024031200004',
        applicationDate: '2024-03-12 11:45',
        platform: '遠信',
        amount: 15000,
        status: 'completed',
        statusText: '已完成',
        approvedAmount: 15000,
        interestRate: '6.9%',
        repaymentPeriod: '12期',
        monthlyPayment: 'NT$ 1,302',
        bankAccount: '國泰世華 ***9012',
        firstPaymentDate: '2024-04-12',
        timeline: {
            submitted: '2024-03-12 11:45',
            reviewing: '2024-03-12 12:30',
            approved: '2024-03-12 17:00',
            disbursing: '2024-03-13 09:00',
            completed: '2024-03-13 14:30'
        }
    },
    rejected: {
        applicationId: 'LN2024031100005',
        applicationDate: '2024-03-11 16:00',
        platform: 'Richart',
        amount: 100000,
        status: 'rejected',
        statusText: '未通過',
        rejectionReason: '信用評分不足',
        rejectionSuggestion: '建議您可以先嘗試申請較小金額的貸款，或選擇其他對信用要求較低的平台，如「手機貸兔」或「遠信」。',
        timeline: {
            submitted: '2024-03-11 16:00',
            reviewing: '2024-03-11 16:30',
            approved: null,
            disbursing: null,
            completed: null
        }
    }
};

// 查詢貸款投放狀態
function queryDisbursement() {
    const applicationId = document.getElementById('applicationId').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();

    if (!applicationId && !phoneNumber) {
        alert('請輸入申請編號或手機號碼');
        return;
    }

    // 模擬查詢 - 實際應用中應該調用 API
    // 這裡用 demo 數據來展示
    const randomStatus = ['pending', 'approved', 'disbursing', 'completed'][Math.floor(Math.random() * 4)];
    showResult(demoData[randomStatus]);
}

// 載入 Demo 數據
function loadDemo(status) {
    showResult(demoData[status]);
}

// 顯示查詢結果
function showResult(data) {
    // 隱藏查詢區域，顯示結果區域
    document.getElementById('query-section').classList.remove('active');
    document.getElementById('result-section').classList.add('active');

    // 填充基本資訊
    document.getElementById('result-applicationId').textContent = data.applicationId;
    document.getElementById('result-applicationDate').textContent = data.applicationDate;
    document.getElementById('result-platform').textContent = data.platform;
    document.getElementById('result-amount').textContent = `NT$ ${data.amount.toLocaleString()}`;

    // 設置狀態徽章
    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = data.statusText;
    statusBadge.className = `status-badge ${data.status}`;

    // 更新時間線
    updateTimeline(data);

    // 顯示/隱藏放款詳情
    const detailsCard = document.getElementById('disbursement-details');
    const rejectionCard = document.getElementById('rejection-details');

    if (data.status === 'rejected') {
        detailsCard.style.display = 'none';
        rejectionCard.style.display = 'block';
        document.getElementById('rejection-reason').textContent = data.rejectionReason;
        document.getElementById('rejection-suggestion').textContent = data.rejectionSuggestion;
    } else if (data.status === 'approved' || data.status === 'disbursing' || data.status === 'completed') {
        detailsCard.style.display = 'block';
        rejectionCard.style.display = 'none';

        document.getElementById('approved-amount').textContent = `NT$ ${data.approvedAmount.toLocaleString()}`;
        document.getElementById('interest-rate').textContent = data.interestRate;
        document.getElementById('repayment-period').textContent = data.repaymentPeriod;
        document.getElementById('monthly-payment').textContent = data.monthlyPayment;
        document.getElementById('bank-account').textContent = data.bankAccount;
        document.getElementById('first-payment-date').textContent = data.firstPaymentDate;
    } else {
        detailsCard.style.display = 'none';
        rejectionCard.style.display = 'none';
    }

    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 更新時間線
function updateTimeline(data) {
    const timeline = data.timeline;
    const status = data.status;

    // 重置所有時間線項目
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.classList.remove('completed', 'active', 'rejected');
    });

    // 更新各個步驟
    const steps = [
        { id: 'submitted', dateId: 'date-submitted' },
        { id: 'reviewing', dateId: 'date-reviewing' },
        { id: 'approved', dateId: 'date-approved' },
        { id: 'disbursing', dateId: 'date-disbursing' },
        { id: 'completed', dateId: 'date-completed' }
    ];

    let lastCompletedStep = -1;

    steps.forEach((step, index) => {
        const item = document.getElementById(`timeline-${step.id}`);
        const dateEl = document.getElementById(step.dateId);

        if (timeline[step.id]) {
            dateEl.textContent = timeline[step.id];

            if (status === 'rejected' && step.id === 'reviewing') {
                item.classList.add('rejected');
                lastCompletedStep = index;
            } else {
                item.classList.add('completed');
                lastCompletedStep = index;
            }
        } else {
            dateEl.textContent = '-';
        }
    });

    // 設置當前活動步驟
    if (status === 'pending' && lastCompletedStep >= 0 && lastCompletedStep < steps.length - 1) {
        const nextStep = document.getElementById(`timeline-${steps[lastCompletedStep + 1].id}`);
        if (nextStep) {
            nextStep.classList.remove('completed');
            nextStep.classList.add('active');
        }
    }

    // 如果是審核中，reviewing 應該是活動狀態
    if (status === 'pending') {
        document.getElementById('timeline-reviewing').classList.remove('completed');
        document.getElementById('timeline-reviewing').classList.add('active');
    }

    // 如果是撥款中
    if (status === 'disbursing') {
        document.getElementById('timeline-disbursing').classList.remove('completed');
        document.getElementById('timeline-disbursing').classList.add('active');
    }

    // 如果是已核准，等待撥款
    if (status === 'approved') {
        document.getElementById('timeline-disbursing').classList.add('active');
    }

    // 如果被拒絕
    if (status === 'rejected') {
        // 修改審核通過為審核未通過
        document.getElementById('timeline-approved').querySelector('.timeline-title').textContent = '審核未通過';
        document.getElementById('timeline-approved').classList.add('rejected');
    } else {
        // 恢復正常文字
        document.getElementById('timeline-approved').querySelector('.timeline-title').textContent = '審核通過';
    }
}

// 返回查詢頁面
function backToQuery() {
    document.getElementById('result-section').classList.remove('active');
    document.getElementById('query-section').classList.add('active');

    // 清空輸入
    document.getElementById('applicationId').value = '';
    document.getElementById('phoneNumber').value = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 聯繫客服
function contactSupport() {
    alert('客服電話：0800-123-456\n服務時間：週一至週五 09:00-18:00\n\n或發送郵件至：support@loanservice.com');
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    // 檢查 URL 參數是否有申請編號
    const urlParams = new URLSearchParams(window.location.search);
    const applicationId = urlParams.get('id');

    if (applicationId) {
        document.getElementById('applicationId').value = applicationId;
        // 可以自動查詢
        // queryDisbursement();
    }
});
