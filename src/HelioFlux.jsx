import { useState, useEffect, useRef } from "react";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Space Grotesk', sans-serif; background: #022C22; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #022C22; }
  ::-webkit-scrollbar-thumb { background: #22C55E; border-radius: 3px; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes bounceY { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
`;

const SG = { fontFamily: "'Space Grotesk', sans-serif" };

const GradientText = ({ children }) => (
  <span style={{ background:"linear-gradient(90deg,#22C55E,#A3E635)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
    {children}
  </span>
);

const Glass = ({ children, style={}, onClick, onMouseEnter, onMouseLeave }) => (
  <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    style={{ background:"rgba(6,95,70,0.45)", backdropFilter:"blur(16px)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:24, boxShadow:"0 10px 30px rgba(0,0,0,0.3)", ...style }}>
    {children}
  </div>
);

const useInView = (threshold=0.15) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
};

const useCountUp = (target, duration=2000, go=false) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const tick = ts => { if(!t0) t0=ts; const p=Math.min((ts-t0)/duration,1); setN(Math.floor(p*target)); if(p<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [target, duration, go]);
  return n;
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = id => document.getElementById(id.toLowerCase().replace(/\s+/g,"-"))?.scrollIntoView({behavior:"smooth"});
  const links = ["How It Works","Energy Flow","Performance","Features","Mission","Contact"];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, transition:"all .4s", background:scrolled?"rgba(2,44,34,0.93)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(34,197,94,0.15)":"none" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#22C55E,#A3E635)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#022C22" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          </div>
          <span style={{ ...SG, color:"#fff", fontWeight:700, fontSize:20 }}>Helio<GradientText>Flux</GradientText></span>
        </div>
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          {links.map(l => (
            <button key={l} onClick={()=>go(l)} style={{ ...SG, background:"none", border:"none", cursor:"pointer", color:"#86efac", fontSize:13, padding:0, transition:"color .2s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="#86efac"}>
              {l}
            </button>
          ))}
        </div>
        <a
  href="/HelioFlux.pdf"
  download="HelioFlux.pdf"
  style={{
    ...SG,
    display:"flex",
    alignItems:"center",
    gap:6,
    padding:"8px 16px",
    borderRadius:999,
    fontSize:13,
    cursor:"pointer",
    background:"rgba(255,255,255,0.08)",
    border:"1px solid rgba(255,255,255,0.18)",
    color:"#ECFDF5",
    transition:"all .3s",
    fontWeight:500,
    whiteSpace:"nowrap",
    textDecoration:"none"
  }}
  onMouseEnter={e=>{
    e.currentTarget.style.background="linear-gradient(90deg,#22C55E,#A3E635)";
    e.currentTarget.style.color="#022C22";
    e.currentTarget.style.boxShadow="0 0 20px rgba(163,230,53,0.5)";
    e.currentTarget.style.transform="scale(1.05)";
  }}
  onMouseLeave={e=>{
    e.currentTarget.style.background="rgba(255,255,255,0.08)";
    e.currentTarget.style.color="#ECFDF5";
    e.currentTarget.style.boxShadow="none";
    e.currentTarget.style.transform="scale(1)";
  }}
>
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
  Download Brochure
</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", background:"linear-gradient(135deg,#022C22 0%,#064E3B 60%,#022C22 100%)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", width:600, height:600, top:"-10%", right:"-8%", borderRadius:"50%", background:"radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%)", animation:"pulse 6s ease-in-out infinite", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", width:400, height:400, bottom:"5%", left:"-5%", borderRadius:"50%", background:"radial-gradient(circle,rgba(74,222,128,0.08) 0%,transparent 70%)", animation:"pulse 8s ease-in-out infinite 2s", pointerEvents:"none" }}/>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.05, pointerEvents:"none" }}>
        <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="#22C55E" strokeWidth=".5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
      </svg>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"110px 24px 60px", width:"100%", position:"relative", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
        <div style={{ animation:"fadeInUp .9s ease both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:999, background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", marginBottom:24 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#4ADE80", animation:"pulse 2s infinite", display:"inline-block", flexShrink:0 }}/>
            <span style={{ ...SG, color:"#4ADE80", fontSize:12, fontWeight:500 }}>Next-Gen Solar EV Technology</span>
          </div>
          <h1 style={{ ...SG, fontSize:"clamp(38px,5vw,74px)", fontWeight:700, color:"#ECFDF5", lineHeight:1.1, marginBottom:20 }}>
            Power Your EV<br/>
            <GradientText>Anywhere</GradientText> Under<br/>
            The Sun
          </h1>
          <p style={{ ...SG, fontSize:17, color:"rgba(236,253,245,0.7)", lineHeight:1.7, marginBottom:36, maxWidth:480 }}>
            HelioFlux delivers portable, off-grid solar charging for electric vehicles — 300W of clean energy, 30–50% EV charge from a single session, zero emissions.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:40 }}>
            <button style={{ ...SG, padding:"14px 32px", borderRadius:999, border:"none", cursor:"pointer", background:"linear-gradient(90deg,#22C55E,#A3E635)", color:"#022C22", fontWeight:700, fontSize:15, boxShadow:"0 0 30px rgba(34,197,94,0.5)", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 50px rgba(34,197,94,0.8)";e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 30px rgba(34,197,94,0.5)";e.currentTarget.style.transform="translateY(0)"}}>
              Get Started →
            </button>
            <button style={{ ...SG, padding:"14px 32px", borderRadius:999, border:"1px solid rgba(255,255,255,0.22)", cursor:"pointer", background:"rgba(255,255,255,0.06)", color:"#ECFDF5", fontWeight:600, fontSize:15, transition:"all .3s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
              onClick={()=>document.getElementById("how-it-works")?.scrollIntoView({behavior:"smooth"})}>
              Learn More
            </button>
          </div>
          <div style={{ display:"flex", gap:36 }}>
            {[["300W","Solar Output"],["12 kg","Total Weight"],["1 kWh","Energy Storage"]].map(([v,l])=>(
              <div key={l}>
                <div style={{ ...SG, fontSize:22, fontWeight:700, color:"#4ADE80" }}>{v}</div>
                <div style={{ ...SG, fontSize:12, color:"rgba(236,253,245,0.5)", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"center", animation:"fadeInUp .9s ease .2s both" }}>
          <div style={{ position:"relative", animation:"float 5s ease-in-out infinite" }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"radial-gradient(circle,rgba(34,197,94,0.3) 0%,transparent 70%)", filter:"blur(40px)", transform:"scale(1.4)" }}/>
            <Glass style={{ width:310, height:310, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", padding:28, position:"relative" }}>
              <svg width="190" height="190" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="30" stroke="#A3E635" strokeWidth="2.5"/>
                <circle cx="100" cy="100" r="20" fill="rgba(163,230,53,0.2)"/>
                {[0,45,90,135,180,225,270,315].map((d,i)=>(
                  <line key={i} x1={100+45*Math.cos(d*Math.PI/180)} y1={100+45*Math.sin(d*Math.PI/180)} x2={100+56*Math.cos(d*Math.PI/180)} y2={100+56*Math.sin(d*Math.PI/180)} stroke="#A3E635" strokeWidth="2" strokeLinecap="round"/>
                ))}
                <rect x="14" y="130" width="62" height="38" rx="4" fill="rgba(6,95,70,0.8)" stroke="#22C55E" strokeWidth="1.5"/>
                <line x1="34" y1="130" x2="34" y2="168" stroke="#22C55E" strokeWidth=".8" opacity=".5"/>
                <line x1="54" y1="130" x2="54" y2="168" stroke="#22C55E" strokeWidth=".8" opacity=".5"/>
                <line x1="14" y1="148" x2="76" y2="148" stroke="#22C55E" strokeWidth=".8" opacity=".5"/>
                <rect x="80" y="138" width="40" height="28" rx="4" fill="rgba(6,95,70,0.8)" stroke="#4ADE80" strokeWidth="1.5"/>
                <rect x="96" y="134" width="8" height="5" rx="1" fill="#4ADE80"/>
                <rect x="84" y="143" width="20" height="14" rx="2" fill="rgba(74,222,128,0.25)"/>
                <rect x="124" y="128" width="62" height="36" rx="8" fill="rgba(6,95,70,0.8)" stroke="#22C55E" strokeWidth="1.5"/>
                <rect x="131" y="121" width="42" height="14" rx="5" fill="rgba(6,95,70,0.6)" stroke="#22C55E" strokeWidth="1.5"/>
                <circle cx="140" cy="166" r="7" fill="#022C22" stroke="#22C55E" strokeWidth="1.5"/>
                <circle cx="170" cy="166" r="7" fill="#022C22" stroke="#22C55E" strokeWidth="1.5"/>
                <line x1="121" y1="150" x2="128" y2="150" stroke="#A3E635" strokeWidth="2" strokeDasharray="4 2"/>
                <polygon points="128,147 133,150 128,153" fill="#A3E635" opacity=".8"/>
              </svg>
              <p style={{ ...SG, fontSize:12, color:"rgba(74,222,128,0.8)", marginTop:6 }}>Solar → Storage → EV</p>
            </Glass>
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:28, left:"50%", animation:"bounceY 2s infinite" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(74,222,128,0.6)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <style>{`@media(max-width:768px){#hero>div{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
}

const STEPS=[
  {icon:"☀️",title:"Solar Capture",desc:"High-efficiency panels absorb sunlight at 300W peak output.",color:"#A3E635"},
  {icon:"⚡",title:"MPPT Control",desc:"Smart tracking optimizes energy extraction in real-time.",color:"#22C55E"},
  {icon:"🔋",title:"Energy Storage",desc:"1 kWh lithium-ion battery stores converted solar energy safely.",color:"#4ADE80"},
  {icon:"🔄",title:"Power Conversion",desc:"Pure sine wave inverter converts DC to AC at 95%+ efficiency.",color:"#A3E635"},
  {icon:"🚗",title:"EV Charging",desc:"Universal J1772 connector delivers 30–50% charge to any EV.",color:"#22C55E"},
];

function HowItWorks() {
  const [ref, vis] = useInView();
  const [hov, setHov] = useState(null);
  return (
    <section ref={ref} id="how-it-works" style={{ padding:"96px 0", background:"#022C22" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:56, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .7s" }}>
          <p style={{ ...SG, color:"#4ADE80", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>The Process</p>
          <h2 style={{ ...SG, fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#ECFDF5" }}>How <GradientText>HelioFlux</GradientText> Works</h2>
          <p style={{ ...SG, color:"rgba(236,253,245,0.6)", marginTop:12, maxWidth:440, margin:"12px auto 0" }}>Five intelligent stages transform raw sunlight into clean EV power.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, position:"relative" }}>
          <div style={{ position:"absolute", top:60, left:"5%", right:"5%", height:1, background:"linear-gradient(90deg,transparent,#22C55E,#A3E635,#22C55E,transparent)", pointerEvents:"none" }}/>
          {STEPS.map((s,i)=>(
            <Glass key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{ padding:18, display:"flex", flexDirection:"column", alignItems:"center", gap:10, cursor:"default", opacity:vis?1:0, transform:vis?(hov===i?"translateY(-12px)":"translateY(0)"):"translateY(30px)", transition:`opacity .6s ${i*.1}s, transform .3s`, boxShadow:hov===i?`0 25px 50px rgba(0,0,0,0.4),0 0 30px ${s.color}40`:"0 10px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ width:50, height:50, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, background:`${s.color}20`, border:`1px solid ${s.color}40`, flexShrink:0 }}>{s.icon}</div>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#22C55E,#A3E635)", display:"flex", alignItems:"center", justifyContent:"center", ...SG, fontSize:11, fontWeight:700, color:"#022C22" }}>{i+1}</div>
              <h3 style={{ ...SG, color:"#ECFDF5", fontWeight:600, fontSize:13, textAlign:"center" }}>{s.title}</h3>
              <p style={{ ...SG, color:"rgba(236,253,245,0.6)", fontSize:11, textAlign:"center", lineHeight:1.55 }}>{s.desc}</p>
            </Glass>
          ))}
        </div>
        <style>{`@media(max-width:900px){#how-it-works>div>div:last-child{grid-template-columns:1fr 1fr !important}}`}</style>
      </div>
    </section>
  );
}

const NODES=["Solar Panel","MPPT Controller","Battery Pack","Inverter","EV Charger"];
const EICONS=["☀️","⚡","🔋","🔄","🚗"];

function EnergyFlow() {
  const [ref, vis] = useInView();
  const [active, setActive] = useState(null);
  const [fi, setFi] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const tmr = useRef(null);
  const play = () => {
    setPlaying(true); setFi(0); let i=0;
    tmr.current = setInterval(()=>{ i++; if(i>=NODES.length){clearInterval(tmr.current);setPlaying(false);setFi(-1);}else setFi(i); }, 700);
  };
  useEffect(()=>()=>clearInterval(tmr.current),[]);
  return (
    <section ref={ref} id="energy-flow" style={{ padding:"96px 0", background:"linear-gradient(180deg,#022C22,#064E3B)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:56, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .7s" }}>
          <p style={{ ...SG, color:"#4ADE80", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>System Architecture</p>
          <h2 style={{ ...SG, fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#ECFDF5" }}><GradientText>Energy Flow</GradientText> Diagram</h2>
        </div>
        <Glass style={{ padding:"36px 28px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            {NODES.map((n,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", width:100 }}>
                  <div style={{ width:60, height:60, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, background:active===i||fi===i?"linear-gradient(135deg,rgba(34,197,94,0.4),rgba(163,230,53,0.2))":"rgba(6,95,70,0.6)", border:active===i||fi===i?"2px solid #22C55E":"1px solid rgba(34,197,94,0.2)", boxShadow:active===i||fi===i?"0 0 24px rgba(34,197,94,0.5)":"none", transform:active===i||fi===i?"scale(1.1)":"scale(1)", transition:"all .3s" }}>{EICONS[i]}</div>
                  <span style={{ ...SG, fontSize:11, textAlign:"center", color:active===i||fi===i?"#4ADE80":"rgba(236,253,245,0.6)", transition:"color .3s" }}>{n}</span>
                </div>
                {i<NODES.length-1&&(
                  <div style={{ display:"flex", gap:4 }}>
                    {[0,1,2].map(d=>(
                      <div key={d} style={{ width:8, height:8, borderRadius:"50%", background:fi>i?"#22C55E":"rgba(34,197,94,0.25)", boxShadow:fi>i?"0 0 6px #22C55E":"none", transition:`all .3s ${d*.1}s` }}/>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:32 }}>
            <button disabled={playing} onClick={play} style={{ ...SG, padding:"12px 32px", borderRadius:999, border:"none", cursor:playing?"not-allowed":"pointer", background:playing?"rgba(34,197,94,0.2)":"linear-gradient(90deg,#22C55E,#A3E635)", color:playing?"#4ADE80":"#022C22", fontWeight:700, fontSize:14 }}>
              {playing?"⏳ Simulating…":"▶  Play Simulation"}
            </button>
          </div>
        </Glass>
      </div>
    </section>
  );
}

const COMPS=[
  {name:"Solar Panel Array",spec:"300W Monocrystalline",icon:"☀️"},
  {name:"MPPT Controller",spec:"40A Smart Tracking",icon:"⚡"},
  {name:"Lithium Battery",spec:"1 kWh · 48V System",icon:"🔋"},
  {name:"Sine Wave Inverter",spec:"2000W Pure Output",icon:"🔄"},
];
function Prototype() {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} id="prototype" style={{ padding:"96px 0", background:"#ECFDF5" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
        <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-40px)", transition:"all .8s" }}>
          <p style={{ ...SG, color:"#064E3B", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:600, marginBottom:12 }}>Engineering</p>
          <h2 style={{ ...SG, fontSize:"clamp(24px,3.5vw,44px)", fontWeight:700, color:"#022C22", marginBottom:18, lineHeight:1.15 }}>
            Precision-Built<br/>
            <span style={{ background:"linear-gradient(90deg,#22C55E,#064E3B)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Prototype Design</span>
          </h2>
          <p style={{ ...SG, color:"#064E3B", lineHeight:1.7, marginBottom:28 }}>Every component of HelioFlux has been engineered for maximum efficiency and portability. The modular structure allows easy assembly and disassembly for on-the-go charging.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {COMPS.map((c,i)=>(
              <div key={i} style={{ padding:14, borderRadius:16, display:"flex", alignItems:"center", gap:10, background:"white", boxShadow:"0 4px 20px rgba(2,44,34,0.08)", border:"1px solid rgba(34,197,94,0.2)", transition:"all .3s", cursor:"default" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(2,44,34,0.15)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(2,44,34,0.08)"}}>
                <div style={{ width:40, height:40, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, background:"rgba(34,197,94,0.1)", flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ ...SG, fontWeight:600, fontSize:13, color:"#022C22" }}>{c.name}</div>
                  <div style={{ ...SG, fontSize:11, color:"#064E3B", marginTop:2 }}>{c.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(40px)", transition:"all .8s .2s" }}>
          <div style={{ borderRadius:28, padding:40, background:"linear-gradient(135deg,#022C22,#064E3B)", boxShadow:"0 20px 60px rgba(2,44,34,0.3)", position:"relative", textAlign:"center", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, opacity:.1 }}>
              <svg width="100%" height="100%"><defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1" fill="#22C55E"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
            </div>
            <div style={{ position:"relative" }}>
              <div style={{ fontSize:68, marginBottom:16 }}>🌞</div>
              <h3 style={{ ...SG, fontWeight:700, fontSize:20, color:"#ECFDF5", marginBottom:22 }}>HelioFlux Unit</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                {[["12 kg","Weight"],["300W","Peak Power"],["IP65","Rating"]].map(([v,l])=>(
                  <div key={l} style={{ padding:14, borderRadius:14, background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.2)" }}>
                    <div style={{ ...SG, fontWeight:700, color:"#4ADE80", fontSize:18 }}>{v}</div>
                    <div style={{ ...SG, fontSize:11, color:"rgba(236,253,245,0.5)", marginTop:3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#prototype>div{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
}

function Bar({ label, value, max, unit, go }) {
  const [w, setW] = useState(0);
  useEffect(()=>{ if(go) setTimeout(()=>setW((value/max)*100),200); },[go]);
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ ...SG, fontSize:13, color:"#ECFDF5" }}>{label}</span>
        <span style={{ ...SG, fontSize:13, fontWeight:700, color:"#4ADE80" }}>{value}{unit}</span>
      </div>
      <div style={{ height:8, borderRadius:999, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:999, background:"linear-gradient(90deg,#22C55E,#A3E635)", width:`${w}%`, boxShadow:"0 0 10px rgba(34,197,94,0.5)", transition:"width 1.5s cubic-bezier(.4,0,.2,1)" }}/>
      </div>
    </div>
  );
}

function Performance() {
  const [ref, vis] = useInView();
  const charge = useCountUp(50,2000,vis);
  const wh = useCountUp(1000,2000,vis);
  const eff = useCountUp(95,2000,vis);
  const stats=[
    {v:`${charge}%`,l:"Max EV Charge",s:"single session",c:"#22C55E"},
    {v:`${wh}`,l:"Wh Stored",s:"per cycle",c:"#4ADE80"},
    {v:`${eff}%`,l:"Conversion",s:"inverter eff.",c:"#A3E635"},
    {v:"300W",l:"Peak Solar",s:"full sun",c:"#22C55E"},
    {v:"12 kg",l:"Weight",s:"portable",c:"#4ADE80"},
    {v:"J1772",l:"Connector",s:"universal",c:"#A3E635"},
  ];
  return (
    <section ref={ref} id="performance" style={{ padding:"96px 0", background:"#022C22" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:56, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .7s" }}>
          <p style={{ ...SG, color:"#4ADE80", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>Numbers That Matter</p>
          <h2 style={{ ...SG, fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#ECFDF5" }}>Real-World <GradientText>Performance</GradientText></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:36, alignItems:"center" }}>
          <Glass style={{ padding:32 }}>
            <h3 style={{ ...SG, color:"#ECFDF5", fontWeight:600, fontSize:17, marginBottom:24 }}>Performance Metrics</h3>
            <Bar label="EV Charge Range" value={50} max={100} unit="%" go={vis}/>
            <Bar label="Panel Efficiency" value={22} max={30} unit="%" go={vis}/>
            <Bar label="Inverter Efficiency" value={95} max={100} unit="%" go={vis}/>
            <Bar label="Battery Utilization" value={80} max={100} unit="%" go={vis}/>
            <Bar label="MPPT Accuracy" value={99} max={100} unit="%" go={vis}/>
          </Glass>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {stats.map((s,i)=>(
              <Glass key={i} style={{ padding:16, textAlign:"center", cursor:"default", transition:"all .3s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 20px 40px rgba(0,0,0,0.4),0 0 20px ${s.c}30`}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.3)"}}>
                <div style={{ ...SG, fontWeight:700, fontSize:20, color:s.c, marginBottom:4 }}>{s.v}</div>
                <div style={{ ...SG, fontSize:12, fontWeight:600, color:"#ECFDF5" }}>{s.l}</div>
                <div style={{ ...SG, fontSize:11, color:"rgba(236,253,245,0.4)", marginTop:2 }}>{s.s}</div>
              </Glass>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){#performance>div>div:last-child{grid-template-columns:1fr 1fr !important}#performance>div{grid-template-columns:1fr !important}}`}</style>
      </div>
    </section>
  );
}

const FEATS=[
  {icon:"🎒",title:"Portable Design",desc:"At just 12 kg, HelioFlux folds flat and fits in your trunk. Set up in minutes, anywhere.",tag:"Hardware"},
  {icon:"☀️",title:"Solar Powered",desc:"300W monocrystalline panels with 22% efficiency ensure maximum energy harvest in all conditions.",tag:"Energy"},
  {icon:"📱",title:"Smart Monitoring",desc:"Real-time app dashboard tracks energy flow, charge status, efficiency, and battery health via Bluetooth.",tag:"Software"},
  {icon:"🌱",title:"Zero Emissions",desc:"100% solar-powered. No fuel, no grid, no carbon footprint. Pure clean energy for your EV.",tag:"Eco"},
  {icon:"🆘",title:"Emergency Ready",desc:"Use as a backup power source for home devices or emergency EV charging anywhere, anytime.",tag:"Safety"},
  {icon:"🔌",title:"Universal Fit",desc:"J1772 standard connector works with all major EV brands — Tesla (adapter), Nissan, Chevy, BMW.",tag:"Compat."},
];
function Features() {
  const [ref, vis] = useInView();
  const [exp, setExp] = useState(null);
  return (
    <section ref={ref} id="features" style={{ padding:"96px 0", background:"linear-gradient(180deg,#064E3B,#022C22)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:56, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .7s" }}>
          <p style={{ ...SG, color:"#4ADE80", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>What You Get</p>
          <h2 style={{ ...SG, fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#ECFDF5" }}>Built-In <GradientText>Features</GradientText></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {FEATS.map((f,i)=>(
            <Glass key={i} onClick={()=>setExp(exp===i?null:i)}
              style={{ padding:22, cursor:"pointer", opacity:vis?1:0, transform:vis?(exp===i?"translateY(-10px)":"translateY(0)"):"translateY(30px)", transition:`opacity .6s ${i*.08}s, transform .3s`, boxShadow:exp===i?"0 25px 50px rgba(0,0,0,0.4),0 0 30px rgba(34,197,94,0.2)":"0 10px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div style={{ width:46, height:46, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.2)" }}>{f.icon}</div>
                <span style={{ ...SG, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:999, background:"rgba(163,230,53,0.12)", border:"1px solid rgba(163,230,53,0.2)", color:"#A3E635" }}>{f.tag}</span>
              </div>
              <h3 style={{ ...SG, color:"#ECFDF5", fontWeight:600, fontSize:15, marginBottom:7 }}>{f.title}</h3>
              <p style={{ ...SG, color:"rgba(236,253,245,0.6)", fontSize:13, lineHeight:1.6 }}>{f.desc}</p>
              <p style={{ ...SG, fontSize:12, color:"#4ADE80", marginTop:10 }}>{exp===i?"Hide ↑":"Learn more ↓"}</p>
              <div style={{ overflow:"hidden", maxHeight:exp===i?80:0, transition:"max-height .35s ease", marginTop:exp===i?8:0 }}>
                <div style={{ paddingTop:8, borderTop:"1px solid rgba(34,197,94,0.18)" }}>
                  <p style={{ ...SG, fontSize:12, color:"rgba(236,253,245,0.45)" }}>Engineered and validated with real-world testing across multiple climate zones and vehicle types.</p>
                </div>
              </div>
            </Glass>
          ))}
        </div>
        <style>{`@media(max-width:900px){#features>div>div:last-child{grid-template-columns:1fr 1fr !important}}@media(max-width:560px){#features>div>div:last-child{grid-template-columns:1fr !important}}`}</style>
      </div>
    </section>
  );
}

function Mission() {
  const [ref, vis] = useInView();
  const tons = useCountUp(2400,2200,vis);
  const users = useCountUp(10000,2200,vis);
  const countries = useCountUp(45,2200,vis);
  return (
    <section ref={ref} id="mission" style={{ padding:"96px 0", background:"#ECFDF5" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
        <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .8s" }}>
          <p style={{ ...SG, color:"#064E3B", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:600, marginBottom:12 }}>Our Purpose</p>
          <h2 style={{ ...SG, fontSize:"clamp(24px,3.5vw,44px)", fontWeight:700, color:"#022C22", marginBottom:18, lineHeight:1.15 }}>
            Driving a<br/>
            <span style={{ background:"linear-gradient(90deg,#22C55E,#064E3B)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Sustainable Future</span>
          </h2>
          <p style={{ ...SG, color:"#064E3B", lineHeight:1.7, marginBottom:26 }}>HelioFlux was born from a simple belief: clean energy should be accessible everywhere. We are eliminating range anxiety of remote EV travel by making solar charging as easy as parking in the sun.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[["🌿","Zero Emissions","100% solar powered"],["🆘","Emergency Ready","Power when grid fails"],["🔌","Universal Fit","All major EV brands"],["📱","App Connected","Real-time monitoring"]].map(([ic,lb,desc])=>(
              <div key={lb} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:14, borderRadius:16, background:"white", boxShadow:"0 4px 20px rgba(2,44,34,0.06)", border:"1px solid rgba(34,197,94,0.15)" }}>
                <span style={{ fontSize:20 }}>{ic}</span>
                <div>
                  <div style={{ ...SG, fontWeight:600, fontSize:13, color:"#022C22" }}>{lb}</div>
                  <div style={{ ...SG, fontSize:12, color:"#64748b" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .8s .2s" }}>
          <div style={{ borderRadius:28, padding:32, background:"linear-gradient(135deg,#022C22,#064E3B)", boxShadow:"0 20px 60px rgba(2,44,34,0.25)" }}>
            <h3 style={{ ...SG, fontWeight:600, color:"#ECFDF5", fontSize:18, textAlign:"center", marginBottom:24 }}>Impact So Far</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
              {[[`${tons.toLocaleString()}+`,"Tons CO2","avoided"],[`${users.toLocaleString()}+`,"EV Owners","served"],[`${countries}+`,"Countries","shipped"]].map(([v,l,s])=>(
                <div key={l} style={{ padding:14, borderRadius:14, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", textAlign:"center" }}>
                  <div style={{ ...SG, fontWeight:700, fontSize:20, color:"#4ADE80" }}>{v}</div>
                  <div style={{ ...SG, fontSize:12, color:"#ECFDF5", marginTop:4 }}>{l}</div>
                  <div style={{ ...SG, fontSize:11, color:"rgba(236,253,245,0.4)" }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:16, borderRadius:14, background:"rgba(163,230,53,0.1)", border:"1px solid rgba(163,230,53,0.2)", textAlign:"center" }}>
              <p style={{ ...SG, fontSize:13, fontStyle:"italic", color:"rgba(236,253,245,0.8)", lineHeight:1.5 }}>The future of mobility is not just electric — it is solar electric.</p>
              <p style={{ ...SG, fontSize:12, color:"#A3E635", marginTop:8 }}>— HelioFlux Team</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#mission>div{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
}

function Contact() {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({name:"",email:"",message:""});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = e => { e.preventDefault(); if(!form.name||!form.email||!form.message) return; setLoading(true); setTimeout(()=>{setLoading(false);setSent(true);},1500); };
  const iS = { ...SG, width:"100%", padding:"11px 14px", borderRadius:11, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(34,197,94,0.2)", color:"#ECFDF5", fontSize:14, outline:"none" };
  return (
    <section ref={ref} id="contact" style={{ padding:"96px 0", background:"linear-gradient(180deg,#022C22,#011a15)" }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:56, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .7s" }}>
          <p style={{ ...SG, color:"#4ADE80", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>Get In Touch</p>
          <h2 style={{ ...SG, fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#ECFDF5" }}>Ready to Go <GradientText>Solar?</GradientText></h2>
          <p style={{ ...SG, color:"rgba(236,253,245,0.6)", marginTop:12 }}>Reach out for pricing, partnerships, or any questions about HelioFlux.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:14, opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-40px)", transition:"all .8s" }}>
            {[["✉️","Email Us","hello@helioflux.io","mailto:hello@helioflux.io"],["📞","Call Us","+91 8547864450","tel:+18004354368"],["📍","Headquarters","Muttahtara, TVM 94105","#"]].map(([ic,lb,val,href])=>(
              <Glass key={lb} style={{ padding:18, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:46, height:46, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, background:"rgba(34,197,94,0.12)", flexShrink:0 }}>{ic}</div>
                <div>
                  <div style={{ ...SG, fontSize:11, color:"rgba(236,253,245,0.5)", marginBottom:2 }}>{lb}</div>
                  <a href={href} style={{ ...SG, color:"#4ADE80", fontWeight:500, fontSize:14, textDecoration:"none" }}>{val}</a>
                </div>
              </Glass>
            ))}
          </div>
          <Glass style={{ padding:28, opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(40px)", transition:"all .8s .2s" }}>
            {sent?(
              <div style={{ textAlign:"center", padding:"28px 0" }}>
                <div style={{ fontSize:52, marginBottom:14 }}>✅</div>
                <h3 style={{ ...SG, color:"#4ADE80", fontWeight:700, fontSize:20, marginBottom:8 }}>Message Sent!</h3>
                <p style={{ ...SG, color:"rgba(236,253,245,0.6)", fontSize:14 }}>We will get back to you within 24 hours.</p>
                <button onClick={()=>{setSent(false);setForm({name:"",email:"",message:""});}} style={{ ...SG, background:"none", border:"none", color:"#4ADE80", fontSize:13, cursor:"pointer", marginTop:18, textDecoration:"underline" }}>Send another message</button>
              </div>
            ):(
              <form onSubmit={submit}>
                <h3 style={{ ...SG, color:"#ECFDF5", fontWeight:600, fontSize:17, marginBottom:22 }}>Send a Message</h3>
                {[["name","Your Name","text","John Doe"],["email","Email Address","email","john@example.com"]].map(([k,lb,t,ph])=>(
                  <div key={k} style={{ marginBottom:14 }}>
                    <label style={{ ...SG, display:"block", fontSize:12, color:"rgba(236,253,245,0.6)", marginBottom:5 }}>{lb}</label>
                    <input style={iS} type={t} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                      onFocus={e=>{e.target.style.border="1px solid rgba(34,197,94,0.6)";e.target.style.boxShadow="0 0 0 3px rgba(34,197,94,0.1)"}}
                      onBlur={e=>{e.target.style.border="1px solid rgba(34,197,94,0.2)";e.target.style.boxShadow="none"}}/>
                  </div>
                ))}
                <div style={{ marginBottom:22 }}>
                  <label style={{ ...SG, display:"block", fontSize:12, color:"rgba(236,253,245,0.6)", marginBottom:5 }}>Message</label>
                  <textarea style={{ ...iS, resize:"none" }} rows={4} placeholder="Tell us about your EV and charging needs..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                    onFocus={e=>{e.target.style.border="1px solid rgba(34,197,94,0.6)";e.target.style.boxShadow="0 0 0 3px rgba(34,197,94,0.1)"}}
                    onBlur={e=>{e.target.style.border="1px solid rgba(34,197,94,0.2)";e.target.style.boxShadow="none"}}/>
                </div>
                <button type="submit" disabled={loading} style={{ ...SG, width:"100%", padding:"13px", borderRadius:13, border:"none", cursor:loading?"not-allowed":"pointer", background:loading?"rgba(34,197,94,0.3)":"linear-gradient(90deg,#22C55E,#A3E635)", color:loading?"#4ADE80":"#022C22", fontWeight:700, fontSize:15, transition:"all .3s" }}>
                  {loading?"Sending…":"Send Message →"}
                </button>
              </form>
            )}
          </Glass>
        </div>
        <style>{`@media(max-width:768px){#contact>div>div:last-child{grid-template-columns:1fr !important}}`}</style>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding:"32px 24px", background:"#011a15", borderTop:"1px solid rgba(34,197,94,0.1)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#22C55E,#A3E635)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#022C22" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          </div>
          <span style={{ ...SG, color:"#ECFDF5", fontWeight:700, fontSize:15 }}>HelioFlux</span>
        </div>
        <p style={{ ...SG, fontSize:12, color:"rgba(236,253,245,0.3)" }}>2025 HelioFlux. All rights reserved.</p>
        <div style={{ display:"flex", gap:22 }}>
          {["Privacy","Terms","Contact"].map(l=>(
            <a key={l} href="#" style={{ ...SG, fontSize:12, color:"rgba(74,222,128,0.6)", textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#4ADE80"} onMouseLeave={e=>e.currentTarget.style.color="rgba(74,222,128,0.6)"}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar />
      <Hero />
      <HowItWorks />
      <EnergyFlow />
      <Prototype />
      <Performance />
      <Features />
      <Mission />
      <Contact />
      <Footer />
    </>
  );
}