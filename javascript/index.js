// Báo lỗi dữ liệu trống
function validValue(x) {
  var inputValue = document.getElementsByClassName("form-group")[x].getElementsByTagName("input");
  for (var i = 0; i < inputValue.length; i++) {
    if (inputValue[i].value == "") {
      return false;
    }  }
  return true;
}

/*Bài 1. Xác định ngày hôm trước và ngày hôm sau
INPUT: Dữ liệu ngày - tháng - năm

PROCESS
Part1. Ngày hôm trước
Xét ngày 
  1. Hợp lệ (Ngày 1): Ngày hôm trước là (date-1;month;year);
  2. Không hợp lệ (Ngày là 1) (1 -1 = 0 --> Ngày sai)
     --> Xét tháng
          2.1. Tháng hợp lệ (Tháng > 1): Ngày hôm trước là (ngày cuối của tháng ; month-1; year)
          2.2 Không hợp lệ (vd: 1 -1 = 0 --> Tháng sai)
          --> Ngày hôm trước là (31/12/year-1)
Part2. Ngày hôm sau
Xét ngày
 1. Hợp lệ (Ngày < Ngày cuối tháng): Ngày hôm sau là ngày (date+1;month;year);
 2. Không hợp (Ngày = Ngày cuối tháng): 
    --> Xét tháng
    2.1. Tháng hợp lệ (Tháng <12): Ngày hôm sau là ngày (1;month+;year);
    2.2. Tháng 12: Ngày hôm sau là ngày (1/1/year+1)


OUTPUT: Ngày hôm trước - Ngày hôm sau
*/

//KIỂM TRA NGÀY THÁNG NĂM HỢP LỆ
var yearInput = document.getElementById("year");
var monthInput= document.getElementById("month");
var dateInput= document.getElementById("date");
var date_alert = document.getElementById("date_alert");
var month_alert = document.getElementById("month_alert");
var year_alert = document.getElementById("year_alert");

//Kiểm tra số ngày của tháng
function lastDateofMonth(month,year){
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (year%4==0){
        return 29;
      }
      return 28;
  }
}

function dayValidation(date,month,year){
  var validValue = [true,true,true];
  //Năm phải lớn hơn 
  if(year<1900 ||year>9999){
    validValue[2]=false;
  }

  //Kiểm tra tháng hợp lệ
  if (month < 1 || month > 12) {
    validValue[1]=false;
  } 

  //Kiểm tra ngày hợp lệ
  if (date>lastDateofMonth(month,year)){
    date_alert.innerHTML = "Tháng " + monthInput.value + " có "+ lastDateofMonth(month,year) +  " ngày";
    validValue[0]=false;
  }
  validValue[3]=(validValue[0]&&validValue[1]&&validValue[2])
  return validValue;
}

function dayValidation__alert(){
  var array = dayValidation(parseInt(dateInput.value),parseInt(monthInput.value),parseInt(yearInput.value));
  if(array[0]){
    date_alert.innerHTML="";
  };
  if(array[1]){
    month_alert.innerHTML="";
  }
  else{
    month_alert.innerHTML="Dữ liệu tháng chưa hợp lệ";
  }
  if(array[2]){
    year_alert.innerHTML="";
  }
  else{
    year_alert.innerHTML="Năm phải từ 1900 - 2100";
  }
}

yearInput.onkeyup=function(){
  if(yearInput.value.length>3){
    dayValidation__alert();
  }
};
yearInput.onfocusout=function(){
  dayValidation__alert();
}
monthInput.onkeyup = function () {
  dayValidation__alert();
};
dateInput.onkeyup = function () {
  dayValidation__alert();
};


function dayBefore(date,month,year) {
  if(date>1){
    result[0].getElementsByTagName("span")[0].innerHTML = "Ngày hôm trước là ngày " + (date -1)+ " tháng " + month + " năm "+ year;
  }
  else if(month>1){
    result[0].getElementsByTagName("span")[0].innerHTML = "Ngày hôm trước là ngày " + lastDateofMonth(month-1,year) + " tháng " + (month -1) + " năm "+ year;
  }
  else{
    result[0].getElementsByTagName("span")[0].innerHTML = "Ngày hôm trước là ngày 31 tháng 12 năm " + (year-1);
  }
}
function dayAfter(date,month,year) {
  if(date<lastDateofMonth(month,year)){
    result[0].getElementsByTagName("span")[1].innerHTML = "Ngày hôm sau là ngày " + (date +1)+ " tháng " + month + " năm "+ year;
  }
  else if(month<12){
    result[0].getElementsByTagName("span")[1].innerHTML = "Ngày hôm sau là ngày 1 tháng " + (month +1) + " năm "+ year;
  }
  else{
    result[0].getElementsByTagName("span")[1].innerHTML = "Ngày hôm sau là ngày 1 tháng 1 năm " + (year +1);
  }
}

