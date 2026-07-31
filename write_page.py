import re

with open('parsed_body.txt', 'r', encoding='utf-8') as f:
    body = f.read()

with open('parsed_styles.txt', 'r', encoding='utf-8') as f:
    styles = f.read()

# Replace HTML comments
body = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', body)

# Fix <br> without slash (just in case)
body = re.sub(r'<br(?!\s*/)>', r'<br />', body)
body = re.sub(r'<hr(?!\s*/)>', r'<hr />', body)

# Replace class -> className (just to be absolutely sure)
body = body.replace('class=', 'className=')
body = body.replace('classNameName=', 'className=') # in case of double replacement

# Replace for= -> htmlFor=
body = body.replace(' for=', ' htmlFor=')

# Convert inline SVG `<svg ...>` to JSX compatible
body = re.sub(r'fill-rule', 'fillRule', body)
body = re.sub(r'clip-rule', 'clipRule', body)
body = re.sub(r'stroke-linecap', 'strokeLinecap', body)
body = re.sub(r'stroke-linejoin', 'strokeLinejoin', body)
body = re.sub(r'stroke-width', 'strokeWidth', body)

# Convert onclick to React onClick
body = re.sub(r'onclick="switchLine\(\'([^\']+)\',this\)"', r'onClick={() => setActiveLine("\1")}', body)

# Inject dynamic line active state
body = body.replace('id="line-daily" className="product-line grid sm:grid-cols-3 gap-6"', 'id="line-daily" className={`product-line grid sm:grid-cols-3 gap-6 ${activeLine === "daily" ? "" : "hidden"}`}')
body = body.replace('id="line-luxury" className="product-line hidden grid sm:grid-cols-3 gap-6"', 'id="line-luxury" className={`product-line grid sm:grid-cols-3 gap-6 ${activeLine === "luxury" ? "" : "hidden"}`}')
body = body.replace('id="line-gift" className="product-line hidden grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"', 'id="line-gift" className={`product-line grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto ${activeLine === "gift" ? "" : "hidden"}`}')

# Replace hardcoded buttons with dynamic class
daily_btn_search = r'<button className="line-tab active bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all" onClick=\{[^}]+\}>خط الاستهلاك اليومي</button>'
daily_btn_replace = r'<button className={`line-tab px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeLine === "daily" ? "bg-gray-900 text-white active" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`} onClick={() => setActiveLine("daily")}>خط الاستهلاك اليومي</button>'
body = re.sub(daily_btn_search, daily_btn_replace, body)

luxury_btn_search = r'<button className="line-tab bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-gray-200" onClick=\{[^}]+\}>خط الفخامة</button>'
luxury_btn_replace = r'<button className={`line-tab px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeLine === "luxury" ? "bg-gray-900 text-white active" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`} onClick={() => setActiveLine("luxury")}>خط الفخامة</button>'
body = re.sub(luxury_btn_search, luxury_btn_replace, body)

gift_btn_search = r'<button className="line-tab bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-gray-200" onClick=\{[^}]+\}>خط الهدايا</button>'
gift_btn_replace = r'<button className={`line-tab px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeLine === "gift" ? "bg-gray-900 text-white active" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`} onClick={() => setActiveLine("gift")}>خط الهدايا</button>'
body = re.sub(gift_btn_search, gift_btn_replace, body)

