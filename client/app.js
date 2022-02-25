App = {

    web3Provider: '',
    contracts: {},

    init: async () => {
        console.log('Loaded');
        await App.loadEther();
        await App.loadAccount();
        await App.loadContracts();
        await App.renderAccount();
        await App.renderSpells();
    },
    loadEther: async () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        };

        if(window.ethereum) {
            App.web3Provider = window.ethereum;
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)
        }
        else {
            console.log('no ethereum')
        }
    },
    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
    },
    loadContracts: async () => {
        const res = await fetch("SpellsContract.json");
        const spellsContractJson = await res.json();

        App.contracts.spellContract = await TruffleContract(spellsContractJson);

        App.contracts.spellContract.setProvider(App.web3Provider);

        App.spellsContract = await App.contracts.spellContract.deployed();

    },
    renderAccount: async () => {
        document.getElementById('account').innerText = App.account;
    },
    renderSpells: async () => {
        const counter = await App.spellsContract.counter();
        let html = '';

        const counterNumber = counter.toNumber();

        for (let i = 0; i < counterNumber; i++) {
            const spell = await App.spellsContract.spells(i);
            console.log('spell', spell);
            const spellId = spell[0].toNumber();
            const spellTitle = spell[1];
            const spellDescription = spell[2];
            const spellPower = spell[3].toNumber();
            console.log(spellPower);

            let spellElement = `
                <div class="card card-body bg-dark rounder-0 p-4 mb-2">
                    <div class="card-header text-center"><span> ${spellTitle} <span></div>

                    <div class="card-body">
                        <strong>Description:</strong> ${spellDescription} <br>
                        <strong>Power:</strong> ${spellPower}
                    </div>
                </div>
            `;

            html += spellElement;
        }

        document.getElementById('spells').innerHTML = html;
    },
    createSpell: async (title, description, power) => {
       const result = await App.spellsContract.create(title, description, power, {
           from: App.account
       });
       console.log(result);

       window.location.reload();
        
    }
}
