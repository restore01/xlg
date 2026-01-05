// 活动详情数据
const activityDetails = {
    'egg': {
        title: '收集鸡蛋',
        description: '今日收集了15个鸡蛋！其中3个是金鸡蛋。',
        extra: '鸡蛋可以出售或用于烹饪。金鸡蛋价值更高！'
    },
    'corn': {
        title: '收获玉米',
        description: '玉米大丰收！共收获25个玉米，品质都很不错。',
        extra: '玉米是夏季作物，可以连续收获多次。'
    },
    'chicken': {
        title: '喂食动物',
        description: '所有动物都已喂食，心情值+5。',
        extra: '心情值高的动物会产出更高质量的产品。'
    },
    'water': {
        title: '浇水完成',
        description: '全部作物已浇水，明天会长得更好！',
        extra: '及时浇水可以保证作物健康生长。'
    },
    'tool': {
        title: '升级工具',
        description: '铜制锄头升级完成，工作效率提高20%。',
        extra: '工具可以在铁匠铺升级，提高工作效率。'
    },
    'sunflower': {
        title: '种植向日葵',
        description: '在农场东边新种了10株向日葵。',
        extra: '向日葵既美观又可以产出葵花籽。'
    }
};

// 季节活动详情
const seasonDetails = {
    'spring': {
        title: '春季花舞节',
        description: '日期：春季第24天\n地点：森林\n活动：与村民跳舞，购买稀有种子'
    },
    'fishing': {
        title: '钓鱼大赛',
        description: '日期：夏季第2天\n地点：海滩\n活动：钓鱼比赛，赢取奖励'
    },
    'fall': {
        title: '秋季展览会',
        description: '日期：秋季第16天\n地点：小镇广场\n活动：展示农产品，玩游戏'
    },
    'winter': {
        title: '冬季冰雪节',
        description: '日期：冬季第8天\n地点：森林\n活动：冰钓，观看冰雕'
    }
};

// 物品信息
const itemInfo = {
    '🥚': '鸡蛋 - 可用于烹饪或出售',
    '🌽': '玉米 - 夏季作物，可连续收获',
    '🐔': '小鸡 - 每天生产鸡蛋',
    '🌻': '向日葵 - 美观且可产出葵花籽',
    '🍓': '草莓 - 春季作物，可重复收获',
    '⚒️': '工具 - 需要定期升级',
    '📦': '采集包 - 社区中心的收集任务',
    '🌿': '草药 - 用于制作药水',
    '🎁': '礼物 - 送给村民增加好感度'
};

// 文章额外详情
const articleDetails = {
    '农场日记': {
        extra: '种了很大一片花椰菜，期待收获巨大作物！'
    },
    '今日收获': {
        extra: ' 钓鱼更便捷了！'
    },
    '社区中心': {
        extra: '完成了春季采集包，获得了30个草莓种子作为奖励！明天准备种植在温室旁边。'
    }
};

// DOM元素缓存
let cachedElements = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    initializePage();
});

