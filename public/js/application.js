var bot = new Bot()


$(function(){

$( document ).keypress(function(event) {
    // event.preventDefault();
    if(event.which == 13){
        var statement = $( "input" ).val();
        bot.addStatement(statement)
        var reply = bot.reply()
        $( "input" ).val('')
        $( "#top" ).append("<tr><td class='statement'>" + statement + " </td></tr>")
        $( "#top" ).append("<tr><td class='reply'>" + reply + " </td></tr>")
        event.preventDefault();
    }

  });
});

function Bot(){
    this.dictionary = {}
    this.starters = []
};

Bot.prototype.addStatement = function(text){
    var cleanText = text.replaceAll(",", "");
    var array = cleanText.split(" ")
    var firstKey = array[0] + " " + array[1]
    if (!this.starters.includes(firstKey)){
        this.starters.push(firstKey)
    }

    while (array.length > 2){
        var key = array[0] + " " + array[1]
        var value = array[2]

        if (array[0].includes('?')|| array[0].includes('.')){
            var starter = array[1] + " " + array[2]
            this.starters.push(starter)
        }

        if (this.dictionary.hasOwnProperty(key)) {
            if (!this.dictionary[key].includes(value)){
                this.dictionary[key].push(value)
            }
        }else{
            this.dictionary[key] = [value]
        }
        array.shift();
        // console.log(this.starters)
    }
    localStorage.setItem('dictionary', JSON.stringify(this.dictionary));
}

Bot.prototype.reply = function(){
    var starter = this.starters[Math.floor(Math.random()*this.starters.length)]
    var reply = starter.split(" ")
    replyLength = 10
    this.dictionary = JSON.parse(localStorage.getItem('dictionary'));
    

    while (reply.length < replyLength){
        var prefix = reply[reply.length - 2] + ' ' + reply[reply.length - 1]
        // console.log(prefix)
        var word = this.getWord(prefix)
        reply.push(word)
    }
    var fullReply = reply.toString().replaceAll(","," ");
    return fullReply
}

Bot.prototype.getWord = function(prefix){
    var finalWord = ''
    if (this.dictionary[prefix] === undefined){
        finalWord = this.getRandomWord();
    }else {
        finalWord = this.searchDictionary(prefix);
    
    }
    return finalWord;
}

Bot.prototype.getRandomWord = function(){
    
    var keys = Object.keys(this.dictionary);
    var randPrefix = keys[Math.floor(Math.random()*keys.length)];
    var randWord = this.searchDictionary(randPrefix);
    return randWord;
}

Bot.prototype.searchDictionary = function(prefix){
    var newWord = '';
    if ( this.dictionary[prefix].length === 1){
        newWord = this.dictionary[prefix][0];
    }else {
        var poss = this.dictionary[prefix];
        newWord = poss[Math.floor(Math.random()*poss.length)];
    }
    return newWord;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};





