var DoctorPhoto;
var map;
var marker;
var DoctorName;
var Qualification;
var Experience;
var Days;
var mff;
var mtt;
var Telephone;
var HospitalName;
var LongDesc;
var DoctorID;
var m_f;
var m_t;
var Address;
var bkingid;
var Bookingtimestamp;
var slot_btn_id = "";
function click_On_Span_Button_Click(obj) //THIS FUNCTION WILL WORK WHEN I WILL CLICK BOOKING BUTTON
  {
    did = obj.data('id'); //THIS WILL TAKE CURRENT ID
    gdbutton = obj;
    $('#Bdocid').val(did); //THIS WILL SET VALUE IN DOCTORID
    $(".cancel-appointment").css('display','none');
    $('.book-appointment').fadeIn(3000); //THIS WILL POP UP MODAL
    dt = obj.data('timestamp'); //THIS WILL TAKE DATATIMESTAMP
    var dtt = new Date(dt).toLocaleTimeString().replace(/:\d{2}\s/, ' '); //THIS WILL SHOW TIME IN HH:MM FORMAT IN BOOKING MODAL
    $('.selectedTime').html(dtt);
    $('#Bdoctime').val(dtt); //THIS WILL SET DOCTORTIME
    $('#Bdoctimestamp').val(dt); //THIS WILL SET DOCTORTIMESTAMP IN BOOKING MODAL
    $('#mapModal').scrollTop(0);
  }

  function click_On_IconClose_Button_Click(obj) {
      var cdid = obj.attr('id');
      slot_btn_id = obj.attr("parentids");
      $('.cancel-appointment').fadeIn(3000);
      $('.book-appointment').fadeOut(1000);
      var doccid = obj.data('id');
      $("#Canceldocid").val(doccid);
      $('#CancelBookingid').val(cdid);
      $('#mapModal').scrollTop(0);
    }
