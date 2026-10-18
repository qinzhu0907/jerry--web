const unitPrice = 299;
const quantityInput = document.querySelector('#quantity');
const subtotalEl = document.querySelector('#subtotal');
const totalEl = document.querySelector('#total');
const checkoutBtn = document.querySelector('#checkoutBtn');
const mockBtn = document.querySelector('#mockBtn');
const statusBox = document.querySelector('#statusBox');

function safeParseInt(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function updateTotals() {
  const quantity = safeParseInt(quantityInput.value);
  quantityInput.value = quantity;
  const total = unitPrice * quantity;
  subtotalEl.textContent = `¥${unitPrice}`;
  totalEl.textContent = `¥${total}`;
}

function showStatus(message, isError = false) {
  statusBox.textContent = message;
  statusBox.classList.toggle('error', isError);
  statusBox.classList.remove('hidden');
}

document.querySelectorAll('.step-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.action === 'plus' ? 1 : -1;
    const nextValue = safeParseInt(quantityInput.value) + direction;
    quantityInput.value = Math.max(1, nextValue);
    updateTotals();
  });
});

quantityInput.addEventListener('input', () => {
  const nextValue = safeParseInt(quantityInput.value);
  if (Number.isFinite(nextValue)) {
    quantityInput.value = nextValue;
    updateTotals();
  }
});

async function createOrder(isDemo = false) {
  const quantity = safeParseInt(quantityInput.value);
  const amount = unitPrice * quantity;

  showStatus('正在创建支付订单，请稍候…');

  try {
    const response = await fetch('/api/wechat/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        productName: 'Jerry 智能水杯',
        quantity,
        demoMode: isDemo,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      showStatus(payload.message || '创建订单失败，请稍后重试。', true);
      return;
    }

    if (payload.demoMode) {
      showStatus(
        `演示模式：订单已创建，支付单号 ${payload.outTradeNo}。\n${payload.message}`
      );
      return;
    }

    if (payload.payUrl) {
      window.location.href = payload.payUrl;
      return;
    }

    showStatus(`订单创建成功，支付单号：${payload.outTradeNo}`);
  } catch (error) {
    showStatus('网络异常，无法创建支付订单。', true);
  }
}

checkoutBtn.addEventListener('click', () => createOrder(false));
mockBtn.addEventListener('click', () => createOrder(true));

updateTotals();
