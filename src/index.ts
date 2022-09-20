type LinkedList<T> = {
    push: (item: T) => LinkedList<T>,
    pop: () => LinkedList<T> | undefined,
    top: () => T,
    toString: () => string
};

const LinkedList = <T>(e: T, rest?: LinkedList<T> | undefined): LinkedList<T> => {
   return {
    push: (newE: T) => {
        return LinkedList(newE, LinkedList(e, rest));
    },
    pop: () => rest,
    top: () => e,
    toString: () => `${e}${rest?.toString() || ''}`
   };
};

type InfiniteLinkedList<T> = {
    push: (item: T) => InfiniteLinkedList<T>,
    pop: () => InfiniteLinkedList<T> | undefined,
    top: () => T,
    toString: () => string
};

const InfiniteLinkedList = <T>(e: T, rest?: () => LinkedList<T> | undefined): LinkedList<T> => {
   return {
    push: (newE: T) => {
        return InfiniteLinkedList(newE,
            () => InfiniteLinkedList(e, rest));
    },
    pop: () => rest && rest(),
    top: () => e,
    toString: () => {
        if(rest){
            return `${e}${rest()?.toString() || ''}`;
        } else{
            return `${e}`
        }
    }
   };
};

const initialList = InfiniteLinkedList<number>(1);
const one23 = InfiniteLinkedList(1, () => InfiniteLinkedList(2, () => InfiniteLinkedList(3)));
const one232 = InfiniteLinkedList(3).push(2).push(1);

console.log(one23.toString());
console.log(one232.toString());

const infiniteNums = (n: number): InfiniteLinkedList<number> => {
    return InfiniteLinkedList(n, () => infiniteNums(n + 1));
}

let list = infiniteNums(7);

for(let i = 0; i < 1000000; i++){
    console.log(list.top());
    list = list.pop() as InfiniteLinkedList<number>;
}

console.log(infiniteNums(1).toString());