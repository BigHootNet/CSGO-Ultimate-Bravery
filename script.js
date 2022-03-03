var weaponArray = [
    {id: 0, category: "pistol", name: "USP / Glock / P2000", img: "assets/USP-S.png"},
    {id: 1, category: "pistol", name: "Dual Berretas", img: "assets/Dual_Berettas.png"},
    {id: 2, category: "pistol", name: "P250", img: "assets/P250.png"},
    {id: 3, category: "pistol", name: "R8 / Desert Eagle", img: "assets/Desert_Eagle.png"},
    {id: 4, category: "pistol", name: "Five-Seven / Tek 9 / CZ75", img: "assets/CZ75.png"},
    {id: 5, category: "shotgun", name: "Sawed Off / Swag-Seven", img: "assets/MAG-7.png"},
    {id: 6, category: "shotgun", name: "Nova", img: "assets/Nova.png"},
    {id: 7, category: "shotgun", name: "XM1014", img: "assets/XM1014.png"},
    {id: 8, category: "pm", name: "MP9 / Mac-10", img: "assets/MP9.png"},
    {id: 9, category: "pm", name: "MP7 / MP5-S", img: "assets/MP7.png"},
    {id: 10, category: "pm", name: "P90", img: "assets/P90.png"},
    {id: 11, category: "pm", name: "PP-Bizon", img: "assets/PP-Bizon.png"},
    {id: 12, category: "pm", name: "UMP-45", img: "assets/UMP-45.png"},
    {id: 13, category: "rifle", name: "FAMAS / Galil", img: "assets/FAMAS.png"},
    {id: 14, category: "rifle", name: "AK-47 / M4A4 / M4A1-S", img: "assets/AK-47.png"},
    {id: 15, category: "rifle", name: "AUG / SG-553", img: "assets/AUG.png"},
    {id: 16, category: "machinegun", name: "Negev", img: "assets/Negev.png"},
    {id: 17, category: "machinegun", name: "M249", img: "assets/M249.png"},
    {id: 18, category: "snipe", name: "Scout", img: "assets/SSG.png"},
    {id: 19, category: "snipe", name: "AWP", img: "assets/AWP.png"},
    {id: 20, category: "snipe", name: "AutoNoob", img: "assets/SCAR-20.png"}
]


// -------------------------------------------------------IDs-------------------------------------------------------
// Buttons
var randomizer = document.getElementById('randomizer')

// -------------------------------------------------------HTML ENTRY GENERATOR-------------------------------------------------------

// -------- loop inside weaponArray
weaponArray.forEach(function(weapon){
    let rowG = document.createElement('div')
    let colG1 = document.createElement('div')
    let colG2 = document.createElement('div')
    var btnChecker = document.createElement('input')
    btnChecker.classList.add('roundedBtn')
    btnChecker.type = "checkbox"
    rowG.classList.add('row')
    colG1.classList.add('col', 'col-lg-2')
    colG2.classList.add('col')

// Generating rows & cols for each iterations
    function rowColGenerator(){
        colG1.appendChild(btnChecker)
        btnChecker.name = weapon.id
        btnChecker.id = weapon.id
        colG2.innerHTML = "<label for='" + weapon.id + "'>" + weapon.name + "</label>"
        rowG.appendChild(colG1)
        rowG.appendChild(colG2)
    }
// Generating for pistols
    if(weapon.category == "pistol") {
        rowColGenerator()
        colPistols.appendChild(rowG)
    }
// Generating for shotguns
    if(weapon.category == "shotgun") {
        rowColGenerator()
        colShotguns.appendChild(rowG)
    }
// Generating for pms
    if(weapon.category == "pm") {
        rowColGenerator()
        colPms.appendChild(rowG)
    }
// Generating for rifles
    if(weapon.category == "rifle") {
        rowColGenerator()
        colRifles.appendChild(rowG)
    }
// Generating for machineguns
    if(weapon.category == "machinegun") {
        rowColGenerator()
        colMachineguns.appendChild(rowG)
    }
// Generating for snipes
    if(weapon.category == "snipe") {
        rowColGenerator()
        colSnipes.appendChild(rowG)
    }
})
// -------- End of weaponArray loop


// Getting every weapon checkboxes
var weaponCheckboxes = document.querySelectorAll(['.roundedBtn'])

