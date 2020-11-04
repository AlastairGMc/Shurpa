/* contents.js */

const downArrow = '▼';
const rightArrow = '▶';
const upArrow = '&#9650; ';
const plus = '&#65291;';
const minus = '&#65293;';
const downChevron = '&#8964;';
const upChevron = '&#8963;';

const upTriangle = '⏶';
const downTriangle = '⏷';

let titleBtnIcon = [rightArrow, downArrow];			// idx 0 means the container is hidden; idx 1 means the container is visible
let descripBtnIcon = [downTriangle, upTriangle];


function gotoPage(url){
	window.location.href = url;
}


function btnVClick(btn, bVisible)	// software button click
{	
	var icons = eval(btn.getAttribute('icon'));

	if (icons)
	{
		var container = document.getElementById(btn.getAttribute('ContainerId'));
		container.style.display = (bVisible ? 'block' : 'none');
		btn.innerHTML = icons[+bVisible];
		btn.setAttribute('iconIdx', +bVisible);	// store the new state
	}
	else
	{
		var container = document.getElementById(btn.getAttribute('ContainerId'));
		container.style.display = (bVisible ? 'none' : 'block');
	}
}


function btnClick()		// user button click
{	
	var icons = eval(this.getAttribute('icon'));
	
	if (icons)
	{
		var iconIdx = eval(this.getAttribute('iconIdx'));
		var container = document.getElementById(this.getAttribute('ContainerId'));
		var bVisible = (!(!!iconIdx));	// convert int to boolean, then flip
			
    		container.style.display = (bVisible ? 'block' : 'none');
		this.innerHTML = icons[+bVisible];
		this.setAttribute('iconIdx', +bVisible); 	// store the new state
		//clearExpandCollapseBtns();
	}
	else
	{
		var container = document.getElementById(this.getAttribute('ContainerId'));
		var bVisible = (container.style.display == 'none' ? false : true);
		container.style.display = (bVisible ? 'none' : 'block');
	}
}



function clearExpandCollapseBtns()
{	
	document.getElementById('chkExpand').checked = false;
	document.getElementById('chkCollapse').checked = false;
}


function clickClassBtns(bAction, classname)
{
	var btns = document.getElementsByClassName(classname);
	for (var i = 0; i < btns.length; i++)
    {
		btnVClick(btns[i], bAction);
    }
}


function chkClick(chk)
{	
	if (chk.checked)
    {
		var bAction;

		if (chk.id == 'chkExpand')
        {
			bAction = true;
			document.getElementById('chkCollapse').checked = false;
        }
		else
        {
			bAction = false;
			document.getElementById('chkExpand').checked = false;
        }

        clickClassBtns(bAction, 'SectionTitleBtn');
        clickClassBtns(bAction, 'SectionDescripBtn');
        clickClassBtns(bAction, 'ChapterTitleBtn');
        clickClassBtns(bAction, 'ChapterDescripBtn');
        clickClassBtns(bAction, 'SceneTitleBtn');
        clickClassBtns(bAction, 'SceneDescripBtn');
    }
}

function openContainers(btn)
{
	let stack = [];

	stack.push(btn);

	var container = btn.parentNode.parentNode;
	var controlBtn = document.getElementById(container.getAttribute('showHideBtnId'));
	while (container.id != 'book-body')
    {
		stack.push(controlBtn);
		container = container.parentNode;
		controlBtn = document.getElementById(container.getAttribute('showHideBtnId'));
    }

	for (var i = stack.length -1; i >= 0; i--)
    {
		btnVClick(stack[i], true)
    }
}


function scrollIntoViewBtn()
{ 
	var btn = document.getElementById(this.getAttribute('targetId'));
	openContainers(btn);

	var parent = document.getElementById('book-body');		// the scroll window
	var parentRect = parent.getBoundingClientRect();			

	var btnRect = btn.getBoundingClientRect();
	var newPos = (btnRect.top + parent.scrollTop) - parentRect.top;
	parent.scrollTo({top: newPos, left: 0, behavior: 'smooth'});
}


function filterBy(objArray, title)
{
	let filteredLst = [];
	for (var i = 0; i < objArray.length; i++)
	{
		if (objArray[i].link == title)
		{
			filteredLst.push(objArray[i]);
		}
	}
	return filteredLst;
}


function formatContents(widgetDivName, objSummary)
{	
	var bReturn = false;
	var chaptNumber = 1;
	var widget = document.getElementById(widgetDivName);

	if(typeof(widget) != 'undefined' && widget != null)
	{
		for (var k = 0; k < sections.length; k++)
		{
			var sectionLI = document.createElement("LI");
			var sectionBtn = document.createElement("BUTTON");   
			sectionBtn.className = 'shortcutSectionBtn';
			sectionLI.appendChild(sectionBtn);

			var sec = sections[k];
			var secDescrip = getDescrip(sec.title, objSummary)
			var sectionParent = createDivs(widget, sectionBtn, 'Section', 'Section', sec.id, k+1, sec.title, secDescrip, null, null, null, null);

			var chapterUL = document.createElement("UL");
			chapterUL.className = 'ChapterUL';
			sectionLI.appendChild(chapterUL);

			var chapterList = filterBy(chapters, sections[k].title);
			for (var i = 0; i < chapterList.length; i++)
			{	
				var chapterLI = document.createElement("LI");
				chapterUL.appendChild(chapterLI);

				var chapterBtn = document.createElement("BUTTON");   
				chapterBtn.className = 'shortcutChapterBtn';
				chapterLI.appendChild(chapterBtn);

				var c = chapterList[i];
				var chDescrip = getDescrip(c.title, objSummary)
				var chapterParent = createDivs(sectionParent, chapterBtn, 'Chapter', 'Chapter', c.id, chaptNumber++, c.title, chDescrip, null, null, null, null);

				var sceneUL = document.createElement("UL");
				sceneUL.className = 'SceneUL';
				chapterLI.appendChild(sceneUL);

				var sceneList = filterBy(scenes, chapterList[i].title);
				for (var j = 0; j < sceneList.length; j++)
				{
					var sceneLI = document.createElement("LI");
					sceneUL.appendChild(sceneLI);

					var sceneBtn = document.createElement("BUTTON");   
					sceneBtn.className = 'shortcutSceneBtn';
					sceneLI.appendChild(sceneBtn);

					var s = sceneList[j];
					createDivs(chapterParent, sceneBtn, 'Scene', 'Scene', s.id, s.number, s.title, s.descrip, s.body, s.updated, s.url, s.comments);
				}
			}
		}
        	bReturn = true;
	}
	return bReturn;
}

