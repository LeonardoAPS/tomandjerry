class GuacamoleService {

  constructor(id) {
    this.id = id;
  }

  async getId() {
    return this.id;
  }

}

module.exports = GuacamoleService;