const {assert} = require('chai');


const KryptoBird = artifacts.require('./KryptoBird')

//check for chai

require('chai')
.use(require('chai-as-promised'))
.use(require('chai-as-promised'))
.should();


contract ('KryptoBird', (accounts) =>{
    
 
    // testing container

    describe('deployment', async() => {
        //test samples with writing it
        it('deployes successfuly', async() =>{
            contract = await KryptoBird.deployed()
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
           
        })
        it('has a name', async() =>{
        
            const name = await contract.name()
            assert.equal(name, 'KryptoBird')
        })
        it('has a symbol', async() =>{
        
            const symbol = await contract.symbol()
            assert.equal(symbol, 'KBIRDZ')
        })
      
      
    })

    describe ('Minting NFT', async() =>{
        it('creates a new token', async()=>{
            contract = await KryptoBird.deployed()
            const result = await contract.mint('https...1')
            const totalSupply = await contract.totalSupply()

            //success
            assert.equal(totalSupply,1)
            const event = result.logs[0].args
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from contract')
            assert.equal(event._to, accounts[0], 'to is msg.sender')

            //failure
            await contract.mint('https...1').should.be.rejected;
        })
    })


    describe ('indexing', async() =>{
        it('lists KryptoBirdz', async()=>{
            contract = await KryptoBird.deployed()
            await contract.mint('https...2') 
            await contract.mint('https...3')
            await contract.mint('https...4')
            const totalSupply = await contract.totalSupply()
            //loop through list and grab
            let result = [];
            let _KryptoBird
            for(i=1; i< totalSupply; i++){
                _KryptoBird = await contract.kryptoBirdz(i-1)
                result.push(_KryptoBird)
            }
        })
    })

})