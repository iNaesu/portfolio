'use strict';

/* Start Script ------------------------------------------------------------- */

/* Animations when an element is scrolled into view */
scrollAnimation();

/* Enable navbar dropdown on burger click */
$('#top-navbar-burger').click(toggleNavbarDropdown);
$('.navbar-item').click(function () {
  if ($('#top-navbar-menu').hasClass('is-active')) {
    toggleNavbarDropdown();
  }
});

/* Hide navbar after scrolling down */
var userScrolled = false; // Has the user scrolled?
var previousDistanceFromTop = 0; // Previous distance from top of window
var delta = 5; // Number of pixels to scroll up before navbar changes state
var scrollCheckPeriod = 100;

window.onscroll = function () {
  userScrolled = true;
};

setInterval(function () {
  if (userScrolled) {
    manipulateNavbar();
    userScrolled = false;
  }
}, scrollCheckPeriod);

/* Hide navbar some a duration of inactivity */
var hideNavbarTimeout = 8000;
if (!$('#top-navbar-menu').hasClass('is-active')) {
  // only hide if inactive
  if (!userScrolled) {
    setInterval(function () {
      if (!$('#top-navbar-menu').hasClass('is-active')) {
        if (!userScrolled) {
          $('#top-navbar').addClass('hide-navbar').removeClass('show-navbar');
        }
      }
    }, hideNavbarTimeout);
  }
}

/* Copy email on click */
new Clipboard('#email-button');
var copiedMsg = $('#copied-message');

$('#email-button').click(function () {
  copiedMsg.removeClass('hidden');
  setTimeout(function () {
    copiedMsg.addClass('hidden');
  }, 5000);
});

/* Scroll to anchor tags */
$('.sliding-link').click(function (e) {
  e.preventDefault();
  var anchor = $(this).attr('href');
  $('html, body').animate({ scrollTop: $(anchor).offset().top }, { duration: 500, easing: 'swing' });
});

/* Function Declarations ---------------------------------------------------- */

/**
 * This function:
 * - Toggles the burger state
 * - Toggles the dropdown menu
 * - Toggles scrollability of the dropdown and the body
 */
function toggleNavbarDropdown() {
  var topNavbarBurger = $('#top-navbar-burger');
  var topNavbarMenu = $('#top-navbar-menu');
  topNavbarBurger.toggleClass('is-active');
  topNavbarMenu.toggleClass('is-active scroll-locked');
  $('body').toggleClass('scroll-locked');
}

/**
 * Get current absolute window scroll position
 * @return {number} scrollPosition
 */
function getWindowYscroll() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
}

/**
 * Show/hide the navbar
 */
function manipulateNavbar() {
  var topNavbar = $('#top-navbar');
  var currentDistanceFromTop = getWindowYscroll();

  // Do nothing if only a tiny scroll happened
  if (Math.abs(currentDistanceFromTop - previousDistanceFromTop) < delta) {
    previousDistanceFromTop = currentDistanceFromTop;
    return;
  }

  // Show navbar if past landing page and scrolling up
  if (currentDistanceFromTop < previousDistanceFromTop) {
    topNavbar.addClass('show-navbar');
    topNavbar.removeClass('hide-navbar');
  } else {
    topNavbar.addClass('hide-navbar');
    topNavbar.removeClass('show-navbar');
  }

  previousDistanceFromTop = currentDistanceFromTop;
}

/**
 * Configures and applies animations when an element is scrolled into view.
 * Library - https://github.com/jlmakes/scrollreveal.
 */
function scrollAnimation() {
  window.sr = ScrollReveal({ reset: true });

  var fadeInRight = {
    'scale': 1,
    'origin': 'left',
    'distance': '2rem',
    'easing': 'ease',
    'duration': 800,
    'reset': false
  };
  var fadeInLeft = {
    'scale': 1,
    'origin': 'right',
    'distance': '2rem',
    'easing': 'ease',
    'duration': 800,
    'reset': false
  };
  var fadeIn = {
    'scale': 1,
    'easing': 'ease',
    'duration': 800,
    'reset': false
  };

  var desktopMin = 1008;
  var rightAnimation = {};
  var leftAnimation = {};
  if (window.innerWidth >= desktopMin) {
    rightAnimation = fadeInRight;
    leftAnimation = fadeInLeft;
  } else {
    rightAnimation = fadeIn;
    leftAnimation = fadeIn;
  }

  sr.reveal('.fade-in-right-staggered', rightAnimation, 800);
  sr.reveal('.fade-in-right', rightAnimation);
  sr.reveal('.fade-in-left', leftAnimation);
}