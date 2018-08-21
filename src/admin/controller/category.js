const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {

    const params = {
      name:this.post('name'),
      is_show:this.post('is_show'),
      currentPage:this.post('currentPage'),
      pageSize:this.post('pageSize')
    }

    let model = this.model('category');

    const result = await model.getlist(params);

    
    return this.success(result);
  }

  async topCategoryAction() {
    const model = this.model('category');
    const data = await model.where({parent_id: 0}).order(['id ASC']).select();

    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('category');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('category');
    values.is_show = values.is_show ? 1 : 0;
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
    await this.model('category').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
