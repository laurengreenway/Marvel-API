// how to access http://localhost:8080/lauren-week5project/
//comicvine api key 256c793be062cc46b4b474eb011cac2d2b417e91

var shield = {};
var ryanKey = 'f1da2ae2dc487b462dc04513dea9eac1'; 
var laurenKey = 'd19b1cb5371134fa039220d4668d488f';
//request from the API our data
shield.getHero = function(searchQuery) {
	$.ajax({
		url: 'https://gateway.marvel.com:443/v1/public/characters',
		dataType: 'json',
		data: {
			apikey: laurenKey,
			name: searchQuery,
		},
		method: 'GET'
	}).then(function(res){
		// console.log(res.data.results);
		// var hero = (res.data.results);
		shield.displayHero(res.data.results);
	});
	
}; // end of getHero

  shield.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

shield.getRandom = function(randomHero) {
	$.ajax({
		url: 'https://gateway.marvel.com:443/v1/public/characters?',
		dataType: 'json',
		data: {
			limit: 1,
			apikey: laurenKey
		},
		method: 'GET'
	}).then(function(res){
		console.log(res)
		
		var totalCharacters = shield.getRandom(res.data);
		var characterOffset = shield.getRandomInt(0, totalCharacters);

		// var randomHero = res.data.items[Math.round(Math.random()*res.data.length)]
		// var hero = (res.data.results);
		// shield.displayHero(res.data.results);
	});
};

shield.getHeroDetails = function(searchQuery){
	$.ajax({
		url: 'http://comicvine.gamespot.com/api/characters/',
	method: 'GET',
	data: {
		api_key: '256c793be062cc46b4b474eb011cac2d2b417e91',
	},
	dataType: 'jsonp',
	}).then(function(){
		console.log('hi')
	});
	
};

$('.shield').typeIt({
		speed: 50,
		autoStart: true,
	});
$('.welcome').typeIt({
		speed: 50,
		autoStart: true,
	});



// from the selection, a Marvel character is displayed

shield.displayHero = function(profile) {
	console.log(profile);
	$('.heroImage_Container').empty().append('<img class="heroImage">');
	$('.heroImage').attr({
		src: profile[0].thumbnail.path +"."+ profile[0].thumbnail.extension,
		attr: profile[0].name
	});

	$('.heroName').text('Name: ' + profile[0].name);
	$('.heroId').text('ID: ' + profile[0].id);
	$('.lastKnown').text('Most Recent Sighting: ' + profile[0].modified);
	$('.heroDescription').text('Description: ' + profile[0].description).typeIt({
		speed: 25,
		autoStart: false,
	});
	if (profile[0].description === '') {
		$('.heroDescription').text('Description: Details Unknown');
	};
	var heroLinks = profile[0].urls[0].url;
	// $('.furtherInfo').text('<h4>Further Info:</h4>').text('<a>').attr({
	// 	href: heroLinks
	// });

}; // end of displayHero

// user must enter password 'excelsior' to gain access to the database, case insensitive
	$('form.password').on('submit', function(e){
		e.preventDefault();
		var password = $('input[type=password]').val();
		if (password === 'excelsior' || 'EXCELSIOR' || 'Excelsior' || 'eXCELSIOR' || 'excelsior!' || 'EXCELSIOR!' || 'Excelsior!' || 'eXCELSIOR!') {
			$('header').addClass('hidden');
			$('main').fadeIn().smoothScroll();
			$('footer').removeClass('hidden').fadeIn();
		} 
		else {
			alert('Access Denied... but there\'s a hint in the link!')
		};
		
	});

// user can search for any Marvel character
shield.init = function() {
	$('form.heroSearch').on('submit', function(e){
		e.preventDefault();
		var searchQuery = $('input[type=search]').val();
		console.log(searchQuery);
		shield.getHero(searchQuery);
		if (searchQuery == undefined) {
			alert('Maybe check your spelling? Example: Spider-man');
		};

		});
	};

$(function() {
	shield.init();
});

// use regex to remove spaces and dashes (see also, spider man is complicated to load)

// when no description is available, display unknown

// you need to log into the database
