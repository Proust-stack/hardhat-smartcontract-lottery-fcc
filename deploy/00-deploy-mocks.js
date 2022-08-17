const { network } = require("hardhat")

const { developmentChains } = require("../helper-hardhat-config")

/* 0.25 is the premium. It costs 0.25 LINK per request. */
const BASE_FEE = ethers.utils.parseEther("0.25")

/* The calculated value based on the gas price of the chain  */
const GAS_PRICE_LINK = 1e9
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            contract: "VRFCoordinatorV2Mock",
            from: deployer,
            args: [BASE_FEE, GAS_PRICE_LINK],
            log: true,
        })
        log("Mocks deployed")
        log("-------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
