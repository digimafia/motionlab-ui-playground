import CheckboxShowcase from './CheckboxShowcase'
import MenuShowcase from './MenuShowcase'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, LoaderCircle, Heart, Copy, RotateCcw, Smartphone, Tablet, Monitor, Sparkles } from 'lucide-react'

type Demo = 'success' | 'spring' | 'card' | 'text' | 'toggle' | 'pulse'
const demos: { id: Demo; title: string; group: string; description: string }[] = [
  { id: 'success', title: 'Async Success Button', group: 'Buttons', description: 'Loading spinner, green tick and reset' },
  { id: 'spring', title: 'Spring Button', group: 'Buttons', description: 'Hover and tap spring physics' },
  { id: 'card', title: 'Floating 3D Card', group: 'Cards', description: 'Interactive tilt and lift' },
  { id: 'text', title: 'Staggered Text', group: 'Typography', description: 'Letter-by-letter entrance' },
  { id: 'toggle', title: 'Sliding Toggle', group: 'Controls', description: 'Smooth spring switch' },
  { id: 'pulse', title: 'Heart Pulse', group: 'Effects', description: 'Infinite glowing pulse' },
]
const snippets: Record<Demo, string> = {
  success: "const [state,setState] = useState('idle')\nasync function run(){\n setState('loading')\n await saveData()\n setState('success')\n}\n<motion.button layout onClick={run}>\n {state === 'success' ? '✓ Done' : 'Submit'}\n</motion.button>",
  spring: "<motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}} transition={{type:'spring',stiffness:400}}>Click</motion.button>",
  card: "<motion.div whileHover={{y:-15,rotateX:8,rotateY:-8}} transition={{type:'spring'}}>Card</motion.div>",
  text: "{letters.map((letter,i)=><motion.span key={i} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}>{letter}</motion.span>)}",
  toggle: "<motion.span layout transition={{type:'spring',stiffness:350,damping:22}} />",
  pulse: "<motion.div animate={{scale:[1,1.8],opacity:[.7,0]}} transition={{duration:1.5,repeat:Infinity}} />"
}
function SuccessButton({duration}:{duration:number}){
 const [state,setState]=useState<'idle'|'loading'|'success'>('idle')
 async function run(){if(state!=='idle')return;setState('loading');await new Promise<void>(r=>setTimeout(r,Math.max(650,duration*1000)));setState('success');setTimeout(()=>setState('idle'),1600)}
 return <motion.button onClick={()=>void run()} disabled={state!=='idle'} animate={{width:state==='loading'?56:state==='success'?150:190,backgroundColor:state==='success'?'#16a34a':'#6d5df5'}} transition={{type:'spring',stiffness:300,damping:25}} className="h-14 rounded-full text-white font-semibold flex justify-center items-center overflow-hidden">{state==='loading'?<LoaderCircle className="animate-spin"/>:state==='success'?<span className="flex gap-2 items-center"><Check/> Added!</span>:'Add to cart'}</motion.button>
}
function DemoPreview({id,duration,replay}:{id:Demo;duration:number;replay:number}){
 const [on,setOn]=useState(false)
 const [liked,setLiked]=useState(false)
 return <div key={id+'-'+replay} className="min-h-64 flex justify-center items-center p-6">
 {id==='success'&&<SuccessButton duration={duration}/>}
 {id==='spring'&&<motion.button className="primary" whileHover={{scale:1.12,rotate:-3}} whileTap={{scale:.85}} transition={{type:'spring',stiffness:400,damping:12}}>Hover & click me</motion.button>}
 {id==='card'&&<motion.div className="w-56 p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-700 shadow-xl" whileHover={{y:-14,rotateX:8,rotateY:-7}} transition={{type:'spring'}}><Sparkles className="mb-12"/><div className="font-bold text-2xl">Elevate</div><div className="text-sm opacity-70">Hover to explore</div></motion.div>}
 {id==='text'&&<div className="text-3xl font-bold flex flex-wrap justify-center">{Array.from('Motion is magic').map((ch,i)=><motion.span key={i} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:i*duration/15}}>{ch===' '? '\u00a0':ch}</motion.span>)}</div>}
 {id==='toggle'&&<button aria-label="Toggle" aria-pressed={on} onClick={()=>setOn(!on)} className={'w-24 h-13 rounded-full p-1 flex '+(on?'justify-end bg-indigo-500':'justify-start bg-slate-600')}><motion.span layout transition={{type:'spring',stiffness:350,damping:22}} className="size-11 bg-white rounded-full shadow"/></button>}
 {id==='pulse'&&<div className="relative flex justify-center items-center"><motion.div className="absolute size-20 rounded-full bg-pink-500" animate={{scale:[1,1.8],opacity:[.6,0]}} transition={{duration:duration*2,repeat:Infinity}}/><button aria-label="Like" onClick={()=>setLiked(!liked)} className="relative size-20 bg-pink-600 rounded-full flex items-center justify-center"><Heart size={32} fill={liked?'white':'none'}/></button></div>}
 </div>
}
export default function App(){
 const [demo,setDemo]=useState<Demo>('success')
 const [category,setCategory]=useState('All')
 const [duration,setDuration]=useState(.7)
 const [replay,setReplay]=useState(0)
 const [device,setDevice]=useState<'mobile'|'tablet'|'desktop'>('desktop')
 const [favorites,setFavorites]=useState<Demo[]>(()=>{try{return JSON.parse(localStorage.getItem('motionlab-favorites')||'[]') as Demo[]}catch{return []}})
 const [copied,setCopied]=useState(false)
 const selected=demos.find(d=>d.id===demo)!
 function favorite(){setFavorites(prev=>{const next=prev.includes(demo)?prev.filter(x=>x!==demo):[...prev,demo];localStorage.setItem('motionlab-favorites',JSON.stringify(next));return next})}
 async function copy(){try{await navigator.clipboard.writeText(snippets[demo]);setCopied(true);setTimeout(()=>setCopied(false),1200)}catch{setCopied(false)}}
 return <div className="min-h-screen"><header className="px-5 md:px-10 py-6 border-b border-slate-800 flex justify-between items-center flex-wrap gap-3"><div className="flex items-center gap-3"><div className="p-3 rounded-xl bg-indigo-500"><Sparkles/></div><div><h1 className="text-xl font-bold">MotionLab <span className="text-indigo-400">/ Playground</span></h1><p className="muted text-xs">Your animated UI testing workspace</p></div></div><span className="chip text-xs">React · Tailwind · Motion</span></header>
 <main className="max-w-7xl mx-auto p-4 md:p-8 grid lg:grid-cols-[270px_1fr] gap-6"><aside className="panel p-4 self-start"><h2 className="font-bold mb-4">Component Library</h2><div className="flex gap-2 flex-wrap mb-5">{['All','Buttons','Cards','Typography','Controls','Effects','Favorites'].map(g=><button key={g} className={'chip text-xs '+(category===g?'active':'')} onClick={()=>setCategory(g)}>{g}</button>)}</div><div className="space-y-2">{demos.filter(d=>category==='All'||d.group===category||(category==='Favorites'&&favorites.includes(d.id))).map(d=><button key={d.id} onClick={()=>setDemo(d.id)} className={'w-full text-left p-3 rounded-xl '+(demo===d.id?'bg-indigo-500/20 border border-indigo-400':'hover:bg-white/5 border border-transparent')}><div className="text-sm font-semibold">{d.title}</div><div className="muted text-xs mt-1">{d.description}</div></button>)}</div></aside>
 <section className="space-y-5 min-w-0"><div className="flex justify-between gap-3 items-center flex-wrap"><div><div className="text-xs uppercase tracking-widest text-indigo-400">{selected.group}</div><h2 className="text-2xl font-bold mt-1">{selected.title}</h2><p className="muted text-sm">{selected.description}</p></div><button className="chip flex gap-2 items-center" onClick={favorite}><Heart size={16} fill={favorites.includes(demo)?'#fb7185':'none'}/>{favorites.includes(demo)?'Saved':'Favorite'}</button></div>
 <div className="panel overflow-hidden"><div className="flex justify-between items-center p-4 border-b border-slate-800"><span className="muted text-xs">● ● ● &nbsp; Live Preview</span><div className="flex gap-2">{([['mobile',Smartphone],['tablet',Tablet],['desktop',Monitor]] as const).map(([d,Icon])=><button key={d} aria-label={d} onClick={()=>setDevice(d)} className={'p-2 rounded-lg '+(device===d?'bg-indigo-500':'hover:bg-white/10')}><Icon size={18}/></button>)}</div></div><div className="p-4 md:p-9 bg-[#0d1221] flex justify-center"><div style={{width:device==='mobile'?320:device==='tablet'?580:'100%',maxWidth:'100%'}} className="bg-[#171e30] rounded-2xl border border-slate-700 transition-all"><DemoPreview id={demo} duration={duration} replay={replay}/></div></div><div className="p-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3"><label className="text-sm">Duration: {duration.toFixed(1)}s<input aria-label="Duration" className="block mt-2 accent-indigo-500 w-44" type="range" min=".3" max="2" step=".1" value={duration} onChange={e=>setDuration(Number(e.target.value))}/></label><button className="chip flex gap-2 items-center" onClick={()=>setReplay(n=>n+1)}><RotateCcw size={16}/> Replay</button></div></div>
 <div className="panel overflow-hidden"><div className="p-4 border-b border-slate-800 flex justify-between items-center"><h3 className="font-bold">Example Code</h3><button className="chip flex gap-2 items-center text-sm" onClick={()=>void copy()}><Copy size={16}/>{copied?'Copied':'Copy code'}</button></div><pre className="p-5 text-xs md:text-sm text-indigo-200 overflow-auto"><code>{snippets[demo]}</code></pre><p className="muted text-xs px-5 pb-4">Curated snippets only. Arbitrary code execution is disabled for safety.</p></div>
 </section></main><CheckboxShowcase /><MenuShowcase /></div>
}
