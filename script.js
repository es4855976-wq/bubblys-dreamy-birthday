const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const scenes=$$('.scene'); let current=1, q=1, pin='', giftsOpened=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches; if(reduced) document.body.classList.add('reduced-motion');
function showScene(n,heart=true){
  if(n===current)return;
  const old=$(`#scene${current}`), next=$(`#scene${n}`);
  if(heart&&!reduced){const h=$('#transitionHeart');h.style.transition='transform .65s cubic-bezier(.7,0,.2,1)';h.style.transform='translate(-50%,-50%) scale(18)';setTimeout(()=>{old.classList.remove('active');next.classList.add('active');current=n;h.style.transform='translate(-50%,-50%) scale(0)';initScene(n)},420)}
  else{old.classList.remove('active');next.classList.add('active');current=n;initScene(n)}
}
function initScene(n){
  if(n===2)initWords(); if(n===3)initQuestion(); if(n===5)initTree(); if(n===6)initGarden(); if(n===7)initKeypad(); if(n===9)initMemories(); if(n===12)initGifts();
}
$$('[data-next]').forEach(b=>b.addEventListener('click',()=>showScene(+b.dataset.next)));
function makeParticles(){
  for(let i=0;i<16;i++){const s=document.createElement('span');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDelay=Math.random()*3+'s';$('#starfield').append(s)}
}makeParticles();
function initWords(){
 const words=['Happy Birthday','My Favorite Person','You Matter','Forever','Beautiful Memories','My Happiness','Bubbly','Lots of Love','Smile','Dreams','Little Moments','Always','Shine','♡'];
 const box=$('#word-cloud'); if(box.children.length)return;
 words.forEach((w,i)=>{for(let j=0;j<(w==='♡'?3:2);j++){let e=document.createElement('span');e.className='word';e.textContent=w;e.style.left=Math.random()*92+'%';e.style.top=Math.random()*88+'%';e.style.transform=`translateZ(${Math.random()*300-150}px) rotate(${Math.random()*30-15}deg)`;box.append(e);setTimeout(()=>{e.style.opacity=.3+Math.random()*.7;e.style.transition=`all ${1.5+Math.random()*2}s ease-out`;e.style.left=(40+Math.random()*20)+'%';e.style.top=(35+Math.random()*30)+'%'},i*70+j*180)}});
}
const boy=$('#boy'),girl=$('#girl'),speech=$('#speech'),qt=$('#questionText'),qb=$('#answerButtons'),qm=$('#questionMessage'),qc=$('#qCount');
function state(el,s){el.classList.remove('happy','sad','excited','pleading','shy','clapping','spin','jump'); if(s)el.classList.add(s)}
function happySequence(){
 state(boy,'excited');state(girl,'happy'); speech.textContent='Yay! She said YES!';
 setTimeout(()=>{state(boy,'clapping');state(girl,'spin');burstHearts(22)},500);
 setTimeout(()=>{state(boy,'jump');state(girl,'jump');speech.textContent="Let's show her something magical!"},1100);
 setTimeout(()=>{state(boy,'happy');state(girl,'happy');advanceQuestion()},2200);
}
function noSequence(){
 state(boy,'sad');state(girl,'sad');speech.textContent='Wait... really?';
 setTimeout(()=>{state(boy,'pleading');state(girl,'sad');speech.textContent='But we worked so hard on this little surprise!';burstHearts(4)},800);
 setTimeout(()=>{qm.textContent='Are you sure, Bubbly? 🥺';qb.innerHTML='<button class="answer no" id="tryAgain">TRY AGAIN</button><button class="answer yes" id="showMe">OKAY, SHOW ME</button>';$('#tryAgain').onclick=()=>{qm.textContent='';initQuestion();};$('#showMe').onclick=happySequence},1600);
}
function initQuestion(){
 qc.textContent=`${q} / 3`;
 if(q===1){qt.textContent='Do you want to see your birthday surprise?';qb.innerHTML='<button class="answer yes" id="yesBtn">YES 💗</button><button class="answer no" id="noBtn">NO 🙈</button>';speech.textContent='Hey Bubbly! We have a little surprise for you!'}
 if(q===2){qt.textContent='Are you ready for a little birthday magic?';qb.innerHTML='<button class="answer yes" id="yesBtn">YES ✨</button><button class="answer no" id="noBtn">NOT YET</button>';speech.textContent='Something special is waiting...'}
 if(q===3){qt.textContent='Can we make your birthday a little more magical?';qb.innerHTML='<button class="answer yes" id="yesBtn">OF COURSE 💖</button><button class="answer no" id="noBtn">I’M SHY 🙈</button>';speech.textContent='One last little question...'}
 $('#yesBtn').onclick=()=>answer(true);$('#noBtn').onclick=()=>answer(false);
 [boy,girl].forEach(x=>state(x,'idle'));
}
function answer(yes){
 if(q===1){yes?happySequence():noSequence();return}
 if(q===2){
  if(yes){state(boy,'excited');state(girl,'clapping');speech.textContent='Something special is waiting for you!';burstHearts(14);setTimeout(()=>{q=3;initQuestion()},1500)}
  else{state(boy,'confused');state(girl,'confused');speech.textContent="Okay, we'll wait for you!";qb.innerHTML='<button class="answer yes" id="ready">I’M READY!</button>';$('#ready').onclick=()=>{q=3;initQuestion()}}
  return
 }
 if(yes){state(boy,'jump');state(girl,'spin');burstHearts(25);speech.textContent='Yay! Let the magic begin!';setTimeout(()=>showScene(4),1500)}
 else{state(boy,'shy');state(girl,'shy');speech.textContent="That's okay! This surprise is made with lots of care.";qb.innerHTML='<button class="answer yes" id="openSurprise">OPEN MY SURPRISE</button>';$('#openSurprise').onclick=()=>showScene(4)}
}
function burstHearts(count=12){
 for(let i=0;i<count;i++){let h=document.createElement('span');h.className='particle-heart';h.textContent=Math.random()>.2?'♥':'✦';h.style.left=(25+Math.random()*50)+'%';h.style.top=(30+Math.random()*45)+'%';h.style.fontSize=(10+Math.random()*20)+'px';$('#hearts').append(h);setTimeout(()=>h.remove(),1800)}
}
function initTree(){
 const c=$('#canopy');if(c.children.length)return;
 for(let i=0;i<38;i++){let f=document.createElement('span');f.className='flower';f.textContent=i%3===0?'✿':'✽';f.style.left=(8+Math.random()*82)+'%';f.style.top=(8+Math.random()*75)+'%';f.style.animationDelay=(2.5+Math.random()*2)+'s';c.append(f)}
}
function initGarden(){
 if($('#garden').children.length)return;
 for(let i=0;i<20;i++){let f=document.createElement('span');f.className='garden-flower';f.textContent=['✿','🌸','❀','🌷'][i%4];f.style.left=(3+Math.random()*92)+'%';f.style.fontSize=(25+Math.random()*30)+'px';f.style.animationDelay=(Math.random()*1.5)+'s';$('#garden').append(f)}
}
$('#bloomButton').onclick=()=>{$('#scene6').classList.add('bloomed');$('#gardenNext').classList.remove('hidden');burstHearts(15)};
function initKeypad(){
 if($('#keypad').children.length)return;
 [...'1234567890'].forEach(n=>{let b=document.createElement('button');b.className='key';b.textContent=n;b.onclick=()=>enterPin(n);$('#keypad').append(b)});
}
function enterPin(n){
 pin=(pin+n).slice(-4);$('#pinDisplay').textContent=pin.padEnd(4,'○').split('').join(' ');
 if(pin.length===4){if(pin==='2910'||pin==='1810'){ $('#pinMessage').textContent='Unlocked with a little love ♡';burstHearts(18);setTimeout(()=>showScene(8),900)}else{$('#pinMessage').textContent='Not quite... try another little secret ♡';pin='';setTimeout(()=>$('#pinDisplay').textContent='○ ○ ○ ○',600)}}
}
let sx=0,sy=0;
const cakeArea=$('#cakeArea'); cakeArea.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY});cakeArea.addEventListener('pointerup',e=>{if(Math.abs(e.clientX-sx)>70||Math.abs(e.clientY-sy)>70)cutCake()});
function cutCake(){if($('#scene8').classList.contains('cut'))return;$('#scene8').classList.add('cut');$('#cakeMessage').textContent='Happy Birthday, Bubbly! ♡';burstHearts(30);confetti();$('#cakeReplay').classList.remove('hidden')}
$('#cakeReplay').onclick=()=>{$('#scene8').classList.remove('cut');$('#cakeMessage').textContent='';$('#cakeReplay').classList.add('hidden')};
function confetti(){for(let i=0;i<35;i++){let p=document.createElement('span');p.className='petal';p.textContent=i%2?'✦':'•';p.style.left=(35+Math.random()*30)+'%';p.style.top='48%';p.style.fontSize=(7+Math.random()*12)+'px';p.style.animationDuration=(1+Math.random())+'s';$('#petals').append(p);setTimeout(()=>p.remove(),2000)}}
function initMemories(){
 const deck=$('#memoryDeck');if(deck.dataset.ready)return;deck.dataset.ready=1;let index=0,start=0;
 deck.addEventListener('pointerdown',e=>start=e.clientX);deck.addEventListener('pointerup',e=>{let dx=e.clientX-start;if(Math.abs(dx)>40){index=(index+(dx<0?1:-1)+3)%3;[...deck.children].forEach((c,i)=>{let d=(i-index+3)%3;c.style.transform=`translateX(${d*18}px) translateY(${d*10}px) rotate(${[-7,5,-2][i]+(d?d*2:0)}deg) scale(${d===0?1.04:.94})`;c.style.zIndex=3-d})}});
}
const giftData=[
['A sweet birthday wish','May every little dream in your heart find its way to you. Keep smiling, Bubbly. ♡'],
['A memory','Some memories begin before we even know they will matter. This one is saved here for you. ♡'],
['A little letter','You make ordinary moments feel a little more special. Thank you for being part of my story.'],
['Reasons','Your smile. Your kindness. Your little ways. Your courage. Your laugh. And simply... you. ♡'],
['The final surprise','Happy Birthday, Bubbly! Here is to another year of beautiful memories.']
];
function initGifts(){
 const box=$('#gifts');if(box.children.length)return;
 giftData.forEach((g,i)=>{let b=document.createElement('button');b.className='gift';b.style.setProperty('--gift',['#b83b60','#d9859b','#9b4d76','#c45a63','#8f3152'][i]);b.style.setProperty('--r',`${i%2?4:-4}deg`);b.innerHTML=`<span>Gift ${i+1} ♡</span>`;b.onclick=()=>openGift(i,g);box.append(b)})
}
function openGift(i,g){$('#giftRevealContent').innerHTML=`<h3>${g[0]}</h3><p>${g[1]}</p>`;$('#giftReveal').classList.remove('hidden');giftsOpened++}
$('#closeGift').onclick=()=>$('#giftReveal').classList.add('hidden');
const letter=`Happy Birthday, Bubbly!<br><br>Today is a special day because it celebrates someone who brings happiness into my life.<br><br>I hope your days are filled with beautiful memories, peaceful moments, laughter, and everything that makes you smile.<br><br>Thank you for being part of my story.<br><br>Keep smiling, keep shining, and keep being yourself.`;
$('#letterText').innerHTML=letter;
$('#letterToggle').onclick=()=>{$('#envelope').classList.add('open');$('#letterToggle').classList.add('hidden');$('#letterClose').classList.remove('hidden');$('.letter-next').classList.remove('hidden')};
$('#letterClose').onclick=()=>{$('#envelope').classList.remove('open');$('#letterToggle').classList.remove('hidden');$('#letterClose').classList.add('hidden');$('.letter-next').classList.add('hidden')};
$('#releaseHearts').onclick=()=>burstHearts(35);
const music=$('#music'), musicToggle=$('#musicToggle'),musicMute=$('#musicMute');
musicToggle.onclick=async()=>{try{if(music.paused){await music.play();musicToggle.textContent='❚❚'}else{music.pause();musicToggle.textContent='▶'}}catch{toast('Add assets/kanavellam_neethane.mp3 to enable music ♡')}};
musicMute.onclick=()=>{music.muted=!music.muted;musicMute.textContent=music.muted?'🔇':'🔊'};
$('#replayMusic').onclick=()=>{music.currentTime=0;music.play().catch(()=>toast('The birthday song is ready in the website ♡'))};
$('#replayAll').onclick=()=>{music.pause();music.currentTime=0;const mv=$('#memoryVideo');if(mv){mv.pause();mv.currentTime=0}scenes.forEach(s=>s.classList.remove('active'));$('#scene1').classList.add('active');current=1;q=1;pin='';initQuestion()};
function toast(t){let e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&current>1)showScene(current-1,false)});
initQuestion();

