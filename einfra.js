(function(){
var d=document,de=d.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
de.classList.add('ei-js');
var src=d.currentScript&&d.currentScript.src,logo=src?new URL('img/logoelnfra.jpg',src.replace(/[^\/]*$/,'')).href:'/img/logoelnfra.jpg';
function ready(f){d.readyState!=='loading'?f():d.addEventListener('DOMContentLoaded',f)}
ready(function(){
 /* intro with the real logo (once per session) */
 try{if(!rm&&!sessionStorage.getItem('ei_intro')){sessionStorage.setItem('ei_intro','1');
  var p=d.createElement('div');p.id='ei-pre';p.innerHTML='<div class="box"><i></i><i></i><i></i><img src="'+logo+'" alt=""><b></b></div>';d.body.appendChild(p);
  setTimeout(function(){p.classList.add('done')},1500);setTimeout(function(){p.remove()},2400)}}catch(e){}
 /* scroll progress + header */
 var bar=d.createElement('div');bar.id='ei-bar';d.body.appendChild(bar);var h=d.querySelector('.header');
 function sc(){var m=de.scrollHeight-innerHeight;bar.style.width=(m>0?scrollY/m*100:0)+'%';if(h)h.classList.toggle('ei-scrolled',scrollY>20)}
 addEventListener('scroll',sc,{passive:true});sc();
 /* reveal with stagger + count-up */
 var sel='.section,.heading,.hero-section .info,.hero-section .image,.industries-benefits-listing li,.statistic-list .item,.blog-card,.customers-reviews .item,.across-all-industries .box,.new-fields_icons--list li,.empower-your-people-slider .item,.mobile-friendly-tools>*';
 var els=[].slice.call(d.querySelectorAll(sel));
 function count(el){var w=d.createTreeWalker(el,NodeFilter.SHOW_TEXT);var n;while(n=w.nextNode()){var m=n.nodeValue.match(/^(\s*)([\d,.]+)(.*)$/s);if(m&&/\d/.test(m[2])){(function(n,m){var t=parseFloat(m[2].replace(/,/g,'')),s=performance.now(),dec=(m[2].split('.')[1]||'').length;
 (function f(now){var k=Math.min(1,(now-s)/1800),e=1-Math.pow(1-k,3);n.nodeValue=m[1]+(t*e).toFixed(dec)+m[3];if(k<1)requestAnimationFrame(f)})(s)})(n,m)}}}
 if(!('IntersectionObserver' in window)||rm)return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');if(e.target.matches('.statistic-list .item'))count(e.target.querySelector('.number')||e.target);io.unobserve(e.target)}})},{threshold:.12});
 els.forEach(function(el,i){var sib=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(sib,6)*.08+'s');el.classList.add('ei-r');io.observe(el)});
 /* connected-network canvas in hero banners */
 d.querySelectorAll('.hero-section,.new-banner-industry,.page-hero,.contacts-info-block').forEach(function(host){
  var c=d.createElement('canvas');c.id='ei-net';host.insertBefore(c,host.firstChild);var x=c.getContext('2d'),W,H,pts=[],mx=-999,my=-999,run=true;
  function rs(){W=c.width=host.offsetWidth;H=c.height=host.offsetHeight;var n=Math.round(W*H/11000);pts=[];for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.85,vy:(Math.random()-.5)*.85,r:Math.random()<.12})}
  rs();addEventListener('resize',rs);
  host.addEventListener('mousemove',function(e){var b=host.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top});host.addEventListener('mouseleave',function(){mx=my=-999});
  new IntersectionObserver(function(e){run=e[0].isIntersecting;if(run)fr()}).observe(host);
  function fr(){if(!run)return;x.clearRect(0,0,W,H);
   for(var i=0;i<pts.length;i++){var a=pts[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
    for(var j=i+1;j<pts.length;j++){var b=pts[j],dx=a.x-b.x,dy=a.y-b.y,q=dx*dx+dy*dy;if(q<24000){x.strokeStyle='rgba(120,180,255,'+(1-q/24000)*.5+')';x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
    var md=(a.x-mx)*(a.x-mx)+(a.y-my)*(a.y-my);if(md<26000){x.strokeStyle='rgba(255,90,82,'+(1-md/26000)*.7+')';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(mx,my);x.stroke()}
    x.fillStyle=a.r?'#ff4a3d':'#7cc2ff';x.beginPath();x.arc(a.x,a.y,a.r?2.6:1.6,0,7);x.fill()}
   requestAnimationFrame(fr)}
  fr()});
 /* 3D tilt + magnetic buttons (desktop only) */
 if(fine){
  d.querySelectorAll('.empower-your-people-slider .wrap,.industries-benefits-listing li').forEach(function(el){
   el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect(),px=(e.clientX-b.left)/b.width-.5,py=(e.clientY-b.top)/b.height-.5;el.style.setProperty('--ry',(px*12)+'deg');el.style.setProperty('--rx',(-py*12)+'deg')});
   el.addEventListener('mouseleave',function(){el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg')})});
  d.querySelectorAll('.button').forEach(function(el){
   el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-b.left-b.width/2)*.18)+'px,'+((e.clientY-b.top-b.height/2)*.28)+'px)'});
   el.addEventListener('mouseleave',function(){el.style.transform=''})})}
});
})();

