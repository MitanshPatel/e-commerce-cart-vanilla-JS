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


//view cart
const cart_btn = document.getElementById('cart-icon');

cart_btn.addEventListener('click', () => {
    var temp = document.getElementById('cart-modal').classList.contains('hidden');
    
    if (temp) {
        document.getElementById('cart-modal').classList.remove('hidden');
        document.getElementById('cart-modal').classList.add('visible');
    } else {
        document.getElementById('cart-modal').classList.remove('visible');
        document.getElementById('cart-modal').classList.add('hidden');
    }
});

// CRUD on cart
const cart = [];
const count_items = document.getElementById('count-items');
const add_cart = document.getElementById('item-add');


add_cart.addEventListener('click', () => {
    if (count_items.textContent !== '0') {
        const item = {
            name: add_cart.getAttribute('item_name'),
            price: add_cart.getAttribute('item_price'),
            quantity: count_items.textContent,
            img: main_img.src
        };
        let flag = false;
        cart.forEach((i) => {
            if (i.name === item.name) {
                flag = true;
                i.quantity = parseInt(i.quantity) + parseInt(item.quantity);
                updateCart();
            }
        });
        if (flag === false) {
            cart.push(item);
            updateCart();
        }
    }
});

const modal = document.getElementById('cart-modal');
const cart_count_notif = document.getElementById('cart-count-notif');

if (cart.length === 0) {
    modal.innerHTML = "";
    modal.innerHTML = `<h3>Cart</h3>
         <div id="empty-cart-info">
              <h4>Your cart is empty</h4>
            </div>`;

    cart_count_notif.style.display = 'none';
}

const updateCart = () => {
    if (cart.length === 0) {
        modal.innerHTML = "";
        modal.innerHTML = `<h3>Cart</h3>
         <div id="empty-cart-info">
              <h4>Your cart is empty</h4>
            </div>`;
        cart_count_notif.style.display = 'none';
    } else {
        modal.innerHTML = "";
        modal.innerHTML = `
            <h3>Cart</h3>
            <div id="cart-info">
              <img src="${cart[0].img}" alt="">
              <div class="cart-item-details">
                <h4 style="font-weight: 400;">${cart[0].name}</h4>
                <p>$ ${cart[0].price} x ${cart[0].quantity} <span>$ ${cart[0].quantity * cart[0].price}</span></p>
              </div>
              <button id="cart-item-delete">
                <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <path
                      d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                      id="a" />
                  </defs>
                  <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
                </svg>
              </button>
            </div>
            <div id="checkout">
              <button id="checkout-btn">Checkout</button>
            </div>
        `;
        cart_count_notif.style.display = 'flex';
        cart_count_notif.innerHTML = `<p id="cart-count">${cart[0].quantity}</p>`

        const delete_btn = document.getElementById('cart-item-delete');
        delete_btn.addEventListener('click', () => {
            cart.pop();
            updateCart();
        });
    }
};
