# Currency 

This project is to convert a certain amount of a currency to another one.
Only traditionnal currency.

## Instalation

Fork and clone the project on github.com


Go to the repository,then in the currency folder, use npm to install libraries

```bash
npm install
```
# Testing your install

To test if it's working, type in the shell :

```bash
node cli.js
```
you should obtain:
    
```bash
1 USD = 0.00011506102836944715 BTC
```

# Usage

to know the value of x currency1 to currency2, type:


```bash
node cli.js x currency1 currency2
```

exemple :
```bash
node cli.js 25 eur krw # krw is the korean currency
```

# Know error:

if you see :Error: �💵 Please specify a valid `from` and/or `to` currency value!
-you may verifie the typing of the two currency you put before.
-you may verifie your internet access. 