function getDescrip(title, objSummary){
	var returnDescrip = '';

	for (var i=0; i < objSummary['summary'].length; i++){
		if (title == objSummary['summary'][i].title){
			returnDescrip = s[i].descrip;
			break;
		}
	}
	return returnDescrip;
}

function createDivs(parent, lstBtn, typename, displayname, id, number, title, descrip, body, updated, url, comments)
{ 
	var divTitle = document.createElement('DIV');
	divTitle.id = typename + 'Title' + id;
	divTitle.className = typename + 'Title';
	parent.appendChild(divTitle);	

	if (descrip)
	{
		var divDescrip = document.createElement('DIV');
		divDescrip.id = typename + 'Descrip' + id;
		divDescrip.className = typename + 'Descrip';
		//divDescrip.innerHTML = descrip;
		divDescrip.innerHTML = getDescrip(title);
		parent.appendChild(divDescrip);
	}

	var divContainer = document.createElement('DIV');
	divContainer.id = typename + 'Container' + id;
	divContainer.className = typename + 'Container';
	divContainer.setAttribute('showHideBtnId', typename + 'TitleBtn' + id);
	divContainer.innerHTML = body;
	parent.appendChild(divContainer);


	titleBtn = document.createElement('BUTTON');
	titleBtn.id = typename + 'TitleBtn' + id;
	titleBtn.className = typename + 'TitleBtn';
	titleBtn.innerHTML = displayname + ' ' + number + ': ' + title;

	/*
	titleBtn.innerHTML = titleBtnIcon[1];	// downArrow
	titleBtn.setAttribute('icon', 'titleBtnIcon');
	titleBtn.setAttribute('iconIdx', '1');
	*/
	titleBtn.setAttribute('ContainerId', divContainer.id)
	titleBtn.setAttribute('descripBtnId', typename + 'DescripBtn' + id);
	titleBtn.addEventListener('click', btnClick);          
	divTitle.appendChild(titleBtn);

	if (lstBtn)
	{
		lstBtn.setAttribute('targetId', titleBtn.id);
		lstBtn.addEventListener('click', scrollIntoViewBtn);          
		lstBtn.innerHTML = typename + ' ' + number + ': ' + title;
	}

	
	var titleSpan = document.createElement('SPAN');
	titleSpan.className = typename + 'TitleSpan';
	//titleSpan.innerHTML = displayname + ' ' + number + ': ' + title;
	divTitle.appendChild(titleSpan);
	

	if (descrip)
	{
		var descripBtn = document.createElement('BUTTON');
		descripBtn.id = typename + 'DescripBtn' + id;
		descripBtn.className = typename + 'DescripBtn';
		descripBtn.innerHTML = descripBtnIcon[1];	// upTriangle
		descripBtn.setAttribute('iconIdx', '1');
		descripBtn.setAttribute('icon', 'descripBtnIcon');
		descripBtn.setAttribute('ContainerId', divDescrip.id);
		descripBtn.addEventListener('click', btnClick);          
		//divTitle.appendChild(descripBtn);
		titleSpan.appendChild(descripBtn);
	}

	if (updated)
	{
		var upd = document.createElement('SPAN');
		upd.id = typename + 'Updated' + id;
		upd.className = typename + 'Updated';
		upd.innerHTML = updated;
		divTitle.appendChild(upd);
	}
/*
	if (url)
	{
		var commentLinkTop = document.createElement('A');
		commentLinkTop.id = typename + 'CommentLink' + id;
		commentLinkTop.className = typename + 'CommentLink';
		commentLinkTop.href = url;
		commentLinkTop.innerHTML = 'Comments';
		divTitle.appendChild(commentLinkTop);

		var commentLinkBottom = document.createElement('A');
		commentLinkBottom.id = typename + 'CommentLink' + id;
		commentLinkBottom.className = typename + 'CommentLink';
		commentLinkBottom.href = url;
		commentLinkBottom.innerHTML = 'Comments';
		divContainer.appendChild(commentLinkBottom);
	}
*/
	if (comments)
	{
		var commentLbl = document.createElement('SPAN');
		commentLbl.ID = typename + 'NumComments' + id;
		commentLbl.className = typename + 'NumComments';
		commentLbl.innerHTML = comments;
		divTitle.appendChild(commentLbl);
	}

	return divContainer;
}
