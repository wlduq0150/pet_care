 function getReviews(){
   fetch("http://localhost:3000/api/reviews/",{
        method: "GET",
    })
    .then(response=>{
        return response.json();
    }).
    then(data =>{
        data.data.map((e)=>{
            const sitterName= document.getElementById("reviewSitterName");
            const userName= document.getElementById("reviewUserName");
            const reviewComment= document.getElementById("reviewUserComment");
            const reviewGrade= document.getElementById("reviewUserGrade");

            sitterName.innerHTML=e.sitterId;
            userName.innerHTML=e.userId;
            reviewComment.innerHTML=e.comment;
            reviewGrade.innerHTML="별점:"+e.grade;
            console.log(e);
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