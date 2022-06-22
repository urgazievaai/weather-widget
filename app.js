let city = document.querySelector('.city');
let temp = document.querySelector('.temp');
const search = document.querySelector('.search-bar')

document.querySelector('.search-btn').addEventListener('click', weather);

function weather(){
  fetch("http://localhost:3000/cities?name="+ search.value +"")
  .then((res) => {
    return res.json();
  })
  .then((data) => {

    data.forEach((item)=>{
      let getName = item.name;
       city.innerHTML = getName;

      let getTemp = item.temperature;
        temp.innerHTML = getTemp + '°С';

      search.value = '';
    })

  console.log(data);
  })
  
  .catch((error)=> {
    console.log(error)
  })

}

