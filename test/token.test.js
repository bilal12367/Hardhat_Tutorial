const { expect } = require('chai');
const { loadFixture } = require('ethereum-waffle');
const { ethers, waffle } = require('hardhat')
const { isCallTrace } = require('hardhat/internal/hardhat-network/stack-traces/message-trace')

describe('Token Contract Testing', () => {

    async function func1() {
        const [owner, addr1, addr2] = await ethers.getSigners()
        const Token = await ethers.getContractFactory("Token")
        const hardhatToken = await Token.deploy({ value: ethers.utils.parseEther("1000") });
        return { hardhatToken, owner, addr1, addr2 }
    }

    it("Should Send Ether to contract", async function () {
        const { hardhatToken } = await loadFixture(func1)
        expect(await hardhatToken.getContractBalance() / 1e18).to.equal(1000)
    })

    it("Should Send Ether to contract via function", async function () {
        const { hardhatToken, addr1 } = await loadFixture(func1)
        await hardhatToken.connect(addr1).addEtherToContract("Mohammed Bilal", { value: ethers.utils.parseEther("1000") })
        expect(await hardhatToken.getContractBalance() / 1e18).to.equal(2000)
    })

    it("Should Send Ether from one account to another", async function () {
        const { hardhatToken, addr1, addr2 } = await loadFixture(func1)
        const prevBalanceAddr1 = await ethers.provider.getBalance(addr1.address);
        const prevBalanceAddr2 = await ethers.provider.getBalance(addr2.address);
        await hardhatToken.connect(addr1).transfer(addr2.address, { value: ethers.utils.parseEther("100") })
        const currentBalanceAddr1 = await ethers.provider.getBalance(addr1.address);
        const currentBalanceAddr2 = await ethers.provider.getBalance(addr2.address);
        expect(prevBalanceAddr1 / 1e17).to.greaterThan(currentBalanceAddr1 / 1e17)
        expect(prevBalanceAddr2 / 1e17).to.lessThan(currentBalanceAddr2 / 1e17)
    })
})