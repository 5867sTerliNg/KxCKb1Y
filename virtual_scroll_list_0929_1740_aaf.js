// 代码生成时间: 2025-09-29 17:40:52
const fs = require('fs');
const express = require('express');
const app = express();

// 设置静态文件目录
app.use(express.static('public'));

// 模拟大量数据
const items = Array.from({ length: 10000 }, (_, index) => ({ id: index, text: `Item ${index}` }));

// 获取列表的分页数据
app.get('/api/items', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  try {
    const itemsPage = items.slice(startIndex, endIndex);
    res.json(itemsPage);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// 设置端口号
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// HTML模板
fs.writeFileSync('public/index.html', 
'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Virtual Scroll List</title><style>body { margin: 0; padding: 0; font-family: Arial, sans-serif; } .list-container { position: relative; overflow-y: scroll; height: 400px; width: 100%; border: 1px solid #ccc; } .list-item { padding: 10px; border-bottom: 1px solid #eee; }</style></head><body><div class="list-container" id="list-container"></div><script src="app.js"></script></body></html>');

// JavaScript模板
fs.writeFileSync('public/app.js', 
'document.addEventListener("DOMContentLoaded", function() {
  const listContainer = document.getElementById("list-container");
  let page = 1;
  let pageSize = 20;
  let isLoading = false;

  function fetchItems() {
    if (isLoading) return;
    isLoading = true;
    fetch(`/api/items?page=${page}&pageSize=${pageSize}`).then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    }).then(items => {
      listContainer.innerHTML = "";
      items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("list-item");
        itemElement.textContent = item.text;
        listContainer.appendChild(itemElement);
      });
      isLoading = false;
    }).catch(error => {
      console.error("Failed to fetch items: ", error);
      isLoading = false;
    });
  }

  fetchItems();

  listContainer.addEventListener("scroll", () => {
    if (listContainer.scrollTop + listContainer.clientHeight >= listContainer.scrollHeight) {
      page++;
      fetchItems();
    }
  });
});');