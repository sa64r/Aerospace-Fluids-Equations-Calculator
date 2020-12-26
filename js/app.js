
// When Calculate Lift and Drag is Clicked
document.getElementById("calculateLiftAndDragButton").onclick = function () {
    let solutionText = "";
    let lift = 0;
    let drag = 0;
    let form = document.getElementById("liftAndDragForm")
    let inputElements = form.querySelectorAll("input");
    let data = {}

    // collects data from input fields of form and stores in object
    for (let input of inputElements) {
        data[input.name] = input.value;
    }


    lift = 0.5 * data.density * data.velocity * data.velocity * data.area * data.coefficientOfLift;
    drag = 0.5 * data.density * data.velocity * data.velocity * data.area * data.coefficientOfDrag;

    solutionText = `Lift: ${lift} N <br> Drag: ${drag} N`

    document.getElementById("liftAndDragOutput").scrollIntoView();

    document.getElementById("liftAndDragOutputConsole").innerHTML = solutionText;
    return false
}


//Calculate Speed of Sound
document.getElementById("calculateSpeedofSoundButton").onclick = function () {
    let solutionText = "";
    let speedOfSound = 0;
    let form = document.getElementById("speedOfSoundForm")
    let inputElements = form.querySelectorAll("input");
    let machNumber = 0;
    let data = {}


    for (let input of inputElements) {
        data[input.name] = input.value;
    }


    speedOfSound = Math.sqrt(data.temperature * data.adiabaticIndex * 287);
    machNumber = data.airspeed / speedOfSound;



    solutionText = `Speed of Sound: ${speedOfSound} m s<sup>-1</sup> <br> Mach Number: ${machNumber}`

    document.getElementById("speedOfSoundOutput").scrollIntoView();

    document.getElementById("speedOfSoundOutputConsole").innerHTML = solutionText;
    return false
}

// Calculating Reynolds Number
document.getElementById("reynoldsNumberButton").onclick = function () {
    let solutionText = "";
    let form = document.getElementById("reynoldsNumberForm")
    let inputElements = form.querySelectorAll("input");
    let data = {};

    for (let input of inputElements) {
        if (input.type === "radio" && input.checked === true || input.type !== "radio") { //ensures only checked radio button is passed through
            data[input.name] = input.value;
        }
    }
    console.log(data)

    let reynoldsNumber = (data.density * data.velocity * data.charecteristicLength) / data.dynamicViscosity;
    let flowRegime = "";

    if (data.flowScenario === "pipe") { //reynolds number flow regime boundaries for pipe
        if (reynoldsNumber < 2300) {
            flowRegime = "Laminar"
        } else if (reynoldsNumber >= 2300 && reynoldsNumber < 4000) {
            flowRegime = "Transitional"
        } else {
            flowRegime = "Turbulent"
        }
    } else if (data.flowScenario === "plate") { //reynolds number flow regime boundaries for flat plate
        if (reynoldsNumber < 5 * (10 ** 5)) {
            flowRegime = "Laminar"
        } else {
            flowRegime = "Turbulent"
        }
    }

    if (flowRegime !== "") {
        solutionText = `Reynolds Number: ${reynoldsNumber} <br> Flow Regime: ${flowRegime}`
    } else {
        solutionText = `Reynolds Number: ${reynoldsNumber}`
    }

    document.getElementById("reynoldsNumberOutput").scrollIntoView();

    document.getElementById("reynoldsNumberConsole").innerHTML = solutionText;
    return false
}