// 初始化DOM元素缓存
function initializeElements() {
    cachedElements = {
        farmActivities: document.querySelectorAll('.farm-activities li'),
        seasonActivities: document.querySelectorAll('.season-activities li'),
        navLinks: document.querySelectorAll('.nav-link'),
        blogPosts: document.querySelectorAll('.blog-post'),
        items: document.querySelectorAll('.item'),
        activityModal: document.getElementById('activity-modal'),
        articleModal: document.getElementById('article-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalDescription: document.getElementById('modal-description'),
        modalExtra: document.getElementById('modal-extra'),
        articleModalTitle: document.getElementById('article-modal-title'),
        articleModalContent: document.getElementById('article-modal-content'),
        articleExtra: document.getElementById('article-extra'),
        closeModals: document.querySelectorAll('.close-modal')
    };
}

// 设置事件监听器
function setupEventListeners() {
    // 农场活动点击事件
    cachedElements.farmActivities.forEach(activity => {
        activity.addEventListener('click', handleFarmActivityClick);
    });

    // 季节活动点击事件
    cachedElements.seasonActivities.forEach(activity => {
        activity.addEventListener('click', handleSeasonActivityClick);
    });

    // 导航链接点击事件
    cachedElements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // 文章点击事件
    cachedElements.blogPosts.forEach(post => {
        post.addEventListener('click', handleBlogPostClick);
    });

    // 物品点击事件
    cachedElements.items.forEach(item => {
        item.addEventListener('click', handleItemClick);
    });

    // 关闭弹窗事件
    cachedElements.closeModals.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // 点击弹窗背景关闭
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // 页脚图标点击事件
    document.querySelectorAll('.animal-icon').forEach(icon => {
        icon.addEventListener('click', handleAnimalIconClick);
    });
}

// 页面初始化
function initializePage() {
    // 设置默认活动状态
    if (cachedElements.farmActivities.length > 0) {
        setActiveElement(cachedElements.farmActivities[0], 'farm-activity');
    }
    
    if (cachedElements.navLinks.length > 0) {
        setActiveElement(cachedElements.navLinks[0], 'nav-link');
    }
    
    // 显示欢迎消息
    setTimeout(() => {
        showTooltip('欢迎来到星露谷农场！点击任意项目查看详情。', 3000);
    }, 1000);
}

// 处理农场活动点击
function handleFarmActivityClick(event) {
    event.stopPropagation();
    const activity = event.currentTarget;
    const activityId = activity.getAttribute('data-activity');
    
    // 设置活动状态
    setActiveElement(activity, 'farm-activity');
    
    // 显示活动详情
    showActivityModal(activityId);
}

// 处理季节活动点击
function handleSeasonActivityClick(event) {
    event.stopPropagation();
    const activity = event.currentTarget;
    const seasonId = activity.getAttribute('data-season');
    const emoji = activity.textContent.match(/[🌸🎣🎃❄️]/)?.[0] || '🌸';
    
    // 设置活动状态
    setActiveElement(activity, 'season-activity');
    
    // 创建季节特效
    createSeasonEffect(emoji);
    
    // 显示季节活动详情
    showSeasonModal(seasonId);
}

// 处理导航链接点击
function handleNavLinkClick(event) {
    event.preventDefault();
    const link = event.currentTarget;
    const filter = link.getAttribute('data-filter');
    
    console.log('导航点击:', filter); // 调试用
    
    // 设置活动状态
    setActiveElement(link, 'nav-link');
    
    // 筛选文章
    filterBlogPosts(filter);
    
    // 显示筛选结果提示
    showTooltip(`显示${filter === 'all' ? '所有' : filter}相关内容`, 1500);
}

function filterBlogPosts(filter) {
    console.log('开始筛选，条件:', filter); // 调试用
    
    if (!cachedElements.blogPosts || cachedElements.blogPosts.length === 0) {
        console.error('未找到文章元素');
        return;
    }
    
    cachedElements.blogPosts.forEach(post => {
        const category = post.getAttribute('data-category');
        console.log('文章类别:', category, '筛选条件:', filter); // 调试用
        
        if (filter === 'all' || category === filter) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease';
            console.log('显示文章:', post.querySelector('h2').textContent); // 调试用
        } else {
            post.style.display = 'none';
            console.log('隐藏文章:', post.querySelector('h2').textContent); // 调试用
        }
    });
}
// 处理文章点击
function handleBlogPostClick(event) {
    const post = event.currentTarget;
    const title = post.querySelector('h2').textContent;
    const content = post.querySelector('p').textContent;
    
    // 设置活动状态
    setActiveElement(post, 'blog-post');
    
    // 显示文章详情
    showArticleModal(title, content);
}

// 处理物品点击
function handleItemClick(event) {
    event.stopPropagation();
    const item = event.currentTarget;
    const emoji = item.textContent;
    
    // 添加点击动画
    item.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => {
        item.style.transform = '';
    }, 300);
    
    // 显示物品信息
    showTooltip(itemInfo[emoji] || '未知物品', 2000);
}

