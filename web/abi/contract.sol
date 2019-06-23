pragma solidity 0.5.1;

contract TrackAndTrust {

    //list of customers and their parcels
    mapping(string => address) private orders;
    //list of corresponding ownerships addresses for the specific tracking id
    mapping(string => address) private currentOwnerships;
    mapping(string => mapping(address => bool)) private consents;


    // query the current holder of the parcel
    // only accessible by the owner or current holder
    function getStatus(string memory trackingId) public view returns(address) {
        require(orders[trackingId] == msg.sender || currentOwnerships[trackingId] == msg.sender);
        return currentOwnerships[trackingId];
    }

    function registerParcel(string memory trackingId, address owner) public
    {
        // make sure it doesn't get overwritten
        require(orders[trackingId] == address(0));
        orders[trackingId] = owner;
        emit RegisteredParcel(trackingId, owner);
    }

    function giveConsent(string memory trackingId, address addressOfNextOwner) public
    {
        // only owner can give consent
        require(orders[trackingId] == msg.sender);

        consents[trackingId][addressOfNextOwner] = true;
        emit  ConsentGiven(trackingId, msg.sender, addressOfNextOwner);
   }

   //check in the blockchain that for this tracking id the address input is the same as the address stored
   function checkConsent(string memory trackingId, address Address)  public view returns(bool)
   {
        if(consents[trackingId][Address] == true || orders[trackingId] == Address)
        {
            return true;
        }
        else
        {
            return false;
        }
   }

   function takeOwnership(string memory trackingId) public
   {
        require(checkConsent(trackingId, msg.sender));

        address addressOfCurrentOwner = currentOwnerships[trackingId];

        currentOwnerships[trackingId] = msg.sender;
        if (addressOfCurrentOwner != address(0))
        {
            consents[trackingId][addressOfCurrentOwner] = false;
        }
        if (msg.sender == orders[trackingId])
        {
            emit Delivered(trackingId, msg.sender);
        }
        else
        {
            emit ChangedOwnership(trackingId, addressOfCurrentOwner, msg.sender);
        }

   }

    event RegisteredParcel(
        string trackingId,
        address owner
    );

   event Delivered(
      string trackingId,
      address customerAddress
   );

   event ChangedOwnership(
      string trackingId,
      address previousOwnerAddress,
      address newOwnerAddress
   );

   event ConsentGiven(
      string trackingId,
      address previousOwnerAddress,
      address newOwnerAddress
   );


   /*function Time_call() private returns (uint256){
       return now;
   }*/
}