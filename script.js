(() => {
  'use strict';
  const {slides,pictures}=window.IndusContent;
  const deck=window.IndusDeck.createDeckState(slides);
  const get=id=>document.getElementById(id);
  const ui={title:get('slide-title'),chapter:get('chapter-label'),heading:get('point-heading'),card:get('information-card'),window:get('information-window'),dots:get('step-dots'),pointStatus:get('point-status'),copyNote:get('copy-note'),photo:get('slide-photo'),imagePanel:get('image-panel'),caption:get('image-caption'),credit:get('image-credit'),imageIndex:get('image-index'),current:get('slide-current'),total:get('slide-total'),back:get('back-button'),next:get('next-button'),nextLabel:get('next-label'),navigation:get('slide-navigation'),progress:get('overall-progress'),progressFill:get('overall-progress-fill'),status:get('presentation-status'),overview:get('overview-dialog'),overviewGrid:get('overview-grid'),photoDialog:get('photo-dialog'),full:get('fullscreen-button')};
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const pad=value=>String(value).padStart(2,'0');
  let renderedSlide=-1;
  let renderedStep=-1;
  let toastTimer;
  const highlights=['1,120,000 to 1,165,000','Pakistan, India, China, and Afghanistan','237 to 300 million','1960','6 rivers','nearly 300 million','climate change','20th century','abeyance','stronger cooperation'];
  function markedText(text) {
    let result=escape(text);
    for (const phrase of highlights) {
      const quoted=escape(phrase).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      result=result.replace(new RegExp(quoted,'gi'),match=>`<mark>${match}</mark>`);
    }
    return result;
  }
  function blockMarkup(block) {
    if (block.kind==='references') return '<ul class="reference-list">'+block.links.map(link=>`<li><a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.label)} ↗</a><span class="reference-detail">${escape(link.detail)}</span></li>`).join('')+'</ul>';
    if (block.kind==='credits') return '<ul class="credits-list">'+block.pictures.map((picture,index)=>`<li><span class="credit-number">${pad(index+1)}</span><div><a href="${escape(picture.source)}" target="_blank" rel="noopener noreferrer">${escape(picture.author)}</a><span class="credit-license">${escape(picture.caption)} · <a href="${escape(picture.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escape(picture.license)}</a></span></div></li>`).join('')+'</ul><p class="credit-note">Photographs resized and compressed for this presentation; display crops vary by screen. Creative Commons photographs retain their indicated licenses.</p>';
    return `<p>${markedText(block.text)}</p>`;
  }
  function animate(element,name) {
    element.classList.remove(name);
    void element.offsetWidth;
    element.classList.add(name);
  }
  function toast(text) {
    clearTimeout(toastTimer);
    get('toast').textContent=text;
    get('toast').classList.add('is-visible');
    toastTimer=setTimeout(()=>get('toast').classList.remove('is-visible'),3300);
  }
  function updateNavigation(snapshot) {
    for (const button of ui.navigation.querySelectorAll('button')) {
      if (Number(button.dataset.slide)===snapshot.index) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    }
    for (const button of ui.overviewGrid.querySelectorAll('button')) {
      if (Number(button.dataset.slide)===snapshot.index) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    }
  }
  function render(direction='forward') {
    const current=deck.snapshot();
    const slide=slides[current.index];
    const changedSlide=current.index!==renderedSlide;
    document.body.className=`theme-${slide.theme}${direction==='backward'?' is-backward':''}`;
    if (changedSlide) {
      ui.title.textContent=slide.title;
      ui.chapter.textContent=slide.chapter;
      ui.photo.src=slide.picture.file;
      ui.photo.alt=slide.picture.alt;
      ui.caption.textContent=slide.picture.caption;
      ui.credit.href=slide.picture.source;
      ui.credit.setAttribute('aria-label',`View photograph source: ${slide.picture.author}`);
      ui.imagePanel.classList.remove('is-unavailable');
      ui.imageIndex.textContent=`${pad(current.index+1)} — ${pad(current.count)}`;
      animate(ui.title,'title-enter');
      animate(ui.chapter,'chapter-enter');
      animate(ui.imagePanel,'image-enter');
      animate(ui.caption.parentElement,'image-caption-enter');
      document.title=`${slide.shortTitle} — The Indus River Basin`;
    }
    if (current.step===0) {
      ui.heading.textContent='READY TO BEGIN';
      ui.card.className='information-card intro-card';
      ui.card.innerHTML='<div class="start-ripple" aria-hidden="true"><span></span><span></span><span></span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div><p>Press <kbd>Space</kbd> to reveal the first point.</p><span class="intro-caption">Take it one idea at a time.</span>';
    } else {
      const block=slide.blocks[current.step-1];
      ui.heading.textContent=block.label;
      ui.card.className=`information-card${block.kind==='outcome'?' outcome-card':''}`;
      ui.card.innerHTML=blockMarkup(block);
    }
    if (changedSlide || current.step!==renderedStep) {
      animate(ui.card,'point-enter');
      ui.window.scrollTop=0;
    }
    ui.dots.innerHTML=slide.blocks.map((_,index)=>`<span class="step-dot${index+1===current.step?' is-current':index+1<current.step?' is-complete':''}"></span>`).join('');
    ui.pointStatus.textContent=`${current.step} / ${current.points} ${current.points===1?'point':'points'}`;
    ui.current.textContent=pad(current.index+1);
    ui.total.textContent=pad(current.count);
    ui.back.disabled=!current.canBack;
    ui.next.disabled=!current.canNext;
    ui.nextLabel.textContent=!current.canNext?'Finished':current.step<current.points?'Reveal':'Next slide';
    ui.next.setAttribute('aria-label',!current.canNext?'End of presentation':current.step<current.points?'Reveal the next information point':'Advance to the next slide');
    ui.copyNote.textContent=!current.canNext?'Home to restart':current.step<current.points?'Space to reveal':'Space for the next slide';
    const percent=Math.round(current.progress*100);
    ui.progress.setAttribute('aria-valuenow',String(percent));
    ui.progress.setAttribute('aria-valuetext',`Slide ${current.index+1} of ${current.count}, point ${current.step} of ${current.points}`);
    ui.progressFill.style.width=`${percent}%`;
    ui.status.textContent=`Slide ${current.index+1} of ${current.count}. ${slide.title} ${current.step===0?'Press Space to reveal information.':`Point ${current.step} of ${current.points}. ${slide.blocks[current.step-1].label}.`}`;
    updateNavigation(current);
    try {window.history.replaceState(null,'',`#slide=${current.index+1}&point=${current.step}`);} catch {}
    renderedSlide=current.index;
    renderedStep=current.step;
  }
  function advance() {
    if (!deck.snapshot().canNext) {toast('End of presentation. Press Home to start again.');return;}
    deck.next();
    render('forward');
  }
  function previous() {deck.back();render('backward');}
  function jump(index,step=0) {
    const direction=index<deck.snapshot().index?'backward':'forward';
    deck.jump(index,step);render(direction);
  }
  function releasePointerFocus(event) {if (event.detail>0 && event.currentTarget instanceof HTMLElement) event.currentTarget.blur();}
  ui.next.addEventListener('click',event=>{advance();releasePointerFocus(event);});
  ui.back.addEventListener('click',event=>{previous();releasePointerFocus(event);});
  get('home-link').addEventListener('click',event=>{event.preventDefault();jump(0);releasePointerFocus(event);});
  slides.forEach((slide,index)=>{
    const button=document.createElement('button');
    button.type='button';button.className='slide-nav-button';button.dataset.slide=String(index);
    button.setAttribute('aria-label',`Go to slide ${index+1}: ${slide.shortTitle}`);
    button.title=`${index+1}. ${slide.shortTitle}`;
    button.addEventListener('click',event=>{jump(index);releasePointerFocus(event);});
    ui.navigation.append(button);
    const overviewChoice=document.createElement('button');
    overviewChoice.type='button';overviewChoice.className='overview-choice';overviewChoice.dataset.slide=String(index);
    overviewChoice.setAttribute('aria-label',`Open slide ${index+1}: ${slide.shortTitle}`);
    overviewChoice.innerHTML=`<img src="${escape(slide.picture.file)}" alt="" loading="lazy" width="320" height="180"><span class="overview-choice-text"><strong>${pad(index+1)}</strong><span>${escape(slide.shortTitle)}</span></span>`;
    overviewChoice.addEventListener('click',()=>{ui.overview.close();jump(index);get('overview-button').blur();});
    ui.overviewGrid.append(overviewChoice);
  });
  const showDialog=dialog=>{
    if (typeof dialog.showModal==='function') dialog.showModal();
    else toast('This browser does not support the expanded view.');
  };
  get('overview-button').addEventListener('click',()=>showDialog(ui.overview));
  get('overview-close').addEventListener('click',()=>ui.overview.close());
  get('enlarge-button').addEventListener('click',()=>{
    const picture=slides[deck.snapshot().index].picture;
    get('enlarged-photo').src=picture.file;
    get('enlarged-photo').alt=picture.alt;
    get('photo-dialog-caption').textContent=picture.caption;
    get('photo-dialog-credit').innerHTML=`<a href="${escape(picture.source)}" target="_blank" rel="noopener noreferrer">${escape(picture.author)}</a> · <a href="${escape(picture.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escape(picture.license)}</a>`;
    showDialog(ui.photoDialog);
  });
  get('photo-close').addEventListener('click',()=>ui.photoDialog.close());
  [ui.overview,ui.photoDialog].forEach(dialog=>{
    dialog.addEventListener('click',event=>{
      if (event.target!==dialog) return;
      const box=dialog.getBoundingClientRect();
      if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();
    });
  });
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else toast('Fullscreen is not available in this browser.');
    } catch {toast('Use your browser’s fullscreen option to expand the presentation.');}
  }
  ui.full.addEventListener('click',event=>{toggleFullscreen();releasePointerFocus(event);});
  document.addEventListener('fullscreenchange',()=>{
    const active=!!document.fullscreenElement;
    ui.full.setAttribute('aria-label',active?'Exit fullscreen':'Enter fullscreen');
    ui.full.querySelector('span').textContent=active?'Exit fullscreen':'Fullscreen';
  });
  document.addEventListener('keydown',event=>{
    const target=event.target instanceof Element?event.target:null;
    const blocked=ui.overview.open||ui.photoDialog.open||!!target?.closest('input,textarea,select,[contenteditable="true"]');
    const action=window.IndusDeck.getKeyAction(event,blocked);
    if(!action)return;
    event.preventDefault();
    if(action==='advance')advance();
    else if(action==='back')previous();
    else if(action==='first')jump(0);
    else if(action==='last')jump(slides.length-1,slides[slides.length-1].blocks.length);
    else if(action==='fullscreen')toggleFullscreen();
    else if(action==='overview')showDialog(ui.overview);
  });
  ui.photo.addEventListener('error',()=>ui.imagePanel.classList.add('is-unavailable'));
  ui.photo.addEventListener('load',()=>ui.imagePanel.classList.remove('is-unavailable'));
  const transcript=get('print-transcript');
  transcript.innerHTML=slides.map((slide,index)=>`<section class="print-slide"><h2>${pad(index+1)}. ${escape(slide.title)}</h2><img src="${escape(slide.picture.file)}" alt="${escape(slide.picture.alt)}">${slide.blocks.map(block=>`<h3>${escape(block.label)}</h3>${blockMarkup(block)}`).join('')}</section>`).join('');
  for(const picture of pictures){const preloaded=new Image();preloaded.src=picture.file;}
  const params=new URLSearchParams(window.location.hash.slice(1));
  deck.jump((Number(params.get('slide'))||1)-1,Number(params.get('point'))||0);
  render();
})();
