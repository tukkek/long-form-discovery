const COUNTRIES=['br','fr','mx','us']
const CHARTS=['apple','spotify']
const VIEW=document.body
const LINK=document.querySelector('template#link').content.children[0]

class Link{
  constructor(name,url,year=0){
    this.name=name
    this.url=url
    this.year=year
  }
}

var podcasts=['Podcasts',new Link('Trending podcasts','https://www.podchaser.com/podcasts/trending?ranking_period=month'),]
var topics=['Videos',
            new Link('New speed-runs','https://tukkek.github.io/new-speedruns/'),]
var platforms=['Platform-specific',new Link('You Tube watch-later','https://www.youtube.com/playlist?list=WL'),
                      new Link('Amazon watch-list','https://www.primevideo.com/mystuff/watchlist'),
                      new Link('You Tube music library','https://music.youtube.com/library'),
                      new Link('Pod Chaser feed','https://www.podchaser.com/myfeed'),
                      new Link('Pod Chaser bookmarks','https://www.podchaser.com/profile/bookmarks/episodes'),]
var music=['Music',new Link('Sound Cloud','https://soundcloud.com/discover')]
var audiobooks=['Audio-books',new Link('Libri Vox','https://librivox.org/search?title=&author=&reader=&keywords=&genre_id=0&status=complete&project_type=either&recorded_language=&sort_order=catalog_date&search_page=1&search_form=advanced')]
var poetry=['Poetry',
              new Link('The Divine Comedy','https://www.gutenberg.org/files/8800/8800-h/8800-h.htm',1300),
              new Link('Tao Te Ching','https://sacred-texts.com/tao/taote.htm',-400),]
var categories=[music,platforms,podcasts,topics,audiobooks,poetry]

function search(topics){
  let queries=[]
  for(let t of topics){
    let link=t instanceof Link&&t
    if(!link){
      let name=encase(t)
      t=t.replaceAll(' ','+')
      let url=`https://www.youtube.com/results?search_query=${t}&sp=EgYIAhABGAI%253D#filter`
      link=new Link(name,url)
    }
    queries.push(link)
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
  links.sort((a,b)=>a.name.localeCompare(b.name))
  links.sort((a,b)=>a.year-b.year)
  for(let l of links){
    let view=LINK.cloneNode(true)
    let a=view.querySelector('a')
    a.textContent=l.name
    a.href=l.url
    a.target='_blank'
    a.onclick=()=>view.classList.add('visited')
    d.appendChild(view)
  }
}

function encase(text){return text[0].toUpperCase()+text.slice(1).toLowerCase()}

export function setup(){
  for(let c of COUNTRIES) for(let chart of CHARTS)
    podcasts.push(new Link(`${encase(chart)} ${c.toUpperCase()} chart`,`https://www.podchaser.com/charts/${chart}/${c}/top%20podcasts`))
  categories.sort((a,b)=>a[0].localeCompare(b[0]))
  for(let c of categories) list(c[0],search(c.slice(1)))
}
