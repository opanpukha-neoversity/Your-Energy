import{a as x}from"./vendor-CK1Rzdhu.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const T="https://your-energy.b.goit.study/api/";class ${constructor(e=T){this.baseURL=e.replace(/\/$/,"")}async _get(e,s={}){try{return(await x.get(`${this.baseURL}${e}`,{params:s})).data}catch(r){throw console.error("GET error:",e,s,r),r}}async _patch(e,s){try{return(await x.patch(`${this.baseURL}${e}`,s)).data}catch(r){throw console.error("PATCH error:",e,s,r),r}}async _post(e,s){try{return(await x.post(`${this.baseURL}${e}`,s)).data}catch(r){throw console.error("POST error:",e,s,r),r}}async getExercises(e,s,r=1){return this._get("/exercises",{[e]:s,page:r,limit:10})}async getSearch(e,s,r,o=1){return(await this._get("/exercises",{[e]:s,keyword:r,page:o,limit:10})).results}async getExercisesById(e){return this._get(`/exercises/${e}`)}async getFilter(e,s=1){return this._get("/filters",{filter:e,page:s,limit:12})}async getQuote(){return this._get("/quote")}async patchRating(e,s){return this._patch(`/exercises/${e}/rating`,s)}async postSubscriptions(e){return this._post("/subscription",e)}}const d="/Your-Energy/assets/sprite-Da3IUN7k.svg",M="/Your-Energy/assets/no-image-exercise-Cg8E8yYC.jpg",F="/Your-Energy/assets/no-image-exercise@2x-DcDnhckO.jpg",m=document.querySelector(".js-list");m.addEventListener("click",O);function O(t){if(!t.target.closest(".js-remove-btn"))return;const e=t.target.closest(".js-remove-btn").getAttribute("data-id"),r=JSON.parse(localStorage.getItem("exerciseData")).filter(o=>o._id!==e);localStorage.setItem("exerciseData",JSON.stringify(r)),q()}function q(){const t=JSON.parse(localStorage.getItem("exerciseData"));if(t.length===0)m.innerHTML="",m.insertAdjacentHTML("beforeend",`
     <li class="favorites__empty">
            It appears that you haven't added any exercises to your favorites
            yet. To get started, you can add exercises that you like to your
            favorites for easier access in the future.
          </li>
    `);else{m.innerHTML="";const e=t.map(({_id:s,name:r,burnedCalories:o,bodyPart:a,target:i})=>`
      <li class="fav-filters__item-card">
        <div class="fav-card__wrap">
          <div class="fav-card__block-btn">
            <div class="fav-card__trash-btn-wrap">
              <p class="fav-card__badge">Workout</p>
              <button class="fav-card__btn js-remove-btn" data-id="${s}" type="button">
                <svg class="fav-card__btn-trash-svg" width="16" height="16">
                <use href="${d}#icon-trash"></use>
                </svg>
              </button>
            </div>
            <button class="fav-card__btn-start card__btn" data-id="${s}" type="button">Start
              <svg class="fav-card__btn-start-svg" width="16" height="16">
                 <use href="${d}#icon-arrow"></use>
              </svg>
            </button>
          </div>

          <div class="fav-card__title-wrap">
            <svg class="fav-card__title-svg" width="24" height="24">
              <use href="${d}#icon-running-stick-figure"></use>
            </svg>
            <h2 class="fav-card__title">${r}</h2>
          </div>

          <div class="fav-card__block-info">
            <p class="fav-card__text-info"><span>Burned calories:</span>${o}</p>
            <p class="fav-card__text-info"><span>Body part:</span>${a}</p>
            <p class="fav-card__text-info"><span>Target:</span>${i}</p>
          </div>
        </div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",e)}}const A=new $;let f=!1,L=null;const c=document.querySelector(".modal-exercises"),n=document.querySelector(".overlay"),B=document.querySelector(".js-list");B&&c&&n&&B.addEventListener("click",N);async function N(t){const e=t.target.closest(".card__btn");if(!e)return;const s=e.getAttribute("data-id");if(s)try{const r=await A.getExercisesById(s);L=s;const o=R(r);H(o),j();const a=document.querySelector(".modal-exercises__btn-favorites"),i=document.querySelector(".modal-exercises__btn-close");a&&a.addEventListener("click",Y),i&&i.addEventListener("click",S)}catch(r){console.error("Failed to load exercise:",r)}}function j(){if(!c||!n)return;const t=window.innerWidth-document.body.offsetWidth+"px";c.classList.remove("hidden"),n.classList.remove("hidden"),document.body.style.paddingRight=t,document.body.style.overflow="hidden"}function S(){!c||!n||(c.classList.add("hidden"),n.classList.add("hidden"),document.body.style.paddingRight="0px",document.body.style.overflow="auto")}n&&n.addEventListener("click",t=>{t.target===n&&S()});document.addEventListener("keydown",t=>{t.key==="Escape"&&c&&!c.classList.contains("hidden")&&S()});function H(t){c&&(c.innerHTML=t,U())}function P(t){const e=Number.isFinite(t)?t:0,s=5,r="#EEA10C",o="#F4F4F4";let a="";for(let l=0;l<s;l++){const v=`starGradient-${l}-${e}`,g=l+1<=e?100:l<e?e%1*100:0,_=[{offset:"0%",color:r,opacity:"1"},{offset:`${g}%`,color:r,opacity:"1"},{offset:`${g+1}%`,color:o,opacity:"0.20"}],p=`
      <linearGradient id="${v}" x1="0%" y1="0%" x2="100%" y2="0%">
        ${_.map(h=>`<stop offset="${h.offset}" style="stop-color:${h.color};stop-opacity:${h.opacity}" />`).join("")}
      </linearGradient>
    `,y=`url(#${v})`;a+=`
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <defs>${p}</defs>
        <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="${y}" fill-opacity="1"/>
      </svg>
    `}return`${Number.isInteger(e)?`${e}.0`:e.toFixed(1)} ${a}`}function R({_id:t,bodyPart:e,equipment:s,gifUrl:r,name:o,target:a,description:i,rating:l,burnedCalories:v,time:g,popularity:_}){const p=P(l??0),y=J(r);return`
    <div class="modal-exercises__container" data-id="${t}">
      <button class="modal-exercises__btn-close" type="button">
        <svg width="24" height="24">
          <use href="${d}#icon-menu-mobile-close"></use>
        </svg>
      </button>

      <img
        class="modal-exercises__img"
        ${y}
        alt="Exercise image"
        loading="lazy"
      />

      <div class="modal-exercises__card">
        <h2 class="modal-exercises__name">${o}</h2>
        <div class="modal-exercises__rating">${p}</div>

        <div class="modal-exercises__block">
          <ul class="modal-exercises__list">
            <li class="modal-exercises__item">
              <h3 class="modal-exercises__subtitle">Target</h3>
              <p class="modal-exercises__text">${a}</p>
            </li>

            <li class="modal-exercises__item">
              <h3 class="modal-exercises__subtitle">Body Part</h3>
              <p class="modal-exercises__text">${e}</p>
            </li>

            <li class="modal-exercises__item">
              <h3 class="modal-exercises__subtitle">Equipment</h3>
              <p class="modal-exercises__text">${s}</p>
            </li>

            <li class="modal-exercises__item">
              <h3 class="modal-exercises__subtitle">Popular</h3>
              <p class="modal-exercises__text">${_}</p>
            </li>

            <li class="modal-exercises__item">
              <h3 class="modal-exercises__subtitle">Burned Calories</h3>
              <p class="modal-exercises__text">${v}/${g}</p>
            </li>
          </ul>
          <p class="modal-exercises__description">${i}</p>
        </div>
      </div>
    </div>

    <div class="modal-exercises__btn-container">
      <button
        class="modal-exercises__btn-favorites modal-exercises__btn"
        type="button"
        data-id="${t}"
      >
        ${E()}
      </button>

      <button
        class="modal-exercises__btn-rating modal-exercises__btn"
        type="button"
        data-id="${t}"
      >
        Give a rating
      </button>
    </div>
  `}function J(t){return t?`src="${t}"`:`
      src="${M}"
      srcset="${M} 1x, ${F} 2x"
    `}function G(){try{const t=localStorage.getItem("exerciseData");if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch(t){return console.error("Failed to parse favorites from localStorage",t),[]}}function U(){if(!L)return;const t=document.querySelector(".modal-exercises__btn-favorites");if(!t)return;G().some(s=>s._id===L)?(f=!0,t.innerHTML=C()):(f=!1,t.innerHTML=E())}function Y(){f=!f;const t=document.querySelector(".modal-exercises__btn-favorites");if(!t)return;const e=document.querySelector(".favorites__list");f?t.innerHTML=C():t.innerHTML=E(),e&&setTimeout(()=>{q()},100)}function E(){return`
    Add to favorites
    <svg class="btn-favorites__icon">
      <use href="${d}#icon-favorites"></use>
    </svg>
  `}function C(){return`
    Remove from favorites
    <svg class="btn-favorites__icon">
      <use href="${d}#icon-trash"></use>
    </svg>
  `}const Q=new $,W=document.querySelector(".modal-exercises");W.addEventListener("click",z);let u=JSON.parse(localStorage.getItem("exerciseData"))||[];async function z(t){if(t.target.closest(".modal-exercises__btn-favorites"))try{const e=t.target.closest(".modal-exercises__btn-favorites").getAttribute("data-id"),s=await Q.getExercisesById(e);u.some(r=>r._id===s._id)?u=u.filter(r=>r._id!==s._id):u.push(s),localStorage.setItem("exerciseData",JSON.stringify(u))}catch(e){console.log(e)}}document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("homeButton"),e=document.getElementById("favoritesButton");t.addEventListener("click",()=>{t.classList.add("active"),e.classList.remove("active")}),e.addEventListener("click",()=>{e.classList.add("active"),t.classList.remove("active")})});const V=document.querySelector(".js-open-menu"),K=document.querySelector(".js-close-menu"),D=document.querySelector("#mobile-menu"),w=document.querySelector("[data-menu-backdrop]"),Z=document.querySelectorAll(".menu__nav-link");function X(){D.classList.add("is-open"),w.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function k(){D.classList.remove("is-open"),w.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}V.addEventListener("click",()=>{X()});K.addEventListener("click",()=>{k()});w.addEventListener("click",()=>{k()});Z.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("href").substring(1),s=document.getElementById(e);s&&(s.scrollIntoView({behavior:"smooth"}),k())})});document.addEventListener("DOMContentLoaded",()=>{const t=window.location.pathname,e=document.getElementById("homeButton"),s=document.getElementById("favoritesButton");t.includes("index.html")?(e.classList.add("active"),e.addEventListener("click",b)):t.includes("favorites.html")?(s.classList.add("active"),s.addEventListener("click",b)):(e.classList.add("active"),e.addEventListener("click",b))});const b=t=>{const e=document.getElementById("homeButton"),s=document.getElementById("favoritesButton");t.currentTarget.classList.contains("active")&&t.preventDefault(),t.currentTarget===s&&e.classList.remove("active")},ee=document.querySelector(".js-quote"),te=new $;se();async function se(){const t=JSON.parse(localStorage.getItem("quoteDay")),s=new Date().toISOString().split("T")[0];if((t==null?void 0:t.currentDate)===s){I(t.data);return}try{const r=await te.getQuote(),o={data:r,currentDate:s};localStorage.setItem("quoteDay",JSON.stringify(o)),I(r)}catch(r){console.log(r)}}function I({author:t,quote:e}){ee.innerHTML=`
  <p class="quote__text">${e}</p>
  <h4 class="quote__author">${t}</h4>
    `}export{$ as A,d as i};
//# sourceMappingURL=quote-DYA0pEf7.js.map
