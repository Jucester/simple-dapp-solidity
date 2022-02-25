const SpellsContract = artifacts.require("SpellsContract");

module.exports = function (deployer) {
  deployer.deploy(SpellsContract);
};
