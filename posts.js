/* posts.js */

let scenes = [];



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
		post = body.substring(endIdx +1).trim();
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
		//var body = root.feed.entry[i].content.$t;
		var body = root.feed.entry[i].summary.$t;
		//var preview = getPreview(body);
		//var descrip = getSceneDescrip(body);
		var comments = getNumComments(root.feed.entry[i]);

		scenes[i] = {
			id:id, 
			link:chapter,
			number:number, 
			title:title, 
			descrip:descrip,
			body:body,
			url:url, 
			published:published, 
			updated:updated,
			comments: comments
		}
	}
	//alert(scenes[1].preview);
}
