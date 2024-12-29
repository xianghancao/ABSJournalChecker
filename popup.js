document.getElementById('searchBtn').addEventListener('click', function() {
    const journalName = document.getElementById('journalName').value.trim().toLowerCase();

    // 标准化用户输入，去除 "the"
    const normalizedJournalName = journalName.replace(/\bthe\b/g, '').trim();

    // 读取本地 JSON 文件
    fetch('abs_journals.json')
        .then(response => response.json())
        .then(data => {
            // 查找用户输入的期刊
            for (const [key, value] of Object.entries(data)) {
                // 标准化期刊名称，去除 "the"
                const normalizedKey = key.toLowerCase().replace(/\bthe\b/g, '').trim();
                if (normalizedKey === normalizedJournalName) {
                    const journalInfo = value;

                    // 使用 createTable 函数生成表格并显示
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = ''; // 清空之前的结果

                    // 创建并显示期刊名称
                    const journalTitle = document.createElement('h2'); // 创建一个 h2 元素
                    journalTitle.innerText = key; // 设置期刊名称为原始的期刊名
                    resultDiv.appendChild(journalTitle); // 将期刊名称添加到结果区

                    resultDiv.appendChild(createTable(journalInfo)); // 调用 createTable 函数

                    return;
                }
            }
            document.getElementById('result').innerText = 'Journal not found';
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error fetching journal data';
            console.error(error);
        });
});

// 创建表格的函数
function createTable(data) {
    // 创建表格元素
    const table = document.createElement('table');

    // 创建表头
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ["Field", "Value"];
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 创建表格主体
    const tbody = document.createElement('tbody');

    // 将数据填充到表格
    for (const [key, value] of Object.entries(data)) {
        const row = document.createElement('tr');

        const tdKey = document.createElement('td');
        tdKey.innerText = key; // 属性名

        const tdValue = document.createElement('td');
        const strongValue = document.createElement('strong'); // 创建一个 <strong> 元素
        strongValue.innerText = value; // 设置加粗的值
        tdValue.appendChild(strongValue); // 将加粗值添加到单元格

        row.appendChild(tdKey);
        row.appendChild(tdValue);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
}
