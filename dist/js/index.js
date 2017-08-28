'use strict';

/* Start Script ------------------------------------------------------------- */

/* Animate elements */
animateElements();

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
 * Fade an element in over a given duration with an optional callback after the
 * fade is complete
 * @param {obj} el - jQuery element
 * @param {number} duration - Duration to fade in over
 * @param {function} cb - Optional callback function
 */
function fadeIn(el, duration, cb) {
  el.animate({ 'opacity': '1' }, duration, cb);
}

/**
 * Add animation to elementss in the site
 */
function animateElements() {
  var baseDuration = 500;

  /* Landing page - Fade in title -> subtitle -> button on page load */
  fadeIn($('#landing-title'), 2 * baseDuration, function () {
    fadeIn($('#landing-subtitle'), baseDuration, function () {
      fadeIn($('#see-work-button'), baseDuration);
    });
  });
}

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