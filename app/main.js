
function index(){
    document.getElementById('first').classList.toggle("hide");
    document.getElementById('myData').classList.add("hide");
    

}

function register() {
	var name=document.getElementById('name').value;
	var email=document.getElementById('email').value;
    var ph1=document.getElementById('ph1').value;
    var ph2=document.getElementById('ph2').value;
    var job=document.getElementById('job').value;
    var pass=document.getElementById('pass').value;
	fetch('https://guarded-sands-14132.herokuapp.com/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
         body: JSON.stringify({
        name: name,
        email:email,
        ph1:ph1,
        ph2:ph2,
        job:job,
        pass:pass
        
      })
    })
    .then(response => response.json())
    .then(json => {
        document.getElementById('name').value='';
        document.getElementById('pass').value='';
        document.getElementById('email').value='';
        document.getElementById('ph1').value='';
        document.getElementById('ph2').value='';
        document.getElementById('job').value='';
        document.getElementById('message').classList.toggle("hide");
        document.getElementById('message').innerHTML=json;
    });
}

function signin() {
    
    var email=document.getElementById('email').value;
    var pass=document.getElementById('pass').value;
    fetch('https://guarded-sands-14132.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
         body: JSON.stringify({
       
        email:email,
        pass:pass
        
      })
    })
    .then(response => response.json())
    .then(json => {
       // console.log(json);
       if(json.email)
        {
            getdata(json.email);
           // window.location.href=`viewlist.html?email=${json.email}`
        }
    });
}

function getdata(data)
{
    fetch('https://guarded-sands-14132.herokuapp.com/getdata', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
         body: JSON.stringify({
       
        email:data,
        
      })
    })
    .then(response => response.json())
    .then(json => {
       if(json)
        {
            window.location.href=`viewlist.html?email=${json.email}&name=${json.name}`
        }
    });

}

function view1(){
    document.getElementById('first').style.display='none';
    document.getElementById('myData').classList.toggle('hide');
    view();
}

function view() {
    document.getElementById('loader').style.display='block';
	fetch('https://guarded-sands-14132.herokuapp.com/viewlist')
    .then(response => response.json())
    .then(json => 
    	appendData(json)
         )
      //  console.log(json))
    .catch(console.log)

    }

      function appendData(data) {
      	
            var mainContainer = document.getElementById("myData");
            
            var table=document.getElementById("mytable");
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                
                cell1.innerHTML = data[i].name;
                cell2.innerHTML = data[i].email;
                cell3.innerHTML = data[i].job;
                cell4.innerHTML = data[i].ph1+data[i].ph2;
                
               
            }
            document.getElementById('loader').style.display='none';
        }




