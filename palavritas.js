/* ════ DATA ════ */
const WORDS=['GATO','BOLA','CASA','PATO','SAPO','AMOR','MESA','LAGO','FOGO','LOBO','FLOR','URSO',
  'PEIXE','TIGRE','BRAVO','CAMPO','NUVEM','BARCO','PEDRA','BURRO','COBRA',
  'MACACO','GIRAFA','CAVALO','ESCOLA','JARDIM','BONECO'];
const ALPHA='ABCDEFGHIJKLMNOPRSTUVXZ';
const ROWS=3;

/* ════ STATE ════ */
let word='GATO',diff='i';
let board=[],COLS=0,moves=0,secs=0,timerH=null,won=false;
let reserve=[],selRes=null;
let drag=null,didDrag=false,touchMode=false,toastT=null;

/* populate select */
const wSel=document.getElementById('wSel');
WORDS.forEach(w=>{const o=document.createElement('option');o.value=o.textContent=w;wSel.appendChild(o);});

/* ════ MENU BG ════ */
function buildBg(){
  const bg=document.getElementById('menuBg');bg.innerHTML='';
  [{t:'-80px',l:'-80px',s:'220px',c:'#5BBF2A',o:.13},{t:'auto',b:'50px',r:'-50px',s:'170px',c:'#F7E03C',o:.2},
   {t:'40%',l:'-30px',s:'110px',c:'#A8E87A',o:.17}].forEach(b=>{
    const d=document.createElement('div');d.className='blob';
    d.style.cssText=`width:${b.s};height:${b.s};top:${b.t||'auto'};bottom:${b.b||'auto'};left:${b.l||'auto'};right:${b.r||'auto'};background:${b.c};opacity:${b.o};`;
    bg.appendChild(d);
  });
  const L='PALAVRITASMONTEAPRENDA';
  [{s:52,x:8,y:10,dur:2.8},{s:44,x:72,y:7,dur:3.5},{s:48,x:85,y:54,dur:3.1},
   {s:40,x:5,y:60,dur:4.0},{s:46,x:50,y:80,dur:2.6},{s:38,x:20,y:82,dur:3.8},
   {s:50,x:60,y:18,dur:3.3},{s:42,x:30,y:35,dur:4.2},{s:36,x:80,y:73,dur:2.9},
   {s:54,x:40,y:47,dur:3.6},{s:44,x:15,y:22,dur:3.0},{s:40,x:68,y:40,dur:4.1}
  ].forEach((c,i)=>{
    const d=document.createElement('div');d.className='fl';
    d.style.cssText=`width:${c.s}px;height:${c.s}px;font-size:${c.s*.54}px;left:${c.x}%;top:${c.y}%;animation-duration:${c.dur}s;animation-delay:${(i*.3)%2}s;`;
    d.textContent=L[i%L.length];bg.appendChild(d);
  });
}

/* ════ NAVIGATION ════ */
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');}
function goMenu(){closeOvs();stopTimer();go('sMenu');}
function goCredits(){go('sCredits');}
function goMenuFromGame(){closeOvs();stopTimer();go('sMenu');}
function startGame(){newGame(WORDS[Math.random()*WORDS.length|0],diff);go('sGame');}
function exitApp(){
  try{window.close();}catch(e){}
  document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Fredoka,sans-serif;font-size:1.2rem;color:#386D10;text-align:center;padding:30px;">Obrigado por jogar Palavritas!<br><br>Você pode fechar esta aba agora.</div>';
}

/* ════ OVERLAYS ════ */
function closeOvs(){document.querySelectorAll('.ov').forEach(o=>o.classList.remove('on'));}
function openPause(){stopTimer();document.getElementById('oPause').classList.add('on');}
function closePause(){document.getElementById('oPause').classList.remove('on');if(!won)startTimer();}
function restartSame(){closeOvs();newGame(word,diff);}
function newRandWord(){closeOvs();const w=WORDS[Math.random()*WORDS.length|0];wSel.value=w;newGame(w,diff);}
function changeDiff(){closeOvs();setDiff(diff==='i'?'c':'i');}

