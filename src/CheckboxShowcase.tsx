import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Minus, RotateCcw } from 'lucide-react'

const spring = { type: 'spring' as const, stiffness: 390, damping: 26 }
const options = ['Call mom', 'Book flights', 'Buy milk']
const assets = ['Photos', 'Videos', 'Documents']
const shipping = [{ name: 'Standard', eta: '3–5 days' }, { name: 'Express', eta: 'Tomorrow' }, { name: 'Pickup', eta: 'Today' }]
const cards = [
  { id: 'Sunset', gradient: 'linear-gradient(150deg,#7c3aed,#f8a4bb)', emoji: '🌄' },
  { id: 'Ocean', gradient: 'linear-gradient(150deg,#084f91,#10b8ef)', emoji: '🌊' },
  { id: 'Garden', gradient: 'linear-gradient(150deg,#065f46,#3dd6a0)', emoji: '🌼' }
]
function Panel({number,title,description,children}:{number:number;title:string;description:string;children:React.ReactNode}){
 return <article className="rounded-[26px] border border-[#373048] bg-[#15121f] p-5 flex flex-col min-h-[310px]">
 <div className="flex-1 flex items-center justify-center py-5">{children}</div>
 <div className="flex items-baseline gap-3 mb-2"><span className="text-indigo-300 font-bold">{String(number).padStart(2,'0')}</span><h3 className="font-bold text-xl text-white">{title}</h3></div>
 <p className="text-sm text-[#b5aec9] bg-[#0c0b15] rounded-xl p-3 leading-relaxed">{description}</p>
 </article>
}
export default function CheckboxShowcase(){
 const [circle,setCircle]=useState(false)
 const [tasks,setTasks]=useState<string[]>([])
 const [selected,setSelected]=useState<string[]>(['Photos','Videos'])
 const [ship,setShip]=useState('Standard')
 const [card,setCard]=useState('Ocean')
 const [ink,setInk]=useState(false)
 const all=selected.length===assets.length
 const partial=selected.length>0&&!all
 function toggleTask(v:string){setTasks(old=>old.includes(v)?old.filter(x=>x!==v):[...old,v])}
 function toggleAsset(v:string){setSelected(old=>old.includes(v)?old.filter(x=>x!==v):[...old,v])}
 function reset(){setCircle(false);setTasks([]);setSelected(['Photos','Videos']);setShip('Standard');setCard('Ocean');setInk(false)}
 return <section id="checkbox-gallery" className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
 <div className="flex flex-wrap gap-4 justify-between items-end mb-6"><div><div className="text-xs tracking-[.3em] uppercase text-indigo-400 mb-2">Interactive collection / Part 01</div><h2 className="text-3xl md:text-5xl font-extrabold text-white">Checkbox <span className="text-indigo-400">Animations</span></h2><p className="text-[#a9a3bf] mt-2">Six working UI interactions inspired by your reference. Tap each one to test.</p></div><button onClick={reset} className="chip flex items-center gap-2 text-sm"><RotateCcw size={15}/> Reset all</button></div>
 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
 <Panel number={1} title="Circle to Check" description="Tap: the glowing ring unwinds and morphs into a check.">
 <button onClick={()=>setCircle(!circle)} className="flex items-center gap-5 text-left w-full max-w-xs" aria-label="Toggle watering task" aria-pressed={circle}>
 <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0 overflow-visible"><defs><linearGradient id="circle-ink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#aa56ff"/><stop offset="1" stopColor="#15bafc"/></linearGradient></defs><motion.circle cx="38" cy="38" r="24" fill="none" stroke="url(#circle-ink)" strokeWidth="6" strokeLinecap="round" animate={{pathLength:circle?0:1,opacity:circle?0:1,rotate:circle?180:0}} transition={{duration:.45}} style={{originX:'50%',originY:'50%'}}/><motion.path d="M18 38 L32 50 L59 24" fill="none" stroke="url(#circle-ink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{pathLength:circle?1:0,opacity:circle?1:0}} transition={{duration:.5,delay:circle?.13:0}}/></svg>
 <span><span className={'block font-semibold '+(circle?'text-slate-400 line-through':'text-white')}>Water the plants</span><span className="text-sm text-slate-500">Today · 9:00</span></span></button>
 </Panel>
 <Panel number={2} title="Strike & Sink" description="Check a task: it fades, strikes through and sinks to the bottom.">
 <div className="w-full max-w-xs space-y-2">{[...options].sort((a,b)=>Number(tasks.includes(a))-Number(tasks.includes(b))).map(item=><motion.button layout key={item} onClick={()=>toggleTask(item)} className={'w-full rounded-xl border px-3 py-2.5 flex gap-3 items-center text-left '+(tasks.includes(item)?'border-indigo-950 bg-[#191729] text-slate-500':'border-[#3c3652] bg-[#252035] text-white')} transition={spring}><motion.span animate={{backgroundColor:tasks.includes(item)?'#6656f3':'#242033'}} className="size-6 rounded-md border border-[#6c628c] flex items-center justify-center">{tasks.includes(item)&&<motion.span initial={{scale:0}} animate={{scale:1}}><Check size={17}/></motion.span>}</motion.span><span className={tasks.includes(item)?'line-through opacity-60':'font-medium'}>{item}</span></motion.button>)}</div>
 </Panel>
 <Panel number={3} title="Select All" description="Parent toggles partial, all and none. Child checks animate one by one.">
 <div className="w-full max-w-xs space-y-3"><button onClick={()=>setSelected(all?[]:assets)} className="flex gap-3 items-center w-full text-left font-semibold"><motion.span animate={{scale:all?1.12:1}} className="size-8 rounded-full border-2 border-indigo-400 flex items-center justify-center bg-indigo-500/20">{all?<Check size={18}/>:partial?<Minus size={18}/>:null}</motion.span>Select all <span className="ml-auto rounded-full bg-indigo-500/20 text-indigo-200 px-3 py-1 text-sm">{selected.length} / 3</span></button><div className="ml-4 border-l border-indigo-500/30 pl-6 space-y-3">{assets.map((name,i)=><button key={name} onClick={()=>toggleAsset(name)} className="flex gap-3 items-center w-full text-left"><motion.span animate={{backgroundColor:selected.includes(name)?'#655af2':'#15121f',scale:selected.includes(name)?1.08:1}} transition={{...spring,delay:all?i*.06:0}} className="size-6 rounded-md border border-indigo-400/60 flex items-center justify-center">{selected.includes(name)&&<Check size={16}/>}</motion.span><span className="text-sm">{name}</span><span className="ml-auto text-xs text-slate-500">{['1.2 GB','3.4 GB','0.8 GB'][i]}</span></button>)}</div></div>
 </Panel>
 <Panel number={4} title="Radio Slide" description="The selected dot springs between delivery options.">
 <div className="w-full max-w-xs space-y-2">{shipping.map(s=><button key={s.name} onClick={()=>setShip(s.name)} className={'w-full rounded-xl px-4 py-3 flex items-center gap-3 border '+(ship===s.name?'border-indigo-400 bg-indigo-500/25':'border-transparent bg-[#242035]')}><span className="size-7 rounded-full border-2 border-indigo-400 flex items-center justify-center">{ship===s.name&&<motion.span layoutId="radio-dot" transition={spring} className="size-4 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400"/>}</span><span className="font-medium">{s.name}</span><span className="ml-auto text-sm text-cyan-200">{s.eta}</span></button>)}</div>
 </Panel>
 <Panel number={5} title="Card Select" description="Tap an image: it shrinks slightly, the check pops and a gradient frame glows.">
 <div className="grid grid-cols-3 gap-2 w-full max-w-sm">{cards.map(c=><motion.button key={c.id} onClick={()=>setCard(c.id)} whileTap={{scale:.92}} animate={{scale:card===c.id ? 0.97 : 1}} className={'relative aspect-[.75] rounded-2xl p-1 border-2 '+(card===c.id?'border-cyan-400 shadow-[0_0_24px_#6655ff88]':'border-transparent')} aria-label={'Select '+c.id}><span className="flex w-full h-full items-center justify-center rounded-xl text-5xl" style={{background:c.gradient}}>{c.emoji}</span><span className="absolute top-2 right-2 size-6 rounded-full border-2 border-white/80 flex items-center justify-center bg-[#15121f]/40">{card===c.id&&<motion.span initial={{scale:0}} animate={{scale:1}} className="bg-indigo-500 rounded-full"><Check size={17}/></motion.span>}</span></motion.button>)}</div>
 </Panel>
 <Panel number={6} title="Ink Fill" description="Liquid color rises inside the checkbox, then a white tick draws in.">
 <button onClick={()=>setInk(!ink)} className="flex gap-5 items-center text-left" aria-pressed={ink}><span className="relative size-20 rounded-2xl border-2 border-indigo-400/80 overflow-hidden bg-[#25203a]"><motion.span initial={false} animate={{height:ink?'110%':'0%'}} transition={{duration:.65,ease:'easeInOut'}} className="absolute bottom-0 left-0 w-full bg-gradient-to-tr from-violet-600 via-blue-500 to-cyan-400 rounded-t-[40%]"/><svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80"><motion.path d="M18 41 L33 55 L63 25" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{pathLength:ink?1:0,opacity:ink?1:0}} transition={{duration:.4,delay:ink?.48:0}}/></svg></span><span className="font-semibold text-sm">Keep me signed in</span></button>
 </Panel>
 </div></section>
}
