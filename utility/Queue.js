    class Queue {
        #arr

        constructor() 
        {
            this.#arr = new Array();
        }
        
        push(song)
        {
            this.#arr.push(song)
        }

        get current() 
        {
            return this.#arr[0]
        }

        get empty()
        {
            if(this.#arr.length == 0) 
            {
                return true;
            } else return false;
        }

        shift(count)
        {
            for (let index = 0; index <= count; index++) {
                this.#arr.shif();
            }
        }

        next()
        {
           this.previousSong = this.#arr.shift();
        }
    }
module.exports = Queue