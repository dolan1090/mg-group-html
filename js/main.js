function setupSwiperSlider() {
  // Setup banner slider
  var slider = new Swiper('.slide-main', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoHeight: true,
    autoplay: {
      delay: 25000,
      disableOnInteraction: false,
    },
  });
}

// Setup page elements
function setupElements() {
  // Setup languages select box
  const languagesBox = customSelect('#languages-select');

  // Setup scroll to top button
  const scrollToTopButton = document.querySelector('.back-to-top');
  scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Setup mobile smartmenu
function setupMobileSubMenu() {
  const mainMenu = document.getElementById('main-menu');
  const menuStateInput = document.getElementById('main-menu-state');
  const subMenus = [...mainMenu.querySelectorAll('.sub-menu')];
  const OPEN_MENU_CLASS = 'highlighted';
  let maxSubMenuHeight = 0;

  subMenus.forEach((subMenu) => {
    const menuItemLink = getMenuItemLink(subMenu);
    const subMenuArrow = document.createElement('span');

    subMenuArrow.classList.add('sub-arrow');
    subMenuArrow.addEventListener('click', (event) => {
      event.preventDefault();
      menuItemLink.classList.toggle(OPEN_MENU_CLASS);
      maxSubMenuHeight = subMenu.scrollHeight;
      mainMenu.style.setProperty(
        '--max-submenu-height',
        `${maxSubMenuHeight}px`
      );
    });

    menuItemLink.classList.add('has-submenu');
    menuItemLink.append(subMenuArrow);
  });

  menuStateInput.addEventListener('change', () => {
    if (!menuStateInput.checked) {
      subMenus.forEach((subMenu) => {
        const menuItemLink = getMenuItemLink(subMenu);
        menuItemLink.classList.remove(OPEN_MENU_CLASS);
      });
    }
  });
}

function getMenuItemLink(subMenu) {
  const menuItem = subMenu.parentNode;
  const menuItemChildren = menuItem.childNodes;
  const subMenuSiblings = [...menuItemChildren].filter(
    (item) => item !== subMenu && item.nodeName.toLowerCase() === 'a'
  );

  if (subMenuSiblings.length === 0) return null;

  return subMenuSiblings[0];
}

function setupMobileMenu() {
  // Fix bug
  var btn_close_topmenu = document.querySelector('#main-menu-state');
  var main_topmenu = document.querySelector('#main-menu');
  btn_close_topmenu.onclick = function () {
    if (!main_topmenu.classList.contains('show-mn')) {
      main_topmenu.classList.add('show-mn');
    } else {
      main_topmenu.classList.remove('show-mn');
    }
  };
}

setupSwiperSlider();
setupElements();
setupMobileMenu();
setupMobileSubMenu();
