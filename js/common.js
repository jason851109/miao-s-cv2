// AOS動畫插件初始化
AOS.init();

////locomotive scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector("#scroll-zone"),
    smooth: true,
    lerp: 0.05,
    repeat: false,
    class: 'is-inview',
});
// 獲取「回到頂部」按鈕並綁定事件
const backToTopBtn = document.getElementById('backToTopBtn');
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault(); // 阻止默認跳轉
    scroll.scrollTo('top', {
        duration: 1000,
        callback: () => console.log('已回到頂部！')
    });
});

// 其他滾動按鈕
const scrollButtons = document.querySelectorAll('.scroll-btn');
scrollButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        scroll.scrollTo(`#${targetId}`, {
            duration: 1000,
            offset: 0,
            callback: () => console.log(`已滾動到區塊 ${targetId}`)
        });
    });
});

//高度偵測
const container = document.querySelector('#scroll-zone');
new ResizeObserver(() => {
    scroll.update();
}).observe(container);

//text特效
var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
    loop: false
})
    .add({
        targets: '.ml7 .letter',
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 1500,
        easing: "easeOutExpo",
        delay: (el, i) => 100 * i
    }).add({
        targets: '.ml7',
        opacity: 1,
        duration: 2000,
        easing: "easeOutExpo",
        delay: 2000
    });

//custom-cursor
const cursor = document.querySelector('.custom-cursor');
const hoverTargets = document.querySelectorAll('a, button'); // 選擇所有 <a> 標籤

if (cursor && hoverTargets.length > 0) {
    // 滑鼠移動事件
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    // 對每個 <a> 標籤添加事件監聽器
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.style.width = "60px";
            cursor.style.height = "60px";
        });

        target.addEventListener('mouseleave', () => {
            cursor.style.width = "40px";
            cursor.style.height = "40px";
        });
    });
}