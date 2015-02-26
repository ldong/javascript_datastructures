/**
 * 队列Queue
 *
 * 队列是一种先进先出（first in first out, FIFO）的线性表。它只允许在表的一端进行插入，而在另一端删除元素。
 * 允许插入的一端叫队尾（rear），允许删除的一端叫队头（front）。
 */

    // 链队列
function Queue() {
    this.rear = this.front = null;
    this.size = 0;
}
exports.Queue = Queue;
Queue.prototype = {
    isEmpty: function(){
        return this.rear === null;
    },
    clear: function () {
        this.rear = this.front = null;
        this.size = 0;
    },
    getHead: function () {
        return this.front ? this.front.data : null;
    },
    enQueue: function (elem) {
        if (this.front === null) {
            this.rear = this.front = {data: elem, next: null};
        } else {
            var p = {data: elem, next: null};
            this.rear.next = p;
            this.rear = p;
        }
        this.size++;
    },
    deQueue: function () {
        if (this.front) {
            var elem = this.front.data;
            this.front = this.front.next;
            if (this.front === null) {
                this.rear = null;
            }
            this.size--;
            return elem;
        } else {
            return null;
        }
    },
    queueTraverse: function (iterator) {
        var current = this.front;
        while (current) {
            if (iterator(current.data)) break;
            current = current.next;
        }
    },
    peekAt: function (index) {
        index = index || 0;

        if (index < this.size) {
            var current = this.front;
            for (var i = 0; i < index; i++) {
                current = current.next;
            }
            return current.data;
        }

        return null;
    },
    toString: function () {
        if (this.front === null) {
            return null;
        }

        var arr = [];
        var current = this.front;

        for (var i = 0, len = this.size; i < len; i++) {
            arr[i] = current.data;
            current = current.next;
        }

        return arr;
    }
};

var queue = new Queue();
queue.enQueue(1);
queue.deQueue();
queue.enQueue(2);
queue.enQueue(3);
console.log(queue.peekAt(0));
console.log(queue.peekAt(1));
console.log(queue.peekAt(2));
console.log(queue.peekAt(3));
console.log(queue.toString().join());



// 类似广度优先遍历
function repaintColor(matrix, i, j, color){
    var old = matrix[i][j];
    var queue = new Queue();
    var m = matrix.length - 1;
    var n = matrix[0].length - 1;

    queue.enQueue({x: i, y: j});

    while(queue.rear){
        var a = queue.deQueue();
        var x = a.x;
        var y = a.y;

        if(x >= 1) setColor(x - 1, y);
        if(y >= 1) setColor(x, y - 1);
        if(x < m) setColor(x + 1, y);
        if(y < n) setColor(x, y + 1);
    }

    function setColor(x, y){
        if(matrix[x][y] === old) {
            matrix[x][y] = color;
            queue.enQueue({x: x, y: y});
        }
    }
}

var matrix = [];

for(var i = 0; i < 8; i++){
    matrix[i] = [];
    for(var j = 0; j < 8; j++){
        matrix[i][j] = 0;
    }
}

repaintColor(matrix, 4, 5, 1);
console.log(matrix);