/* ================= v2: site-wide motion ================= */
(function(){
var d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
function R(f){d.readyState!=='loading'?f():d.addEventListener('DOMContentLoaded',f)}
R(function(){
 /* active nav item */
 var cl=function(p){return p.replace(/index\.html$/,'').replace(/\/$/,'')||'/'},here=cl(location.pathname);
 d.querySelectorAll('.main-nav>li>a').forEach(function(a,i){a.style.setProperty('--n',i);var h=a.getAttribute('href');if(!h||h.charAt(0)==='#')return;try{if(cl(new URL(h,location.href).pathname)===here)a.classList.add('ei-active')}catch(e){}});
 if(rm)return;
 /* headline word-by-word reveal */
 function split(el){var w=d.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[],n,k=0;while(n=w.nextNode())if(n.nodeValue.trim())ns.push(n);
  ns.forEach(function(n){var f=d.createDocumentFragment();n.nodeValue.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(d.createTextNode(t));return}var s=d.createElement('span');s.className='ei-w';s.style.setProperty('--i',k++);s.textContent=t;f.appendChild(s)});n.parentNode.replaceChild(f,n)});el.classList.add('ei-split')}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
 d.querySelectorAll('h1,h2,.h2').forEach(function(h){if(h.closest('.sub-menu,.site-footer,.cookie-popup,.header'))return;split(h);io.observe(h)});
 /* slide-in for body content on every page */
 var i2=0;d.querySelectorAll('.main p,.main h3,.main h4,.main h5,.main li,.main img,.main form,.main table,.main .row-content > *').forEach(function(el){
  if(el.closest('.ei-r,.ei-split,.sub-menu,.header,.site-footer,.cookie-popup,.slick-list,.hero-section'))return;
  el.classList.add('ei-r2');el.style.setProperty('--sx',(i2++%2?'46px':'-46px'));io.observe(el)});
 /* glowing cursor + click ripple */
 if(fine){var g=d.createElement('div');g.id='ei-glow';d.body.appendChild(g);var tx=-999,ty=-999,cx=0,cy=0;
  addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY},{passive:true});
  (function f(){cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;g.style.transform='translate('+(cx-200)+'px,'+(cy-200)+'px)';requestAnimationFrame(f)})();
  d.addEventListener('click',function(e){var r=d.createElement('i');r.className='ei-click';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';d.body.appendChild(r);setTimeout(function(){r.remove()},750)});
  d.querySelectorAll('.blog-card,.customers-reviews blockquote,.new-fields_icons--list li').forEach(function(el){
   el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect(),px=(e.clientX-b.left)/b.width-.5,py=(e.clientY-b.top)/b.height-.5;el.style.setProperty('--ry',(px*9)+'deg');el.style.setProperty('--rx',(-py*9)+'deg')});
   el.addEventListener('mouseleave',function(){el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg')})})}
 /* scroll parallax on images */
 var px=[].slice.call(d.querySelectorAll('.mobile-friendly-tools img,.hero-industry-img img,.photo-holder img,.across-all-industries .photo,.content-right img,.content-left img'));
 if(px.length){var tk=false;var par=function(){tk=false;var h=innerHeight;px.forEach(function(el){var b=el.getBoundingClientRect();if(b.bottom<-50||b.top>h+50)return;el.style.setProperty('--py',(((b.top+b.height/2)-h/2)/h*-40).toFixed(1)+'px')})};
  addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(par)}},{passive:true});par()}
 /* gentle auto-drift on the card sliders (pauses on hover/touch) */
 setTimeout(function(){d.querySelectorAll('.customers-reviews-slider .slick-list').forEach(function(l){
  var dir=1,pause=false;['mouseenter','touchstart','focusin'].forEach(function(t){l.addEventListener(t,function(){pause=true},{passive:true})});['mouseleave','touchend'].forEach(function(t){l.addEventListener(t,function(){pause=false},{passive:true})});
  setInterval(function(){if(pause)return;l.scrollLeft+=dir;if(l.scrollLeft+l.clientWidth>=l.scrollWidth-2)dir=-1;else if(l.scrollLeft<=0)dir=1},22)})},1400);
 /* page transition curtain on internal links */
 d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute('download'))return;
  var h=a.getAttribute('href');if(!h||/^(#|mailto:|tel:|javascript:)/i.test(h))return;var u;try{u=new URL(a.href)}catch(x){return}
  if(u.origin!==location.origin||(u.pathname===location.pathname&&u.search===location.search))return;
  e.preventDefault();d.body.classList.add('ei-leave');setTimeout(function(){location.href=a.href},330)});
 addEventListener('pageshow',function(e){if(e.persisted)d.body.classList.remove('ei-leave')});
});
})();
/* slider arrows: scroll the card row (slick's transform is disabled by the theme) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.slick-arrow');if(!b)return;var s=b.closest('.empower-your-people-slider,.customers-reviews-slider'),l=s&&s.querySelector('.slick-list');if(!l)return;
 e.preventDefault();e.stopImmediatePropagation();var sl=l.querySelector('.slick-slide'),w=(sl?sl.getBoundingClientRect().width:300)+22;l.scrollBy({left:b.classList.contains('slick-next')?w:-w,behavior:'smooth'})},true);

/* ================= v3: richer motion + landing/about/blog/contact fixes ================= */
(function(){
var d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
function R(f){d.readyState!=='loading'?f():d.addEventListener('DOMContentLoaded',f)}
function $(s,c){return [].slice.call((c||d).querySelectorAll(s))}
function el(t,c,h){var e=d.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e}
function rnd(a,b){return a+Math.random()*(b-a)}
R(function(){
 /* 0. real backgrounds for lazy [data-bg] blocks (office photos etc.) so they are never plain white */
 $('[data-bg]').forEach(function(n){var u=n.getAttribute('data-bg');if(u&&!n.style.backgroundImage)n.style.backgroundImage='url("'+u+'")'});

 /* generic scroll pop-in */
 var pio=('IntersectionObserver' in window&&!rm)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');pio.unobserve(e.target)}})},{threshold:.15}):null;
 function pop(list){if(!pio)return;list.forEach(function(n,i){n.classList.add('ei-pop');n.style.setProperty('--pd',(i%6)*.09+'s');pio.observe(n)})}

 /* 1. living background: orbs, rising particles, light beams in every hero, floating shapes behind the whole site */
 if(!rm){
  $('.hero-section,.new-banner-industry,.page-hero,.contacts-info-block').forEach(function(host){
   var o=el('div','ei-orbs'),h='<span class="o o1"></span><span class="o o2"></span><span class="o o3"></span><span class="beam"></span><span class="beam b2"></span>',i;
   for(i=0;i<18;i++)h+='<span class="p" style="--x:'+rnd(2,98).toFixed(1)+'%;--s:'+rnd(3,9).toFixed(1)+'px;--t:'+rnd(7,16).toFixed(1)+'s;--dl:-'+rnd(0,16).toFixed(1)+'s;--dx:'+rnd(-90,90).toFixed(0)+'px"></span>';
   o.innerHTML=h;host.insertBefore(o,host.firstChild)});
  var sh=el('div');sh.id='ei-bgshapes';var hh='',j;
  for(j=0;j<12;j++)hh+='<span class="s'+(j%4)+'" style="left:'+rnd(0,96).toFixed(0)+'%;top:'+rnd(0,92).toFixed(0)+'%;--sz:'+rnd(14,64).toFixed(0)+'px;--t:'+rnd(16,34).toFixed(0)+'s;--dl:-'+rnd(0,30).toFixed(0)+'s"></span>';
  sh.innerHTML=hh;d.body.appendChild(sh);
 }

 /* 2. IWMS intro: shining heading + coloured keywords */
 var hp=$('.ei-iwms .heading p')[0];
 if(hp){var html=hp.innerHTML;
  ['facilities maintenance','space planning','corporate real estate','capital projects','field service management','sustainability','connected OT assets safe and secure'].forEach(function(k,i){html=html.replace(k,'<mark class="ei-key k'+(i%3)+'" style="--k:'+i+'">'+k+'</mark>')});
  html=html.replace(/^\s*One solution/i,'<span class="ei-shine">One solution</span>');hp.innerHTML=html}

 /* 3. IWMS photo slider: real working arrows, clickable/draggable progress bar, drag-to-scroll, gentle autoplay */
 var tries=0,tm=setInterval(function(){var sl=$('.empower-your-people-slider')[0];if(!sl){clearInterval(tm);return}
  if(sl.querySelector('.slick-list')||++tries>24){clearInterval(tm);build(sl)}},150);
 function build(sl){
  var sc=sl.querySelector('.slick-list')||sl,ctl=el('div','ei-slider-ctl'),svg='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="PATH"/></svg>',
   prev=el('button','ei-nav prev',svg.replace('PATH','M15 5l-7 7 7 7')),next=el('button','ei-nav next',svg.replace('PATH','M9 5l7 7-7 7')),tr=el('div','ei-track','<i class="ei-thumb"></i>'),th=tr.firstChild;
  prev.type=next.type='button';prev.setAttribute('aria-label','Previous');next.setAttribute('aria-label','Next');
  ctl.appendChild(prev);ctl.appendChild(tr);ctl.appendChild(next);sl.parentNode.insertBefore(ctl,sl.nextSibling);sc.classList.add('ei-scroller');
  function step(){var s=sc.querySelector('.slick-slide')||sc.querySelector('.item');return (s?s.getBoundingClientRect().width:300)+22}
  prev.addEventListener('click',function(){sc.scrollBy({left:-step(),behavior:'smooth'})});
  next.addEventListener('click',function(){sc.scrollBy({left:step(),behavior:'smooth'})});
  function upd(){var m=sc.scrollWidth-sc.clientWidth,w=Math.max(16,sc.clientWidth/Math.max(1,sc.scrollWidth)*100);th.style.width=w+'%';th.style.left=(m>0?sc.scrollLeft/m*(100-w):0)+'%';prev.disabled=sc.scrollLeft<4;next.disabled=sc.scrollLeft>m-4}
  sc.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();setTimeout(upd,500);setTimeout(upd,1500);
  function seek(e){var b=tr.getBoundingClientRect(),k=Math.min(1,Math.max(0,(e.clientX-b.left)/b.width));sc.style.scrollBehavior='auto';sc.scrollLeft=k*(sc.scrollWidth-sc.clientWidth)}
  tr.addEventListener('pointerdown',function(e){e.preventDefault();seek(e);var mv=function(ev){seek(ev)},up=function(){removeEventListener('pointermove',mv);removeEventListener('pointerup',up);sc.style.scrollBehavior=''};addEventListener('pointermove',mv);addEventListener('pointerup',up)});
  var down=false,sx=0,s0=0,moved=0;
  sc.addEventListener('pointerdown',function(e){if(e.pointerType==='touch'||e.button)return;down=true;moved=0;sx=e.clientX;s0=sc.scrollLeft});
  addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));if(moved>5){sc.classList.add('dragging');sc.scrollLeft=s0-dx}});
  addEventListener('pointerup',function(){if(!down)return;down=false;setTimeout(function(){sc.classList.remove('dragging')},0)});
  sc.addEventListener('click',function(e){if(moved>5){e.preventDefault();e.stopPropagation();moved=0}},true);
  if(!rm){var paused=false,vis=true;['mouseenter','touchstart','focusin'].forEach(function(t){sl.addEventListener(t,function(){paused=true},{passive:true});ctl.addEventListener(t,function(){paused=true},{passive:true})});
   ['mouseleave','touchend','focusout'].forEach(function(t){sl.addEventListener(t,function(){paused=false},{passive:true});ctl.addEventListener(t,function(){paused=false},{passive:true})});
   if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(sl);
   setInterval(function(){if(paused||!vis||down)return;var m=sc.scrollWidth-sc.clientWidth;if(sc.scrollLeft>=m-4)sc.scrollTo({left:0,behavior:'smooth'});else sc.scrollBy({left:step(),behavior:'smooth'})},3600)}
 }

 /* 4. industry cards (merged under the photos): click flips the icon */
 $('.industries-benefits-listing li').forEach(function(li){
  li.addEventListener('click',function(){var ic=li.querySelector('.icon');if(!ic)return;ic.classList.remove('ei-flipanim');void ic.offsetWidth;ic.classList.add('ei-flipanim');li.classList.toggle('on')})});

 /* 5. About page: animated, flippable worldwide-office cards + investors */
 var offs=$('.our-offices .offices-list .item');
 offs.forEach(function(it,i){
  it.style.setProperty('--i',i);
  var h3=it.querySelector('h3'),ctry=h3&&h3.lastChild?(h3.lastChild.textContent||'').trim():'',ico=it.querySelector('.ico-holder img'),
   front=el('div','ei-face ei-front'),back=el('div','ei-face ei-back'),fl=el('div','ei-flip');
  while(it.firstChild)front.appendChild(it.firstChild);
  if(ico){var f=el('span','ei-flag'),im=el('img');im.src=ico.getAttribute('src');im.alt='';f.appendChild(im);back.appendChild(f)}
  var t4=el('h4');t4.textContent=ctry;back.appendChild(t4);var p1=el('p');p1.textContent='EInfratech Systems India';back.appendChild(p1);var sm=el('small');sm.textContent='Tap to flip back';back.appendChild(sm);
  fl.appendChild(front);fl.appendChild(back);it.appendChild(fl);it.setAttribute('role','button');it.tabIndex=0;it.setAttribute('aria-label','Flip card: '+ctry);
  function go(){it.classList.toggle('flipped');if(!rm&&it.animate){var dx=rnd(-70,70),dy=rnd(-40,30),r=rnd(-12,12);it.animate([{transform:'translate(0,0) rotate(0deg)'},{transform:'translate('+dx+'px,'+dy+'px) rotate('+r+'deg) scale(1.1)',offset:.4},{transform:'translate(0,0) rotate(0deg)'}],{duration:760,easing:'cubic-bezier(.2,.9,.3,1.2)'})}}
  it.addEventListener('click',go);it.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
  if(fine){it.addEventListener('mousemove',function(e){var b=it.getBoundingClientRect();it.style.setProperty('--ry',((e.clientX-b.left)/b.width-.5)*14+'deg');it.style.setProperty('--rx',-((e.clientY-b.top)/b.height-.5)*14+'deg')});it.addEventListener('mouseleave',function(){it.style.setProperty('--rx','0deg');it.style.setProperty('--ry','0deg')})}
 });
 pop(offs);pop($('.our-investors .item'));
 $('.results-list .item').forEach(function(n,i){n.style.setProperty('--n',i)});

 /* 6. Blog: art headers, numbering, platform filter chips, cursor glow */
 var cards=$('.blog-card');
 if(cards.length){
  var icons=['fa-building-circle-check','fa-diagram-project','fa-boxes-stacked','fa-screwdriver-wrench','fa-hospital','fa-city','fa-robot','fa-clipboard-check','fa-bullhorn'],
   grads=['linear-gradient(135deg,#001a4d,#0b4fb3 60%,#38a0ff)','linear-gradient(135deg,#e8141c,#ff6a3d 70%,#ffb347)','linear-gradient(135deg,#0b4fb3,#38a0ff 60%,#7ce8ff)','linear-gradient(135deg,#2a0a4d,#6a34d6 60%,#ff5a9e)','linear-gradient(135deg,#00695c,#1bbf9a 60%,#a7ffe0)','linear-gradient(135deg,#102a6b,#e8141c)'];
  cards.forEach(function(c,i){
   var tg=c.querySelector('.blog-tag');c.setAttribute('data-src',tg?tg.textContent.trim():'');
   var art=el('div','ei-art','<i class="fa-solid '+icons[i%icons.length]+' ei-ico"></i><span class="ei-n">'+(i<9?'0':'')+(i+1)+'</span><b class="d d1"></b><b class="d d2"></b><b class="d d3"></b><b class="d d4"></b>');
   art.style.setProperty('--g',grads[i%grads.length]);c.insertBefore(art,c.firstChild);c.style.setProperty('--bi',i);
   c.addEventListener('mousemove',function(e){var b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px');c.style.setProperty('--my',(e.clientY-b.top)+'px')})});
  var tags=[];cards.forEach(function(c){var t=c.getAttribute('data-src');if(t&&tags.indexOf(t)<0)tags.push(t)});
  var grid=$('.blog-grid')[0];
  if(grid&&tags.length>1){var bar=el('div','ei-chips','<button type="button" class="on" data-f="*">All posts</button>'+tags.map(function(t){return '<button type="button" data-f="'+t+'">'+t+'</button>'}).join(''));
   grid.parentNode.insertBefore(bar,grid);
   bar.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$('button',bar).forEach(function(x){x.classList.remove('on')});b.classList.add('on');var f=b.getAttribute('data-f');
    cards.forEach(function(c){var show=f==='*'||c.getAttribute('data-src')===f;
     if(show){c.style.display='';void c.offsetWidth;c.classList.remove('ei-out')}else{c.classList.add('ei-out');setTimeout(function(){if(c.classList.contains('ei-out'))c.style.display='none'},380)}})})}
  var bs=$('.blog-section')[0];if(bs&&!rm){var bo=el('div','ei-orbs light','<span class="o o1"></span><span class="o o2"></span><span class="o o3"></span>');bs.insertBefore(bo,bs.firstChild)}
 }

 /* 7. Contact: big ringing phone + headset art, staggered fields */
 var blocks=$('.contact-details .block');
 function art(kind){var w=el('div','ei-phone '+kind,'<span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><div class="ei-handset"><i class="fa-solid '+(kind==='alt'?'fa-headset':'fa-phone')+'"></i></div><span class="ei-bub b1"><i class="fa-solid '+(kind==='alt'?'fa-comment-dots':'fa-signal')+'"></i></span><span class="ei-bub b2"><i class="fa-solid '+(kind==='alt'?'fa-life-ring':'fa-wave-square')+'"></i></span><span class="ei-bub b3"><i class="fa-solid fa-envelope"></i></span>');
  w.addEventListener('click',function(){w.classList.remove('on');void w.offsetWidth;w.classList.add('on');if(navigator.vibrate)try{navigator.vibrate([60,40,60,40,90])}catch(e){}});return w}
 if(blocks[0]){blocks[0].classList.add('ei-call','ei-has-art');blocks[0].insertBefore(art('call'),blocks[0].firstChild)}
 if(blocks[1]){blocks[1].classList.add('ei-call','ei-has-art');blocks[1].insertBefore(art('alt'),blocks[1].firstChild)}
 pop($('.contacts-form-holder .note,.contacts-form-holder .colwidth,.contacts-form-holder .col-lg-12'));
 pop(blocks);

 /* 8. click sparks anywhere */
 if(!rm)d.addEventListener('click',function(e){var x=e.clientX,y=e.clientY;if(!x&&!y)return;var cols=['#e8141c','#38a0ff','#ffb300','#0b4fb3'],i;
  for(i=0;i<10;i++){(function(i){var s=d.createElement('i');s.className='ei-spark';s.style.left=x+'px';s.style.top=y+'px';s.style.background=cols[i%4];d.body.appendChild(s);
   if(!s.animate){s.remove();return}var a=i/10*6.283+rnd(-.3,.3),dist=rnd(36,92),an=s.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(calc(-50% + '+(Math.cos(a)*dist).toFixed(1)+'px),calc(-50% + '+(Math.sin(a)*dist).toFixed(1)+'px)) scale(.15)',opacity:0}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)'});an.onfinish=function(){s.remove()}})(i)}},true);
});
})();

