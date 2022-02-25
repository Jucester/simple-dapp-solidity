// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
 * Simple CRUD that tries to simulate an spell book where you can add spells
 */
contract SpellsContract {
    uint256 public counter = 0;

    constructor() {
        create("first task", "example task description", 10);
    }

    event SpellCreated(
        uint256 id,
        string name,
        string description,
        uint256 price,
        uint256 createdAt
    );

    event SpellUpdated(
        uint256 id,
        string name,
        string description,
        uint256 price,
        uint256 createdAt
    );

    struct Spell {
        uint256 id;
        string name;
        string description;
        // uint inventory;
        uint256 price;
        uint256 createdAt;
    }

    mapping(uint256 => Spell) public spells;

    function create(
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        spells[counter] = Spell(
            counter,
            _name,
            _description,
            _price,
            block.timestamp
        );
        emit SpellCreated(
            counter,
            _name,
            _description,
            _price,
            block.timestamp
        );
        counter++;
    }

    function update(
        uint256 _id,
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        Spell memory _spell = spells[_id];
        _spell.name = _name;
        _spell.description = _description;
        _spell.price = _price;

        spells[_id] = _spell;

        emit SpellUpdated(
            _spell.id,
            _spell.name,
            _spell.description,
            _spell.price,
            _spell.createdAt
        );
    }
}
