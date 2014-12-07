var Utils = {
    containsObject: function(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    },
    rollDice: function(min, max){
    	return Math.round(Math.random() * (max - min) + min)
    }

};

module.exports = Utils;