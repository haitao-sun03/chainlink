// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract AutomationDemo is AutomationCompatibleInterface {
    uint256 public constant SIZE = 100;
    uint256 public constant INITAL_BALANCE = 1000;
    uint256[SIZE] public balances;

    constructor() {
        for(uint256 i = 0;i < SIZE;i++) {
            balances[i] = INITAL_BALANCE;
        }
    }

    function withdraw(uint256[] calldata indexes,uint256 amount) external {
        // require(amount < INITAL_BALANCE,"amount > INITIAL_BALANCE");
        // for(uint256 i =0 ;i < indexes.length ; i++) {
        //     require(indexes[i] < SIZE,"out of bound");
        // }

        for(uint256 i = 0;i < indexes.length; i++) {
            balances[indexes[i]] -= amount;
        }
    }


    function checkUpkeep(bytes calldata) external view override returns  (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = false;
        uint256 counter = 0;
        for(uint256 i = 0;i < SIZE; i++) {
            if(balances[i] < INITAL_BALANCE) {
                counter ++;
            }
        }

        uint256[] memory indexToUpdate = new uint256[](counter);
        uint256 indexToUpdateCounter = 0;
        for(uint256 i = 0;i < SIZE; i++) {
            if(balances[i] < INITAL_BALANCE) {
                indexToUpdate[indexToUpdateCounter] = i;
                indexToUpdateCounter ++;
                upkeepNeeded = true;
            }
        }

        performData = abi.encode(indexToUpdate);
        // return (upkeepNeeded,performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256[] memory indexToUpdate = abi.decode(performData, (uint256[]));
        for(uint i = 0;i < indexToUpdate.length; i++) {
            balances[indexToUpdate[i]] = INITAL_BALANCE;
        }
    }


}