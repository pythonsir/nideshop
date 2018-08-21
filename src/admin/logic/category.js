module.exports = class extends think.Logic {
  indexAction() {
    this.allowMethods = 'post';
    this.rules = {
      name: {  string: true, trim:true },
      is_show: { required: true, int: true },
      currentPage:{ required:true, int:true },
      pageSize:{ required:true, int:true }
    };
  }
};
