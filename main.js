var Member = function(name, initiative, status, head, torso, leftarm, rightarm, leftleg, rightleg){
	this.name = name || "";
	this.initiative = initiative || 0;
	this.status = status || "";
	this.head = head || "";
	this.torso = torso || "";
	this.leftarm = leftarm || "";
	this.rightarm = rightarm || "";
	this.leftleg = leftleg || "";
	this.rightleg = rightleg || "";

	this.appendTo = function(target){
		var thisObj = this;
		var inserted = false;
		var str = "";
		str += "<tr class='encounter-member' data-init='" + this.initiative + "'>";
		str += "<td class='encounter-member-initiative' contenteditable>" + this.initiative + "</td>";
		str += "<td class='encounter-member-name' contenteditable>" + this.name + "</td>";
		str += "<td class='encounter-member-status' contenteditable>" + this.status + "</td>";
		str += "<td class='encounter-member-head' contenteditable>" + this.head + "</td>";
		str += "<td class='encounter-member-torso' contenteditable>" + this.torso + "</td>";
		str += "<td class='encounter-member-leftarm' contenteditable>" + this.leftarm + "</td>";
		str += "<td class='encounter-member-rightarm' contenteditable>" + this.rightarm + "</td>";
		str += "<td class='encounter-member-leftleg' contenteditable>" + this.leftleg + "</td>";
		str += "<td class='encounter-member-rightleg' contenteditable>" + this.rightleg + "</td>";
		str += "<td class='encounter-member-remove'><button><i class='fa fa-remove'></i> Remove</button></td>";
		str += "</tr>";
		
		$(str).insertBefore($('#add-new-encounter-member'));
		inserted = true;
		sortInitiative();
	}
}

$('#add-member-button').on('click', function(){
	//get values
	var init = $('#add-new-encounter-member .encounter-member-initiative input').val();
	var name = $('#add-new-encounter-member .encounter-member-name input').val();
	var status = $('#add-new-encounter-member .encounter-member-status input').val();
	var head = $('#add-new-encounter-member .encounter-member-head input').val();
	var torso = $('#add-new-encounter-member .encounter-member-torso input').val();
	var leftarm = $('#add-new-encounter-member .encounter-member-leftarm input').val();
	var rightarm = $('#add-new-encounter-member .encounter-member-rightarm input').val();
	var leftleg = $('#add-new-encounter-member .encounter-member-leftleg input').val();
	var rightleg = $('#add-new-encounter-member .encounter-member-rightleg input').val();
	
	//create and append member
	var member = new Member(name, init, status, head, torso, leftarm, rightarm, leftleg, rightleg);
	member.appendTo('#encounter-member-list tbody');
	
	//clear inputs
	$('input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
})

$('#encounter-member-list').on('click', '.encounter-member-remove button', function(){
	$(this).closest('.encounter-member').remove();
});

$('#encounter-member-list').on('blur', ".encounter-member .encounter-member-initiative", function(){
	reinsertIntoMemberList($(this).closest('.encounter-member'));
})

function reinsertIntoMemberList(member){
	var init = member.find('.encounter-member-initiative').html();
	var name = member.find('.encounter-member-name').html();
	var status = member.find('.encounter-member-status').html();
	var head = member.find('.encounter-member-head').html();
	var torso = member.find('.encounter-member-torso').html();
	var leftarm = member.find('.encounter-member-leftarm').html();
	var rightarm = member.find('.encounter-member-rightarm').html();
	var leftleg = member.find('.encounter-member-leftleg').html();
	var rightleg = member.find('.encounter-member-rightleg').html();
	member.remove();
	
	//create and append new member
	var newMember = new Member(name, init, status, head, torso, leftarm, rightarm, leftleg, rightleg);
	newMember.appendTo('#encounter-member-list tbody');
}

function sortInitiative(){
    var $members = $('.encounter-member');
    var iNums = [];
    var members = [];
    $members.each(function(){
        var init = parseInt($(this).attr("data-init"));
        if (iNums.indexOf(init) < 0) iNums.push(init);
    })
    iNums.sort(function(a, b) {
      return a - b;
    });
    for (var i=0;i<iNums.length;i++){
        var $member = $('.encounter-member[data-init=' + iNums[i] + ']');
        members.push($member)
    }
    $members.remove();
    for (var j=0; j<members.length; j++){
        $('#add-new-encounter-member').parent().prepend(members[j]);
    }
}