// -------------------------------------------------------BE BRAVE RANDOMIZER-------------------------------------------------------
var clickDisabled = true
// Be Brave on click functions
randomizer.addEventListener('click', function(){

    if (clickDisabled == false) {
        return
    } else {
    clickDisabled=  false
    // Second Array where it's gonna be generated
    var randomizingArray = []
    var randomContainer = document.getElementById('randomContainer')
    var randomHolder = document.getElementById('randomContainerHolder')
    randomContainer.style.display = "flex"

    // Resetting HTMLs
    randomHolder.innerHTML = ''
    $('#staticBackdropLabel').html("")
    $('#modalBody').html("") 

    // Loop inside every weapon checkboxes
    weaponCheckboxes.forEach(function(checkbox){
        var imgGenerator = document.createElement("img")
        var entry = weaponArray[checkbox.name]
        var dataIdGenerator = 0
        if (checkbox.checked == true){

            // Pushing object to second Array using checkboxes name to find first array ID
            randomizingArray.push(entry)

            // Adding img to the randomizer html
            var entryImg = weaponArray[checkbox.name].img

            // Nested loop to create multiple img from same source
            for(var i = 0;i < 101; i++) {
            imgGenerator.src = entryImg
            randomHolder.appendChild(imgGenerator.cloneNode(true))
            }

            // Shuffle img inside randomContainerHolder Div
            var a = $("#randomContainerHolder > img").remove().toArray();
            for (var i = a.length - 1; i >= 1; i--) {
                dataIdGenerator = i
                var j = Math.floor(Math.random() * (i + 1))
                var bi = a[i]
                var bj = a[j]
                a[i] = bj
                a[j] = bi
                a[i].id = dataIdGenerator--
            }

            $("#randomContainerHolder").append(a)
            
            // Timer before launching goRoll Function (see below)
            setTimeout(function() {
                goRoll()
                $(randomHolder).css("transition:''")
                $(randomHolder).css('margin-left', '-6691px');
            }, 500);
        }
        // goRoll function is there to create the rolling animation
        function goRoll() {
            $(randomHolder).css({
                transition: "all 8s cubic-bezier(.08,.6,0,1)"
            });
        }
    })
    
    setTimeout(function() {
        $('#47').addClass('selectorOverlay')
        $(randomHolder).css({
            transition: "all 0s cubic-bezier(0,0,0,0)"
        });
        $(randomHolder).css('margin-left', '0px');
        randomContainer.style.display = "none"
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
          })
          var result = document.getElementById("47")
          var resultImg = result.src
          imgPartValue = resultImg.split("/assets")[1] 
          imgValue = "assets" + imgPartValue
          var findIndex = weaponArray.findIndex(object =>{
              return object.img === imgValue
          })
          $('#staticBackdropLabel').html(weaponArray[findIndex].name)
          $('#modalBody').html("<img src='"+ weaponArray[findIndex].img+"'></img>")  
          myModal.toggle()
          clickDisabled = true
    }, 8500);
}})

let c1 = document.getElementById('0')
let c2 = document.getElementById('1')
let c3 = document.getElementById('2')
let c4 = document.getElementById('3')
let c5 = document.getElementById('4')
let c6 = document.getElementById('5')
let c7 = document.getElementById('6')
let c8 = document.getElementById('7')
let c9 = document.getElementById('8')
let c10 = document.getElementById('9')
let c11 = document.getElementById('10')
let c12 = document.getElementById('11')
let c13 = document.getElementById('12')
let c14 = document.getElementById('13')
let c15 = document.getElementById('14')
let c16 = document.getElementById('15')
let c17 = document.getElementById('16')
let c18 = document.getElementById('17')
let c19 = document.getElementById('18')
let c20 = document.getElementById('19')
let c21 = document.getElementById('20')

$('#yoloPistol').on('click', function(){
    if (c1.checked == true && c2.checked == true && c3.checked == true && c4.checked == true && c5.checked == true) {
     c1.checked = false
     c2.checked = false
     c3.checked = false
     c4.checked = false
     c5.checked = false
} else {
    c1.checked = true
    c2.checked = true
    c3.checked = true
    c4.checked = true
    c5.checked = true
}})
$('#yoloShotgun').on('click', function(){
    if (c6.checked == true && c7.checked == true && c8.checked == true) {
        c6.checked = false
        c7.checked = false
        c8.checked = false
   } else {
       c6.checked = true
       c7.checked = true
       c8.checked = true
   }})
   
$('#yoloPm').on('click', function(){
    if (c9.checked == true && c10.checked == true && c11.checked == true && c12.checked == true && c13.checked == true) {
        c9.checked = false
        c10.checked = false
        c11.checked = false
        c12.checked = false
        c13.checked = false
   } else {
       c9.checked = true
       c10.checked = true
       c11.checked = true
       c12.checked = true
       c13.checked = true
   }})
$('#yoloRifle').on('click', function(){
    if (c14.checked == true && c15.checked == true && c16.checked == true) {
        c14.checked = false
        c15.checked = false
        c16.checked = false
   } else {
       c14.checked = true
       c15.checked = true
       c16.checked = true
   }})
$('#yoloMachinegun').on('click', function(){
    if (c17.checked == true && c18.checked == true) {
        c17.checked = false
        c18.checked = false
   } else {
       c17.checked = true
       c18.checked = true
   }})
$('#yoloSnipe').on('click', function(){
    if (c19.checked == true && c20.checked == true && c21.checked == true) {
        c19.checked = false
        c20.checked = false
        c21.checked = false
   } else {
       c19.checked = true
       c20.checked = true
       c21.checked = true
   }})
