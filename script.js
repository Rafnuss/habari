var fp = document.getElementById('fullpage');
var logo = document.getElementById('logo');

function addBackground(s){
    if ( s.background.includes('jpg')){
        if (screen.width > 1920 ){
            var imgroot = './assets/2560/';
        } else if (screen.width > 1366 ){
            var imgroot = './assets/1920/';
        } else if (screen.width > 812 ){
            var imgroot = './assets/1366/';
        } else if (screen.width > 640 ){
            var imgroot = './assets/812/';
        } else {
            var imgroot = './assets/640/';
        }
        var inner  = "<img class='img-bkg' src='./assets/20/"+s.background.replace(/ /g,"-")+"' data-src='"+imgroot+s.background.replace(/ /g,"-")+"'></img>";
    } else if ( s.background.includes('mp4') ){
        var inner  = '<video class="video-bkg" loop="" data-poster="./assets/loading.gif" preload="auto" data-autoplay="">\
            <source data-src="./assets/video/'+ s.background.replace(/ /g,"-") +'" type="video/mp4" />\
        </video>'
    }
    return inner
}

sections.forEach((s) => {
    var section = document.createElement('div');
    section.classList.add('section');
    
    if ("slides" in s && s.slides.length>0){
        s.slides.forEach((sl) => {
            var slide = document.createElement('div');
            slide.classList.add("slide");
            //if ("background_color" in sl) slide.style['background-color'] =  sl.background_color;
            if ("map" in sl) slide.innerHTML += "<div id='map'></div><div id='map-next'><i class='fas fa-lg fa-chevron-down'></i></div>"
            if ("caption" in sl) {
                slide.innerHTML += '<div class="caption"><i class="fas fa-lg caption-toggle fa-chevron-left"></i><div class="caption-content">'+sl.caption+'</div></div>';
            }
            if ("background" in sl) slide.innerHTML += addBackground(sl)
            
            section.appendChild(slide);
        })
    }
    
    fp.appendChild(section);
});

new fullpage('#fullpage', {
    licenseKey: 'ZA$W!BS!q3',
    anchors: sections.map(s=> s.id.replace(/\W/g,'_')),
    sectionsColor: sections.map(s=> s.color),
    //scrollBar:true,
    loopHorizontal:false,
    navigation:true,
    navigationPosition:'left',
    slidesNavigation:true,
    showActiveTooltip:true,
    navigationTooltips:sections.map(s=> s.id),
    verticalCentered: true,
    lazyload: false,
    onLeave: function(origin, destination, direction){
		if(origin.index == 0){
			logo.classList.remove("top");
		}

		if(destination.index == 0){
			logo.classList.add("top");
		}
    },
    normalScrollElements: '.caption, #map'
});

var a = new LazyLoad({
    thresholds: "100% 100%"
});

mapboxgl.accessToken = 'pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rafnuss/ck9kv605a07di1io13vgq4cos/draft',
    center: [39.988848,-3.378173],
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    scrollZoom: false,
});
map.addControl(new mapboxgl.NavigationControl());

map.scrollZoom.enable();

$('.caption-toggle').on('click', function(e) {
    console.log(e)
    if (e.target.classList.contains('fa-chevron-left')){
        $('.caption-content').hide("slide", { direction: "left" }, 1000);
        $('.caption-toggle').addClass('fa-chevron-right').removeClass('fa-chevron-left')
    } else {
        $('.caption-toggle').addClass('fa-chevron-left').removeClass('fa-chevron-right')
        $('.caption-content').show("slide", { direction: "left" }, 1000);
    }
    
});

$('#map-next').on('click',function(){
    fullpage_api.moveSectionDown();
})

window.onload=function(){
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        alert("Pour une meilleure expérience, visite le site depuis ton ordi.");              
    } else {

    }
  }


