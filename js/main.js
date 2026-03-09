// ========== 移动端菜单 ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项后关闭菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ========== 滚动动画 ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.overview-card, .project-card, .skill-category, .award-card, .experience-card, .work-item').forEach(el => {
        observer.observe(el);
    });
    
    // ========== 技能条动画 ==========
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
    
    // ========== 导航栏滚动效果 ==========
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== 当前页面导航高亮 ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== 图片懒加载 ==========
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========== 平滑滚动到顶部 ==========
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== 打字机效果 (英雄区域副标题) ==========
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // ========== 数字计数动画 ==========
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-value, .summary-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isNumber = /^\d/.test(target);
            
            if (isNumber) {
                const num = parseFloat(target.replace(/[^0-9.]/g, ''));
                const suffix = target.replace(/[0-9.]/g, '');
                let current = 0;
                const increment = num / 50;
                
                const updateCounter = () => {
                    if (current < num) {
                        current += increment;
                        if (current > num) current = num;
                        counter.textContent = Math.floor(current) + suffix;
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    };
    
    // 当奖项区域可见时触发计数动画
    const awardsSection = document.querySelector('.awards-summary');
    if (awardsSection) {
        const awardsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                awardsObserver.unobserve(awardsSection);
            }
        });
        awardsObserver.observe(awardsSection);
    }
    
    // ========== 🖼️ 工作界面图片展示功能 (Lightbox) ==========
    let currentImageIndex = 0;
    const galleryImages = [
        { src: 'images/work1.png', caption: '振动传感器报警数量统计表' },
        { src: 'images/work2.png', caption: '视频数据 + 视频下载工具' },
        { src: 'images/work3.png', caption: '振动传感器滚动标准差分析' },
        { src: 'images/work4.png', caption: '振动传感器数据分析系统' }
    ];
    
    // 打开图片放大
    window.openLightbox = function(index) {
        currentImageIndex = index;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        if (lightbox && lightboxImg && lightboxCaption) {
            lightboxImg.src = galleryImages[index].src;
            lightboxCaption.textContent = galleryImages[index].caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    // 关闭图片放大
    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    
    // 上一张
    window.prevImage = function(event) {
        if (event) event.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    };
    
    // 下一张
    window.nextImage = function(event) {
        if (event) event.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    };
    
    // 更新图片
    function updateLightboxImage() {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        if (lightboxImg && lightboxCaption) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = galleryImages[currentImageIndex].src;
                lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
                lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') window.closeLightbox();
            if (e.key === 'ArrowLeft') window.prevImage(e);
            if (e.key === 'ArrowRight') window.nextImage(e);
        }
    });
});

// ========== 控制台输出 ==========
console.log('%c👋 你好！我是李云旭', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c🎯 AI 产品经理 | 通信工程专业', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 3074182925@qq.com | 📱 19505285673', 'font-size: 12px; color: #94a3b8;');
console.log('%c🚀 欢迎访问我的个人展示网站！', 'font-size: 12px; color: #06b6d4;');