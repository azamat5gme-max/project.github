(function (root) {
  'use strict';
  function createDeckState(slides) {
    if (!Array.isArray(slides) || !slides.length || slides.some(slide => !Array.isArray(slide.blocks) || !slide.blocks.length)) throw new Error('Each slide needs at least one information block.');
    let index=0;
    let step=0;
    const totalStates=slides.reduce((count,slide)=>count+slide.blocks.length+1,0);
    function snapshot() {
      const position=slides.slice(0,index).reduce((count,slide)=>count+slide.blocks.length+1,0)+step;
      return {index:index,step:step,points:slides[index].blocks.length,count:slides.length,position:position,totalStates:totalStates,canBack:position>0,canNext:position<totalStates-1,progress:(position+1)/totalStates};
    }
    function next() {
      if (step<slides[index].blocks.length) step++;
      else if (index<slides.length-1) {index++;step=0;}
      return snapshot();
    }
    function back() {
      if (step>0) step--;
      else if (index>0) {index--;step=slides[index].blocks.length;}
      return snapshot();
    }
    function jump(newIndex,newStep=0) {
      index=Math.max(0,Math.min(slides.length-1,Math.trunc(Number(newIndex)||0)));
      step=Math.max(0,Math.min(slides[index].blocks.length,Math.trunc(Number(newStep)||0)));
      return snapshot();
    }
    return {snapshot:snapshot,next:next,back:back,jump:jump};
  }
  function getKeyAction(event,blocked=false) {
    if(blocked||event.defaultPrevented||event.repeat||event.ctrlKey||event.metaKey||event.altKey)return null;
    const key=String(event.key||'');
    if(event.code==='Space'||key===' '||key==='ArrowRight'||key==='PageDown')return 'advance';
    if(key==='ArrowLeft'||key==='PageUp')return 'back';
    if(key==='Home')return 'first';
    if(key==='End')return 'last';
    if(key.toLowerCase()==='f')return 'fullscreen';
    if(key.toLowerCase()==='o')return 'overview';
    return null;
  }
  const api={createDeckState:createDeckState,getKeyAction:getKeyAction};
  if (typeof module === 'object' && module.exports) module.exports=api;
  else root.IndusDeck=api;
})(typeof window !== 'undefined' ? window : globalThis);
