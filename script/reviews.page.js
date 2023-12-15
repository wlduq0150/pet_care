 function getReviews(){
   fetch("http://localhost:3000/api/reviews/",{
        method: "GET",
    })
    .then(response=>{
        return response.json();
    }).
    then(data =>{
        data.data.map((e)=>{
            let reviswsParent=document.getElementById("reviswsParent");
            let newChildElement = document.createElement("div");
            reviswsParent.appendChild(newChildElement);
            newChildElement.innerHTML = `
            <div class="reviews"> 
            <div class="sitterName" id="reviewSitterName">${e.sitterName}</div>
            <div class="reviewOne" >
            <div class="userName" id="reviewUserName">${e.userName}</div>
            <div class="reviewComment" id="reviewUserComment">${e.comment}</div>
            <div class="reviewGrade" id="reviewUserGrade">${"별점:"+e.grade}</div>
            </div>
            </div>
            `;
            /*
            id reviswsParent 자식객체 생성 
            자식객체에 아래 innerHTML로 생성
            <div class="sitterName" id="reviewSitterName">${e.sitterName}</div>
            <div class="reviewOne" >
            <div class="userName" id="reviewUserName">${e.userName}</div>
            <div class="reviewComment" id="reviewUserComment">${e.comment}</div>
            <div class="reviewGrade" id="reviewUserGrade">${"별점:"+e.grade}</div>
            </div>
            */
           /*
            const sitterName= document.getElementById("reviewSitterName");
            const userName= document.getElementById("reviewUserName");
            const reviewComment= document.getElementById("reviewUserComment");
            const reviewGrade= document.getElementById("reviewUserGrade");
            
            sitterName.innerHTML=e.sitterName;
            userName.innerHTML=e.userName;
            reviewComment.innerHTML=e.comment;
            reviewGrade.innerHTML="별점:"+e.grade;
    */
        })
       
       
    });
 }
/*
function getReviews(){
    fetch("http://localhost:3000/api/reviews/")
.then(async (res)=>await res.json())
.then(data=>{
    console.log(...data);
    return data;
})
.catch(err=>console.log("Error:",err));
}
*/
function postReview(){
    fetch("http://localhost:3000/api/reviews/",{
        method:"POST",
        body: JSON.stringify({
            sitterId: id,
            comment: comment,
            grade:grade,
        }),
    })
    .then((response) => response.json())
    .then((result) => console.log(result));
}

getReviews();