component = f'''"use client";
import React, {{ useState, useEffect }} from "react";
import Head from "next/head";
import Script from "next/script";

export default function AlAmeenCaseStudy() {{
    const [activeLine, setActiveLine] = useState("daily");

    useEffect(() => {{
        if (typeof window !== "undefined" && (window as any).lucide) {{
            (window as any).lucide.createIcons();
        }}

        const ro = new IntersectionObserver(e => {{ e.forEach(en => {{ if(en.isIntersecting){{ en.target.classList.add("vis"); ro.unobserve(en.target); }} }}); }}, {{rootMargin:"0px 0px -50px 0px",threshold:.1}});
        document.querySelectorAll(".sr,.sr-l,.sr-r,.sr-s").forEach(el => ro.observe(el));

        function animC(c:any,t:any,d:any){{ const s=performance.now(); (function u(n){{ const p=Math.min((n-s)/d,1), e=1-Math.pow(1-p,3); c.textContent=Math.round(t*e); if(p<1) requestAnimationFrame(u); else c.textContent=t; }})(s); }}
        const co = new IntersectionObserver(e => {{ e.forEach(en => {{ if(en.isIntersecting){{ animC(en.target,parseInt((en.target as any).dataset.target),2000); co.unobserve(en.target); }} }}); }}, {{threshold:.5}});
        document.querySelectorAll(".counter-w").forEach(el => co.observe(el));

        document.querySelectorAll(".scene").forEach(sc => {{
            const card = sc.querySelector(".tilt-card") as HTMLElement;
            if(!card) return;
            sc.addEventListener("mousemove", (e:any) => {{
                const r = sc.getBoundingClientRect(), x = e.clientX-r.left, y = e.clientY-r.top;
                const rx = ((y-r.height/2)/r.height/2)*-10, ry = ((x-r.width/2)/r.width/2)*10;
                card.style.transform = `perspective(1000px) rotateX(${{rx}}deg) rotateY(${{ry}}deg) translateZ(10px)`;
            }});
            sc.addEventListener("mouseleave", () => {{ card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"; }});
        }});

        const compSlider = document.getElementById("compSlider");
        const compBefore = document.getElementById("compBefore");
        const compBeforeImg = document.getElementById("compBeforeImg");
        const compHandle = document.getElementById("compHandle");
        let isDragging = false;

        if(compSlider && compBefore && compBeforeImg && compHandle) {{
            function updateSlider(x:any) {{
                if(!compSlider) return;
                const rect = compSlider.getBoundingClientRect();
                let pos = (rect.right - x) / rect.width * 100;
                pos = Math.max(5, Math.min(95, pos));
                compBefore!.style.width = pos + "%";
                compBeforeImg!.style.width = (rect.width / (pos/100)) + "px";
                compHandle!.style.right = `calc(${{pos}}% - 2px)`;
            }}

            compSlider.addEventListener("mousedown", (e:any) => {{ isDragging = true; updateSlider(e.clientX); }});
            window.addEventListener("mousemove", (e:any) => {{ if(isDragging) updateSlider(e.clientX); }});
            window.addEventListener("mouseup", () => {{ isDragging = false; }});
            compSlider.addEventListener("touchstart", (e:any) => {{ isDragging = true; updateSlider(e.touches[0].clientX); }}, {{passive:true}});
            window.addEventListener("touchmove", (e:any) => {{ if(isDragging) updateSlider(e.touches[0].clientX); }}, {{passive:true}});
            window.addEventListener("touchend", () => {{ isDragging = false; }});

            function initSlider() {{
                if(!compSlider) return;
                const rect = compSlider.getBoundingClientRect();
                compBeforeImg!.style.width = (rect.width / 0.5) + "px";
            }}
            initSlider();
            window.addEventListener("resize", initSlider);
        }}

        const navHandler = () => {{
            const navbar = document.getElementById("navbar");
            if(navbar) navbar.style.boxShadow = window.scrollY > 50 ? "0 4px 30px rgba(0,0,0,.08)" : "none";
        }};
        window.addEventListener("scroll", navHandler);

        document.querySelectorAll("a[href^='#']").forEach(a => {{
            a.addEventListener("click", function(this:any, e) {{
                if(this.getAttribute("href") === "#") return;
                e.preventDefault();
                const t = document.querySelector(this.getAttribute("href"));
                if(t) t.scrollIntoView({{behavior:"smooth",block:"start"}});
            }});
        }});

        return () => {{
            window.removeEventListener("scroll", navHandler);
        }};
    }}, [activeLine]); // added activeLine dependency so tilt re-attaches if needed on render

    return (
        <div className="bg-[#fafbfc] text-gray-900 overflow-x-hidden font-sans" dir="rtl">
            <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />
            <Script id="lucide-init" strategy="lazyOnload">
                {{`if(window.lucide) window.lucide.createIcons();`}}
            </Script>

            <style dangerouslySetInnerHTML={{{{__html: `{styles}`}}}} />

            {body}
        </div>
    );
}}
'''

with open('C:/Users/zahran/Documents/GitHub/tagstudio/app/lp/dates-packaging/page.tsx', 'w', encoding='utf-8') as f:
    f.write(component)
print('Done writing component!')
