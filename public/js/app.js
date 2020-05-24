//Variables , Declarations , etc

let report = document.querySelector('.navigation_nav--report a');



//Event when History button is clicked : 1. Hide Main section 2. Set display property of Report section to 'block'
//-----------------------------------------------------------------------------------------------------------------

report.addEventListener('click', function () {
    const col1 = document.getElementById('statewise');
    col1.innerHTML = '';
    const col2 = document.getElementById('genderwise');
    col2.innerHTML = '';
    $.ajax({
        url: '/api/v1/statewise-average-salary',
        type: 'GET',
        success: function (data, status, xhr) {   // success callback function
      data.data.map(item => {
          let statewise = document.createElement('tr');
          let statename = document.createElement('td');
          let salary = document.createElement('td');
          statename.innerHTML = item.StateName;
          salary.innerHTML = item.AVGSALARY;
          statewise.appendChild(statename);
          statewise.appendChild(salary);
        col1.appendChild(statewise);
      })
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
            alert('Something went wrong');
        }
    });

    $.ajax({
        url: '/api/v1/statewise-gender-average-salary',
        type: 'GET',
        success: function (data, status, xhr) {   // success callback function
      data.data.map(item => {
          console.log("dattatatata", data);
          let genderwise = document.createElement('tr');
          let statename = document.createElement('td');
          let salary = document.createElement('td');
          let salary2 = document.createElement('td');
          statename.innerHTML = item.StateName;
          if(item.GENDER == 0) { salary.innerHTML = item.AVGSALARY; salary2.innerHTML = '';}
          else {salary2.innerHTML  = item.AVGSALARY; salary.innerHTML = '';}
          genderwise.appendChild(statename);
          genderwise.appendChild(salary);
          genderwise.appendChild(salary2);
          col2.appendChild(genderwise);
      })
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
            alert('Something went wrong');
        }
    });
    document.querySelector('#main').style.display = 'none';
    document.querySelector('#displayReports').style.display = 'block';

});


// Event when Home button is clicked : 1. Hide Report section 2. Show Main section
//---------------------------------------------------------------------------------

document.querySelector('.navigation_nav--home').addEventListener('click', function () {
    document.querySelector('#displayReports').style.display = 'none';
    document.querySelector('#main').style.display = 'block';
});
