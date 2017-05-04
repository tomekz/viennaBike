// console.log('yolo')
let isPrime = (num) => {

    if(num < 2) return false;

    if(num > 3){
        let i = num - 1;
        do{
            if ( num % i === 0 ) return false;
            i--;
        } while(i !== 1)
    }

    return true;
}

let primeFactorization = (n) => {

    let primes = [];
    let res = [];

    let i = n-1;
    while( i !== 1) {
        if(isPrime(i)) primes.push(i);
        i--;
    }

    let remain = n;
 
    primes.forEach((p) => {

        while(remain % p === 0 ){
            remain = remain / p;
            res.push(p);
        }
        if(remain === 1) return;
    })

    console.log(res)

}


primeFactorization(76);

// ((num) => {

//     console.log(num);
// })(2)