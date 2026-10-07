/**
 * EInfratech Systems - Connected Workplace IWMS Hero Animation
 * Interactive Script for Character Showcases, Module Switching & Live Simulator
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    var showcase = document.getElementById('ei-iwms-showcase');
    if (!showcase) return;

    // Elements
    var tabBtns = showcase.querySelectorAll('.ei-tab-btn');
    var charCards = showcase.querySelectorAll('.ei-char-card');
    var centralHub = showcase.querySelector('.ei-central-hub');
    var playToggle = showcase.querySelector('.ei-play-toggle');
    var featChips = document.querySelectorAll('.ei-feat-chip');
    var tickerItems = showcase.querySelectorAll('.ei-ticker-item');
    var tickerPrev = showcase.querySelector('.ei-ticker-prev');
    var tickerNext = showcase.querySelector('.ei-ticker-next');
    var modal = showcase.querySelector('.ei-role-modal');
    var modalClose = showcase.querySelector('.ei-modal-close');
    var modalTitle = showcase.querySelector('#ei-modal-title');
    var modalRole = showcase.querySelector('#ei-modal-role');
    var modalDesc = showcase.querySelector('#ei-modal-desc');
    var modalIcon = showcase.querySelector('#ei-modal-icon');
    var modalBen1 = showcase.querySelector('#ei-modal-ben1');
    var modalBen2 = showcase.querySelector('#ei-modal-ben2');
    var modalBen3 = showcase.querySelector('#ei-modal-ben3');
    var cablePaths = showcase.querySelectorAll('.ei-cable-path');

    // Role Details Data
    var roleData = {
      facilities: {
        role: "Maya • Facility Operations Lead",
        title: "Facilities & Smart Campus Operations",
        iconClass: "fac fa-building",
        desc: "Unified building operations across global facilities. Monitors real-time HVAC telemetry, indoor air quality, lighting, and campus energy consumption. Connected Workplace automates preventive checks and keeps workspaces healthy, safe, and efficient.",
        ben1: { num: "100%", lbl: "Campus Visibility" },
        ben2: { num: "-18%", lbl: "Energy Consumption" },
        ben3: { num: "24/7", lbl: "Automated Monitoring" },
        cableIndex: 0
      },
      maintenance: {
        role: "David • Field Maintenance Specialist",
        title: "Maintenance Operations & Mobile Dispatch",
        iconClass: "maint fa-screwdriver-wrench",
        desc: "Complete work order lifecycle from automated sensor trigger to field completion. Mobile-first workflows empower technicians with asset history, schematics, QR/barcode scanning, and parts inventory for rapid first-time fixes.",
        ben1: { num: "99.8%", lbl: "SLA Compliance" },
        ben2: { num: "-35%", lbl: "Equipment Downtime" },
        ben3: { num: "14 min", lbl: "Avg. Resolution Time" },
        cableIndex: 1
      },
      space: {
        role: "Sarah • Hybrid Workplace Specialist",
        title: "Workspaces, Desk Booking & Space Planning",
        iconClass: "space fa-chart-pie",
        desc: "Optimizes corporate real estate footprint and hybrid work experience. Employees book desks and collaboration rooms in 2 clicks. Facility leaders gain live heatmaps and occupancy analytics to right-size office leases.",
        ben1: { num: "88%", lbl: "Space Utilization" },
        ben2: { num: "+45%", lbl: "Employee Satisfaction" },
        ben3: { num: "2 Clicks", lbl: "Instant Booking" },
        cableIndex: 2
      },
      realestate: {
        role: "Alex • Real Estate & Asset Director",
        title: "Corporate Real Estate & Asset Tracking",
        iconClass: "re fa-city",
        desc: "Centralized tracking for 15M+ operational technology (OT) & IT assets. Full lifecycle management from capital procurement to lease expiration, depreciation, and ESG sustainability reporting on a single dashboard.",
        ben1: { num: "15M+", lbl: "Assets Monitored" },
        ben2: { num: "+24%", lbl: "Portfolio ROI" },
        ben3: { num: "0 Missed", lbl: "Lease Renewals" },
        cableIndex: 3
      }
    };

    var modules = ['facilities', 'maintenance', 'space', 'realestate'];
    var currentModuleIndex = 0;
    var isPlaying = true;
    var cycleTimer = null;

    // Function to activate a specific role/module
    function activateModule(modKey, openDrawer) {
      // Update tab buttons
      tabBtns.forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-mod') === modKey);
      });

      // Update chips in left column
      featChips.forEach(function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-mod') === modKey);
      });

      // Update character cards
      charCards.forEach(function (card) {
        var isTarget = card.getAttribute('data-mod') === modKey;
        var isAll = modKey === 'all';
        card.classList.toggle('active', isTarget || isAll);
        card.style.opacity = isTarget || isAll ? '1' : '0.88';
      });

      // Highlight SVG cables
      cablePaths.forEach(function (cable, idx) {
        if (modKey === 'all') {
          cable.style.stroke = 'rgba(65, 155, 245, 0.35)';
          cable.style.strokeWidth = '2';
        } else {
          var targetIdx = roleData[modKey] ? roleData[modKey].cableIndex : -1;
          if (idx === targetIdx) {
            cable.style.stroke = '#29b3d8';
            cable.style.strokeWidth = '3.5';
          } else {
            cable.style.stroke = 'rgba(65, 155, 245, 0.12)';
            cable.style.strokeWidth = '1';
          }
        }
      });

      // Open detail modal if requested
      if (openDrawer && roleData[modKey]) {
        showModal(modKey);
      }
    }

    function showModal(modKey) {
      var data = roleData[modKey];
      if (!data) return;

      modalRole.textContent = data.role;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      modalIcon.className = 'ei-modal-icon ' + data.iconClass;
      modalIcon.innerHTML = '<i class="fa-solid ' + data.iconClass.split(' ')[1] + '"></i>';

      modalBen1.innerHTML = '<strong>' + data.ben1.num + '</strong><span>' + data.ben1.lbl + '</span>';
      modalBen2.innerHTML = '<strong>' + data.ben2.num + '</strong><span>' + data.ben2.lbl + '</span>';
      modalBen3.innerHTML = '<strong>' + data.ben3.num + '</strong><span>' + data.ben3.lbl + '</span>';

      modal.classList.add('open');
      stopAutoCycle();
    }

    function hideModal() {
      modal.classList.remove('open');
      if (isPlaying) {
        startAutoCycle();
      }
    }

    if (modalClose) {
      modalClose.addEventListener('click', hideModal);
    }

    // Auto-cycle function
    function startAutoCycle() {
      if (cycleTimer) clearInterval(cycleTimer);
      cycleTimer = setInterval(function () {
        if (!isPlaying || modal.classList.contains('open')) return;
        currentModuleIndex = (currentModuleIndex + 1) % modules.length;
        activateModule(modules[currentModuleIndex], false);
      }, 4800);
    }

    function stopAutoCycle() {
      if (cycleTimer) clearInterval(cycleTimer);
    }

    // Tab button clicks
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mod = btn.getAttribute('data-mod');
        if (mod === 'all') {
          activateModule('all', false);
        } else {
          currentModuleIndex = modules.indexOf(mod);
          activateModule(mod, false);
        }
      });
    });

    // Left column chips clicks
    featChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var mod = chip.getAttribute('data-mod');
        activateModule(mod, true);
      });
    });

    // Character Card clicks
    charCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var mod = card.getAttribute('data-mod');
        activateModule(mod, true);
      });
    });

    // Central Hub click
    if (centralHub) {
      centralHub.addEventListener('click', function () {
        activateModule('all', false);
      });
    }

    // Play/Pause button
    if (playToggle) {
      playToggle.addEventListener('click', function () {
        isPlaying = !isPlaying;
        playToggle.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
        playToggle.setAttribute('title', isPlaying ? 'Pause Animation' : 'Play Animation');
        if (isPlaying) {
          startAutoCycle();
        } else {
          stopAutoCycle();
        }
      });
    }

    // Live Ticker Carousel (if present)
    var currentTickerIdx = 0;
    var tickerCount = tickerItems.length;
    var tickerTimer = null;

    if (tickerCount > 0) {
      function setTicker(idx) {
        tickerItems.forEach(function (item, i) {
          item.classList.toggle('active', i === idx);
        });
        currentTickerIdx = idx;
      }

      function nextTicker() {
        var nextIdx = (currentTickerIdx + 1) % tickerCount;
        setTicker(nextIdx);
      }

      function prevTicker() {
        var pIdx = (currentTickerIdx - 1 + tickerCount) % tickerCount;
        setTicker(pIdx);
      }

      if (tickerNext) tickerNext.addEventListener('click', nextTicker);
      if (tickerPrev) tickerPrev.addEventListener('click', prevTicker);

      tickerTimer = setInterval(nextTicker, 3800);
    }

    // Initial state: starts with Maintenance active matching Image 2
    currentModuleIndex = 1; // 'maintenance'
    activateModule('maintenance', false);
    startAutoCycle();
  });
})();
