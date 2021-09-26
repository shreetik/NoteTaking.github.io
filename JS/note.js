console.log("Jay Jagannath");

createNote();

var notr = document.querySelectorAll("[class='not']");
notr.forEach((value) => {
  value.readOnly = true;
});
// noteA = document.querySelector(".not");
// console.log(noteA);
// noteA.readOnly = true;

let heading = document.getElementById("heading");
let textarea = document.getElementById("textarea");

let notePlaced = document.querySelector("div.notePlaced");

let editPic = "../Pictures/editNote.png";
let updatePic = "../Pictures/UpdateNote.png";
let deletePic = "../Pictures/deleteNote.png";

const btnAdd = document.querySelector("div.button");
// var togetherData = [];
btnAdd.addEventListener("click", () => {
  if (textarea.value) {
    let title = heading.value;
    let value = textarea.value;
    let togetherData = [title, value];
    let localNote = localStorage.getItem("localkey");
    if (localNote == null) {
      localNoteArray = [];
    } else {
      localNoteArray = JSON.parse(localNote);
    }
    localNoteArray.push(togetherData);
    localStorage.setItem("localkey", JSON.stringify(localNoteArray));

    // localStorage.setItem(key, value);
    // let localValue = localStorage.getItem(key);
    heading.value = "";
    textarea.value = "";
    createNote();
  }
});
function createNote() {
  let localNote = localStorage.getItem("localkey");
  if (localNote == null) {
    localNoteArray = [];
  } else {
    localNoteArray = JSON.parse(localNote);
  }

  let storeHtml = "";
  var holdSecondArray = [];
  localNoteArray.forEach((value, index) => {
    indexForDel = index;
    localNoteArray[index].forEach((value, index) => {
      holdSecondArray.push(value);
    });
    storeHtml += `<div class="outerPlaced">
    <div class="noteCard">
      <div class="noteCardTitle">${holdSecondArray[0]}</div>
      <div class="noteContent">
        <textarea class="not" onblur="closeNote(this.name)" oninput="getTxtData(this.name)" name=${indexForDel} alt=${indexForDel} id="noteArea">${holdSecondArray[1]}</textarea>
      </div>
    </div>
    <div class="cardButton">
      <img src="../Pictures/editNote.png" onclick="editNote(this.id)" id=${indexForDel} alt="" />
      <img src="../Pictures/UpdateNote.png" onclick="updateNote(this.id)" id=${indexForDel} alt="" />
      <img src="../Pictures/deleteNote.png" onclick="deleteNote(this.id)" id=${indexForDel} alt="" />
    </div>
  </div>`;
    holdSecondArray.pop();
    holdSecondArray.pop();
  });

  let notePlaced = document.getElementById("noteShow");

  if (localNoteArray.length != 0) {
    notePlaced.innerHTML = storeHtml;
  } else {
    notePlaced.innerHTML = "<h3>Please add some notes..</h3>";
  }
  // let oneDiv = document.createElement("div");
  // oneDiv.setAttribute("class", "outerPlaced");

  // let oneDivFirstChild = document.createElement("div");
  // oneDivFirstChild.setAttribute("class", "noteCard");

  // let oneDiv2ndChild = document.createElement("div");
  // oneDiv2ndChild.setAttribute("class", "cardButton");

  // oneDiv.appendChild(oneDivFirstChild);
  // oneDiv.appendChild(oneDiv2ndChild);

  // let oneDivFirstChildsChild = document.createElement("div");
  // oneDivFirstChildsChild.setAttribute("class", "noteCardTitle");

  // let oneDivFirstChildsChild2 = document.createElement("div");
  // oneDivFirstChildsChild2.setAttribute("class", "noteContent"); //insert textarea

  // oneDivFirstChild.appendChild(oneDivFirstChildsChild);
  // oneDivFirstChild.appendChild(oneDivFirstChildsChild2);

  // let oneDivFirstChildsChild2Child = document.createElement("textarea");
  // oneDivFirstChildsChild2Child.setAttribute("id", "noteArea");

  // oneDivFirstChildsChild2.appendChild(oneDivFirstChildsChild2Child);

  // let btnImg1 = document.createElement("img");
  // btnImg1.setAttribute("id", "edit");
  // btnImg1.setAttribute("src", editPic);

  // let btnImg2 = document.createElement("img");
  // btnImg2.setAttribute("id", "update");
  // btnImg2.setAttribute("src", updatePic);

  // let btnImg3 = document.createElement("img");
  // btnImg3.setAttribute("id", "delete");
  // btnImg3.setAttribute("src", deletePic);

  // oneDiv2ndChild.appendChild(btnImg1);
  // oneDiv2ndChild.appendChild(btnImg2);
  // oneDiv2ndChild.appendChild(btnImg3);

  // oneDivFirstChildsChild.innerHTML = title;
  // oneDivFirstChildsChild2Child.innerHTML = notes;

  // notePlaced.appendChild(oneDiv);
  // console.log(localNoteArray);
}

//Delete Note Function
function deleteNote(indNote) {
  localNoteArray.splice(indNote, 1);
  localStorage.setItem("localkey", JSON.stringify(localNoteArray));
  createNote();
  console.log(localNoteArray);
}

//edit Note Function
function editNote(editC) {
  notr[editC].readOnly = false;
}
function closeNote(cnote) {
  notr[cnote].readOnly = true;
}

//Update Note Function
var actualTxtData;
function getTxtData(xyz) {
  var txtArea = document.querySelectorAll("[id='noteArea']");
  actualTxtData = txtArea[xyz].value;
}
var holdArray = [];
function updateNote(upcode) {
  localNoteArray[upcode].forEach((value, index) => {
    holdArray.push(value);
  });
  let holdtitle = holdArray[0];
  let holddata = actualTxtData;
  holdArray.pop();
  holdArray.pop();
  let putTogether = [holdtitle, holddata];
  localNoteArray[upcode] = putTogether;
  localStorage.setItem("localkey", JSON.stringify(localNoteArray));
  createNote();
  console.log(putTogether);
  // txtArea = document.querySelectorAll("[id='noteArea']");
  // txtAreaData = txtArea[upcode].innerHTML;
  // console.log(txtAreaData);
}
