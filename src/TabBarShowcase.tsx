import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Home, Search, Heart, UserRound, RotateCcw } from 'lucide-react'

type Tab = 0|1|2|3
const icons=[Home,Search,Heart,UserRound]
const names=['Home','Search','Likes','Profile']
const spring={type:'spring' as const,stiffness:420,damping:28}
function Panel({index,title,description,children}:{index:number;title:string;description:string;children:ReactNode}){
 return <article className="rounded-[26px] border border-[#373048] bg-[#15121f] p-3 sm:p-5 min-h-[260px] sm:min-h-[300px] flex flex-col">
 <div className="flex-1 min-h-[145px] sm:min-h-[172px] flex items-center justify-center overflow-hidden py-3">{children}</div>
 <div className="flex items-baseline gap-3 mb-2"><span className="text-indigo-300 font-bold">{String(index).padStart(2,'0')}</span><h3 className="text-base sm:text-xl font-bold">{title}</h3></div>
 <p className="bg-[#0c0b15] rounded-xl p-3 text-xs sm:text-sm text-[#b5aec9]">{description}</p>
 </article>
}
function TabButtons({value,onChange,kind}:{value:Tab;onChange:(n:Tab)=>void;kind:'dot'|'spotlight'|'ripple'|'jelly'|'badge'}){
 return <div className="relative w-full max-w-[310px] h-[68px] rounded-[20px] bg-[#252135] border border-[#403953] flex items-center p-1.5 shadow-xl overflow-hidden">
 {kind==='spotlight'&&<motion.div className="absolute top-0 bottom-0 w-1/4 pointer-events-none" animate={{left:`calc(${value*25}% + 0px)`}} transition={spring}><div className="h-full w-full bg-gradient-to-b from-cyan-200/45 via-sky-400/15 to-transparent [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)]"/><div className="absolute top-0 left-1/3 right-1/3 h-1 rounded-full bg-cyan-200 shadow-[0_0_12px_#8ce8ff]"/></motion.div>}
 {kind==='dot'&&<motion.div className="absolute bottom-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#27bbff] pointer-events-none" animate={{left:`calc(${value*25}% + 12.5% - 5px)`,y:[0,-17,0],scale:[1,.7,1]}} transition={{duration:.5,ease:'easeInOut'}}/>}
 {icons.map((Icon,i)=><button key={i} aria-label={names[i]} aria-pressed={value===i} onClick={()=>onChange(i as Tab)} className="relative flex-1 h-full flex justify-center items-center z-10">
 {kind==='ripple'&&value===i&&<motion.span layoutId="ripple-background" transition={spring} className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 overflow-hidden"><motion.span key={value} initial={{scale:0,opacity:.8}} animate={{scale:2,opacity:0}} transition={{duration:.6}} className="absolute inset-0 rounded-full bg-white/30"/></motion.span>}
 {kind==='jelly'?<motion.span key={value===i?'active-'+i:'inactive-'+i} initial={value===i?{scaleX:1.4,scaleY:.55,y:-13}:false} animate={{scaleX:1,scaleY:1,y:0}} transition={{type:'spring',stiffness:300,damping:10}}><Icon size={25} fill={value===i?'#5f83ff':'none'} className={value===i?'text-indigo-200':'text-slate-500'}/></motion.span>:<Icon size={25} className={value===i?'text-white':'text-[#85809e]'} strokeWidth={value===i?2.4:1.8}/>}
 {kind==='badge'&&i!==0&&<AnimatePresence>{value!==i&&<motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={{type:'spring',stiffness:420,damping:14}} className="absolute top-0 right-1 rounded-full bg-pink-500 min-w-5 h-5 px-1 text-[10px] font-bold flex items-center justify-center">{[0,1,5,2][i]}</motion.span>}</AnimatePresence>}
 {kind==='badge'&&value===i&&<motion.span layoutId="badge-underline" className="absolute bottom-0 h-1 w-7 rounded bg-gradient-to-r from-violet-500 to-cyan-400" transition={spring}/>}
 </button>)}
 </div>
}
function DemoTabs({kind}:{kind:'dot'|'spotlight'|'ripple'|'jelly'|'badge'}){const [tab,setTab]=useState<Tab>(0);return <TabButtons kind={kind} value={tab} onChange={setTab}/>}
function Worm(){const [tab,setTab]=useState(0);const tabs=['All','Music','Video','Live'];return <div className="w-full max-w-[310px] rounded-xl bg-[#252135] p-3"><div className="grid grid-cols-4 relative">{tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} className={'pb-3 text-xs font-semibold '+(tab===i?'text-white':'text-slate-400')}>{t}</button>)}<motion.div className="absolute bottom-1 h-[3px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_9px_#48aaff]" animate={{left:`${tab*25+6}%`,width:'13%'}} transition={{type:'spring',stiffness:260,damping:15}}/></div><div className="overflow-hidden"><motion.div animate={{x:`-${tab*100}%`}} transition={spring} className="flex">{tabs.map((t,i)=><div key={t} className="min-w-full flex gap-2"><div className="w-1/2 h-16 rounded-xl p-2 flex flex-col justify-end" style={{background:['#7862e8','#38bce4','#f0a94e','#db65a6'][i]}}><div className="h-1.5 w-3/4 bg-white/70 rounded mb-1"/><div className="h-1 w-1/2 bg-white/50 rounded"/></div><div className="w-1/2 h-16 rounded-xl bg-[#4b426d] p-2 flex flex-col justify-end"><div className="h-1.5 w-2/3 bg-white/30 rounded mb-1"/><div className="h-1 w-1/3 bg-white/20 rounded"/></div></div>)}</motion.div></div></div>}
export default function TabBarShowcase(){const [version,setVersion]=useState(0);return <section id="tabbar-gallery" className="max-w-7xl mx-auto px-4 md:px-8 pb-16"><div className="flex flex-wrap items-end justify-between gap-3 mb-6"><div><div className="text-xs uppercase tracking-[.3em] text-indigo-400 mb-2">Interactive collection / Part 03</div><h2 className="text-3xl md:text-5xl font-extrabold">Tab Bar <span className="text-indigo-400">Animations</span></h2><p className="text-[#a9a3bf] mt-2">Tap each tab to test six animated navigation patterns.</p></div><button onClick={()=>setVersion(v=>v+1)} className="chip flex items-center gap-2"><RotateCcw size={15}/> Reset all</button></div><div key={version} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
 <Panel index={1} title="Worm Underline" description="The glowing underline stretches toward the next tab as content slides."><Worm/></Panel>
 <Panel index={2} title="Hopping Dot" description="A glowing dot hops across the navigation bar and lands under the active icon."><DemoTabs kind="dot"/></Panel>
 <Panel index={3} title="Spotlight" description="A moving spotlight illuminates the selected tab."><DemoTabs kind="spotlight"/></Panel>
 <Panel index={4} title="Ripple Fill" description="A violet-to-cyan highlight springs into the selected tab."><DemoTabs kind="ripple"/></Panel>
 <Panel index={5} title="Jelly Icon" description="The active icon squashes, jumps and wobbles with spring physics."><DemoTabs kind="jelly"/></Panel>
 <Panel index={6} title="Badge Pop" description="Notification badges disappear when opened and pop back on other tabs."><DemoTabs kind="badge"/></Panel>
 </div></section>}
