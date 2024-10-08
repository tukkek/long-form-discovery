// ==UserScript==
// @name         Top podcasts filter
// @namespace    http://tampermonkey.net/
// @version      2024-06-22
// @description  try to take over the world!
// @author       You
// @match        https://www.podchaser.com/charts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=podchaser.com
// @grant        GM_registerMenuCommand
// ==/UserScript==
const LONG=20

function validate(row){
    if(!row.querySelector('svg[data-icon="sparkles"]')) return false
    let title=row.querySelector('td:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)').textContent
    if(title.length>=LONG) return false
    return true
}

function filter(){
    let rows=document.querySelectorAll('.MuiTableBody-root tr')
    for(let r of rows) try{
        if(!validate(r)) r.remove()
    }catch(e){
        continue
    }
}

setInterval(filter,5000)
GM_registerMenuCommand('Filter',filter)
