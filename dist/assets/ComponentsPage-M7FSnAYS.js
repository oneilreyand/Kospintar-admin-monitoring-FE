import{j as e,u as g,s as p}from"./index-CLYfH6wU.js";function m({title:a,children:r,className:t=""}){return e.jsxs("section",{className:`rounded-2xl border border-gray-200 bg-white ${t}`.trim(),children:[e.jsx("header",{className:"px-6 py-5",children:e.jsx("h3",{className:"text-base font-medium text-gray-800",children:a})}),e.jsx("div",{className:"border-t border-gray-100 px-6 py-6.5",children:r})]})}function h({name:a,token:r,value:t}){return e.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white p-4",children:[e.jsx("div",{className:"h-12 w-full rounded-lg border border-gray-200",style:{backgroundColor:t}}),e.jsxs("div",{className:"mt-3 space-y-1",children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:a}),e.jsx("p",{className:"text-xs text-gray-500",children:r}),e.jsx("p",{className:"text-xs text-gray-500",children:t})]})]})}const b=[{name:"Brand 500",token:"bg-brand-500",value:"#465fff"},{name:"Brand 600",token:"bg-brand-600",value:"#3641f5"},{name:"Gray 50",token:"bg-gray-50",value:"#f9fafb"},{name:"Gray 700",token:"text-gray-700",value:"#344054"},{name:"Success 500",token:"bg-success-500",value:"#12b76a"},{name:"Error 500",token:"bg-error-500",value:"#f04438"},{name:"Warning 500",token:"bg-warning-500",value:"#f79009"},{name:"Blue Light 500",token:"text-blue-light-500",value:"#0ba5ec"}];function y(){return e.jsxs(m,{title:"TailAdmin Palette (Scraped)",children:[e.jsx("p",{className:"mb-5 text-sm text-gray-500",children:"Token ini diambil dari `style.css` TailAdmin (marketing demo) dan dipakai ulang di Tailwind config project ini."}),e.jsx("div",{className:"grid gap-3 sm:grid-cols-2 lg:grid-cols-4",children:b.map(a=>e.jsx(h,{name:a.name,token:a.token,value:a.value},a.token))})]})}function n({children:a,variant:r="primary",size:t="md",leftIcon:s=null,rightIcon:i=null,className:x="",...u}){const d={md:"px-4 py-3",lg:"px-5 py-3.5"},l={primary:"bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600",secondary:"bg-white text-gray-700 shadow-theme-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"};return e.jsxs("button",{type:"button",className:`inline-flex items-center gap-2 rounded-lg text-sm font-medium transition ${d[t]||d.md} ${l[r]||l.primary} ${x}`.trim(),...u,children:[s,a,i]})}function f({code:a}){return e.jsx("pre",{className:"overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs leading-6 text-gray-700",children:e.jsx("code",{children:a})})}function o({title:a,summary:r,preview:t,code:s}){return e.jsxs(m,{title:a,children:[e.jsx("p",{className:"mb-5 text-sm text-gray-500",children:r}),e.jsxs("div",{className:"grid gap-5 xl:grid-cols-[1fr_1.15fr]",children:[e.jsx("div",{className:"rounded-xl border border-gray-200 bg-white p-5",children:t}),e.jsx(f,{code:s})]})]})}function c(){return e.jsx("svg",{className:"h-5 w-5 fill-current",viewBox:"0 0 20 20","aria-hidden":"true",children:e.jsx("path",{d:"M9.78 3.24a.5.5 0 0 1 .44 0l5.15 2.58-5.03 2.51a.74.74 0 0 1-.67 0L4.63 5.82zM3.7 7.03v6.38a.31.31 0 0 0 .17.28l5.38 2.7V9.78a2.6 2.6 0 0 1-.26-.11zm7.05 9.46v-6.7c.09-.03.18-.07.26-.11l5.29-2.65v6.38a.31.31 0 0 1-.17.28z"})})}const j=`import TailButton from '../components/atoms/TailButton';

function Example() {
  return (
    <div className="flex gap-3">
      <TailButton variant="primary">Primary</TailButton>
      <TailButton variant="secondary" size="lg">Secondary</TailButton>
      <TailButton variant="primary" leftIcon={<BoxIcon />}>
        With Icon
      </TailButton>
    </div>
  );
}`;function v(){return e.jsx(o,{title:"Button Components",summary:"Class utama ini disalin dari pola `buttons.html`: rounded-lg, `bg-brand-500`, `shadow-theme-xs`, dan variant secondary pakai ring gray.",preview:e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(n,{variant:"primary",children:"Button Text"}),e.jsx(n,{variant:"primary",size:"lg",children:"Button Text"}),e.jsx(n,{variant:"primary",leftIcon:e.jsx(c,{}),children:"Button Text"}),e.jsx(n,{variant:"secondary",children:"Button Text"}),e.jsx(n,{variant:"secondary",rightIcon:e.jsx(c,{}),children:"Button Text"})]}),code:j})}const k=`import TailCard from '../components/atoms/TailCard';
import TailButton from '../components/atoms/TailButton';

function ExampleCard() {
  return (
    <TailCard title="Card with Image">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-5 h-36 rounded-lg bg-gray-100" />
        <h4 className="mb-1 text-xl font-medium text-gray-800">Card title</h4>
        <p className="text-sm text-gray-500">Card body content</p>
        <div className="mt-4">
          <TailButton variant="primary">Read more</TailButton>
        </div>
      </div>
    </TailCard>
  );
}`;function C(){return e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white p-4",children:[e.jsx("div",{className:"mb-5 h-32 rounded-lg bg-gradient-to-r from-brand-100 to-brand-200"}),e.jsx("h4",{className:"mb-1 text-xl font-medium text-gray-800",children:"Card title"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}),e.jsx("div",{className:"mt-4",children:e.jsx(n,{variant:"primary",children:"Read more"})})]}),e.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white p-4",children:[e.jsx("div",{className:"mb-5 h-32 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300"}),e.jsx("h4",{className:"mb-1 text-xl font-medium text-gray-800",children:"Card title"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Pattern kartu horizontal/feature yang dipakai di TailAdmin."}),e.jsx("a",{href:"#",className:"mt-4 inline-flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600",children:"Card link"})]})]})}function N(){return e.jsx(o,{title:"Card Components",summary:"Struktur kartu mengikuti class kombinasi dari `cards.html`: wrapper rounded-2xl, card item rounded-xl, border gray, dan CTA `bg-brand-500`.",preview:e.jsx(C,{}),code:k})}const T=`import { useDispatch } from 'react-redux';
import TailButton from '../components/atoms/TailButton';
import { showSnackbar } from '../store/action/snackbar';

function Example() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap gap-3">
      <TailButton
        variant="primary"
        onClick={() =>
          dispatch(showSnackbar({
            title: 'Success',
            message: 'Data company berhasil diperbarui.',
            type: 'success',
            durationMs: 4200,
          }))
        }
      >
        Success
      </TailButton>
    </div>
  );
}`;function w(){const a=g(),r=t=>{const s={success:{title:"Success",message:"Aksi berhasil diproses dan disimpan."},error:{title:"Error",message:"Terjadi kendala saat memproses data. Coba lagi."},warning:{title:"Warning",message:"Ada data company yang butuh perhatian lanjutan."}},i=s[t]||s.success;a(p({...i,type:t,durationMs:4200}))};return e.jsx(o,{title:"Snackbar Components",summary:"Snackbar sudah mendukung animasi slide in/out, auto dismiss, dan varian warna `success`, `error`, `warning`.",preview:e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(n,{variant:"primary",onClick:()=>r("success"),children:"Trigger Success"}),e.jsx(n,{variant:"secondary",onClick:()=>r("warning"),children:"Trigger Warning"}),e.jsx("button",{type:"button",onClick:()=>r("error"),className:"inline-flex h-10 items-center justify-center rounded-lg border border-error-200 bg-error-50 px-4 text-sm font-semibold text-error-600 transition hover:bg-error-100",children:"Trigger Error"})]}),code:T})}function B(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("section",{className:"rounded-2xl border border-gray-200 bg-white px-6 py-6",children:[e.jsx("p",{className:"inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500",children:"Components Catalog"}),e.jsx("h1",{className:"mt-4 text-2xl font-semibold text-gray-900",children:"Scraped TailAdmin Components"}),e.jsx("p",{className:"mt-2 max-w-3xl text-sm text-gray-500",children:"Halaman ini berisi contoh komponen dan cara pakai yang disesuaikan dari hasil scrape URL TailAdmin marketing (`buttons.html`, `cards.html`, dan `style.css`)."})]}),e.jsx(y,{}),e.jsx(v,{}),e.jsx(N,{}),e.jsx(w,{})]})}function I(){return e.jsx(B,{})}export{I as default};