/* ════ DIFFICULTY ════ */
function setDiff(d){
  diff=d;
  document.getElementById('dbIn').classList.toggle('on',d==='i');
  document.getElementById('dbCl').classList.toggle('on',d==='c');
  document.getElementById('sDiff').innerHTML=d==='i'?'&#127807;':'&#11088;';
  newGame(word,d);
}

/* ════ WORD ════ */
function pickWord(w){word=w;newGame(w,diff);}
function randWord(){const w=WORDS[Math.random()*WORDS.length|0];wSel.value=w;newGame(w,diff);}

/* ════ BOARD LOGIC ════ */
function nbOf(idx){
  const r=idx/COLS|0,c=idx%COLS,nb=[];
  if(r>0)nb.push((r-1)*COLS+c);if(r<ROWS-1)nb.push((r+1)*COLS+c);
  if(c>0)nb.push(r*COLS+c-1);if(c<COLS-1)nb.push(r*COLS+c+1);
  return nb;
}

function buildBoard(w,d){
  const en=d==='i'?2:1;
  COLS=w.length+1;
  const tot=COLS*ROWS;
  let b=Array.from({length:tot},(_,i)=>{
    const r=i/COLS|0,c=i%COLS;
    return r===1&&c<w.length?{l:w[c],e:false,isW:true}:{l:'',e:false,isW:false};
  });
  let ep=0;for(let i=tot-1;i>=0&&ep<en;i--){if(!b[i].isW){b[i].e=true;ep++;}}
  for(let i=0;i<tot;i++){if(!b[i].e&&!b[i].isW)b[i].l=ALPHA[Math.random()*ALPHA.length|0];}
  for(let k=0;k<500;k++){
    const es=b.map((c,i)=>c.e?i:-1).filter(i=>i>=0);
    const ei=es[Math.random()*es.length|0];
    const vn=nbOf(ei).filter(n=>!b[n].e);
    if(!vn.length)continue;
    const pi=vn[Math.random()*vn.length|0];
    [b[ei],b[pi]]=[b[pi],b[ei]];
  }
  let att=0;while(scan(b,w)&&att++<20){
    const es=b.map((c,i)=>c.e?i:-1).filter(i=>i>=0);
    const ei=es[0];const vn=nbOf(ei).filter(n=>!b[n].e);
    if(vn.length){[b[ei],b[vn[0]]]=[b[vn[0]],b[ei]];}
  }
  board=b;
  const fs=[];for(let i=0;i<26;i++)fs.push(String.fromCharCode(65+i),String.fromCharCode(65+i));
  const used=b.filter(c=>!c.e).map(c=>c.l);const rem=[...fs];
  used.forEach(l=>{const idx=rem.indexOf(l);if(idx>=0)rem.splice(idx,1);});
  reserve=rem.sort();
}

function scan(b,w){
  const wl=w.length;
  for(let r=0;r<ROWS;r++)for(let c=0;c<=COLS-wl;c++){
    let ok=true;for(let i=0;i<wl;i++){const cell=b[r*COLS+c+i];if(!cell||cell.e||cell.l!==w[i]){ok=false;break;}}
    if(ok)return true;
  }
  for(let c=0;c<COLS;c++)for(let r=0;r<=ROWS-wl;r++){
    let ok=true;for(let i=0;i<wl;i++){const cell=b[(r+i)*COLS+c];if(!cell||cell.e||cell.l!==w[i]){ok=false;break;}}
    if(ok)return true;
  }
  return false;
}

/* ════ SLIDE ════ */
function doSlide(ti,ei){
  [board[ti],board[ei]]=[board[ei],board[ti]];
  moves++;document.getElementById('sMoves').textContent=moves;
  selRes=null;document.getElementById('swapHint').classList.remove('on');
  render();
  const el=document.querySelector(`.cell[data-i="${ei}"]`);
  if(el){el.classList.add('pop');setTimeout(()=>el.classList.remove('pop'),220);}
}

/* ════ TAP ════ */
function doTap(idx){
  if(!board[idx]||board[idx].e)return;
  if(selRes!==null){swapRes(idx);return;}
  const en=nbOf(idx).filter(n=>board[n]&&board[n].e);
  if(en.length){doSlide(idx,en[0]);}
  else{const el=document.querySelector(`.cell[data-i="${idx}"]`);if(el){el.classList.add('nm');setTimeout(()=>el.classList.remove('nm'),360);}}
}