function initMap() {
  map = new google.maps.Map(document.getElementById('all_locations_map'), {
    center: new google.maps.LatLng(28.578789, 77.06652),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infoWindow = new google.maps.InfoWindow;

  $.ajax({
    url: "ajax-show-doctor-locations.php",
    type: "POST",
    dataType: "html",
    success: function(data) {
      var json_parse = JSON.parse(data);
      if (json_parse.length !== 0)
        $.each(json_parse, function(i, item) {
          var today = new Date();
          var gfy = today.getFullYear(); //GET CURRENT FULL YEAR
          var gm = today.getMonth() + 1; //GET CURRENT MONTH
          var gd = today.getDate(); //GET TODAY DATE
          var lat = item.Latitude;
          var long = item.Longitude;
          var locations = new Array();
          m_f = item.MorningFrom;
          DoctorID = item.DoctorID;
          mff = m_f.split(',')[0];
          var mstime = new Date(gfy + "-" + gm + "-" + gd + " " + mff).getTime(); //IT CONVERTED IT INTO HH:MM:SS
          var morning_from_time = new Date(mstime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
          var m_t = item.MorningTo;
          var e_f=item.EveningFrom;
          var eff=e_f.split(',')[0];
          var e_t=item.EveningTo;
          var ett=e_t.split(',')[0];
          var evendtime= new Date(gfy + "-" + gm + "-" + gd + " " + eff).getTime();
          var evening_to_time=new Date(evendtime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
          mtt = m_t.split(',').reverse()[0];
          DoctorName = item.DoctorName;
          Qualification = item.Qualification;
          Experience = item.Experience;
          Days = item.Days;
          Telephone = item.Telephone;
          HospitalName = item.HospitalName;
          LongDesc = item.LongDesc;
          Address=item.Address;
          Fees=item.Fees;
          function storeCoordinate(lat, long, array) {
            array.push(lat);
            array.push(long);
          }
          storeCoordinate(lat, long, locations);

          for (var i = 0; i < locations.length; i += 2) {

            var x = locations[i];
            //console.log(x);
            var y = locations[i + 1];
            marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "img/hospital-2.png",
              position: new google.maps.LatLng(x, y),
              title: 'click Me' // $('#someDiv').html();
            });

            var content_string = '<div id="iw-container">' +

              '<div class="iw-title" style="background-color:#006666;">' +'<div class="row">'+'<div class="col-xs-4 col-sm-4 col-md-4">'+'<div class="iw-userimage">'+'<img class="img-circle" src="img/kitten.jpg" alt="User Avatar">'+'</div>'+'</div>'+'<div class="col-sm-8 col-md-8 col-lg-8" style="text-align:left">'+'<h3 class="docname">'+ item.DoctorName + '</h3>'+'<h5 class="user-desc">'  + item.Qualification + '</h5>'+'<h5 class="user-desc">' + item.Experience +'&nbsp;yrs of experience'+'</h5></div>'+'</div>'+'</div>' +
              '<div class="iw-content">' +
              '<div class="iw-subTitle" style="color:black;font-size:14px;text-align: left;font-weight:300;">'+'<div class="no-padding">'+'<i class="far fa-hospital" style="color:#006699;">&nbsp;&nbsp;' + '</i>'+item.HospitalName +
              '<br>' +'<hr class="iw-hr">'+'<i class="fa fa-location-arrow" style="color:#006699;">' + '</i>&nbsp;&nbsp;'+ item.Address +  '<br>' + '<hr class="iw-hr">'+'<i class="fas fa-rupee-sign" style="color:#006699;">'+'</i>&nbsp;&nbsp;' + item.Fees +  '<br>' +'<hr class="iw-hr">'+'<i class="fas fa-calendar" style="color:#006699;">&nbsp;&nbsp;</i><span id="opddays">(' + item.Days + ')<br>' +'<hr class="iw-hr">'+ '<i class="far fa-clock" style="color:#006699;">&nbsp;&nbsp;</i>'+'<span >(' + morning_from_time  + '-' + evening_to_time + ') <hr class="iw-hr">'+'</div>'+'</div>'+
              '<div class="row">' +'<div class="col-xs-6 col-md-6 col-sm-6">'+ '<button type="button" class="btn text-white btn-direction" ><i class="fas fa-location-arrow text-white"></i>&nbsp;&nbsp;&nbsp;Get Directions</button></div>'+'<div class="col-xs-6 col-sm-6 col-md-6">'+'<button class="btn pull-right btn-dark book_appointment_map" id="' + DoctorID + '" data-doctorname="'+DoctorName+'" data-details="'+ Qualification + ',' + HospitalName + ',' + LongDesc +','+Telephone+','+Experience+','+Fees+'" data-address="'+Address+'" data-days="'+Days+'" data-MorningFrom='+mff+' data-MorningTo='+mtt+' data-EveningFrom='+eff+' data-EveningTo='+ett+'><i class="fa fa-fw fa-calendar text-white"></i>&nbsp;&nbsp;&nbsp;Book Appointment</button></div>' + '</div>' +'</div>' +
              '<div class="iw-bottom-gradient"></div>' +
              '</div>';

            (function(marker, i) {
              google.maps.event.addListener(marker, 'click', function() {
                infowindow = new google.maps.InfoWindow({
                  content: content_string
                });
                infowindow.open(map, marker);
              });
            })(marker, i);
            //console.log(y);
          }



        });
    }
  });
}



$(document).ready(function() {
  initMap();
  $(document).on('click', '.book_appointment_map', function() {
    var all_pieces;
    var today = new Date();
    $('#slot_MorningFrom').empty();
    $('#slot_EveningTime').empty();
    var DoctorID = $(this).attr('id');
    var details = $(this).data('details');
    var split_details = details.split(',');
    var split_Address=$(this).data('address');
    var days_details=$(this).data('days');
    var doctor_name=$(this).data('doctorname');
    var data_morningFrom=$(this).data('morningfrom');
    var data_morningTo=$(this).data('morningto');
    var data_eveningFrom=$(this).data('eveningfrom');
    var data_eveningTo=$(this).data('eveningto');
    var pieces=days_details.split(/[\s,]+/);
    var last_day=pieces[pieces.length-1];
    var first_day=pieces[0];
    var gfy = today.getFullYear(); //GET CURRENT FULL YEAR
    var gm = today.getMonth() + 1; //GET CURRENT MONTH
    var gd = today.getDate(); //GET TODAY DATE
    var mstime = new Date(gfy + "-" + gm + "-" + gd + " " + data_morningFrom).getTime(); //IT CONVERTED IT INTO HH:MM:SS
    var morning_from_time = new Date(mstime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    var mendtime = new Date(gfy + "-" + gm + "-" + gd + " " + data_morningTo).getTime();
    var morning_end_time=new Date(mendtime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    var evstime=new Date(gfy +"-"+ gm + "-" + gd +" "+ data_eveningFrom).getTime();
    var evening_from_time=new Date(evstime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    var evendtime= new Date(gfy + "-" + gm + "-" + gd + " " + data_eveningTo).getTime();
    var evening_to_time=new Date(evendtime).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    $('#mapModal').modal('show');
    $('#DoctorName').html(doctor_name);
    $('#Qualification').html(split_details[0]);
    $('#Experience').html(split_details[4]);
    $('#OPDDays').html(" "+days_details);
    $('#Timings').html(morning_from_time+ '-' + morning_end_time);
    $('#Telephone').html(split_details[3]);
    $('#Fees').html(split_details[5]);
    $('#HospitalName').html(split_details[1]);
    $('#Address').html(split_Address);
    if(LongDesc=="")
    {
      $('#liLongDesc').hide();
    }
    else{
      $('#LongDesc').html(LongDesc);
    }

    $('#MorningFrom').html("Morning OPD Timings:"+morning_from_time + '-' + morning_end_time);
    $('#EveningFromTime').html("Evening OPD Timings:"+evening_from_time+'-'+ evening_to_time);
    var conv;
    var timer = new Date(); //GET NEW DATE AND TIME
    var runningtime = timer.getTime(); //GET CURRENT RUNNING TIME
    for (var i = mstime; i < mendtime; i += 300000) {
      conv = new Date(i).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
      $('#slot_MorningFrom').append('<div  class=" btn-normal btn-group bkbtn "><span type="button" id="' + i + '" class="btn btn-default btn-flat bookbtn bkk text-white"   data-placement="top"  data-check="" data-id=' + DoctorID + ' data-timestamp="' + i + '" ><i class="fas fa-user" style="color:#ffffff;"></i><i data-id=' + DoctorID + ' class="fas fa-times-circle btnClose text-white" Parentids="' + i + '"></i>&nbsp;&nbsp;' + conv + '</span></div>');
      if (i <= runningtime) {
              $('#' + i).css('opacity', '0.5').removeClass('bookbtn');
          }
    }

    for(var i=evstime;i<evendtime;i+=300000)
    {
      conv = new Date(i).toLocaleTimeString().replace(/:\d{2}\s/, ' ');
      $('#slot_EveningTime').append('<div  class=" btn-normal btn-group bkbtn " ><span type="button" id="' + i + '" class="btn btn-default btn-flat bookbtn bkk text-white"   data-placement="top"  data-check="" data-html="true" data-check="" data-id=' + DoctorID + ' data-timestamp="' + i + '" ><i class="fas fa-user" style="color:#ffffff;"></i><i data-id=' + DoctorID + ' class="fas fa-times-circle btnClose text-white" Parentids="' + i + '"></i>&nbsp;&nbsp;' + conv + '</span></div>');
      if (i <= runningtime) {
          $('#' + i).css('opacity', '0.5').removeClass('bookbtn');

        }
    }

    $.ajax({
      url: "ajax-launch-enabled-timings.php",
      method: "POST",
      dataType: "html",
      data: { DoctorID:DoctorID },
      success: function(data) {
        var jsondata = JSON.parse(data);
        $.each(jsondata, function(i, item) {
          Bookingtimestamp = item.Bookingtimestamp;
          var PatientName = item.PatientName;
          var PatientMobileNumber = item.PatientMobileNumber;
          bkingid = item.BookingID;
          $('#' + Bookingtimestamp).data('Parentids', bkingid);
            $('#' + Bookingtimestamp).data('check', 1).css({
            'font-weight': 'bold',
            'background-color': '#ef2b32',
            'color': '#FFFFFF'
          });
          $('#' + Bookingtimestamp).removeClass('bookbtn');

          var check = $('#' + Bookingtimestamp).data('check', 1);
          if (check) {
            $('#' + Bookingtimestamp).children('.btnClose').css('display', 'block');
          }
          $('#' + Bookingtimestamp).children('.btnClose').attr('id', bkingid);

        });
      }
    });
  });



  $(document).on('click','.bookbtn',function(){
    click_On_Span_Button_Click($(this));
  });


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

            messages: {
              PatientName: {
                required: '<i class="fas fa-exclamation-triangle" style="color:#ff0000;"></i> &nbsp;Enter your Name'
              },
              PatientMobileNumber: {
                required: '<i class="fas fa-exclamation-triangle" style="color:#ff0000;"></i> &nbsp;Enter your phone number',
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

              //BOOKING AJAX TO BOOK A NEW USER
              $.ajax({
                type: 'POST',
                url: 'ajax-book-appointment.php',
                data:formdata,
                dataType: "text",
                success: function(html) {
                  var json = JSON.parse(html);
                  var PatientName = json.PatientName;
                  var PatientMobileNumber = json.PatientMobileNumber;
                  var lastid = json.LastId;
                  gdbutton.data('check', 1);
                  gdbutton.removeClass('bookbtn');
                  gdbutton.children('.btnClose').attr('id', lastid);
                  gdbutton.children('.btnClose').css('display', 'block');
                  gdbutton.css({

                    'font-weight': 'bold',
                    'background-color': '#ef2b32',
                    'color': '#FFFFFF'
                  });
                  $('.book-appointment').css('display','none');

                  $('#frmBook')[0].reset();

                }
              });
            }
          });

          $(document).on('click','.btnClose',function(){
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
                required: '<i class="fas fa-exclamation-triangle" style="color:#ff0000;"></i> &nbsp;Enter your phone number',
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
                    $('#frmCancel')[0].reset();
                    $('.cancel-appointment').css('display','none');
                    $("#" + slot_btn_id).click(function() {
                      click_On_Span_Button_Click($(this));
                    });
                  } else {
                    $('#frmCancel')[0].reset();
                    $('.cancel-appointment').css('display','none');
                  }
                }
              });
            }
          });
});
