/**
 *                      TEN JQUERY TO JEST CHUJ I CIPA -> NIC Z TEGO NIE BEDZIE -> ELO
 * */
$(document).ready(function(){ // START
    $('.inputElement').hide(); // hide all inputs
    /**
     * HIDE AND SHOW
     * Na klikniecie odpowiednio zmieniaja sie widoki -> to jest do usprawnienia/poprawienia w zaleznosci od stylowania samej strony
     * */
    $("#addSubject").click(function () { // show subject - adding options
        $('.inputElement').hide();
        $("#SubjectContainer").show();
    });
    $("#addLecturer").click(function () { // show lecturer - adding options
        $('.inputElement').hide();
        $("#LecturerContainer").show();
    });
    /*
    $("#addGroup").click(function () { // show group - adding options
        $('.inputElement').hide();
        $("#GroupContainer").show();
    });
    */
    $("#addMeeting").click(function () { // show metting - adding options
        $('.inputElement').hide();
        $("#MeetingContainer").show();
    });
    $("#addRoom").click(function () { // show room - adding options
        $('.inputElement').hide();
        $("#RoomContainer").show();
    });
    $("#addNote").click(function () { // show note - adding options
        $('.inputElement').hide();
        $("#NoteContainer").show();
    });

    // Here starts Code for adding multiple groups for object at once
    let GroupLecturerJSON = [];
    let GroupRoomJSON = [];

    $("#addGroupButton").click(function () { // add group input fields and push them to array

        $("#GroupContainer").append($("<h3>Dodaj Group</h3>\n" +
            "                        <label>Ilosc godzin dla przedmiotu</label>\n" +
            "                        <div class=\"inputField\">\n" +
            "                            <input type=\"text\" class=\"GroupElements\" id=\"getGroupHours\" placeholder=\"30\">\n" +
            "                        </div>\n" +
            "                        <label>Nazwa Grupy</label>\n" +
            "                        <select name=\"GroupName\" class=\"GroupElements\" id=\"getGroupName\">\n" +
            "                            <option>Grupa 1</option>\n" +
            "                            <option>Grupa 2</option>\n" +
            "                            <option>Grupa 3</option>\n" +
            "                            <option>Grupa 4</option>\n" +
            "                            <option>Grupa 5</option>\n" +
            "                            <option>Grupa 6</option>\n" +
            "                        </select>\n" +
            "                        <label>Rozmiar Grupy</label>\n" +
            "                        <div class=\"inputField\">\n" +
            "                            <input type=\"text\" class=\"GroupElements\" id=\"getGroupSize\" placeholder=\"50\">\n" +
            "                        </div>\n" +
            "                        <label>Typ Grupy</label>\n" +
            "                        <select name=\"GroupType\" class=\"GroupElements\" id=\"getGroupType\">\n" +
            "                            <option>WYKLAD</option>\n" +
            "                            <option>LAB</option>\n" +
            "                            <option>NIEST</option>\n" +
            "                        </select>\n" +
            "                        <label>Rok Studiów</label>\n" +
            "                        <select name=\"Year\" class=\"GroupElements\" id=\"getGroupYear\">\n" +
            "                            <option>ROK_I</option>\n" +
            "                            <option>ROK_II</option>\n" +
            "                            <option>ROK_III</option>\n" +
            "                            <option>ROK_IV</option>\n" +
            "                        </select>\n" +
            "                        <label>Wykładowca grupy</label>\n" +
            "                        <div id=\"SelectGroupLecturer\" class=\"test1\">\n" +
            "                            <select id=\"selectLec\" class=\"form-select display\">\n" +
            "                                <option value = \"\"></option>\n" +
            "                            </select>\n" +
            "                        </div>\n" +
            "                        <label>Sala Grupy</label>\n" +
            "                        <div id=\"SelectGroupRoom\" class=\"test2\">\n" +
            "                            <select id=\"selectRm\" class=\"form-select display\">\n" +
            "                                <option value = \"\"></option>\n" +
            "                            </select>\n" +
            "                        </div>"));

        $("#GroupContainer").show();
    });
    /**
     * BUTTONS - ON CLICK OPTION WITH ACTION
     * wszystko ponizej jest odpowiedzialne za dodawanie elementow do bazy danych i wyswietlanie elementow pobranych z bazy danych
     * */

    $("#getSubjectButton").click(function() { // adding new lecturer - tmp output in line below
        let getSubjectHoursInput = $("#getSubjectHours").val();
        let getSubjectNameInput = $("#getSubjectName").val();
        let getSubjectYearInput = $("#getSubjectYear").val();

        const SubjectJSON = jQuery.parseJSON( '{ "hours": '+getSubjectHoursInput+', "name": "'+getSubjectNameInput+'","year": "'+getSubjectYearInput+'"}' );
        console.log(JSON.stringify(SubjectJSON)); //json for subject inputs

        $( ".test1" ).each(function( index ) {
            console.log($( this ).val());
            GroupLecturerJSON.push($( this ).val());
        });

        $( ".test2" ).each(function( index ) {
            console.log($( this ).val());
            GroupRoomJSON.push($( this ).val());
        });

        // Subject Posting Data

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            url: "http://localhost:8080/api/v1/subject",
            data: JSON.stringify(SubjectJSON),
            //data: JSON.stringify({"hours": getSubjectHoursInput,"name": getSubjectNameInput,"year": getSubjectYearInput}),
            success : function(lecturer){
                console.log(lecturer)
            }
        });

        //Group Posting Data

        var groupEL = 1;
        let getGroupHoursInput;
        let getGroupNameInput;
        let getGroupSizeInput;
        let getGroupTypeInput;
        let getGroupYearTypeInput;

        $( ".GroupElements" ).each(function( index ) {
            //console.log( index + ": " + $( this ).val() );
            //console.log($( this ).val());
            if (groupEL == 1){
                getGroupHoursInput = $( this ).val();
            }
            if (groupEL == 2){
                getGroupNameInput = $( this ).val();
            }
            if (groupEL == 3){
                getGroupSizeInput = $( this ).val();
            }
            if (groupEL == 4){
                getGroupTypeInput = $( this ).val();
            }
            if (groupEL == 5){
                getGroupYearTypeInput = $( this ).val();
                const GroupJSON = jQuery.parseJSON( '{ "hours": '+getGroupHoursInput+',"name": "'+getGroupNameInput+'","size": '+getGroupSizeInput+',"type": "'+getGroupTypeInput+'","yearType": "'+getGroupYearTypeInput+'"}' );
                console.log(JSON.stringify(GroupJSON));

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    url: "http://localhost:8080/api/v1/group",
                    data: JSON.stringify(GroupJSON),
                    //data: JSON.stringify({ "hours": getGroupHoursInput ,"name": getGroupNameInput,"size": getGroupSizeInput,"type": getGroupTypeInput,"year_type": getGroupYearTypeInput}),
                    success : function(lecturer){
                        console.log(lecturer)
                    }
                });

                groupEL = 0;
            }
            groupEL++;
        });
        $("#GroupContainer").html(""); // json for groups inputs

    });
    $("#getLecturerButton").click(function() { // adding new lecturer - tmp output in line below

        let getLecturerNameInput = $("#getLecturerName").val();
        let getLecturerLastNameInput = $("#getLecturerLastName").val();
        let getLecturerDegreeInput = $("#getLeturerDegree").val(); // !IMPORTANT -> RED FAL
        //const LecturerJSON = jQuery.parseJSON( '{ "name": "'+getLecturerNameInput+'","lastname": "'+getLecturerLastNameInput+'","title": "'+getLecturerDegreeInput+'" }' );
        //console.log(JSON.stringify(LecturerJSON));

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            url: "http://localhost:8080/api/v1/lecturer",
            data: JSON.stringify({"name": getLecturerNameInput,"lastname": getLecturerLastNameInput,"title": getLecturerDegreeInput}),
            success : function(lecturer){
                console.log(lecturer)
            }
        });

    });
    /*
    $("#getGroupButton").click(function() {
        let getGroupTypeInput = $("#getGroupType").val();
        let getGroupSizeInput = $("#getGroupSize").val();
        let getGroupYearInput = $("#getGroupYear").val();
        let getGroupHoursInput = $("#getGroupHours").val();
        let getGroupNameInput = $("#getGroupName").val();
        let SelectGroupLecturerInput = $("#SelectGroupLecturer option:selected").val();
        let SelectGroupRoomInput = $("#SelectGroupRoom option:selected").val();
        const GroupJSON = jQuery.parseJSON( '{ "group_type": "'+getGroupTypeInput+'", "group_size": "'+getGroupSizeInput+'", "group_year": "'+getGroupYearInput+'", "group_hours": "'+getGroupHoursInput+'", "group_name": "'+getGroupNameInput+'", "group_lecturer": "'+SelectGroupLecturerInput+'", "group_room": "'+SelectGroupRoomInput+'", }' );

        console.log(JSON.stringify(GroupJSON));
    });
    */
    $("#getMeetingButton").click(function() {
        let getMeetingStartDateInput = $("#dateStart").val();
        let getMeetingEndDateInput = new Date(getMeetingStartDateInput);
        getMeetingEndDateInput.setDate(getMeetingEndDateInput.getDate() + 1); // something like that XD
        getMeetingEndDateInput = getMeetingEndDateInput.getFullYear() + '-' + (getMeetingEndDateInput.getMonth() < 10 ? '0' : '') + (getMeetingEndDateInput.getMonth()+1) + '-'+ (getMeetingEndDateInput.getDate() < 10 ? '0' : '') + getMeetingEndDateInput.getDate(); // date with leading zeros (i know it looks like shit...)
        //const MeetingJSON = jQuery.parseJSON( '{ "date_from": "'+getMeetingStartDateInput+'","date_to": "'+getMeetingEndDateInput+'" }' );
        //console.log(JSON.stringify(MeetingJSON));

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            url: "http://localhost:8080/api/v1/meeting",
            data: JSON.stringify({"dateFrom": getMeetingStartDateInput,"dateTo": getMeetingEndDateInput}),
            success : function(meeting){
                console.log(meeting)
            }
        });
    });

    $("#getNoteButton").click(function() {
        let getNoteTitle = $("#getNoteTitle").val();
        let getNoteInput = $("#getNoteInput").val();
        const NotesJSON = jQuery.parseJSON( '{ "title": "'+getNoteTitle+'","content": "'+getNoteInput+'" }' );
        console.log(JSON.stringify(NotesJSON));

    });
    $("#getRoomButton").click(function() {
        let getRoomName = $("#getRoomNumber").val();
        let getRoomSize = $("#getRoomSize").val();
        //const RoomJSON = jQuery.parseJSON( '{ "number": "'+getRoomName+'", "size": "'+getRoomSize+'" }' );
        //console.log(JSON.stringify(RoomJSON));

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            url: "http://localhost:8080/api/v1/room",
            data: JSON.stringify({"number": getRoomName,"size": getRoomSize}),
            success : function(room){
                console.log(room)
            }
        });

    });
});



