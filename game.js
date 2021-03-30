document.addEventListener('DOMContentLoaded', function() {
    resetValues();
});

let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
    "I think it pisses God off if you walk by the color purple in a field somewhere and don’t notice it. People think pleasing God is all God cares about.",
    "How you live your life is your business. But remember, our hearts and our bodies are given to us only once. Most of us can’t help but live as though we’ve got two lives to live.",
    "Science has taught me that everything is more complicated than we first assume, and that being able to derive happiness from discovery is a recipe for a beautiful life.",
    "You start to think of contempt as a virus. Infecting individuals first, but spreading rapidly through families, communities, peoples, power structures, nations.",
    "People think a soul mate is your perfect fit, and that’s what everyone wants. But a true soul mate is a mirror, the person who shows you everything",
    "You never really understand a person until you consider things from his point of view Until you climb inside of his skin and walk around in it.",
    "Human knowledge is never contained in one person. It grows from the relationships we create between each other and the world, and still, it is never complete.",
    "Human beings need loyalty. It does not necessarily produce happiness, and can even be painful, but we all require devotion to something more than ourselves for our lives to be endurable.",
    "Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them.",
    "When you make loving others the story of your life, there’s never a final chapter, because the legacy continues. You lend your light to one person, and he or she shines it on another.",
    "I was told love should be unconditional. That’s the rule, everyone says so. But if love has no boundaries, no limits, no conditions, why should anyone try to do the right thing ever?",
    "The ultimate failure of the United States will probably not derive from the problems we see or the conflicts we wage. It will more likely derive from our uncompromising belief in the things we consider unimpeachable.",
    "Autonomy, complexity, and a connection between effort and reward are, most people will agree, the three qualities that work has to have if it is to be satisfying.",
    "People are less quick to applaud you as you grow older. Life starts out with everyone clapping when you take a poo and goes downhill from there.",
    "I haven’t the slightest idea how to change people, but still I keep a long list of prospective candidates just in case I should ever figure it out.",
    "Recovering from suffering is not like recovering from a disease. Many people don’t come out healed; they come out different.",
    "I would not have you descend into your own dream. I would have you be a conscious citizen of this terrible and beautiful world.",
    "Some men get the world, some men get ex-hookers and a trip to Arizona. You’re in with the former, but my God I don’t envy the blood on your conscience.",
    "The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing.",
    "We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories.",
    "We cast a shadow on something wherever we stand, and it is no good moving from place to place to save things; because the shadow always follows.",
    "No man, for any considerable period, can wear one face to himself and another to the multitude, without finally getting bewildered as to which may be the true.",
    "We can experience nothing but the present moment, live in no other second of time, and to understand this is as close as we can get to eternal life.",
    "None of those other things makes a difference. Love is the strongest thing in the world, you know. Nothing can touch it. Nothing comes close.",
    "Some birds are not meant to be caged, that's all. Their feathers are too bright, their songs too sweet and wild. So you let them go, or when you open the cage to feed them they somehow fly out past you.",
    "In this life, you don’t have to prove nothing to nobody but yourself. And after what you’ve gone through, if you haven’t done that by now, it ain’t gonna never happen.",
    "Nobody is gonna hit as hard as life, but it ain’t how hard you can hit. It’s how hard you can get hit and keep moving forward. ",
    "Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure. It is our light, not our darkness, that most frightens us.",
    "There should be no boundaries to human endeavor. We are all different. However bad life may seem, there is always something you can do, and succeed at.",
    "To find something, anything, a great truth or a lost pair of glasses, you must first believe there will be some advantage in finding it.",
    "You know, the ancient Egyptians had a beautiful belief about death. When their souls got to the entrance to heaven, the guards asked two questions.",
    "You need to learn how to select your thoughts just the same way you select your clothes every day. This is a power you can cultivate.",
    "I came here tonight because when you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.",
    "Without fear we are able to see more clearly our connection to others. Without fear, we have more room for understanding and compassion.",
    "Nothing in the world can bother you as much as your own mind, I tell you. In fact, others seem to be bothering you, but it is not others, it is your own mind.",
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let wpm_header = document.querySelector(".wpm_header_text");
let cpm_header = document.querySelector(".cpm_header_text");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".sample");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    quoteNo = Math.floor(Math.random() * quotes_array.length);
    current_quote = quotes_array[quoteNo];

    // separate each character and make an element 
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

}


function processCurrentText() {

    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // characters not currently typed
        if (typedChar == null) {
            char.classList.remove('correct');
            char.classList.remove('incorrect');
            // correct characters
        } else if (typedChar === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');

            // incorrect characters
        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');

            // increment number of errors
            errors++;
        }
    });

    // display the number of errors
    error_text.textContent = total_errors + errors;

    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal) + "%";

    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();

        // update total errors
        total_errors += errors;

        // clear the input area
        input_area.value = "";
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        // decrease the current time left
        timeLeft--;
        if (timeLeft <= 10) {
            document.getElementById('timer').style.backgroundColor = "rgb(231, 57, 57)";
            timer_text.textContent.blink();
        }

        // increase the time elapsed
        timeElapsed++;

        // update the timer text
        timer_text.textContent = timeLeft + "s";
    } else {
        // finish the game
        finishGame();
    }
}

function finishGame() {
    // stop the timer
    clearInterval(timer);

    // disable the input area
    input_area.disabled = true;

    // show finishing text
    quote_text.textContent = "Click restart to start a new game.";

    // display restart button
    restart_btn.style.display = "block";
    document.getElementById('timer').style.backgroundColor = "aquamarine";
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    // update cpm and wpm text
    cpm_header.textContent = "CPM";
    wpm_header.textContent = "WPM";
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;


    /*  display the cpm and wpm*/
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}


function startGame() {

    resetValues();
    updateQuote();

    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Type the text displayed here!!';
    accuracy_text.textContent = 100 + ' %';
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}