"use strict";

var expect = chai.expect;
var suma_liczb = 0;

function cyfry(str){
    let digits = str.match(/\d/g);
    let sum = 0;
    if(digits !== null){
        sum = digits.reduce((acc, curr) => acc + parseInt(curr), 0);
    }
    return sum;
}

function litery(str){
    let letters = str.match(/[A-Za-z]/g);
    let size = 0;
    if(letters !== null){
        size = letters.length;
    }
    return size
}

function suma(str){
    let n = parseInt(str);
    if(n){
        suma_liczb += n;
    }
    return suma_liczb
}


// while(true){
//     var str = window.prompt("podaj napis");
//     if(str === null){
//         break;
//     }
//     console.log(cyfry(str) + '\t' + litery(str) + '\t' + suma(str));
// }

var test1 = "123";
var test2 = "abc";
var test3 = "abc123";
var test4 = "123abc";
var test5 = "";

describe('The cyfry() function', function() {
 it(`Returns 6 for '${test1}'`, function() {
   expect(cyfry(test1)).to.equal(6);
 });
 it(`Returns 0 for '${test2}'`, function() {
   expect(cyfry(test2)).to.equal(0);
 });
 it(`Returns 6 for '${test3}'`, function() {
    expect(cyfry(test3)).to.equal(6);
  });
  it(`Returns 6 for '${test4}'`, function() {
    expect(cyfry(test4)).to.equal(6);
  });
  it(`Returns 0 for empty string`, function() {
    expect(cyfry(test5)).to.equal(0);
  });
});

describe('The litery() function', function() {
    it(`Returns 0 for '${test1}'`, function() {
        expect(litery(test1)).to.equal(0);
    });
    it(`Returns 3 for '${test2}'`, function() {
        expect(litery(test2)).to.equal(3);
    });
    it(`Returns 3 for '${test3}'`, function() {
        expect(litery(test3)).to.equal(3);
        });
        it(`Returns 3 for '${test4}'`, function() {
        expect(litery(test4)).to.equal(3);
        });
        it(`Returns 0 for empty string`, function() {
        expect(litery(test5)).to.equal(0);
        });
    });

describe('The sum() function', function() {
    it(`Returns 123 for '${test1}'`, function() {
      expect(suma(test1)).to.equal(123);
    });
    it(`Returns 123 for '${test2}'`, function() {
        expect(suma(test2)).to.equal(123);
    });
    it(`Returns 123 for '${test3}'`, function() {
        expect(suma(test3)).to.equal(123);
     });
     it(`Returns 246 for '${test4}'`, function() {
        expect(suma(test4)).to.equal(246);
     });
     it(`Returns 246 for empty string`, function() {
        expect(suma(test5)).to.equal(246);
     });
   });