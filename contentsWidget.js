/* contentsWidget.js */

	var uniqueId = 0;
	const chevronUp = "https://alastairgmc.github.io/Shurpa/chevron-up.png";
	const chevronDown = "https://alastairgmc.github.io/Shurpa/chevron-down.png";
	let summaryBtnIcon =  [chevronUp, chevronDown]; // idx 0 means the container is hidden; idx 1 means the container is visible

		function getUniqueId(){
			return uniqueId++;
		}

		function gotoPage(url){
			window.location.href = url;
		}

		function getDescrip(title){
			var returnDescrip = '';

			/* Note: summary[] is defined in contentsWidget_data.js */
			for (var i=0; i < summary['summary'].length; i++){
				if (title == summary['summary'][i].title){
					returnDescrip = summary['summary'][i].descrip;
					break;
				}
			}
			return returnDescrip;
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


		function formatContents(widgetDivName){
			var bReturn = false;
			var sectionNumber = 1;
			var chapterNumber = 1;
			var sceneNumber = 1;
			var root = document.getElementById(widgetDivName);

			if(typeof(root) != 'undefined' && root != null)
			{
				/* Note: structure[] is defined in contentsWidget_data.js */
				for (var k = 0; k < structure['section'].length; k++)
				{
					var title = structure['section'][k].title;
					var secSummary = getDescrip(title);
					var secTitle = 'Section ' + sectionNumber + ': ' + title;
					let section = addUnit(root, 'Section', secTitle, null, null, secSummary, null, null);

					for (var i = 0; i < structure['section'][k]['chapter'].length; i++)
					{
						var title = structure['section'][k]['chapter'][i].title; 
						var chSummary = getDescrip(title)
						var chTitle = 'Chapter ' + chapterNumber + ': ' + title;
						let chapter = addUnit(section, 'Chapter', chTitle, null, null, chSummary, null, null);

						var sceneList = filterBy(scenes, title);
						for (var j = 0; j < sceneList.length; j++)
						{
							var s = sceneList[j];
							var scTitle = 'Scene ' + sceneNumber + ': ' + s.title;
							addUnit(chapter, 'Scene', scTitle, s.updated, s.comments, null, s.body, s.url);
							sceneNumber++;
						}
						chapterNumber++;
					}
					sectionNumber++;
				}
				bReturn = true;
			}
        		return bReturn;
		}
		

		function addUnit(parent, type, title, updatedDate, numComments, summary, snippet, url){
			var template = document.getElementById("template");
			var unit = template.cloneNode(true);
			unit.className = type + 'Unit';
			unit.removeAttribute('id');
			parent.appendChild(unit);

			var containerDiv = unit.getElementsByClassName('Container')[0];

			var titleDiv = unit.getElementsByClassName('Title')[0];
			titleDiv.className = type + titleDiv.className;

			var btnTargetId = getUniqueId();

			var titleBtn = unit.getElementsByClassName("ContainerBtn")[0];
			titleBtn.innerHTML = title;
			titleBtn.setAttribute('btnTargetId', btnTargetId);
			titleBtn.className = type + titleBtn.className;

			containerDiv.id = btnTargetId;
			containerDiv.className = type + containerDiv.className

			if (snippet){
				containerDiv.innerHTML = snippet;
			}

			if (snippet && url){
				var postLink = document.createElement('A');
				postLink.className = type + 'PostLink';
				postLink.href = url;
				containerDiv.innerHTML += ' ... ';
				postLink.text = 'read more'
				containerDiv.appendChild(postLink);
			}
			
			var summaryBtn = unit.getElementsByClassName('SummaryBtn')[0];
			var summaryDiv = unit.getElementsByClassName('Summary')[0];
			if (summary){
				var btnTargetId = getUniqueId();
				summaryBtn.className = type + summaryBtn.className;
				summaryBtn.setAttribute('btnTargetId', btnTargetId);
				summaryDiv.id = btnTargetId;
				summaryDiv.className = type + summaryDiv.className;
				summaryDiv.innerHTML = summary;
			} else {
				summaryBtn.remove();
				summaryDiv.remove();
			}
			

			var updateDiv = unit.getElementsByClassName('UpdatedDate')[0];
			if (updatedDate){
				updateDiv.className = type + updateDiv.className;
				updateDiv.innerHTML = updatedDate;
			} else {
				updateDiv.remove();
			}
			

			var numCommentsDiv = unit.getElementsByClassName('NumComments')[0];
			if (numComments){
				numCommentsDiv.className = type + numCommentsDiv.className;
				numCommentsDiv.innerHTML = numComments;
			} else {
				numCommentsDiv.remove();
			}

			return containerDiv;
		}


		function btnClick(btn){
			var targetId = btn.getAttribute('btnTargetId');
			var target = document.getElementById(targetId);
			var bVisible = (target.style.display == 'none' ? false : true);
			target.style.display = (bVisible ? 'none' : 'block');

			if (btn.tagName == 'IMG'){
				btn.src = summaryBtnIcon[+bVisible];	
			} 
		}
