function dev_calldynamic(databus,addOpt) {
	$.ajax({
		type:"POST",
		url: "/_mir/plugin/AES.MIR.async.php",
		async:false,
		cache: false,
		traditional:true,
		data:{
			"data":databus,
			"addOpt":JSON.stringify(addOpt),
		},
		success: function(data){
			var thisData = JSON.parse(data);
			var thisNodeType = thisData.node;
			var thisNodeNodeEl = thisData.nodeEl;
			var thisContent = decodeURIComponent(thisData.contents);
			switch(thisNodeType){
				case 'append':
					$(thisNodeNodeEl).append(thisContent);
					break;
				case 'html':
					$(thisNodeNodeEl).html(thisContent);
					break;
				case 'call_db':
//					alert("현재 임시 점검중입니다.");
					alert("간편상담 신청이 완료되었습니다^^");
					$(thisNodeNodeEl).val("");
					break;
				case 'call_db2':
//					alert("현재 임시 점검중입니다.");
					alert(thisData.alert);
					$(thisNodeNodeEl+" *").val("");
					break;
				case 'module_copy':
					$(thisNodeNodeEl).append(thisContent);
					alert("복사왼료");
					location.reload();
					break;
			}
		},error: function(data) {
			console.log(data);
		},timeout: 3000
	});
}

function dev_calldynamic_html(databus,addOpt,thisNodeType,thisNodeNodeEl) {
	$.ajax({
		type:"POST",
		url: "/_mir/plugin/AES.MIR.async.php",
		cache: true,
		data:{
			"data":databus,
			"addOpt":JSON.stringify(addOpt),
		},
		success: function(data){
			switch(thisNodeType){
				case 'append':
					$(thisNodeNodeEl).append(data);
					break;
				case 'html':
					$(thisNodeNodeEl).html(data);
					break;
				case 'replaceWith':
					$(thisNodeNodeEl).replaceWith(data);
					break;
				case 'call_db':
//					alert("현재 임시 점검중입니다.");
					alert("간편상담 신청이 완료되었습니다^^");
					$(thisNodeNodeEl).val("");
					break;
				case 'call_db2':
//					alert("현재 임시 점검중입니다.");
					alert(thisData.alert);
					$(thisNodeNodeEl+" *").val("");
					break;
			}
		},error: function(data) {
			console.log(data);
		},timeout: 10000
	});
}


function dev_calldynamic_file(databus,addOpt,thisNodeNodeEl) {
	$.ajax({
		type:"POST",
		url: "/_mir/plugin/AES.MIR.async.php",
		cache: true,
		processData : false,
		contentType : false,
		data:databus,
		success: function(data){
			console.log(data);
			$(thisNodeNodeEl).append(data);
		},error: function(data) {
			console.log(data);
		},timeout: 10000
	});
}


function dev_calldynamic_save_module(databus,addOpt,thisNodeType,thisNodeNodeEl) {
	$.ajax({
		type:"POST",
		url: "/_mir/plugin/AES.MIR.async.load.php",
		cache: true,
		data:{
			"data":databus,
			"addOpt":JSON.stringify(addOpt),
		},
		success: function(data){
			switch(thisNodeType){
				case 'append':
					$(thisNodeNodeEl).append(data);
					break;
				case 'html':
					$(thisNodeNodeEl).html(data);
					break;
				case 'replaceWith':
					$(thisNodeNodeEl).replaceWith(data);
					break;
			}
		},error: function(data) {
			console.log(data);
		},timeout: 10000
	});
}