/* ════ RESERVE ════ */
function swapRes(bi){
  if(selRes===null||board[bi].e)return;
  const old=board[bi].l;board[bi].l=reserve[selRes];board[bi].isW=false;
  reserve[selRes]=old;reserve.sort();selRes=null;
  document.getElementById('swapHint').classList.remove('on');
  render();renderReserve();
}

/* ════ SUBMIT ════ */
function submitWord(){
  if(scan(board,word)){doWin();}else{doFail();}
}

function doWin(){
  won=true;stopTimer();spawnConfetti();
  document.getElementById('oWinW').textContent='Você formou: '+word;
  const m=secs/60|0,s=secs%60;
  document.getElementById('oWinM').textContent=moves+' movimentos · '+m+':'+(s<10?'0':'')+s;
  document.getElementById('diffBtn').textContent=diff==='i'?'⭐ Próxima Dificuldade':'🌱 Voltar Dificuldade';
  document.getElementById('oWin').classList.add('on');
}

function doFail(){
  const bd=document.getElementById('board');
  bd.classList.remove('shake','red');void bd.offsetWidth;
  bd.classList.add('shake','red');
  setTimeout(()=>bd.classList.remove('shake'),450);
  setTimeout(()=>bd.classList.remove('red'),900);
  const t=document.getElementById('toast');
  t.classList.add('on');if(toastT)clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('on'),2500);
}

/* ════ DRAG ════ */
function ddir(ti,ei){
  const tr=ti/COLS|0,tc=ti%COLS,er=ei/COLS|0,ec=ei%COLS;
  if(er===tr&&ec===tc+1)return'r';if(er===tr&&ec===tc-1)return'l';
  if(ec===tc&&er===tr+1)return'd';if(ec===tc&&er===tr-1)return'u';return null;
}
function csz(){return Math.min(60,Math.max(34,Math.floor((Math.min(window.innerWidth,420)-52-(COLS-1)*6)/COLS)));}

function startDrag(idx,cx,cy){
  didDrag=false;
  if(!board[idx]||board[idx].e)return;
  const en=nbOf(idx).filter(n=>board[n]&&board[n].e);
  drag={ti:idx,en,sx:cx,sy:cy,cs:csz(),ae:null};
  const el=document.querySelector(`.cell[data-i="${idx}"]`);
  if(el)el.classList.add('drg');
}

function moveDrag(cx,cy){
  if(!drag)return;
  const dx=cx-drag.sx,dy=cy-drag.sy;
  if(Math.abs(dx)<5&&Math.abs(dy)<5)return;
  didDrag=true;
  const span=drag.cs+6;let ae=null,tx=0,ty=0;
  if(Math.abs(dx)>=Math.abs(dy)){
    const dir=dx>0?'r':'l';
    const found=drag.en.find(n=>ddir(drag.ti,n)===dir);
    ae=found!==undefined?found:null;
    if(ae!==null)tx=dir==='r'?Math.min(Math.max(dx,0),span):Math.max(Math.min(dx,0),-span);
  }else{
    const dir=dy>0?'d':'u';
    const found=drag.en.find(n=>ddir(drag.ti,n)===dir);
    ae=found!==undefined?found:null;
    if(ae!==null)ty=dir==='d'?Math.min(Math.max(dy,0),span):Math.max(Math.min(dy,0),-span);
  }
  drag.ae=ae;
  const el=document.querySelector(`.cell[data-i="${drag.ti}"]`);
  if(el)el.style.transform=`translate(${tx}px,${ty}px)`;
}

function endDrag(cx,cy){
  if(!drag)return;
  const {ti,ae,sx,sy,cs}=drag;
  const dx=cx-sx,dy=cy-sy;
  const el=document.querySelector(`.cell[data-i="${ti}"]`);
  if(el){el.classList.remove('drg');el.style.transform='';}
  drag=null;
  if(!didDrag){doTap(ti);return;}
  if(ae===null)return;
  const dir=ddir(ti,ae),thr=cs*.28;
  const done=(dir==='r'&&dx>=thr)||(dir==='l'&&dx<=-thr)||(dir==='d'&&dy>=thr)||(dir==='u'&&dy<=-thr);
  if(done)doSlide(ti,ae);
}

