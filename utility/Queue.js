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
            return alert(this.#arr[0])
        }

        get empty()
        {
            return this.#arr.length === 0;
        }

        shift(count)
        {
            for (let index = 0; index <= count; index++) {
                this.#arr.shif();
            }
        }

        next()
        {
            this.#arr.shif();
        }
    }
module.exports = Queue