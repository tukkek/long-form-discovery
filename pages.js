const COUNTRIES=['br','fr','mx','us']
const CHARTS=['apple','spotify']
const VIEW=document.body

class Link{
  constructor(name,url){
    this.name=name
    this.url=url
  }
}

export var podcasts=[new Link('Trending episodes','https://www.podchaser.com/episodes/trending'),
                      new Link('Trending podcasts','https://www.podchaser.com/podcasts/trending?ranking_period=month'),]
export var generic=['audio-book','class','debate','interview','lecture','live music','podcast',]
export var hobbies=['battle report','history','lore','philosophy','role-playing session',]
export var platforms=[new Link('Spotify episodes','https://open.spotify.com/collection/your-episodes'),
                      new Link('You Tube watch-later','https://www.youtube.com/playlist?list=WL'),
                      new Link('Amazon watch-list','https://www.primevideo.com/mystuff/watchlist'),
                      new Link('You Tube music library','https://music.youtube.com/library'),
                      new Link('Pod Chaser feed','https://www.podchaser.com/myfeed'),]

function search(topics){
  let queries=[]
  for(let t of topics){
    let url=`https://www.youtube.com/results?search_query=${t.replaceAll(' ','+')}&sp=EgYIAhABGAI%253D#filter`
    queries.push(new Link(encase(t),url))
  }
  return queries
}

function create(text,tag,parent=VIEW){
  let e=document.createElement(tag)
  e.textContent=text
  parent.appendChild(e)
  return e
}

function list(section,links){
  let d=create('','div')
  create(section,'h3',d)
  for(let l of links.sort((a,b)=>a.name.localeCompare(b.name))){
    let a=create(l.name,'a',d)
    a.href=l.url
    a.target='_blank'
  }
}

function encase(text){return text[0].toUpperCase()+text.slice(1).toLowerCase()}

export function setup(){
  for(let c of COUNTRIES) for(let chart of CHARTS)
    podcasts.push(new Link(`${encase(chart)} ${c.toUpperCase()} chart`,`https://www.podchaser.com/charts/${chart}/${c}/top%20podcasts`))
  list('Platform-specific',platforms)
  list('Podcasts',podcasts)
  list('Videos',search(generic))
  hobbies=search(hobbies)
  hobbies.push(new Link('New speed-runs','https://tukkek.github.io/new-speedruns/'))
  list('Videos (hobby)',hobbies)
}
