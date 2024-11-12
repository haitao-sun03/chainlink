const { deployments, ethers } = require("hardhat")
const { expect,assert } = require("chai")
const chai= require("chai")

const eventemitter2 = require('chai-eventemitter2')
chai.use(eventemitter2());


describe("test vrf consumer",async function () {
    let vrfCoordinator
    let chainLinkVRFConsumer

    before(async () => {
        await deployments.fixture(["all"])
        vrfCoordinator = await ethers.getContract("VRFCoordinatorV2_5Mock")
        chainLinkVRFConsumer = await ethers.getContract("ChainLinkVRFConsumer")
        // add consumer to the subscription
        const subId = await chainLinkVRFConsumer.s_subscriptionId()
        await vrfCoordinator.addConsumer(subId,chainLinkVRFConsumer.target)
    })

    it("test if  send random request through event",async () => {
        expect(await chainLinkVRFConsumer.requestRandomWords()).to.emit(
                vrfCoordinator,
                'RandomWordsRequested'
            )
    } )

    it("test if get 2 randomwords and gt 0",async () => {
        await chainLinkVRFConsumer.requestRandomWords()

        // 需要通过mock合约手动将随机数写回consumer合约,因为这时候没有链下的vrf随机数生成代码调用写回函数
        const requestId = await chainLinkVRFConsumer.sRequestId()
        const consumerAddr = chainLinkVRFConsumer.target        
        await vrfCoordinator.fulfillRandomWords(requestId, consumerAddr)

        // get the random when after vrfCoordinator.fulfillRandomWords success
        const firstRandom = await chainLinkVRFConsumer.sRandomWords(0);
        const secondRandom = await chainLinkVRFConsumer.sRandomWords(1)

        assert(firstRandom > 0, '1st random number is not greater than 0');
        assert(secondRandom > 0, '2nd random number is not greater than 0');
    })
})