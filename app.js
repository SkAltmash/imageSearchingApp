const secrchForm=document.querySelector('form');
const secrchInput=document.querySelector('.Search');
const ImageContainer=document.querySelector('.Image-container');
const massage=document.querySelector('h2');
const lode=document.querySelector('.lode');
const lightbt = document.querySelector('.lightbt');
const darkbt = document.querySelector('.darkbt');


//fetchind data from api
const fetchimage = async(query,pageno) =>
{
    const url =`https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageno}&client_id=mkCrT5IChmB8qPZR0X0m7c8p-sznDMTdbBKuQ3J4igI`;
    
    const response = await fetch(url);
    const data= await response.json();
    massage.style.display="none";
    try
    {
    data.results.forEach(photos => {
      
        const imageElement = document.createElement('div');
        imageElement.classList.add("idiv");
        imageElement.innerHTML = `<img src="${photos.urls.regular}"/>`;

     
        const overlayerElement = document.createElement('div');
        overlayerElement.classList.add('overlayer');

        imageElement.appendChild(overlayerElement);
        ImageContainer.appendChild(imageElement);

        const overlayertext = document.createElement('h2');
        overlayertext.innerText =`${photos.alt_description}`;
        overlayerElement.appendChild(overlayertext);
        
        lode.style.display ="block";
        if(data.total_pages==pageno)
        {
         
            
         lode.style.display ="block";
         lode.innerText = "NO more data to featch!";
        }
      
     
     
        
    });
   }
    catch(error)
   {
    lode.style.display ="block";
    lode.innerText = "failed to fetch images. please try again later.";
   }
}
let page=1;

//event lissener on enter .
secrchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const inputtext = secrchInput.value.trim();
    if (inputtext !=='')
    {
         page=1;
         ImageContainer.innerHTML="";
        
        fetchimage(inputtext,page);
    }
    else
    {
        ImageContainer.innerHTML = `<h2>do you want to search empty</h2>`;
        lode.style.display ="none";
    }
    
})


lode.addEventListener('click',()=>{

    fetchimage(secrchInput.value.trim(),++page)
});

function darkmode()
{
    document.body.classList.add('darkmode');
}
function lightmode()
{
    document.body.classList.remove('darkmode');
}