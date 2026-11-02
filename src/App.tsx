import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Blocks, CheckSquare, Menu, PanelsTopLeft, Search, Home, Grid2X2, ChevronRight, X, Smartphone, Monitor, Sparkles, ArrowUpRight } from 'lucide-react'
import BasicsShowcase from './BasicsShowcase'
import CheckboxShowcase from './CheckboxShowcase'
import MenuShowcase from './MenuShowcase'
import TabBarShowcase from './TabBarShowcase'

type Category='overview'|'basics'|'checkbox'|'menus'|'tabs'
const categories:{id:Category;name:string;short:string;count:number;description:string;icon:typeof Home;gradient:string}[]=[
 {id:'basics',name:'UI Essentials',short:'Essentials',count:6,description:'Buttons, cards, text and interactive effects',icon:Blocks,gradient:'from-indigo-600 to-violet-500'},
 {id:'checkbox',name:'Checkbox Animations',short:'Checkbox',count:6,description:'Animated selection and check states',icon:CheckSquare,gradient:'from-fuchsia-600 to-indigo-500'},
 {id:'menus',name:'Menu Animations',short:'Menus',count:6,description:'Drawers, dropdowns and reveal effects',icon:Menu,gradient:'from-cyan-600 to-blue-500'},
 {id:'tabs',name:'Tab Bar Animations',short:'Tab Bars',count:6,description:'Creative navigation and tab transitions',icon:PanelsTopLeft,gradient:'from-violet-600 to-cyan-500'}
]
const names:Record<Category,string>={overview:'Discover',basics:'UI Essentials',checkbox:'Checkbox Animations',menus:'Menu Animations',tabs:'Tab Bar Animations'}
const searchable=[
 {category:'basics' as Category,items:['Async Success Button','Spring Button','Floating 3D Card','Staggered Text','Sliding Toggle','Heart Pulse']},
 {category:'checkbox' as Category,items:['Circle to Check','Strike & Sink','Select All','Radio Slide','Card Select','Ink Fill']},
 {category:'menus' as Category,items:['Hamburger Morph','Side Drawer','FAB Fan','Bottom Sheet','Staggered Dropdown','Circle Reveal']},
 {category:'tabs' as Category,items:['Worm Underline','Hopping Dot','Spotlight','Ripple Fill','Jelly Icon','Badge Pop']}
]
export default function App(){
 const [active,setActive]=useState<Category>('overview')
 const [query,setQuery]=useState('')
 const [mobileMenu,setMobileMenu]=useState(false)
 const [preview,setPreview]=useState<'auto'|'mobile'|'desktop'>('auto')
 const results=useMemo(()=>searchable.flatMap(s=>s.items.filter(item=>item.toLowerCase().includes(query.toLowerCase())||names[s.category].toLowerCase().includes(query.toLowerCase())).map(item=>({item,category:s.category}))),[query])
 useEffect(()=>{function onKey(e:KeyboardEvent){if(e.key==='Escape'){setQuery('');setMobileMenu(false)}}window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[])
 function navigate(next:Category){setActive(next);setQuery('');setMobileMenu(false);window.scrollTo({top:0,behavior:'smooth'})}
 const nav=(id:Category,label:string,Icon:typeof Home,count?:number)=><button key={id} onClick={()=>navigate(id)} aria-current={active===id?'page':undefined} className={'w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors '+(active===id?'bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500/40':'text-slate-400 hover:bg-white/5 hover:text-white')}><Icon size={19}/><span className="font-medium">{label}</span>{count!==undefined&&<span className="ml-auto text-xs rounded-md bg-white/5 px-2 py-0.5">{count}</span>}</button>
 return <div className="min-h-screen bg-[#0b0d18] text-white">
 <div className="flex min-h-screen">
 <aside className="hidden lg:flex sticky top-0 h-screen w-[264px] shrink-0 flex-col border-r border-white/10 bg-[#101321] px-4 py-5">
 <button onClick={()=>navigate('overview')} className="flex items-center gap-3 px-2 mb-9 text-left"><div className="size-11 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_22px_#7366ff55]"><Sparkles size={23}/></div><span><strong className="block text-xl tracking-tight">MotionLab</strong><span className="text-xs text-slate-400">Animation playground</span></span></button>
 <div className="uppercase tracking-[.16em] text-[10px] font-bold text-slate-500 px-3 mb-3">Workspace</div><div className="space-y-1">{nav('overview','Discover',Home)}</div>
 <div className="uppercase tracking-[.16em] text-[10px] font-bold text-slate-500 px-3 mt-8 mb-3">Collections</div><div className="space-y-1">{categories.map(c=>nav(c.id,c.name,c.icon,c.count))}</div>
 <div className="mt-auto rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/15 to-cyan-500/5 p-4"><Sparkles className="text-indigo-300 mb-2" size={20}/><div className="font-semibold text-sm">Build. Test. Reuse.</div><p className="text-xs text-slate-400 mt-1">24 interactive UI animation examples ready to explore.</p></div>
 </aside>
 <div className="flex-1 min-w-0 pb-20 lg:pb-0">
 <header className="sticky top-0 z-40 bg-[#0b0d18]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-7 py-3"><div className="max-w-7xl mx-auto flex items-center gap-3">
 <button aria-label="Open navigation" onClick={()=>setMobileMenu(true)} className="lg:hidden p-2 rounded-xl bg-white/5"><Menu size={22}/></button>
 <div className="hidden sm:flex lg:hidden items-center gap-2 font-bold"><Sparkles size={18} className="text-indigo-400"/>MotionLab</div>
 <div className="relative flex-1 max-w-xl"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search animations..." aria-label="Search animations" className="w-full rounded-xl bg-[#1b2031] border border-white/10 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-500"/>{query&&<button aria-label="Clear search" onClick={()=>setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={16}/></button>}
 {query&&<div className="absolute top-full mt-2 left-0 right-0 max-h-80 overflow-auto rounded-2xl bg-[#1d2032] border border-white/15 shadow-2xl p-2 z-50">{results.length?results.map((r,i)=><button key={r.category+r.item+i} onClick={()=>navigate(r.category)} className="w-full flex justify-between gap-3 text-left p-3 rounded-xl hover:bg-white/10"><span className="text-sm">{r.item}</span><span className="text-xs text-indigo-300 shrink-0">{names[r.category]}</span></button>):<p className="p-4 text-sm text-slate-400">No animations found</p>}</div>}</div>
 <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300"><span className="size-2 rounded-full bg-emerald-400"/>24 Demos</span>
 </div></header>
 <main className="max-w-7xl mx-auto px-4 sm:px-7 py-6 sm:py-9">
 {active==='overview'?<><div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#29245a] via-[#1b2044] to-[#10394a] border border-indigo-400/20 p-6 sm:p-10 mb-9"><div className="absolute -top-24 -right-12 size-72 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"/><div className="relative"><span className="text-xs font-semibold tracking-widest uppercase text-cyan-300">Your creative workspace</span><h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3 max-w-2xl">Every interaction,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">one playground.</span></h1><p className="mt-4 max-w-lg text-slate-300 text-sm sm:text-base">Explore, test and reuse beautiful animated UI components across desktop and mobile.</p><button onClick={()=>navigate('basics')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-[#15162b] px-5 py-3 font-semibold text-sm hover:bg-indigo-100">Explore animations <ArrowUpRight size={17}/></button></div></div>
 <div className="flex justify-between items-center mb-5"><div><h2 className="text-2xl font-bold">Browse collections</h2><p className="text-sm text-slate-400 mt-1">Choose a category to open its interactive gallery</p></div><span className="text-xs text-slate-400">4 collections</span></div>
 <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{categories.map(c=><motion.button key={c.id} whileHover={{y:-5}} whileTap={{scale:.98}} onClick={()=>navigate(c.id)} className="text-left rounded-2xl border border-white/10 bg-[#171b2b] p-5 hover:border-indigo-400/50 transition-colors"><div className={'size-12 rounded-2xl bg-gradient-to-br '+c.gradient+' flex items-center justify-center mb-6'}><c.icon size={23}/></div><div className="flex items-center justify-between gap-2"><h3 className="font-bold">{c.name}</h3><ChevronRight size={17} className="text-slate-400"/></div><p className="text-xs text-slate-400 mt-2 min-h-9">{c.description}</p><div className="mt-4 text-xs font-semibold text-indigo-300">{c.count} animations</div></motion.button>)}</div>
 <div className="mt-9 rounded-2xl bg-[#171b2b] border border-white/10 p-5 flex flex-wrap gap-4 justify-between items-center"><div><div className="font-semibold">Built for every screen</div><p className="text-sm text-slate-400 mt-1">Responsive layouts and touch-friendly interactions.</p></div><div className="flex items-center gap-2 text-indigo-300"><Smartphone size={23}/><Monitor size={26}/></div></div></>:<>
 <div className="flex flex-wrap justify-between items-end gap-4 mb-6"><div><button onClick={()=>navigate('overview')} className="text-xs text-indigo-300 hover:text-white mb-3">← All collections</button><h1 className="text-2xl sm:text-4xl font-extrabold">{names[active]}</h1><p className="text-sm text-slate-400 mt-2">6 interactive demos · Tap or click to test each effect</p></div><div className="flex items-center gap-1 p-1 bg-[#1b2031] border border-white/10 rounded-xl">{([['auto',Grid2X2],['mobile',Smartphone],['desktop',Monitor]] as const).map(([value,Icon])=><button key={value} title={value} aria-label={value+' preview'} aria-pressed={preview===value} onClick={()=>setPreview(value)} className={'p-2.5 rounded-lg '+(preview===value?'bg-indigo-600':'text-slate-400 hover:text-white')}><Icon size={18}/></button>)}</div></div>
 <div className={preview==='mobile'?'max-w-[410px] mx-auto':preview==='desktop'?'max-w-full':'w-full'}>
 {active==='basics'&&<BasicsShowcase/>}
 {active==='checkbox'&&<CheckboxShowcase/>}
 {active==='menus'&&<MenuShowcase/>}
 {active==='tabs'&&<TabBarShowcase/>}
 </div>
 </>}
 </main>
 </div></div>
 <AnimatePresence>{mobileMenu&&<><motion.button aria-label="Close navigation" onClick={()=>setMobileMenu(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/70 lg:hidden"/><motion.aside initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}} transition={{type:'spring',stiffness:350,damping:32}} className="fixed inset-y-0 left-0 z-[60] w-[290px] max-w-[85vw] bg-[#141728] border-r border-white/10 p-5 lg:hidden"><div className="flex items-center justify-between mb-8"><strong className="text-xl">MotionLab</strong><button aria-label="Close navigation" onClick={()=>setMobileMenu(false)}><X/></button></div><div className="space-y-2">{nav('overview','Discover',Home)}{categories.map(c=>nav(c.id,c.name,c.icon,c.count))}</div></motion.aside></>}</AnimatePresence>
 <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/10 bg-[#121626]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"><div className="flex justify-around py-2">{([{id:'overview' as Category,name:'Home',icon:Home},...categories.map(c=>({id:c.id,name:c.short,icon:c.icon}))]).map(c=><button key={c.id} onClick={()=>navigate(c.id)} aria-label={c.name} aria-current={active===c.id?'page':undefined} className={'flex-1 flex flex-col items-center gap-1 py-1 text-[10px] '+(active===c.id?'text-indigo-300':'text-slate-400')}><c.icon size={20}/><span>{c.name}</span></button>)}</div></nav>
 </div>
}
