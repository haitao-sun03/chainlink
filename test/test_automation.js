const { ethers } = require("hardhat")
const {assert} = require("chai")

describe("test automation",async function () {
    
    let automationDemo
    before(async () => {
        await deployments.fixture(["automation"])
        automationDemo = await ethers.getContract("AutomationDemo")
        console.log("automationDemo address: ",automationDemo.target)
    })

    // check upkeepNeeded is false after the contract is deployed
    it("check if upkeepNeeded is false",async () => {
        const checkData = ethers.keccak256(ethers.toUtf8Bytes(""))
        const {upkeepNeeded} = await automationDemo.checkUpkeep(checkData)
        assert.equal(upkeepNeeded,false)
    })

    // check upkeepNeeded is true after withdraw called
    it("check if upkeepNeeded is true",async () => {
        const tx = await automationDemo.withdraw([10,20],100)
        await tx.wait();  // 等待交易被确认

        const checkData = ethers.keccak256(ethers.toUtf8Bytes(""))
        const {upkeepNeeded} = await automationDemo.checkUpkeep(checkData)
        assert.equal(upkeepNeeded,true)
    })


    // check upkeepNeeded is false after performUpkeep called
    it("check if check upkeepNeeded is false",async () => {
        const tx = await automationDemo.withdraw([10,20],100)
        await tx.wait();  // 等待交易被确认

        const checkData = ethers.keccak256(ethers.toUtf8Bytes(""))
        const {performData} = await automationDemo.checkUpkeep(checkData) //true

        const perfomeUpKeepTx = await automationDemo.performUpkeep(performData)
        await perfomeUpKeepTx.wait();
        const {upkeepNeeded} = await automationDemo.checkUpkeep(checkData)
        assert.equal(upkeepNeeded,false)
    })
})