document.getElementById("daybefore").addEventListener("click",function(e){
  e.preventDefault();
  if (validValue(0)&&dayValidation(parseInt(dateInput.value),parseInt(monthInput.value),parseInt(yearInput.value))[3]){
    result[0].style.display = "block";
    alert[0].style.display = "none";
    dayBefore(parseInt(dateInput.value),parseInt(monthInput.value),parseInt(yearInput.value));
  }
  else{
    alert[0].style.display = "block";
    result[0].style.display = "none";
  }
  
})
document.getElementById("dayafter").addEventListener("click",function(e){
  if (validValue(0)&&dayValidation(parseInt(dateInput.value),parseInt(monthInput.value),parseInt(yearInput.value))[3]){
    result[0].style.display = "block";
    alert[0].style.display = "none";
    dayAfter(parseInt(dateInput.value),parseInt(monthInput.value),parseInt(yearInput.value));
  }
  else{
    alert[0].style.display = "block";
    result[0].style.display = "none";
  }
  e.preventDefault();
})

/* Bài 2. Tìm số ngày của tháng
INPUT: Tháng / Năm

PROCESS
1. Kiểm tra dữ liệu tháng/năm
2. Xuất ra số ngày của tháng

OUTPUT: Số ngày của tháng

*/
var year_ex2=document.getElementById("year_ex2");
var month_ex2=document.getElementById("month_ex2");
var month_alert_ex2 = document.getElementById("month_alert_ex2");
var year_alert_ex2 = document.getElementById("year_alert_ex2");
function dayValidation__alert_ex2(){
  var array = dayValidation(1,parseInt( month_ex2.value),parseInt(year_ex2.value));
  if(array[1]){
    month_alert_ex2.innerHTML="";
  }
  else{
    month_alert_ex2.innerHTML="Dữ liệu tháng chưa hợp lệ";
  }
  if(array[2]){
    year_alert_ex2.innerHTML="";
  }
  else{
    year_alert_ex2.innerHTML="Năm phải từ 1900 - 2100";
  }
}

year_ex2.onkeyup= function(){
  if(year_ex2.value.length>3){
    dayValidation__alert_ex2();
  }
}
year_ex2.onfocusout=function(){
  dayValidation__alert_ex2();
}
month_ex2.onkeyup = function () {
  dayValidation__alert_ex2();
};

function exercise2(){
  if (!dayValidation(1,parseInt( month_ex2.value),parseInt(year_ex2.value))[3]){
    result[1].style.color = "red";
    return "Dữ liệu chưa hợp lệ";
  }
  result[1].style.color = "green";
  return "Tháng "+ month_ex2.value + " có " + lastDateofMonth(parseInt(month_ex2.value),parseInt(year_ex2.value)) + " ngày.";
}


/* Bài 3.
INPUT: Số nguyên có 3 chữ số

PROCESS:
1. Lấy dữ liệu số nguyên đó
2. Lấy chữ số 
  + hàng đơn vị: phần dư của phép chia với 10;
  + hàng chục: Math.floor((phần dư của phép chia với 100)/10) --> 
  + hàng trăm: Math.floor(phép chia với 100);
Quy ước tên số
3. Đọc chữ số
  1. Đọc chữ số hàng trăm: tên số
  2. Đọc chữ số hàng chục
    - Trường hợp *00: không đọc tiếp.
    - Trường hợp *0*: lẻ
    - Trường hợp *1*: mười
    - Trường hợp *x*: tên số + mươi (x khác 0,1)
  3. Đọc chữ số hàng đơn vị
    - Trường hợp **0: không đọc tiếp.
    - Trường hợp *x1: "mốt" (x>1);
    - Trường hợp *x5: "lăm" (x>0);
    - Trường hợp còn lại đọc tên số bình thường.

OUTPUT: Cách đọc chữ số đó
*/
var number3Digit = document.getElementById("number3Digit");
var value_number3Digit = document.getElementById("value_number3Digit");

