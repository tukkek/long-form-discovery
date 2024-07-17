// ==UserScript==
// @name         Search filter
// @namespace    http://tampermonkey.net/
// @version      2024-05-15
// @match        https://www.youtube.com/results?search_query=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_registerMenuCommand
// ==/UserScript==
const TITLE=50

function remove(video){
  let t=video.querySelector('#video-title').textContent.trim()
  if(t.length>=TITLE) return true
  let u=t.toUpperCase()
  let count=0
  for(let i=0;i<t.length;i++) if(t[i]==u[i]) count+=1
  if(count>=t.length/2) return true
  var length=video.querySelector('ytd-thumbnail-overlay-time-status-renderer badge-shape')
  length=length.textContent.trim().split(':')
  if(length.length<3) return true
  let hours=Number(length[0])
  if(hours!=1&&hours!=2) return true
  return false
}

function filter(){
  let videos=Array.from(document.querySelectorAll('#contents>ytd-video-renderer'))
  console.log('tick',videos.length)
  for(let v of videos) try{
      if(remove(v)) v.remove()
  }catch(e){
      continue
  }
}

function start(){setInterval(filter,1000)}

if(document.location.toString().indexOf('#filter')>=0) start()
else GM_registerMenuCommand('Start filtering',start)
