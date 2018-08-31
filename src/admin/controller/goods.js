const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
 

    const model = this.model('goods');

    const result = await model.getlist(this.post());

    return this.success(result);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('goods');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('goods');
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    values.is_hot = values.is_hot ? 1 : 0;
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('goods').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }

  // 获取所有分类
  async getCategoryListAction(){

     const data =  await this.model('category').field('id,name').select();

     return this.success(data);

  }
};
