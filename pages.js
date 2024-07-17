const COUNTRIES=['br','fr','mx','us']
const CHARTS=['apple','spotify']
const VIEW=document.body

class Link{
  constructor(name,url){
    this.name=name
    this.url=url
  }
}

export var podcasts=[new Link('My feed','https://www.podchaser.com/myfeed'),
                      new Link('Trending episodes','https://www.podchaser.com/episodes/trending'),
                      new Link('Trending podcasts','https://www.podchaser.com/podcasts/trending?ranking_period=month'),]
export var generic=['audio-book','class','debate','interview','lecture','live music','podcast',]
export var hobbies=['battle report','history','lore','philosophy','role-playing session',]

function search(topics){
  let queries=[]
  for(let t of topics){
    let url=`https://www.youtube.com/results?search_query=${t.replaceAll(' ','+')}&sp=EgYIAhABGAI%253D#filter`
    queries.push(new Link(encase(t),url))
  }
  return queries
}

function create(text,tag){
  let e=document.createElement(tag)
  e.textContent=text
  VIEW.appendChild(e)
  return e
}

function generate(section,links){
  create(section,'h1')
  for(let l of links){
    let a=create(l.name,'a')
    a.href=l.url
    a.target='_blank'
  }
}

function encase(text){return text[0].toUpperCase()+text.slice(1).toLowerCase()}

export function setup(){
  for(let c of COUNTRIES) for(let chart of CHARTS)
    podcasts.push(new Link(`${encase(chart)} ${c.toUpperCase()} chart`,`https://www.podchaser.com/charts/${chart}/${c}/top%20podcasts`))
  generate('Podcasts',podcasts)
  generate('Generic videos',search(generic))
  generate('Hobby videos',search(hobbies))
}
