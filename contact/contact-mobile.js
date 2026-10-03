/**
 * EInfratech Systems - Contact Mobile Scroll-Driven Interaction & Chat
 * Replaces replay button with smooth page-scroll driven chat inside the phone
 */
(function() {
  'use strict';

  function initScrollDrivenChat() {
    var hero = document.querySelector('.contacts-info-block');
    var mockupWrapper = document.querySelector('.ei-mobile-mockup-wrapper');
    var phoneContainer = document.querySelector('.ei-phone-container');
    var chatBody = document.querySelector('.ei-chat-body');
    var dynamicIsland = document.querySelector('.ei-dynamic-island');
    var audioCard = document.querySelector('.ei-audio-card');
    var audioBtn = document.querySelector('.ei-audio-play-btn');
    var badge1 = document.querySelector('.ei-badge-top-right');
    var badge2 = document.querySelector('.ei-badge-mid-left');
    var badge3 = document.querySelector('.ei-badge-bot-right');
    var progressFill = document.querySelector('.ei-badge-progress-fill');
    var progressVal = document.querySelector('.ei-badge-progress-val');

    if (!mockupWrapper || !chatBody) return;

    // Badges active immediately
    if (badge1) badge1.classList.add('ei-badge-active');
    if (badge2) badge2.classList.add('ei-badge-active');
    if (badge3) badge3.classList.add('ei-badge-active');
    if (progressFill) progressFill.style.width = '98%';
    if (progressVal) progressVal.textContent = '98%';

    // Scroll-driven chat content synchronization
    var isUserScrollingChat = false;
    var userScrollTimer = null;

    chatBody.addEventListener('touchstart', function() {
      isUserScrollingChat = true;
      clearTimeout(userScrollTimer);
    }, { passive: true });

    chatBody.addEventListener('wheel', function() {
      isUserScrollingChat = true;
      clearTimeout(userScrollTimer);
      userScrollTimer = setTimeout(function() {
        isUserScrollingChat = false;
      }, 1200);
    }, { passive: true });

    chatBody.addEventListener('touchend', function() {
      userScrollTimer = setTimeout(function() {
        isUserScrollingChat = false;
      }, 1000);
    }, { passive: true });

    function onScrollSync() {
      if (isUserScrollingChat || !hero) return;

      var heroRect = hero.getBoundingClientRect();
      var windowH = window.innerHeight;
      
      // Calculate scroll progress through the hero section
      var totalScrollable = heroRect.height - windowH * 0.4;
      if (totalScrollable <= 0) return;

      var currentProgress = -heroRect.top / totalScrollable;
      var clampedProgress = Math.max(0, Math.min(1, currentProgress));

      var maxChatScroll = chatBody.scrollHeight - chatBody.clientHeight;
      if (maxChatScroll > 0) {
        chatBody.scrollTop = clampedProgress * maxChatScroll;
      }
    }

    window.addEventListener('scroll', onScrollSync, { passive: true });
    // Initial call
    setTimeout(onScrollSync, 100);

    // Audio Waveform Toggle Simulation
    if (audioBtn && audioCard) {
      audioBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var isPlaying = audioCard.classList.toggle('playing');
        if (isPlaying) {
          audioBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          playGentleAudioChime();
        } else {
          audioBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
      });
    }

    // Web Audio Synthesizer chime for interactive feedback
    function playGentleAudioChime() {
      try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        var ctx = new AudioCtx();
        var now = ctx.currentTime;
        var notes = [440, 554.37, 659.25];
        notes.forEach(function(freq, i) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.06, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.5);
        });
      } catch (err) {}
    }

    // 3D Parallax Tilt Effect on Desktop
    if (mockupWrapper && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      mockupWrapper.addEventListener('mousemove', function(e) {
        var rect = mockupWrapper.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        var rotY = x * 12;
        var rotX = -y * 12;

        if (phoneContainer) {
          phoneContainer.style.transform = 'rotateY(' + rotY.toFixed(2) + 'deg) rotateX(' + rotX.toFixed(2) + 'deg)';
        }

        if (badge1) badge1.style.transform = 'translate(' + (-x * 16).toFixed(1) + 'px, ' + (-y * 12).toFixed(1) + 'px)';
        if (badge2) badge2.style.transform = 'translate(' + (x * 20).toFixed(1) + 'px, ' + (y * 15).toFixed(1) + 'px)';
        if (badge3) badge3.style.transform = 'translate(' + (-x * 15).toFixed(1) + 'px, ' + (y * 16).toFixed(1) + 'px)';
      });

      mockupWrapper.addEventListener('mouseleave', function() {
        if (phoneContainer) {
          phoneContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
        if (badge1) badge1.style.transform = '';
        if (badge2) badge2.style.transform = '';
        if (badge3) badge3.style.transform = '';
      });
    }
  }

  // Mobile Bottom Quickbar
  function initMobileQuickbar() {
    if (window.innerWidth > 768) return;

    var bar = document.createElement('div');
    bar.className = 'ei-mobile-quickbar';
    bar.innerHTML = [
      '<a href="tel:+18003312008" class="ei-mobile-quickbar-btn"><i class="fa-solid fa-phone"></i><span>Call US</span></a>',
      '<a href="tel:+918929042908" class="ei-mobile-quickbar-btn primary"><i class="fa-solid fa-phone-volume"></i><span>Call India</span></a>',
      '<a href="tel:+448081891871" class="ei-mobile-quickbar-btn"><i class="fa-solid fa-phone"></i><span>Call UK</span></a>',
      '<a href="#contact-form-section" class="ei-mobile-quickbar-btn"><i class="fa-solid fa-envelope"></i><span>Form</span></a>'
    ].join('');

    document.body.appendChild(bar);

    window.addEventListener('scroll', function() {
      if (window.scrollY > 150) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }, { passive: true });

    var formBtn = bar.querySelector('a[href="#contact-form-section"]');
    if (formBtn) {
      formBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var formEl = document.querySelector('.contacts-form-holder');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  function initInteractiveOfficesMap() {
    var mapLayer = document.getElementById('ei-map-pins-layer');
    if (!mapLayer) return;

    var pins = mapLayer.querySelectorAll('.ei-map-pin');
    var accordionItems = document.querySelectorAll('.our-offices-list .item');

    function setActiveContinent(continent) {
      if (!continent) {
        mapLayer.classList.remove('has-active-continent');
        pins.forEach(function(p) {
          p.classList.remove('is-active', 'show-popover');
        });
        return;
      }

      mapLayer.classList.add('has-active-continent');
      pins.forEach(function(p) {
        if (p.getAttribute('data-continent') === continent) {
          p.classList.add('is-active');
        } else {
          p.classList.remove('is-active', 'show-popover');
        }
      });
    }

    function expandAccordionItem(item) {
      if (!item) return;
      accordionItems.forEach(function(other) {
        if (other !== item) {
          other.classList.remove('active');
          var d = other.querySelector('.description');
          if (d) {
            d.style.display = 'none';
          }
        }
      });

      item.classList.add('active');
      var desc = item.querySelector('.description');
      if (desc) {
        desc.style.display = 'block';
        desc.style.opacity = '1';
        desc.style.visibility = 'visible';
      }

      var continent = item.getAttribute('data-continent');
      if (continent) {
        setActiveContinent(continent);
      }
    }

    // Link accordion items to map pins
    accordionItems.forEach(function(item) {
      var link = item.querySelector('h6 a') || item.querySelector('h6');
      if (link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          expandAccordionItem(item);
        });
      }

      item.addEventListener('mouseenter', function() {
        var continent = item.getAttribute('data-continent');
        if (continent) setActiveContinent(continent);
      });
    });

    // Default to Asia on start
    var defaultItem = document.querySelector('.our-offices-list .item[data-continent="asia"]') || accordionItems[2];
    if (defaultItem) {
      expandAccordionItem(defaultItem);
    }

    // Map Pin click interactions
    pins.forEach(function(pin) {
      pin.addEventListener('click', function(e) {
        e.stopPropagation();

        var wasOpen = pin.classList.contains('show-popover');
        pins.forEach(function(p) { p.classList.remove('show-popover'); });

        if (!wasOpen) {
          pin.classList.add('show-popover');
          var continent = pin.getAttribute('data-continent');
          if (continent) {
            setActiveContinent(continent);
            var targetAccordion = document.querySelector('.our-offices-list .item[data-continent="' + continent + '"]');
            if (targetAccordion) {
              expandAccordionItem(targetAccordion);
            }
          }
        }
      });
    });

    // Close open popovers when clicking outside
    document.addEventListener('click', function() {
      pins.forEach(function(p) { p.classList.remove('show-popover'); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initScrollDrivenChat();
      initMobileQuickbar();
      initInteractiveOfficesMap();
    });
  } else {
    initScrollDrivenChat();
    initMobileQuickbar();
    initInteractiveOfficesMap();
  }
})();