/////////////////////////////////DATATABLES DISPLAY//////////////////////////////
////LECTURER DATATABLE////
$(document).ready(function() {
    $('#lecturertable').DataTable({
        "ajax": {
            "url": api_lecturer,
            "type": "GET",
            "dataSrc": "",
        },
        "columns": [{
            data: "name"
        },
            {
                data: "lastname"
            },
            {
                data: "title"
            }
        ]
    });
});
////ROOM DATATABLE////
$(document).ready(function() {
    $('#roomtable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/api/v1/room",
            "type": "GET",
            "dataSrc": "",
        },
        "columns": [{
            data: "number"
        },
            {
                data: "size"
            }
        ]
    });
});
////MEETING DATATABLE////
$(document).ready(function() {
    $('#mettingtable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/api/v1/meeting",
            "type": "GET",
            "dataSrc": "",
        },
        "columns": [{
            data: "dateFrom"
        },
            {
                data: "dateTo"
            }
        ]
    });
});
/*
////NOTE DATATABLE////
$(document).ready(function() {
    $('#notetable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/api/v1/note",
            "type": "GET",
            "dataSrc": "",
        },
        "columns": [{
            data: "title"
        },
            {
                data: "noteinput"
            }
        ]
    });
});
*/

/////////////////////////////////SELECTS DISPLAY(IN GROUPS INPUT)//////////////////////////////
////LECTURER SELECT////
$(document).ready(function() {
    let selectL = $('#selectLec');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: api_lecturer,
        success : function(lecturers){
            console.log(lecturers)

            $.each(lecturers, function(i, item) {
                let option = $("<option>");
                option.text(item.name + " " + item.lastname + " " + item.title);
                option.attr("value", item.id);
                selectL.append(option);
            });
        }
    });
});

////ROOM SELECT////
$(document).ready(function() {
    let selectR = $('#selectRm');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://localhost:8080/api/v1/room",
        success : function(room){
            console.log(room)

            $.each(room, function(i, item) {
                let option = $("<option>");
                option.text(item.number + " " + item.size);
                option.attr("value", item.id);
                selectR.append(option);
            });
        }
    });
});
