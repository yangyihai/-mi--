const historyNumbers = [];
const maxNumbers = 5;

// 页面加载完成后添加旋转效果 - 涂姐头像按钮 转转转
document.addEventListener('DOMContentLoaded', function () {
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', function () {
            avatar.classList.toggle('rotate');
        });
    } else {
        console.error('未找到 .avatar 元素');
    }
});

function generateNumbers() {
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');

    if (leftColumn.children.length + rightColumn.children.length >= maxNumbers) {
        alert('最多只能生成5组号码！');
        return;
    }

    // 模拟生成双色球号码
    const numbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 33) + 1);
    const blueBall = Math.floor(Math.random() * 16) + 1;
    const numberSet = numbers.join(' ') + ' + ' + blueBall;

    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = numberSet;

    // 交替添加到左右列
    if (leftColumn.children.length <= rightColumn.children.length) {
        leftColumn.appendChild(card);
    } else {
        rightColumn.appendChild(card);
    }

    // 更新历史号码
    historyNumbers.push(numberSet);
    updateHistory();
}

function clearNumbers() {
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    // 清空历史记录
    historyNumbers.length = 0;
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    historyNumbers.forEach((number, index) => {
        const li = document.createElement('li');
        li.textContent = `第${index + 1}期: ${number}`;
        historyList.appendChild(li);
    });
}

function exportNumbers() {
    const cards = document.querySelectorAll('.card');
    let content = '';
    cards.forEach(card => {
        content += card.textContent + '\n';
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '双色球号码.txt';
    a.click();
}