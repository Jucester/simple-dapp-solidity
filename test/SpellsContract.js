const SpellsContract = artifacts.require("SpellsContract");

/**
 * Testing SpellsContract using Mocha & Chai (Native integrated in Truffle)
 */

contract("SpellsContract", () => {

    before( async () => {
        this.spellsContract = await SpellsContract.deployed();
    });

    it("Migrate deployed successfully", async () => {
        const address = this.spellsContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });


    it("Get spells list", async () => {
        const counter = await this.spellsContract.counter();
        const spell = await this.spellsContract.spells(counter - 1);
        
        assert.equal(spell.id.toNumber(), counter - 1);
    });

    it("Create a new spell", async () => {
        const spell = await this.spellsContract.create("Firetest", "Power test by fire", 10);
        const spellCreated = spell.logs[0].args;
        const spellCounter = await this.spellsContract.counter();

        assert.equal(spellCreated.id.toNumber(), 1);
        assert.equal(spellCreated.name, "Firetest"),
        assert.equal(spellCreated.description, "Power test by fire");
        assert.equal(spellCreated.price, 10);
        assert.equal(spellCounter.toNumber(), 2);
    });

    it("Update a spell", async () => {
        const res = await this.spellsContract.update(1, "Updated", "Updated", 10);
        const spellUpdated = res.logs[0].args;

        const spell = await this.spellsContract.spells(1);

        assert.equal(spell.name, "Updated");
        assert.equal(spellUpdated.id.toNumber(), 1);
        assert.equal(spellUpdated.name, "Updated");
        assert.equal(spellUpdated.description, "Updated");
        assert.equal(spellUpdated.price, 10);
    });


})
