  var dayArray = new Array();
  var mendtime;
  var mstime;
  var dcid;
  var evstime;
  var evendtime;
  var conv;
  var hh;
  var did;
  var gdbutton;
  var bkt;
  var bkingid;
  var dt;
  $(document).ready(function() {

    var slot_btn_id = "";

    function click_On_Span_Button_Click(obj) //THIS FUNCTION WILL WORK WHEN I WILL CLICK BOOKING BUTTON
    {
      did = obj.data('id'); //THIS WILL TAKE CURRENT ID
      gdbutton = obj;
      $('#Bdocid').val(did); //THIS WILL SET VALUE IN DOCTORID
      $('#bookModal').modal('show'); //THIS WILL POP UP MODAL
      dt = obj.data('timestamp'); //THIS WILL TAKE DATATIMESTAMP
      var dtt = new Date(dt).toLocaleTimeString().replace(/:\d{2}\s/, ' '); //THIS WILL SHOW TIME IN HH:MM FORMAT IN BOOKING MODAL
      $('.selectedTime').html(dtt);
      $('#Bdoctime').val(dtt); //THIS WILL SET DOCTORTIME
      $('#Bdoctimestamp').val(dt); //THIS WILL SET DOCTORTIMESTAMP IN BOOKING MODAL
    }

    function click_On_IconClose_Button_Click(obj) {
      var cdid = obj.attr('id');
      slot_btn_id = obj.attr("parentids");
      $("#ModalOnCancel").modal("show");
      var doccid = obj.data('id');
      $("#Canceldocid").val(doccid);
      $('#CancelBookingid').val(cdid);
    }

    $('#pageb').click(function() { //IT WILL LOAD OCTOR FORM
      $('.content-header h1').text('Doctor Form');
      $('#content1').load('index.php', function(response, status, xhr) {
        $('#pagec').removeClass("active");
        $('#pagea').removeClass("active");
        $('#pageb').addClass("active");
        if (status == "error") {
          console.log(msg + xhr.status + " " + xhr.statusText);
        }
      });
    });



    $('a').on('click', function(e) {
        $(this).find('[class*="angle"]').toggleClass('fa-angle-left fa-angle-down')
    });

    $('.fa-angle-left').on('click', function(e) {
      $(this).css({
        transition: 'transform .5s'
      });
    });

    $('#pagec').click(function() {
    $('.content-header h1').text('View Doctors');
    $('.breadcrumb').hide();
    $('#content1').load('index1.php', function(response, status, xhr) {
      $('#pageb').removeClass("active");
      $('#pagec').addClass("active");
      $('#Actval').val("Update");
      if (status == "error") {
          console.log(msg + xhr.status + " " + xhr.statusText);
      }

    });
  });

    $(document).on('click', '.pagea', function() { //IT WILL LOAD DASHBOARD PAGE
      $('.content').load('dashboard.php #content1');
      $('.content-header h1').text('Dashboard');
      $('#pageb').removeClass("active");
      $('#pagea').addClass("active");
    });


    //THIS WILL WORK ON SEARCH BOX
    $(".docsearch").autocomplete({
      source: function(request, response) {
        //IT WILL GO ON SEARCH.PHP
        $.ajax({
          url: "search.php",
          method: "GET",
          dataType: "json",
          data: {
            term: request.term
          },
          success: function(data) {
            response(data);
          }
        });
      },
      focus: function(event, ui) {
        $(".docsearch").val(ui.item.value); //IT WILL FOCUS ON SEARCH RESULT
        $(".docid").val(ui.item.id); //IT WILL PUT DOCTORID IN HIDDEN FIELD
        return false;
      },
      select: function(event, ui) { //THIS EVENT WILL WORK ON SELECT OF PARTICULAR NAME
        // Set selection
        $('.docsearch').val(ui.item.value); // display the selected text
        $(".docid").val(ui.item.id);
        $('#content1').load('doctor-info.php');
        $('.content-header h1').text('Book Appointment');
        allDoctorValue();
      }

    });

    function allDoctorValue() {
      var docsearch = $('.docsearch').val();
      var DoctorID = $('.docid').val();


      // THIS AJAX DISPLAY ALL DOCTOR INFORMATION OF A SPECIFIED DOCTOR IN DOCTOR INFO.PHP

      $.ajax({
        url: "ajax-display-doctor-info.php",
        method: "POST",
        dataType: "json",
        data: {DoctorID: DoctorID},
        success: function(data) {
          //THIS IS A ENUM TO COMPARE DAYS ARRAY
          var sorter = {"monday": 1, "tuesday": 2,"wednesday": 3,"thursday": 4, "friday": 5, "saturday": 6,"sunday": 7 }

            data.sort(function sortByDay(a, b) {
            var day1 = a.Days.toLowerCase();
            var day2 = b.Days.toLowerCase();
            return sorter[day1] > sorter[day2];
          });


          var jsonstring = JSON.stringify(data);
          var jsondata = JSON.parse(jsonstring);


            var daysofweek_in_an_array = [sorter.monday, sorter.tuesday, sorter.wednesday, sorter.thursday, sorter.friday, sorter.saturday, sorter.sunday];
            var excludedaysofweek = [];
            for (var s in sorter) {
              if (sorter.hasOwnProperty(s)) {
                if (daysofweek_in_an_array.indexOf(sorter[s])) {
                  excludedaysofweek.push(sorter[s]);
                  //console.log(excludedaysofweek.push(sorter[s]));
                }
              }
            }

          for (var j = 0; j < jsondata.length; j++) {
            $('.OPDDays').append(jsondata[j].Days + ","); //APPEND DAYS ARRAY IN SORTED MANNER TO
          }

          $.each(jsondata, function(i, item) {
            dcid = item.DoctorID; //PARTICULAR DOCTORID DOCTOR INFO.PHP

            $('#DoctorName').html(item.DoctorName).css({
              'font-weight': 'bold', //SETS DOCTOR NAME IN DOCTOR INFO.PHP
              'font-size': '20px'
            });
            $('#Qualification').html(item.Qualification); //SET QUALIFICATION IN DOCTOR INFO.PHP
            $('#Experience').html(item.Experience);
            $('#HospitalName').html(item.HospitalName); //SET HOSPITAL NAME IN DOCTOR INFO.PHP
            $('#LongDesc').html(item.ShortDesc);
            $('#Telephone').html(item.Telephone); //SET TELEPHONE NO IN DOCTOR INFO.PHP
            dayArray.push(item.Days);
            var today = new Date(); //CREATE A DATE OBJECT IN TODAY VARIABLE
            var gfy = today.getFullYear(); //GET CURRENT FULL YEAR
            var gm = today.getMonth() + 1; //GET CURRENT MONTH
            var gd = today.getDate(); //GET TODAY DATE
            mstime = new Date(gfy + "-" + gm + "-" + gd + " " + item.MorningFrom).getTime(); //IT CONVERTED IT INTO HH:MM:SS
            var morning_from_time = new Date(mstime).toLocaleTimeString().replace(/:\d{2}\s/, ' '); //IT WILL REPLACE TO HH:MM
            $('.MorningFromTime').html(morning_from_time);
            mendtime = new Date(gfy + "-" + gm + "-" + gd + " " + item.MorningTo).getTime();
            var mo_end_time_tolocaletimestring = new Date(mendtime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
            evstime = new Date(gfy + "-" + gm + "-" + gd + " " + item.EveningFrom).getTime();
            $('.MorningFromTime').html(morning_from_time + ' - ' + mo_end_time_tolocaletimestring);
            var evening_start_time = new Date(evstime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
            evendtime = new Date(gfy + "-" + gm + "-" + gd + " " + item.EveningTo).getTime();
            var ev_end_time_tolocaletimestring = new Date(evendtime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
            $('.EveningFromTime').html(evening_start_time + ' - ' + ev_end_time_tolocaletimestring);
          });

          var timer = new Date(); //GET NEW DATE AND TIME
          var runningtime = timer.getTime(); //GET CURRENT RUNNING TIME

          for (var i = mstime; i < mendtime; i += 300000) {
            //LOOP TO ADD MORNING TIMINGS OF 5 MINUTES SLOT
            conv = new Date(i).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
            // APPENDING SLOTS IN DIV HERE YOU CAN RECIEVE bookbtn CLASS btnClose CLASS
            $('.MorningFrom').append('<div  class=" btn-normal btn-group bkbtn "><span type="button" id="' + i + '" class="btn btn-default btn-flat bookbtn bkk "   data-placement="top"  data-html="true" data-check="" data-id="' + dcid + '" data-timestamp="' + i + '" ><i data-id="' + dcid + '" class="fa fa-close btnClose"></i>&nbsp;&nbsp;' + conv + '</span></div>')

            /*THIS TIMESTAMP IS LESS THAN RUNNINGTIME IT
             WILL CHANGE OPACITY AND OFF ITS CLICK ACTION*/

            if (i <= runningtime) {
              $('#' + i).css('opacity', '0.5').removeClass('bookbtn');
            }

          }

          for (var i = evstime; i < evendtime; i += 300000) {
            //LOOP TO ADD EVENING TIMES OF 5 MINUTES SLOT
            conv = new Date(i).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
            $('.EveningTime').append('<div class="btn-normal btn-group bkbtn "><span type="button" id="' + i + '" class="btn btn-default btn-flat bookbtn bkk " title="" data-check="0" data-id="' + dcid + '" data-timestamp="' + i + '"><i data-id="' + dcid + '" class="fa fa-close btnClose" Parentids="' + i + '"></i>&nbsp;&nbsp;' + conv + '</span></div>')
            if (i <= runningtime) {
              $('#' + i).css('opacity', '0.5').removeClass('bookbtn');

            }

          }

          $.ajax({
            url: "ajax-launch-enabled-timings.php",
            method: "POST",
            dataType: "json",
            data: { DoctorID: DoctorID},
            success: function(data) {
              var jsonstring = JSON.stringify(data);
              var jsondata = JSON.parse(jsonstring);
              $.each(jsondata, function(i, item) {
                Bookingtimestamp = item.Bookingtimestamp;
                var PatientName = item.PatientName;
                var PatientMobileNumber = item.PatientMobileNumber;

                bkingid = item.BookingID;
                $('#' + Bookingtimestamp).data('parentid', bkingid);
                  $('#' + Bookingtimestamp).data('check', 1).css({
                  'font-weight': 'bold',
                  'background-color': '#ef2b32',
                  'color': '#FFFFFF'
                });
                $('#' + Bookingtimestamp).off('click');

                var check = $('#' + Bookingtimestamp).data('check', 1);
                if (check) {
                  $('#' + Bookingtimestamp).children('.btnClose').css('display', 'block');
                }
                $('#' + Bookingtimestamp).children('.btnClose').attr('id', bkingid);
                $('#' + Bookingtimestamp).attr('title', PatientName + " - " + PatientMobileNumber);
                $('#' + Bookingtimestamp).tooltipster({
                  theme: 'tooltipster-punk',
                  content:$('<i class="fa fa-fw fa-user"></i>'+"-"+ PatientName + " <br/> "+'<i class="fa fa-fw fa-phone-square"></i>'+"-" + PatientMobileNumber+'</span>' )
                });
              });
            }
          });
          //CLIENT SIDE AJAX FUNCTIONS OF BOOKING AND CANCELLATION
          $('.bookbtn').click(function() {
            click_On_Span_Button_Click($(this));
          });

          //BOOKING FORM VALIDATION

          $('#frmBook').validate({
            rules: {
              PatientName: {
                required: true
              },

              PatientMobileNumber: {
                required: true,
                number: true
              },
            },

            messaages: {
              PatientName: {},
              PatientMobileNumber: {
                required: '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp;Enter your phone number',
                number: "enter 10 digits only"
              }
            },

            highlight: function(element) {
              $(element).closest('.errMsg');
            },

            unhighlight: function(element) {
              $(element).closest('.errMsg');
            },
            errorElement: 'div',
            errorClass: 'errMsg',
            errorPlacement: function(error, element) {

              if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
              } else {
                error.insertAfter(element);
              }
            },

            submitHandler: function(form) {

              var formdata = $("#frmBook").serializeArray();
              alert(formdata);

              //BOOKING AJAX TO BOOK A NEW USER
              $.ajax({
                type: 'POST',
                url: 'ajax-book-appointment.php',
                data: formdata,
                dataType: "text",
                success: function(html) {
                  // alert(html);
                  var json = JSON.parse(html);
                  var PatientName = json.PatientName;
                  var PatientMobileNumber = json.PatientMobileNumber;
                  var lastid = json.LastId;
                  gdbutton.attr('title', PatientName + '-' + PatientMobileNumber);
                  $(gdbutton).tooltipster({
                    theme: 'tooltipster-punk',
                    content:$('<i class="fa fa-fw fa-user"></i>'+"- "+ PatientName + " <br/> "+'<i class="fa fa-fw fa-phone-square"></i>'+"- " + PatientMobileNumber+'</span>' )
                  });
                  gdbutton.data('check', 1);
                  gdbutton.off('click');
                  gdbutton.children('.btnClose').attr('id', lastid);
                  gdbutton.children('.btnClose').css('display', 'block');
                  gdbutton.css({

                    'font-weight': 'bold',
                    'background-color': '#ef2b32',
                    'color': '#FFFFFF'
                  });
                  $('#bookModal').modal('hide');

                  $('#frmBook')[0].reset();

                }
              });
            }
          });
          /*ON CLICKING CLOSE BUTTON WITH CROSS ICON DISPLAY
           AND SHOW CANCEL MODAL*/

          $('.btnClose').click(function() {
            click_On_IconClose_Button_Click($(this));
          });

          //MODAL ON CANCEL validate
          $('#frmCancel').validate({
            rules: {
              PatientMobileNumber: {
                required: true,
                number: true
              }
            },
            messages: {
              PatientMobileNumber: {
                required: '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp;Enter your phone number',
                number: "enter 10 digits only"
              }
            },
            highlight: function(element) {
              $(element).closest('.errMsg');
            },
            unhighlight: function(element) {
              $(element).closest('.errMsg');
            },
            errorElement: 'div',
            errorClass: 'errMsg',
            errorPlacement: function(error, element) {
              if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
              } else {
                error.insertAfter(element);
              }
            },
            submitHandler: function(form) { //SUBMITTING ModalOnCancel FORM

              var formdata = $("#frmCancel").serialize();
              $.ajax({ //API USE WHILE CANCEL BUTTON
                type: "POST",
                url: "ajax-cancel-appointment.php",
                data: formdata,
                dataType: "html",
                success: function(data) {
                  if (data == 1) {
                    $("#" + slot_btn_id).css({
                      'font-weight': '',
                      'background-color': '',
                      'color': ''
                    });
                    $("#" + slot_btn_id).children('.btnClose').css('display', 'none');
                    $("#" + slot_btn_id).data('check', 0);
                    $("#" + slot_btn_id).removeAttr("title");
                    $('#frmCancel')[0].reset();
                    $('#ModalOnCancel').modal('hide');
                    $("#" + slot_btn_id).click(function() {
                      click_On_Span_Button_Click($(this));
                    });
                  } else {
                    $('#frmCancel')[0].reset();
                    $('#ModalOnCancel').modal('hide');
                  }
                }
              });
            }
          });
        } //success all doctorinfo ajax
      }); //doctor-info-ajax
    } //function all doctor value
  }); //document.ready
