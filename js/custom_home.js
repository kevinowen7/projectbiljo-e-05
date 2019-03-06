//Booking list
var table1 = $('#booking-list').DataTable({
	"aLengthMenu": [[3, 6, -1], [3, 6, "All"]],
	"iDisplayLength": 3,
	"order": [],
	"columnDefs": [
	{
		targets: -1,
		orderable:false
	},
	{
		targets: 0,
		width: "10%",
		orderable:false
	}
	]
})	

function removeOptions(selectbox) {
	
    //clear select options
    for(i=selectbox.options.length-1; i>=1; i--) {
        selectbox.remove(i);
    }
	
}

function get_fmoney(money) {
	
	var rev     = parseInt(money, 10).toString().split('').reverse().join('');
	var rev2    = '';
	for(var i = 0; i < rev.length; i++){
		rev2  += rev[i];
		if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
			rev2 += '.';
		}
	}
	return ("Rp. "+rev2.split('').reverse().join('') + ',-')
	
}

function rem_fmoney(money) {
	
	return parseInt(money.substring(4,money.length-2).split(".").join(""))
	
}

function rem_moneydot(money) {
	
	return parseInt(money.split(".").join(""));
	
}

function get_moneydot(money) {
	
	if (isNaN(parseInt(money))) {
		var convertmoney = "";
	} else {
		money = rem_moneydot(money);
		var convertmoney = money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	}
	return convertmoney;
	
}

