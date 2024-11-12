module.exports = async ({getNamedAccounts,deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy,log} = deployments

    await deploy("AutomationDemo",{
        from : firstAccount,
        args: [],
        log : true
    })
}

module.exports.tags = ["all","automation"]