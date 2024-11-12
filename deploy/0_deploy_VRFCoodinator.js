const _baseFee = '10000000000000' //0.1link
const _gasPrice = '1000000000' //1 Gwei
const _weiPerUnitLink = '1'
module.exports = async ({getNamedAccounts,deployments}) => {
    const firstAccount = (await getNamedAccounts()).firstAccount
    const {deploy,log} = deployments

    await deploy("VRFCoordinatorV2_5Mock",{
        from : firstAccount,
        args : [ _baseFee,  _gasPrice,  _weiPerUnitLink] ,
        log : true
    })
}

module.exports.tags = ["all","mock"]