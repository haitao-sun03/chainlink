const { ethers } = require("hardhat")

module.exports = async ({getNamedAccounts,deployments}) => {
    const firstAccount = (await getNamedAccounts()).firstAccount
    const {deploy,log} = deployments
    // const coodinatorMockDeployment = await deployments.get("VRFCoordinatorV2_5Mock")
    const coodinatorMock = await ethers.getContract("VRFCoordinatorV2_5Mock",firstAccount)
    const coodinatorMockAddr = coodinatorMock.target


    // createSubscription and get subId 
    const tx = await coodinatorMock.createSubscription()
    const receipt = await tx.wait(1)
    // console.log("tx : ",tx)
    // console.log("txRecipent : ",txRecipent)

    const events = receipt.logs.map(log => coodinatorMock.interface.parseLog(log));
    const subscriptionCreatedEvent = events.find(event => event.name === 'SubscriptionCreated');
 
    // 提取订阅 ID
    const subId = subscriptionCreatedEvent.args.subId;

    // console.log("subId : ",subId)

    // fund subscription
    coodinatorMock.fundSubscriptionWithNative(subId,{value:ethers.parseEther('1')})


    // deploy the contract
    await deploy("ChainLinkVRFConsumer",{
        from : firstAccount,
        args : [ coodinatorMockAddr,subId] ,
        log : true
    })
}

module.exports.tags = ["all","consumer"]