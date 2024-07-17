// ==UserScript==
// @name         Trending episodes filter
// @namespace    http://tampermonkey.net/
// @version      2024-06-23
// @description  try to take over the world!
// @author       You
// @match        https://www.podchaser.com/episodes/trending
// @icon         https://www.google.com/s2/favicons?sz=64&domain=podchaser.com
// @grant        none
// ==/UserScript==
const DURATIONS=[1,2].map(d=>d+'h')
const LONG=70
const SKIP=[' & ','chapter','episode','#','pt.']

function validate(episode){
    let t=episode.querySelector('a[data-id="entity-card-title"]')
    t=t.textContent.toLowerCase()
    if(t.length>=LONG) return false
    for(let s of SKIP)
        if(t.indexOf(s)>=0) return false
    for(let d of DURATIONS) if(episode.textContent.indexOf(d)>=0)
        return true
    return false
}

function filter(){
    console.log('tick')
    let l=document.querySelector('div[data-id="episodes-list"]')
    if(!l) return
    for(let episode of l.children) if(!validate(episode))
        episode.remove()
}

setInterval(filter,1000)
