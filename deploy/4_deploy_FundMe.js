const { ethers } = require("hardhat")

module.exports = async ({getNamedAccounts,deployments}) => {
    const firstAccount = (await getNamedAccounts()).firstAccount
    const {deploy,log} = deployments
    const mockAggregator = await ethers.getContract("MockV3Aggregator",firstAccount)
    const lockTime = 120


    // deploy the contract
    await deploy("FundMe",{
        from : firstAccount,
        args : [ lockTime,mockAggregator.target],
        log : true
    })
}

module.exports.tags = ["all","fundme"]