function number_text(number){
  switch (number) {
    case 1:
      return "một";
    case 2:
      return "hai";
    case 3:
      return "ba";
    case 4:
      return "bốn";
    case 5:
      return "năm";
    case 6:
      return "sáu";
    case 7:
      return "bảy";
    case 8:
      return "tám";
    case 9:
      return "chín";
    case 0:
      return "0";
  }
}

number3Digit.oninput= function(){
  value_number3Digit.innerHTML=this.value;
}
number3Digit.onchange=function(){
  var number = this.value;
  var unitDigit = number % 10;
  var tenDigit = Math.floor((number%100)/10);
  var hundredDigit = Math.floor(number/100);
  var number3Digit_text = result[2];

  //Đọc chữ số hàng trăm
  number3Digit_text.innerHTML="Cách đọc: " + number_text(hundredDigit) + " trăm";

  //Đọc chữ số hàng chục
  if(tenDigit==0){
    if(unitDigit==0){
     return number3Digit_text.innerHTML+="."
    }
    number3Digit_text.innerHTML+=" lẻ "
  }
  else if(tenDigit==1){
    number3Digit_text.innerHTML+=" mười";
  }
  else{
    number3Digit_text.innerHTML+=" "+number_text(tenDigit) + " mươi";
  }


  //Đọc chữ số hàng đơn vị
  if(unitDigit==0){
    number3Digit_text.innerHTML+=".";
  }
  else if((unitDigit==1)&&tenDigit>1){
    number3Digit_text.innerHTML+=" mốt.";
  }
  else if(unitDigit==5&& tenDigit>0){
    number3Digit_text.innerHTML+=" lăm.";

  }
  else {number3Digit_text.innerHTML+=" "+number_text(unitDigit) + ".";}
}

/*Bài 4. Tìm học sinh xa trường nhất
INPUT: Dữ liệu tên, toạ độ X-Y của 3 học sinh; toạ độ X-Y của trường

PROCESS
1. Lấy dữ liệu tên, toạ độ X-Y của từng học sinh
2. Tính khoảng cách của nhà học sinh so với trường
3. Tạo biến max, học sinh xa trường
    + Nếu Khoảng cách > max
      -Gán max=khoảng cách mới;
      - Gán học sinh xa trường bằng tên mới;
4. Xuất dữ liệu học sinh xa trường nhất

OUTPUT: Học sinh xa trường nhất
 */

function StudentInfo(name,X_coordinate,Y_coordinate){
  var schoolX=parseFloat(document.getElementById("schoolX_coordinate").value);
  var schoolY=parseFloat(document.getElementById("schoolY_coordinate").value);
  this.name=name;
  this.X_coordinate=X_coordinate;
  this.Y_coordinate=Y_coordinate;
  this.distanceFromSchool= Math.sqrt(Math.pow((X_coordinate-schoolX),2)+Math.pow((Y_coordinate-schoolY),2));
}

function exercise4(){
  var studentValue= document.getElementsByClassName("student_value");
  var studentArray=[];
  var max=0;
  var studentFarFromSchool="";
  for(var i=0;i<3;i++){
    studentArray[i]= new StudentInfo(
      studentValue[i].getElementsByTagName("input")[0].value,
      studentValue[i].getElementsByTagName("input")[1].value,
      studentValue[i].getElementsByTagName("input")[2].value,
      )
      if(studentArray[i].distanceFromSchool > max){
        max=studentArray[i].distanceFromSchool;
        studentFarFromSchool=studentArray[i].name;
      }
  }
  return "Học sinh xa trường nhất là " + studentFarFromSchool;
}

var btnSubmit = document.getElementsByClassName("btn-success");
var result = document.getElementsByClassName("result");
var alert = document.getElementsByClassName("alert");
for (var i = 1; i < btnSubmit.length; i++) {
  btnSubmit[i].addEventListener("click", function (e) {
    e.preventDefault();
    var x = $(btnSubmit).index(this);
    if (validValue(x)) {
      result[x].innerHTML = window["exercise" + (x + 1)]();
      result[x].style.display = "block";
      alert[x].style.display = "none";
    } else {
      alert[x].style.display = "block";
      result[x].style.display = "none";
    }
  });
}