/* Share + dynamic heart-style QR. The actual QR value is always the current
   hosted URL, so it becomes correct automatically after GitHub Pages hosting. */
const shareQrBtn=$('#shareQrBtn'), qrModal=$('#qrModal'), qrClose=$('#qrClose'), copyShareUrl=$('#copyShareUrl'), heartQr=$('#heartQr'), qrUrlText=$('#qrUrlText');
function buildQR(){
  if(!heartQr || typeof QRCode==='undefined') return;
  heartQr.innerHTML='';
  const url=location.href;
  new QRCode(heartQr,{text:url,width:190,height:190,colorDark:'#5c1633',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
  if(qrUrlText) qrUrlText.textContent=url;
}
shareQrBtn?.addEventListener('click',async()=>{
  qrModal.classList.remove('hidden'); buildQR();
  try{if(navigator.share){await navigator.share({title:"Bubbly's Dreamy Birthday",text:"A little birthday surprise ♡",url:location.href})}}catch{}
});
qrClose?.addEventListener('click',()=>qrModal.classList.add('hidden'));
qrModal?.addEventListener('click',e=>{if(e.target===qrModal)qrModal.classList.add('hidden')});
copyShareUrl?.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(location.href);toast('Website link copied ♡')}
  catch{toast('Copy the address from the browser ♡')}
});
