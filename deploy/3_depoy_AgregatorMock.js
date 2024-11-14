module.exports = async ({getNamedAccounts,deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy,log} = deployments

    await deploy("MockV3Aggregator",{
        from : firstAccount,
        args: [8,300000000000],
        log : true
    })
}

module.exports.tags = ["all","mock","fundme"]