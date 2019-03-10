const Schelling = artifacts.require('Schelling')
const ReviewController = artifacts.require('ReviewController')

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Schelling)
        .then((schelling) => {
            await deployer.deploy(ReviewController, schelling.address)
        })
}