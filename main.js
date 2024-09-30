// navbar hamburger function
const hamburger_btn = document.getElementById('icon-menu');
const nav_close = document.getElementById('icon-close');

hamburger_btn.addEventListener('click', () => {
    document.getElementById('mobile-nav').style.display = 'block';
});

nav_close.addEventListener('click', () => {
    document.getElementById('mobile-nav').style.display = 'none';
});

// navbar underline nav-list
const nav_list = document.querySelectorAll('.nav-list a');

nav_list.forEach((nav, key) => {
    nav.addEventListener('click', () => {
        nav_list.forEach((i) => {
            i.classList.remove('list-active');
        });
        nav.classList.add('list-active');
        nav_list[(key + 5) % 10].classList.add('list-active');
    });
});


//increment decrement function
const increment = document.getElementById('item-increment');
const decrement = document.getElementById('item-decrement');

increment.addEventListener('click', () => {
    var item = document.getElementById('count-items');
    item.textContent = parseInt(item.textContent) + 1;
});

decrement.addEventListener('click', () => {
    var item = document.getElementById('count-items');
    item.textContent = parseInt(item.textContent) - 1;
    item.textContent = item.textContent < 0 ? 0 : item.textContent;
});

// product image change
const main_img = document.getElementById('main-img');
const img_list = document.querySelectorAll('#item-imglist img');

img_list.forEach((img) => {
    img.addEventListener('click', () => {
        var img_src = img.src;
        img_src = img_src.replace('-thumbnail', '');
        main_img.src = img_src;
        img_list.forEach((i) => {
            i.classList.remove('active-img');
        });
        img.classList.add('active-img');
    });
});

//lightbox open close
const main_img1 = document.getElementById('main-img');
const lightbox_close = document.getElementById('lightbox-close');

function handleMainImageClick() {
    if (window.innerWidth > 768) {
        main_img1.addEventListener('click', showLightbox);
    } else {
        main_img1.removeEventListener('click', showLightbox);
    }
}

const showLightbox = () => {
    document.getElementById('lightbox').style.display = 'flex';
}

const hideLightbox = () => {
    document.getElementById('lightbox').style.display = 'none';
}
handleMainImageClick();
window.addEventListener('resize', handleMainImageClick);

lightbox_close.addEventListener('click', hideLightbox);

// product image change for lightbox
const main_img2 = document.getElementById('lightbox-main-img');
const img_list2 = document.querySelectorAll('#lightbox-item-imglist img');

if (window.innerWidth > 768) {
    img_list2.forEach((img) => {
        img.addEventListener('click', () => {
            var img_src = img.src;
            img_src = img_src.replace('-thumbnail', '');
            main_img2.src = img_src;
            img_list2.forEach((i) => {
                i.classList.remove('lightbox-active-img');
            });
            img.classList.add('lightbox-active-img');
        });
    });
}

//lightbox carousel
const lightbox_next = document.getElementById('lightbox-next');
const lightbox_prev = document.getElementById('lightbox-prev');

lightbox_next.addEventListener('click', () => {
    var key;
    img_list2.forEach((i, k) => {
        if (i.classList.contains('lightbox-active-img')) {
            key = k;
        }
    });
    key = (key + 1) % img_list.length;
    img_list2[key].click();
});

lightbox_prev.addEventListener('click', () => {
    var key;
    img_list2.forEach((i, k) => {
        if (i.classList.contains('lightbox-active-img')) {
            key = k;
        }
    });
    key = (key === 0) ? img_list.length - 1 : (key - 1) % img_list.length;
    img_list2[key].click();
});

//mobile carousel
const mobile_next = document.getElementById('mobile-next');
const mobile_prev = document.getElementById('mobile-prev');

mobile_next.addEventListener('click', () => {
    var key;
    img_list.forEach((i, k) => {
        if (i.classList.contains('active-img')) {
            key = k;
        }
    });
    key = (key + 1) % img_list.length;
    img_list[key].click();
});

mobile_prev.addEventListener('click', () => {
    var key;
    img_list.forEach((i, k) => {
        if (i.classList.contains('active-img')) {
            key = k;
        }
    });
    key = (key === 0) ? img_list.length - 1 : (key - 1) % img_list.length;
    img_list[key].click();
});