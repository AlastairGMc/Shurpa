/* postData.js */

let scenes = [];
let chapters = [];
let sections = [];

sections.push({id:1, sort:1, title:'The Beginning', descrip:'<b>The year: </b>2050<br /><br /><b>The place: </b>Vancouver, British Columbia, Canada<br /><br /><b>About: </b>Power, ambition and office romance.<br /><br /><b>Section plan: </b>Groups of characters are introduced and daily life in 2050 is illustrated by example. People and situations are recognizable (some things never change), even amongst the amazing new gadgetry and innovative social organization.<br /><br />Each group constitutes a subplot, and initially they appear to be unrelated or independent of each other. We, as readers, develop hopes and expectations for how the subplots will work out for the characters. We wonder how the subplots will eventually be connected, if at all.'});
sections.push({id:2, sort:2, title:'The Middle', descrip:'<b>Section plan: </b>Subplots are advanced incrementally, one after another in circular fashion. Events are approximately simultaneous, but with each cycle the subplots proceed temporally in a sort of spiral, like a wire spring.<br /><br />The subplots converge and start to affect each other. It gets harder to predict the trajectories of individual subplots; they&#39;ve all been subsumed into one big and more complicated plot. Characters are faced with more influences pushing them in different directions. Tension starts to rise as the competing interests clash.'});
sections.push({id:3, sort:3, title:'The End', descrip:'<b>Section plan: </b>Accommodations have been made as much as possible to ease the tensions, but patience has been bent to the breaking point. Finally something does break, and things resolve suddenly in unexpected ways.<br /><br />Our understanding of what happened, and why, shifts suddenly: now we reinterpret the previous events that led up to this point, and revise our expectations for how things will go in the future. Where before the break everything seemed confusing, now it all seems to make sense in light of the new circumstances, as if we should have known all along.'});
sections.sort(function(a, b) {return a.sort - b.sort;});

chapters.push({id:1, sort:1, link:'The Beginning', title:'Monday', descrip:'Chapter plan: Lyre and Eager meet and experience intense attraction. This triggers warnings from their respective shurpas. The shurpas don&#39;t try to contradict their owners, but they assess the dangers and take up negotiating positions to mediate.<br /><br />Meanwhile, subplots are launched: <br />a) Fear & loathing at the office <br />b) Walf & Sarba tragic romance <br />c) Pool&#39;s travails with shurpas <br />d) Zero&#39;s new shurpa hack.'});
chapters.push({id:2, sort:2, link:'The Beginning', title:'Tuesday', descrip:'Chapter plan: Lyre and Eager engineer a meeting. Consumation.'});
chapters.push({id:3, sort:3, link:'The Middle', title:'Wednesday', descrip:'Chapter plan: Bliss, when differences and potential conflicts seem small.'});
chapters.push({id:4, sort:4, link:'The Middle', title:'Thursday', descrip:'Chapter plan: More intense negotiations when the differences in understanding seem irreconcilable.'});
chapters.push({id:5, sort:5, link:'The Middle', title:'Friday', descrip:'Chapter plan: Crisis of decision when Mother is closing in.'});
chapters.push({id:6, sort:6, link:'The End', title:'Saturday', descrip:'Chapter plan: The last straw and breakup.'});
chapters.push({id:7, sort:7, link:'The End', title:'Sunday', descrip:'Chapter plan: Resolution. Lyre and Eager go their own ways, sadder but wiser.'});
chapters.sort(function(a, b) {return a.sort - b.sort;});


function getScene(id)
{
	var scn;
	for (var j = 0; j < scenes.length; j++)
	{
		if(id == scenes[j].id)
		{
			scn = scenes[j];
			break;
		}
	}
	return scn;
}


function getTitle(id)
{
	var scn = getScene(id);
	return scn.link + '; Scene' + scn.number + ': ' + scn.title;
}


function getSceneDescrip(body)
{
	var className = 'NotesClass';
	var startDelim = '>';
	var endDelim = '<';
	var sceneDescrip = '';

	if (body.includes(className))
	{
		startIdx = 1 + body.indexOf(startDelim, 0);
		endIdx = body.indexOf(endDelim, startIdx +1);
		sceneDescrip = body.substring(startIdx, endIdx);
	}
	return sceneDescrip;
}


function getFormattedDate(dt)
{
	var date = new Date(dt);
	var year = date.getFullYear();
	var month = String(date.getMonth() + 1).padStart(2, '0');
	var day = String(date.getDate()).padStart(2, '0');
	var monthStr;

	switch (month) {
		case '01': monthStr = ' Jan '; break;
		case '02': monthStr = ' Feb '; break;
		case '03': monthStr = ' Mar '; break;
		case '04': monthStr = ' Apr '; break;
		case '05': monthStr = ' May '; break;
		case '06': monthStr = ' Jun '; break;
		case '07': monthStr = ' Jul '; break;
		case '08': monthStr = ' Aug '; break;
		case '09': monthStr = ' Sep '; break;
		case '10': monthStr = ' Oct '; break;
		case '11': monthStr = ' Nov '; break;
		case '12': monthStr = ' Dec '; break;
	}

	var formattedDate = 'updated: ' + year + monthStr + day;
	return formattedDate;
}


function getPostURL(entry)
{
	var url;

	for (var i = 0; i < entry.link.length; i++)
	{
		if (entry.link[i].rel == 'alternate')
		{
			url = entry.link[i].href;
			break;
		}
	}
	return url;
}

function getNumComments(entry)
{
	var numComments;

	for (var i = 0; i < entry.link.length; i++)
	{
		if (entry.link[i].rel == 'replies' && entry.link[i].type == 'text/html')
		{
			numComments = entry.link[i].title;
			break;
		}
	}
	return numComments;
}


function getID(tag)
{
	var target = 'post-';
	var pos = tag.indexOf(target);
	var idx = pos + target.length;

	return tag.slice(idx);
}


function getPreview(body)
{
	var className = 'NotesClass';
	var startDelim = '>';
	var endDelim = '<';
	var post = '';
	var preview = '';

	if (body.includes(className))
	{
		startIdx = 1 + body.indexOf(startDelim, 0);
		endIdx = body.indexOf(endDelim, startIdx +1);
		post = body.substring(endIdxm +1).trim();
		preview = preview.substring(0, 200) + ' ... ';
	}
	return preview;
}


function getPostData(root)
{
	for (var i = 0; i < root.feed.entry.length; i++)
	{
		var id = getID(root.feed.entry[i].id.$t);
		var chapter = root.feed.entry[i].category[0].term;
		var number = i +1;
		var title = root.feed.entry[i].title.$t;
		var url = getPostURL(root.feed.entry[i]);
		var published = root.feed.entry[i].published.$t;
		var updated = getFormattedDate(root.feed.entry[i].updated.$t);
		var body = root.feed.entry[i].content.$t;
		var preview = getPreview(body);
		var descrip = getSceneDescrip(body);
		var comments = getNumComments(root.feed.entry[i]);

		scenes[i] = {
			id:id, 
			link:chapter,
			number:number, 
			title:title, 
			descrip:descrip,
			body:preview,
			url:url, 
			published:published, 
			updated:updated,
			comments: comments
		}
	}
	alert(scenes[1].preview);
}