function addInvoice() {
	
	setTimeout(function(){
		//stop loading icon
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
		//reset invoice form
		$('#addInvoiceForm').trigger("reset");
		$("#invoiceDetailsOtherBlock").hide();
		$("#invoiceRecurrentBlock").show();
		removeOptions(document.getElementById("invoiceDetails"));
		var optionElement1 = document.createElement("option");
		var optionElement2 = document.createElement("option");
		var optionElement3 = document.createElement("option");
		optionElement1.value = "rentdue";
		optionElement1.innerHTML = "Rental Due";
		optionElement2.value = "finedue";
		optionElement2.innerHTML = "Fine Due";
		optionElement3.value = "otherdue";
		optionElement3.innerHTML = "Other Due";
		document.getElementById("invoiceDetails").appendChild(optionElement1);
		document.getElementById("invoiceDetails").appendChild(optionElement2);
		document.getElementById("invoiceDetails").appendChild(optionElement3);
		//success notification
		$.gritter.add({
			title: 'Invoice Added',
			text: 'Invoice was successfully added to the database.',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
	}, 1000);
	
}

function addPayment() {
	
	setTimeout(function(){
		//stop loading icon
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
		//reset payment form
		$('#addPaymentForm').trigger("reset");
		$("#paymentDetailsOtherBlock").hide();
		removeOptions(document.getElementById("paymentDetails"));
		var optionElement1 = document.createElement("option");
		var optionElement2 = document.createElement("option");
		var optionElement3 = document.createElement("option");
		var optionElement4 = document.createElement("option");
		optionElement1.value = "rentpay";
		optionElement1.innerHTML = "Rental Payment";
		optionElement2.value = "finepay";
		optionElement2.innerHTML = "Fine Payment";
		optionElement3.value = "bondpay";
		optionElement3.innerHTML = "Bond Money Payment";
		optionElement4.value = "otherpay";
		optionElement4.innerHTML = "Other Payment";
		document.getElementById("paymentDetails").appendChild(optionElement1);
		document.getElementById("paymentDetails").appendChild(optionElement2);
		document.getElementById("paymentDetails").appendChild(optionElement3);
		document.getElementById("paymentDetails").appendChild(optionElement4);
		//success notification
		$.gritter.add({
			title: 'Payment Added',
			text: 'Payment was successfully added to the database.',
			image: './img/bell.png',
			sticky: false,
			time: 3500,
			class_name: 'gritter-custom'
		})
	}, 1000);
	
}

//approve booking in table
function approveBooking(refNumber){
	$('#approveM').html("Are you sure to approve "+refNumber+" ?");
	$('#approveM').val(refNumber);
	$("#approveModal").modal();
}

//delete booking in table
function deleteBooking(refNumber){
	$('#approveD').html("Are you sure delete "+refNumber+" ?");
	$('#approveD').val(refNumber);
	$("#rApproveModal").modal();
}

//sort list by status approve or booking
function sortByStatOccupy(listApproveT){
	newArray=[]
	
	//jika statusnya booking
	for (i=0;i<listApproveT.length;i++) {
		if (listApproveT[i].statOccupy=="booking"){
			newObj = {
				"statOccupy":listApproveT[i].statOccupy,
				"refNum":listApproveT[i].refNum,
				"content":listApproveT[i].content,
				"tenant_id":listApproveT[i].tenant_id
			}
			newArray.push(newObj);
		}
	}
		
	//jika statusnya approved
	for (i=0;i<listApproveT.length;i++) {
		if (listApproveT[i].statOccupy=="approved"){
			newObj = {
				"statOccupy":listApproveT[i].statOccupy,
				"refNum":listApproveT[i].refNum,
				"content":listApproveT[i].content,
				"tenant_id":listApproveT[i].tenant_id
			}
			newArray.push(newObj);
		}
	}
	return newArray
}

function reformatDate(inputDate) {
	
	months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	inputBroke=inputDate.split("/");
	inputDay=parseInt(inputBroke[1]);
	inputMonth=parseInt(inputBroke[0]);
	inputYear=inputBroke[2];
	outputDay=inputDay;
	outputMonth=months[inputMonth-1];
	outputYear=inputYear.split("")[2]+inputYear.split("")[3];
	return (outputDay+"-"+outputMonth+"-"+outputYear);
	
}

//menjumlahkan hari dengan tanggal yang diminta
function sumDate(hari,date){
	var intend = parseInt(hari);
	//set date yang ditentukan
	var someDate = new Date(date);
	//menjumlahkan tanggal
	someDate.setDate(someDate.getDate() + intend); 
	newDate = String(someDate).split(" ")
	var endMonth = newDate[1];
	var endDay = newDate[2];
	var endYear = newDate[3];

	var endDate = endDay+"-"+endMonth+"-"+endYear;

	return endDate;
}

// send email
function sendEmail(tenantID,roomID,applyDate1,total,propAddr1){
	//start loading icon
	$("#cover-spin").fadeIn(250, function() {
		$(this).removeClass("hide");
	})
	//get tenant mail from firebase
	var getEmail = firebase.database().ref().child("tenant/"+tenantID);
	getEmail.once('value', function(snapshot) {
		// membaca target , subject , pesan, no kamar
		var to=snapshot.child("email").val();
		var name=snapshot.child("full_name").val();
		var noKamar = String(roomID.charAt(5))+String(roomID.charAt(6));
		var idKamar = String(roomID.charAt(1))+String(roomID.charAt(2));
		var subject = "Summary Payment NSP"
		var message = "Salam "+name+"\n\nPihak NSP sudah menyetujui permohonan kamu untuk masuk kamar "+noKamar+" di gedung "+idKamar+" yang beralamat di "+propAddr1+"\n\nKamu perlu membayar Bond Money dan Rental Money sebesar "+get_fmoney(total)+" ke No. Rek dibawah ini: \n\nNo. Rek : 323232323\n\nAtas Nama : Monica\n\nPaling lambat "+sumDate(7,applyDate1)+". Jika sudah transfer , harap menghubungi no WA 08xxxxx"

		//set to firebase
		var sendEmail = firebase.database().ref().child("sendEmail");
		sendEmail.set({
			'subject' : subject,
			'to' : to,
			'message' : message,
		});
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "https://sendemailgokost.herokuapp.com/webhook", true);
		xhr.send();
	 
		xhr.onreadystatechange = processRequest;
		 //kondisi ketika webhook selesai di buka
		function processRequest(e) {
			if (xhr.readyState == 4) {
				//stop loading
				$("#cover-spin").fadeOut(250, function() {
					$(this).hide();
				})
				window.location.href='home.html';
			}
		}
	});
	return false;
}


$(document).ready(function() {
	//BOOKING LIST
	//get data from database
	var trRef = firebase.database().ref("tenant-room");
	var a=1;
	var listApproveT=[];
	trRef.on('child_added', function(snapshot) {
		var tenantID = snapshot.key;
		trRef.child(tenantID).on('child_added', function(snapshot) {
			//get starting date , building address , status occupy , ref id
			var statingDate=snapshot.child("start_date").val();
			var propAddr=snapshot.child("prop_addr").val();
			var statOccupy=snapshot.child("stat_occupy").val();
			var refN=snapshot.child("ref_number").val().split(" ");
			var refNumber=refN[0]+refN[1]+refN[2];
			
			var tenantRef = firebase.database().ref().child("tenant/"+tenantID);
			var tenantName;
			tenantRef.once('value', function(snapshot) {
				table1.clear();
				// get name from database
				tenantName=snapshot.child("full_name").val();
				// jika status = approved
				if (statOccupy=="approved"){
					// untuk sort , datanya dimasukan ke list
					newObj = {
						"statOccupy":"approved",
						"refNum":refNumber,
						"content":[a,"<a href='tenant_approve.html?id="+refNumber+"'>"+tenantName+"</a>",statingDate,propAddr,"<button id='approve_booking"+refNumber+"' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking"+refNumber+"') style='background-color:#c8bca6' disabled ><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking"+refNumber+"')><i class='fa fa-times'></i></button>"],
						"tenant_id":tenantID
					}
					listApproveT.push(newObj);
				}
				//jika status = booking
				if(statOccupy=="booking") {
					// untuk sort , datanya dimasukan ke list
					newObj = {
						"statOccupy":"booking",
						"refNum":refNumber,
						"content":[a,"<a href='tenant_approve.html?id="+refNumber+"'>"+tenantName+"</a>",statingDate,propAddr,"<button id='approve_booking"+refNumber+"' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking"+refNumber+"')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking"+refNumber+"')><i class='fa fa-times'></i></button>"],
						"tenant_id":tenantID
					}
					listApproveT.push(newObj);
				}
				listApproveT = sortByStatOccupy(listApproveT);
				//add hasil sort ke datatables
				for (i=0;i<listApproveT.length;i++) {
					table1.row.add(listApproveT[i].content).node().id = 'booking'+listApproveT[i].refNum;
				}
				table1.draw();
				a++
			});
		});
		trRef.child(tenantID).on('child_changed', function(snapshot) {
			//get starting date , building address , status occupy, ref id
			var statingDate=snapshot.child("start_date").val();
			var propAddr=snapshot.child("prop_addr").val();
			var statOccupy=snapshot.child("stat_occupy").val();
			var refN=snapshot.child("ref_number").val().split(" ");
			var refNumber=refN[0]+refN[1]+refN[2];
			var tenantRef = firebase.database().ref().child("tenant/"+tenantID);
			var tenantName;
			tenantRef.once('value', function(snapshot) {
				table1.clear();
				// get name from database
				tenantName=snapshot.child("full_name").val();
				// remove row changed
				var row = table1.row('#booking'+refNumber);
				row.remove();
				// update occupy pada list
				
				// jika status = approved
				if (statOccupy=="approved"){
					for (i=0;i<listApproveT.length;i++){
						if(listApproveT[i].refNum==refNumber){
							newObj = {
								"statOccupy":statOccupy,
								"refNum":refNumber,
								"content":[listApproveT[i].content[0],tenantName,statingDate,propAddr,"<button id='approve_booking"+refNumber+"' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking"+refNumber+"') style='background-color:#c8bca6' disabled ><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking"+refNumber+"')><i class='fa fa-times'></i></button>"],
								"tenant_id":tenantID
							}
							listApproveT[i]=newObj;
							break
						}
					}
				}
				//jika status = booking
				if(statOccupy=="booking") {
					for (i=0;i<listApproveT.length;i++){
						if(listApproveT[i].refNum==refNumber){
							newObj = {
								"statOccupy":statOccupy,
								"refNum":refNumber,
								"content":[listApproveT[i].content[0],tenantName,statingDate,propAddr,"<button id='approve_booking"+refNumber+"' class='btn btn-xs btn-success' title='Approve' onclick=approveBooking('booking"+refNumber+"')><i class='fa fa-check'></i></button> <button id='removebutt' class='btn btn-xs btn-danger' title='Delete' onclick=deleteBooking('booking"+refNumber+"')><i class='fa fa-times'></i></button>"],
								"tenant_id":tenantID
							}
							listApproveT[i]=newObj;
							break
						}
					}
				}
				//sorting
				listApproveT = sortByStatOccupy(listApproveT);
				//add hasil sort ke datatables
				for (i=0;i<listApproveT.length;i++) {
					table1.row.add(listApproveT[i].content).node().id = 'booking'+listApproveT[i].refNum;
				}
				table1.draw();
				
			});
		});
		trRef.child(tenantID).on('child_removed', function(snapshot) {
			//get ref ID
			var refN=snapshot.child("ref_number").val().split(" ");
			var refNumber=refN[0]+refN[1]+refN[2];
			// remove row changed
			var row = table1.row('#booking'+refNumber);
			row.remove();
		});
	});
	
	//key list
	var table6 = $('#keyC-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "20%"
		},
		{
			targets: -1,
			width: "20%"
		},
		]
	})
	
	table6.row.add(["<a href='javaScript:void(0)'>Aleksandra Hyde</a>","101 010 500","12/10/2018","20/09/2018","<button id='key_1' class='btn btn-xs btn-success' title='Mail Tenant' onclick=mailTenant('key1')><i class='fa fa-envelope'></i></button> <button id='collectbutt' class='btn btn-xs btn-primary' title='Collect' onclick=collectedKey('key1')><i class='fa fa-check'></i></button>"]).node().id = 'key1';
	table6.row.add(["<a href='javaScript:void(0)'>Amari O'Reilly</a>","101 020 100","10/09/2018","10/08/2018","<button id='key_1' class='btn btn-xs btn-success' title='Mail Tenant' onclick=mailTenant('key2')><i class='fa fa-envelope'></i></button> <button id='collectbutt' class='btn btn-xs btn-primary' title='Collect' onclick=collectedKey('key2')><i class='fa fa-check'></i></button>"]).node().id = 'key2';
	table6.draw();
	
	
	//overdue
	var table2 = $('#overdue-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "30%"
		},
		]
	})
	
	table2.row.add(["<a href='javaScript:void(0)'>Aleksandra Hyde</a>","101 010 500","12/17/2018"]).node().id = 'over1';
	table2.row.add(["<a href='javaScript:void(0)'>Amari O'Reilly</a>","101 020 100","10/09/2018"]).node().id = 'over2';
	table2.draw();
	
	//almost expired
	var table3 = $('#aexpired-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "30%"
		},
		]
	})
	
	table3.row.add(["<a href='javaScript:void(0)'>Bea Curran</a>","101 010 100","9/20/2018"]).node().id = 'almost1';
	table3.row.add(["<a href='javaScript:void(0)'>Briana Holloway</a>","101 010 200","9/28/2018"]).node().id = 'almost2';
	table3.draw();
	
	//imcomplete tenant
	var table4 = $('#incomplete-list').DataTable({
		"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "iDisplayLength": -1,
		"sPaginationType": "full_numbers",
		"order": [[ 0, "asc" ]],
		"columnDefs": [
		{
			targets: 0,
			width: "30%"
		},
		]
	})
	
	table4.row.add(["<a href='javaScript:void(0)'>Aleksandra Hyde</a>","101 010 500","Photo ID"]).node().id = 'incomplete1';
	table4.row.add(["<a href='javaScript:void(0)'>Bea Curran</a>","101 010 100","Photo KK"]).node().id = 'incmplete2';
	table4.draw();
	
	//array for autocomplete tenant
	var tenantNames = [
		{
			label: "Bea Curran (101 010 100)",
			tenantid: "t_1d",
			refnumber: "101010100"
		},
		{
			label: "Kevin Owen (101 010 300)",
			tenantid: "t_2d",
			refnumber: "101010300"
		},
		{
			label: "Briana Holloway (101 010 200)",
			tenantid: "t_3d",
			refnumber: "101010200"
		},
		{
			label: "Zakary Neville (101 010 400)",
			tenantid: "t_4d",
			refnumber: "101010400"
		},
		{
			label: "Aleksandra Hyde (101 010 500)",
			tenantid: "t_5d",
			refnumber: "101010500"
		},
		{
			label: "Amari O'Reilly (101 020 100)",
			tenantid: "t_6d",
			refnumber: "101020100"
		},
		{
			label: "Jan Garrison (101 020 300)",
			tenantid: "t_7d",
			refnumber: "101020300"
		},
		{
			label: "Kevin Owen (102 010 200)",
			tenantid: "t_8d",
			refnumber: "102010200"
		},
		{
			label: "Pamela Daugherty (102 010 100)",
			tenantid: "t_9d",
			refnumber: "102010100"
		},
		{
			label: "Vernon Kirkland (101 010 101)",
			tenantid: "t_10d",
			refnumber: "101010101"
		},
		{
			label: "Jacob Connolly (102 020 100)",
			tenantid: "t_11d",
			refnumber: "102020100"
		}
	];
	//sort array ascending based on name
	tenantNames.sort(function(a, b){
		var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase();
		if (nameA < nameB) //sort string ascending
			return -1;
		if (nameA > nameB)
			return 1;
		return 0; //default return value (no sorting)
	});
	//start invoice tenant autocomplete
	$("#invoiceTenantName").autocomplete({
		source: function(request, response) {
			var results = $.ui.autocomplete.filter(tenantNames, request.term);
			response(results.slice(0, 10));
		},
		select: function(event, ui) {
			$("#invoiceTenantName").val(ui.item.label.split("(")[0].slice(0,-1));
			$("#invoiceTenantID").val(ui.item.tenantid);
			return false;
		}
	});
	//start payment tenant autocomplete
	$("#paymentTenantName").autocomplete({
		source: function(request, response) {
			var results = $.ui.autocomplete.filter(tenantNames, request.term);
			response(results.slice(0, 10));
		},
		select: function(event, ui) {
			$("#paymentTenantName").val(ui.item.label.split("(")[0].slice(0,-1));
			$("#paymentTenantID").val(ui.item.tenantid);
			return false;
		}
	});
	//start invoice datepicker
	$('#invoiceDatePicker').datepicker({
		format: "dd-M-yy"
	})
	//start payment datepicker
	$('#paymentDatePicker').datepicker({
		format: "dd-M-yy"
	})
	
	//approve modal add listener
	$("#confirmApprove").click(function() {
		var BrefNumber = $("#approveM").val();
		// get Ref Number
		var refNumber = BrefNumber.split("booking")[1];
		// get tenant ID
		var tenantID;
		for (i=0;i<listApproveT.length;i++){
			if(listApproveT[i].refNum==refNumber){
				tenantID = listApproveT[i].tenant_id; 
				break
			}
		}
		//get room id
		var roomID=refNumber.substring(0,refNumber.length-2);
		//update data booking to approved
		var trRef = firebase.database().ref("tenant-room/"+tenantID+"/"+roomID);
		trRef.update({
			'stat_occupy':'approved'
		});
		//mengambil apply date, rent price , prop_addr
		trRef.once('value', function(snapshot) {
			var applyDate1=snapshot.child("apply_date").val();
			var rent_price1=snapshot.child("rent_price").val();
			var rent_bond1=snapshot.child("rent_bond").val();
			var total = parseInt(rent_price1)+parseInt(rent_bond1);
			var propAddr1=snapshot.child("prop_addr").val();
			// send email
			sendEmail(tenantID,roomID,applyDate1,total,propAddr1);
		})
	})
	
	//remove approve modal add listener
	$("#removeApprove").click(function() {
		var refNumber = $("#approveD").val();
		var row = table1.row('#'+refNumber);
		row.remove();
		table1.draw(false);
	})
	
	//invoice add button listener
	$("#invoiceb").on('click', function() {
		$("#addInvoiceModal").modal();
	})
	//invoice amount listener
	$("#invoiceAmount").on('keyup change', function() {
		$("#invoiceAmount").val(get_moneydot($("#invoiceAmount").val()));
	})
	//invoice modal details listener
	$("#invoiceDetails").on('change', function() {
		if ($(this).find("option:selected").attr("value") == "otherdue") {
			$("#invoiceDetailsOtherBlock").fadeIn(250, function() {
				$(this).show();
			})
		} else {
			$("#invoiceDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
		}
	})
	//invoice modal add listener
	$("#addInvoiceButton").click(function() {
		$("#addInvoiceForm").submit();
	})
	//invoice add form validation
	$("#addInvoiceForm").validate({
		submitHandler: function() {
			$('#addInvoiceModal').modal('hide');
			$("#cover-spin").fadeIn(250, function() {
				$(this).show();
			})
			addInvoice();
		}
	})
	//payment add button listener
	$("#paymentb").on('click', function() {
		$("#addPaymentModal").modal();
	})
	//payment bond checkbox listener
	$("input[type=checkbox][name=paymentBond]").on('change', function() {
		if (this.checked) {
			$("#paymentDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
			removeOptions(document.getElementById("paymentDetails"));
			var optionElement1 = document.createElement("option");
			var optionElement2 = document.createElement("option");
			var optionElement3 = document.createElement("option");
			optionElement1.value = "transfer";
			optionElement1.innerHTML = "Bond Money Transfer";
			optionElement2.value = "refund";
			optionElement2.innerHTML = "Bond Money Refund";
			optionElement3.value = "bondpay";
			optionElement3.innerHTML = "Bond Money Payment";
			document.getElementById("paymentDetails").appendChild(optionElement1);
			document.getElementById("paymentDetails").appendChild(optionElement2);
			document.getElementById("paymentDetails").appendChild(optionElement3);
		} else {
			$("#paymentDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
			removeOptions(document.getElementById("paymentDetails"));
			var optionElement1 = document.createElement("option");
			var optionElement2 = document.createElement("option");
			var optionElement3 = document.createElement("option");
			var optionElement4 = document.createElement("option");
			optionElement1.value = "rentpay";
			optionElement1.innerHTML = "Rental Payment";
			optionElement2.value = "finepay";
			optionElement2.innerHTML = "Fine Payment";
			optionElement3.value = "bondpay";
			optionElement3.innerHTML = "Bond Money Payment";
			optionElement4.value = "otherpay";
			optionElement4.innerHTML = "Other Payment";
			document.getElementById("paymentDetails").appendChild(optionElement1);
			document.getElementById("paymentDetails").appendChild(optionElement2);
			document.getElementById("paymentDetails").appendChild(optionElement3);
			document.getElementById("paymentDetails").appendChild(optionElement4);
		}
	})
	//payment amount listener
	$("#paymentAmount").on('keyup change', function() {
		$("#paymentAmount").val(get_moneydot($("#paymentAmount").val()));
	})
	//payment modal details listener
	$("#paymentDetails").on('change', function() {
		if ($(this).find("option:selected").attr("value") == "otherpay") {
			$("#paymentDetailsOtherBlock").fadeIn(250, function() {
				$(this).show();
			})
		} else {
			$("#paymentDetailsOtherBlock").fadeOut(250, function() {
				$(this).hide();
			})
		}
	})
	//payment modal add listener
	$("#addPaymentButton").click(function() {
		$("#addPaymentForm").submit();
	})
	//payment add form validation
	$("#addPaymentForm").validate({
		submitHandler: function() {
			$('#addPaymentModal').modal('hide');
			$("#cover-spin").fadeIn(250, function() {
				$(this).show();
			})
			addPayment();
		}
	})
	//stop loading icon
	setTimeout(function(){
		$("#cover-spin").fadeOut(250, function() {
			$(this).hide();
		})
	}, 1000);
	
})