/* ================= v4: wama-style motion (card fan, framed images, scroll-faded headlines, tiles) ================= */
(function(){
var d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
function ready(f){d.readyState!=='loading'?f():d.addEventListener('DOMContentLoaded',f)}
ready(function(){
 if(rm)return;
 var vw=function(){return innerWidth},vh=function(){return innerHeight};
 /* 1. cards on an arc */
 var fanSel='.statistic-list .item,.empower-your-people-slider .item,.across-all-industries .box,.customers-reviews .item,.ei-flip,.industries-benefits-listing li,.blog-card,.new-fields_icons--list li';
 var fans=[].slice.call(d.querySelectorAll(fanSel)).filter(function(e){return !e.closest('.header,.site-footer,.sub-menu,.cookie-popup')});
 fans.forEach(function(e){e.classList.add('ei-fan');if(!e.matches('.ei-flip,.blog-card,.empower-your-people-slider .item'))e.classList.add('ei-dk');if(!e.matches('.blog-card'))e.classList.add('ei-arc')});
 /* 2. framed images */
 var imgSel='main img,.img-holder,.photo,.image-holder,.photo-block';
 var imgs=[].slice.call(d.querySelectorAll(imgSel)).filter(function(e){
  if(e.closest('.header,.site-footer,.sub-menu,.cookie-popup,.ei-fan,.logo,.partners-listing,.hero-section,.slick-arrow,.ei-art'))return false;
  if(e.tagName==='IMG'&&(e.closest('.photo,.img-holder,.image-holder,.photo-block')))return false;
  var r=e.getBoundingClientRect();return r.width>=220&&r.height>=120});
 imgs.forEach(function(e){e.classList.add('ei-img')});
 /* 3. headlines: faint -> solid with scroll */
 var heads=[].slice.call(d.querySelectorAll('main h2,.main h2')).filter(function(h){return !h.closest('.hero-section,.page-hero,.ei-iwms,.header,.site-footer,.cookie-popup')});
 function prepHeads(){heads.forEach(function(h){var ws=h.querySelectorAll('.ei-w');if(!ws.length||h.classList.contains('ei-dim'))return;
  h.style.setProperty('--hb',getComputedStyle(h).color);h.style.setProperty('--n',ws.length);h.style.setProperty('--hp',0);h.classList.add('ei-dim')})}
 setTimeout(prepHeads,300);setTimeout(prepHeads,1200);
 /* 4. partner logos as black tiles */
 var pl=d.querySelector('.partners-listing ul');
 if(pl){pl.classList.add('ei-tiles');[].forEach.call(pl.children,function(li){li.classList.add('ei-tile')})}
 /* frame loop */
 var ticking=false;
 function frame(){ticking=false;var W=vw(),H=vh();
  fans.forEach(function(e){var r=e.getBoundingClientRect();if(r.bottom<-200||r.top>H+200||r.width===0)return;
   var dx=((r.left+r.width/2)-W/2)/(W/2);dx=Math.max(-1.2,Math.min(1.2,dx));
   var cy=r.top+r.height/2,p=(cy-H*.5)/(H*.5);p=Math.max(0,Math.min(1,p));
   /* the arc is strongest while a card is low on the screen and flat once it reaches the middle */
   e.style.setProperty('--fx',dx.toFixed(3));e.style.setProperty('--fa',Math.abs(dx).toFixed(3));e.style.setProperty('--fp',(e.classList.contains('ei-arc')?(.55+.45*p):(.25+.75*p)).toFixed(3))});
  imgs.forEach(function(e){var r=e.getBoundingClientRect();if(r.bottom<-100||r.top>H+100)return;
   var p=1-Math.max(0,Math.min(1,(r.top-H*.35)/(H*.65)));e.style.setProperty('--ip',p.toFixed(3))});
  heads.forEach(function(h){if(!h.classList.contains('ei-dim'))return;var r=h.getBoundingClientRect();if(r.bottom<-50||r.top>H)return;
   var p=1-Math.max(0,Math.min(1,(r.top-H*.3)/(H*.6)));h.style.setProperty('--hp',p.toFixed(3))})}
 function req(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
 /* slider rows scroll sideways: re-measure the arc while they move */
 d.querySelectorAll('.slick-list,.slick-track,.empower-your-people-slider').forEach(function(s){s.addEventListener('scroll',req,{passive:true})});
 setInterval(req,400);req();
 /* 5. pointer tilt on cards */
 if(fine){fans.forEach(function(e){
  e.addEventListener('pointermove',function(ev){var r=e.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
   e.style.setProperty('--ty',(x*9).toFixed(2)+'deg');e.style.setProperty('--tx',(-y*7).toFixed(2)+'deg')});
  e.addEventListener('pointerleave',function(){e.style.setProperty('--ty','0deg');e.style.setProperty('--tx','0deg')})})}
});
})();

/* ================= v5: slider commas removal + stats tilt fix ================= */
(function(){
function R(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f)}
R(function(){
 setTimeout(function(){
  [].slice.call(document.querySelectorAll('.empower-your-people-slider h4,.empower-your-people-slider .h6')).forEach(function(h){
   var w=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);var n;
   while(n=w.nextNode()){if(/,\s*/.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/,\s*/,'');}
   [].slice.call(h.querySelectorAll('a')).forEach(function(a){
    a.childNodes.forEach(function(nd){if(nd.nodeType===3&&/,\s*/.test(nd.nodeValue))nd.nodeValue=nd.nodeValue.replace(/,\s*/,'')});
   });
  });
 },400);
 [].slice.call(document.querySelectorAll('.our-achievements .statistic-list .item')).forEach(function(el){
  el.addEventListener('mouseenter',function(){
   el.style.setProperty('--fx','0');el.style.setProperty('--fa','0');el.style.setProperty('--fp','0');
   el.style.setProperty('--ty','0deg');el.style.setProperty('--tx','0deg');
  });
 });
});
})();


/* Scroll-reveal for Customer Success + Professional Services (testimonials excluded) */
(function () {
  // make sure testimonial cards are never hidden
  document.querySelectorAll('.customers-reviews-slider .item').forEach(function (el) {
    el.classList.remove('ei-reveal');
    el.style.opacity = '1';
  });
  var sel = '.benefits-list.three-columns ul li, .our-achievements.one-row, ' +
            '.customer-experience-list .item, ' +
            '.custom-info-box .pdf-wrap, .customer-experience-list .heading';
  var els = document.querySelectorAll(sel);
  if (!els.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('ei-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el, i) {
    el.classList.add('ei-reveal');
    el.style.transitionDelay = ((i % 3) * 0.12) + 's';
    io.observe(el);
  });
})();