// 处理动物图标点击
function handleAnimalIconClick(event) {
    const animal = event.currentTarget.textContent;
    const animalNames = {
        '🐮': '奶牛',
        '🐑': '绵羊',
        '🐷': '小猪'
    };
    
    showTooltip(`${animalNames[animal]}今天很开心！`, 2000);
    
    // 添加动画效果
    event.currentTarget.style.animation = 'bounce 0.5s';
    setTimeout(() => {
        event.currentTarget.style.animation = '';
    }, 500);
}

// 显示活动详情弹窗
function showActivityModal(activityId) {
    const detail = activityDetails[activityId];
    if (!detail) return;
    
    cachedElements.modalTitle.textContent = detail.title;
    cachedElements.modalDescription.textContent = detail.description;
    cachedElements.modalExtra.textContent = detail.extra;
    
    cachedElements.activityModal.style.display = 'flex';
}

// 显示季节活动弹窗
function showSeasonModal(seasonId) {
    const detail = seasonDetails[seasonId];
    if (!detail) return;
    
    cachedElements.modalTitle.textContent = detail.title;
    cachedElements.modalDescription.textContent = detail.description;
    cachedElements.modalExtra.innerHTML = '';
    
    cachedElements.activityModal.style.display = 'flex';
}

// 显示文章详情弹窗
function showArticleModal(title, content) {
    cachedElements.articleModalTitle.textContent = title;
    cachedElements.articleModalContent.textContent = content;
    
    const extra = articleDetails[title]?.extra || '更多详情正在整理中...';
    cachedElements.articleExtra.innerHTML = `
        <h4>📝 详细记录</h4>
        <p>${extra}</p>
    `;
    
    cachedElements.articleModal.style.display = 'flex';
}

// 筛选文章
function filterBlogPosts(filter) {
    cachedElements.blogPosts.forEach(post => {
        const category = post.getAttribute('data-category');
        
        if (filter === 'all' || category.includes(filter)) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease';
        } else {
            post.style.display = 'none';
        }
    });
}

// 设置活动元素
function setActiveElement(element, type) {
    // 移除同类型元素的活动状态
    switch(type) {
        case 'farm-activity':
            cachedElements.farmActivities.forEach(item => {
                item.classList.remove('active');
            });
            break;
        case 'season-activity':
            cachedElements.seasonActivities.forEach(item => {
                item.classList.remove('active');
            });
            break;
        case 'nav-link':
            cachedElements.navLinks.forEach(item => {
                item.classList.remove('active');
            });
            break;
        case 'blog-post':
            cachedElements.blogPosts.forEach(item => {
                item.classList.remove('active');
            });
            break;
    }
    
    // 添加当前元素的活动状态
    element.classList.add('active');
}

// 创建季节特效
function createSeasonEffect(emoji) {
    for (let i = 0; i < 10; i++) {
        const effect = document.createElement('div');
        effect.textContent = emoji;
        effect.className = 'season-effect';
        
        // 随机位置和动画
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const randomX = Math.random() * 100 - 50;
        
        effect.style.cssText = `
            position: fixed;
            font-size: 24px;
            z-index: 999;
            pointer-events: none;
            left: ${startX}px;
            top: ${startY}px;
            --random-x: ${randomX}px;
            animation: floatAway 2s ease-out forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        document.body.appendChild(effect);
        
        // 动画结束后移除
        setTimeout(() => {
            if (effect.parentNode) {
                effect.remove();
            }
        }, 2000);
    }
}

// 显示工具提示
function showTooltip(message, duration = 2000) {
    // 移除现有的工具提示
    const existingTooltip = document.querySelector('.custom-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // 创建新的工具提示
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #556b2f;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        font-weight: bold;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // 自动消失
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 300);
    }, duration);
}

// 关闭所有弹窗
function closeAllModals() {
    cachedElements.activityModal.style.display = 'none';
    cachedElements.articleModal.style.display = 'none';
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(event) {
    // ESC键关闭弹窗
    if (event.key === 'Escape') {
        closeAllModals();
    }
    
    // 数字键1-6选择农场活动
    if (event.key >= '1' && event.key <= '6') {
        const index = parseInt(event.key) - 1;
        if (cachedElements.farmActivities[index]) {
            cachedElements.farmActivities[index].click();
        }
    }
});
