(function(){

  /* Track tab switching */
  document.querySelectorAll('.c-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const track = tab.dataset.track;
      document.querySelectorAll('.c-tab').forEach(t => { t.classList.remove('on'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('on'); tab.setAttribute('aria-selected','true');
      document.querySelectorAll('.c-panel').forEach(p => p.classList.remove('on'));
      const panel = document.getElementById('panel-' + track);
      if(panel){ panel.classList.add('on'); const first = panel.querySelector('.c-nav-btn'); if(first) first.click(); }
    });
  });

  /* Module switching */
  document.querySelectorAll('.c-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modId = btn.dataset.mod;
      const panel = btn.closest('.c-panel');
      if(!panel) return;
      panel.querySelectorAll('.c-nav-btn').forEach(n => n.classList.remove('on'));
      btn.classList.add('on');
      panel.querySelectorAll('.c-mod').forEach(m => m.classList.remove('on'));
      const mod = document.getElementById(modId);
      if(mod) mod.classList.add('on');
    });
  });

  /* Brochure CTA — inject at bottom of every module panel */
  document.querySelectorAll('.c-mod').forEach(mod => {
    const cta = document.createElement('div');
    cta.className = 'c-brochure-cta';
    cta.innerHTML =
      '<div class="c-brochure-cta-text">' +
        '<h4 class="c-brochure-cta-h">Want the full curriculum deep-dive?</h4>' +
        '<p class="c-brochure-cta-p">Get the complete brochure with every session, project, and AI integration detail across all tracks.</p>' +
      '</div>' +
      '<a class="c-brochure-cta-btn" href="#">' +
        '<svg viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        'Download Brochure' +
      '</a>';
    mod.appendChild(cta);
  });

  /* USP panel switching */
  document.querySelectorAll('.usp-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.usp;
      document.querySelectorAll('.usp-item').forEach(i => i.classList.remove('on'));
      item.classList.add('on');
      document.querySelectorAll('.usp-panel').forEach(p => p.classList.remove('on'));
      const panel = document.querySelector('[data-usp-panel="'+id+'"]');
      if(panel) panel.classList.add('on');
    });
  });

  /* Stories carousel arrows */
  (function(){
    const track = document.getElementById('storiesTrack');
    const prev = document.getElementById('storiesPrev');
    const next = document.getElementById('storiesNext');
    if(!track || !prev || !next) return;
    prev.addEventListener('click', () => track.scrollBy({left:-360,behavior:'smooth'}));
    next.addEventListener('click', () => track.scrollBy({left:360,behavior:'smooth'}));
  })();

  /* Portfolio carousel arrows */
  (function(){
    const grid = document.querySelector('.portfolio-grid');
    const prev = document.getElementById('portfolioPrev');
    const next = document.getElementById('portfolioNext');
    if(!grid || !prev || !next) return;
    const scrollAmt = 360;
    prev.addEventListener('click', () => grid.scrollBy({left:-scrollAmt,behavior:'smooth'}));
    next.addEventListener('click', () => grid.scrollBy({left:scrollAmt,behavior:'smooth'}));
  })();

  /* Shift video poster → play */
  const shiftPoster = document.getElementById('shiftVideoPoster');
  if(shiftPoster){
    shiftPoster.addEventListener('click', function(){
      const iframe = this.parentElement.querySelector('iframe');
      if(iframe && iframe.dataset.src){
        iframe.src = iframe.dataset.src + (iframe.dataset.src.includes('?') ? '&' : '?') + 'autoplay=1';
      }
      this.style.opacity = '0';
      this.style.pointerEvents = 'none';
      setTimeout(() => this.style.display = 'none', 400);
    });
    shiftPoster.querySelector('div')?.addEventListener('mouseenter', function(){
      this.style.background = 'rgba(255,255,255,.18)';
      this.style.borderColor = 'rgba(255,255,255,.5)';
    });
    shiftPoster.querySelector('div')?.addEventListener('mouseleave', function(){
      this.style.background = 'rgba(255,255,255,.1)';
      this.style.borderColor = 'rgba(255,255,255,.25)';
    });
  }

  /* Sub-module expand/collapse */
  document.querySelectorAll('.c-submod-header').forEach(header => {
    header.addEventListener('click', () => {
      const submod = header.closest('.c-submod');
      if(submod) submod.classList.toggle('open');
    });
    header.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        header.click();
      }
    });
  });

  /* Curriculum preview tiles */
  document.querySelectorAll('.c-mod').forEach(mod => {
    if(mod.querySelector('.c-mod-media')) return;
    const type = mod.querySelector('.c-mod-type')?.textContent || '';
    const title = mod.querySelector('.c-mod-title')?.textContent || 'Module walkthrough';
    const isSpec = /specialisation/i.test(type);
    const media = document.createElement('div');
    media.className = 'c-mod-media';
    media.innerHTML =
      '<div class="c-mod-video" aria-hidden="true">' +
        '<div class="c-mod-video-top">' +
          '<span class="c-mod-video-badge">' + (isSpec ? 'Specialisation preview' : 'Core preview') + '</span>' +
          '<span class="c-mod-video-play">▶</span>' +
        '</div>' +
        '<div class="c-mod-video-body">' +
          '<strong class="c-mod-video-title">' + title + '</strong>' +
          '<span class="c-mod-video-copy">Quick walkthrough and concept breakdown inside the learning flow.</span>' +
        '</div>' +
      '</div>';
    const tags = mod.querySelector('.c-tags');
    const stats = mod.querySelector('.c-mod-stats');
    if(tags){
      tags.insertAdjacentElement('beforebegin', media);
    } else if(stats){
      stats.insertAdjacentElement('afterend', media);
    } else {
      const copy = mod.querySelector('.c-mod-copy');
      if(copy){ copy.insertAdjacentElement('afterend', media); }
      else { mod.appendChild(media); }
    }
  });

  /* Blog carousel */
  const blog = document.querySelector('[data-blog-carousel]');
  if(blog){
    const track = blog.querySelector('[data-blog-track]');
    const cards = Array.from(blog.querySelectorAll('.blog-card'));
    const dotsWrap = blog.querySelector('[data-blog-dots]');
    const prev = blog.querySelector('[data-blog-prev]');
    const next = blog.querySelector('[data-blog-next]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileMq = window.matchMedia('(max-width: 900px)');
    let currentPage = 0;
    let pageCount = 1;
    let cardsPerPage = 2;
    let scrollTimer = null;

    const updateBlogDots = () => {
      if(!dotsWrap) return;
      Array.from(dotsWrap.children).forEach((dot, index) => {
        dot.classList.toggle('on', index === currentPage);
      });
    };

    const goToBlogPage = (page) => {
      if(!track || !cards.length) return;
      currentPage = (page + pageCount) % pageCount;
      const targetIndex = currentPage * cardsPerPage;
      const target = cards[targetIndex];
      if(target){
        track.scrollTo({
          left: target.offsetLeft,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      }
      updateBlogDots();
    };

    const rebuildBlogDots = () => {
      if(!dotsWrap) return;
      dotsWrap.innerHTML = '';
      Array.from({ length: pageCount }).forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'blog-dot' + (index === currentPage ? ' on' : '');
        dot.setAttribute('aria-label', 'Show blog slide ' + (index + 1));
        dot.addEventListener('click', () => goToBlogPage(index));
        dotsWrap.appendChild(dot);
      });
    };

    const syncBlogPageFromScroll = () => {
      if(!track || !cards.length) return;
      const gap = parseFloat(window.getComputedStyle(track).gap || '0');
      const stride = cards[0].getBoundingClientRect().width + gap;
      if(!stride) return;
      const index = Math.round(track.scrollLeft / stride);
      currentPage = Math.min(pageCount - 1, Math.max(0, Math.round(index / cardsPerPage)));
      updateBlogDots();
    };

    const measureBlog = () => {
      cardsPerPage = mobileMq.matches ? 1 : 2;
      pageCount = Math.max(1, Math.ceil(cards.length / cardsPerPage));
      currentPage = Math.min(currentPage, pageCount - 1);
      rebuildBlogDots();
      goToBlogPage(currentPage);
    };

    prev?.addEventListener('click', () => goToBlogPage(currentPage - 1));
    next?.addEventListener('click', () => goToBlogPage(currentPage + 1));
    track?.addEventListener('scroll', () => {
      if(scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(syncBlogPageFromScroll, 80);
    });

    if(typeof mobileMq.addEventListener === 'function'){
      mobileMq.addEventListener('change', measureBlog);
    } else if(typeof mobileMq.addListener === 'function'){
      mobileMq.addListener(measureBlog);
    }
    window.addEventListener('resize', measureBlog);

    measureBlog();
  }

  /* Community carousel */
  const community = document.querySelector('[data-community-carousel]');
  if(community){
    const track = community.querySelector('[data-community-track]');
    const slides = Array.from(track ? track.children : []);
    const dots = Array.from(community.querySelectorAll('[data-community-dot]'));
    const prev = community.querySelector('[data-community-prev]');
    const next = community.querySelector('[data-community-next]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let timer = null;

    const renderCommunity = (index) => {
      if(!track || !slides.length) return;
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((dot, i) => dot.classList.toggle('on', i === current));
    };

    const stopCommunity = () => {
      if(timer){
        clearInterval(timer);
        timer = null;
      }
    };

    const startCommunity = () => {
      if(reduceMotion || slides.length < 2) return;
      stopCommunity();
      timer = setInterval(() => renderCommunity(current + 1), 4600);
    };

    prev?.addEventListener('click', () => { renderCommunity(current - 1); startCommunity(); });
    next?.addEventListener('click', () => { renderCommunity(current + 1); startCommunity(); });
    dots.forEach((dot, index) => dot.addEventListener('click', () => { renderCommunity(index); startCommunity(); }));

    community.addEventListener('mouseenter', stopCommunity);
    community.addEventListener('mouseleave', startCommunity);
    community.addEventListener('focusin', stopCommunity);
    community.addEventListener('focusout', startCommunity);

    renderCommunity(0);
    startCommunity();
  }

  /* Reality carousel */
  (function(){
    const track = document.getElementById('realityTrack');
    if(!track) return;
    const slides = track.querySelectorAll('.reality-slide');
    const dots = document.querySelectorAll('.reality-carousel-dot');
    let current = 0;
    function goTo(idx){
      current = (idx + slides.length) % slides.length;
      track.scrollTo({ left: track.clientWidth * current, behavior:'smooth' });
      dots.forEach((d,i) => d.classList.toggle('on', i === current));
    }
    document.getElementById('realityPrev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('realityNext')?.addEventListener('click', () => goTo(current + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));
    // Auto-advance
    let timer = setInterval(() => goTo(current + 1), 6000);
    track.closest('.reality-carousel')?.addEventListener('mouseenter', () => clearInterval(timer));
    track.closest('.reality-carousel')?.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(current + 1), 6000); });
    // Sync dots on manual scroll
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d,i) => d.classList.toggle('on', i === idx));
      current = idx;
    }, { passive:true });
  })();

  /* Scroll reveal */
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold:0.07, rootMargin:'0px 0px -30px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
  }

})();