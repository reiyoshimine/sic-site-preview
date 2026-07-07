// ヘッダーのスクロール状態
const header = document.getElementById('header');
addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', scrollY > 10);
}, { passive: true });

// モバイルメニュー
const menuBtn = document.getElementById('menuBtn');
const headerNav = document.getElementById('headerNav');
menuBtn.addEventListener('click', () => {
    const open = headerNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open);
});
headerNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    headerNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
}));

// FAQ アコーディオン
document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open);
    });
});

// スクロールフェードイン（IntersectionObserver 非対応環境でも動くフォールバック付き）
const fadeEls = [...document.querySelectorAll('.fade-in')];
function checkFadeIns() {
    const vh = innerHeight || document.documentElement.clientHeight;
    const line = vh ? vh * 0.92 : 1e9;
    for (const el of fadeEls) {
        if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top < line) {
            el.classList.add('is-visible');
        }
    }
}
addEventListener('scroll', checkFadeIns, { passive: true });
addEventListener('resize', checkFadeIns, { passive: true });
addEventListener('load', checkFadeIns);
checkFadeIns();
setInterval(checkFadeIns, 800);

// 文字サイズ切替（選択を記憶）
(function () {
    var KEY = 'sic-font-large';
    var root = document.documentElement;
    function apply(on) {
        root.classList.toggle('large-text', on);
        document.querySelectorAll('.js-font-toggle').forEach(function (b) {
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
            b.textContent = b.closest('.header__nav')
                ? (on ? '文字サイズを標準に戻す' : '文字サイズを大きくする')
                : (on ? '文字サイズ 標準' : '文字サイズ 大');
        });
    }
    var saved = false;
    try { saved = localStorage.getItem(KEY) === '1'; } catch (e) {}
    apply(saved);
    document.querySelectorAll('.js-font-toggle').forEach(function (b) {
        b.addEventListener('click', function () {
            var on = !root.classList.contains('large-text');
            try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {}
            apply(on);
        });
    });
})();
