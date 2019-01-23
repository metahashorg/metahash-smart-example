class Contract {
  constructor() {
    this.name = 'My_Contr';
    this.owner = msg.sender;
    this.ownerContract = null;
    this.totalTokens = 0; 
    this.sum = 0;
    this.balance = {};
  }

  /* set contract owner */
  setContract(_ownerContract) {
    if (msg.sender == this.owner) {
      this.ownerContract = _ownerContract;
    }
  }

  setOptions(tokenCreate) {
    tokenCreate = parseInt(tokenCreate, 10) || 0;
    /* set the amount, give the tokens to the contract */
    if (msg.sender == this.ownerContract && this.sum == 0) {
      this.totalTokens += tokenCreate;
      if (this.balance[this.ownerContract] === undefined) {
        this.balance[this.ownerContract] = 0;
      }
      this.balance[this.ownerContract] += tokenCreate;
    } else {
      throw new Error('No set tokens');
    }
  }

  /* transfer tokens */
  transfer(_to, _value) {
    let addrSender = '';

    _value = parseInt(_value, 10) || 0;

    if (msg.sender == this.ownerContract) {
      addrSender = this.ownerContract;
    } else {
      /* transfer between users*/
      addrSender = msg.sender;
    }

    if (this.balance[addrSender] === undefined) {
      this.balance[addrSender] = 0;
    }
    if (this.balance[_to] === undefined) {
      this.balance[_to] = 0;
    }

    /* tokens are not enough */
    if (this.balance[addrSender] < _value) {
      throw new Error('tokens are not enough');
      return false;
    }

    /* overflow */
    if (this.balance[_to] + _value < this.balance[_to]) {
      throw new Error('overflow');
      return false;
    }

    this.balance[addrSender] -= _value;
    this.balance[_to] += _value;

    return true;
  }

}