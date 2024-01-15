class SequenceGenerator{

    #alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    generate(name=""){

        var first=""
        if(name==""){
            for(var i=0; i<4; i++){
                var x= this.generateRandom();
                var y=this.#alphabets[x];
                first += y;
            }
        }
        else{
            first = name.replace(/[ ]+/g,'').substring(0,5);
        }

        const second = Math.floor(Math.random() * 100000 ).toString();
        var alter = false;
        const prep = [];

        var c1=0;
        var c2=0;

        while(c1 < first.length && c2 < second.length){

            if(alter){
                prep.push(first[c1]);
                c1++;
            }
            else{
                prep.push(second[c2])
                c2++;
                
            }
            alter = !alter;
        }

        while(c1 < first.length){
            prep.push(first[c1]);
            c1++;
        }

        while(c2 < second.length){
            prep.push(second[c2]);
            c2++;
        }

        return prep.join('');

    }

    getUniqSequence(num:number){

        var first=""
        for(var i=0; i<num; i++){
            var x= this.generateRandom();
            var y=this.#alphabets[x];
            first += y;
        }

        const second = Math.floor(Math.random() * Math.pow(10,num) ).toString();
        var alter = false;
        const prep = [];

        var c1=0;
        var c2=0;

        while(c1 < first.length && c2 < second.length){

            if(alter){
                prep.push(first[c1]);
                c1++;
            }
            else{
                prep.push(second[c2])
                c2++;
            }
            alter = !alter;
        }

        while(c1 < first.length){
            prep.push(first[c1]);
            c1++;
        }

        while(c2 < second.length){
            prep.push(second[c2]);
            c2++;
        }

        var xx = prep.join('');

        return xx;


    }

    private generateRandom(min = 0, max = 26) {

        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor( rand * difference);
        rand = rand + min;
    
        return rand;
    }
    
}

export default new SequenceGenerator();