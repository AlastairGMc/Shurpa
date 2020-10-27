/* NovelWorkshop */

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


	function getID(tag)
	{
		var target = 'post-';
		var pos = tag.indexOf(target);
		var idx = pos + target.length;

		return tag.slice(idx);
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


    function setScrollHeight()
      {
      var src = document.getElementById('column-right-outer');
      var box = src.getBoundingClientRect();

      var scroll1 = document.getElementById('book-body');
      var scroll2 = document.getElementById('shortcuts-body');

      scroll1.style.height = box.height + 'px';
      scroll2.style.height = box.height + 'px';
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


	function processpostList(root)
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
			var descrip = getSceneDescrip(body);

			scenes[i] = {
				id:id, 
				link:chapter,
				number:number, 
				title:title, 
				descrip:descrip,
              	body:body,
				url:url, 
				published:published, 
				updated:updated
			}
        }
	}


	function toggleCharlesLetter(btn)
    {
		const upArrow ='&#9650; ';
		const rightArrow = '&#9654; ';
		var title ='Hi I&#39;m Charles,';
		var node = document.getElementById('CharlesLetter');
		var open = (node.style.display == 'none' ? false : true);
		
		if (open)
        {
			//-- close the content block
			node.style.display =  'none';
			btn.innerHTML = rightArrow + title;
        }
		else
        {
			//-- open the content block
			node.style.display =  'block';
			btn.innerHTML = upArrow + title;
        }
    }

		function btnVClick(btn, bAction)	// software button click
        {	
			var icons = eval(btn.getAttribute('icon'));
			var container = document.getElementById(btn.getAttribute('ContainerId'));

          	container.style.display = (bAction ? 'block' : 'none');
			btn.innerHTML = icons[+bAction];

			btn.setAttribute('iconIdx', +bAction);	// store the new state
        }


		function btnClick()		// user button click
        {	
			var icons = eval(this.getAttribute('icon'));
			var iconIdx = eval(this.getAttribute('iconIdx'));
			var container = document.getElementById(this.getAttribute('ContainerId'));
			var bAction = (!(!!iconIdx));	// convert int to boolean, then flip
			
          	container.style.display = (bAction ? 'block' : 'none');
			this.innerHTML = icons[+bAction];

			this.setAttribute('iconIdx', +bAction); 	// store the new state
			clearExpandCollapseBtns();
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


		function formatContents()
		{	
			var bReturn = false;
			var chaptNumber = 1;
			var widget = document.getElementById('book-body');

			if(typeof(widget) != 'undefined' && widget != null)
			{
				var shortcuts = document.getElementById('shortcuts-body');

				for (var k = 0; k < sections.length; k++)
				{
					var sectionLI = document.createElement("LI");
					shortcuts.appendChild(sectionLI);

					var sectionBtn = document.createElement("BUTTON");   
					sectionBtn.className = 'shortcutSectionBtn';
					sectionLI.appendChild(sectionBtn);

					var sec = sections[k];
					var sectionParent = createDivs(widget, sectionBtn, 'Section', 'Section', sec.id, k+1, sec.title, sec.descrip, null, null, null);

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
						var chapterParent = createDivs(sectionParent, chapterBtn, 'Chapter', 'Chapter', c.id, chaptNumber++, c.title, c.descrip, null, null, null);

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
							createDivs(chapterParent, sceneBtn, 'Scene', 'Scene', s.id, s.number, s.title, s.descrip, s.body, s.updated, s.url);
						}
					}
				}
                bReturn = true;
			}
			return bReturn;
		}


      function createDivs(parent, lstBtn, typename, displayname, id, number, title, descrip, body, updated, url)
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
          divDescrip.innerHTML = descrip;
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
        titleBtn.innerHTML = titleBtnIcon[1];	// downArrow
        titleBtn.setAttribute('icon', 'titleBtnIcon');
        titleBtn.setAttribute('iconIdx', '1');
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
        titleSpan.innerHTML = displayname + ' ' + number + ': ' + title;
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


        return divContainer;
      }
