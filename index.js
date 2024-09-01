function LinkedList () {
    const dummy = Node()
    let last = dummy;
    let length = 0;
    function addLen () {
        length++
    }
    function decLen () {
        if (length) length--
    }
    function find (value) {
        let tmp = dummy.next;
        let counter = 0;
        while (tmp) {
            if (tmp.val === value) return counter
            tmp = tmp.next
            counter++
        }
        return null
    }
    function findPrevNode (index) {
        let tmp = dummy;
        if (index > length - 1) throw new Error("Index Error, index out of range!")
        for (let n = 0; n < index; n++) tmp = tmp.next
        return tmp
    }
    return {
        append: (value) => {
            addLen()
            last.next = Node(value)
            last = last.next
        },
        prepend: (value) => {
            addLen()
            let tmp = dummy.next;
            dummy.next = Node(value);
            dummy.next.next = tmp;
            if (last === dummy) last = tmp;
        },
        size:  () => length,
        head: () => dummy.next,
        tail: () => last === dummy ? null : last,
        at: (index) => {
            let tmp = dummy;
            if (index > length - 1) return undefined
            for (let n = 0; n < index; n++) {
                tmp = tmp.next
            }
            return tmp.next
        },
        pop() {
            decLen()
            let tmp = dummy.next;
            while (tmp.next && tmp.next != last) tmp = tmp.next
            tmp.next = null;
            last = tmp;
        },
        find: find, 
        contains: (value) => {
            let res = find(value);
            return res === null ? false : true
        },
        toString: () => {
            let ret = []
            let tmp = dummy.next;
            while (tmp) {
                ret.push(`( ${tmp.val} )`);
                tmp =tmp.next;
            }
            return ret.join(" -> ")
        },
        insertAt: (value, index) => {
            const prevNode = findPrevNode(index);
            const tmp = prevNode.next;
            prevNode.next = Node(value);
            prevNode.next.next = tmp;
        },
        removeAt: (index) => {
            const prevNode = findPrevNode(index);
            const tmp = prevNode.next.next;
            prevNode.next = tmp;
        }
    }
}

function Node (val=null, next=null) {
    return {
        val,
        next,
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("hamster");
list.prepend("snake");
list.append("turtle");