function attachCell(el,idx){
  el.addEventListener('touchstart',e=>{touchMode=true;startDrag(idx,e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
  el.addEventListener('mousedown',e=>{if(touchMode)return;startDrag(idx,e.clientX,e.clientY);});
}

document.addEventListener('touchmove',e=>{if(drag){e.preventDefault();moveDrag(e.touches[0].clientX,e.touches[0].clientY);}},{passive:false});
document.addEventListener('touchend',e=>{if(drag)endDrag(e.changedTouches[0].clientX,e.changedTouches[0].clientY);},{passive:true});
document.addEventListener('mousemove',e=>{if(drag)moveDrag(e.clientX,e.clientY);});
document.addEventListener('mouseup',e=>{if(drag)endDrag(e.clientX,e.clientY);});

/* ════ RENDER ════ */
function render(){
  const el=document.getElementById('board');
  const cs=csz();
  el.style.gridTemplateColumns=`repeat(${COLS},${cs}px)`;
  el.innerHTML='';
  board.forEach((cell,idx)=>{
    const div=document.createElement('div');div.className='cell';div.dataset.i=idx;
    div.style.width=div.style.height=cs+'px';div.style.fontSize=(cs*.52)+'px';
    if(cell.e){div.classList.add('empty');}
    else{
      div.classList.add('tile');div.textContent=cell.l;
      const r=idx/COLS|0,c=idx%COLS;
      if(r===1&&c<word.length){div.classList.add(cell.l===word[c]?'ok':'zone');}
      const en=nbOf(idx).filter(n=>board[n]&&board[n].e);
      if(en.length)div.classList.add('sok');
      attachCell(div,idx);
    }
    el.appendChild(div);
  });
}

function renderHdr(){
  const el=document.getElementById('hdrTiles');el.innerHTML='';
  [...word].forEach(l=>{const d=document.createElement('div');d.className='ht';d.textContent=l;el.appendChild(d);});
}

function renderReserve(){
  const el=document.getElementById('resTiles');el.innerHTML='';
  reserve.forEach((l,i)=>{
    const d=document.createElement('div');d.className='rt'+(selRes===i?' sel':'');d.textContent=l;
    d.addEventListener('touchstart',()=>{touchMode=true;},{passive:true});
    d.onclick=()=>{
      selRes=selRes===i?null:i;
      document.getElementById('swapHint').classList.toggle('on',selRes!==null);
      renderReserve();
    };
    el.appendChild(d);
  });
}

/* ════ TIMER ════ */
function startTimer(){
  clearInterval(timerH);
  timerH=setInterval(()=>{secs++;const m=secs/60|0,s=secs%60;document.getElementById('timerEl').textContent=m+':'+(s<10?'0':'')+s;},1000);
}
function stopTimer(){clearInterval(timerH);timerH=null;}

/* ════ CONFETTI ════ */
function spawnConfetti(){
  const c=document.getElementById('conf');c.innerHTML='';
  const cols=['#F7E03C','#5BBF2A','#FF6B6B','#74B9FF','#A29BFE','#FD79A8','#FFEAA7','#A8E87A'];
  for(let i=0;i<90;i++){
    const b=document.createElement('div');b.className='cb';const sz=5+Math.random()*9;
    b.style.cssText=`left:${Math.random()*100}vw;width:${sz}px;height:${sz}px;background:${cols[Math.random()*cols.length|0]};border-radius:${Math.random()>.5?'50%':'3px'};animation-delay:${Math.random()*1.6}s;animation-duration:${2+Math.random()*1.5}s;`;
    c.appendChild(b);
  }
  setTimeout(()=>c.innerHTML='',5500);
}

/* ════ NEW GAME ════ */
function newGame(w,d){
  word=w;diff=d;won=false;moves=0;secs=0;selRes=null;didDrag=false;drag=null;
  document.getElementById('sMoves').textContent='0';
  document.getElementById('timerEl').textContent='0:00';
  document.getElementById('swapHint').classList.remove('on');
  document.getElementById('board').classList.remove('shake','red');
  if(toastT)clearTimeout(toastT);document.getElementById('toast').classList.remove('on');
  closeOvs();stopTimer();buildBoard(w,d);renderHdr();render();renderReserve();startTimer();
}

/* ════ INIT ════ */
buildBg();